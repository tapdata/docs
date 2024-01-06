# Oracle

Oracle Database（简称 Oracle）是甲骨文公司的一款关系数据库管理系统。在创建 Oracle 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。
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

## 作为源库

1. 以具有 DBA 权限的用户身份登录 Oracle <span id="source">数据库</span>。

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



## 作为目标库

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





## 开启 SSL 连接（可选）



为进一步提升数据链路的安全性，您还可以选择为 Oracle 数据库开启 SSL（Secure Sockets Layer）加密，实现在传输层对网络连接的加密，在提升通信数据安全性的同时，保证数据的完整性。

接下来，我们以部署在 Linux 平台上的 Oracle 12c 为例，演示具体的<span id="ssl">操作流程</span>：

1. 登录 Oracle 数据库所属的设备，依次执行下述命令，调整目录权限并切换至 Oracle 用户。

   ```bash
   chown oracle:dba /opt/oracle/ -R
   su oracle
   mkdir -p /opt/oracle/wallet
   ```

2. 依次执行下述格式的命令，创建存放证书文件的目录并生成 Key 文件，其中 `{password}` 需更换为要设置的密码。

   ```bash
   $ORACLE_HOME/bin/orapki wallet create -wallet /opt/oracle/wallet -pwd {password} -auto_login
   $ORACLE_HOME/bin/orapki wallet add -wallet /opt/oracle/wallet  -pwd {password}   -dn "CN=localhost" -keysize 1024 -self_signed -validity 365
   ```


3. 执行下述命令，生成 jks 文件，需更换 {password} 为对应的密码。

   ```bash
   $ORACLE_HOME/bin/orapki wallet pkcs12_to_jks -wallet /opt/oracle/wallet -pwd {password} -jksKeyStoreLoc /opt/oracle/wallet/oracle12c_ks.jks -jksKeyStorepwd {password} -jksTrustStoreLoc /opt/oracle/wallet/oracle12c_ts.jks -jksTrustStorepwd {password}
   ```

   如需转换 pem 文件，可再执行下述命令：

   ```bash
   cd /opt/oracle/wallet&& openssl pkcs12 -clcerts -nokeys -out oracle_cert.pem -in ewallet.p12
   ```

4. 创建相关配置文件，完成 SSL 的配置。

   ```bash
   # 该目录需基于您的环境调整
   cd /u01/app/oracle/product/12.1.0/xe/network/admin
   touch listener.ora
   touch sqlnet.ora
   touch tnsnames.ora
   ```

   配置文件添加的内容分别如下：

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="listener.ora">
```

```bash
# listener.ora

SSL_CLIENT_AUTHENTICATION = FALSE

WALLET_LOCATION =
  (SOURCE =
    (METHOD = FILE)
    (METHOD_DATA =
      (DIRECTORY = /opt/oracle/wallet)
    )
  )

LISTENER =
(DESCRIPTION_LIST =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1))
    (ADDRESS = (PROTOCOL = TCP)(HOST = 0.0.0.0)(PORT = 1521))
  )
  (DESCRIPTION =
     (ADDRESS = (PROTOCOL = TCPS)(HOST = 0.0.0.0)(PORT = 2484))
   )
)

DEDICATED_THROUGH_BROKER_LISTENER=ON
DIAG_ADR_ENABLED = off
```

</TabItem>

<TabItem value="sqlnet.ora">

```bash
# sqlnet.ora

WALLET_LOCATION =
   (SOURCE =
     (METHOD = FILE)
     (METHOD_DATA =
       (DIRECTORY = /opt/oracle/wallet)
     )
   )

SQLNET.AUTHENTICATION_SERVICES = (TCPS,NTS,BEQ)
SSL_CLIENT_AUTHENTICATION = FALSE
SSL_CIPHER_SUITES = (SSL_RSA_WITH_AES_256_CBC_SHA, SSL_RSA_WITH_3DES_EDE_CBC_SHA)
```

</TabItem>

<TabItem value="tnsnames.ora">

```bash
# tnsnames.ora

SSL=
(DESCRIPTION =
  (ADDRESS = (PROTOCOL = TCPS)(HOST = 0.0.0.0)(PORT = 2484))
  (CONNECT_DATA =
    (SERVER = DEDICATED)
    (SERVICE_NAME = XE)
  )
)

XE=
(DESCRIPTION =
  (ADDRESS = (PROTOCOL = TCP)(HOST = 0.0.0.0)(PORT = 1521))
  (CONNECT_DATA =
    (SERVER = DEDICATED)
    (SERVICE_NAME = XE)
  )
)
```

</TabItem>
</Tabs>

5. 在业务低峰期，依次执行下述命令重启 Oracle 服务。

   ```bash
   $ORACLE_HOME/bin/lsnrctl stop
   $ORACLE_HOME/bin/lsnrctl start
   $ORACLE_HOME/bin/sqlplus / as sysdba
   shutdown
   startup
   ```

6. 验证 Oracle 可通过 SSL 登录，例如 `$ORACLE_HOME/bin/sqlplus username/password@SSL`。






## 下一步

[连接 Oracle 数据库](../../user-guide/connect-database/certified/connect-oracle)



