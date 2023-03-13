# Zoho CRM

在创建 Zoho-CRM 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。

## 操作步骤

1. 登录 [Zoho API 控制台](https://api-console.zoho.com.cn/)，然后单击 **GET STARTED**。

2. 单击 **Self Client** 卡片对应的 **CREATE NOW**。

3. 单击 **CREATE**，然后在弹出的对话框中单击 **OK**。

4. 创建完成后，您将获取 **Client ID** 和 **Client Secret** 信息，后续将在连接数据源时使用。

   ![](../../images/obtain_zoho_secret.png)

5. 单击 **Generate Code** 页签，填写要授权的 **Scope** 和描述信息，然后单击 **CREATE**。

   ![](../../images/zoho_generate_code.png)

   :::tip

   关于 Scope 的设置参考资料，见 [OAuth 认证](https://www.zoho.com.cn/crm/help/developer/api/oauth-overview.html)。

   :::

6. 在跳转到的页面，选择目标 Portal 和 Production，单击 **CREATE**。

7. 在弹出的对话框中，复制或下载 Code 信息（即令牌信息），妥善保存该信息，后续将在连接数据源时使用。

   ![](../../images/obtain_zoho_code.png)

   :::tip

   默认的令牌有效期为三分钟，请尽快完成数据源的添加，如过期请重复执行步骤 5~7，重写获取令牌信息。

   :::



## 下一步

至此，已完成相关准备工作，接下来，您可以连接 [Zoho CRM](../../user-guide/connect-database/beta/connect-zoho.md)。
