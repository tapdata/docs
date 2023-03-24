# 调试服务端网络环境

在部署 Agent 前，您需要参考本文的要求调整相关防火墙保障其通信正常，Agent 工作流程如下所示：

![](../images/architecture.png)



| 要求                               | 说明                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| Agent 可连接至源数据库的服务端口   | 确保 Agent 可从源数据库读取到数据。                          |
| Agent 可连接至目标数据库的服务端口 | 确保 Agent 可向目标库写入数据。                              |
| Agent 可连接至外网                 | 确保 Agent 可向 Tapdata Cloud 上报任务状态、获取配置和执行任务等操作。 |

:::tip

如您的网络环境不支持访问外网，可选择在本地部署 [Tapdata](https://tapdata.net/tapdata-enterprise.html)，更多介绍，见[版本对比](https://tapdata.net/pricing.html)。

:::
