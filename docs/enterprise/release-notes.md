# 更新日志

本文介绍 V3.x 的版本更新日志，早期版本请参见 [V2.x 版本更新日志](https://docs.tapdata.net/2.0/enterprise/release-notes)。

## V3.1

### 新增功能

- 数据面板功能新增支持表级溯源能力，可通过表详情查看数据血缘关系
- [配置数据复制任务](user-guide/data-pipeline/copy-data/create-task#release310-table-model)时，支持在处理节点中查看表模型
- 支持基于 Doris 数据源[发布 API 数据服务](user-guide/data-service/create-api-service.md)
- [集群管理](user-guide/manage-system/manage-cluster.md)页面，支持下载线程资源监控和数据源使用情况数据

### 功能优化

- 共享挖掘任务管理优化，支持[启停单个表的挖掘任务](user-guide/data-pipeline/share-mining#release310-share-mining)
- [[共享缓存](user-guide/data-pipeline/share-cache)、[函数](user-guide/data-pipeline/manage-function)、[API 数据服务](user-guide/data-service/create-api-service)支持导入导出功能
- [数据校验](user-guide/data-pipeline/verify-data)支持配置告警信息的规则和通知方式
- [数据校验](user-guide/data-pipeline/verify-data)自动填充表逻辑优化
- 前端增加[标准 JS](appendix/standard-js) 和[增强 JS](appendix/enhanced-js) 的功能区分说明
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

- [集成 GraphQL 能力](user-guide/data-service/query-via-graphql.md)，丰富 API 查询方式。
- 为 API [增加应用分类能力](user-guide/data-service/create-api-service.md)，便于基于业务分类。
- 新增[时间运算处理节点](user-guide/data-pipeline/data-development/process-node#time-calculation)，可灵活应对源目库时区不一致场景。
- 新增[全量分片能力](best-practice/full-breakpoint-resumption.md)，目前仅支持 MongoDB。

### 功能优化

- [共享缓存功能](user-guide/data-pipeline/share-mining.md)优化，提供可观测页面，便于观察挖掘进度和故障排查。
- [全量自定义查询功能](user-guide/data-pipeline/data-development/create-task#full-sql-query)，放开仅能使用 JS 节点的限制，也支持添加其它处理节点，节点模型直接使用源表的模型。
- 增删字段、类型修改、字段改名等字段[处理节点](user-guide/data-pipeline/data-development/process-node.md)，支持字段搜索功能。
- 连接配置中 Schema 加载频率配置文案调整。
- **表编辑节点**的表名修改逻辑优化，去掉应用按钮，配置直接生效。
- 管理进程（frontend）启动时，与同步治理进程一样，增加了 heapDump、stackTrace 相关参数。
- 增加任务编辑版本，避免多人编辑同一任务时，低版本配置覆盖高版本配置。
- 数据源配置右侧的说明文档， 支持放大图片。
- Oracle 数据源错误码实现。
