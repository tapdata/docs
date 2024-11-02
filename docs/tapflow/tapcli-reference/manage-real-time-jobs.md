

# 管理实时同步任务

本文介绍使用 TapData Shell 管理数据同步任务的完整参考，包括管理数据源、定义任务、执行数据过滤等操作。

## 创建实时同步任务

创建实时同步任务，需要依次调用 `read_from`、`write_to` 和 `save` 三个命令。

#### read_from

**命令说明**：指定实时同步任务的主数据源表，可通过 `data_source_name.table_name` 的方式指定，其中 `data_source_name` 可通过 `show dbs` 获取，或[新建数据源](manage-data-sources.md)。

此外，您还可以通过 `query`自定义查询语句，替代默认的 `select * from table`。

**使用示例**：

```python
# 读取 MySQL 表数据
tap > myflow = Flow("DataFlow_Test")
          .read_from(mySqlSource.ecom_orders, query="select * from ecom_orders LIMIT 2000");
```

#### write_to

**命令说明**：将实时同步任务的数据写入到指定目标数据源。

```python
# 将数据实时写入到 MongoDB 中
tap > myflow.write_to("MongoDB_Local.ecom_orders",);
```

#### save

**命令说明**：保存当前任务的配置，使其成为持久化的任务。调用 `save()` 后，该数据同步任务任务即可被启动或停止。

```python
# 保存并创建持久化数据同步任务
tap > myflow.save();
```

#### 最简示例

