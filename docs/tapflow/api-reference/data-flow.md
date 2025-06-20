

# 数据流 API

本文介绍使用 TapFlow API 管理数据流的完整参考，包括定义任务来源/目标、执行数据处理等操作。

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 创建数据流任务

创建数据流任务的核心 API 包括 `read_from`、`write_to` 和 `save`，此外，您还可以根据需求添加处理节点或设置任务同步类型，请跟随下述教程了解基础和进阶用法：

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="基础用法" default>
```
在快速入门部分，我们将介绍如何使用基本的 `read_from`、`write_to` 和 `save` API 来创建数据流任务。适用于简单数据实时同步，具体流程如下：

```mermaid
%%{ init: { 'theme': 'neo', 'themeVariables': { 'primaryColor': '#1E88E5', 'edgeLabelBackground':'#F1F8E9', 'tertiaryColor': '#FAFAFA'}} }%%
flowchart LR
    %% 数据源部分
    subgraph read_from["read_from（定义源数据表）"]
        direction LR
        simple_table["data_source.table_name"]
    end

    %% 目标表部分
    subgraph write_to["write_to（配置目标数据表）"]
        direction LR
        simple_target["data_source.table_name"]
    end

    %% 保存数据流任务
    subgraph sync_and_save["save（保存数据流任务）"]
        direction TB
    end

    %% 数据流向连接
    read_from --> write_to
    write_to --> sync_and_save

    %% 样式优化
    style read_from fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,rounded
    style write_to fill:#ede7f6,stroke:#673ab7,stroke-width:2px,rounded
    style sync_and_save fill:#fffde7,stroke:#fdd835,stroke-width:2px,rounded

    %% 连接线和箭头样式优化
    linkStyle default stroke-width:2px,stroke:#2196f3,curve:basis
```

- **read_from**：指定数据流任务的主数据源表，可通过 `data_source_name.table_name` 的方式指定，其中 `data_source_name` 可通过 `show dbs` 获取，或[新建数据源](data-source.md)，示例如下：

  ```python
  # 指定要读取的源表
  tap> myflow = Flow("DataFlow_Test")  \
            .read_from("MongoDB_Demo.ecom_orders")
  ```

- **write_to**：指定数据流任务的目标表，可通过 `data_source_name.table_name` 的方式定义简单目标表，其中 `data_source_name` 可通过 `show dbs` 获取，或[新建数据源](data-source.md)，示例如下：

  ```python
  # 将源表实时写入 ecom_orders 表
  tap> myflow = Flow("DataFlow_Test")  \
            .write_to("MongoDB_Demo.ecom_orders")
  ```

- **save**：保存当前任务的配置，使其成为持久化的任务。调用 `save()` 后，该数据流任务即可被启动或停止，示例如下：

  ```python
  # 保存数据流任务
  tap> myflow.save();
  ```

**最简示例**

将上述所有步骤合并成一个完整示例，用于从 MySQL 读取订单数据并写入 MongoDB，保存后可执行 [start](../tapshell-reference.md#start) 命令来启动该任务。

```python
# 创建数据流任务
tap> myflow = Flow("DataFlow_Advanced")  \
          .read_from("MySQL_Demo.ecom_orders")  \
          .write_to("MongoDB_Demo.Orders")  \
          .save();
