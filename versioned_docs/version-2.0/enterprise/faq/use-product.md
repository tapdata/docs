# 产品特性/使用

本文列举使用 Tapdata 过程中的常见问题。

## Tapdata 支持哪些数据源？

Tapdata 支持丰富的数据库，包括常见关系型、非关系型以及队列型数据源，详情见[支持的数据库](../introduction/supported-databases.md)。



## Tapdata 支持试用吗？

支持。您可以点击“[申请试用](https://tapdata.net/tapdata-on-prem/demo.html)‍”‍，Tapdata 工程师会联系您并协助您试用。



## Tapdata 如何收费？

Tapdata 采用订阅制收费，按照您部署的服务器节点数量，按年支付相应的订阅费用。



## 连接测试失败怎么办？

创建数据连接时，需要参照页面右侧连接配置帮助，按指南完成相关参数的设定，您也可以参考[准备工作](../prerequisites)完成设置。



## 以 MongoDB 为源时数据传输错误？

需要手动在目标表里建 _id 才能同步

关系型数据库为目标时，以非_id做关联时，需要在中间加入一个MONGO作为中转



## 以 Kafka 为源时数据传输错误？

Kafka 不能中间作为源，只能做中间节点再到目标



## 配置复制任务时，目标节点推演结果异常？

Tapdata 会自动基于选择源表来推演目标表结构等信息，此处可能遇到的问题如下：

* **更新条件异常**：Tapdata 会将更新条件自动设置为表的主键，如果没有主键则选用唯一索引字段，无主键和唯一索引时，您需要手动指定更新条件的字段。
* **推演异常**：通常是字段类型异常引起，您可以根据页面提示，调整相关字段的类型。

![推演结果异常](../images/faq_deduction_error.png)



## Tapdata 处理事务的逻辑是什么？

通常一个事务有开始、过程、提交、撤回几种可能，因此事务开始执行后，可能会有多个 SQL 发起，此时 Tapdata 即捕获这些变更并缓存起来。

长时间未提交的事务会导致每次启停任务将从该事务开始挖掘，为避免影响源库和增量同步的性能，Tapdata 会清理超过一定时长的未提交事务，如果清理后源库再提交了该事务，可能导致数据不一致。

为避免此类情况发生，请在配置任务时，设置来源节点（如 Oracle 库）的未提交事务生命时长，以符合业务需求。

![未提交事务生命时长](../images/transaction_timeout.png)

