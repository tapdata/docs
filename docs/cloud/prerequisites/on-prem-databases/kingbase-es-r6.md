# KingbaseES-R6

金仓数据库管理系统（KingbaseES）是北京人大金仓信息技术股份有限公司自主研发的、具有自主知识产权的商用关系型数据库管理系统。KingbaseES-R6 可兼容 Postgres 9.6 版本的绝大多数特性，本文将介绍如何在 Tapdata Cloud 中添加 KingbaseES-R6 数据源，后续可将其作为源或目标库来构建数据管道。

## 支持版本

KingBaseES-V8R6

:::tip

KingbaseES-R6 支持的数据库模式为 Oracle、PostgreSQL 和 MySQL，需注意 Oracle 模式下默认对象全小写，更多介绍，见 [Kingbase ES 官方文档](https://help.kingbase.com.cn/v8/index.html)。

:::

import Content from '../../../reuse-content/beta/_beta.md';

<Content />

## 增量数据读取原理

为实现增量数据的读取，Tapdata Cloud 通过逻辑解码功能，提取提交到事务日志中的更改，并通过插件以用户友好的方式处理这些更改。支持的变更数据捕获（CDC）如下：

- 逻辑解码（Logical Decoding）：用于从 WAL 日志中解析逻辑变更事件
- 复制协议（Replication Protocol）：提供了消费者实时订阅（甚至同步订阅）数据库变更的机制
- 快照导出（Export Snapshot）：允许导出数据库的一致性快照（pg_export_snapshot）
- 复制槽（Replication Slot）：用于保存消费者偏移量，跟踪订阅者进度。 

## <span id="prerequisite">准备工作</span>

### 作为源库

1. 以管理员身份登录 KingbaseES-R6 数据库。

2. 创建用户并授权。

   1. 执行下述格式的命令，创建用于数据同步/开发任务的账号。

      ```sql
      CREATE USER username WITH PASSWORD 'password';
      ```

      * **username**：用户名。
      * **password**：密码。

   2. 执行下述格式的命令，授予账号权限。

      ```sql
      -- 进入要授权的数据库
      \c database_name
      
      -- 授予目标 Schema 的表读取权限
      GRANT SELECT ON ALL TABLES IN SCHEMA schema_name TO username;
      
      -- 授予目标 Schema 的 USAGE 权限
      GRANT USAGE ON SCHEMA schema_name TO username;
      
      -- 授予复制权限，仅需读取数据库的全量数据，则无需执行
      ALTER USER username REPLICATION;
      ```

      * **database_name**：数据库名称。
      * **schema_name**：Schema 名称。
      * **username**：用户名。
      
      :::tip
      
      如仅需读取 KingbaseES-R6 的全量数据（不包含增量变更），则无需执行后续步骤。
      
      :::

3. 执行下述格式的命令，修改复制标识为 **FULL**（使用整行作为标识），该属性决定了当数据发生 UPDATE/DELETE 时，日志记录的字段。

   ```sql
   ALTER TABLE schema_name.table_name REPLICA IDENTITY FULL;   
   ```

   * **schema_name**：Schema 名称。
   * **table_name**：表名称。

4. 登录 KingbaseES-R6 所属的服务器，根据业务需求和版本选择要安装的解码器插件：

   - [Wal2json](https://github.com/eulerto/wal2json/blob/master/README.md)（源表需具备主键，否则无法同步删除操作）

   - [Decoderbufs](https://github.com/debezium/postgres-decoderbufs)

   - [Pgoutput](https://www.postgresql.org/docs/15/sql-createsubscription.html)

   接下来，我们以 **Wal2json** 为例演示安装流程。

   :::tip

   本案例中的 KingbaseES-R6 部署在 Docker 平台中（基于 CentOS 7.9），如您的环境与本案例不同，需要调整下述步骤中安装的开发包版本、文件路径等。

   :::

   1. 以 `root` 身份进入 Docker，执行下述命令安装环境依赖，包含 llvm、clang、gcc 等，然后完成文件复制以保障编译时可找到相关文件。

      ```bash
      yum install -y devtoolset-7-llvm centos-release-scl devtoolset-7-gcc* llvm5.0 make gcc git
      mkdir -p /home/kingbase/Server/include/server
      
      # 复制文件
      mkdir -p /home/kingbase/Server/include/server
      cp -a /home/kingbase/Server/lib/plc/.server/* /home/kingbase/Server/include/server/
      ```

   5. 以 `kingbase` 用户身份进入 Docker，依次执行下述命令，完成插件的安装。

      ```bash
      # 克隆并进入目录
      git clone https://github.com/eulerto/wal2json.git && cd wal2json
      
      # 编译安装
      make 
      
      # 复制生成的 wal2json.so 至 Kingbase 包目录中
      cp wal2json.so /home/kingbase/Server/lib/
      ```

   6. 执行命令 `vim /home/kingbase/data/kingbase.conf` 修改配置文件，将 `wal_level` 的值修改为 `logical`。

   7. 在业务低峰期，重启 KingbaseES-R6 服务。

5. （可选）测试日志插件。

   1. 连接 KingbaseES-R6 数据库，切换至需要同步的数据库并创建一张测试表。

      ```sql
      -- 假设需要同步的数据库为 demodata，模型为 public
      \c demodata
      
      CREATE TABLE public.test_decode
      (
        uid    integer not null
            constraint users_pk
                primary key,
        name   varchar(50),
        age    integer,
        score  decimal
      );
      ```

   2. 创建 Slot 连接，以 wal2json 插件为例。

      ```sql
      SELECT * FROM pg_create_logical_replication_slot('slot_test', 'wal2json');
      ```

   3. 对测试表插入一条数据。

      ```sql
      INSERT INTO public.test_decode (uid, name, age, score)
      VALUES (1, 'Jack', 18, 89);
      ```

   4. 监听日志并查看返回结果，是否有刚才插入操作的信息。

      ```sql
      SELECT * FROM pg_logical_slot_peek_changes('slot_test', null, null);
      ```

      返回示例如下（竖向显示）：

      ```sql
      lsn  | 0/3E38E60
      xid  | 610
      data | {"change":[{"kind":"insert","schema":"public","table":"test_decode","columnnames":["uid","name","age","score"],"columntypes":["integer","character varying(50)","integer","numeric"],"columnvalues":[1,"Jack",18,89]}]}
      ```

   5. 确认无问题后，可销毁 Slot 连接并删除测试表。

      ```sql
      SELECT * FROM pg_drop_replication_slot('slot_test');
      DROP TABLE public.test_decode;
      ```

6. （可选）如需使用最后更新时间戳的方式进行增量同步，您需要执行下述步骤。

   1. 在源数据库中，执行下述命令创建公共函数，需替换 schema 名称。

      ```sql
      CREATE OR REPLACE FUNCTION schema_name.update_lastmodified_column()
        RETURNS TRIGGER LANGUAGE plpgsql AS $$
        BEGIN
            NEW.last_update = now();
            RETURN NEW;
        END;
      $$;
      ```

   2. 创建字段和 trigger，每个表均需执行一次，例如表名为 **mytable**。

      ```sql
      // 创建 last_update 字段
      ALTER TABLE schema_name.mytable ADD COLUMN last_udpate timestamp DEFAULT now();
      
      // 创建 trigger
      CREATE TRIGGER trg_uptime BEFORE UPDATE ON schema_name.mytable FOR EACH ROW EXECUTE PROCEDURE
        update_lastmodified_column();
      ```



### 作为目标库

1. 以管理员身份登录 KingbaseES-R6 数据库。

2. 执行下述格式的命令，创建用于数据同步/开发任务的账号。

   ```sql
   CREATE USER username WITH PASSWORD 'password';
   ```

   * **username**：用户名。
   * **password**：密码。

3. 执行下述格式的命令，为数据库账号授予权限。

   ```sql
   -- 进入要授权的数据库
   \c database_name;
   
   -- 授予目标 Schema 的 USAGE 和 CREATE 权限
   GRANT CREATE,USAGE ON SCHEMA schemaname TO username;
   
   -- 授予目标 Schema 的表读写权限
   GRANT SELECT,INSERT,UPDATE,DELETE,TRUNCATE ON ALL TABLES IN SCHEMA schemaname TO username;
   ```

   * **database_name**：数据库名称。
   * **schema_name**：Schema 名称。
   * **username**：用户名。




## 添加数据源

1. 登录 [Tapdata Cloud 平台](https://cloud.tapdata.net/console/v3/)。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建**。

4. 在弹出的对话框中，搜索并选择 **KingbaseES-R6**。

5. 在跳转到的页面，根据下述说明填写 KingbaseES-R6 的连接信息。

   ![KingbaseES-R6 连接示例](../../images/kingbasees_r6_connection.png)

   * **连接信息设置**
     * **连接名称**：填写具有业务意义的独有名称。
     * **连接类型**：支持将 KingbaseES-R6 作为源或目标库。
     * **地址**：数据库连接地址。
     * **端口**：数据库的服务端口。
     * **数据库**：数据库名称，即一个连接对应一个数据库，如有多个数据库则需创建多个数据连接。
     * **模型**：Schema 名称。
     * **额外参数**：额外的连接参数，默认为空。
     * **账号**：数据库的账号。
     * **密码**：数据库账号对应的密码。
     * **日志插件**：如需读取 KingbaseES-R6 的数据变更，实现增量数据同步，您需要根据[准备工作](#prerequisite)的指引，完成插件的安装。
   * **高级设置**
     * **时区**：默认为数据库所用的时区，您也可以根据业务需求手动指定。
     * **共享挖掘**：[挖掘源库](../../user-guide/advanced-settings/share-mining.md)的增量日志，可为多个任务共享源库的增量日志，避免重复读取，从而最大程度上减轻增量同步对源库的压力，开启该功能后还需要选择一个外存用来存储增量日志信息。
     * **包含表**：默认为**全部**，您也可以选择自定义并填写包含的表，多个表之间用英文逗号（,）分隔。
     * **排除表**：打开该开关后，可以设定要排除的表，多个表之间用英文逗号（,）分隔。
     * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定 Agent。
     * **模型加载频率**：数据源中模型数量大于 1 万时，Tapdata Cloud 将按照设置的时间定期刷新模型。
     * **开启心跳表**：当连接类型选择为**源头和目标**、**源头**时，支持打开该开关，由 Tapdata Cloud 在源库中创建一个名为 **_tapdata_heartbeat_table** 的心跳表并每隔 10 秒更新一次其中的数据（数据库账号需具备相关权限），用于数据源连接与任务的健康度监测。
       :::tip
       数据源需在数据复制/开发任务引用并启动后，心跳任务任务才会启动，此时您可以再次进入该数据源的编辑页面，即可单击**查看心跳任务**。
       :::

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::