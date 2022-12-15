# 常见问题

本文列举使用 Tapdata 过程中的常见问题。

## Tapdata 支持哪些数据源？

Tapdata 支持丰富的数据库，包括常见关系型、非关系型以及队列型数据源，详情见[支持的数据库](introduction/supported-databases.md)。



## 连接测试失败怎么办？

创建数据连接时，需要参照页面右侧连接配置帮助，按指南完成相关参数的设定，您也可以参考[准备工作](prerequisites)完成设置。



## 以 MongoDB 为源时数据传输错误？

需要手动在目标表里建 _id 才能同步

关系型数据库为目标时，以非_id做关联时，需要在中间加入一个MONGO作为中转



## 以 Kafka 为源时数据传输错误？

Kafka 不能中间作为源，只能做中间节点再到目标



## Tapdata 支持试用吗？

支持。您可以点击“[申请试用](https://tapdata.net/tapdata-on-prem/demo.html)‍”‍，Tapdata 工程师会联系您并协助您试用。



## Tapdata 如何收费？

Tapdata 采用订阅制收费，按照您部署的服务器节点数量，按年支付相应的订阅费用。