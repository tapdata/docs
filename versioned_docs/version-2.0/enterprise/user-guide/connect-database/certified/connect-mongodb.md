# 连接 MongoDB

MongoDB 是一个流行的、开源 NoSQL 数据库，以灵活/可扩展的方式存储和检索数据。Tapdata 支持将 MongoDB 作为源和目标数据库构建数据管道，本文介绍如何在 Tapdata 中添加 MongoDB 数据源。

## 准备工作

[MongoDB 数据源准备工作](../../../prerequisites/certified/mongodb.md)

## 操作步骤

1. 登录 Tapdata 平台。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建连接**。

4. 在弹出的对话框中，单击 **认证数据源**，然后选择 **MongoDB**。

5. 在跳转到的页面，根据下述说明填写 MongoDB 的连接信息。

   ![MongoDB 连接示例](../../../images/mongodb_connection_cn.png)

   * 连接信息设置
     * **连接名称**：填写具有业务意义的独有名称。
     * **连接类型**：支持将 MongoDB 作为源或目标库。
     * **连接方式**：根据业务需求选择：
       * **URI 模式**：选择该模式后，您需要填写数据库 URI 连接信息，用户名和密码需拼接在连接串中，例如：` mongodb://admin:password@192.168.0.100:27017/mydb?replicaSet=xxx&authSource=admin`
       * **标准模式**：选择该模式后，您需要填写数据库地址、名称、账号、密码和其他连接串参数。
     * **使用 TLS/SSL 连接**：根据业务需求选择：
       * TSL/SSL 连接：Tapdata 将连接网络中的单独服务器，该服务器提供到数据库的 TSL/SSL 通道。如果您的数据库位于不可访问的子网中，则可尝试使用此方法。
       * 直接连接：Tapdata 将直接连接到数据库，您需要设置安全规则以允许访问。
   * 高级设置
     * **包含表**：默认为**全部**，您也可以选择自定义并填写包含的表，多个表之间用英文逗号（,）分隔。
     * **排除表**：打开该开关后，可以设定要排除的表，多个表之间用英文逗号（,）分隔。
     * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定 Agent。
     * **模型加载频率**：数据源中模型数量大于 1 万时，Tapdata 将按照设置的时间定期刷新模型。
     * **开启心跳表**：当连接类型选择为**源头和目标**、**源头**时，支持打开该开关，由 Tapdata 在源库中创建一个名为 **_tapdata_heartbeat_table** 的心跳表并每隔 10 秒更新一次其中的数据（数据库账号需具备相关权限），用于数据源连接与任务的健康度监测，更多介绍，见[通过心跳表监测数据同步链路](../../../best-practice/heart-beat-task.md)。
     
       :::tip
     
       数据源需在数据复制/开发任务引用并启动后，心跳任务任务才会启动，此时您可以再次进入该数据源的编辑页面，即可单击**查看心跳任务**。
     
       :::

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::