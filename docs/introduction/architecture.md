# 产品架构与工作原理
import Content from '../reuse-content/_all-features.md';

<Content />

作为新一代实时数据服务平台，Tapdata 通过实时的数据采集技术、灵活的数据处理方式、完整的数据治理能力、便捷的数据发布方式，让企业轻松打破数据孤岛的限制，为分析型和交易型业务提供实时、准确的数据，支撑企业实现更敏捷的业务创新。

## Tapdata Enterprise 架构 

![产品架构](https://20778419.s21i.faiusr.com/3/2/ABUIABADGAAgtLr-lgYotInUhwYwgA84uAg.gif)

Tapdata Enterprise 分为四层架构，从左到右分别为：

- **数据采集层**：基于日志解析的能力，通过开放式框架 Plugin Framework，以实时方式采集数据源中的变更数据并标准化，形成标准时间后进入流处理框架。
- **流数据处理层**：通过 Tapdata 自研方案，在进程内即可完成数据计算、建模和转型，快速得出结果，进入存储层。
- **存储层**：在将数据放入存储层时，实际上已经形成了一套逻辑模型，用户只需要专注于业务所需的数据，无需关心存储位置。
- **服务层**：在服务层，有两种主流的数据服务模式 Pull 和 Push。API 支持低代码发布，可按照具体需求发布数据。当所需数据在业务系统中已有存储时，可通过 REVERSE ETL，反向把经过整理、治理的数据推送给用户。

:::tip

如您无需本地部署 Tapdata，您也可以选择使用 Tapdata Cloud。更多介绍，见[版本对比](https://tapdata.net/pricing.html)。

:::

## Tapdata Cloud 架构

Tapdata Cloud 组件包含 Tapdata Cloud manager 和 Tapdata Agent：

* **Tapdata Cloud Manager**（TCM）：Tapdata Cloud 的管理端，负责 Agent 实例的安装，同步任务的配置、分发、任务状态监测。

* **Tapdata Agent**：是 Tapdata Cloud 数据同步服务的执行实例，负责从 TCM 获取任务信息，通过流式技术从源系统获取数据、处理转换数据并发送到目标系统，并在任务执行过程中监测并上报任务状态至 TCM 。

![](../images/architecture.png)



Tapdata Cloud 采用了多种网络安全措施，确保用户数据和信息安全。

* **单向连接**：同步实例节点单向连接管控端运行服务。 Tapdata agent 实例节点对外不主动暴露网络信息，只会连接 TCM 管理端服务，获取任务信息、上报状态信息。
* **HTTPS 协议**：用户部署的Tapdata agent实例节点和 TCM 通信链路采用 HTTPS 协议，防止盗取并篡改信息。
* **可信环境**：自建模式下，所有数据流转均发生在受用户管理的服务器和网络环境，数据不流出泄漏。



:::tip

如您的网络环境不支持访问外网，可选择在本地部署 [Tapdata](https://tapdata.net/tapdata-enterprise.html)，更多介绍，见[版本对比](https://tapdata.net/pricing.html)。

:::
