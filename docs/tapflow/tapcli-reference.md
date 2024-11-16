# 命令参考

TapData Shell 提供了丰富的命令来管理数据源和数据流任务，本文将详细介绍这些命令的用法。如需通过 API 进行数据源与数据流任务的自动化管理，请参考 [API 使用参考](api-reference/README.md)。

## 管理数据源

### show dbs

**命令说明**：列出所有已连接的数据源，包含连接 ID、状态、数据源类型和数据源名称。

**使用示例**：

```python
tap > show dbs
id         status     database_type        name                                      
4fa6c6     ready      MongoDB              MongoDB_ECommerce                       
4fa6c1     ready      Mysql                MySQL_ECommerce  
```

### use <db_name>

**命令说明**：选择要操作的数据源，后续可对其执行查看表等操作。

**使用示例**：

```python
tap > use MySQL_ECommerce
datasource switch to: MySQL_ECommerce
```

### show tables

**命令说明**：执行选择数据源命令后，可通过本命令查看当前数据库中的所有表名。

**使用示例**：

```python
tap > show tables
ecom_customers        ecom_order_items      ecom_order_payments   ecom_orders           ecom_product_category 
ecom_products         ecom_sellers   
```

### desc <table_name>

**命令说明**：执行选择数据源命令后，可通过本命令查看指定表的 Schema 信息（如列类型）。

**使用示例**：

```python
desc ecom_customers
{
  "customer_id": "varchar(255)",
  "customer_unique_id": "varchar(255)",
  "customer_zip_code_prefix": "varchar(255)",
  "customer_city": "varchar(255)",
  "customer_state": "varchar(255)"
}
```

### count  <table_name>

**命令说明**：执行选择数据源命令后，可通过本命令查看指定表的行数统计信息。

**使用示例**：

```python
count ecom_customers
table ecom_customers has 99002 records  
```



## 管理数据流任务
### show flows

**命令说明**：展示所有数据流任务，包含任务名称、状态及同步类型等信息，其中同步类型包含 **initial_sync**（全量数据同步）和 **cdc**（增量数据同步）

**使用示例**：

```python
tap > show flows
d7c298: Oracle_Sync_Test       complete     sync/initial_sync+cdc
```



### **status <flow name/id>**

**命令说明**：显示数据流任务的运行统计信息。

**使用示例**：

```python
status MySQL_A_to_B
job current status is: running, qps is: 31808.0, total rows: 1300000, delay is: 706ms
```



### start <flow name/id>

**命令说明**：启动指定的数据流任务，默认情况下首次启动会执行全量数据同步，完成后自动进入增量数据同步阶段。如果实时同步任务配置为仅全量则完成全量，则仅执行一次全量数据同步；如果配置为仅增量默认，则从指定的起始点或当前时间点开始同步增量数据。

**使用示例**：

```python
tap > start MySQL_A_to_B
Task start succeed 
```



### stop <flow name/id>

**命令说明**：停止指定的数据流任务，停止任务后，下次启动将基于上次停止的增量时间点继续同步数据。

**使用示例**：

```python
tap > stop MySQL_A_to_B
Task stop succeed 
```



### **logs <flow name/id>**

**命令说明**：显示指定数据流任务的日志信息。

```python
tap > logs Oracle_Sync_Test
{'id': '671f9c54cc9caf4b1cb1942b', 'customId': '638af042703dd67b8fb63af8', 'level': 'INFO', 'timestamp': 1730124884471, 'date': '2024-10-28T14:14:43.568+00:00', 'taskId': '668f197a37800f4b2a167806', 'taskRecordId': '671f9bee548ec6691e89681c', 'taskName': 'MySQL_A_to_B', 'nodeId': '4eb098ee-19f8-4e63-a7bf-9d7e726c62ea', 'nodeName': 'Region_A', 'message': 'Node Region_A[4eb098ee-19f8-4e63-a7bf-9d7e726c62ea] start preload schema,table counts: 1', 'logTags': [], 'data': [], 'user_id': '638af042c162f518b1b9bdf4'}
```



### reset  <flow name/id>

**命令说明**：清除数据流任务的数据同步进度，下次启动将重新执行任务。

**使用示例**：

```python
tap > reset MySQL_B_to_A
Task reset success 
```



### delete <flow name/id>

**命令说明**：删除指定的数据流任务。

:::warning

任务删除后将无法恢复，请谨慎操作。

:::

**使用示例**：

```python
tap > delete MySQL_to_MongoDB_Order
Are you sure you want to delete flow MySQL_to_MongoDB_Order (y/[n]): y
Task deleted successfully            
```
