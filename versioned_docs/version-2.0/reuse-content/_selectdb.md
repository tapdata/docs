## 支持版本

SelectDB Cloud 2.0.13 以上

## 授予权限

授予某个数据库赋于全部权限

```sql
GRANT ALL PRIVILEGES ON <DATABASE_NAME>.<TABLE_NAME> TO 'tapdata' IDENTIFIED BY 'password';
```

授予全局的权限

```sql
GRANT PROCESS ON *.* TO 'tapdata' IDENTIFIED BY 'password';
```