---
sidebar_position: 1
slug: /
---

# 什么是 Tapdata

[Tapdata](https://tapdata.net) 是一款面向数据服务的平台化产品，提供数据复制、数据转换、数据开发等多种能力，旨在帮助企业打破多个数据孤岛，完成数据快速交付，同时依靠实时数据同步，提高数据传输效率。我们还支持通过低代码的方式创建任务，简单的拖拽节点即可完成创建，有效降低开发难度，缩短项目上线周期。

<iframe      src="https://20778419.s21v.faiusr.com/58/2/ABUIABA6GAAg-NP9pQYokaGd7AE.mp4"   width="100%"   height="500"      frameborder="0"    allowfullscreen="true" > </iframe>


## 为什么选择 Tapdata

相对于传统数据迁移/同步工具，Tapdata可为您提供功能丰富、简单易用、安全可靠的数据流转服务，同时支持即时发布 API，提升数据开发效率。



* **[丰富的数据库支持](introduction/supported-databases.md)**

  支持主流数据库，包括商业数据库、开源数据库、云数据库、SaaS 平台数据源、文件数据源等，并支持自定义数据源。

* **可靠的数据一致性**

  通过多种自研技术，保障目标端数据与源数据的高一致性，支持多种校验方式，保障生产环境的严苛要求。  

* **低延迟的采集性能**

  基于自研的 CDC 日志解析技术，零入侵即可实时采集数据，对源库几乎无影响，每一条新产生并进入到平台的数据，会在秒级范围被响应、计算、处理并写入到目标表里。此外，还支持共享增量数据避免重复读取源库增量日志。

* **[统一的数据服务平台](user-guide/real-time-data-hub/README.md)**

  基于数据分层治理的理念，可将分散在不同业务系统的数据同步至统一的平台缓存层，最大限度地降低数据提取对业务的影响，为后续的数据加工和业务提供基础数据，从而构建一致、实时的数据平台，连通数据孤岛。

* **[无代码的操作页面](user-guide/workshop.md)**

  告别 SQL 与代码，只需简单的鼠标拖拉拽即可快速完成重命名表等转换规则，此外还支持基于 Javascript 的 UDF 功能。

  

## 产品定价

Tapdata 提供 **Cloud** 和 **Enterprise** 两种部署方式，满足您多样化的需求：

| 产品         | 适用场景                                                     | 定价说明                                                     |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Tapdata Cloud | 注册 [Tapdata Cloud](https://cloud.tapdata.net/console/v3/) 账号即可使用，适合需要快速部署、低前期投资场景，帮助您更好地专注于业务发展而非基础设施管理。 | 免费提供 1 个 SMALL 规格的 Agent 实例（半托管模式），您也可以按照业务需求，订阅更高规格或更多数量的 Agent 实例。更多介绍，见[产品计费](billing/billing-overview.md)。 |
| Tapdata Enterprise | 支持部署至本地数据中心，适合对数据敏感性或网络隔离有严格要求的场景，如金融机构、政府部门或希望完全控制数据的大型企业。 | 基于部署的服务器节点数量，按年支付相应的订阅费用。在正式采购前，您可以点击“[申请试用](https://tapdata.net/tapdata-on-prem/demo.html)‍”‍，Tapdata 工程师会联系您并协助您试用。更多介绍，见[产品定价](https://tapdata.net/pricing.html)。 |



## 首次使用

不用担心，Tapdata 提供图形化操作平台，跟随我们的[快速入门](quick-start/README.md)教程，仅需几分钟即可轻松上手，同时，我们还为您准备了丰富的教程帮助您快速实现数据流转需求。

## 推荐阅读

- [产品架构与工作原理](introduction/architecture.md)
- [功能特性](introduction/features.md)
- [应用场景](introduction/use-cases.md)
- [支持的数据库](introduction/supported-databases.md)
- [常见问题](faq/README.md)
