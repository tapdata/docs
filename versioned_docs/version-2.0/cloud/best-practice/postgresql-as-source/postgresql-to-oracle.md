# PostgreSQL 实时同步至 Oracle

Tapdata Cloud 可以实现数据从 PostgreSQL 数据库到 Oracle 的数据同步。 

## 准备工作 

在创建同步任务前，请确保你已经配置好了相关的数据源，如果还没有，请参考： 

1. [注册 Tapdata Cloud](https://cloud.tapdata.net)
2. [配置 PostgreSQL 连接](../../user-guide/connect-database/connect-postgresql.md)
3. [配置 Oracle 连接](../../user-guide/connect-database/connect-oracle.md)

同时还请注意参考[数据类型支持说明](../../user-guide/no-supported-data-type.md)，确保你需要操作的数据库版本在系统支持的列表里。

## 配置任务 

请参考以下文档，根据你的需求，选择全量或增量数据同步。

具体操作，见[创建数据同步任务](../../quick-start/create-task)。

## 任务管理 

配置并执行同步任务后，你还可以通过任务列表页面，对任务进行启动/停止、监控、编辑、复制、重置、删除等操作。 

具体操作，见[管理任务](../../user-guide/copy-data/manage-task.md)。