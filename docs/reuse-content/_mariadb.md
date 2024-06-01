### 支持版本

MariaDB 10.x

### 前提条件（作为源）

#### 开启 binlog

- 必须开启 MariaDB 的 binlog ，TapData 才能正常完成同步工作。
- 级连删除（CASCADE DELETE），这类由数据库产生的删除不会记录在binlog内，所以不被支持。 修改 $MYSQL_HOME/mysql.cnf, 例如:

```bash
server_id         = 223344
log_bin           = mysql-bin
expire_logs_days  = 1
binlog_format     = row
```

配置解释：

- server-id: 对于 MariaDB 中的每个服务器和复制客户端必须是唯一的，且server_id必须大于0

- binlog_format：必须设置为 row 或者 ROW

- expire_logs_days：二进制日志文件保留的天数，到期会自动删除

- log_bin：binlog 序列文件的基本名称


#### 重启 MariaDB

```bash
/etc/inint.d/mysqld restart
```

验证 binlog 已启用，请在 mysql shell 执行以下命令

```bash
show variables like 'binlog_format';
```

输出的结果中，format value 应该是"ROW"



#### 创建MariaDB账号

```bash
create user 'username'@'localhost' identified by 'password';
```

#### 给 tapdata 账号授权

对于某个数据库赋于select权限

```bash
GRANT SELECT, SHOW VIEW, CREATE ROUTINE, LOCK TABLES ON <DATABASE_NAME>.<TABLE_NAME> TO 'tapdata' IDENTIFIED BY 'password';
```

对于全局的权限

```bash
GRANT RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT, SUPER ON *.* TO 'tapdata' IDENTIFIED BY 'password';
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