将所有步骤合并成一个完整示例，用于从 MySQL 读取订单数据并写入 MongoDB，保存后可执行 [start](#start) 命令来启动该任务。

```python
# 创建数据同步任务
tap > myflow = Flow("DataFlow_Test")
          .read_from("mySqlSource.ecom_orders", query="SELECT * FROM ecom_orders LIMIT 2000")
          .write_to("mongodbSource.Orders")
          .save();
```

:::tip

以上为最简示例，TapData 还支持设置 `write_to` 前，[添加处理节点](#add-nodes)来实现更加复杂和个性化的数据流转能力，具体见下文。

:::

## <span id="add-nodes">增加处理节点</span>

### js

**命令说明**：在数据同步任务中嵌入 JavaScript 代码，可对源库的数据进行灵活的自定义处理。更多介绍，见[标准](../../appendix/standard-js.md) / [增强](../../appendix/standard-js.md) JS 节点内置函数说明。

**使用示例**：以下示例中，我们在 js 处理节点中为已交付的订单添加确认状态字段，便于快速识别订单状态。处理后的记录将写入目标 MongoDB 数据库的 `updatedCollection` 集合。

```python
# 定义 JavaScript 代码，将确认状态添加到已交付的订单记录中
tap > jscode = '''
if (record.order_status == 'delivered') {
    record.confirmation_status = 1;  // 为已交付的订单添加确认字段
}
return record;  // 返回处理后的记录
'''

# 创建数据同步任务，应用 JavaScript 代码，并将结果写入目标数据库
tap > flow = Flow("Order_Status_Update")  \
          .read_from(mySqlSource.ecom_orders)  \
          .js(jscode)  \
          .write_to(mongodbSource.updatedCollection)  \
          .save();
```



### py

**命令说明**：在数据同步任务中嵌入 Python 函数，用于处理记录。通过 `py` 节点，可以根据自定义逻辑筛选和转换数据，提升数据处理的灵活性。

**使用示例**：以下示例中，我们定义了一个 Python 函数 `pyfunc`，仅保留状态为已交付的订单，其余记录将被过滤掉。处理后的记录将写入 MongoDB 的 `pythonProcessedCollection` 集合。

```python
# 定义 Python 函数，仅保留已交付的订单
tap > def pyfunc(record):
         if record['order_status'] != 'delivered':
             return None  # 返回 None 以过滤不符合条件的记录
         return record  # 返回处理后的记录

# 创建数据同步任务，应用 Python 函数，并将结果写入目标数据库
tap > flow = Flow("Python_Function")  \
          .read_from(mySqlSource.ecom_orders)  \
          .py(pyfunc)  \
          .write_to(mongodbSource.pythonProcessedCollection)  \
          .save();
```



### add_fields

**命令说明**：向记录中添加新字段，可通过 JavaScript 表达式计算字段值，从而实现支持动态字段扩展。

**使用示例**：在下述示例中，我们添加两个新字段：`status_flag` 设置为 `'completed'`，`order_value` 设置为 `100.5`，并将结果写入 MongoDB 的 `additionalFieldsCollection` 集合。

```python
# 创建数据同步任务，添加新字段并指定字段值
tap > flow = Flow("Add_Field_Test")  \
          .read_from(mySqlSource.ecom_orders)  \
          .add_fields([['status_flag', 'String', "'completed'"], ['order_value', 'Double', '100.5']])  \
          .write_to(mongodbSource.additionalFieldsCollection)  \
          .save();
```

### rename_fields

**命令说明**：在记录中重命名指定字段，用于优化字段名称的可读性或符合业务需求。

**使用示例**：以下示例将 `order_status` 字段重命名为 `status`，`order_id` 字段重命名为 `id`，处理后的记录写入 MongoDB 的 `renamedFieldsCollection` 集合。

```python
# 创建数据同步任务，重命名指定字段
tap > flow = Flow("Rename_Fields_Test")  \
          .read_from(mySqlSource.ecom_orders)  \
          .rename_fields({'order_status': 'status', 'order_id': 'id'})  \
          .write_to(mongodbSource.renamedFieldsCollection)  \
          .save();
```



### include

**命令说明**：仅保留记录中的指定字段，可通过通配符选择多个字段，便于精简输出内容或按需展示数据。

**使用示例**：以下示例仅保留 `order_status` 和 `order_id` 字段，并将处理后的记录写入 MongoDB 的 `includedFieldsCollection` 集合。

```python
# 创建数据同步任务，写入到目标库时仅包含指定字段
tap > flow = Flow("Include_Fields_Test")  \
          .read_from(mySqlSource.ecom_orders)  \
          .include("order_status", "order_id")  \
          .write_to(mongodbSource.includedFieldsCollection)  \
          .save();
```

### exclude

**命令说明**：排除记录中的指定字段，用于隐藏敏感信息或去除不必要的字段。

**使用示例**：以下示例排除了 `order_status` 和 `order_delivered_customer_date` 字段，处理后的记录将写入 MongoDB 的 `excludedFieldsCollection` 集合。

```python
# 创建数据同步任务，写入到目标库时排除指定字段
tap > flow = Flow("Exclude_Fields_Test")  \
          .read_from(mySqlSource.ecom_orders)  \
          .exclude("order_status", "order_delivered_customer_date")  \
          .write_to(mongodbSource.excludedFieldsCollection)  \
          .save();
```



### lookup

**命令说明**：在多个来源的数据表执行类似“**左连接**”（LEFT JOIN）的操作，将关联表的数据嵌入主表中，常用于构建实时宽表场景，将分散在多个表中的数据汇总至主表中，实现实时数据扩展，为后续的查询或分析提供完整视图，提升查询分析效率。

**参数说明**：

- **from_table_name**：指定要关联的表名，格式为 `data_source_name.table_name`，其中 `data_source_name` 可通过 `show dbs` 获取，或[新建数据源](manage-data-sources.md)。
- **relation**：连接字段的映射关系，母亲仅支持等值连接，将关联表中的记录匹配到主表的记录中。
- **embed_path**：嵌入数据的路径。可以将关联数据嵌入为子文档（`object`）或数组（`array`）。
- **embed_type**：定义嵌入的数据结构类型，`object` 表示一对一关系，`array` 表示一对多关系。
- **includes**：选择包含在结果中的字段，字段名以逗号分隔。

**使用示例**：

以下示例展示了如何通过 `lookup` 将 `order_payments` 表中的数据嵌入到 `ecom_orders` 表的记录中，从而生成一个包含订单及其支付信息的宽表，并将结果写入 MongoDB 的 `ordersWithPayments` 集合。

```python
tap > flow = Flow("Order_Payment_Join")
          .read_from(mySqlSource.ecom_orders)
          .lookup("mySqlSource.order_payments", relation=[["order_id", "order_id"]],
                  embed_path="payments", embed_type="array")
          .write_to(mongodbSource.ordersWithPayments)
          .save();
```

在此示例中，`ecom_orders` 作为主表，`order_payments` 作为从表，通过 `order_id` 进行等值连接，并将支付信息嵌入到 `payments` 字段下（`embed_type` 为 `array`），从而实现一对多的数据整合。




## 管理实时同步任务
### show jobs

**命令说明**：展示所有实时同步任务，包含任务名称、状态及同步类型等信息，其中同步类型包含 **initial_sync**（全量数据同步）和 **cdc**（增量数据同步）

**使用示例**：

```python
tap > show jobs
d7c298: Oracle_Sync_Test       complete     sync/initial_sync+cdc
```



### **stats <flow name/id>**

**命令说明**：显示数据同步任务的运行统计信息。

**使用示例**：

```python
stats MySQL_A_to_B
job current status is: running, qps is: 0.0, total rows: 0, delay is: 0ms
```



### start <flow name/id>

**命令说明**：启动指定的实时同步任务，默认情况下首次启动会执行全量数据同步，完成后自动进入增量数据同步阶段。如果实时同步任务配置为仅全量则完成全量，则仅执行一次全量数据同步；如果配置为仅增量默认，则从指定的起始点或当前时间点开始同步增量数据。

**使用示例**：

```python
tap > start MySQL_A_to_B
Task start succeed 
```



### stop <flow name/id>

**命令说明**：停止指定的实时同步任务，停止任务后，下次启动将基于上次停止的增量时间点继续同步数据。

**使用示例**：

```python
tap > stop MySQL_A_to_B
Task stop succeed 
```



### **logs <flow name/id>**

**命令说明**：显示指定实时同步任务的日志信息。

```python
tap > logs Oracle_Sync_Test
{'id': '671f9c54cc9caf4b1cb1942b', 'customId': '638af042703dd67b8fb63af8', 'level': 'INFO', 'timestamp': 1730124884471, 'date': '2024-10-28T14:14:43.568+00:00', 'taskId': '668f197a37800f4b2a167806', 'taskRecordId': '671f9bee548ec6691e89681c', 'taskName': 'MySQL_A_to_B', 'nodeId': '4eb098ee-19f8-4e63-a7bf-9d7e726c62ea', 'nodeName': 'Region_A', 'message': 'Node Region_A[4eb098ee-19f8-4e63-a7bf-9d7e726c62ea] start preload schema,table counts: 1', 'logTags': [], 'data': [], 'user_id': '638af042c162f518b1b9bdf4'}
```



### reset  <flow name/id>

**命令说明**：清除任务的数据同步进度，下次启动将重新执行实时同步任务。

**使用示例**：

```python
tap > reset MySQL_B_to_A
Task reset success 
```



### delete <flow name/id>

**命令说明**：删除指定的实时同步任务。

:::warning

任务删除后将无法恢复，请谨慎操作。

:::

**使用示例**：

```python
tap > delete MySQL_A_to_B
Task deleted successfully
```
