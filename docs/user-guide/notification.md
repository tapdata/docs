# 通知与告警设置

import Content from '../reuse-content/_enterprise-and-community-features.md';

<Content />

:::tip

如您的产品为 Tapdata Cloud，通知消息及其配置入口在页面右上角，支持设置通知规则和告警接收人。

:::

Tapdata 支持自定义系统和告警设置，同时支持通过 Webhook 对接第三方平台，帮助您快速掌握任务运行状态。

## 通知设置

[登录 Tapdata 平台](log-in.md)后，单击右上角的 ![setting_icon](../images/setting_icon.png) > **通知设置**，可根据自定义的通知规则设置，自动触发通知发送流程，主要包括任务运行通知和 Agent 通知两种类型：具体包含的通知项如下所示：

![](../images/system_notification_1.png)

- 任务被启动系统通知
- 任务被停止系统通知
- 任务被删除系统通知
- 任务状态error系统通知
- 任务遇到错误
- CDC滞后通知
- 校验任务count差异系统通知
- 校验任务内容差异系统通知
- 校验任务被删除系统通知
- 校验任务运行error
- 任务被删除
- 任务被停止
- 任务状态error
- 任务遇到错误
- CDC滞后超时
- 数据库DDL变化
- 服务器断开连接
- Agent服务被启动
- Agent服务被停止
- Agent被创建
- Agent被删除

## 告警设置

通过告警设置，您可以设置告警事件的通知方式和发送间隔：

![](../images/system_notification_2.png)

## Webhook 告警

通过 Webhook 告警功能，您只需填写服务 URL 即可与您的告警平台或第三方平台实现快速对接，从而实现更多的通知方式，例如即时通讯平台。

![Webhook 设置](../images/webhook_settings.png)

