# PostgreSQL

PostgreSQL是功能强大的开源对象关系数据库管理系统（ORDBMS）。在创建 PostgreSQL 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。



## 支持版本

PostgreSQL 9.4、9.5、9.6、10.x、11.x、12版本



## 增量数据读取原理

为实现增量数据的读取，Tapdata 需借助 PostgreSQL 的逻辑解码功能，提取提交到事务日志中的更改，并通过插件以用户友好的方式处理这些更改。支持的变更数据捕获（CDC）如下：

- 逻辑解码（Logical Decoding）：用于从 WAL 日志中解析逻辑变更事件
- 复制协议（Replication Protocol）：提供了消费者实时订阅（甚至同步订阅）数据库变更的机制
- 快照导出（export snapshot）：允许导出数据库的一致性快照（pg_export_snapshot）
- 复制槽（Replication Slot）：用于保存消费者偏移量，跟踪订阅者进度。 



## 作为源库

1. 以管理员身份登录 PostgreSQL 数据库。

2. 修改复制标识为 **FULL**（使用整行作为标识），该属性决定了当数据发生 UPDATE/DELETE 时，日志记录的字段。

   ```sql
   ALTER TABLE '[schema]'.'[table name]' REPLICA IDENTITY FULL;   
   ```

3. 安装解码器插件，根据业务需求和当前版本选择：

   - [Wal2json](https://github.com/eulerto/wal2json/blob/master/README.md)（9.4 及以上）

     如果源表没有主键，则无法实现同步执行删除操作。

   - [Decoderbufs](https://github.com/debezium/postgres-decoderbufs)（9.6 及以上）

   - [Pgoutput](https://www.postgresql.org/docs/15/sql-createsubscription.html)（10.0 及以上）

   以 **Wal2json** 为例，安装步骤如下：

   1. 确保环境变量 PATH 中包含 `/bin`。

      ```bash
      export PATH=$PATH:<PostgreSQL 安装路径>/bin
      ```

   2. 依次执行下述命令，完成插件的安装。

      ```bash
      git clone https://github.com/eulerto/wal2json -b master --single-branch \
      && cd wal2json \
      && USE_PGXS=1 make \
      && USE_PGXS=1 make install \
      && cd .. \
      && rm -rf wal2json
      ```

      :::tip

      如执行 make 命令时报错：“fatal error: [xxx].h: No such file or directory”，可尝试安装 postgresql-server-dev 来解决。以 debian 系统为例，安装命令参考：`apt-get install -y postgresql-server-dev-<版本号>`。

      :::

   3. 修改配置文件 postgresql.conf，设置在启动时加载插件。

      ```bash
      shared_preload_libraries = 'decoderbufs,wal2json'
      ```

   4. 修改配置文件 postgresql.conf，设置 REPLICATION 属性。

      ```bash
      # REPLICATION
      wal_level = logical
      max_wal_senders = 1 # 大于0即可
      max_replication_slots = 1 # 大于0即可
      ```

4. 创建用于数据同步/开发任务的账号，具体操作，见 [CREATE USER](https://www.postgresql.org/docs/10/sql-createuser.html) 和 [GRANT](https://www.postgresql.org/docs/10/sql-grant.html) 语法。

5. 为刚刚创建的数据库账号授予权限，简易示例如下，推荐基于业务需求设置更精细化的权限控制。

   ```sql
   --初始化
   GRANT SELECT ON ALL TABLES IN SCHEMA <schemaname> TO <username>;
   --增量权限，无需增量则可以不授予 REPLICATION LOGIN 权限
   CREATE ROLE <rolename> REPLICATION LOGIN;
   CREATE USER <username> ROLE <rolename> PASSWORD '<password>';
   --或者
   CREATE USER <username> WITH REPLICATION LOGIN PASSWORD '<password>';
   ```

6. 修改配置文件 pg_hba.conf，添加下述内容。

   ```bash
   local   replication     <youruser>                     trust
   host    replication     <youruser>  0.0.0.0/32         md5
   host    replication     <youruser>  ::1/128            trust
   ```

7. （可选）测试日志插件。

   1. 连接 postgres 数据库，切换至需要同步的数据库并创建一张测试表。

      ```sql
      -- 假设需要同步的数据库为 postgres，模型为 public
      \c postgres
      
      create table public.test_decode
      (
        uid    integer not null
            constraint users_pk
                primary key,
        name   varchar(50),
        age    integer,
        score  decimal
      )
      ```

   2. 创建 slot 连接，以 wal2json 插件为例。

      ```sql
      select * from pg_create_logical_replication_slot('slot_test', 'wal2json')
      ```

   3. 对测试表插入一条数据，然后监听日志并查看返回结果，是否有刚才插入操作的信息。

      ```sql
      select * from pg_logical_slot_peek_changes('slot_test', null, null)
      ```

   4. 确认无问题后，可销毁 slot 连接并删除测试表。

      ```sql
      select * from pg_drop_replication_slot('slot_test')
      drop table public.test_decode
      ```

8. （可选）如需使用最后更新时间戳的方式进行增量同步，您需要执行下述步骤。

   1. 在源数据库中，执行下述命令创建公共函数，需替换 schema 名称。

      ```sql
      CREATE OR REPLACE FUNCTION <schema>.update_lastmodified_column()
        RETURNS TRIGGER language plpgsql AS $$
        BEGIN
            NEW.last_update = now();
            RETURN NEW;
        END;
      $$;
      ```

   2. 创建字段和 trigger，每个表均需执行一次，例如表名为 **mytable**。

      ```sql
      // 创建 last_update 字段
      alter table <schema>.mytable add column last_udpate timestamp default now();
      
      // 创建 trigger
      create trigger trg_uptime before update on <schema>.mytable for each row execute procedure
        update_lastmodified_column();
      ```



## 作为目标库

1. 以管理员身份登录 PostgreSQL 数据库。

2. 创建用于数据同步/开发任务的账号，具体操作，见 [CREATE USER](https://www.postgresql.org/docs/10/sql-createuser.html) 和 [GRANT](https://www.postgresql.org/docs/10/sql-grant.html) 语法。

3. 执行下述格式的命令，为数据库账号授予权限，简易示例如下，推荐基于业务需求设置更精细化的权限控制。

   ```sql
   GRANT INSERT,UPDATE,DELETE,TRUNCATE
   ON ALL TABLES IN SCHEMA <schemaname> TO <username>;
   ```



## 异常处理

当 CDC 意外中断后，可能导致 Slot 连接无法从 PostgreSQL 主节点删除，此时需手动登录主节点，删除相关 Slot 避免一直占用。

```sql
// 查看是否有 slot_name=tapdata 的信息
TABLE pg_replication_slots;

// 删除 Slot 节点
select * from pg_drop_replication_slot('tapdata');
```





## 下一步

[连接 PostgreSQL 数据库](../../user-guide/connect-database/certified/connect-postgresql.md)

