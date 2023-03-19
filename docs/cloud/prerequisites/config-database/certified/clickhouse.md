# ClickHouse

ClickHouse 是一个用于联机分析（OLAP）的列式数据库管理系统（DBMS）。在创建 ClickHouse 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。

## 支持版本

ClickHouse v21.x

## 注意事项

暂不支持 binary 相关的字段类型，如包含在配置数据同步/开发任务时，通过字段映射将其删除。

## 准备工作

1. 调整配置文件 **user.xml**，启用访问权限控制并重启服务，具体操作，见[官方文档](https://clickhouse.com/docs/zh/operations/access-rights#enabling-access-control)。

   :::tip

   您也可以使用通过修改该文件[完成账号配置](https://clickhouse.com/docs/zh/operations/settings/settings-users/)，本文演示权限控制开启后，如何创建和授权账号。

   :::

2. 登录 ClickHouse 数据库，执行下述格式的命令，创建用于数据同步/开发任务的账号。

   ```sql
   CREATE USER username HOST 'host' IDENTIFIED WITH protection BY 'password';
   ```

   * **username**：用户名。
   * **host**：允许该账号登录的主机，**ANY** 表示允许任意主机。
   * **protection**：密码保护方式。
   * **password**：密码。

   示例：创建一个名为 **tapdata** 的账号，采用 sha256_password 密码保护机制，允许其从任意主机登录。

   ```sql
   CREATE USER tapdata HOST ANY IDENTIFIED WITH sha256_password BY 'Tap@123456';
   ```

3. 为刚创建的账号授予权限，简易示例如下，推荐基于业务需求设置更精细化的权限控制。更多介绍，见[授权语法](https://clickhouse.com/docs/zh/sql-reference/statements/grant/)。

   ```sql
   GRANT ALL ON database_name.table_name TO 'username' WITH GRANT OPTION;
   ```

   * **database_name.table_name**：要授予权限的库和表，名称间用英文句号（.）分隔，例如 demodata.customer。
   * **usernmae**：用户名。

## 下一步

至此，已完成相关准备工作，接下来，您可以连接 [ClickHouse 数据源](../../../user-guide/connect-database/certified/connect-clickhouse.md)。

