### 支持版本

Doris 0.15.0
暂时不支持无主键同步

### 前提条件（作为目标）

对于某个数据库赋于全部权限

```sql
GRANT ALL PRIVILEGES ON <DATABASE_NAME>.<TABLE_NAME> TO 'tapdata' IDENTIFIED BY 'password';
```

对于全局的权限

```sql
GRANT PROCESS ON *.* TO 'tapdata' IDENTIFIED BY 'password';
```
