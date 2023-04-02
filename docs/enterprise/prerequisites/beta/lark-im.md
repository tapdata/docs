# Lark-IM

飞书是一款协作与管理平台，支持即时通讯、音视频会议等功能。在创建 Lark-IM（飞书消息） 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。



## 操作步骤

1. 以管理员的身份登录[飞书开放平台](https://open.feishu.cn/app)。

2. 在开发平台首页，进入企业自建的应用。

   :::tip

   * 关于企业自建应用的创建方法，见[开发流程](https://open.feishu.cn/document/home/introduction-to-custom-app-development/self-built-application-development-process)，您需要启用机器人能力，并根据飞书开发者页面的提示授予相关权限，随后将应用发布上线。
   * 为保障消息可以正常发送至接收者，您需要将在版本发布时设置可用范围，使其包含消息接收者。

   :::

3. 在左侧导航栏，单击**凭证与基础信息**，获取 App ID 和 App Secret 信息，后续将在连接数据源时使用。

   ![](../../images/obtain_feishu_app_ak.png)



## 下一步

至此，已完成相关准备工作，接下来，您可以连接您可以 [Lark-IM 数据源](../../user-guide/connect-database/beta/connect-lark-im.md)。



## 补充说明

如您需要使用飞书发消息，消息体的结构如下：

```json
[
  {
    "receiveType": "{{user | email | phone | chat}}",
    "receiveId": "{{user_open_id | user_email | user_phone | chat_id}}",
    "contentType": "text",
    "content": "{\"text\":\"Hello! This is lark message! \"}"
  }
]
```

- **receiveType**：表示消息接收者类型，取值：user、chat、email、phone。
- **contentType**：消息类型，取值默认为 text，具体的消息类型介绍，见[飞书官方文档](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)。
- **receiveId**：消息接收者的 open_id/手机号/邮箱或群聊的 chat_id，APP 通过这个字段来发送消息到指定的用户或群聊。