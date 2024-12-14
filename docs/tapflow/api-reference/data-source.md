# 数据源 API

本文介绍如何使用 TapFlow 创建一个新的数据源连接，可为后续的流任务提供数据来源和目标。此外，您也可以[通过页面](../../prerequisites/README.md)完成数据源的管理操作，以满足不同操作习惯。

:::tip

TapFlow 支持[数十种常见数据源](../../prerequisites/supported-databases.md)，通过设定 `name`、`type` 和 `config` 参数即可完成数据源的配置，每种数据源类型的配置参数可能略有不同，具体的配置要求、权限和参数说明，见[连接数据源](../../prerequisites/README.md)。

:::

## 参数说明

- **name**：数据源名称，需符合变量命名规范。
- **type**：数据源类型，可选值 `source`（作为源库）、`target`（作为目标库）和 `source_and_target`（作为源和目标库）。
- **config**：数据源连接参数，以 JSON 或字典格式提供。

## 查看数据源帮助信息

在开始配置前，您可以通过 `h <database_type>` 命令查看每种数据源的具体配置要求。

```python
# 查看 MySQL 数据源的必填和可选参数
tap > h mysql
required config:
    database: database_name (Type: string)                                                                                                        
    port: database_port (Type: string)                                                                                                            
    host: database_host (Type: string)                                                                                                            
    username: database_username (Type: string)                                                                                                    
optional config:
    deploymentMode:  (Type: string)                                                                                                               
        Enum values: standalone, master-slave
        Dependencies:
            When value is standalone, requires: host, port
            When value is master-slave, requires: masterSlaveAddress
    password: database_password (Type: string)                                                                                                    
    timezone:  (Type: string)                                                                                                                     
        Enum values: -11:00, -10:00, -09:00, ...
    additionalString: additionalString (Type: string)                                                                                               
    masterSlaveAddress:  (Type: array)                                                                                                            
        Array[port: number, host: string]
```

* **required config**：必填配置，包含：
  - `database`：数据库名称
  - `port`：数据库端口
  - `host`：数据库主机地址
  - `username`：数据库用户名

* **optional config**：可选配置，包含：
  - `deploymentMode`：部署模式
  - `password`：数据库密码
  - `timezone`：时区配置，默认为 0 时区，若设置为其他时区，会影响不带时区信息的字段（如 `datetime`）的数据同步；带时区的字段（如 `timestamp`、`date` 和 `time` ）则不受影响
  - `masterSlaveAddress`：主从地址

## 配置示例

以下示例展示了如何创建一个名为 `MySQL-EcommerceData` 的 MySQL 数据源，其他类型的数据源配置方法类似，您只需根据所选数据源类型调整配置信息。

```python
# 定义一个字典变量 mysql_json_config，用于存储 MySQL 数据源的连接配置
mysql_json_config = {
    'database': 'ECommerceData',  # 数据库名称
    'port': 3306,                 # MySQL 端口，通常为 3306
    'host': '192.168.1.18',       # MySQL 主机地址
    'username': 'your_username',  # 数据库用户名
    'password': 'your_passwd'     # 数据库密码
}

# 初始化 MySQL 数据源对象，使用给定的配置
mysql_conn = DataSource('mysql', 'MySQL_ECommerce', mysql_json_config)

# 设置数据源的类型为 'source'（数据源）
mysql_conn.type('source')

# 保存 MySQL 数据源配置到 TapFlow 平台
mysql_conn.save()

# （可选）删除数据源配置,可以调用 delete() 方法
# mysql_conn.delete()

```

## 输出示例

```python
datasource MySQL_ECommerce creating, please wait...                                
save datasource MySQL_ECommerce success, will load schema, please wait...          
load schema status: finished
```

:::tip

若出现 `load schema status: error` 错误，通常是权限或配置问题，可再次使用相同名称重试，系统会提示 `database MongoDB_ECommerce exists, will update its config` 并覆盖原配置。 

:::

## <span id="advanced">进阶配置</span>

在 TapFlow 中，`Source` API 是数据流任务的起点，用于定义数据源、表名和任务类型，并加载源表数据支持任务执行。同时，`Source` 提供高级功能和配置选项，满足数据同步、实时变更捕获（CDC）及性能优化等需求。

:::tip

`Source API` 的高级配置仅适用于后续要配置的[数据流任务](data-flow)，不会修改全局数据源的默认设置或影响其他已定义的数据流任务。

:::

### 选择源表和任务类型

`Source` 支持灵活的表选择和任务模式配置，适用于多种数据流场景：

- **数据转换任务**（单表）：当任务仅处理一个特定表时，`Source` 将自动设置任务类型为 **数据转换任务**（`sync` 模式），适用于数据建模、ETL、数据清理或构建宽表等场景，且目标通常为单表。

  ```python
  # 数据转换任务：只处理 ecom_orders 单表
  source = Source('MySQL_ECommerce', table='ecom_orders')
  ```

- **数据复制任务**（多表）：当需要处理多个表或使用正则表达式匹配表名时，任务将被设置为 **数据复制任务**（`migrate` 模式），适用于数据库迁移、数据库上云、数据库备份或多表整库同步等场景。

  ```python
  # 数据复制任务：指定多个表
  source = Source('MySQL_ECommerce', table=['ecom_orders', 'customer_info'], mode='migrate')
  
  # 数据复制任务：使用正则表达式匹配表名
  source = Source('MySQL_ECommerce', table_re='sales_.*', mode='migrate')
  ```

  :::tip

  * 正则匹配适用于需要动态监控新增表并自动纳入同步范围的场景。
  * 从 TapFlow 0.2.32 版本起，对于数据复制任务需显式指定 `mode='migrate'`，以确保版本兼容性与代码清晰性。

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
source = Source('MySQL_ECommerce', table=['ecom_orders', 'customer_info'], mode='migrate')

# 开启表结构变更（DDL）同步
source.enableDDL()

# 设置增量读取批次大小为 10 条
source.increase_read_size(10)

# 设置全量读取批次大小为 500 条
source.initial_read_size(500)

print("数据源高级配置完成，准备创建数据流任务...")
```



## 扩展阅读

通过 [Tap Shell](../tapcli-reference) 管理数据源，例如查看数据源的状态、表结构信息、删除数据源等。
