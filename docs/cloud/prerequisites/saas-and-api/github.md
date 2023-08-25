# GitHub

GitHub 是一个用于版本控制和协作的代码托管平台，它允许您和其他人随时随地协同处理项目。Tapdata Cloud 支持将 GitHub 作为源库构建数据管道，帮助您读取指定仓库的 Issue 和 Pull Requests 变更数据，并同步到指定的数据源，本文介绍如何在 Tapdata Cloud 中添加 GitHub 数据源。



## 连接 GitHub

1. 登录 [Tapdata Cloud 平台](https://cloud.tapdata.net/console/v3/)。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建**。

4. 在弹出的对话框中，搜索并选择 **GitHub**。

5. 根据下述说明完成数据源配置。

   ![GitHub 连接设置](../../images/github_connection_setting.png)

   * **连接名称**：填写具有业务意义的独有名称。
   * **连接类型**：仅支持**源头**。
   * **agent 设置**：默认为**平台自动分配**，您也可以手动指定。
   * **模型加载时间**：当数据源中模型数量小于 10,000 时，每小时刷新一次模型信息；如果模型数据超过 10,000，则每天按照您指定的时间刷新模型信息。

6. 单击**授权**，在跳转到的 GitHub 授权页面，完成登录和授权操作（推荐以组织管理员身份授权）。

   完成操作后，页面将返回至数据源配置页面并显示**成功授权**。

7. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::
