# 部署 TapData

TapData 提供多种部署选项，满足从快速验证到高安全性本地部署的多样化需求。以下以 **TapData Cloud**（云版）为例，快速引导您开始使用，同时简要介绍其他部署方式。


## 免部署体验 TapData Cloud

**TapData Cloud** 是 TapData 的全托管版本，无需本地安装，即可快速上手并探索数据同步功能，其主要特点包括：

- **零基础设施投入**：无需本地资源，即可立即启动任务。
- **灵活扩展**：支持[购买更多独立 Agent 实例](../billing/billing-overview.md)，满足高并发场景需求；如需使用现有硬件或应对复杂网络场景，还可[将 Agent 部署至本地](../installment/install-tapdata-agent/agent-on-selfhosted.md)。
- **低运维成本**：由 TapData 提供运行和维护服务，让您专注于数据开发和业务场景。

访问 [TapData Cloud](https://cloud.tapdata.net/console/v3/)，完成注册并登录后，系统将自动分配一个共享的免费 TapData Agent。以下文档可帮助您快速上手：

- **[连接数据源](connect-database.md)**：将主流数据库或其他数据源连接至 TapData 平台。
- **[创建数据复制或转换任务](connect-database.md)**：实现实时数据同步或复杂数据转换。


## 其他部署方式

根据具体业务需求，TapData 还提供以下部署版本：

- **[TapData Enterprise](../installment/install-tapdata-enterprise/README.md)**  
  适用于对数据敏感性和网络隔离有严格要求的场景（如金融机构、政府部门或大型企业），支持在本地数据中心部署，确保数据完全掌控。

- **[TapData Community](../installment/install-tapdata-community.md)**  
  开源社区版本，适合中小型项目或技术团队，提供基础的数据同步和转换功能，可通过 Docker 快速部署，并支持平滑升级到 Enterprise 或 Cloud 版本以获取更多高级功能。