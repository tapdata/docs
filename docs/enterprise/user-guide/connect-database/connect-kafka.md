# 连接 Kafka

在数据源类型选择页面选择Kafka，打开Kafka连接配置页面。

![](../../images/connect_kafka_1.png)



数据源类型：已选择的数据源类型

连接名称：设置连接的名称

连接类型：支持源头和目标、源头、目标三种选择。

源头和目标：此数据连接在Tapdata 中能同时作为源和目标使用

源头：此数据连接在Tapdata 中只能作为源使用，不能作用为目标

目标：此数据连接在Tapdata 中只能作为目标使用，不能作用为源

数据库地址：配置数据库的访问地址

主题表达式：Kafka的topic信息

kerberos 认证：是否开启kerberos 认证，开启后需要在 Engine 所在主机 /etc/hosts 配置实例名映射，开启后无需再进行密码配置。

密钥表示文件:请选择要使用的密钥表示文件上传

配置文件：请选择要使用的配置文件上传

主体配置：请输入主体配置

服务名：请输入服务名

账号：配置Kafka的访问账号

密码：配置Kafka的访问密码

加密方式：配置Kafka使用的加密方式，目前支持的加密方式包括：PLAIN、SHA256、SHA512

忽略非JSON Object格式消息：是否开启忽略，如果开启则遇到解析异常会忽略该消息，否则停止拉取消息

ACK确认机制：目前支持：

- 不确认

- 仅写入master分区

- 写入大多数ISR分区

- 写入所有ISR分区


消息压缩类型：目前支持gzip、snappy、lz4、zstd。需要注意的是zstd压缩格式只在kafka2.1.0版本之后才支持，如果在不支持的版本设置了zstd压缩可能会导致任务运行异常。

忽略推送消息异常：如果开启则忽略该次推送的消息(存在消息丢失)，否则停止推送消息。

共享挖掘：设置是否开启共享挖掘。共享挖掘会挖掘增量日志，当有多个增量任务时不需要重复开启日志采集进程，能极大缓解源库资源的占用和浪费。

agent设置：可设置该连接调用的引擎服务器，默认为平台自动分配可用户手动指定。

连接测试：点击连接测试，测试连接是否可用。

保存：点击保存按钮，保存连接。



用户根据自己实际的Kafka连接信息，按照配置页面右侧的连接配置帮助进行配置。

配置完成后，点击测试连接，测试配置完成的连接是否有效。

![](../../images/connect_kafka_2.png)



测试通过后，点击保存按钮，保存配置好的kafka连接。