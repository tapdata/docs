# MySQL

MySQL 是应用最广泛的开源关系数据库，是许多网站、应用程序、商业产品使用的关系数据存储。在创建 MySQL 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 支持版本 

MySQL 5.0、5.1、5.5、5.6、5.7、8.x

## 作为源库

保障任务的顺利执行，您需要为 MySQL 数据库开启 Binlog（可实现增量数据同步），然后为数据复制/开发任务创建一个数据库账号。

1. 登录 MySQL 数据库，执行下述格式的命令，创建用于数据同步/开发任务的账号。

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="MySQL 5.x">
```
```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```
</TabItem>

<TabItem value="MySQL 8.x">

```sql
CREATE USER 'username'@'host' IDENTIFIED WITH mysql_native_password BY 'password';
```
</TabItem>
</Tabs>

  * **username**：用户名。
  * **password**：密码。
  * **host**：允许该账号登录的主机，百分号（%）表示允许任意主机。

示例：创建一个名为 tapdata 的账号。

```sql
CREATE USER 'tapdata'@'%' IDENTIFIED BY 'Tap@123456';
```



2. 为刚创建的账号授予权限，简易示例如下，推荐基于业务需求设置更精细化的权限控制。

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="授予指定库权限">
```
```sql
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'username' IDENTIFIED BY 'password';
GRANT SELECT ON database_name.* TO 'username' IDENTIFIED BY 'password';
```
</TabItem>

<TabItem value="授予所有库权限">

```sql
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'username' IDENTIFIED BY 'password';
GRANT SELECT ON *.* TO 'username' IDENTIFIED BY 'password';
```
</TabItem>
</Tabs>

* **database_name**：要授予权限的数据库名称。
* **username**：用户名。
* **password**：密码。

3. 为保障读取 MySQL 数据库的增量数据，您需要跟随下述步骤开启 Binlog。

   1. 使用 `vim` 命令，修改 `$MYSQL_HOME/mysql.cnf` 中的配置，例如：

      ```
      server_id         = 223344
      log_bin           = mysql-bin
      expire_logs_days  = 1
      binlog_format     = row
      binlog_row_image  = full
      ```

      - **server_id**：对于 MySQL 中的每个服务器和复制客户端必须是唯一的，设置为大于 0 的整数
      - **log_bin**：Binlog 序列文件的基本名称
      - **expire_logs_days**：二进制日志文件保留的天数，到期自动删除
      - **binlog_format**：设置为 row
      - **binlog_row_image**：设置为 full

   2. 修改完成后，执行下述命令重启 MySQL 进程。

      ```bash
      /etc/inint.d/mysqld restart
      ```

   3. （可选）登录 MySQL 数据库，执行下述命令确认配置已生效，即输出的结果中，**format** 的值为 **ROW**。

      ```sql
      SHOW VARIABLES LIKE 'binlog_format';
      ```

      输出示例如下：

      ```sql
      +---------------+-------+
      | Variable_name | Value |
      +---------------+-------+
      | binlog_format | ROW   |
      +---------------+-------+
      1 row in set (0.00 sec)
      ```

      

## 作为目标库

1. 登录 MySQL 数据库，执行下述格式的命令，创建用于数据同步/开发任务的账号。

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="MySQL 5.x">
```
```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```
</TabItem>

<TabItem value="MySQL 8.x">

```sql
CREATE USER 'username'@'host' IDENTIFIED WITH mysql_native_password BY 'password';
```
</TabItem>
</Tabs>

  * **username**：用户名。
  * **password**：密码。
  * **host**：允许该账号登录的主机，百分号（%）表示允许任意主机。

示例：创建一个名为 tapdata 的账号。

```sql
CREATE USER 'tapdata'@'%' IDENTIFIED BY 'Tap@123456';
```



2. 为刚创建的账号授予权限。

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="授予指定库权限">
```
```sql
GRANT SELECT, INSERT, UPDATE, DELETE, ALTER, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, DROP, INDEX ON database_name.* TO 'username';
```
</TabItem>

