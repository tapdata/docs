# ADB MySQL

请遵循以下说明以确保在 Tapdata 中成功添加和使用 ADB MySQL 数据库。

:::tip

ADB MySQL 暂仅支持作为源，且只能进行全量同步。

:::

### 支持版本

3.0

### 作为源

对于某个数据库赋于全部权限

```sql
GRANT SELECT, SHOW VIEW, CREATE ROUTINE, LOCK TABLES ON <DATABASE_NAME>.<TABLE_NAME> TO 'tapdata' IDENTIFIED BY 'password';
```



对于全局的权限

```sql
GRANT SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'tapdata' IDENTIFIED BY 'password';
```