```

对于更复杂的用法，您可以进一步配置多表读取、数据处理节点和同步类型等，详细内容请见**进阶用法**标签页。

</TabItem>

<TabItem value="进阶用法">

在此部分，我们将介绍如何进一步配置和定制数据流任务，适用于多表读取、数据处理节点添加和同步类型设置等更复杂场景，具体流程如下：

```mermaid
%%{ init: { 'theme': 'neo', 'themeVariables': { 'primaryColor': '#1E88E5', 'edgeLabelBackground':'#F1F8E9', 'tertiaryColor': '#FAFAFA'}} }%%
flowchart LR
    %% 数据源部分
    subgraph read_from["read_from（定义源端）"]
        direction LR
        table["源表和读取行为<br>（Source API 实例）"]
    end

    %% Flow API 管道
    subgraph flow_api["实时加工（可选）"]
        direction TB
        process_nodes["数据过滤<br>重命名表<br>Lookup<br>更多..."]
    end

    %% 目标表部分
    subgraph write_to["write_to（配置目标端）"]
        direction LR
        complex_target["目标表和写入行为<br>（Sink API 实例）"]
    end

    %% 同步类型设置
    subgraph sync["配置同步类型（可选）"]
        direction TB
        sync_type["全量<br>增量<br>全量+增量"]
    end
    
    %% 保存数据流任务
    subgraph save["save<br>（保存数据流任务）"]
    end   
    
    %% 数据流向连接
    read_from --> process_nodes
    process_nodes --> write_to
    write_to --> sync
    sync --> save

    %% 样式优化
    style read_from fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,rounded
    style flow_api fill:#f1f8e9,stroke:#43a047,stroke-width:2px,rounded
    style write_to fill:#ede7f6,stroke:#673ab7,stroke-width:2px,rounded
    style sync fill:#fff3e0,stroke:#fb8c00,stroke-width:2px,rounded
    style save fill:#fffde7,stroke:#fdd835,stroke-width:2px,rounded
    style table fill:#c8e6c9,stroke:#388e3c,stroke-width:2px,rounded
    style process_nodes fill:#bbdefb,stroke:#1e88e5,stroke-width:2px,rounded
    style complex_target fill:#d1c4e9,stroke:#673ab7,stroke-width:2px,rounded
    style sync_type fill:#ffe0b2,stroke:#fb8c00,stroke-width:2px,rounded


    %% 连接线和箭头样式优化
    linkStyle default stroke-width:2px,stroke:#2196f3,curve:basis

```

- **read_from**：指定数据流任务的[源表](data-source.md)，可通过 `data_source_name.table_name` 简单定义，也可使用 `Source API` 实例化对象进行复杂配置（如多表同步、性能优化），更多介绍，见[源端进阶设置](#source)，示例如下：

  ```python
  # 使用 source API 实例化源表
  tap> source = Source('MySQL_ECommerce', table=['ecom_orders', 'ecom_customers'])
  # 配置源端读取行为
  tap> source.initial_read_size(500) # 设置全量读取批次大小为 500 条
  tap> myflow = Flow("DataFlow_Advanced")  \
            .read_from(source)
  ```

  如需使用自定义查询，可通过 `query` 参数直接指定，例如 `myflow.read_from("MongoDB_Demo.ecom_orders", query="SELECT * FROM ecom_orders WHERE status='active'")`。

- **添加处理节点**：在将数据写入到目标端之前，您可以添加不同类型的处理节点，实现数据预处理、数据结构调整等复杂需求，更多使用方法及参数介绍，见[处理节点说明](#add-nodes)。

- **write_to**：指定数据流任务的[目标表](data-source.md)，可通过 `data_source_name.table_name` 简单定义，也可以通过 `Sink API` 实例化对象进行复杂配置（如高并发写入、写入行为等）的场景，更多介绍，见[目标端进阶设置](#sink)，示例如下：

  ```python
  # 使用 Sink API 实例化目标表
  tap> sink = Sink("MongoDB_Demo", table="ecom_orders")
  # 配置目标端写入行为
  tap> sink.keep_data()           # 保留目标表原有数据
  tap> sink.set_write_batch(500)  # 每批次写入 500 条记录
  tap> myflow = Flow("DataFlow_Test")  \
            .write_to(sink)
  ```

- **save**：保存当前任务的配置，使其成为持久化的任务。调用 `save()` 后，该数据流任务即可被启动或停止。

  ```python
  # 保存并创建数据流任务
  tap> myflow.save();
  ```

**完整示例**

本示例展示了如何从 MySQL 读取多个表，配置批量写入、保留原有数据，并添加过滤节点保留订单金额大于 100 的记录。最终，将处理后的数据实时同步到 MongoDB 目标表。保存任务后，可执行 [start](../tapshell-reference.md#start) 命令来启动任务。

```python
# 引用已有数据源，设置为同步多表的数据复制任务
source = Source('MySQL_ECommerce', table=['ecom_orders', 'ecom_customers'])

