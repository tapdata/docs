# 连接 Oracle

Oracle Database（简称 Oracle）是甲骨文公司的一款关系数据库管理系统。Tapdata Cloud 支持将 Oracle 作为源和目标数据库构建数据管道，本文介绍如何在 Tapdata Cloud 中添加 Oracle 数据源。

## 准备工作

[Oracle 数据源准备工作](../../../prerequisites/certified/oracle)

## 操作步骤

1. 登录 [Tapdata Cloud 平台](https://cloud.tapdata.net/console/v3/)。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建连接**。

4. 在弹出的对话框中，单击**认证数据源**，然后选择 **Oracle**。

5. 在跳转到的页面，根据下述说明填写 Oracle 的连接信息。

   ![Oracle 连接示例](../../../images/oracle_connection_cn.png)

   * 连接信息设置
     * **连接名称**：填写具有业务意义的独有名称。
     * **连接类型**：支持将 Oracle 作为源或目标库。
     * **连接方式**：可选择通过 SID 或 Service Name 连接。
     * **数据库地址**：数据库连接地址。
     * **端口**：数据库的服务端口。
     * **SID**/**Service Name**：填写 SID 或 Service Name 信息。
     * **Schema**：Schema 名称，即一个连接对应一个 Schema，如需连接多个 Schema 则需创建多个数据连接。
     * **其他连接串参数**：额外的连接参数，默认为空。
     * **账号**：数据库的账号。
     * **密码**：数据库账号对应的密码。
     * **多租户模式**：如 Oracle 为多租户模式，需打开该开关并填写 PDB 信息。

   * 高级设置
     * **日志插件**：保持默认（**logMiner**）。
     * **时间类型的时区**：默认为数据库所用的时区，您也可以根据业务需求手动指定。
     * **包含表**：默认为**全部**，您也可以选择自定义并填写包含的表，多个表之间用英文逗号（,）分隔。
     * **排除表**：打开该开关后，可以设定要排除的表，多个表之间用英文逗号（,）分隔。
     * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定 Agent。
     * **模型加载频率**：数据源中模型数量大于 1 万时，Tapdata Cloud 将按照设置的时间定期刷新模型。

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::



## 相关文档

[Oracle 实时同步至 Tablestore](../../../best-practice/oracle-as-source/oracle-to-tablestore.md)
