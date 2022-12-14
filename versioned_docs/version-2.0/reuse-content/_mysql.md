### 支持版本 

MySQL 5.0、5.1、5.5、5.6、5.7、8.x

### 前提条件 （作为源）

#### 开启binlog

- 必须开启 MySQL 的 binlog ，Tapdata 才能正常完成同步工作。
- 级连删除（CASCADE DELETE），这类由数据库产生的删除不会记录在binlog内，所以不被支持。 修改 `$MYSQL_HOME/mysql.cnf`, 例如:

```bash
server_id         = 223344
log_bin           = mysql-bin
expire_logs_days  = 1
binlog_format     = row
binlog_row_image  = full
```

配置解释：

- server_id: 对于 MySQL 中的每个服务器和复制客户端必须是唯一的，且 server_id 必须大于0
- binlog_format：必须设置为 row 或者 ROW
- binlog_row_image:  必须设置为 full
- expire_logs_days：二进制日志文件保留的天数，到期会自动删除
- log_bin：binlog 序列文件的基本名称

#### 重启MySQL

```bash
/etc/inint.d/mysqld restart
```

验证 binlog 已启用，请在 mysql shell 执行以下命令

```bash
show variables like 'binlog_format';
```

输出的结果中，format value 应该是"ROW"

#### 创建MySQL账号

Mysql8以后，对密码加密的方式不同，请注意使用对应版本的方式，设置密码，否则会导致无法进行增量同步 使用以下命令，确认 supplemental logging 是否开启

**3.3.1 5.x版本**

```bash
create user 'username'@'localhost' identified by 'password';
```

**3.3.2 8.x版本**

```bash
// 创建用户
create user 'username'@'localhost' identified with mysql_native_password by 'password';
// 修改密码
alter user 'username'@'localhost' identified with mysql_native_password by 'password';
```

#### 给 tapdata 账号授权

对于某个数据库赋于 select 权限

```bash
GRANT SELECT, SHOW VIEW, CREATE ROUTINE, LOCK TABLES ON <DATABASE_NAME>.<TABLE_NAME> TO 'tapdata' IDENTIFIED BY 'password';
```

对于全局的权限

```bash
GRANT RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'tapdata' IDENTIFIED BY 'password';
```

### 前提条件（作为目标）

对于某个数据库赋于全部权限

```bash
GRANT ALL PRIVILEGES ON <DATABASE_NAME>.<TABLE_NAME> TO 'tapdata' IDENTIFIED BY 'password';
```

对于全局的权限

```bash
GRANT PROCESS ON *.* TO 'tapdata' IDENTIFIED BY 'password';
```

### 常见错误

“Unknown error 1044”

如果权限已经授予，但是通过tapdata还是无法通过测试连接，可以通过下面的步骤检查并修复

```bash
SELECT host,user,Grant_priv,Super_priv FROM mysql.user where user='username';
//查看Grant_priv字段的值是否为Y
//如果不是，则执行以下命令
UPDATE mysql.user SET Grant_priv='Y' WHERE user='username';
FLUSH PRIVILEGES;
```



### 从 MySQL 从库同步的配置

在使用MySQL从库做同步时，除在从库上开启以上设置外（参考3.先决条件），还需要：

1. 数据同步前检查主从库是否一致，不一致时可查看从节点状态：`SHOW SLAVE STATUS`，

   根据具体报错修复后，再执行数据同步。

2. 当数据不可同步时，检查MySQL库的参数配置：

   `Select @@log_slave_updates`

   log_slave_updates=1 才可执行数据同步。

