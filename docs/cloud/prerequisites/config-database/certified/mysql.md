# MySQL

安装 Agent 后，您需要在 Tapdata Cloud 平台为 Agent 和 MySQL 数据库建立连接，完成操作后即可在数据复制/开发任务中使用该数据源。本文介绍建立连接前的准备工作（如授权账号等）。

## 支持版本 

MySQL 5.0、5.1、5.5、5.6、5.7、8.x

## 作为源库

保障任务的顺利执行，您需要为 MySQL 数据库开启 Binlog（可实现增量数据同步），然后为数据复制/开发任务创建一个数据库账号。

1. 登录 MySQL 数据库，执行下述格式的命令，创建用于数据同步/开发任务的账号。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
    <TabItem value="mysql5" label="MySQL 5.x" default>
    <pre>CREATE USER 'username'@'host' IDENTIFIED BY 'password';</pre>
   </TabItem>
   <TabItem value="mysql8" label="MySQL 8.x">
    <pre>CREATE USER 'username'@'host' IDENTIFIED WITH mysql_native_password BY 'password';</pre>
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

<Tabs className="unique-tabs">
    <TabItem value="onedatabase" label="授予指定库权限" default>
    <pre>GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'username' IDENTIFIED BY 'password';<br />
GRANT SELECT ON database_name.* TO 'username' IDENTIFIED BY 'password';</pre>
   </TabItem>
   <TabItem value="all" label="授予所有库权限">
    <pre>GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'username' IDENTIFIED BY 'password';<br />
GRANT SELECT ON *.* TO 'username' IDENTIFIED BY 'password';</pre>
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

<Tabs className="unique-tabs">
    <TabItem value="mysql5" label="MySQL 5.x" default>
    <pre>CREATE USER 'username'@'host' IDENTIFIED BY 'password';</pre>
   </TabItem>
   <TabItem value="mysql8" label="MySQL 8.x">
    <pre>CREATE USER 'username'@'host' IDENTIFIED WITH mysql_native_password BY 'password';</pre>
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

<Tabs className="unique-tabs">
    <TabItem value="onedatabase" label="授予指定库权限" default>
    <pre>GRANT SELECT, INSERT, UPDATE, DELETE, ALTER, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, DROP ON database_name.* TO 'username';</pre>
   </TabItem>
   <TabItem value="all" label="授予所有库权限">
    <pre>GRANT SELECT, INSERT, UPDATE, DELETE, ALTER, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, DROP ON *.* TO 'username';</pre>
   </TabItem>
  </Tabs>

* **database_name.table_name**：要授予权限的数据库名称。
* **username**：用户名。



## 常见问题

* 问：可以使用从库作为源进行数据同步吗？

  答：可以，除在从库上开启以上设置外，还需要：

  1. 执行下述命令，检查 MySQL 库的参数配置，确保 **log_slave_updates** 的值为 1。

     ```sql
     Select @@log_slave_updates
     ```

  2. 检查主从库是否一致，不一致时可查看从节点状态：`SHOW SLAVE STATUS`，

     根据具体报错修复后，再执行数据同步。

* 问：Tapdata Cloud 连接测试时，提示错误：“Unknown error 1044”

  答：如果已经授予了正确的权限，可以通过下述方法检查并修复：

  ```sql
  SELECT host,user,Grant_priv,Super_priv FROM mysql.user where user='username';
  //查看Grant_priv字段的值是否为Y
  //如果不是，则执行以下命令
  UPDATE mysql.user SET Grant_priv='Y' WHERE user='username';
  FLUSH PRIVILEGES;
  ```

  

## 下一步

[连接 MySQL 数据库](../../../user-guide/connect-database/certified/connect-mysql.md)