# 源端高级配置
source.initial_read_size(500)  # 设置全量读取批次大小为 500 条

print("数据源高级配置完成，准备创建数据流任务...")

# 定义目标表
sink = Sink('MongoDB_Demo', table=['ecom_orders', 'ecom_customers'])

# 目标端高级配置
sink.keep_data()               # 保留目标表结构和数据
sink.set_write_batch(500)      # 每批次写入 500 条记录

print("目标端写入配置完成！")

# 创建数据流任务并添加处理节点
flow = (
    Flow("DataFlow_Advanced")
    .read_from(source)
    .filter("order_amount > 100")  # 添加过滤节点，保留订单金额大于 100 的数据
    .write_to(sink)
    .save()
)

print("数据流任务配置完成！")
```

</TabItem>
</Tabs>



---



## <span id="source">源端进阶配置</span>

在 TapFlow 中，`Source` API 是数据流任务的起点，用于定义数据源、表名和任务类型，并加载源表数据支持任务执行。同时，`Source` 提供高级功能和配置选项，满足数据同步、实时变更捕获（CDC）及性能优化等需求。

:::tip

`Source API` 的高级配置仅适用于后续要配置的[数据流任务](data-flow)，不会修改全局数据源的默认设置或影响其他已定义的数据流任务。

:::

### 定义源表和任务类型

`Source` 支持灵活的表选择和任务模式配置，适用于多种数据流场景：

- **数据转换任务**（单表）：当任务仅处理一个特定表时，`Source` 将自动设置任务类型为 **数据转换任务**，适用于数据建模、ETL、数据清理或构建宽表等场景，且目标通常为单表。

  ```python
  # 数据转换任务：只处理 ecom_orders 单表
  source = Source('MySQL_ECommerce', table='ecom_orders')
  ```

- **数据复制任务**（多表）：当需要处理多个表或使用正则表达式匹配表名时，任务将被设置为 **数据复制任务**，适用于数据库迁移、数据库上云、数据库备份或多表整库同步等场景。

  ```python
  # 数据复制任务：指定多个表
  source = Source('MySQL_ECommerce', table=['ecom_orders', 'ecom_customers'])
  
  # 数据复制任务：使用正则表达式匹配表名
  source = Source('MySQL_ECommerce', table_re='sales_.*')
  ```

  :::tip

  正则匹配适用于需要动态监控新增表并自动纳入同步范围的场景。
  
  :::

### 启用 DDL 同步

在任务中启用 **DDL 同步** 功能（默认关闭状态），确保源库的表结构变化实时同步到目标库，支持采集源库的 DDL 事件通常包含**新增字段**、**修改字段名**、**修改字段属性**、**删除字段**。

```python
source.enableDDL()
```

:::tip

除开启该开关外，还需要目标库支持 **DDL** **应用**，您可以通过[支持的数据源](../../prerequisites/supported-databases.md)文档，查询各类数据源对 DDL 事件采集和 DDL 应用的支持情况。更多介绍，见 [DDL 变更处理最佳实践](../../case-practices/best-practice/handle-schema-change.md)。

:::

### 启用 MongoDB PreImage

在 MongoDB 数据源任务中启用 **[PreImage](https://www.mongodb.com/docs/manual/changeStreams/#change-streams-with-document-pre--and-post-images)** 功能（默认关闭状态），可在捕获增量更新事件时补充更新前的旧值，以便实现审计或回滚。

```python
source.enablePreImage()
```

### 禁用更新字段补全

**更新字段补全**功能（默认开启）用于在捕获更新操作时，将所有字段（包括未更新的字段）都写入到目标库，以确保数据一致性。启用该功能可能会增加目标库的存储成本。通过以下方法可禁用字段补全：

```python
source.disable_filling_modified_data()
```

### 设置增量读取批量大小

定义增量模式下每批读取的数据条数（默认值为 `1`）。增大该值可以提升吞吐量，但可能会增加延迟。

```python
# 设置每批读取 10 条数据
source.increase_read_size(10)  
```

### 设置全量读取批量大小

定义全量模式下每批读取的数据条数（默认值为 `100`），适合在全量同步时进行性能调优。

```python
# 设置全量读取批量大小为 500
source.initial_read_size(500)  
```

### 综合配置示例

以下示例展示了如何通过 `Source API` 实现灵活的数据源配置，通过提升每批数据的大小优化数据同步性能。

```python
# 引用已有数据源，设置为同步多表的数据复制任务
source = Source('MySQL_ECommerce', table=['ecom_orders', 'ecom_customers'])

