# RabbitMQ
import Content from '../../reuse-content/_all-features.md';

<Content />

请遵循以下说明以确保在 Tapdata 中成功添加和使用 RabbitMQ。

## 支持版本

3.8.x

## 数据源配置

- 连接类型，支持为源和目标、源头、目标，主题名称不能为空
- MQ地址，MQ端口
- 队列名称：队列名称为空，默认加载所有队列；如果需要指定，可以用逗号分隔
- 消息路由：允许为空
- 虚拟主机：允许为空，需要匹配账号来使用，符合账号的权限目录，默认是"/"
- 账号，允许为空
- 密码，允许为空

## 连接测试项

所有标记为必填项的字段内容