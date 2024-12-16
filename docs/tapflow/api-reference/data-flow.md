

# 数据流 API

本文介绍使用 TapFlow API 管理数据流的完整参考，包括定义任务来源/目标、执行数据处理等操作。

## 创建数据流任务

创建数据流任务，需要依次调用 `read_from`、`write_to` 和 `save` 三个命令。

#### read_from

**命令说明**：指定数据流任务的主数据源表，可通过 `data_source_name.table_name` 的方式指定，其中 `data_source_name` 可通过 `show dbs` 获取，或[新建数据源](data-source.md)。

此外，通过 `Source API` 实例化的对象可以直接作为数据源，特别是在需要更复杂配置（如多表同步、性能优化）的场景，更多使用方法及参数介绍，见[数据源定义进阶设置](data-source.md#advanced)。

**使用示例**：

```python
# 示例 1：简单表读取
tap> myflow = Flow("DataFlow_Test")  \
          .read_from("MongoDB_Demo.ecom_orders")

# 示例 2：指定表名，同时指定任务类型为数据复制任务，适用于多表同步场景
tap> source = Source("MongoDB_Demo", table=["ecom_orders"], mode="migrate")
tap> myflow = Flow("DataFlow_Test")  \
          .read_from(source)
```

如需使用自定义查询，可通过 `query` 参数直接指定，例如 `myflow.read_from("MongoDB_Demo.ecom_orders", query="SELECT * FROM ecom_orders WHERE status='active'")`

#### write_to

**命令说明**：将数据写入到指定目标数据源。

```python
# 将数据实时写入到 MongoDB 中
tap> myflow.write_to("MongoDB_Demo.ecom_orders");
```

#### save

**命令说明**：保存当前任务的配置，使其成为持久化的任务。调用 `save()` 后，该数据流任务即可被启动或停止。

```python
# 保存并创建持久化数据流任务
tap> myflow.save();
```

#### 最简示例

将所有步骤合并成一个完整示例，用于从 MySQL 读取订单数据并写入 MongoDB，保存后可执行 [start](#start) 命令来启动该任务。

```python
# 创建数据流任务
tap> myflow = Flow("DataFlow_Test")  \
          .read_from("MySQL_Demo.ecom_orders", query="SELECT * FROM ecom_orders LIMIT 2000")  \
          .write_to("MongoDB_Demo.Orders")  \
          .save();
```

:::tip

以上为最简示例，TapData 还支持设置 `write_to` 前，[添加处理节点](#add-nodes)来实现更加复杂和个性化的数据流转能力，具体见下文。

:::

## 指定任务同步类型

在启动数据流任务前，TapFlow 支持灵活配置任务的同步类型，以满足多种业务需求，包括全量同步、增量同步以及全量 + 增量同步（默认类型）。此外，增量同步任务还可通过配置起始时间点，精准控制增量数据的采集范围。

### 仅全量同步

全量同步任务用于一次性将源表的所有历史数据加载到目标表中，适合数据初始化、整库迁移等场景。

```python
# 设置为仅全量同步
tap> myflow.full_sync();
# 保存任务配置
tap> myflow.save();
```

### 仅增量同步

增量同步任务仅捕获源表的变更数据（CDC），适用于实时更新、变更捕获等场景。您可以选择从源表当前时间点开始采集，也可以指定特定的增量数据起始时间。

**从最新时间点捕获增量数据**

```python
# 设置为仅增量同步，从最新时间点开始同步
tap> myflow.only_cdc();
# 保存任务配置
tap> myflow.save();
```

**指定增量数据采集时间点**

若需从指定的时间点开始采集增量数据，可通过 `config_cdc_start_time` 方法配置起始时间和时区：

```python
# 设置为仅增量同步，采集 2023-12-14 17:40:00 时间点以后的增量数据
tap> myflow.only_cdc();
tap> myflow.config_cdc_start_time(1702546800000, tz="+8");
# 保存任务配置
tap> myflow.save();
```

- **`start_time`**：增量同步的起始时间，支持 `datetime` 和时间戳（毫秒）。
- **`tz`**：时区配置，默认 `+8`（东八区），支持时区偏移量格式，例如 `+0`（UTC）或 `-5`（美东时区）。

### 全量 + 增量同步（默认）

全量 + 增量同步任务会先完成历史数据的全量同步，随后持续捕获增量数据变更，适合长时间运行的任务（如实时同步或数据仓库构建）。

```python
# 全量 + 增量任务
tap> myflow.include_cdc();
# 保存任务配置
tap> myflow.save();
```



## <span id="add-nodes">增加处理节点</span>

### 数据预处理

#### 过滤数据（SQL 风格）

**命令说明**：通过 `filter` 节点基于条件保留或丢弃数据记录，用于筛选关键业务数据或清理无用数据。`filter` 使用 SQL 风格语法，适合快速实现简单筛选条件的全局数据过滤，从而提高数据质量或优化后续处理。

**使用示例**：以下示例分别展示了如何保留或丢弃订单金额大于 100 且用户性别为男性的数据，并将结果写入目标数据库。

```python
# 创建数据流任务，保留符合条件的数据
tap> flow = Flow("Filter_Data_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .filter("order_amount > 100 and user_gender='male'")  \
          .write_to(MongoDB_Demo.filteredOrders)  \
          .save();

# 创建数据流任务，丢弃符合条件的数据
tap> flow = Flow("Filter_Data_Discard")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .filter("order_amount <= 100 or user_gender='male'", filterType=FilterType.delete)  \
          .write_to(MongoDB_Demo.filteredOrders)  \
          .save();
```

#### 过滤数据（JS 风格）

**命令说明**：通过 `rowFilter` 节点基于表达式对数据行逐条处理，可选择保留或丢弃符合条件的数据行。`rowFilter` 使用 JavaScript 风格表达式，适用于需要复杂逻辑或动态字段处理的场景，提供更精细的控制。

**使用示例**：以下示例分别展示了如何保留或丢弃价格大于 100 的订单数据，并将结果写入目标数据库。

```python
# 创建数据流任务，保留符合条件的数据
tap> flow = Flow("Row_Filter_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .rowFilter("record.price > 100")  \
          .write_to(MongoDB_Demo.highValueOrders)  \
          .save();

# 创建数据流任务，丢弃符合条件的数据
tap> flow = Flow("Row_Filter_Discard")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .rowFilter("record.price > 100", rowFilterType=RowFilterType.discard)  \
          .write_to(MongoDB_Demo.highValueOrders)  \
          .save();
```

#### 调整时间

**命令说明**：通过 `adjust_time` 节点对时间字段进行增减操作，用于时区转换或标准化时间格式。

**使用示例**：以下示例为订单时间字段增加 8 小时，并将结果写入目标数据库。

```python
# 创建数据流任务，为订单时间字段增加 8 小时
tap> flow = Flow("Adjust_Time_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .adjust_time(addHours=8, t=["order_time"])  \
          .write_to(MongoDB_Demo.adjustedOrders)  \
          .save();
```

### 数据结构优化

#### 重命名表

**命令说明**：通过 `renameTable` 节点为目标表添加前缀或后缀，用于表名管理或版本控制。

**使用示例**：以下示例为目标表添加 `v1_` 前缀和 `_backup` 后缀，并将结果写入目标数据库。

```python
# 创建数据流任务，为目标表添加前缀和后缀
tap> flow = Flow("Rename_Table_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .renameTable(prefix="v1_", suffix="_backup")  \
          .write_to(MongoDB_Demo.versionedTable)  \
          .save();
```

#### 添加字段

**命令说明**：向记录中添加新字段，可通过 JavaScript 表达式计算字段值，从而实现支持动态字段扩展。

**使用示例**：在下述示例中，我们添加两个新字段：`status_flag` 设置为 `'completed'`，`order_value` 设置为 `100.5`，并将结果写入 MongoDB 的 `additionalFieldsCollection` 集合。

```python
# 创建数据流任务，添加新字段并指定字段值
tap> flow = Flow("Add_Field_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .add_fields([['status_flag', 'String', "'completed'"], ['order_value', 'Double', '100.5']])  \
          .write_to(MongoDB_Demo.additionalFieldsCollection)  \
          .save();
```

#### 重命名字段

**命令说明**：在记录中重命名指定字段，用于优化字段名称的可读性或符合业务需求。

**使用示例**：以下示例将 `order_status` 字段重命名为 `status`，`order_id` 字段重命名为 `id`，处理后的记录写入 MongoDB 的 `renamedFieldsCollection` 集合。

```python
# 创建数据流任务，重命名指定字段
tap> flow = Flow("Rename_Fields_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .rename_fields({'order_status': 'status', 'order_id': 'id'})  \
          .write_to(MongoDB_Demo.renamedFieldsCollection)  \
          .save();
```

#### 保留指定字段

**命令说明**：仅保留记录中的指定字段，可通过通配符选择多个字段，便于精简输出内容或按需展示数据。

**使用示例**：以下示例仅保留 `order_status` 和 `order_id` 字段，并将处理后的记录写入 MongoDB 的 `includedFieldsCollection` 集合。

```python
# 创建数据流任务，写入到目标库时仅包含指定字段
tap> flow = Flow("Include_Fields_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .include("order_status", "order_id")  \
          .write_to(MongoDB_Demo.includedFieldsCollection)  \
          .save();
```

#### 移除指定字段

**命令说明**：排除记录中的指定字段，用于隐藏敏感信息或去除不必要的字段。

**使用示例**：以下示例排除了 `order_status` 和 `order_delivered_customer_date` 字段，处理后的记录将写入 MongoDB 的 `excludedFieldsCollection` 集合。

```python
# 创建数据流任务，写入到目标库时排除指定字段
tap> flow = Flow("Exclude_Fields_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .exclude("order_status", "order_delivered_customer_date")  \
          .write_to(MongoDB_Demo.excludedFieldsCollection)  \
          .save();
```

#### 过滤字段类型

**命令说明**：通过 `exclude_type` 节点移除特定类型的字段，常用于清理不需要的数据类型，例如大型对象或非结构化字段。

**使用示例**：以下示例移除类型为 `OBJECT_ID` 的字段，并将结果写入目标数据库。

```python
# 创建数据流任务，移除 OBJECT_ID 类型的字段
tap> flow = Flow("Exclude_Type_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .exclude_type("OBJECT_ID")  \
          .write_to(MongoDB_Demo.cleanedOrders)  \
          .save();
```

#### 增加时间字段

**命令说明**：通过 `add_date_field` 节点为数据记录添加时间字段，常用于数据审计或日志记录。

**使用示例**：以下示例为每条记录添加字段 `processed_time`，记录处理时间。

```python
# 创建数据流任务，为数据记录注入处理时间字段
tap> flow = Flow("Add_Date_Field_Test")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .add_date_field("processed_time")  \
          .write_to(MongoDB_Demo.timestampedOrders)  \
          .save();
```

### 数据增强处理

#### Lookup 处理

**命令说明**：在多个来源的数据表执行类似“**左连接**”（LEFT JOIN）的操作，将关联表的数据嵌入主表中，常用于构建实时宽表场景，将分散在多个表中的数据汇总至主表中，实现实时数据扩展，为后续的查询或分析提供完整视图，提升查询分析效率。

**参数说明**：

- **from_table_name**：指定要关联的表名，格式为 `data_source_name.table_name`，其中 `data_source_name` 可通过 `show dbs` 获取，或[新建数据源](data-source.md)。
- **relation**：连接字段的映射关系，母亲仅支持等值连接，将关联表中的记录匹配到主表的记录中。
- **embed_path**（可选）：嵌入数据的路径。可以将关联数据嵌入为子文档（`object`，默认值）或数组（`array`）。
- **embed_type**（可选）：定义嵌入的数据结构类型，`object`（默认）表示一对一关系，`array` 表示一对多关系。
- **includes**（可选）：选择包含在结果中的字段，字段名以逗号分隔。

**使用示例**：

以下示例展示了如何通过 `lookup` 将 `order_payments` 表中的数据嵌入到 `ecom_orders` 表的记录中，从而生成一个包含订单及其支付信息的宽表，并将结果写入 MongoDB 的 `ordersWithPayments` 集合。

```python
tap> flow = Flow("Order_Payment_Join")
          .read_from(MySQL_Demo.ecom_orders)
          .lookup("MySQL_Demo.order_payments", relation=[["order_id", "order_id"]],
                  embed_path="payments", embed_type="array")
          .write_to(MongoDB_Demo.ordersWithPayments)
          .save();
```

在此示例中，`ecom_orders` 作为主表，`order_payments` 作为从表，通过 `order_id` 进行等值连接，并将支付信息嵌入到 `payments` 字段下（`embed_type` 为 `array`），从而实现一对多的数据整合。

#### JS 处理

**命令说明**：在数据流任务中嵌入 JavaScript 代码，可对源库的数据进行灵活的自定义处理。更多介绍，见[标准](../../appendix/standard-js.md) / [增强](../../appendix/standard-js.md) JS 节点内置函数说明。

**使用示例**：以下示例中，我们在 js 处理节点中为已交付的订单添加确认状态字段，便于快速识别订单状态。处理后的记录将写入目标 MongoDB 数据库的 `updatedCollection` 集合。

```python
# 定义 JavaScript 代码，将确认状态添加到已交付的订单记录中
tap> jscode = '''
if (record.order_status == 'delivered') {
    record.confirmation_status = 1;  // 为已交付的订单添加确认字段
}
return record;  // 返回处理后的记录
'''

# 创建数据流任务，应用 JavaScript 代码，并将结果写入目标数据库
tap> flow = Flow("Order_Status_Update")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .js(jscode)  \
          .write_to(MongoDB_Demo.updatedCollection)  \
          .save();
```


#### Python 处理

**命令说明**：在数据流任务中嵌入 Python 函数，用于处理记录。通过 `py` 节点，可以根据自定义逻辑筛选和转换数据，提升数据处理的灵活性。

**使用示例**：以下示例中，我们定义了一个 Python 函数 `pyfunc`，仅保留状态为已交付的订单，其余记录将被过滤掉。处理后的记录将写入 MongoDB 的 `pythonProcessedCollection` 集合。

```python
# 定义 Python 函数，仅保留已交付的订单
tap> def pyfunc(record):
         if record['order_status'] != 'delivered':
             return None  # 返回 None 以过滤不符合条件的记录
         return record  # 返回处理后的记录

# 创建数据流任务，应用 Python 函数，并将结果写入目标数据库
tap> flow = Flow("Python_Function")  \
          .read_from(MySQL_Demo.ecom_orders)  \
          .py(pyfunc)  \
          .write_to(MongoDB_Demo.pythonProcessedCollection)  \
          .save();
```



## 扩展阅读

通过 [Tap Shell](../tapcli-reference) 管理数据流任务，流入启停任务、查看任务状态、删除任务等操作。
