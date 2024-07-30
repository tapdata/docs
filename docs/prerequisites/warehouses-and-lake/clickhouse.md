# ClickHouse
import Content from '../../reuse-content/_all-features.md';

<Content />

ClickHouse 是一个用于联机分析（OLAP）的列式数据库管理系统（DBMS）。完成 Agent 部署后，您可以跟随本文教程在 Tapdata 中添加 ClickHouse 数据源，后续可将其作为**源**或**目标库**来构建数据管道。

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 支持版本

ClickHouse 20.x、21.x

## 注意事项

- ClickHouse 暂不支持 binary 相关的字段类型，如包含在配置数据同步/开发任务时，可通过字段映射将其删除，否则会自动转成 Base64 字符串写入。
- ClickHouse 作为目标库时，可在 ClickHouse 节点的高级配置中，设定合并分区间隔以调整 [Optimize Table](https://clickhouse.com/docs/en/sql-reference/statements/optimize) 频率，从而实现性能与数据一致性间的平衡。
- ClickHouse 作为源库时，如需实现增量同步，其实现方式为字段轮询，即通过定期查询数据库表中的指定列（如时间戳或递增的标识列）来检测数据变化。更多介绍，见[变更数据捕获（CDC）](../../introduction/change-data-capture-mechanism)。

  :::tip

  此场景下，不支持同步 DDL 操作。

  :::

## 准备工作

1. 调整配置文件 **user.xml**，启用访问权限控制并重启服务，具体操作，见[官方文档](https://clickhouse.com/docs/zh/operations/access-rights#enabling-access-control)。

   :::tip

   您也可以使用通过修改该文件[完成账号配置](https://clickhouse.com/docs/zh/operations/settings/settings-users/)，本文演示权限控制开启后，如何创建和授权账号。

   :::

2. 登录 ClickHouse 数据库，执行下述格式的命令，创建用于数据同步/开发任务的账号。

   ```sql
   CREATE USER username HOST 'host' IDENTIFIED WITH protection BY 'password';
   ```

   * **username**：用户名。
   * **host**：允许该账号登录的主机，**ANY** 表示允许任意主机。
   * **protection**：密码保护方式。
   * **password**：密码。

   示例：创建一个名为 **tapdata** 的账号，采用 sha256_password 密码保护机制，允许其从任意主机登录。

   ```sql
   CREATE USER tapdata HOST ANY IDENTIFIED WITH sha256_password BY 'your_password';
   ```

3. 为刚创建的账号授予权限，简易示例如下，您还可以基于业务需求设置更精细化的权限控制。更多介绍，见[授权语法](https://clickhouse.com/docs/zh/sql-reference/statements/grant/)。

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="作为源库">
```
```sql
GRANT SELECT ON database_name.* to username 
```
</TabItem>

<TabItem value="作为目标库">

```sql
GRANT SELECT, INSERT, CREATE TABLE, ALTER TABLE, ALTER UPDATE, DROP TABLE, TRUNCATE ON database_name.* TO username
```
</TabItem>
</Tabs>


   * **database_name**：要授予权限的数据库名称。
   * **usernmae**：用户名。

## 添加数据源

1. [登录 Tapdata 平台](../../user-guide/log-in.md)。

2. 在左侧导航栏，单击**连接管理**。

3. 在页面右侧，单击**创建连接**。

4. 在跳转到的页面，单击**认证数据源**标签页，然后选择 **ClickHouse**。

5. 根据下述说明完成数据源配置。

   ![clickhouse_connection](../../images/clickhouse_connection.png)

   * 连接信息设置
      * **连接名称**：填写具有业务意义的独有名称。
      * **连接类型**：仅支持将 ClickHouse 数据库作为目标。
      * **地址**：数据库连接地址。
      * **端口**：数据库的 HTTP API 服务端口，默认为 **8123**，如开启了 SSL 加密，默认端口为 8443，更多介绍，见[网络端口说明](https://clickhouse.com/docs/en/guides/sre/network-ports/)。
      * **数据库名称**：数据库名称，即一个连接对应一个数据库，如有多个数据库则需创建多个数据连接。
      * **账号**、**密码**：数据库的账号和密码。
   * 高级设置
      * **连接参数**：额外的连接参数，默认为空。
      * **时区**：默认为数据库所用的时区，您也可以根据业务需求手动指定。
      * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定。
      * **模型加载时间**：当数据源中模型数量小于 10,000 时，每小时刷新一次模型信息；如果模型数据超过 10,000，则每天按照您指定的时间刷新模型信息。
      * **开启心跳表**：当连接类型选择为**源头和目标**、**源头**时，支持打开该开关，由 Tapdata 在源库中创建一个名为 **_tapdata_heartbeat_table** 的心跳表并每隔 10 秒更新一次其中的数据（数据库账号需具备相关权限），用于数据源连接与任务的健康度监测，更多介绍，见[通过心跳表监测数据同步链路](../../best-practice/heart-beat-task.md)。

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::

