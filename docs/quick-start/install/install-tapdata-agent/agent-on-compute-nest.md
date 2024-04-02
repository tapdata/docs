# 计算巢服务上安装

在传统云端部署模式下，企业用户需要自行完成购买 ECS、准备环境、安全策略配置等复杂流程，由于高度依赖人工经验，交付周期和质量都难以保障。为进一步提升部署便捷性和安全性，Tapdata 通过[阿里云计算巢](https://help.aliyun.com/document_detail/290066.html)帮助用户在安全的网络环境中一键部署 Tapdata Agent，实现了部署、交付、运维全服务生命周期的效率升级，极大降低使用门槛。

## 前提条件

[注册阿里云账号](https://help.aliyun.com/knowledge_detail/37195.html)

## 操作步骤

1. 登录 Tapdata 平台。

2. 基于业务需求创建所需规格的 Agent，具体操作，见[订阅实例](../../billing/purchase.md)。

3. 订阅完成后，在跳转到的部署页面选择**阿里云计算巢**，然后选择部署方式来创建云服务器 ECS：

   ![](../../../images/select_computing_nest_cn.png)

   * **三天试用**：免费试用 3 天，到期后将自动回收服务器资源，相关数据不会保留，请提前备份。
   * **付费部署**：以预付费或按量的付费方式来创建云服务器 ECS，更多介绍，见 [ECS 计费说明](https://help.aliyun.com/document_detail/25398.html)。

   :::tip

   接下来，我们将以免费试用演示操作流程，本页面中的**实例版本**和**实例 Token** 将在步骤 6 中使用。

   :::

4. 在跳转到的阿里云登录页中，填写账号密码并完成登录。

5. 在弹出的对话框中，阅读并同意计算巢服务协议，单击确定。

6. 根据页面提示，完成云服务器 ECS 的各项配置。

   :::tip

   * 您可以返回 Tapdata Cloud 平台，获取**应用实例配置**处所需的**实例版本**和**实例 Token**。
   * 此外，您还可以在页面底部授权 Tapdata 提供代运维服务，避免故障排查时手动修改网络配置、交换登录凭证等困扰，杜绝安全隐患，提升排查效率。

   :::

7. 单击**下一步：确认订单**，阅读选中服务协议后单击**开始免费试用**。

8. 单击**去列表查看**，跳转到计算巢服务实例列表，等待部署完成（约 3 分钟）。

   ![](../../../images/computing_nest_deployed_cn.png)



## 视频教程
<iframe      src="https://20778419.s21v.faiusr.com/58/2/ABUIABA6GAAg3pqinAYo5oSxkQI.mp4"   width="100%"      height="539"      frameborder="0"    allowfullscreen="true"  > </iframe>

## 下一步

[连接数据库](../connect-database.md)

## 推荐阅读

* [管理 Agent](../../user-guide/manage-agent.md)
* [安装与管理 Agent 常见问题](../../faq/agent-installation.md)