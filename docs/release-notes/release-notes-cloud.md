# TapData Cloud 更新日志

import Content from '../reuse-content/_cloud-features.md';

<Content />

为提升用户体验，TapData Cloud 通过发布新版本的方式丰富/优化产品功能、修复已知缺陷。本文介绍 TapData Cloud 的更新日志，帮助您更好地掌握新功能特性。

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```


```mdx-code-block
<Tabs className="unique-tabs">
  <TabItem value="2024 年" default>
```

### 2024-08-06

#### 新增功能

- 在[数据转换任务配置](../user-guide/data-pipeline/data-development/create-task.md)阶段，源节点模型预览区域支持单表模型的重新加载，提高加载效率
- 新增时间探测功能，自动探测引擎部署服务器和数据库服务器的时间差，并在任务监控页面展示

#### 功能优化

* 用户定义的字段业务描述可直接展示在表样例数据的列名位置

#### 问题修复

- 修复实时数据平台某些表数据量统计为空的问题
- 修复实时数据平台发布 API 时路径未显示 host 的问题
- 修复 MongoDB 数据库 cursor 超时导致任务无法正常全量同步的问题
- 修复源节点数据过滤设置中自定义 SQL 过滤开关无法打开的问题
- 修复云版线上全托管 Agent 的邮件告警格式错误的问题

### 2024-07-20

#### 新增功能

- 数据复制任务新增[多表合并](../user-guide/data-pipeline/copy-data/process-node#union-node)节点，可对同一数据库中的多个表执行合并操作（UNION），可用于整合和分析数据等场景
- [Doris](../prerequisites/warehouses-and-lake/doris.md) 数据源支持无证书的 HTTPS 连接方式
- MySQL、Oracle、OpenGauss、SQL Server、PostgreSQL 数据源，支持任务配置时，在节点的高级配置中启用 **Hash 分片**功能，可大幅提升大表的全量数据同步速度
- 新增 [VastBase](../prerequisites/on-prem-databases/vastbase) 数据源，成熟度为 Beta，进一步丰富数据源种类

#### 功能优化

- 优化时区类字段的同步逻辑
- 日志连续挖掘设置优化展示逻辑，当数据库的版本不支持此功能时自动隐藏相关按钮

#### 问题修复

- 修复采用了共享挖掘的 MongoDB 同步任务中，增量同步延迟显示的问题
- 修复源端 MySQL 不支持增量时，任务报错信息不明确且错误码的详细信息中缺少相关提示的问题
- 修复任务警告的警报格式不正确的问题
- 修复导入的任务显示有运行记录，且当前运行记录状态显示为删除中的问题
- 修复在创建 FDM 复制任务时，修改表名时未正常显示的问题
- 修复任务目标表关联键设置后，编辑任务时自动推演模型错误地修改关联键的问题
- 修复 Python 节点移除字段可能失败的问题
- 修复在主从合并操作中，删除主节点后，主从合并节点配置异常导致任务错误的问题
- 修复应用管理中，创建应用时提示标签名称已存在的问题
- 修复在引擎服务器未设置 UTF 字符编码的场景下，如果源端发生 DDL，导致任务的中文节点名称出现乱码的问题

### 2024-07-05

#### 功能优化

* [实时数据中心](../user-guide/real-time-data-hub/README.md)功能优化：
  * 数据加工层支持显示库中所有模型
  * 平台缓存层与平台加工层可选择不同的的连接，设置后不可调整
  * 增加 API 发布入口
  * 优化模型详情的展示
* ElasticSearch 数据源添加字段限制配置参数
* MongoDB 数据源开启 preimage 能力时，优化异常处理逻辑

#### 问题修复

- 修复任务事件统计指标上报时偶现丢失部分指标的问题
- 修复共享缓存任务未执行共享挖掘时，如果数据没有变化，在重启或升级引擎时可能因超出日志时间窗口而导致任务错误的问题
- 修复在 MDM_model 下禁用从节点后导致任务启动失败的问题
- 修复实时数据中心的血缘图偶现无法展示的问题
- 修复在写入模式为更新子文档的场景下，源表的 unset 操作可能导致任务报错的问题
- 修复 MongoDB 与 MySQL 执行 Join 合并场景下，MongoDB 集合中包含时间类型可能引发报错的问题
- 修复在实时数据中心创建的任务无法添加主从合并节点的问题
- 修复在主从合并场景下，增量更新事件意外执行反查的问题
- 修复主从合并节点修改列时的冲突报错问题

### 2024-06-21

#### 新增功能

* [TiDB](../prerequisites/on-prem-databases/tidb.md) 数据源能力增强，支持实时增量同步

#### 功能优化

* 优化任务的表模型主键和索引的展示方式
* 优化模型推演逻辑，支持在引擎直接进行模型推演

#### 问题修复

* 修复数据源异常处理存在忽略部分异常的问题
* 修复时间字段做关联键的聚合任务，反查不到数据的问题
* 修复挖掘任务延迟时间异常的问题
* 修复 MySQL 作为源时，大表初始化同步会占用大量数据库内存的问题

### 2024-06-07

#### 新增功能

* 新增 Mock Source 和 Mock Target 数据源，可用于测试/模拟场景

#### 功能优化

* 优化启动任务时的跳过错误的交互逻辑

#### 问题修复

* 修复任务运行模型与配置模型不一致的问题
* 修复过滤源端数据后，任务事件统计不准确的问题
* 修复 Oracle 和 PostgreSQL 同步场景下，时区处理异常的问题
* 修复连接列表加载速度过慢的问题
* 修复心跳任务重置失败时，可能导致相关联任务无法启动的问题

### 2024-05-21

#### 新增功能

* 支持在[配置数据转换任务](../user-guide/data-pipeline/data-development/create-task#target-node-set)时，为目标表名动态生成日期后缀，适用于每日定期执行批处理的场景
* 支持在配置 Doris 数据源时设置分区
* 支持 OceanBase 数据源的 Oracle 模式，数据源名称为 Oceanbase(Oracle)

#### 功能优化

* 优化 MongoDB 同步到关系型数据库（如 MySQL）的数据处理逻辑
* 优化 Dummy 数据源，支持快速添加大字段以用于性能测试场景

#### 问题修复

* 修复 MariaDB 无法将 `0000-00-00 00:00:00` 格式数据写入目标的问题
* 修复心跳表被误删后心跳任务无法自动恢复的问题
* 修复共享挖掘任务出现错误后，无法序列化的问题

### 2024-05-06

#### 新增功能

* 支持 MySQL 间、PostgreSQL 间的双向数据同步能力，更好满足多活和容灾场景
* 支持 [MongoDB Relmig](https://www.mongodb.com/docs/relational-migrator/) 1.3.0 以上版本的文件导入能力，进一步完善生态对接能力
* 支持同步 MongoDB 的 [Oplog](https://www.mongodb.com/docs/manual/core/replica-set-oplog/)（操作日志）数据
* 支持在配置数据转换任务时，在源节点的**[高级设置](../user-guide/data-pipeline/data-development/create-task#full-sql-query)**中选择对表的时间字段进行过滤（例如相对日期）
* 支持在[任务列表](../user-guide/data-pipeline/copy-data/manage-task.md)页面，展示任务里程碑信息，帮助用户快速获知任务的关键进度状况

#### 功能优化

* 优化 [Unwind 节点](../user-guide/data-pipeline/data-development/process-node#unwind)，支持设置展开模式，如内嵌对象或平铺字段
* 优化全量同步详情页面展示，支持通过表名快速过滤表

#### 问题修复

* 修复特定场景下，调整告警设置可能影响任务正常运行的问题
* 修复新增挖掘表时，任务显示挖掘任务异常的问题

### 2024-04-26

#### 新增功能

* [数据复制任务](../user-guide/data-pipeline/copy-data/create-task.md)支持表级别的断点续传能力，任务重启时可以直接从未完成同步的表继续同步
* 支持通过拖拽快速[设置任务标签](../user-guide/data-pipeline/copy-data/manage-task.md)
* 支持 MySQL 主从架构，发生主从切换后，相关任务可继续正常同步数据

#### 功能优化

* Windows 版本的 Cloud Agent 新增数字证书签名，避免系统安全性提示阻碍安装流程
* 优化用户中心页面

#### 缺陷修复

* 修复阿里云 PolarDB MySQL 数据源，因不支持特定事件导致任务报错的问题
* 修复全量任务同步完成，统计指标中显示统计进度不正确的问题

### 2024-04-12

#### 新增功能

* 支持对 [TiDB 数据源](../prerequisites/on-prem-databases/tidb.md)的实时日志解析能力，可满足增量数据同步需求
* 在 Oracle 全量同步至 MySQL 阶段，支持同步未使用函数的唯一索引和普通索引
* 支持在启动任务时，选择跳过上一次运行时出现的错误

#### 功能优化

* 优化数据同步任务场景下，源节点中的 DDL 同步设置，选择遇到 DDL 报错时可配置要忽略的 DDL 语句（基于正则表达式）
* 优化数据校验能力，支持对包含处理节点的任务进行校验
* 优化数据校验结果页展示，支持快速过滤一致和不一致的表

#### 问题修复

* 修复 MongoDB 作为外存场景下，当存储的 Value 是 Map 类型且 Key 为带 `.` 符号的 String 时，发生异常的问题
* 修复 对Kafka 数据源执行连接测试时，包含非 JSON 的主题会发生循环异常的问题
* 修复 JS 节点在特定场景下，试运行报错的问题
* 修复使用主从合并节点时，更改关联键值引发数据不正确的问题
* 修复 RocksDB 作为缓存存储，可能引发任务报错的问题

### 2024-03-29

#### 功能优化

* 为进一步提升用户体验，成熟度为 Beta 和 Alpha 的[数据源](../prerequisites/README.md)需申请使用，TapData 可基于您的业务场景提供更好的技术支持

#### 问题修复

* 修复了特定场景下，Agent 发生异常的问题
* 修复了 MongoDB RM 文件导入异常的问题

### 2024-03-08

#### 新增功能

* 支持设置[默认告警接收人](../user-guide/workshop.md#notifications)，可自定义告警接收邮箱地址（支持多个）
* [DDL 同步设置](../best-practice/handle-schema-change.md)，新增**遇到 DDL 操作时任务报错停止**和**自动忽略 DDL**选项，可适应不同业务场景需求
* 新增[时间字段注入](../user-guide/data-pipeline/data-development/process-node.md#time_injection)节点，可在数据同步过程中为流经的数据增加一个自定义的时间戳字段，从而提供更灵活的方式来获取源库的增量变更

#### 功能优化

* 优化任务重试逻辑和界面提示信息
* 优化增量采集时刻设置，支持快速选择上一次增量运行时所处的增量时间点
* 优化主从合并节点使用外存的交互处理逻辑

### 2024-01-26

#### 新增功能

- 新增支持[共享挖掘](../user-guide/advanced-settings/share-mining.md)功能，可为多个任务共享源库的增量日志，避免重复读取，从而最大程度上减轻增量同步对源库的压力。
- 共享挖掘功能支持使用 RocksDB 作为[本地外存](../user-guide/advanced-settings/manage-external-storage.md)，可实现对增量日志的存储扩展。

#### 功能优化

- 优化 [Google 云市场](https://console.cloud.google.com/marketplace/product/tapdata-public/detail)用户的新手引导流程
- [任务监控页面](../user-guide/data-pipeline/copy-data/monitor-task.md)，增加增量阶段的时间过滤选项，便于快速观察增量阶段的 RPS
- 针对可能对数据库造成影响的关键操作（例如过滤源表数据），增加相关提示信息
- 优化实例订阅到期后的退订逻辑

#### 问题修复

* 修复[主从合并节点](../user-guide/data-pipeline/data-development/process-node.md#pri-sec-merged)，当主表与子表关键条件变化时，最终数据与预期不符合的问题

### 2024-01-12

#### 新增功能

* MongoDB 间的数据同步场景，新增支持 [Capped 集合](https://www.mongodb.com/docs/manual/core/capped-collections/)
* 数据复制/转换任务支持导入能力，您可以在 [MongoDB Relational Migrator](https://www.mongodb.com/docs/relational-migrator/) 上设计好数据流转流程并将其导出，随后在 TapData 数据管道右上角直接导入，进一步提升数据管道设计便利性

#### 功能优化

* 优化新用户引导流程，支持收起相关提示和返回上一步骤

#### 问题修复

* 修复 JS 节点模型声明设置在任务编辑页面提示错误的问题
* 修复 Oracle 同步至 MySQL 时，DROP COLUMN 操作未正常同步的问题
* 修复 MySQL 同步至 ClickHouse 时，DDL 报错的问题
* 修复 WebSocket 频繁重连导致任务不稳定的问题
* 修复若干 UI 交互体验问题

</TabItem>

<TabItem value="2023 年">

### 20231226

#### 新增功能

* 针对 MongoDB 5.x 及以上版本的数据源，新增支持 [Time Series 集合](https://www.mongodb.com/docs/manual/core/timeseries-collections/)
* 针对 MongoDB 6.x 及以上版本的数据源，新增支持 [preImage](https://www.mongodb.com/docs/manual/changeStreams/#change-streams-with-document-pre--and-post-images)

#### 功能优化

* 优化任务数达到上限的场景下，开启定时调度任务时的系统提示

#### 问题修复

* 修复多表数据复制场景下，断点不准确的问题
* 修复已退订删除的 Agent 实例，未及时停止上报心跳信息的问题
* 修复已知的 UI 交互体验问题

### 20231208

#### 新增功能

- 数据源新增 [Azure Cosmos DB](../prerequisites/cloud-databases/azure-cosmos-db.md)，可做为源库同步全量数据，帮助实现云端数据快速流转

#### 功能优化

- 优化数据源连接方式，[SQL Server](../prerequisites/on-prem-databases/sqlserver.md) 可支持 SSL 连接，可帮助进一步提升数据安全性
- 优化[数据复制任务](../user-guide/data-pipeline/copy-data/create-task.md)的目标节点字段类型调整方式，在手动输入的基础上，支持直接选择目标数据库常用类型
- 针对任务的源节点设置，支持设置增量阶段每批读取的条数，更好适应增量同步的性能需求

#### 问题修复

- 修复增强 JS 节点在特定场景下，模型声明不生效或异常问题
- 修复若干 UI 交互体验问题

### 20231124

#### 新增功能

* 支持对 [Oracle 数据源](../prerequisites/on-prem-databases/oracle#advanced)加载表注释，可在配置数据源时的高级选项中开启，方便通过注释信息快速识别表的业务含义
* 任务运行[监控页面](../user-guide/data-pipeline/copy-data/monitor-task.md)中，支持基于事件大小的维度来查看 RPS 信息

#### 功能优化

* 优化资源管理和订阅中心的页面展示效果
* 执行数据源连接测试时，支持显示连接器下载进度，帮助快速掌握连接进度及超时问题定位

#### 问题修复

* 修复重置任务后重新运行任务时，增量信息未清理成功的问题
* 修复部分 SaaS 数据源在执行全量数据同步时，显示增量时间点的问题

### 20231103

#### 功能优化

- 优化[数据源连接](../prerequisites/README.md)方式，MySQL、PostgreSQL、Kafka、TiDB、MariaDB 等数据源支持 SSL 连接，可帮助进一步提升数据安全性
- 优化界面交互逻辑
- 针对非主键的更新条件，创建唯一索引来解决数据重复的问题

#### 问题修复

- 修复表名包含 `.` 时可能出现的数据同步失败问题
- 修复任务异常信息未包含表名的问题
- 修复为任务指定运行的 Agent 时，任务配额与任务数量上限判定不正确的问题

### 20231020

#### 新增功能

- MongoDB 作为目标时，新增支持[自动创建分片集合](../user-guide/data-pipeline/copy-data/create-task.md#advanced-settings)
- 新增 [Unwind 处理节点](../user-guide/data-pipeline/data-development/process-node.md#Unwind)，可帮助您高效地将数组中的每个元素“展开”，将每个元素转换为独立的数据行
- 配置任务时，新增支持禁用节点能力，鼠标悬停至节点上即可选择该功能，可帮助减少数据在处理过程中的流转成本

#### 功能优化

- [配置数据复制任务](../user-guide/data-pipeline/copy-data/create-task.md)时，可通过**可选择的表范围**下拉框快速过滤出有主键或无主键表，其中有主键表包含具有唯一索引的无主键表
- 新用户的功能介绍引导流程中，新增 Demo 数据源，帮助您快速完成教程，构建起第一个数据流转任务
- 优化引擎界面操作按钮前端显示效果

#### 问题修复

- 修复了 MongoDB 作为目标时，INSERT 操作遇到无分片键发生报错的问题
- 修复了 MongoDB 不支持 REPLACE，即 REPLACE 删掉的字段无法被正常删除的问题

### 20231008

#### 新增功能

- 新增[构建物化视图](../user-guide/data-pipeline/data-development/create-materialized-view.md)功能，可快速构建实时数据模型
- Kafka 数据源新增支持设置副本数和分区数
- MongoDB 间同步时，新增对 `$unset` 操作的支持

#### 功能优化

- 任务引导过程中，针对全托管 Agent 在创建连接时，增加全托管 Agent 公网 IP 地址的说明，
- 支持在数据复制/数据转换配置的页面顶部，通过搜索节点来快速定位目标节点

#### 问题修复

* 修复通过页面重启 Agent 时，记录的操作日志类别不正确的问题



### 20230920

#### 新增功能

* 新增 [Python 处理节点](../user-guide/data-pipeline/data-development/process-node.md#python)，支持通过 Python 脚本来自定义数据处理逻辑，相较于 JS 处理节点性能有一定提升
* 新增**联系我们**入口，方便用户遇到问题时快速联系技术支持

#### 功能优化

* 优化[数据源错误码](../troubleshooting/error-code.md)，覆盖更多场景并提供解决方案
* 配置邮件告警通知时，增加绑定邮箱地址的页面引导
* 优化任务数达到上限时的提醒，当达到任务数上限时提供快升级的入口

### 20230826

#### 新增功能

- 新增[主从合并节点](../user-guide/data-pipeline/data-development/process-node.md#pri-sec-merged)，可实现宽表的快速构建和实时更新，帮助您更好地实现数据分析

#### 功能优化

- 将连接数据源时右侧展示帮助文档，调整为内嵌的在线文档，帮助用户获取最新的帮助信息
- 对核心数据源（如 PostgreSQL、Redis等），优化创建连接时的页面参数介绍和指引

#### 问题修复

* 修复了运行过的任务无法查看运行监控页面的问题

### 20230811

#### 新增功能

- 新增 [Dashboard 页面](../user-guide/workshop.md)，可直观获取页面任务与 Agent 状态概览
- [Agent 购买](../billing/purchase.md)的支付方式新增公对公支付
- 新增[实时数据中心](../user-guide/real-time-data-hub)的介绍和部署引导

#### 功能优化

- 整合数据复制和数据面板入口，可在数据复制页面的右上角切换至数据面板视图
- 优化计算引擎（Agent）的创建和支付流程
- 新增 MongoDB 数据源的错误码实现
- 优化运行监控页面左侧的增量延迟指标，以任务的增量延迟告警阈值作为 Y 轴数据来源
- 新用户引导流程优化，增加离线部署引导
- 优化样本数据展现

#### 问题修复

- 修复引擎规格中的任务数量限制
- 修复使用自定义 SQL 时，MongoDB 作为目标库错误提示不支持的问题
- 修复任务开启自动周期调度后，如果自动重置失败，在下个运行周期时不会再次尝试重置，任务也不会再被调度运行的问题

### 20230728

#### 新增功能

- 页面顶部新增专业版订阅入口，专业版处理性能更高，可基于任务数自由购买规格
- 当任务配置为全量+增量时，支持开启[定期调度任务功能](../user-guide/data-pipeline/copy-data/create-task.md#task-attr)，到达该时间点后任务会自动停止、重置并重新运行
- 对于[增删字段节点](../user-guide/data-pipeline/data-development/process-node.md#add-and-del-cols)，支持字段顺序调整功能
- 任务设置新增[动态调整内存功能](../user-guide/data-pipeline/copy-data/create-task.md#task-attr)（默认开启），全量同步阶段，识别内存占用量并自动调整内存队列，可有效避免内存资源短缺场景下的内存溢出

#### 问题修复

- 修复引擎规格中的任务数量限制

### 20230630

#### 新增功能

- 对于[全托管实例](../billing/purchase#hosted-mode)，增加自身出口 IP 地址的显示，便于数据源添加白名单
- 对于[全托管实例](../billing/purchase#hosted-mode)，增加存储的到期时间，所属的云厂商和地区等信息

#### 功能优化

- 优化 Agent 实例的订购、续费和退订交互流程
- 优化任务配置的边界检查，当数据源不支持增量，如果任务选择了全量+增量（日志解析方式），保存任务配置时会提示任务不支持实时增量

#### 问题修复

- 修复预检查阶段，未正常判断 Dummy 数据源增量支持度的问题

### 20230504

#### 新增功能

- 支持购买[全托管模式](../billing/purchase)的 Agent 实例，由 TapData Cloud 提供 Agent 运行所需的计算/存储资源并自动部署，同时提供统一的运行维护和资源监控以提升运行可靠性，可实现一键交付使用，免去部署和运维精力，专注业务本身。

### 20230421

#### 新增功能

- 新增[数据面板](../user-guide/real-time-data-hub)，支持数据集成模式和数据服务平台模式，可满足不同的数据治理需求。
- 支持[计费功能](../billing/billing-overview)，可选购半托管实例，按照订阅 Agent 实例的规格和数量收费，满足业务对性能的需求。

#### 功能优化

- Agent 体验优化。

#### 问题修复

- 修复了一些已知问题

### 20230302

#### 新增功能

- 新增阿里云市场接入，可通过[阿里云市场](https://market.aliyun.com/products/56024006/cmgj00061912.html)采购/试用 TapData Cloud。

#### 问题修复

- 修复一些已知问题

### 20230217

#### 新增功能

- 新增告警功能，可以针对任务设置告警策略并进行告警
- 新增自定义节点（Beta）功能，用户可以新增自定义节点，并在开发任务中使用

#### 功能优化

- 指定 Agent 功能优化，可直接显示 Agent 的名字

#### 问题修复

- 修复了老版本 Agent 与新版本数据源插件不匹配，导致的数据源不可用问题
- 修复了 Oracle 到 MySQL 增量同步慢最后一次 Commit 需要等很长一段时间才能同步的问题
- 修复了 Oracle 到 MySQL 的同步，Fetch size 修改不成功的问题
- 修复了 MongoDB 间数据同步时，增量期间报错 “resume point may no longer be in the oplog” 导致增量停止的问题
- 修复了其它一些已知问题

### 20230203

#### 新增功能

- 新增微信通知，您可以通过微信收取通知消息

#### 功能优化

- Agent 升级功能优化，升级时无需手动停止任务
- 产品引导页优化，新增业务场景案例

#### 问题修复

- 修复了引擎升级后，任务历史错误邮件批量发送到用户的问题

### 20230113

#### 功能优化

- 增强数据源密码加密方式

#### 问题修复

- 修复了定期调度任务功能无法正常工作的问题
- 修复了运行监控页面，运行记录列表翻页无效的问题
- 修复了其它的一些已知问题

</TabItem>

<TabItem value="2022 年">
    <h3>20221230</h3>
<h4>功能优化</h4>
<ul>
    <li>连接测试的内容完善和优化，可对数据源的权限执行更细致的检测</li>
    <li>本地日志上传功能优化</li>
    <li>新增引导，当引擎服务离线后，引导用户手动进行 Agent 重启。</li>
    <li>新增引擎状态检测和守护，可以自动恢复意外终止的 Java Engine。</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了 Agent 离线后，任务无法正常删除的问题</li>
    <li>修复了当引擎不在线的时候，数据源会变 “无效” 的问题</li>
    <li>修复了其它的一些已知问题</li>
</ul>
<h3>20221216</h3>
<h4>新增功能</h4>
<ul>
    <li>用户可以根据需要调整目标节点建表时字段的类型、长度和精度</li>
    <li>全量任务支持配置调度策略，可实现全量任务的周期性执行</li>
    <li>在创建数据源时，支持设置黑名单以过滤不需要的表</li>
    <li>新增 Beta 数据源 BigQuery 支持作为目标进行数据写入</li>
    <li>MySQL 作为源时支持指定增量同步的时间点</li>
    <li>新增本地 Agent 的日志上传/下载能力</li>
</ul>
<h4>功能优化</h4>
<ul>
    <li>Agent 部署引导流程优化，新增体验示例，用户无需安装 Agent 即可体验产品能力</li>
    <li>任务列表展示优化，新增展示任务的增量时间点，并支持排序</li>
    <li>分类功能用户体验优化，用户选择分类后，TapData Cloud 会记住用户的分类选择</li>
    <li>可观测日志展示方式优化，支持折叠和展开时自动格式化</li>
    <li>源节点增量时间点推进逻辑优化，任务使用的表的增量时间点，随所在库的增量时间点持续推进</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了 MySQL 作为源，增量同步时报模型不存在导致解析失败的问题</li>
    <li>修复了 RDS MySQL 作为源时，增量数据不同步的问题</li>
    <li>修复了 MongoDB 分片集作为目标时，出现“Bulk write operation error, not find host matching read preference”报错，导致无法正常写入的问题</li>
    <li>修复了 MySQL 的 Gtid 模式下，存在非监听表变更时不推进 offset 的问题</li>
    <li>修复了其他的一些已知问题</li>
</ul>
<h3>20220512</h3>
<h4>更新内容</h4>
<ul>
    <li>任务运行出错时增加任务错误信息查看入口，方便用户快速查看错误信息</li>
    <li>新增阿里云PolarDB PostgreSQL作为源和目标</li>
    <li>新增支持Amazon RDS for MySQL作为源和目标</li>
    <li>Agent部署配置优化，开放JVM参数设置，用户可以根据需要进行调整</li>
</ul>
<h3>20220422</h3>
<h4>更新内容</h4>
<ul>
    <li>新增支持阿里云PolarDB MySQL作为源和目标</li>
    <li>新增支持轻流作为目标</li>
    <li>对于已经明确不支持同步的字段类型，在字段映射时默认标记为不支持</li>
</ul>
<h3>20220408</h3>
<h4>更新内容</h4>
<ul>
    <li>新增支持数据源Apache Doris作为目标</li>
    <li>新增任务日志导出功能</li>
    <li>修复了其它一些已知的问题</li>
</ul>
<h3>20220330</h3>
<h4>更新内容</h4>
<ul>
    <li>短信通知策略优化，短信通知默认关闭，用户可以根据需要自行打开</li>
    <li>新增支持vika作为目标</li>
    <li>字段映射新增类型批量修改能力，修改类型时可选择应用于当前任务全部表</li>
    <li>支持微信扫码注册和登录</li>
    <li>创建连接时支持快速搜索连接类型</li>
</ul>
<h3>20220311</h3>
<h4>更新内容</h4>
<ul>
    <li>新增TencentDB for MySQL支持作为源和目标</li>
    <li>新增TencentDB for MariaDB支持作为源和目标</li>
    <li>新增TencentDB for PG支持作为源和目标</li>
    <li>新增TencentDB for SQLServer支持作为源和目标</li>
    <li>新增TencentDB MongoDB支持作为源和目标</li>
    <li>在字段映射过程中支持修改单个表名</li>
    <li>全量任务可以指定周期执行和增量任务可以设置计划运行时间</li>
    <li>数据校验支持对校验不一致的表发起重新校验</li>
</ul>
<h3>20220228</h3>
<h4>新增功能</h4>
<ul>
    <li>支持Aliyun MariaDB作为源和目标</li>
    <li>支持Aliyun MongoDB作为源和目标</li>
    <li>支持Aliyun RDS for SQLServer作为源和目标</li>
    <li>支持Aliyun RDS for PG作为源和目标</li>
    <li>支持Aliyun RDS for MySQL作为源和目标</li>
    <li>新增用户中心功能</li>
    <li>优化windows 版本打包和安装流程</li>
    <li>在用户工作台增加任务每日数据量的趋势图和累计数据量图</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了MySQL数据库使用默认时区时，运行任务会报时区无法识别的错误问题</li>
    <li>修复了加载表完成后提示表不存在的问题</li>
    <li>修复了数据校验列表上的状态显示error，实际详情显示通过的问题</li>
    <li>修复了oracle全量同步完成后，进入增量任务出错并停止的问题</li>
    <li>修复了全量同步阶段checkpoint机制未生效，触发了全量重跑的问题</li>
</ul>
<h3>20220212</h3>
<h4>新增功能</h4>
<ul>
    <li>增量任务可以设置增量采集时间点</li>
    <li>数据连接新增MariaDB支持</li>
    <li>优化编辑已运行任务的弹窗提示</li>
</ul>
</TabItem>

<TabItem value="2021 年">
    <h3>20211221</h3>

<h4>新增功能</h4>
<ul>
    <li>新增 TiDB 数据源支持</li>
    <li>新增 Dummy 数据源支持</li>
    <li>新增任务日志过滤筛选</li>
    <li>新增批量修改表名、字段名大小写</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了sqlserver同步100个表，任务出现死锁的情况</li>
    <li>修复了在目标表新增一个字段，且设置了默认值，但数据插入时，会设置为null的情况</li>
    <li>修复了重置任务后报启动失败需进行字段映射的情况</li>
    <li>修复了MySQL--dameng任务运行失败的情况</li>
</ul>
<h4>功能优化</h4>
<ul>
    <li>创建连接时可选择连接类型：源或目标</li>
    <li>对任务详情页进行了优化</li>
    <li>Oracle数据源连接测试加载模型失败提示</li>
</ul>
<h3>20211203</h3>
<h4>新增功能</h4>
<ul>
    <li>新增 clickhouse 数据源支持</li>
    <li>新增 ADB MySQL 数据源支持</li>
    <li>新增 ADB PostgreSQL 数据源支持</li>
    <li>新增 KunDB 数据源支持</li>
    <li>新增 Hazelcast Cloud 数据源支持</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了 mysql-mysql因为连接串太长导致数据同步失败</li>
    <li>修复了 oracle-oracle推演后的建表语句不对，自动建表失败</li>
    <li>修复了 SQL Server配置时如果密码和用户名有特殊字符“{}[”会报错</li>
    <li>修复了 mysql--Greenplum任务，源表字段有NULL值，任务运行失败</li>
    <li>修复了 MQ作为目标时，选择表后点击下一步提示没有选择表，无法继续创建任务</li>
</ul>
<h4>功能优化</h4>
<ul>
    <li>Windows下Agent部署方式优化，可支持双击启动</li>
    <li>优化Agent包，打包时去掉暂时不需要的数据库驱动jar包</li>
    <li>创建任务时，数据源类型选择优化 ， 仅展示用户已创建的数据类型</li>
</ul>
<h3>20211018</h3>
<h4>新增功能</h4>
<ul>
    <li>新增通知配置功能，支持用户自己关闭接收短信和邮件通知</li>
    <li>新增greenplum数据源支持</li>
    <li>新增MQ数据源支持</li>
    <li>创建连接时，增加markdown指引</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了字段映射：主键被改名后，建表成功，数据同步失败的问题</li>
    <li>修复了创建mongo连接时，开启ssl，首次保存为“失效”的问题</li>
    <li>修复了非副本集mongo同步全量任务error的问题</li>
    <li>修复了mysql--mssql：无主键同步任务，增量update不能同步的问题</li>
    <li>修复了新手指引同步任务运行失败的问题</li>
</ul>
<h4>功能优化</h4>
<ul>
    <li>工作台导航栏优化，新增问答支持和提交反馈入口</li>
    <li>Agent下载与安装页面优化，新增Agent文档与社群入口</li>
    <li>登录页面样式优化</li>
    <li>官网内容优化</li>
    <li>连接列表展示优化，新增schema加载状态列展示</li>
    <li>优化Agent列表版本显示，待部署Agent不再显示版本，默认部署最新版本</li>
    <li>优化了当任务表数量很多，数据校验自动添加表时的页面卡顿的问题</li>
    <li>前端UI优化重构</li>
</ul>
<h3>20210830</h3>
<h4>新增功能</h4>
<ul>
    <li>新增测试Agent释放和通知策略</li>
    <li>在任务配置阶段，增加加载schema设置</li>
    <li>新增支持设置增量并发写入</li>
    <li>新增数据校验和二次校验功能</li>
    <li>新增对阿里云数仓AnalyticDB mysql支持</li>
    <li>新增迁移过程中表字段类型映射功能</li>
    <li>新增支持standalone模式mongodb的全量同步</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了任务同步数据统计不正确，总插入大于总输出的问题</li>
    <li>修复了自动升级的下载进度要刷新页面才显示的问题</li>
    <li>修复了创建连接时，表单未加载完成时先出现了测试连接按钮，点击测试连接会报错的问题</li>
    <li>修复了数据校验，连接搜索页面出错，搜索无效的问题</li>
    <li>修复了全量任务，增量并发数输入框不消失的问题</li>
    <li>修复了通知全部已读后，系统通知铃铛上显示的1不消失的问题</li>
    <li>修复了kafka同步到mysql/dameng时，因为时间类型格式转换错误导致任务运行失败的问题</li>
    <li>修复了用户点击退出登录无法退出登录的问题</li>
    <li>修复了其它一些已知的问题</li>
</ul>
<h4>功能优化</h4>
<ul>
    <li>Kafka作为目标时任务创建过程优化，暂时禁用删除重写模式</li>
    <li>Agent自动升级过程优化，自动升级时可以在Agent列表显示升级包的下载进度</li>
    <li>优化了从mysql同步到mongodb时，支持将json格式的内容转换为mongodb文档</li>
    <li>优化了从创建Agent到部署Agent的流程，显式引导Agent部署</li>
    <li>优化了Agent的docker部署方式</li>
    <li>优化Agent部署，workDIR 和应用在同一目录下</li>
    <li>优化了测试任务不应调度到用户的自建实例上，自建任务不应调度到测试实例上</li>
    <li>任务状态优化，全量同步时，任务完成状态时，前端识别为已完成</li>
    <li>token失效优化</li>
    <li>性能优化，通过新手引导启动测试Agent时特别慢，需要等待差不多4分钟左右才可以变为已启动状态</li>
</ul>
<h3>20210731</h3>
<h4>新增功能</h4>
<ul>
    <li>新增支持Kafka作为源和目标</li>
    <li>新增支持dameng作为目标</li>
    <li>新增新手引导过程，提供测试Agent和测试数据源给用户快速创建迁移任务验证产品能力</li>
    <li>新增系统通知功能，Agent状态异常和任务异常时会有通知短信和邮件</li>
    <li>新增帮助入口，用户遇到使用问题可以快速通过电话和微信获取帮助</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了点击停止Agent，提示停止成功，前端一直显示停止中的问题</li>
    <li>修复了es做目标时，不支持mongo的_id字段，同步失败的问题</li>
    <li>修复了pg-mongo任务，清理模式运行，会将目标的分片表的片键删除的问题</li>
    <li>修复了自动升级成功后，版本还没有更新上来又出现升级的icon的问题</li>
    <li>修复了mongo同构任务（迁移任务），remove事件不能同步的问题</li>
    <li>修复了直接通过执行./tapdata stop命令停止Agent成功后，页面状态一直显示运行中的问题</li>
    <li>修复了pg-mysql无法同步更新、删出事件，可以同步插入事件的问题</li>
    <li>修复了其它一些已知的问题</li>
</ul>
<h4>功能优化</h4>
<ul>
    <li>数据连接配置增加连接参数等关键配置信息</li>
    <li>新增连接时，mongo类型增加标准配置方式</li>
    <li>优化了执行“停止任务”，一直处于“停止中”，也没有超时提示的问题</li>
    <li>测试连接时，会先检测Agent的状态，如果没有可用Agent时会直接提示用户</li>
    <li>优化安装部署和升级时的下载进度显示一直换行的问题</li>
    <li>升级检测优化，对于Agent不支持自动升级的版本，不显示自动升级按钮</li>
    <li>优化了一些已知的影响用户体验的问题</li>
</ul>
<h3>20210723</h3>
<h4>新增功能</h4>
<ul>
    <li>新增全量同步任务进度展示功能</li>
    <li>新增Agent自动升级功能</li>
    <li>新增支持用户创建多个Agent</li>
    <li>新增Agent停止和删除操作</li>
    <li>新增了Agent详情页面，可以查看Agent的详细信息</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了点击测试连接时会出现多次提示的问题</li>
    <li>修复了es做目标时，不支持mongo的_id字段，同步失败的问题</li>
    <li>修复了其它一些已知的问题</li>
</ul>
<h4>功能优化</h4>
<ul>
    <li>Agent部署下载页面优化</li>
    <li>优化了当连接有任务在使用时无法删除成功但没有任何提示的问题</li>
    <li>优化了Agent下载逻辑，用户通过Agent的部署页面可以下载到最新版本的Agent</li>
    <li>优化了websocket连接不稳定的问题</li>
    <li>优化了当TM宕机或者Agent无法访问TM时，Agent可以继续执行任务</li>
    <li>增强了系统稳定性，解决访问系统时偶现访问出错的问题</li>
    <li>优化了其它一些影响使用体验的问题</li>
</ul>
<h3>20210703</h3>
<h4>新增功能</h4>
<ul>
    <li>新增Agent手动升级功能</li>
    <li>新增操作日志查看功能</li>
    <li>新增同步过程中表字段过滤及字段改名功能</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了测试连接一直启动连接中的问题</li>
    <li>修复了新增表后，重新加载schema，创建任务映射设置时，选择不到该新增表的问题</li>
    <li>修复了sqlserver2019，创建连接时测试成功，成功后再次测试连接失败的问题</li>
    <li>修复了mysql到pg全量+增量任务报错的问题</li>
    <li>修复了搜索框选择”所有状态“、”所属 Agent“ 选择一个，无法显示所有任务列表的问题</li>
    <li>修复了Agent ws遇到错误后无法通讯的问题</li>
    <li>修复了主键被映射成别的字段后，update、delete操作不能同步的问题</li>
    <li>修复了其它一些已知的问题</li>
</ul>
<h4>功能优化</h4>
<ul>
    <li>新建任务时当任务名称已存在，输入任务名称后会及时进行提示</li>
    <li>新建连接时当连接名称已存在，输入连接名称后会及时进行提示</li>
    <li>新建postgres数据源时，会默认选中第一个日志解码器</li>
    <li>连接管理页面优化，取消多次loading的情况</li>
    <li>创建连接时不再受Agent是否可用的影响，Agent不可用时也可以先创建连接</li>
    <li>优化了连接和任务名称过长时显示不完全的问题</li>
    <li>优化了其它一些影响使用体验的问题</li>
</ul>
<h3>20210623</h3>
<h4>功能优化</h4>
<ul>
    <li>优化了【任务管理】页面加载时会出现多次loading的情况</li>
    <li>优化了工作台的展示方式</li>
</ul>
<h4>问题修复</h4>
<ul>
    <li>修复了在系统使用过程中偶现“系统处理失败:null”的问题</li>
    <li>修复了正常停止Agent后，列表Agent状态还显示为“运行中”的问题</li>
    <li>修复了在系统使用过程中频繁出现“服务器异常”的问题</li>
    <li>修复了有时会出现连接测试无法启动的问题</li>
    <li>修复了Agent的一些已知问题</li>
</ul>
  </TabItem>
</Tabs>