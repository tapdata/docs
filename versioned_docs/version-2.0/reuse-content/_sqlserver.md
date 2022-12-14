:::tip

您必须以 sysadmin 的成员身份登录到 SQLServer Management Studio 或 sqlcmd。 增量复制是 SQLServer 2008 及更高版本支持的功能。 确保 SQL 代理 任务是启动状态（在 SQLServer Management Studio 里面左下角)

:::

### 支持版本

SQL Server 2005、2008、2008 R2、2012、2014、2016、2017

### 先决条件

#### 开启 Sql Server 数据库代理服务

- 查找 mssql-conf 工具

```shell
find / -name mssql-conf
```

- 开启代理服务

```shell
mssql-conf set sqlagent.enabled true
```

#### 启用数据库增量复制

- 数据库启用增量复制

```sql
use [数据库名称]
go
EXEC sys.sp_cdc_enable_db
go
```

其中 [数据库名称] 是要启用增量复制的数据库。

- 检查数据库是否启用增量复制

```sql
SELECT [name], database_id, is_cdc_enabled
FROM sys.databases
WHERE [name] = N'[数据库名称]'
go
```

其中 [数据库名称] 是您要复制的数据库。

#### 表开启增量复制

- 启用增量复制

```sql
use<数据库名称>
go
EXEC sys.sp_cdc_enable_table
@source_schema = N'[Schema]',
@source_name = N'[Table]',
@role_name = N'[Role]'
go
```

说明：

`<Schema> `：如`dbo`。

`<Table> `：是数据表的名称(没有 schema )。

`<Role>`：是可以访问更改数据的角色。如果您不想使用选通角色，请将其设置为`NULL`。

:::tip

如果在启用增量复制时指定了 ""，则必须确保提供给 Tapdata 的数据库用户名具有适当的角色，以便 Tapdata 可以访问增量复制表。

:::



- 检查是否为表启用了增量复制

```sql
use <数据库名称>
go
SELECT [name],is_tracked_by_cdc
FROM sys.tables
WHERE [name] = N'[table]'
go
```

- CDC的表执行DDL后

如果CDC的表对字段进行了增、删、改的DDL操作，则必须进行如下操作，否则在增量同步过程中，可能会出现数据不同步或者报错的情况

- 需要disable该表的CDC*

```sql
go
EXEC sys.sp_cdc_disable_table
@source_schema = N'[Schema]',
@source_name = N'[Table]',
@capture_instance = N'[Schema_Table]'
go
// capture_instance一般为schema_table的格式拼接而成，可以通过以下命令，查询实际的值
exec sys.sp_cdc_help_change_data_capture
@source_schema = N'[Schema]',
@source_name = N'[Table]';
```



- 重新enable开启CDC

```sql
use<数据库名称>
go
EXEC sys.sp_cdc_enable_table
@source_schema = N'[Schema]',
@source_name = N'[Table]',
@role_name = N'[Role]'
go
```

#### 版本低于 2008 的 CDC

MSSQL 从 SQLServer 2008 开始提供 CDC 支持。对于较早的版本，必须使用 “custom sql” 功能来模拟更改数据捕获。在从旧版本复制数据时，需要考虑以下几点：



- 源表必须有一个更改跟踪列，比如 LAST_UPDATED_TIME，它在每次插入或更新记录时都会更新。
- 在任务设置界面

确保只选择** INITIAL_SYNC** ，因为不支持** CDC

将 “重复运行自定义 SQL” 设置为 **True。这将导致重复执行定制 SQL。



- 在映射设计上提供适当的自定义 SQL





####  CDC 日志清理设置

SQL Server开启 CDC 后，不会自动清理增量数据日志，需要进行如下设置开启清理任务。

```plsql
--retention的单位为分钟，本处设定清理周期为2天

USE AdventureWorks2012;  
GO  
EXECUTE sys.sp_cdc_change_job   
    @job_type = N'cleanup',  
    @retention = 2880;  
GO 
```



#### SQL Server全库 CDC 设置

**开启全库 CDC**

```plsql
-- 全局替换 将 TAPDATA 替换为实际的数据库名
-- 全局替换 将 INSURANCE 替换为实际的 schema 名称
USE TAPDATA
GO
EXEC sys.sp_cdc_enable_db
GO

declare @table_name varchar(100)
declare @database_name varchar(100)
declare @schema_name varchar(100)

set @database_name = 'TAPDATA'
set @schema_name = 'INSURANCE'

declare my_cursor cursor for SELECT TABLE_NAME
                             FROM TAPDATA.INFORMATION_SCHEMA.TABLES
                             where TABLE_CATALOG = @database_name
                               and TABLE_SCHEMA = @schema_name;
open my_cursor
fetch next from my_cursor into @table_name
while @@FETCH_STATUS = 0
    begin
        begin try
            exec sys.sp_cdc_enable_table
                 @source_schema = @schema_name,
                 @source_name = @table_name,
                 @role_name = NULL
        end try
        begin catch
            print('[ERROR] ' + @table_name)
        end catch

        fetch next from my_cursor into @table_name
    end
close my_cursor
deallocate my_cursor
```

**关闭全库CDC**

```plsql
-- 全局替换 将 TAPDATA 替换为实际的数据库名
-- 全局替换 将 INSURANCE 替换为实际的 schema 名称
USE TAPDATA
GO

declare @table_name varchar(100)
declare @database_name varchar(100)
declare @schema_name varchar(100)

set @database_name = 'TAPDATA'
set @schema_name = 'INSURANCE'

declare my_cursor cursor for SELECT TABLE_NAME
                             FROM TAPDATA.INFORMATION_SCHEMA.TABLES
                             where TABLE_CATALOG = @database_name
                               and TABLE_SCHEMA = @schema_name;
open my_cursor
fetch next from my_cursor into @table_name
while @@FETCH_STATUS = 0
    begin
        begin try
            EXEC sys.sp_cdc_disable_table
                 @source_schema = @schema_name,
                 @source_name = @table_name,
                 @capture_instance = 'all';
        end try
        begin catch
            print ('[ERROR] ' + @table_name)
        end catch

        fetch next from my_cursor into @table_name
    end
close my_cursor
deallocate my_cursor

EXEC sys.sp_cdc_disable_db
GO
```



### SQL Server从节点同步配置

如果要从节点上做同步，除按照3（先决条件）配置之外，还需要：

SQL server从节点上的数据同步，需检查以下配置项：

1. 开启 SQL Server 数据库代理服务 ：

   ```sql
   mssql-conf set sqlagent.enabled true；
   ```

   

2. 开启SQL Server数据库增量复制：

   ```sql
   use 数据库名称
   go
   EXEC sys.sp_cdc_enable_db
   go
   ```

   

3. 开启SQL Server数据库表的增量复制：

   ```sql
   use 数据库名称
   Go
   EXEC sys.sp_cdc_enable_table
   @source_schema = N’schema’,
   @source_name = N’name’,
   @role_name = N’role’
   go
   ```

   


### SQL Server CDC 配置微软官方指引

当遇到本文未覆盖到的问题时，请参考[微软官方文档](https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/change-data-capture-stored-procedures-transact-sql?view=sql-server-ver15)。

