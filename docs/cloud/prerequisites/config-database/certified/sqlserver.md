# SQL Server

安装 Agent 后，您需要在 Tapdata Cloud 平台为 Agent 和 SQL Server 数据库建立连接，完成操作后即可在数据复制/开发任务中使用该数据源。本文介绍建立连接前的准备工作（如授权账号等）。

## 支持版本

SQL Server 2005、2008、2008 R2、2012、2014、2016、2017



## 作为源库

:::tip

由于 CDC 支持从 SQLServer 2008 开始支持，对于较早的版本，您需要使用 Custom SQL 功能来模拟更改数据捕获，在从旧版本复制数据时，需要考虑以下几点：

- 源表必须有一个更改跟踪列，比如 **LAST_UPDATED_TIME**，它在每次插入或更新记录时都会更新。
- 创建数据同步任务时，任务的同步类型选择为**全量**，将**重复运行自定义 SQL**设置为 **True**，同时在映射设计上提供适当的自定义 SQL。

:::

1. 以 sysadmin 的身份登录到 SQLServer Management Studio 或 sqlcmd。

2. 查找 mssql-conf 工具并开启代理服务。

   ```bash
   mssql-conf set sqlagent.enabled true
   ```

3. 执行下述命令，启用数据库、数据表的增量复制。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
    <TabItem value="dbcdc" label="为数据库启用增量复制" default>
    <pre>--启用增量复制<br />
   use [数据库名称]<br />
   go<br />
   EXEC sys.sp_cdc_enable_db<br />
   go
   <br />
   <br />
   --查看是否启用增量复制<br />
   SELECT [name], database_id, is_cdc_enabled<br />
   FROM sys.databases<br />
   WHERE [name] = N'[数据库名称]'<br />
   go</pre>
   </TabItem>
   <TabItem value="tablecdc" label="为数据表启用增量复制">
    <pre>--启用增量复制<br />
    use [数据库名称]<br />
go
EXEC sys.sp_cdc_enable_table<br />
@source_schema = N'[Schema]',<br />
@source_name = N'[Table]',<br />
@role_name = N'[Role]'<br />
go<br />
<br />
--查看是否启用增量复制<br />
use [数据库名称]<br />
go<br />
SELECT [name],is_tracked_by_cdc<br />
FROM sys.tables<br />
WHERE [name] = N'[table]'<br />
go</pre>
<ul>
<li>Schema：Schema 名称，例如 dbo。</li>
<li>Table：数据表的名称。</li>
<li>Role：可以访问更改数据的角色，如不希望使用设置角色，可将其设置为 NULL。</li>
</ul>
<p>如果在启用增量复制时指定了角色，则需确保数据库用户具有适当的角色，以便 Tapdata Cloud 可以访问增量复制表。</p>
   </TabItem>
  </Tabs>

4. 如果对增量同步表的字段执行了 DDL 操作（如增加字段），您需要执行下述操作重启 CDC，否则可能出现数据无法同步或报错等情况。

   ```sql
   --关闭该表的 CDC
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
   
   
   --启动该表的 CDC
   use [数据库名称]
   go
   EXEC sys.sp_cdc_enable_table
   @source_schema = N'[Schema]',
   @source_name = N'[Table]',
   @role_name = N'[Role]'
   go
   ```

5. （可选）如需向从节点读取增量数据以实现数据同步，您需要为从节点设置上述步骤。

6. 创建用于数据同步/开发任务的账号并授予 sysadmin 权限，具体操作，见 [CREATE USER](https://docs.microsoft.com/zh-cn/sql/t-sql/statements/create-user-transact-sql?view=sql-server-2017)。



## 下一步

[连接 SQL Server 数据库](../../../user-guide/connect-database/certified/connect-sqlserver.md)





## 扩展阅读

* 如遇到本文未覆盖到的问题，请参考[微软官方文档](https://docs.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/change-data-capture-stored-procedures-transact-sql?view=sql-server-ver15)。

* 清理 CDC 日志

  SQL Server 不会自动清理增量数据日志，需要进行如下设置开启清理任务。

  ```sql
  --retention 的单位为分钟，本处设定清理周期为2天
  USE AdventureWorks2012;  
  GO  
  EXECUTE sys.sp_cdc_change_job   
      @job_type = N'cleanup',  
      @retention = 2880;  
  GO 
  ```

* 开启全库 CDC

  ```sql
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

* 关闭全局 CDC

  ```sql
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

  
