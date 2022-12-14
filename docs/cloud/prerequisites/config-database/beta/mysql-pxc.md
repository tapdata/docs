# MySQL PXC

请遵循以下说明以确保在 Tapdata 中成功添加和使用 MySQL PXC 数据库。

### 支持版本

MySQL PXC 5.6、5.7、8.0

### 先决条件（作为源）

#### 开启 Binlog 和 GTID 模式

- 必须开启 MySQL PXC 的 binlog和GTID模式 ，Tapdata 才能正常完成同步工作。
- 级连删除（CASCADE DELETE），这类由数据库产生的删除不会记录在binlog内，所以不被支持。 修改 `$MYSQL_HOME/mysql.cnf`, 例如:

```bash
server_id                  = 223344
log_bin                    = mysql-bin
expire_logs_days           = 1
binlog_format              = row
enforce-gtid-consistency = ON
gtid_mode                 = ON
log-slave-updates         = ON
```

配置解释：

- server-id: 对于MySQL PXC集群中的每个服务器和复制客户端必须是唯一的，且 server_id 必须大于0

- binlog_format：必须设置为 row 或者 ROW

- expire_logs_days：二进制日志文件保留的天数，到期会自动删除

- log_bin：binlog 序列文件的基本名称

- enforce-gtid-consistency：实现GTID一致性

- gtid_mode：开启GTID复制模式 log-slave-updates：同步集群每一台 MySQL 的 binlog 日志文件


#### 重启 MySQL PXC集群

```bash
/etc/inint.d/mysqld restart
```

验证配置是否启用，请在 mysql shell 执行以下命令

```bash
show variables like 'binlog_format';
show variables like 'enforce-gtid-consistency';
show variables like 'gtid_mode';
show variables like 'log-slave-updates';
```

输出的结果中，value应该与配置的相同



#### 创建MySQL账号

Mysql8 以后，对密码加密的方式不同，请注意使用对应版本的方式，设置密码，否则会导致无法进行增量同步 使用以下命令，确认 supplemental logging 是否开启



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