<TabItem value="授予所有库权限">

```sql
GRANT SELECT, INSERT, UPDATE, DELETE, ALTER, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, DROP, INDEX ON *.* TO 'username';
```
</TabItem>
</Tabs>

* **database_name**：要授予权限的数据库名称。
* **username**：用户名。



## <span id="ssl">开启 SSL 连接（可选）</span>

为进一步提升数据链路的安全性，您还可以选择为 MySQL 数据库开启 SSL（Secure Sockets Layer）加密，实现在传输层对网络连接的加密，在提升通信数据安全性的同时，保证数据的完整性，具体操作流程如下：

1. 登录 MySQL 数据库所属的设备，运行 **mysql_ssl_rsa_setup** 程序来创建 SSL/RSA 文件，您可以通过 find 命令查找该程序的位置。

   在执行本步骤前，您可以登录 MySQL 数据库并执行 `SHOW GLOBAL VARIABLES LIKE '%ssl%';` 命令，查看是否生成过 SSL/RSA 文件及 SSL 开启状态。

   ```bash
   /usr/bin/mysql_ssl_rsa_setup
   ```

   :::tip

   * 运行该程序需确保您的设备已安装 **openssl**，例如在 CentOS 系统中，可执行 `yum install openssl -y` 命令来安装。
   * 命令执行完毕后，会自动生成文件： `ca-key.pem`、`server-key.pem` 和 `client-key.pem`，通常位于 `/var/lib/mysql/` 目录中，您可以将其下载至本机中，后续在配置连接时使用。

   :::

2. 使用 `vim` 命令，修改 `$MYSQL_HOME/mysql.cnf` 中的配置，开启强制 SSL 认证并指定相关 SSL/RSA 文件位置，修改完成后保存并退出编辑。

   ```bash
   [mysqld]
   require_secure_transport=ON
   # 自签名的 CA 证书
   ssl-ca=/var/lib/mysql/ca.pem
   # 服务端证书文件
   ssl-cert=/var/lib/mysql/server-cert.pem
   # 服务端私钥文件
   ssl-key=/var/lib/mysql/server-key.pem
   [client]
   ssl-mode=REQUIRED
   # 客户端连接服务端所需提供的证书文件
   ssl-cert=/var/lib/mysql/client-cert.pem
   # 客户端连接服务端所需提供的私钥文件
   ssl-key=/var/lib/mysql/client-key.pem
   ```

3. 登录 MySQL 数据库，**选择**执行下述格式的命令，调整数据同步/开发任务的账号。

   ```sql
   ALTER USER 'username'@'host' REQUIRE x509; -- 强制要求客户端提供有效证书
   ALTER USER 'username'@'host' REQUIRE ssl; -- 不强制要求客户端提供有效证书
   FLUSH PRIVILEGES;
   ```

   * **username**：用户名。
   * **host**：允许该账号登录的主机，例如使用百分号（%）以允许任意主机。

4. 重启 MySQL 数据库。



## 常见问题

* 问：可以使用从库作为源进行数据同步吗？

  答：可以，除在从库上开启以上设置外，还需要：

  1. 执行下述命令，检查 MySQL 库的参数配置，确保 **log_slave_updates** 的值为 1。

     ```sql
     Select @@log_slave_updates
     ```

  2. 检查主从库是否一致，不一致时可查看从节点状态：`SHOW SLAVE STATUS`，

     根据具体报错修复后，再执行数据同步。

* 问：Tapdata 连接测试时，提示错误：“Unknown error 1044”

  答：如果已经授予了正确的权限，可以通过下述方法检查并修复：

  ```sql
  SELECT host,user,Grant_priv,Super_priv FROM mysql.user where user='username';
  //查看Grant_priv字段的值是否为Y
  //如果不是，则执行以下命令
  UPDATE mysql.user SET Grant_priv='Y' WHERE user='username';
  FLUSH PRIVILEGES;
  ```

  

## 下一步

[连接 MySQL 数据库](../../user-guide/connect-database/certified/connect-mysql.md)

