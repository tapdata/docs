# 增量同步异常排查

CDC（Change Data Capture）数据异常排查是保障数据同步任务稳定性的核心环节。当任务出现增量延迟过高、任务报错停止或数据不一致等情况，通常与源端数据库的日志配置、权限或系统资源有关。本文将介绍如何快速定位和解决 CDC 相关问题。

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 确认现象完成初步定位

在深入排查前，请先根据任务表现确认问题类型：



-  **任务报错停止**：任务状态变为“错误”或“停止”，可[查看任务日志](../../user-guide/copy-data/monitor-task.md#-任务日志展示区)，确认是否包含 `binlog`、`cdc`、`DDL event`、`Oplog` 等关键词。
    
    **常见原因**：日志过期、权限不足、解析异常、预期以外的 DDL 变更、网络中断等。

-  **增量延迟持续升高**：任务处于“运行中”，但**增量延迟**指标持续增加，例如从毫秒上升至分钟/小时级别。
    
    **常见原因**：源库有批量更新（大事务）、源库负载过高、网络带宽受限、TapData 引擎处理瓶颈。

-  **数据不一致/丢失**：目标端数据少于源端，或字段未更新。
    
    **常见原因**：表无主键导致更新丢失、DDL 变更未同步、日志解析过滤配置错误。

-  **读不到源库增量变更**：任务状态正常，源库有数据更新，但 TapData 监控显示的 QPS 为 0，目标端无数据变化。
    
    **常见原因**：数据库未开启 CDC、日志级别配置错误、日志过滤规则配置不当（如忽略了要同步的数据库/表）。

## 通用排查步骤

无论源库类型如何，以下步骤是排查 CDC 问题的通用基础：

1. 进入 TapData 任务监控页，[检查任务日志](../../user-guide/copy-data/monitor-task.md#-任务日志展示区)。
    - **查看错误码**：筛选 `WARN` 或 `ERROR` 级别日志，根据系统固化的标准[错误码](../../administration/troubleshooting/error-code.md)快速定位原因并获取修复建议。
    - **关键信息**：查看报错上下文，例如 `binlog` 通常指向 MySQL 配置问题；`ReplicationSlot` 错误通常指向 PostgreSQL 复制槽问题。

2. 检查账号是否有足够的权限读取数据库的事务日志。
    :::tip
    关于各类数据库作为源库希望实现增量数据同步的权限配置，可参考[连接数据源](../../prerequisites/README.md)目录中的各连接器章节。
    :::

3. 检查网络连通性。
    - 在 TapData 引擎所属机器上 `ping` 源库 IP，或通过 `telnet` 命令检查端口是否可连通。
    - 检查是否有防火墙策略切断了长时间空闲的连接（TCP Keepalive）。

## 常见数据库 CDC 专项排查

不同数据库的 CDC 实现机制不同，请根据您的源库类型进行专项检查。

:::tip
本文仅列举常见数据库的排查流程。关于其他数据库的 CDC 配置要求，请参考[连接数据源](../../prerequisites/README.md)中对应的连接器文档。
:::


```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="MySQL / MariaDB" default>
```
MySQL CDC 依赖 Binlog，常见问题如下：

- **Binlog 是否开启且格式正确**：
  必须开启 Binlog 且格式为 `ROW`，`binlog_row_image` 必须为 `FULL`。
  ```sql
  SHOW VARIABLES LIKE 'log_bin'; -- 必须为 ON
  SHOW VARIABLES LIKE 'binlog_format'; -- 必须为 ROW
  SHOW VARIABLES LIKE 'binlog_row_image'; -- 必须为 FULL
  ```
  :::tip
  如果 `binlog_row_image` 不是 `FULL`，可能会导致 UPDATE 操作缺失未变更字段的数据，从而导致目标端同步失败。
  :::

- **Binlog 过滤规则检查**：
  检查 MySQL 配置文件（`my.cnf`）中是否配置了 `binlog-ignore-db` 或 `binlog-do-db`。
  *   如果配置了 `binlog-ignore-db`，确保**未包含**目标数据库。
  *   如果配置了 `binlog-do-db`，必须**显式包含**目标数据库，否则该库的增量日志将不会被记录，导致 TapData 读不到增量数据。

- **Binlog 是否过期（日志被清理）**：
  如果任务停止一段时间后再启动，报错“找不到 Binlog”，可能是源库保留时间太短。
  ```sql
  -- 查看当前 Binlog 文件列表
  SHOW BINARY LOGS;
  -- 查看 Binlog 保留时间配置
  SHOW VARIABLES LIKE 'expire_logs_days';
  SHOW VARIABLES LIKE 'binlog_expire_logs_seconds';
  ```
  **解决方案**：延长 Binlog 保留时间，或重置任务后重新启动。


</TabItem>

<TabItem value="PostgreSQL">

PostgreSQL CDC 通常依赖逻辑复制（Logical Replication）和复制槽（Replication Slot）。

:::tip
TapData 支持 Wal2json（推荐）、Pgoutput、Decoderbufs 和 Walminer 日志解码插件，下文以 Wal2json 为例介绍排查流程。
:::

- **检查 WAL 级别**：
  必须为 `logical`。
  ```sql
  SHOW wal_level; -- 必须是 logical
  ```

- **检查复制槽（Replication Slot）状态**：
  TapData 会创建复制槽以确保持久化读取进度。
  ```sql
  -- 查看复制槽状态，active 为 t 表示正在使用
  SELECT * FROM pg_replication_slots;
  ```
  :::tip
  如果复制槽 `active` 为 `f` 且 `restart_lsn` 较旧，可能会导致 PG 的 WAL 日志无法清理，从而**撑爆磁盘**。请及时清理废弃的复制槽。
  :::

- **检查表的 Replica Identity**：
  如果更新/删除操作无法同步，检查表是否设置了主键或 Replica Identity。
  ```sql
  -- 默认为 DEFAULT (主键)，如无主键需设置为 FULL (但这会消耗更多资源)
  ALTER TABLE table_name REPLICA IDENTITY FULL;
  ```

</TabItem>

<TabItem value="MongoDB">


MongoDB CDC 依赖 Oplog（操作日志）。

- **检查集群模式**：
  MongoDB 必须是 **副本集（Replica Set）** 或 **分片集群（Sharded Cluster）** 架构。
  
  单机版 MongoDB 默认不开启 Oplog，不支持 CDC，您可以将其配置为单成员的副本集以开启 Oplog。具体操作，见[如何将单节点转为副本集](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/)。

- **检查 Oplog 窗口大小（保留时间）**：
  如果 Oplog 覆盖时间过短，任务暂停后可能无法恢复。
  ```javascript
  // 在 mongo shell 执行，查看 oplog 大小和覆盖时间范围
  rs.printReplicationInfo();
  ```
  **解决方案**：如果 Log length start to end 时间太短（如仅 1 小时），建议扩容 Oplog 大小。

</TabItem>

<TabItem value="Oracle">

Oracle CDC 通常依赖 LogMiner 或 TapData 提供的[原生日志解析工具](../../case-practices/best-practice/raw-logs-solution.md)。

- **检查归档日志（Archive Log）**：
  必须开启归档模式，否则在线重做日志（Redo Log）被覆盖后无法找回历史数据。
  ```sql
  ARCHIVE LOG LIST; -- Database log mode 必须为 Archive Mode
  ```

- **检查附加日志（Supplemental Logging）**：
  必须开启最小附加日志，以及针对表的列级日志（通常是主键/所有列）。
  ```sql
  SELECT supplemental_log_data_min FROM v$database; -- 必须为 YES
  ```

</TabItem>

<TabItem value="SQL Server">


- **检查 CDC/CT 是否开启**：
  需确认数据库级别和表级别已开启 CDC 或 CT（Change Tracking）。
  ```sql
  -- 查看数据库是否开启 CDC
  SELECT name, is_cdc_enabled FROM sys.databases;
  -- 查看表是否开启 CDC
  SELECT name, is_tracked_by_cdc FROM sys.tables;
  ```

- **检查 SQL Server Agent**：
  CDC 依赖 Agent 作业来捕获和清理数据，确保 SQL Server Agent 服务正在运行。

</TabItem>

</Tabs>

## 性能问题排查与优化

如果任务没有报错，但**增量延迟居高不下**或**同步速率不符合预期**，可从以下方面优化：

* **引擎过载处理**
    - **内存资源不足**：检查 TapData 引擎日志是否频繁出现 GC（Garbage Collection）。如内存不足，可尝试合并任务以减少线程开销，或调整服务器配置并增加引擎内存。
    - **开启共享挖掘**：如果有多个任务从同一个源库同步数据，建议开启[共享挖掘](../../user-guide/data-development/create-task.md#advanced-settings)功能。此功能可合并源库日志读取线程，显著降低源库压力并减少网络带宽占用。

* **网络或源库问题**
    - **网络稳定性**：检查是否有网络中断历史，尝试重启网络服务或优化网络路由。
    - **源库大事务/批量操作**：全表更新或批量删除会产生海量日志导致延迟积压，属正常现象。建议调整任务的**增量并发写入线程数**加速追平，或协调业务方将大事务**分批**或**错峰**执行。

* **数据库负载过高**
  
  如果源库或目标库 CPU/IO 使用率过高，响应变慢，也会拖慢同步速度，可协调 DBA 对数据库进行性能分析或扩容。


## 其他常见问题与处理

* **DDL 变更导致同步异常**
    
    请确认源库是否有 DDL 变更，并检查任务是否开启了“DDL 同步”及“DDL 应用”。若未开启，需手动调整目标表结构或重置任务。

    关于 DDL 变更的详细处理策略与最佳实践，请参考[处理 DDL 变更](../../case-practices/best-practice/handle-schema-change.md)。

*   **数据不一致**
    
    如果怀疑数据不一致，请按以下步骤排查：
    - **触发器（Trigger）影响**：检查源库表是否有触发器修改数据。某些 CDC 机制可能无法捕获触发器产生的变更，或者触发器逻辑导致源端数据再次变更而未被捕获。
    - **数据校验**：使用 TapData 的数据校验功能，确认源端和目标端数据是否一致。
      - **[全量数据校验](../../user-guide/verify-data.md)**：适用于任务初始化后的数据一致性确认，支持 COUNT、字段值、Hash 等多种校验方式。
      - **[增量数据校验](../../user-guide/incremental-check.md)**：适用于实时监控数据一致性。