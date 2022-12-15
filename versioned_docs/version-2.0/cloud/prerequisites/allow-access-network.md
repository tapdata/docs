# 调试服务端网络环境

在您部署 Tapdata Agent 之前，一定要保证您准备用来部署的服务器与您的源数据库和目标数据库的网络是互通的。

![](../images/architecture.png)



* Tapdata Agent 部署服务器到源数据库的数据库端口必须开通

  要保证您的 Agent 服务器到源数据库服务器的数据库端口网络策略是开通的，这样才能确保Agent可以正常读取源数据库的数据

  Tapdata Agent 部署服务器到目标数据库的数据库端口必须开通

* 要保证您的Agent服务器到目标数据库服务器的数据库端口网络策略是开通的，这样才能确保Agent可以正常向您的目标数据库写入数据。

* Tapdata Agent 部署服务器要可以正常访问外网 Tapdata Cloud 管理后台

  要保证您的 Tapdata Agent 服务器可以正常访问 Tapdata Cloud 管理后台，这样 Tapdata Agent才能正常上报状态，获取同步配置，执行同步任务。

:::tip

如您的网络环境不支持访问外网，可选择在本地部署 [Tapdata](https://tapdata.net/tapdata-enterprise.html)，更多介绍，见[版本对比](https://tapdata.net/pricing.html)。

:::
