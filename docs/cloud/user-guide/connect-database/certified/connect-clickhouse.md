# 连接 ClickHouse

ClickHouse 是一个用于联机分析（OLAP）的列式数据库管理系统（DBMS）。Tapdata Cloud 支持将 ClickHouse 作为目标数据库构建数据管道，本文介绍如何在 Tapdata Cloud 中添加 ClickHouse 数据源。

## 前提条件

 [ClickHouse 数据源准备工作](../../../prerequisites/config-database/certified/clickhouse.md)

## 操作步骤

1. 登录 [Tapdata Cloud 平台](https://cloud.tapdata.net/console/v3/)。

2. 在左侧导航栏，单击**连接管理**。

3. 在页面右侧，单击**创建连接**。

4. 在跳转到的页面，单击**认证数据源**标签页，然后选择 **ClickHouse**。

5. 根据下述说明完成数据源配置。

   ![clickhouse_connection](../../../images/clickhouse_connection.png)

   * 连接信息设置
     * **连接名称**：填写具有业务意义的独有名称。
     * **连接类型**：仅支持将 ClickHouse 数据库作为目标。
     * **地址**：数据库连接地址。
     * **端口**：数据库的 HTTP API 服务端口，默认为 **8123**，如开启了 SSL 加密，默认端口为 8443，更多介绍，见[网络端口说明](https://clickhouse.com/docs/en/guides/sre/network-ports/)。
     * **数据库名称**：数据库名称，即一个连接对应一个数据库，如有多个数据库则需创建多个数据连接。
     * **账号**、**密码**：数据库的账号和密码。
     * **其他连接串参数**：额外的连接参数，默认为空。
   * 高级设置
     * **时区**：默认为数据库所用的时区，您也可以根据业务需求手动指定。
     * **agent 设置**：默认为**平台自动分配**，您也可以手动指定。
     * **模型加载频率**：数据源中模型数量大于 1 万时，Tapdata 将按照本参数的设定定期刷新模型。
   
6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::