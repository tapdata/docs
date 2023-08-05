# Oracle

Oracle Database（简称 Oracle）是甲骨文公司的一款关系数据库管理系统。完成 Agent 部署后，您可以跟随本文教程在 Tapdata Cloud 中添加 Oracle 数据源，后续可将其作为源或目标库来构建数据管道。
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 支持版本 

Oracle 9i、10g、11g、12c、19c

## 注意事项
* 如设置了 connect_time（自动断开超时会话），可能导致实时同步异常，可通过下述命令检查该参数的设置。

  ```sql
  SELECT resource_name, limit FROM dba_profiles WHERE profile=( SELECT profile FROM dba_users WHERE username = 'username');
  ```

* 您需要为归档日志预留足够的存储空间，可通过  `ALTER SYSTEM SET DB_RECOVERY_FILE_DEST_SIZE` 命令设置，避免存储占满影响数据库运行。
## 功能限制

* Oracle 作为源库时：
  * 日志解析速度约为 10,000 QPS，如增量事件高于该速率，可能导致数据处理的延迟上升。
  * 裸日志功能目前不支持在 RAC-ASM 的部署架构上使用，且不支持从 DG 架构的非主节点获取裸日志。
* Oracle 作为目标库时：
  * Db2 的非空字段可以用""赋值，但相关字段向Oracle写入的时候，Oracle会认为该字段是NULL，从而导致非空字段写入失败。


## 准备工作

### 作为源库

1. 以具有 DBA 权限的用户身份登录 Oracle 数据库。

2. 依次执行下述格式的命令，创建用于数据复制/转换任务的用户。

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="Oracle 标准模式">
```
```sql
CREATE USER username IDENTIFIED BY password;
```
</TabItem>

<TabItem value="Oracle 多租户模式">

```sql
-- 切换至根容器
ALTER SESSION SET CONTAINER=cdb$root;

-- 创建用户
CREATE USER username IDENTIFIED BY password CONTAINER=all;
```
</TabItem>
</Tabs>

   - **username**：用户名，当 Oracle 处于多租户模式下时，用户名需增加 `C##` 前缀。
   - **password**：密码。


3. 为刚创建的账号授予权限，您也可以基于业务需求自定义权限控制。

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="仅读取全量数据">
```
```sql
-- 替换下述命令中的 username 为真实的用户名
GRANT CREATE SESSION, SELECT ANY TABLE TO username;
```
</TabItem>

<TabItem value="读取全量+增量数据">

```sql
-- 替换下述命令中的 username 为真实的用户名
GRANT CREATE SESSION,
      ALTER SESSION,
      EXECUTE_CATALOG_ROLE,
      SELECT ANY DICTIONARY,
      SELECT ANY TRANSACTION,
      SELECT ANY TABLE
TO username;
```
:::tip
当 Oracle 版本为 12c 及以上时，您还需要执行 `GRANT LOGMINING TO username;` 格式的命令授予 `LOGMINING` 权限。
:::
</TabItem>
</Tabs>


4. 如果您需要获取源库的数据变更以实现增量同步，您还需要跟随下述步骤完成数据库设置。

   1. 开启数据库归档模式（ARCHIVELOG）。

      :::tip

      您也可以执行 `SELECT log_mode FROM v$database;` 命令来查看是否已开启该功能，返回结果为 **ARCHIVELOG** 表示已开启，可跳过本步骤。

      :::

      1. 执行下述命令，关闭数据库，请务必在业务低峰期操作，以免影响业务运行。

         ```sql
         SHUTDOWN IMMEDIATE;
         ```

      2. 执行下述命令，启动并挂载数据库。

         ```sql
         STARTUP MOUNT;
         ```

      3. 执行下述命令，开启存档并打开数据库。

         ```sql
         ALTER DATABASE archivelog;
         ALTER DATABASE OPEN;
         ```

   2. 开启补充日志（Supplemental Logging）。
      ```sql
      ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
      ```

   3. 选择执行下述命令，为单个表或所有表开启标识键日志（identification key）。

      ```sql
      -- 为单个表开启，需替换命令中 Schema 名称和 表名称
      ALTER TABLE Schema名称.表名称 ADD SUPPLEMENTAL LOG DATA (PRIMARY KEY) COLUMNS;
      
      -- 为所有表开启
      ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (PRIMARY KEY) COLUMNS;
      ```

      :::tip

      如果 Oracle 处于多租户模式，推荐为指定的容器开启，即在执行上述命令前先执行 `ALTER SESSION SET CONTAINER=PDB名称;` 格式的命令，将更改应用于容器。

      :::

   4. 选择执行下述命令，为单个表或所有表开启全补充日志（full supplemental logging）。

      ```sql
      -- 为单个表开启，需替换命令中 Schema 名称和表名称
      ALTER TABLE Schema名称.表名称 ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
      
      -- 为所有表开启
      ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
      ```

   5. 提交更改。

      ```sql
      ALTER SYSTEM SWITCH LOGFILE;
      ```
   
   6. 如果 Oracle 处于多租户模式，您还需要执行下述命令打开可插拔数据库。
   
      ```sql
      ALTER PLUGGABLE DATABASE ALL OPEN;
      ```



### 作为目标库

1. 以具有 DBA 权限的用户身份登录 Oracle 数据库。

2. 依次执行下述格式的命令，创建用于数据复制/转换任务的用户。

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="Oracle 标准模式">
```
```sql
CREATE USER username IDENTIFIED BY password;
```
</TabItem>

