# 步骤一：安装 Agent

Tapdata Agent 是数据同步、数据异构、数据开发场景中的关键程序。由于数据流转通常对时效性有较高的要求，因此，推荐将 Tapdata Agent 部署在数据库所属的本地网络中，从而极大降低数据延迟。

Tapdata Cloud 按照订阅 Agent 实例的**规格**和**数量**收费，您可以免费创建 1 个 SMALL 规格的 Agent 实例，此外，您还可以[购买更多的 Agent 实例](../../billing/billing-overview.md)，来满足业务需求。

:::tip

* Tapdata agent 通过流式技术从源端获取数据、处理转换数据并发送到目标端，数据不会流经 Tapdata Cloud，也不会上传和留存您的数据。
* 为保障最大程度地保障数据流转性能，推荐 Agent 所部署的机器拥有足够的计算、存储和带宽等资源，例如部署 Small 规格的 Agent 实例，其所属机器为 2 核 4 GB 内存，部署 Medium 规格的 Agent 时，其所属机器为 4 核 8 GB 内存，以此类推。

:::

接下来，根据您的平台选择下述教程：

import DocCardList from '@theme/DocCardList';

<DocCardList />

