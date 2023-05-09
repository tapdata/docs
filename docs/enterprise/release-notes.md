# 更新日志

本文介绍 V3.x 的版本更新日志，早期版本请参见 [V2.x 版本更新日志](https://docs.tapdata.net/2.0/enterprise/release-notes)。

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
