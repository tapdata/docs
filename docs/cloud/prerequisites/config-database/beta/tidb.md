# TiDB

在创建 TiDB 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。

## 支持版本

TiDB 5.4 及以上


## 准备工作（作为源库）

1. 登录 TiDB 数据库，执行下述格式的命令，创建用于数据同步/开发任务的账号。

   ```sql
   CREATE USER 'username'@'host' IDENTIFIED BY 'password';
   ```

   * **username**：用户名。
   * **host**：允许该账号登录的主机，百分号（%）表示允许任意主机。
   * **password**：密码。

   示例：创建一个名为 tapdata 的账号，允许从任意主机登录。

   ```sql
   CREATE USER 'tapdata'@'%' IDENTIFIED BY 'Tap@123456';
   ```



2. 为刚创建的账号授予权限。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
    <TabItem value="onedatabase" label="授予指定库 SELECT 权限" default>
    <pre>GRANT SELECT, SHOW VIEW, CREATE ROUTINE, LOCK TABLES ON database_name.table_name TO 'username' IDENTIFIED BY 'password';</pre>
   </TabItem>
   <TabItem value="all" label="授予全局权限">
    <pre>GRANT RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'username' IDENTIFIED BY 'password';</pre>
   </TabItem>
  </Tabs>

* **database_name.table_name**：要授予权限的库和表，名称间用英文句号（.）分隔，例如 demodata.customer。
* **username**：用户名。
* **password**：密码。



:::tip

如希望将 TiDB 的数据实时同步至目标库，可在配置数据开发任务时，为源 TiDB 节点配置轮询字段来实现。

:::


## 准备工作（作为目标库）

1. 登录 TiDB 数据库，执行下述格式的命令，创建用于数据同步/开发任务的账号。

   ```sql
   CREATE USER 'username'@'host' IDENTIFIED BY 'password';
   ```

   * **username**：用户名。

   * **password**：密码。

   * **host**：允许该账号登录的主机，百分号（%）表示允许任意主机。

   示例：创建一个名为 tapdata 的账号。

   ```sql
   CREATE USER 'tapdata'@'%' IDENTIFIED BY 'Tap@123456';
   ```



2. 为刚创建的账号授予权限。

<Tabs className="unique-tabs">
    <TabItem value="onedatabase-t" label="授予指定库 SELECT 权限" default>
    <pre>GRANT SELECT, SHOW VIEW, CREATE ROUTINE, LOCK TABLES ON database_name.table_name TO 'username' IDENTIFIED BY 'password';</pre>
   </TabItem>
   <TabItem value="all-t" label="授予全局权限">
    <pre>GRANT RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'username' IDENTIFIED BY 'password';</pre>
   </TabItem>
  </Tabs>

* **database_name.table_name**：要授予权限的库和表，名称间用英文句号（.）分隔，例如 demodata.customer。
* **username**：用户名。
* **password**：密码。



## 下一步

至此，已完成相关准备工作，接下来，您可以连接 [TiDB 数据源](../../../user-guide/connect-database/beta/connect-tidb.md)。

