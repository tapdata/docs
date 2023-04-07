# Oracle

Oracle Database（简称 Oracle）是甲骨文公司的一款关系数据库管理系统。在创建 Oracle 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。

## 支持版本 

Oracle 9i、10g、11g、12c、19c

## 注意事项
* 如设置了 connect_time（自动断开超时会话），可能导致实时同步异常，可通过下述命令检查该参数的设置。

  ```sql
  select resource_name, limit from dba_profiles where profile=( select profile from dba_users where username = '<username>');
  ```

* 您需要为归档日志预留足够的存储空间，避免存储占满影响数据库运行。
## 功能限制

* Oracle 作为源库时：
  * 日志解析速度约为 10,000 QPS，如增量事件高于该速率，可能导致数据处理的延迟上升。
  * 裸日志功能目前不支持在 RAC-ASM 的部署架构上使用，且不支持从 DG 架构的非主节点获取裸日志。
* Oracle 作为目标库时：
  * Db2 的非空字段可以用""赋值，但相关字段向Oracle写入的时候，Oracle会认为该字段是NULL，从而导致非空字段写入失败。


## 作为源库

1. 以具有 DBA 权限的用户身份登录 Oracle 数据库。

2. 开启数据库归档模式（ARCHIVELOG）。

   :::tip

   您也可以执行 `select log_mode from v$database;` 命令来查看是否已开启该功能，返回结果为 **ARCHIVELOG** 表示已开启，可跳过本步骤。

   :::

   1. 执行下述命令，关闭数据库，请务必在业务低峰期操作，以免影响业务运行。

      ```sql
      shutdown immediate;
      ```

   2. 执行下述命令，启动并挂载数据库。

      ```sql
      startup mount;
      ```

   3. 执行下述命令，开启存档并打开数据。

      ```sql
      alter database archivelog;
      alter database open;

3. 开启补充日志（Supplemental Logging）。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
    <TabItem value="9i" label="Oracle 9i" default>
    <pre>ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (PRIMARY KEY) COLUMNS;</pre>
   </TabItem>
   <TabItem value="10g11g" label="Oracle 10g、11g">
    <pre>ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;<br />
ALTER system switch logfile;<br />
ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;</pre>
   </TabItem>
   <TabItem value="12c" label="Oracle 12c">
    <pre>/* 执行下述命令，确认 supplemental logging 是否开启 */<br />
    SELECT supplemental_log_data_min, supplemental_log_data_pk, supplemental_log_data_all FROM v$database;
</pre>
<p>如果返回的前两列是 Yes 或 Implicit ，则表示只开启了 identification key logging（标识键日志），还需要开启 full supplemental logging（全补充日志）。 </p>
   </TabItem>
  </Tabs>

4. 开启标识键日志（identification key）。

   :::tip

   当使用 12c 的 PDB 时，推荐为容器的表开启日志，您可以执行先执行命令 `ALTER SESSION SET CONTAINER=<pdb>;`，将更改应用于容器。

   :::

   * **为单个表开启**

     ```sql
     ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
     ALTER TABLE <schema name>.<table name> ADD SUPPLEMENTAL LOG DATA (PRIMARY KEY) COLUMNS;
     ```

   * **为所有表开启**

     ```sql
     ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (PRIMARY KEY) COLUMNS;
     ```

5. 开启全补充日志（full supplemental logging）。

   * **为单个表开启**

     ```sql
     ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
     ALTER TABLE <schema name>.<table name> ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
     ```

   * **为所有表开启**

     ```sql
     ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
     ```

6. 提交更改。

   ```sql
   ALTER SYSTEM SWITCH LOGFILE;
   ```

7. 创建用于数据同步/开发任务的账号。

<Tabs className="unique-tabs">
    <TabItem value="account10g11g" label="Oracle 10g、11g" default>
    <pre>CREATE USER username IDENTIFIED BY password;<br />
GRANT create session, alter session, execute_catalog_role, select any dictionary, select any transaction, select any table, create any table, create any index, unlimited tablespace to user name;</pre>
   </TabItem>
   <TabItem value="account12c-m" label="Oracle 12c（多租户模式）">
    <pre>/* 在 Oracle 12c 的多租户环境下创建用户，必须在 cdb 中创建，并且命名格式约定为 c##name */<br />
    ALTER SESSION SET CONTAINER=cdb$root;<br />
CREATE USER username IDENTIFIED BY password CONTAINER=all;<br />
GRANT create session, alter session, set container, select any dictionary, select any transaction, logmining, execute_catalog_role, create any table, create any index, unlimited tablespace TO username CONTAINER=all;<br />
ALTER SESSION SET CONTAINER=pdb;</pre>
    <p>根据您对表的权限需求，重复执行最后一个命令来赋予 select 权限。当您配置的是源库连接时，请使用此用户来通过 JDBC 的身份验证。 注意必须使用整个用户名（包含 c ##）作为JDBC连接的用户名。</p>
   </TabItem>
   <TabItem value="account12c-s" label="Oracle 12c（标准模式）">
    <pre>/* 执行下述命令，确认 supplemental logging 是否开启 */<br />
    CREATE USER username IDENTIFIED BY password;<br />
GRANT create session, alter session, select any dictionary, select any transaction, logmining, execute_catalog_role, create any table, create any index, unlimited tablespace TO username;
</pre>
<p>根据您对表的权限需求，重复执行最后一个命令来赋予 select 权限。 </p>
   </TabItem>
  </Tabs>



## 作为目标库
1. 以具有 DBA 权限的用户身份登录 Oracle 数据库。

2. 创建用于数据同步/开发任务的账号，该账号拥有 schema 的 owner权限。

   具体操作，见 [CREATE USER](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_8003.htm) 和 [GRANT](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_9013.htm)。



## 下一步

[连接 Oracle 数据库](../../user-guide/connect-database/certified/connect-oracle)



