# Greenplum

请遵循以下说明以确保在 Tapdata 中成功添加和使用Greenplum数据库。

### 支持版本

Greenplum 6.x 版本

### 作为源


```sql
GRANT SELECT ON ALL TABLES IN SCHEMA <schemaname> TO <username>;
```

### 作为目标

```sql
GRANT INSERT,UPDATE,DELETE,TRUNCATE ON ALL TABLES IN SCHEMA <schemaname> TO <username>;
```

以上只是基本权限的设置，实际场景可能更加复杂。

