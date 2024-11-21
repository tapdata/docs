# Sybase

import Content from '../../reuse-content/_enterprise-and-cloud-features.md';

<Content />

[Sybase 数据库](https://infocenter.sybase.com/help/index.jsp)，又称 Adaptive Server Enterprise (ASE)，是一款高性能、可靠且可扩展的企业级关系数据库管理系统。Sybase 已进入支持的尾声，推荐尽快迁移至其他数据库以降低风险。通过 TapData，您可以轻松构建实时同步管道，将 Sybase 数据实时同步至其他数据库平台，确保业务连续性。

## 支持版本与架构

* **版本**：Sybase 16
* **架构**：所有架构

## 支持数据类型

| **类别**      | **数据类型**                                            |
| ------------- | ------------------------------------------------------- |
| **字符**      | (UNI)CHAR、(UNI)VARCHAR、N(VAR)CHAR、(UNI)TEXT          |
| **数字**      | (TIN/SMALL/BIG)YINT、REAL、(SMALL)MONEY、FLOAT、DECIMAL |
| **布尔**      | BIT                                                     |
| **日期/时间** | DATE、(BIG)TIME、(SMALL/BIG)DATETIME、TIMESTAMP         |
| **二进制**    | (VAR)BINARY、IMAGE                                      |
| **大对象**    | CLOB、BLOB                                              |

## 支持同步的操作

DML 操作：INSERT、UPDATE、DELETE

## 功能限制

- 暂不支持 DDL 事件的采集和应用，一旦同步期间发生 DDL 事件，您需要停止任务并重新执行全量数据同步。
- 由于 Sybase 限制，如果对同一数据库启用多个同步任务，需要在配置 Sybase 连接和任务时开启**[共享挖掘](../../user-guide/advanced-settings/share-mining.md)** ，避免新任务无法正确同步增量数据。

## 注意事项

- Sybase 作为源库执行实时增量同步时，TapData 会设置日志位点防止清理，且每 10 分钟推进一次，可能占用额外磁盘空间。由于暂停的增量任务会导致事务日志累积，因此建议及时删除不再需要的任务，或手动重置长时间暂停的任务。
- 全量数据同步阶段会占用数据库和带宽资源，应确保硬件资源充足，而增量同步的负载影响通常在 5% 以内。

## <span id="prerequisites">准备工作</span>

1. 使用具备 DBA 权限的用户登录 Sybase 数据库。

2. 执行下述 SQL 命令创建同步任务所需用户并授予必要权限。

   ```sql
   create login <username> with password '<password>';
   sp_displaylogin <username>;
   sp_role 'grant', sa_role, <username>;
   sp_role 'grant', replication_role, <username>;
   sp_role 'grant', sybase_ts_role, <username>;
   ```

   * `<username>`：要创建的用户名。
   * `<password>`：该用户的密码。

## 连接 Sybase

1. [登录 TapData 平台](../../user-guide/log-in.md)。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建**。

4. 在弹出的对话框中，搜索并选择 **Sybase**。

5. 在跳转到的页面，根据下述说明填写 Sybase 的连接信息。

   ![Sybase 连接设置](../../images/sybase_connection.png)

   * **连接信息设置**
     * **连接名称**：填写具有业务意义的独有名称。
     * **连接类型**：支持将 Sybase 作为源或目标库。
     * **数据库地址**：数据库连接地址。
     * **端口**：数据库的服务端口。
     * **数据库名称**：数据库名称，即一个连接对应一个数据库，如有多个数据库则需创建多个数据连接。
     * **Schema**：Shema 名称。
     * **账号**：数据库的账号。
     * **密码**：数据库账号对应的密码。
     * **字节序**：分为大端（big-endian）和小端（little-endian），需基于机器架构确定，例如通常情况下 Linux 机器为小端，而某些专用的 Sybase 机器为大端，一旦配置错误，可能导致增量阶段同步的数据不一致。
   * **高级设置**
      * **共享挖掘**：[挖掘源库](../../user-guide/advanced-settings/share-mining.md)的增量日志，可为多个任务共享同一源库的增量日志采集进程，从而避免重复读取，从而最大程度上减轻增量同步对源库的压力，开启该功能后还需要选择一个外存用来存储增量日志信息。
      * **包含表**：默认为**全部**，您也可以选择自定义并填写包含的表，多个表之间用英文逗号（,）分隔。
      * **排除表**：打开该开关后，可以设定要排除的表，多个表之间用英文逗号（,）分隔。
      * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定 Agent。
      * **模型加载时间**：如果数据源中的模型数量少于10,000个，则每小时更新一次模型信息，一旦超过该数量，则将每天在您指定的时间重新加载模型信息。

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::

## 节点高级特性

在配置 Sybase 作为源或目标节点的同步/转换任务时，TapData 提供了多个高级功能以提升性能和应对复杂场景：

- **Lob 类增量同步**：用于 TEXT、IMAGE、BYTE、CLOB、BLOB 类型的数据同步，支持两种方式：
  - **日志解析**：无需访问源库，适用于无主键或唯一索引的场景，但性能相对较低。
  - **源表反查**：通过查询源库反查 Lob 对象，性能更高，适用于存在主键或唯一索引的场景。
- **自动编解码**：支持根据配置的字符编码对所有同步数据进行自动转换，确保字符集一致性，避免编码问题导致的数据异常。