# 开启表结构变更（DDL）同步
source.enableDDL()

# 设置增量读取批次大小为 10 条
source.increase_read_size(10)

# 设置全量读取批次大小为 500 条
source.initial_read_size(500)

print("数据源高级配置完成，准备创建数据流任务...")
```



## <span id="sink">目标端进阶配置</span>

在 TapFlow 中，`Sink` API 是数据流任务的终点，用于定义目标表的写入配置，`Sink` 支持灵活的行为定义和性能调优选项，适配多种写入场景，如全量同步、增量更新和高性能写入等需求。

:::tip

`Sink` 的配置仅适用于当前定义的数据流任务，不会修改目标数据库的全局设置，也不会影响其他数据流任务。

:::

### 定义目标表

通过 `Sink` 对象，指定目标数据库和表名：

```python
# 定义单个目标表
sink = Sink('database_name.table_name')

# 定义多个目标表
sink = Sink('database_name', table=['table_name_1', 'table_name_2'])
```

### 配置目标表写入行为

`Sink` 提供多种可选行为，帮助灵活应对不同业务需求：

- **保留目标表数据**（默认）：即追加模式，保留目标表中的原有数据，仅写入新数据：

  ```python
  sink.keep_data()
  ```

- **清空目标表数据**：在写入前清空表中所有数据，仅保留表结构：

  ```python
  sink.clean_data()
  ```

- **删除并重新创建目标表**：在写入前删除目标表，并重新创建：

  ```python
  sink.clean_table()
  ```

### 写入性能调优

针对高吞吐量或实时性场景，`Sink` 提供多项性能调优选项。通过合理配置写入线程数、批次大小和间隔时间，可以优化写入效率，平衡源端数据生成速率与目标端处理能力，同时避免对目标库造成过大压力。

- **增量写入线程数**：设置增量同步任务的并发写入线程数（默认 `1`），适合实时性要求较高的场景：

  ```python
  sink.set_cdc_threads(4)  # 使用 4 个线程进行增量写入
  ```

- **全量写入线程数**：配置全量同步任务的并发写入线程数（默认 `1`），用于加速大数据量的写入：

  ```python
  sink.set_init_thread(6)  # 使用 6 个线程进行全量写入
  ```

- **每批次写入条数**：定义单批写入的记录数（默认 `500`），可根据目标库的性能和数据规模调整：

  ```python
  sink.set_write_batch(500)  # 每批次写入 500 条记录
  ```

- **每批次写入等待时间**：设置批次之间的写入间隔时间（默认 `500` 毫秒），适用于对目标数据库进行流量控制：

  ```python
  sink.set_write_wait(200)  # 每批次写入间隔 200 毫秒
  ```

### 综合配置示例

以下示例展示了如何通过 `Sink API` 配置目标表的写入行为和性能优化选项：

```python
# 定义目标表
sink = Sink('MongoDB_Demo.orders')

# 配置写入行为
sink.keep_data()              # 保留目标表原有数据

# 配置性能优化参数
sink.set_cdc_threads(4)       # 增量任务写入线程数
sink.set_init_thread(6)       # 全量任务写入线程数
sink.set_write_batch(500)     # 每批次写入 500 条记录
sink.set_write_wait(200)      # 每批次写入间隔 200 毫秒

print("目标端写入配置完成！")
```

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

通过 [TapShell](../tapshell-reference) 管理数据流任务，流入启停任务、查看任务状态、删除任务等操作。
