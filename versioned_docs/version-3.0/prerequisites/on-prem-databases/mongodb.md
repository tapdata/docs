---
keywords:
  - MongoDB 实时同步
  - MongoDB 数据集成
  - MongoDB CDC
  - NoSQL 数据集成
  - MongoDB 数据迁移
  - Tapdata MongoDB 连接器
---

# MongoDB

import Content from '../../reuse-content/_all-features.md';

<Content />

[MongoDB](https://www.mongodb.com/) 是一个流行的、开源 NoSQL 数据库，以灵活/可扩展的方式存储和检索数据。本文介绍如何在 TapData 中添加 MongoDB 数据源，支持 MongoDB CDC 实时数据同步和增量数据复制，可将其作为源或目标库来构建数据链路，适用于实时数据加工、实时宽表、数据迁移、灾备等场景。

<Head>
    <link rel="canonical" href="https://docs.tapdata.net/prerequisites/on-prem-databases/mongodb" />
</Head>

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 支持版本与架构

| 类别 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| 版本 | MongoDB 4.0 及以上，当 MongoDB 为 3.4 及以下时，请选择名为 **[MongoDB Below 3.4](mongodb-below34.md)** 的数据源 |
| 架构 | ●  作为源：支持副本集和分片集群架构，此外，还支持基于分片集群的从节点执行全量与增量数据同步<br />●  作为目标：支持单节点、副本集、分片集群架构 |

## 支持数据类型

| 类别           | 数据类型                         |
| -------------- | -------------------------------- |
| 字符串与代码   | String、JavaScript、Symbol       |
| 数值类型       | Double、Int32、Int64、Decimal128 |
| 文档与数组类型 | Document、Array                  |
| 二进制与对象ID | Binary、ObjectId                 |
| 布尔类型       | Boolean                          |
| 日期与时间戳   | Date、Timestamp                  |
| 特殊类型       | Min Key、Max Key、Null           |

## 支持同步的操作

**DML**：INSERT、UPDATE、DELETE

:::tip

将 MongoDB 作为同步的目标时，您还可以通过任务节点的高级配置，选择写入策略：插入冲突场景下，可选择转为更新或丢弃；更新失败场景下，可选择转为插入或仅打印日志。

:::

## 准备工作

### 作为源库

1. 保障源库的架构为副本集或分片集群，如果为单节点架构，您可以将其配置为单成员的副本集以开启 Oplog。
   具体操作，见[如何将单节点转为副本集](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/)。

2. 配置充足的 Oplog 存储空间，至少需要容纳 24 小时的 Oplog。
   具体操作，见[修改 Oplog 大小](https://docs.mongodb.com/manual/tutorial/change-oplog-size/)。

3. 根据权限管控需求选择下述步骤，创建用于数据同步/开发任务的账号并授予读权限、clusterMonitor 权限（用于验证数据）。

   ```mdx-code-block
   <Tabs className="unique-tabs">
   <TabItem value="授予指定库的读权限">
   ```
   ```sql
   use admin
   db.createUser(
     {
       user: "tapdata",
       pwd: "my_password",
       roles: [
          { role: "read", db: "database_name" },
          { role: "read", db: "local" },
          { role: "read", db: "config" },
          { role: "clusterMonitor", db: "admin" },
       ]
     }
   )
   ```
   </TabItem>

   <TabItem value="授予所有库的读权限">

   ```sql
   use admin
   db.createUser(
     {
       user: "tapdata",
       pwd: "my_password",
       roles: [
       { role: "readAnyDatabase", db: "admin" },
          { role: "clusterMonitor", db: "admin" },
    ]
     }
    )
   ```
   </TabItem>
   </Tabs>

   :::tip
   由于分片服务器不会向 config 数据库获取用户权限，因此，当源库为分片集群架构时，您需要在每个分片的主节点上创建相应的用户并授予权限。
   :::

4. 在设置 MongoDB URI 时，推荐将写关注级别设置为大多数，即 `w=majority`，否则可能因 Primary 节点异常宕机导致的数据丢失文档。

5. 源库为集群架构时，为提升数据同步性能，TapData 将会为每个分片创建一个线程并读取数据，在配置数据同步/开发任务前，您还需要执行下述操作。

   1. [关闭均衡器](https://www.mongodb.com/zh-cn/docs/manual/reference/method/sh.stopBalancer/)（Balancer），避免块迁移对数据一致性的影响。
   2. [清理孤立文档](https://www.mongodb.com/zh-cn/docs/manual/reference/command/cleanupOrphaned/)，避免 _id 冲突。




### 作为目标库

授予指定库（以 **demodata** 库为例）的写权限，并授予 **clusterMonitor** 角色以供数据验证使用，示例如下：

```bash
/* 这是一个过滤条件的注释 */
use admin
db.createUser(
  {
    user: "tapdata",
    pwd: "my_password",
    roles: [
       { role: "readWrite", db: "demodata" },
       { role: "clusterMonitor", db: "admin" },
    ]
  }
)
```

## 连接 MongoDB
1. [登录 TapData 平台](../../user-guide/log-in.md)。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建**。

4. 在弹出的对话框中，搜索并选择 **MongoDB**。

5. 在跳转到的页面，根据下述说明填写 MongoDB 的连接信息。

   ![MongoDB 连接示例](../../images/mongodb_connection_cn.png)

   * **连接信息设置**
      * **连接名称**：填写具有业务意义的独有名称。
      * **连接类型**：支持将 MongoDB 作为源或目标库。
      * **连接方式**：根据业务需求选择：
         * **URI 模式**：选择该模式后，您需要填写数据库 URI 连接信息，用户名和密码需拼接在连接串中，例如：` mongodb://admin:password@192.168.0.100:27017/mydb?replicaSet=xxx&authSource=admin`
         * **标准模式**：选择该模式后，您需要填写数据库地址、名称、账号、密码和其他连接串参数。
   * **高级设置**
      * **使用 TLS/SSL 连接**：根据业务需求选择：
        * **TSL/SSL 连接**：TapData 将连接网络中的单独服务器，该服务器提供到数据库的 [TSL/SSL 通道](https://www.mongodb.com/zh-cn/docs/manual/core/security-transport-encryption/)。如果您的数据库位于不可访问的子网中，则可尝试使用此方法并上传客户端私钥文件、填写私钥密码并选择是否验证服务端证书。
        * **直接连接**：TapData 将直接连接到数据库，您需要设置安全规则以允许访问。
      * **加载模型采样记录数**：指定模型加载时采样的记录数，以确保生成的模型结构符合源数据的实际情况，默认为 **1000**。
      * **每张表加载的字段数限制**：限制集合加载的最大字段数，避免字段过多导致模型生成过慢，默认为 **1024**。
      * **共享挖掘**：[挖掘源库](../../user-guide/advanced-settings/share-mining.md)的增量日志，可为多个任务共享源库的增量日志，避免重复读取，从而最大程度上减轻增量同步对源库的压力，开启该功能后还需要选择一个外存用来存储增量日志信息。
      * **包含表**：默认为**全部**，您也可以选择自定义并填写包含的表，多个表之间用英文逗号（,）分隔。
      * **排除表**：打开该开关后，可以设定要排除的表，多个表之间用英文逗号（,）分隔。
      * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定 Agent。
      * **模型加载时间**：如果数据源中的模型数量少于10,000个，则每小时更新一次模型信息。但如果模型数量超过10,000个，则刷新将在您指定的时间每天进行。
      * **开启心跳表**：当连接类型为源头或目标时，可启用该开关。TapData 会在源库创建 `_tapdata_heartbeat_table` 心跳表，并每 10 秒更新一次（需具备相应权限），用于监测数据源连接与任务的健康状况。心跳任务在数据复制/开发任务启动后自动启动，您可在数据源编辑页面[查看心跳任务](../../case-practices/best-practice/heart-beat-task.md)。

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::

## 节点高级特性

在配置数据同步/转换任务时，将 MongoDB 作为源或目标节点时，为更好满足业务复杂需求，最大化发挥性能，TapData 为其内置更多高级特性能力，您可以基于业务需求配置：

![MongoDB 节点高级特性](../../images/mongodb_node_advanced_settings.png)

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="MongoDB 作为源节点">
```

| **配置**                   | **说明**                                                     |
| -------------------------- | ------------------------------------------------------------ |
| **文档原像**               | 默认关闭，[文档原像](https://www.mongodb.com/zh-cn/docs/manual/changeStreams/#change-streams-with-document-pre--and-post-images)（也称前映像）是指被替换、更新或删除之前的文档，仅在 MongoDB 6.0 及以上支持并显示该配置，打开后 UPDATE/DELETE 事件会记录原像，TapData 将基于该信息进行数据同步。 |
| **补充更新数据的完整字段** | 默认开启，启用后会在 **UPDATE** 事件中自动填充完整字段。     |
| **禁用游标超时**           | 默认关闭，开启后 MongoDB 会禁用游标超时，防止数据同步过程中出现超时错误。 |
| **补充时跳过已删除的事件** | 默认开启，关闭此功能时，以下情况可能导致增量异常：任务使用非 `_id` 字段作为业务判断；源字段类型为子文档并修改属性；源字段类型为内嵌数组且执行 PULL 操作。 |
| **写入确认**               | 设置[写关注级别](https://www.mongodb.com/zh-cn/docs/manual/reference/write-concern/)，在分片群集中，`mongos` 会将写关注传递给分片，默认值为 **w1**，可选值如下：<br />●  **w0 / Unacknowledged**：不等待写入确认，最快，但无法确认写入是否成功。<br />●  **w1 / Acknowledged**：确认主节点写入成功，适合大多数场景，性能与安全性的平衡。<br />●  **w3**：确认写入成功至 3 个节点，提高数据安全性。<br />●  **majority**：确认写入已成功至大多数节点，安全性高，但节点较多时性能相对较差。 |


</TabItem>

<TabItem value="MongoDB 作为目标节点">

| **配置**             | **说明**                                                     |
| -------------------- | ------------------------------------------------------------ |
| **同步索引**         | 默认关闭，启用后，在全量阶段目标库会自动同步源库的索引。     |
| **保存删除数据**     | 默认关闭，开启后将缓存被删除的数据内容。<br />由于MongoDB 删除事件默认仅返回 `_id`，若目标库（如 MySQL）同步时更新条件不含 `_id`，将无法正确删除数据。此时可先将源表 **A** 同步至中间表 **A_COPY**（更新条件用 `_id`，并开启本开关），再创建新任务从 **A_COPY** 同步至目标表 **B**。<br />**注意**：如果源端已启用**文档原像**，可直接同步删除事件，无需前置任务。 |
| **时间序列集合属性** | 默认关闭，启用后，在 MongoDB 5.0 及以上版本之间进行同步时，可同步 TimeSeries 集合及其属性。 |
| **写入确认**         | 设置[写关注级别](https://www.mongodb.com/zh-cn/docs/manual/reference/write-concern/)，在分片群集中，`mongos` 服务会将写关注传递给分片，默认值为 **w1**，可选值如下：<br />●  **w0 / Unacknowledged**：不等待写入确认，最快，但无法确认写入是否成功。<br />●  **w1 / Acknowledged**：确认主节点写入成功，适合大多数场景，性能与安全性的平衡。<br />●  **w3**：确认写入成功至 3 个节点，提高数据安全性。<br />●  **majority**：确认写入已成功至大多数节点，安全性高，但节点较多时性能相对较差。 |
| **同步分区属性**     | 默认关闭，启用后，在 MongoDB 分片集群间进行同步时，能够保持集合的分片属性一致。 |

</TabItem>
</Tabs>