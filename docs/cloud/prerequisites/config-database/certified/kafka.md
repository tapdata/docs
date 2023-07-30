# Kafka

Apache Kafka 是一个分布式数据流处理平台，可以实时发布、订阅、存储和处理数据流。在创建 Kafka 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。

## 支持版本

Kafka 2.3.x

## 使用限制

* 仅支持 JSON Object 字符串的消息格式，例如：`{"id":1, "name": "张三"}`。
* 消息推送实现为 At least once，消费端需要设计幂等。



## Kafka 消费说明

在后续配置数据复制/数据转换任务时，可选择数据的同步方式，对应的消费说明如下：

* **仅全量**：从 Topic 中各分区的 earliest offset 开始订阅消费，如果之前存在消息消费记录，则恢复到之前的 offset 开始消费。
* **仅增量**：从 Topic 中各分区的 latest offset 开始订阅消费，如果之前存在消息消费记录，则恢复到之前的 offset 开始消费。
* **全量 + 增量**：跳过全量同步阶段，从增量阶段开始。
  * 如果没有进行过全量同步，则会从 Topic 中各分区的 earliest offset 开始订阅消费，否则从 Topic 中各分区的 latest offset 开始订阅消费。
  * 如果之前存在消息消费记录，则会恢复到之前的 offset 开始消费。



## 准备工作

1. 登录 Kafka 所属设备。

2. （可选）如您将 Kafka 作为目标库，推荐提前创建好数据要存放的 Topic，如果由 Tapdata 自动创建，则其分区和副本数均为 1。

   下述命令示例表示创建一个名为 kafa_demo_topic 的 Topic，其分区数和副本数均为 3：

   ```bash
   bin/kafka kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 3 --partitions 3 --topic kafa_demo_topic
   ```

   更多介绍，见 [Kafka 快速入门](https://kafka.apache.org/23/documentation.html#quickstart)。

3. 确认加密方式，如开启了 kerberos 认证，您还需要提前准备好密钥、配置等文件。





## 下一步

至此，已完成相关准备工作，接下来，您可以连接 [Kafka 数据源](../../../user-guide/connect-database/certified/connect-kafka.md)。
