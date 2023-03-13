# Redis 数据开发任务

Redis 是基于内存的 key-value（键值对）数据库，可用于数据缓存、事件发布/订阅、高速队列等场景。Tapdata 支持将关系型数据库（Oracle、MySQL、MongoDB、PostgreSQL、SQL Server）的数据实时同步至 Redis，帮助您快速完成数据流转。

本文介绍如何通过数据开发任务，将 MySQL 的数据同步至 Redis。

## 准备工作

在创建数据开发任务前，请确保您已经配置好了相关数据源：

1. [配置 MySQL 连接](../user-guide/connect-database/certified/connect-mysql.md)
2. [配置 Redis 连接](../user-guide/connect-database/alpha/connect-redis.md)

## 操作步骤

1. 登录 Tapdata 平台。

2. 在左侧导航栏，选择**数据管道** > **数据开发**。

3. 单击页面右侧的**创建**。

4. 在页面左侧，分别将 MySQL 和 Redis 数据源拖拽至右侧画布中，然后将其连接起来。

5. 单击 MySQL 数据源，根据下述说明完成右侧面板的配置。

   ![源 MySQL 设置](../images/data_dev_mysql_setting.png)

   * **节点名称**：默认为数据源名称，您也可以修改为具有业务意义的名称。
   * **数据库**：保持默认。
   * **表**：选择要同步到 Redis 的表。
   * **DDL 事件采集**：由于 Redis 暂不支持应用 DDL 语句，保持此开关闭即可。
   * **过滤设置**：打开该开关后可自定义数据过滤规则，例如本案例设置条件为 `id > 10`。

6. 单击 Redis 数据源，根据下述说明完成右侧面板的设置。

   ![Redis 数据源设置](../images/data_dev_redis_setting.png)

   - **节点名称**：默认为连接名称，您也可以设置一个具有业务意义的名称。
   - **数据库**：保持默认。
   - **表**：选择为 **tapdata**。
   - **已有数据处理**、**数据写入模式**：根据业务需求选择，也可保持默认。
   - **全量多线程写入**：全量数据写入的并发线程数，默认为 **8**，可基于目标端写性能适当调整。
   - **增量多线程写入**：增量数据写入的并发线程数，默认未启用，可基于目标端写性能适当调整。
   - **存储格式**：支持下述三种格式。
     - **String**：键值以平铺的方式存储，即键值为整条记录。
     - **List**：您可以打开**单键存储**开关，让整个表记录全部存储为一个键，List 的每条值对应一条记录，且允许将第一条设为表头（以英文逗号分隔）；您也可以将整个表记录按某些字段组成的键表达式分组然后平铺为多个 List 键值。
     - **Hash**：您可以打开**单键存储**开关，让整个表记录全部存储为一个键，Hash 中的键均存储为 String 类型；您也可以将整个表记录全部平铺为多个键值，每个键对应的 Hash 即为一条记录，每个字段对应各自的值。
   - **单键存储**：当存储格式选择为 **List** 或 **Hash**，可设置该选项，需注意不可超过 Redis 单键的大小限制（512 MB）。
   - **键表达式**：键名的表达式，格式为 `prefix_${列名}_suffix`，例如：`db0_${id}_202301`，键名即为 `db0_id列对应的值_202301`。
   - **值显示**：支持下述两种显示方式。
     - **Json**：将每条记录转化为 Json 串。
     - **Text**：按照字段的顺序将对应值用特定的连接符合并起来，如果内容包含了该字符，则以转义字符将内容包裹。

7. （可选）单击上方的 ![setting](../images/setting.png) 图标，配置任务属性。

   - **任务名称**：填写具有业务意义的名称。
   - **同步类型**：可选择**全量+增量**，也可单独选择**全量**或**增量**。 全量表示将源端的存量数据复制到目标端，增量表示将源端实时产生的新数据或数据变更复制到目标端，二者结合可用于实时数据同步场景。
   - **任务描述**：填写任务的描述信息。
   - **高级设置**：设置任务开始的时间、增量数据处理模式、处理器线程数、Agent 等。

8. 确认无误后，单击**启动**。

   操作完成后，您可以在当前页面观察任务的执行情况，如 QPS、延迟、任务时间统计等信息，示例如下：

   ![监控任务执行情况](../images/mysql_to_redis_result.png)



## 结果验证

根据上述任务设置，Tapdata 会将源 MySQL 中 **customer** 表的数据实时同步到 Redis 中，且存储的键类型为 String。

我们在 MySQL 中随机查询一条数据，例如查询 id 为 `879f660510764c4ea4127447e7ca44b8` 的记录，结果如下：

```sql
mysql> select * from customer where id='879f660510764c4ea4127447e7ca44b8' \G;
*************************** 1. row ***************************
           id: 879f660510764c4ea4127447e7ca44b8
         name: Rebecca
     lastname: Dunlap
      address: USS Vasquez
FPO AA 12217
      country: Lao People's Democratic Republic
         city: Hutchinsonborough
registry_date: 15-07-2011
    birthdate: 11-08-2001
        email: cameroncole@example.com
 phone_number: 1-516-422-8314x744
       locale: or_IN
1 row in set (0.00 sec)
```

随后，我们前往 Redis 并查询对应的数据，结果如下，数据以 JSON 形式存储在键值中，且随后的记录变更（如修改字段值）也可以正常同步。

```shell
127.0.0.1:6379> get db0_879f660510764c4ea4127447e7ca44b8_202301
"{\"country\":\"Lao People's Democratic Republic\",\"birthdate\":\"11-08-2001\",\"registry_date\":\"15-07-2011\",\"address\":\"USS Vasquez\\nFPO AA 12217\",\"city\":\"Hutchinsonborough\",\"name\":\"Rebecca\",\"phone_number\":\"1-516-422-8314x744\",\"id\":\"879f660510764c4ea4127447e7ca44b8\",\"locale\":\"or_IN\",\"email\":\"cameroncole@example.com\",\"lastname\":\"Dunlap\"}"
```



## 任务管理

在任务列表页面，您还可以对任务进行启动/停止、监控、编辑、复制、重置、删除等操作。

具体操作，见[管理任务](../user-guide/data-pipeline/data-development/monitor-task.md)。
