# 更新日志

## V2.15

### 新增功能

- 新增数据源支持：[GitHub](user-guide/connect-database/beta/connect-github.md)、[MongoDB Atlas](user-guide/connect-database/beta/connect-mongodb-atlas.md)、[Salesforce](user-guide/connect-database/beta/connect-salesforce.md)、[Lark-IM](user-guide/connect-database/beta/connect-lark-im.md)
- 权限管理功能新增角色的[增删改能力](user-guide/manage-system/manage-role.md)
- 创建 Custom Connection 时支持[脚本调试能力](user-guide/connect-database/beta/custom-connection.md)
- JS 节点中支持运行 [MongoDB 聚合处理](appendix/enhanced-js.md#aggregate)
- 产品边界规则框架设计与实现，保存任务时自动对任务[执行预检查](user-guide/data-pipeline/pre-check.md)
- SQL 类数据源和 MongoDB 数据源支持[全量自定义查询](user-guide/data-pipeline/data-development/create-task.md#full-sql-query)
- 基于错误码[提示问题解决方案](user-guide/data-pipeline/data-development/monitor-task.md#error-code)
- 连接配置时，新增[心跳表功能](user-guide/connect-database/certified/connect-mysql.md#heart-beat-table)，可用于数据源连接与任务的健康度监测
- Doris 作为目标，支持[数据校验能力](user-guide/data-pipeline/verify-data.md)（Count）
- [集群监控](user-guide/manage-system/manage-cluster.md)页面，可展示当前的引擎对外建立的所有连接数量，并按照 IP:Port 的方式归类
- 新增支持 [Redis](user-guide/connect-database/beta/connect-redis.md) 在数据复制任务里作为目标使用
- 新增数据复制支持调整[关联条件字段](user-guide/data-pipeline/copy-data/create-task.md#target-basic-setting)

### 功能优化

- 解决更新和插入策略和数据源的 capabilities 关联的问题
- 日志展示调整优化
- 任务重试与告警逻辑优化，方法重试和任务重试穿插进行
- 发布的 API 服务，在 API 发布成功且不可用前，禁止调试
- 共享挖掘稳定性优化
- 任务里程碑展示优化
- 可观测日志增加本地轮转清理，上报管理端增加频率控制
- 新的日志规范调整和实现，将原有的四个日志目录合并至 Tapdata 安装目录中的 **logs** 目录中，示例如下：
  ```shell
  [root@centos200 logs]# pwd
  /root/tapdata/logs
  [root@centos200 logs]# ls
  agent.log  tm-centos-test.log  tm-req-centos-test.log  tm-ws-centos-test.log
  ```

### 问题修复

* 修复可观测日志文件错乱的问题



## V2.14

### 新增功能

- 新增任务进度里程碑展示，可展示整体任务进度，更多介绍，见[监控数据复制任务](user-guide/data-pipeline/copy-data/monitor-task.md)
- 新增全量完成耗时、最大/平均 QPS 的展示
- 新增外部缓存统一配置和管理，更多介绍，见[管理外存](user-guide/manage-system/manage-external-storage.md)
- 新增 [TiDB 作为源](user-guide/connect-database/beta/connect-tidb.md)，并支持通过轮询方式进行增量同步
- 支持对 [Dummy 数据源](user-guide/connect-database/beta/connect-dummy.md)快速增加多个字段
- 基于自定义节点实现 [CSV 字段处理器](user-guide/data-pipeline/custom-node#csv-demo)

### 功能优化

- 测试连接逻辑优化，测试连接不再影响连接的修改时间
- 数据源分级调整，将数据源分级调整为 Alpha、Beta 和 GA
- 复制任务以表达式模式选择表时，支持重新加载模型
- 纯增量任务设置增量时间点逻辑优化，去掉数据库时区选项
- 任务告警的默认值设置调整，降低因为默认值太小导致的频繁告警
- 任务进入增量阶段后，如果遇到预期之外的错误，会自动以每小时 3 次的频率重试。
- Oracle 作为源时，新增一个节点设置，可以忽略 clob 类型的数据同步
- 增量时间点设置逻辑优化，禁止设置未来时间点
- 日志展示方式优化，默认直接展示 message 信息，展开可以查看更多内容

### 问题修复

- 修复了相同 process_id 可启动多个引擎的问题
- 修复了任务同步过程中停止任务，任务进度统计不正确的问题




## V2.13

### 新增功能

- 保存或启动数据开发任务时，Tapdata 会对各节点的配置进行预检查并显示检查结果
- 数据开发任务支持以指定字段的排序作为轮询条件，执行增量数据采集。
- 支持在源端设置批量读取条数，支持在目标端设置批量写入条数。
- 配置数据复制任务源节点时，支持基于正则表达式选择要同步的表，此模式下，如果源库新增的表满足表达式，该表也会被自动同步至目标库。
- 表编辑节点功能调整，将设置存为规则，后续动态新增表都将会受表编辑节点的设置影响
- 多用户能力支持

### 功能优化

- 页面相关的时间获取逻辑优化，由前端直接获取服务器时间更改为通过 TM 来获取时间
- 优化 [API 服务设置](user-guide/data-service/create-api-service.md)，支持用户自定义设置 API 服务的访问路径。
- 优化 [API 服务审计功能](user-guide/data-service/audit-api.md)，新增展示访问者的 IP 地址
- 优化产品可用性，将 JS 节点调整为标准 JS 和 增强 JS（Beta）
- 优化模型不一致时的补偿方案
- 优化界面交互，统一数据复制/开发任务的目标写入策略
- 优化共享挖掘功能，支持设置挖掘开始时间和日志保存时长

### 问题修复

* 修改增量时间点设置不生效问题，限制选择未来时间点

## V2.12

### 新增功能

- 新增[数据校验功能](user-guide/data-pipeline/verify-data.md)
- 新增 [Excel 作为源库](user-guide/connect-database/beta/connect-excel.md)
- 新增 Redis 作为目标库
- 支持在 JS 节点里操作源库和目标库
- 新增[追加合并节点](user-guide/data-pipeline/data-development/process-node#union-node)，可将多个相同结构表的数据合并成一张表
- 数据开发任务新增 JS 处理节点试运行能力
- 数据开发任务源节点新增支持数据过滤能力（目前仅支持 AND），支持对全量和增量阶段数据进行过滤

### 功能优化

- 优化关联条件自动设置逻辑，有唯一索引的无主键表默认采用唯一索引进行关联
- 优化调整可观测性的日志埋点
- 任务报错时，支持在日志中显示错误的表名
- 优化集群管理状态展示，新增服务状态标识服务可用性
- 优化数据服务能力，新增API访问错误码分布
- 优化增量采集时刻设置，支持针对每一个源节点设置增量采集开始时间

### 问题修复

- 修复关联条件值发生变更时，数据无法正常同步的问题
- 修复因重复运行任务导致的重复创建索引的问题


## V2.11

### 新增功能

- 用户可以根据需要调整目标节点建表时字段的类型、长度和精度
- 在创建数据源时，支持设置黑名单将不需要的表过滤掉
- 新增Beta数据源BigQuery支持作为目标进行数据写入
- 新增支持CSV文件作为源进行数据同步
- 新增支持XML文件作为源进行数据同步
- 新增支持JSON文件作为源进行数据同步
- MySQL作为源时支持指定增量时间点进行同步

### 功能优化

- 任务列表展示优化，新增展示任务的增量时间点，并支持排序
- 任务创建逻辑优化，Agent不可用时，无法创建新的开发任务
- 用户体验优化，用户选择分类后，会记住用户的分类选择
- 可观测日志展示方式优化，支持折叠和展开时自动格式化
- 源节点增量时间点推进逻辑优化，任务使用的表的增量时间点，应随着所在库的增量时间点进行持续推进
- 版本升级优化，支持不停服平滑升级，不会中断正在运行的任务

### 问题修复

- 修复了MySQL作为源，增量同步时报模型不存在导致解析失败的问题
- 修复了RDS MySQL作为源时，增量数据不同步的问题
- 修复了MongoDB分片集作为目标时，出现：Bulk write operation error, not find host matching read preference 报错导致无法正常写入的问题
- 修复了MySQL的gtid模式下，存在非监听表变更时不推进offset的问题
- 修复了其它的一些已知问题

## V2.10

### 新增功能

- 新增支持Custom Connection作为源和目标
- 在复制和开发可观测页面增加关联任务查看（目前仅能查看挖掘任务）
- 新增TiDB作为目标，并支持在TIDB上支持直接发布API
- 新增任务重置日志，重置超时可以基于日志查看超时原因。
- 新增任务告警功能，支持任务异常时进行通知

### 功能优化

- 数据源连接断开时支持自动重试
- ClickHouse作为目标时支持批量写入
- 可观测指标计算逻辑和展示方式优化，指标准确性提升
- 纯增量任务的增量时间点设置优化，无需指定计划开始时间也可以设置增量时间点

### 问题修复

- 已修复MySQL作为源的增量同步，时间类型字段同步到目标会多8个小时的问题
- 已修复Oracle作为源时，DDL同步到目标的字段长度不对的问题



## V2.9

### 已知问题

- 无主键的表在同步过程中会以全部字段作为主键在目标创建主键索引，可能会导致目标索引长度超过限制
- DDL同步功能目前仅支持MySQL，Oracle，DB2和PG，其中PG仅支持DDL应用不支持DDL输出。
- 数据校验功能，目前仅支持1:1复制，暂不支持添加处理节点，不支持动态新增表和DDL

### 新增功能

- 新增数据服务-服务管理功能
- 新增支持DM数据源，支持作为源和目标，支持全量和增量
- 新增数据发现功能，支持默认数据目录分类
- 新增支持mongo作为源和目标时，连接断开后的重试功能
- 新增支持Hive数据源作为目标
- 新增支持Kingbase数据源，支持作为源和目标，支持全量和增量
- 新增数据开发可观测能力，支持在运行监控页面查看任务运行关键指标和运行日志

### 功能优化

- 推演逻辑优化，推演完成后任务才可以进入运行中
- JS模型推演，改为异步推演方式

### 问题修复

- 修复了JS 推演结果丢字段的问题
- 修复了TM出现NPE的问题
- 修复了创建共享缓存后，缓存任务运行报错的问题
- 修复了创建共享挖掘任务后，挖掘任务运行报错的问题
- 修复了其他一些已知的缺陷



## V2.8

### 新增功能

* **复制任务校验**：用户可在创建复制任务时开启数据校验功能，系统会自动对原表和目标表的数据进行比对并反馈异常数据，任务正常运行后点击右上角校验按钮打开校验信息 。

  ![](images/release_notes_1.png)

* 动态新增表：用户可以在源节点的配置界面开启动态新增表功能，开启后系统会将源端新增加的表直接写到目标端

* 新数据源DB2：新增了DB2作为数据源，用户可以将其作为目标。

* 数据源MariaDB：新增了MariaDB作为数据源，用户可以将其作为目标

* 数据源RocketMQ：新增了RocketMQ作为数据源，用户可以将其作为目标 

* 新数据源Redis：新增了Redis作为数据源，用户可以将其作为目标 

### 功能优化

- 开发任务去掉子任务优化 
- 逻辑表与物理表拆分优化 
- 目标节点表映射关系优化 
- 目标节点默认值展示优化 
- Oracle裸日志功能优化 



### 问题修复

- 解决了共享挖掘任务报错的问题 
- 解决了主从合并节点无法选择关联条件，目标表字段为空的问题 
- 解决了oracle 测试连接，修改参数不生效的问题 
- 解决了MySQL到MySQL复制全量+增量，任务报错的问题 
- 解决了字段编辑节点中屏蔽的字段还是同步到了目标的问题 
- 解决了复制任务pg为源的增量时间点的时间显示有误的问题 
- 解决了RabbitMQ，数据源加载schema报错的问题 
- 解决了oceanbase作为目标update事件报错的问题



## V2.7

### 新增功能

* 表编辑节点：用户可在创建复制任务时可以添加表编辑节点对表名进行修改 
* 新数据源 SQLServer：新增了 SQLServer作为数据源，用户可以将其作为源或者目标
* 新数据源 Elasticsearch：新增了ES作为数据源，用户可以将其作为目标 
* 新数据源 OceanBase：新增了OceanBase作为数据源，用户可以将其作为目标

### 功能优化

- 共享缓存交互逻辑及配置优化 
- 连接信息说明内容优化 
- 创建任务字段类型选择优化 

### 问题修复

- 解决了Kafka数据源schema加载完成，数据模型与表不一致的问题 
- 解决了创建共享缓存任务报错的问题 
- 解决了oracle连接测试失败的问题 
- 解决了创建MySQL时连接会报错的问题 
- 解决了选择主从合并节点，属性设置中点击从表名，页面报错的问题 
- 解决了mysql-oracle全量+增量任务，启动后任务报错的问题