---
keywords:
  - MongoDB Atlas
  - MongoDB Atlas 实时同步
  - MongoDB Atlas 数据集成
  - MongoDB Atlas 增量复制
  - MongoDB 迁移上云
  - TapData MongoDB Atlas 连接器
---

# MongoDB Atlas
import Content from '../../reuse-content/_all-features.md';

<Content />

[MongoDB Atlas](https://www.mongodb.com/atlas) 是 MongoDB 提供的多云托管数据库平台。本文介绍如何在 TapData 中添加 MongoDB Atlas 数据源，支持实时数据同步、增量复制，可用于数据迁移、实时分析、同步至本地数据仓库等场景。

<Head>
    <link rel="canonical" href="https://docs.tapdata.net/prerequisites/cloud-databases/mongodb-atlas" />
</Head>


## 支持版本

MongoDB Atlas 5.0.15

:::tip

为保障数据兼容性，MongoDB 间数据同步时，推荐源/目标库均为 5.0 及以上版本。

:::

## 准备工作

1. 登录 [MongoDB Atlas 平台](https://cloud.mongodb.com/v2)。

2. 设置网络访问控制，确保网络连通性。

    1. 在左侧导航栏，单击 **Network Access**。

    2. 单击右侧的 **ADD IP ADDRESS**。

    3. 在弹出的对话框中，填写 TapData 所属的公网地址（CIDR 格式）并单击 **Confirm**。

       ![设置网络白名单](../../images/atlas_add_ip_address.png)

3. 创建账号并授予权限，用于数据库连接。

    1. 在左侧导航栏，单击 **Database Access**。

    2. 在页面右侧，单击 **ADD NEW DATABASE USER**。

    3. 在弹出的对话框中，选择认证方式并设置权限。

       ![创建账号并授权](../../images/atlas_create_user.png)

       本案例中，我们以密码认证方式为例演示操作流程，权限选择说明如下

        * **作为源库**：选择 **Built-in Role** 为 **Only read any database**。

        * **作为目标库**：选择 **Built-in Role** 为 **Read and write to any database**。

    4. 单击 **Add User**。

4. 获取数据库连接信息。

    1. 在左侧导航栏，单击 **Database**。

    2. 找到目标数据库，单击 **Connect**。

    3. 在弹出的对话框中，选择 **Connect your application** 即可获取连接信息，该信息将在连接数据库时用到。

       ![获取连接信息](../../images/atlas_obtain_connection.png)

## 连接 MongoDB Atlas

1. [登录 TapData 平台](../../user-guide/log-in.md)。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建**。

4. 在弹出的对话框中，搜索并选择 **MongoDB Atlas**。

5. 根据下述说明完成数据源配置。

   ![MongoDB Atlas 连接示例](../../images/mongodb_atlas_connection_setting.png)

    * 连接信息设置

        * **连接名称**：填写具有业务意义的独有名称。

        * **连接类型**：支持将 MongoDB Atlas 作为源或目标库。

        * **连接方式**：固定为**URI 模式**，选择该模式后，您需要填写数据库 URI 连接信息（需替换账号、密码并设置），获取方式见准备工作，
          
          例如：` mongodb+srv://tapdata:Tap123456@cluster****.mongodb.net/admin?retryWrites=true&w=majority`
          
          :::tip
          
          请务必在连接串中设置认证数据库，例如上述示例中设置为 **admin**，否则会导致连接失败并提示错误：“datbaseName can not be null”。
          
          :::
          
        * **使用 TLS/SSL 连接**：根据业务需求选择：
            * **TSL/SSL 连接**：TapData 将连接网络中的单独服务器，该服务器提供到数据库的 TSL/SSL 通道。如果您的数据库位于不可访问的子网中，则可尝试使用此方法并提供私钥文件、私钥密码等信息。
            * **直接连接**：TapData 将直接连接到数据库。

    * 高级设置
        * **包含表**：默认为**全部**，您也可以选择自定义并填写包含的表，多个表之间用英文逗号（,）分隔。
        
        * **排除表**：打开该开关后，可以设定要排除的表，多个表之间用英文逗号（,）分隔。
        
        * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定 Agent。
        
        * **模型加载时间**：当数据源中模型数量小于 10,000 时，每小时刷新一次模型信息；如果模型数据超过 10,000，则每天按照您指定的时间刷新模型信息。
        
        * **开启心跳表**：当连接类型选择为**源头和目标**、**源头**时，支持打开该开关，由 TapData 在源库中创建一个名为 **_tapdata_heartbeat_table** 的心跳表并每隔 10 秒更新一次其中的数据（数据库账号需具备相关权限），用于数据源连接与任务的健康度监测。
          
          :::tip
          
          数据源需在数据复制/开发任务引用并启动后，心跳任务任务才会启动，此时您可以再次进入该数据源的编辑页面，即可单击**查看心跳任务**。
          
          :::

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::

## 节点高级特性


```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

在配置数据同步/转换任务时，将 MongoDB Atlas 作为源或目标节点时，为更好满足业务复杂需求，最大化发挥性能，TapData 为其内置更多高级特性能力，您可以基于业务需求配置：

![MongoDB 节点高级特性](../../images/mongodb_atlas_node_advanced_settings.png)

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="MongoDB Atlas 作为源节点">
```

| **配置**                   | **说明**                                                     |
| -------------------------- | ------------------------------------------------------------ |
| **禁用游标超时**           | 默认关闭，开启后 MongoDB 会禁用游标超时，防止数据同步过程中出现超时错误。 |
| **补充更新数据的完整字段** | 默认开启，启用后会在 **UPDATE** 事件中自动填充完整字段。     |


</TabItem>

<TabItem value="MongoDB Atlas 作为目标节点">

| **配置**         | **说明**                                                     |
| ---------------- | ------------------------------------------------------------ |
| **同步索引**     | 默认关闭，启用后，在全量阶段目标库会自动同步源库的索引。     |
| **同步分区属性** | 默认关闭，启用后，在 MongoDB 分片集群间进行同步时，能够保持集合的分片属性一致。 |
| **保存删除数据** | 默认关闭，开启后将缓存被删除的数据内容。<br />由于MongoDB Atlas 删除事件默认仅返回 `_id`，若目标库（如 MySQL）同步时更新条件不含 `_id`，将无法正确删除数据。此时可先将源表 **A** 同步至中间表 **A_COPY**（更新条件用 `_id`，并开启本开关），再创建新任务从 **A_COPY** 同步至目标表 **B**。<br />**注意**：如果源端已启用**文档原像**，可直接同步删除事件，无需前置任务。 |

</TabItem>
</Tabs>
