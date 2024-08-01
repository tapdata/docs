# 数据安全与网络配置

import Content from '../reuse-content/_cloud-features.md';

<Content />

本文列举数据安全与网络配置相关常见问题。

## 使用 TapData Cloud 数据会泄露到公网吗？

不会，数据流转是由安装在您本地的 TapData Agent 来完成的，TapData agent 是 TapData Cloud 数据同步服务的执行实例。您登录的 TapData Cloud 管理后台，只负责同步任务的配置、分发、任务状态监测等，与安装在您本地的 TapData Agent 仅进行调度信息的通信。

![](../images/architecture.png)



## 同步数据时，TapData Cloud 是否会留存用户的数据？

不会，同步的时候数据只会通过用户部署在可控环境下的 agent，数据不会到达 TapData Cloud 管理平台，不会上传也不会留存用户数据。



## 不做端口映射，如何进行数据同步？

只需要 TapData Agent 可以单向访问外网 ，TapData Cloud 控制后台网络是通的即可。



## 源库无固定 IP 公网无法访问，如何使用？

可以把 TapData Agent 装在本地，使用私有地址，把 TapData Agent 部署到没有公网IP的源数据库这边。




## 数据库有白名单机制，如何设置？

需要在白名单中添加部署 TapData Agent 的机器。
