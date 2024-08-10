# TapData Enterprise 更新日志

import Content from '../reuse-content/_enterprise-features.md';

<Content />

本文介绍 TapData Enterprise V3.x 的版本更新日志，早期版本请参见 [V2.x 版本更新日志](https://docs.tapdata.net/2.0/release-notes)。

## 3.11

### 新增功能

- 在[服务管理列表页](../user-guide/data-service/create-api-service.md)新增表名和 API 地址展示功能，支持关键字快速检索和筛选
- 在[数据转换任务配置](../user-guide/data-pipeline/data-development/create-task.md)阶段，源节点模型预览区域支持单表模型的重新加载，提高加载效率
- 新增时间探测功能，自动探测引擎部署服务器和数据库服务器的时间差，并在任务监控页面展示

### 功能优化

* 用户定义的字段业务描述可直接展示在表样例数据的列名位置

### 问题修复

- 修复导入 API 后出现 "System error: null" 报错的问题
- 修复 API 已删除但在血缘图中仍显示的问题
- 修复实时数据平台某些表数据量统计为空的问题
- 修复实时数据平台发布 API 时路径未显示 host 的问题
- 修复 MongoDB 数据库 cursor 超时导致任务无法正常全量同步的问题
- 修复源节点数据过滤设置中自定义 SQL 过滤开关无法打开的问题

## 3.10

### 新增功能

- [数据校验](../user-guide/data-pipeline/verify-data.md)功能，支持在校验任务的详情页，下载差异明细数据以供深入分析
- 数据复制任务新增[多表合并](../user-guide/data-pipeline/copy-data/process-node#union-node)节点，可对同一数据库中的多个表执行合并操作（UNION），可用于整合和分析数据等场景
- [Doris](../prerequisites/warehouses-and-lake/doris.md) 数据源支持无证书的 HTTPS 连接方式
- MySQL、Oracle、OpenGauss、SQL Server、PostgreSQL 数据源，支持任务配置时，在节点的高级配置中启用 **Hash 分片**功能，可大幅提升大表的全量数据同步速度
- 新增 [VastBase](../prerequisites/on-prem-databases/vastbase) 数据源，成熟度为 Beta，进一步丰富数据源种类

### 功能优化

- 优化时区类字段的同步逻辑
- 在数据同步/开发任务的任务设置中，在基于标签调度 Agent 的基础上，支持选择调度方式为随机调度或指定优先调度的 Agent。
- 日志连续挖掘设置优化展示逻辑，当数据库的版本不支持此功能时自动隐藏相关按钮

### 问题修复

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



## 3.9.0

### 新增功能

* [数据校验](../user-guide/data-pipeline/verify-data.md)新增差异数据修复能力，提升数据一致性和准确性
* 创建[共享缓存](../user-guide/advanced-settings/share-cache.md)新增使用共享挖掘按钮，简化缓存任务配置，提升缓存共享的效率和灵活性

### 功能优化

* [实时数据中心](../user-guide/real-time-data-hub/README.md)功能优化：
  * 数据加工层支持显示库中所有模型
  * 平台缓存层与平台加工层可选择不同的的连接，设置后不可调整
  * 增加 API 发布入口
  * 优化模型详情的展示
* ElasticSearch 数据源添加字段限制配置参数
* MongoDB 数据源开启 preimage 能力时，优化异常处理逻辑

### 问题修复

- 修复任务事件统计指标上报时偶现丢失部分指标的问题
- 修复共享缓存任务未执行共享挖掘时，如果数据没有变化，在重启或升级引擎时可能因超出日志时间窗口而导致任务错误的问题
- 修复在 MDM_model 下禁用从节点后导致任务启动失败的问题
- 修复实时数据中心的血缘图偶现无法展示的问题
- 修复在写入模式为更新子文档的场景下，源表的 unset 操作可能导致任务报错的问题
- 修复校验任务搜索功能不可用的问题
- 修复 MongoDB 与 MySQL 执行 Join 合并场景下，MongoDB 集合中包含时间类型可能引发报错的问题
- 修复在实时数据中心创建的任务无法添加主从合并节点的问题
- 修复在主从合并场景下，增量更新事件意外执行反查的问题
- 修复主从合并节点修改列时的冲突报错问题

## 3.8.0

### 新增功能

* [TiDB](../prerequisites/on-prem-databases/tidb.md) 数据源能力增强，支持实时增量同步
* [数据校验](../user-guide/data-pipeline/verify-data.md)支持自动差异校验，可根据增量延迟对实时任务进行自动差异校验

### 功能优化

* 优化任务的表模型主键和索引的展示方式
* 优化模型推演逻辑，支持在引擎直接进行模型推演

### 问题修复

* 修复数据源异常处理存在忽略部分异常的问题
* 修复时间字段做关联键的聚合任务，反查不到数据的问题
* 修复挖掘任务延迟时间异常的问题
* 修复 MySQL 作为源时，大表初始化同步会占用大量数据库内存的问题

## 3.7.0

### 新增功能

* 支持为用户[授予数据校验权限](../user-guide/manage-system/manage-role.md)，提升权限管理粒度
* 新增 Mock Source 和 Mock Target 数据源，可用于数据迁移测试场景

### 功能优化

* 优化启动任务时的跳过错误的交互逻辑

### 问题修复

* 修复任务运行模型与配置模型不一致的问题
* 修复过滤源端数据后，任务事件统计不准确的问题
* 修复 Oracle 和 PostgreSQL 同步场景下，时区处理异常的问题
* 修复连接列表加载速度过慢的问题
* 修复心跳任务重置失败时，可能导致相关联任务无法启动的问题

## 3.6.0

### 新增功能

* 支持在[配置数据转换任务](../user-guide/data-pipeline/data-development/create-task#target-node-set)时，为目标表名动态生成日期后缀，适用于每日定期执行批处理的场景
* 支持[通过 Webhook 对接第三方平台](../user-guide/notification.md)，实现告警事件的更多推送渠道
* 支持在[配置数据校验任务](../user-guide/data-pipeline/verify-data.md)时，对 MySQL、Oracle、SQL Server、PostgreSQL 和 GaussDB 数据源间执行 Hash 校验，提升校验效率
* 支持在配置 Doris 数据源时设置分区
* 支持 OceanBase 数据源的 Oracle 模式，数据源名称为 Oceanbase(Oracle)

### 功能优化

* 优化 MongoDB 同步到关系型数据库（如 MySQL）的数据处理逻辑
* 优化 Dummy 数据源，支持快速添加大字段以用于性能测试场景

### 问题修复

* 修复 MariaDB 无法将 `0000-00-00 00:00:00` 格式数据写入目标的问题
* 修复心跳表被误删后心跳任务无法自动恢复的问题
* 修复共享挖掘任务出现错误后，无法序列化的问题

## 3.5.16

### 新增功能

* 支持 MySQL 间、PostgreSQL 间的双向数据同步能力，更好满足多活和容灾场景
* 支持 [MongoDB Relmig](https://www.mongodb.com/docs/relational-migrator/) 1.3.0 以上版本的文件导入能力，进一步完善生态对接能力
* 支持同步 MongoDB 的 [Oplog](https://www.mongodb.com/docs/manual/core/replica-set-oplog/)（操作日志）数据
* 支持在配置数据转换任务时，在源节点的**[高级设置](../user-guide/data-pipeline/data-development/create-task#full-sql-query)**中选择对表的时间字段进行过滤（例如相对日期）
* 支持在[任务列表](../user-guide/data-pipeline/copy-data/manage-task.md)页面，展示任务里程碑信息，帮助用户快速获知任务的关键进度状况

### 功能优化

* 优化 [Unwind 节点](../user-guide/data-pipeline/data-development/process-node#unwind)，支持设置展开模式，如内嵌对象或平铺字段
* 优化全量同步详情页面展示，支持通过表名快速过滤表

### 问题修复

* 修复特定场景下，调整告警设置可能影响任务正常运行的问题
* 修复新增挖掘表时，任务显示挖掘任务异常的问题
* 修复缓存任务被删除后，任务启动后仍从已删除的缓存任务获取数据的问题



## 3.5.15

### 新增功能

* [数据复制任务](../user-guide/data-pipeline/copy-data/create-task.md)支持表级别的断点续传能力，任务重启时可以直接从未完成同步的表继续同步
* 支持通过拖拽快速[设置任务/连接的标签](../user-guide/data-pipeline/copy-data/manage-task.md)
* 支持 MySQL 主从架构，发生主从切换后，相关任务可继续正常同步数据

### 问题修复

* 修复阿里云 PolarDB MySQL 数据源，因不支持特定事件导致任务报错的问题
* 修复全量任务同步完成，统计指标中显示统计进度不正确的问题

## 3.5.14

### 新增功能

* 支持为同步治理服务（Agent）[指定标签](../user-guide/manage-system/manage-cluster.md)，后续可为任务指派包含特定标签的 Agent
* 支持对 [TiDB 数据源](../prerequisites/on-prem-databases/tidb.md)的实时日志解析能力，可满足增量数据同步需求
* 在 Oracle 全量同步至 MySQL 阶段，支持同步未使用函数的唯一索引和普通索引
* 支持在启动任务时，选择跳过上一次运行时出现的错误

### 功能优化

* 优化数据同步任务场景下，源节点中的 [DDL 同步设置](../best-practice/handle-schema-change.md)，选择遇到 DDL 报错时可配置要忽略的 DDL 语句（基于正则表达式）
* 优化数据校验能力，支持对包含处理节点的任务进行校验
* 优化数据校验结果页展示，支持快速过滤一致和不一致的表

### 问题修复

* 修复 MongoDB 作为外存场景下，当存储 Key 为带 `.` 符号的 String，且 Value 是 Map 类型时，发生异常的问题
* 修复对Kafka 数据源执行连接测试时，包含非 JSON 的主题会发生循环异常的问题
* 修复 JS 节点在特定场景下，试运行报错的问题
* 修复使用主从合并节点时，更改关联键值引发数据不正确的问题
* 修复 RocksDB 作为缓存存储，可能引发任务报错的问题

## 3.5.13

### 新增功能

* [配置数据校验任务](../user-guide/data-pipeline/verify-data.md)时，在对 MongoDB 的聚合查询场景下，可基于时间字段执行自定义过滤
* 支持 MySQL/Oracle 同构数据源间同步的 [Hash 校验](../user-guide/data-pipeline/verify-data.md)

### 问题修复

* 修复了开启多线程同步场景下，DDL 操作无法正常同步的问题
* 修复了 JS 节点打印日志时，偶发的文件句柄数未及时释放的问题
* 修复了 MongoDB RM 文件导入异常的问题



## 3.5.12

### 新增功能

* 支持在 License 到期前一周发送邮件提醒（每天一次），可结合[配置 SMTP 邮件服务](../best-practice/alert-via-qqmail.md)来提升运维便利性
* [DDL 同步设置](../best-practice/handle-schema-change)，新增**遇到 DDL 操作时任务报错停止**和**自动忽略 DDL**选项，可适应不同业务场景需求
* 新增[时间字段注入](user-guide/data-pipeline/data-development/process-node#time_injection)节点，可在数据同步过程中为流经的数据增加一个自定义的时间戳字段，从而提供更灵活的方式来获取源库的增量变更
* 支持设置引擎日志的过期时间和日志大小，实现日志的自动清理

### 功能优化

* 优化任务重试逻辑和界面提示信息
* 优化增量采集时刻设置，支持快速选择上一次增量运行时所处的增量时间点
* 优化主从合并节点使用外存的交互处理逻辑

## V3.5.11

### 新增功能

- [共享挖掘](../user-guide/advanced-settings/share-mining.md)功能支持使用 RocksDB 作为本地外存，可实现对增量日志的存储扩展
- [TDengine 连接器](../prerequisites/on-prem-databases/tdengine.md)支持将多个数据库作为增量源

### 功能优化

- [任务监控页面](../user-guide/data-pipeline/copy-data/monitor-task.md)，增加增量阶段的时间过滤选项，便于快速观察增量阶段的 RPS
- 针对可能对数据库造成影响的关键操作（例如过滤源表数据），增加相关提示信息

### 问题修复

* 修复[主从合并节点](../user-guide/data-pipeline/data-development/process-node#pri-sec-merged)，当主表与子表关键条件变化时，最终数据与预期不符合的问题

## V3.5.10

### 新增功能

* MongoDB 间的数据同步场景，新增支持 [Capped 集合](https://www.mongodb.com/docs/manual/core/capped-collections/)
* 数据复制/转换任务支持导入能力，您可以在 [MongoDB Relational Migrator](https://www.mongodb.com/docs/relational-migrator/) 上设计好数据流转流程并将其导出，随后在 TapData 数据管道右上角直接导入，进一步提升数据管道设计便利性

### 问题修复

* 修复 JS 节点模型声明设置在任务编辑页面提示错误的问题
* 修复 Oracle 同步至 MySQL 时，DROP COLUMN 操作未正常同步的问题
* 修复 MySQL 同步至 ClickHouse 时，DDL 报错的问题
* 修复 WebSocket 频繁重连导致任务不稳定的问题
* 修复若干 UI 交互体验问题



## V3.5.9

### 新增功能

* 针对 MongoDB 5.x 及以上版本的数据源，新增支持 [Time Series 集合](https://www.mongodb.com/docs/manual/core/timeseries-collections/)
* 针对 MongoDB 6.x 及以上版本的数据源，新增支持 [preImage](https://www.mongodb.com/docs/manual/changeStreams/#change-streams-with-document-pre--and-post-images)

### 问题修复

* 修复多表数据复制场景下，断点不准确的问题
* 修复已知的 UI 交互体验问题

## V3.5.8

### 新增功能

- 数据源新增 [Azure Cosmos DB](../prerequisites/cloud-databases/azure-cosmos-db.md)，可做为源库同步全量数据，帮助实现云端数据快速流转

### 功能优化

- 优化数据源连接方式，[SQL Server](../prerequisites/on-prem-databases/sqlserver.md) 可支持 SSL 连接，可帮助进一步提升数据安全性
- 优化[数据复制任务](../user-guide/data-pipeline/copy-data/create-task.md)的目标节点字段类型调整方式，在手动输入的基础上，支持直接选择目标数据库常用类型
- 针对任务的源节点设置，支持设置增量阶段每批读取的条数，更好适应增量同步的性能需求

### 问题修复

- 修复增强 JS 节点在特定场景下，模型声明不生效或异常问题
- 修复若干 UI 交互体验问题



## V3.5.7

### 新增功能

- 支持对 [Oracle 数据源](../prerequisites/on-prem-databases/oracle#advanced)加载表注释，可在配置数据源时的高级选项中开启，方便通过注释信息快速识别表的业务含义
- 支持在 [Windows 平台中部署 Tapdata](../quick-start/install/install-tapdata-enterprise/install-on-windows.md)，进一步丰富部署平台支持度
- 任务运行[监控页面](../user-guide/data-pipeline/copy-data/monitor-task.md)中，支持基于事件大小的维度来查看 RPS 信息

### 问题修复

- 修复重置任务后重新运行任务时，增量信息未清理成功的问题
- 修复部分 SaaS 数据源在执行全量数据同步时，显示增量时间点的问题




## V3.5.6

### 功能优化

- 优化[数据源连接](../prerequisites/README.md)方式，MySQL、PostgreSQL、Kafka、TiDB、MariaDB 等数据源支持 SSL 连接，可帮助进一步提升数据安全性
- 优化[数据校验](../user-guide/data-pipeline/verify-data.md)的过滤功能，支持通过 SQL 实现自定义查询和聚合查询过滤
- 优化界面交互逻辑
- 针对非主键的更新条件，创建唯一索引来解决数据重复的问题

### 问题修复

- 修复表名包含 `.` 时可能出现的数据同步失败问题
- 修复任务异常信息未包含表名的问题



## V3.5.5

### 新增功能

- 新增支持 Hive3 作为目标
- MongoDB 作为目标时，新增支持[自动创建分片集合](user-guide/data-pipeline/copy-data/create-task#advanced-settings)
- 新增 [Unwind 处理节点](../user-guide/data-pipeline/data-development/process-node#Unwind)，可帮助您高效地将数组中的每个元素“展开”，将每个元素转换为独立的数据行
- 配置任务时，新增支持禁用节点能力，鼠标悬停至节点上即可选择该功能，可帮助减少数据在处理过程中的流转成本

### 功能优化

- 优化已发布的 [API 权限范围的设置](user-guide/data-service/create-api-service#settings)，无需取消发布即可调整权限
- [配置数据复制任务](../user-guide/data-pipeline/copy-data/create-task.md)时，可通过**可选择的表范围**下拉框快速过滤出有主键或无主键表，其中有主键表包含具有唯一索引的无主键表

### 问题修复

- 修复了 MongoDB 作为目标时，INSERT 操作遇到无分片键发生报错的问题
- 修复了 MongoDB 不支持 REPLACE，即 REPLACE 删掉的字段无法被正常删除的问题





## V3.5.4

### 新增功能

- 新增[构建物化视图](../user-guide/data-pipeline/data-development/create-materialized-view.md)功能，可快速构建实时数据模型
- 新增支持对[共享挖掘](../user-guide/advanced-settings/share-mining.md)任务的源节点进行配置调整，支持设置是否启用**增量多线程写入**和**补充更新数据的完整字段**
- Kafka 数据源新增支持[设置副本数和分区数](../pipeline-tutorial/oracle-to-kafka#advanced_settings)
- MongoDB 间同步时，新增对 `$unset` 操作的支持

### 功能优化

- [数据校验](../user-guide/data-pipeline/verify-data.md)功能字段过滤体验优化
- 支持在数据复制/数据转换配置的页面顶部，通过搜索节点来快速定位目标节点



## V3.5.2

### 新增功能

* 新增 [Python 处理节点](user-guide/data-pipeline/data-development/process-node#python)，支持通过 Python 脚本来自定义数据处理逻辑，相较于 JS 处理节点性能有一定提升
* 新增支持 Redis 间的数据同步能力

### 功能优化

* 优化[数据源错误码](../troubleshooting/error-code.md)，覆盖更多场景并提供解决方案



## V3.5.1

- [创建角色](../user-guide/manage-system/manage-role.md)时，支持对功能和数据权限的精细化权限授予            

### 功能优化

- 对核心数据源（如 PostgreSQL、Redis等），优化创建连接时的页面参数介绍和指引
- 优化将 MongoDB 作为外存时的测试项

### 问题修复

* 修复了运行过的任务无法查看运行监控页面的问题

## V3.4

### 新增功能

* 当任务配置为全量+增量时，支持开启[定期调度任务功能](user-guide/data-pipeline/copy-data/create-task#task-attr)，到达该时间点后任务会自动停止、重置并重新运行
* 对于[增删字段节点](user-guide/data-pipeline/data-development/process-node#add-and-del-cols)，支持字段顺序调整功能
* 任务设置新增[动态调整内存功能](user-guide/data-pipeline/copy-data/create-task#task-attr)（默认开启），全量同步阶段，识别内存占用量并自动调整内存队列，可有效避免内存资源短缺场景下的内存溢出
* 数据面板更名为[实时数据中心](../user-guide/real-time-data-hub/README.md)，同时增加使用和任务创建引导
* 新增目标写入策略，当更新事件不存在时，支持将更新事件写入到本地日志

### 功能优化

- 优化提升数据校验可用性和页面交互
- 新增 MongoDB 数据源的错误码实现
- 优化运行监控页面左侧的增量延迟指标，以任务的增量延迟告警阈值作为 Y 轴数据来源
- 优化样本数据展现

### 问题修复

* 修复引擎规格中的任务数量限制
* 修复使用自定义 SQL 时，MongoDB 作为目标库错误提示不支持的问题
* 修复任务开启自动周期调度后，如果自动重置失败，在下个运行周期时不会再次尝试重置，任务也不会再被调度运行的问题


## V3.3

### 新增功能

- [Kafka 数据源](../prerequisites/mq-and-middleware/kafka.md)支持自定义消息体格式
- 新增 [API 接口文档导出功能](user-guide/data-service/create-api-service#release330-export-api)，帮助团队快速建立并完善 API 使用资料
- 共享挖掘功能支持[配置任务告警](user-guide/advanced-settings/share-mining#release330-alert)，可通过系统通知消息或邮件来发出告警信息，帮助更好地掌握任务的运行状态
- [数据校验功能](../user-guide/data-pipeline/verify-data.md)，支持设置数据过滤，从而实现只对特定条件的数据进行校验，可帮助您减少校验规模，提升效率
- 在数据服务平台模式下，向平台缓存层拖拽数据表生成任务时，支持[设置任务的同步类型为全量或增量](user-guide/real-time-data-hub/daas-mode/create-daas-task/#release330-task)

### 功能优化

- [支持滚动升级](../production-admin/operation.md#release330-upgrade)，相较于停机升级方式，可进一步降低业务影响
- [共享挖掘任务](../user-guide/advanced-settings/share-mining.md)报错后，关联任务增加告警提示
- 在[行过滤器处理节点](../user-guide/data-pipeline/data-development/process-node.md)中，使用 DATE 类型过滤时，增加使用示例
- [时间运算节点](user-guide/data-pipeline/data-development/process-node#date-calculation)，支持展示调整的字段
- 全量完成剩余时间算法优化
- 字段处理节点支持针对配置的一键复制和粘贴

### 问题修复

- 启动TM时如果没配置 java 环境变量，会导致启动不了，此时添加了针对该问题的日志输出
- 修复了 admin 用户，在个人中心修改用户名后，所有菜单都不能查看的问题
- 修复了数据复制/数据转换创建任务时，所有数据源都不支持 DDL 的问题
- 修复了数据复制任务，配置表编辑节点时，添加前后缀输入一个字符加载一次的问题



## V3.2

### 新增功能

- 数据平台模式下，可直接[展示表级溯源的关系](user-guide/real-time-data-hub/daas-mode/daas-mode-dashboard#release320-daas)，帮助您可视化展示数据表产生的链路关系
- 数据平台模式下，支持[删除**平台加工层**的表](user-guide/real-time-data-hub/daas-mode/daas-mode-dashboard#release320-daas)
- 在配置任务的目标节点时，支持[按照系数来调整字段长度](user-guide/data-pipeline/copy-data/create-task#release320-col-length)，避免因字符编码不同等原因引发的数据写入失败问题
- [数据校验](user-guide/data-pipeline/verify-data)功能支持 SelectDB 数据源
- Redis 作为目标节点场景下，存储为 List 或 Hash 格式，且选择为单键方式时，[支持将源表 Schema 写入一个 Hash 键](../pipeline-tutorial/mysql-to-redis#release320-contain-table-head)（默认名称为 `-schema-key-`），其值用来存放源表的表名和列名信息。
- 新增[**类型过滤**](user-guide/data-pipeline/data-development/process-node#release320-type-filter)处理节点，可将快速过滤同类型的列，被过滤的字段将不会传递至下个节点
- [**字段编辑**](user-guide/data-pipeline/copy-data/process-node#column-modification)处理节点，支持蛇形命名和驼峰命名之间的转换
- 数据复制任务、数据转换任务、数据面板、换成创建时支持[显示表的描述信息](user-guide/data-pipeline/copy-data/create-task#310-table-model)，默认来源为表的注释信息

### 功能优化

- 产品菜单调整，数据开发更名为[数据转换](user-guide/data-pipeline/data-development/)，另有部分功能移至[高级设置](user-guide/advanced-settings/)（如共享缓存）中
- 无主键数据表管理交互优化，例如在配置数据复制任务时，[支持筛选无主键表并增加主键表的标识](user-guide/data-pipeline/copy-data/create-task#310-table-model)
- 对于外存配置的 MongoDB 数据源，加入[连接测试能力](user-guide/manage-system/manage-external-storage#320-external-storage)
- 新建的外存，当选择 MongoDB 时支持[使用 SSL 连接](user-guide/manage-system/manage-external-storage#320-external-storage)
- 创建 HttpReceiver 数据源时[支持试运行脚本](../prerequisites/others/http-receiver)，同时增加[访问鉴权功能](../prerequisites/others/http-receiver#320-http-receiver)
- 标准  JS 节点能力调整，增加 [LinkedHashMap 数据结构](../appendix/standard-js#linkedhashmap)和 [context.global 对象](../appendix/standard-js#global)
- [**字段编辑**](user-guide/data-pipeline/copy-data/process-node#column-modification)处理节点，界面交互优化
- 任务启动和重新加载 Schema 的冗余提示优化
- 数据复制任务，支持手动添加新表，新增表的可实现全量+增量数据同步
- 数据校验使用与界面交互优化
- 任务节点配置处理逻辑优化
- 数据面板中的**平台缓存层**和**数据加工层**中，可展示由数据复制/转换任务生成的连接和表信息
- 数据面板中的数据目录模式下，支持对表和字段添加描述信息
- TapData 部署流程和提示调整优化
- TapData 启动器优化，重新启动服务无需重复注册数据源
- 在 Agent 启动和停止节点时，自动停止 PDK 注册
- 数据复制任务与数据转换任务配置交互的整体优化

### 问题修复

- 修复了 2 个 Oracle 数据源指定不同的外存，挖掘合并后导致外存不是用户指定的问题
- 修复了导入任务数据源开启了共享挖掘，外存配置显示为id且不可修改的问题
- 修复了数据源到平台缓存层的任务合并问题



## V3.1

### 新增功能

- [数据面板功能](../user-guide/real-time-data-hub/etl-mode)新增支持表级溯源能力，可通过表详情查看数据血缘关系
- [配置数据复制任务](./user-guide/data-pipeline/copy-data/create-task#310-table-model)时，支持在处理节点中查看表模型
- 支持基于 Doris 数据源[发布 API 数据服务](../user-guide/data-service/create-api-service.md)
- [集群管理](../user-guide/manage-system/manage-cluster.md)页面，支持下载线程资源监控和数据源使用情况数据

### 功能优化

- 共享挖掘任务管理优化，支持[启停单个表的挖掘任务](../user-guide/advanced-settings/share-mining.md#release310-share-mining)
- [共享缓存](../user-guide/advanced-settings/share-cache.md)、[函数](../user-guide/advanced-settings/manage-function.md)、[API 数据服务](user-guide/data-service/create-api-service)支持导入导出功能
- [数据校验](user-guide/data-pipeline/verify-data)支持配置告警信息的规则和通知方式
- [数据校验](user-guide/data-pipeline/verify-data)自动填充表逻辑优化
- 前端增加[标准 JS](../appendix/standard-js) 和[增强 JS](../appendix/enhanced-js) 的功能区分说明
- JS 处理器标准化、JS 用法及试运行重构
- 在所有支持写 JS 脚本的处理节点中，当输入 `record.` 时可自动提示当前模型的字段名
- 重置时清除外存数据导致超时问题优化
- 支持修改主键
- 支持通过脚本统一设置任务增量同步间隔默认时间
- License 优化，通过绑定 IP 地址避免硬件信息变化导致 License 失效
- Excel 数据源使用提示优化，增加提示信息
- 性能优化
  - **JS 节点**处理性能优化
  - **字段处理**节点处理性能优化
  - **主从合并**节点性能优化
  - **字段编辑**节点在多字段场景下的前端展示优化
- 数据类型边界提示及处理逻辑优化
- 连接管理的筛选栏，数据库类型下拉列表支持搜索和清除选中
- 错误码弹窗，错误堆栈增加一键复制的功能

### 问题修复

- 修复针对轮询源的增量，没有增量时间点指标的问题
- 修复模型变化后，会强制删除更新字段的问题
- 修复类型修改、 增删字段、字段改名的节点配置，在加载模型的时候会被重置的问题
- 修复打开全量自定义开关时，目标是 MongoDB 出现报错的问题



## V3.0

### 新增功能

- [集成 GraphQL 能力](../user-guide/data-service/query-via-graphql.md)，丰富 API 查询方式。
- 为 API [增加应用分类能力](../user-guide/data-service/create-api-service.md)，便于基于业务分类。
- 新增[时间运算处理节点](user-guide/data-pipeline/data-development/process-node#time-calculation)，可灵活应对源目库时区不一致场景。
- 新增[全量分片能力](../best-practice/full-breakpoint-resumption.md)，目前仅支持 MongoDB。

### 功能优化

- [共享缓存功能](../user-guide/advanced-settings/share-mining.md)优化，提供可观测页面，便于观察挖掘进度和故障排查。
- [全量自定义查询功能](user-guide/data-pipeline/data-development/create-task#full-sql-query)，放开仅能使用 JS 节点的限制，也支持添加其它处理节点，节点模型直接使用源表的模型。
- 增删字段、类型修改、字段改名等字段[处理节点](../user-guide/data-pipeline/data-development/process-node.md)，支持字段搜索功能。
- 连接配置中 Schema 加载频率配置文案调整。
- **表编辑节点**的表名修改逻辑优化，去掉应用按钮，配置直接生效。
- 管理进程（frontend）启动时，与同步治理进程一样，增加了 heapDump、stackTrace 相关参数。
- 增加任务编辑版本，避免多人编辑同一任务时，低版本配置覆盖高版本配置。
- 数据源配置右侧的说明文档， 支持放大图片。
- Oracle 数据源错误码实现。
