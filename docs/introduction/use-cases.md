# 应用场景
import Content from '../reuse-content/_all-features.md';

<Content />

TapData 是新一代的实时数据平台，通过把企业核心数据实时集中到中央化数据平台的方式并通过 API 或者反向同步方式，为下游的交互式应用、微服务或交互式分析提供实时数据。



## 构建实时数据管道

传统的主数据管理采用T+1的方式从业务系统获取源数据，加工处理后形成企业的标准数据， 并通过导出方式输送到业务系统使用。这种方案的局限性在于数据更新较为滞后，而采用 CDC + Kafka + Flink 构建实时数据管道时，遇到 CDC 数据采集错误、Kafka 阻塞时，链路排查困难。

TapData 提供一站式实时数据同步体验，仅需简单几步即可构建完整的数据采集与流转的管道，优势如下：

* 支持丰富的[数据源](../prerequisites/supported-databases.md)，可实现同/异构数据源间的数据同步。
* 支持基于事件触发的数据处理逻辑，多种数据检查方式，保障高可靠与低延迟。
* 支持通过强大的 UDF 功能实现去重、规则判断等主数据治理功能。
* 支持 [API 服务](../user-guide/data-service/README.md)低代码发布，可实现端到端的数据消费。



## 提取/转换/加载数据（ETL）

传统的方式是通过 Kettle、Informatica、Python 等工具处理并搬运至新业务系统数据库，此类 ETL 的方案通常链路繁杂、无法复用，且可能对源端性能影响较大。

TapData 的实时数据服务可以通过将数据做最后一次 ETL，同步到基于 MongoDB 的分布式数据平台，结合无代码 API，可以为众多下游业务直接在数据平台提供快速的数据 API 支撑，优势如下：

* 基于拖拉拽的新一代数据开发更加简便。
* 分布式部署能力可以提供更高的处理性能。
* 基于 JS 或者 Python 的 UDF 功能可以无限扩展处理能力。
* 支持通过自定义算子快速扩展平台的数据处理及加工能力。



## 不停机迁移数据库

为保障数据的一致性，传统迁移方式要求在数据迁移期间，停止向源数据库写入数据，即需要停机迁移。根据数据量和网络的情况，迁移所耗费的时间可能会持续数小时甚至数天，对业务影响较大。

TapData Cloud 为您提供不停机迁移的解决方案，只有当业务从源实例切换到目标实例期间会影响业务，其他时间业务均能正常提供服务，将停机时间降低到分钟级别。整个迁移过程包含全量数据同步及增量数据同步迁移两个阶段。当进入增量数据同步阶段时，源实例的数据将实时同步至目标实例。您可以在目标数据库进行业务验证，当验证通过后，即可将业务切换到目标数据库，从而实现平滑迁移。



## 数据库上云/跨云同步

从线下到云上、从云上到线下、跨云平台场景下，TapData 可提供数据的无缝迁移和同步。



## 提升查询性能

对于读多写少的场景，单个数据库可能无法承担全部的读压力，此时可将数据同步至另一个数据库中，将读请求分流至这些只读数据库中，横向扩展整体的读性能，分担主数据库的压力。

不仅如此，您还可以选择将数据同步到 Redis、MongoDB、ElasticSearch 等新一代 NoSQL 数据库，为您的系统提供高并发低延迟查询能力。



## 加速数据全文搜索

传统的关系型数据库通过索引方式实现数据检索的加速，却无法支持用户环境下对于数据全文检索的需求。TapData Cloud 可以实现数据从关系型数据库到 ElasticSearch 的数据同步，帮助用户轻松实现数据的全文检索。


## 无需开发的缓存更新方式

为提高业务访问速度，提升业务读并发，通常的做法是在业务架构中引入缓存层，让业务所有读请求全部路由到缓存层，通过缓存的内存读取机制来提升业务读取性能。由于缓存中的数据不能持久化 ，一旦缓存异常退出，那么内存中的数据将会丢失。TapData Cloud 提供的数据同步功能，可以帮助您实现从业务数据库到缓存数据库的实时同步，实现轻量级的缓存更新策略，让应用架构更加简单安全可靠。



## 读写分离，加速业务访问速度

对于跨区域/跨境业务，如果按照传统架构只在单个地区部署业务，那么跨境访问的用户访问服务时，访问延迟非常大，用户体验较差。通过业务部署架构和访问逻辑调整，将所有地区用户的写请求全部路由回主业务中心，通过 TapData Cloud 将主业务中心的数据实时同步至次业务中心，各个地区的用户的读请求，则路由至就近的次业务中心，从而避免远距离访问，加速了业务访问速度。

## 横向扩展读能力

对于有大量读请求的应用场景，单个数据库实例可能无法承担全部的读取压力。您可以借助 DFS 的实时同步功能构建只读实例，将读请求分流至这些只读实例中，实现读能力的弹性扩展，分担主数据库实例的压力。



## 数据异地灾备

出于业务可用性的考量，为了避免出现业务单点的可能性，越来越多的企业将业务部署在不同区域/公有云上。为避免可用区级别的故障导致服务不可用，您可以构建异地灾备中心以提高服务可用性。灾备中心和业务中心的数据通过DFS实现实时同步，用以保障数据一致性。当业务中心故障时，您可以直接将业务流量切换至灾备中心，快速恢复服务。

## 异地多活

随着业务的快速发展和用户数量的增长，如果业务部署在单个地域中，可能会面临如下问题：

- 用户在地理位置上分布较广，地理位置较远的用户访问延迟较高，影响用户体验。
- 单个地域底层基础设施的能力限制了业务扩展，例如供电能力，网络带宽建设能力等。

为解决上述问题，您可以通过 TapData Cloud 将在同城/异地构建的多个业务单元间实现数据的实时同步，保障全局数据的一致性。当任何一个单元出现故障时，只需将流量自动切换至其他可用单元即可，有效地保障了服务的高可用性。



## 构建物化视图（宽表）

从大数据分析到数仓建设到数据看板，数据工程人员通常需要大量使用批处理任务来展现和分析的宽表或者视图，不仅耗费大量的资源，而且数据更新滞后。TapData 支持增量宽表的构建能力，以最小化的成本提供最新的数据。



## 实时指标计算

使用 TapData 的实时聚合计算能力，对来自日志、点击流或者数据库事件进行流式的统计计算，并得出不同的运营指标，如登录数、转化漏斗等。



## 金融交易系统中的余额更新

使用 TapData 实现交易完成后的账户余额实时更新，使用户在操作后立即看到最新的账户状态，满足高一致性需求。

## 库存管理系统中的实时库存

电商平台使用 TapData 进行跨平台库存更新管理，确保每次销售或退货后系统中展示的库存信息保持最新，避免超卖情况。

## 实时监控和告警系统
在 IT 和生产监控系统中，TapData 及时同步监控指标数据，确保系统能够基于最新数据做出告警判断，便于快速响应异常情况。

## CRM 系统中的客户实时状态

使用 TapData 实时更新 CRM 中的客户互动记录和订单状态，业务人员可以根据最新客户信息快速决策和响应。

## 推荐系统中的用户行为更新
电商和内容平台的推荐系统利用 TapData 处理用户的实时行为数据，动态生成个性化推荐内容，确保推荐结果始终反映用户最新的兴趣和偏好。