<TabItem value="Oracle 多租户模式">

```sql
-- 切换至根容器
ALTER SESSION SET CONTAINER=cdb$root;

-- 创建用户
CREATE USER username IDENTIFIED BY password CONTAINER=all;
```
</TabItem>
</Tabs>

   - **username**：用户名，当 Oracle 处于多租户模式下时，用户名需增加 `C##` 前缀。
   - **password**：密码。


3. 为刚创建的账号授予权限，您也可以基于业务需求自定义权限控制。

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="Oracle 标准模式">
```
```sql
-- 替换下述命令中的 username 为真实的用户名
GRANT CREATE SESSION,
      CREATE ANY TABLE,
      DELETE ANY TABLE,
      DROP ANY TABLE,
      INSERT ANY TABLE,
      SELECT ANY TABLE,
      UPDATE ANY TABLE,
      ALTER ANY INDEX,
      CREATE ANY INDEX,
      DROP ANY INDEX,
      UNLIMITED TABLESPACE
TO  username;
```
</TabItem>

<TabItem value="Oracle 多租户模式">

```sql
-- 替换下述命令中的 username 为真实的用户名
GRANT CREATE SESSION,
      CREATE ANY TABLE,
      DELETE ANY TABLE,
      DROP ANY TABLE,
      INSERT ANY TABLE,
      SELECT ANY TABLE,
      UPDATE ANY TABLE,
      ALTER ANY INDEX,
      CREATE ANY INDEX,
      DROP ANY INDEX,
      UNLIMITED TABLESPACE
TO  username CONTAINER=all;
```
</TabItem>
</Tabs>




## 添加数据源

1. 登录 [Tapdata Cloud 平台](https://cloud.tapdata.net/console/v3/)。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建连接**。

4. 在弹出的对话框中，单击**认证数据源**，然后选择 **Oracle**。

5. 在跳转到的页面，根据下述说明填写 Oracle 的连接信息。

   ![Oracle 连接示例](../../images/oracle_connection_cn.png)

   * 连接信息设置
      * **连接名称**：填写具有业务意义的独有名称。
      * **连接类型**：支持将 Oracle 作为源或目标库。
      * **连接方式**：可选择通过 SID 或 Service Name 连接。
      * **数据库地址**：数据库连接地址。
      * **端口**：数据库的服务端口。
      * **SID**/**Service Name**：填写 SID 或 Service Name 信息。
      * **Schema**：Schema 名称，即一个连接对应一个 Schema，如需连接多个 Schema 则需创建多个数据连接。
      * **其他连接串参数**：额外的连接参数，默认为空。
      * **账号**：数据库的账号。
      * **密码**：数据库账号对应的密码。
      * **多租户模式**：如 Oracle 为多租户模式，需打开该开关并填写 PDB 信息。

   * 高级设置
      * **日志插件**：保持默认（**logMiner**）。
      * **时间类型的时区**：默认为数据库所用的时区，您也可以根据业务需求手动指定。
      * **包含表**：默认为**全部**，您也可以选择自定义并填写包含的表，多个表之间用英文逗号（,）分隔。
      * **排除表**：打开该开关后，可以设定要排除的表，多个表之间用英文逗号（,）分隔。
      * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定 Agent。
      * **模型加载频率**：数据源中模型数量大于 1 万时，Tapdata Cloud 将按照设置的时间定期刷新模型。

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::



## 相关文档

[Oracle 实时同步至 Tablestore](../../best-practice/oracle-as-source/oracle-to-tablestore.md)



