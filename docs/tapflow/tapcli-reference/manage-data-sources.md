# 管理数据源

TapData Shell 支持用户通过命令行创建和管理数据源，只需简单设置即可连接数据源，支持查看状态、切换上下文、获取表结构等操作。此外，您也可以[通过页面](../../prerequisites/README.md)完成数据源的管理操作，以满足不同操作习惯。

## 创建数据源

**命令说明**：创建一个新的数据源连接，TapData Shell 支持[数十种常见数据源](../../prerequisites/supported-databases.md)，通过设定 `name`、`type` 和 `config` 参数即可完成数据源的配置。

:::tip

每种数据源类型的配置参数可能略有不同，具体的配置要求、权限和参数说明，见[连接数据源](../../prerequisites/README.md)。

:::

**参数说明**：

- **name**：数据源名称，需符合变量命名规范。
- **type**：数据源类型，可选值 `source`（作为源库）、`target`（作为目标库）和 `source_and_target`（作为源和目标库）。
- **config**：数据源连接参数，以 JSON 或字典格式提供。

**查看数据源帮助信息**

在开始配置前，您可以通过 `h <database_type>` 命令查看每种数据源的具体配置要求。

```python
# 查看 MySQL 数据源的必填和可选参数
tap > h mysql
required config:
    database: database_name                                                                                                                                              
    port: database_port                                                                                                                                                  
    host: database_host                                                                                                                                                  
    username: database_username                                                                                                                                          
optional config:
    deploymentMode:                                                                                                                                                      
    password: database_password                                                                                                                                          
    masterSlaveAddress: 
```

* **required config**：必填配置，包含：
  - `database`：数据库名称
  - `port`：数据库端口
  - `host`：数据库主机地址
  - `username`：数据库用户名

* **optional config**：可选配置，包含：
  - `deploymentMode`：部署模式,
  - `password`：数据库密码
  - `masterSlaveAddress`：主从地址

**配置示例**：

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

# 创建数据源连接对象 mysql_conn，引用 mysql_json_config 配置并将其作为源库保存
mysql_conn = DataSource('mysql', 'MySQL_ECommerce', mysql_json_config).type('source').save()
```

**输出示例**：

```python
datasource MySQL_ECommerce creating, please wait...                                
save datasource MySQL_ECommerce success, will load schema, please wait...          
load schema status: finished
```

:::tip

若出现 `load schema status: error` 错误，通常是权限或配置问题，可再次使用相同名称重试，系统会提示 `database MongoDB_ECommerce exists, will update its config` 并覆盖原配置。 

:::

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

