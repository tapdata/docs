# 连接 LarkTask

飞书（Lark）是一款协作与管理平台，支持即时通讯、音视频会议等功能。Tapdata 支持将 LarkTask 作为目标数据库构建数据管道，本文介绍如何在 Tapdata Cloud 中添加 LarkTask 数据源。

## 操作步骤

1. 登录 [Tapdata Cloud 平台](https://cloud.tapdata.net/console/v3/)。

2. 在左侧导航栏，单击**连接管理**。

3. 在页面右侧，单击**创建连接**。

4. 在跳转到的页面，单击 **Beta 数据源**标签页，然后选择 **LarkTask**。

5. 根据下述说明完成数据源配置。

   ![](../../../images/feishu_connection_setting.png)

   * **连接名称**：填写具有业务意义的独有名称。
   * **连接类型**：仅支持**目标**。
   * **应用 ID**、**应用 Secret**：可通过飞书开放平台获取，具体操作，见 [LarkTask 数据源准备工作](../../../prerequisites/config-database/beta/larktask.md)。
   * **agent 设置**：默认为**平台自动分配**，您也可以手动指定。
   * **模型加载频率**：数据源中模型数量大于 1 万时，Tapdata 将按照本参数的设定定期刷新模型。

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::
