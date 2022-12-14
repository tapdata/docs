# TiDB

请遵循以下说明以确保在 Tapdata 中成功添加和使用 TiDB 数据库。

### 支持版本

TiDB 5.x

### 前提条件（作为源）

对于某个数据库赋于select权限

```sql
GRANT SELECT, SHOW VIEW, CREATE ROUTINE, LOCK TABLES ON <DATABASE_NAME>.<TABLE_NAME> TO 'user' IDENTIFIED BY 'password';
```

对于全局的权限

```sql
GRANT RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'user' IDENTIFIED BY 'password';
```



### 前提条件（作为目标）

对于某个数据库赋于全部权限

```sql
GRANT ALL PRIVILEGES ON <DATABASE_NAME>.<TABLE_NAME> TO 'user' IDENTIFIED BY 'password';
```



对于全局的权限

```sql
GRANT PROCESS ON *.* TO 'user' IDENTIFIED BY 'password';
```