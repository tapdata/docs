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
  - `deploymentMode`：部署模式
  - `password`：数据库密码
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

# 创建数据源连接对象 mysql_conn，引用 mysql_json_config 配置并将其作为源库保存
mysql_conn = DataSource('mysql', 'MySQL_ECommerce', mysql_json_config).type('source').save()
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



## 扩展阅读

通过 [Tap Shell](../tapcli-reference) 管理数据源，例如查看数据源的状态、表结构信息、删除数据源等。
