# 管理集群

import Content from '../../reuse-content/_enterprise-features.md';

<Content />

通过集群管理页面，您可以查看当前集群内所有组件的运行状态和对外建立的连接数等信息，同时支持管理操作。



## 操作步骤

1. 登录 Tapdata 平台。

2. 在左侧导航栏，选择**系统管理** > **集群管理**，即可查看各组件的运行状态和连接信息。

   您还可以对服务执行启动/关闭、重启操作，其中关闭与重启操作会影响相关服务的正常运行，请在运维窗口或业务低峰期操作。

   ![集群管理](../../images/manage_cluster_1.png)

3. 在此页面，根据业务需求选择下述操作。

   * 单击![](../../images/process_monitor_icon.png)可下载当前引擎的线程资源使用详情，格式为 JSON。

   * 单击![](../../images/data_source_monitor_icon.png)可下载当前引擎的数据源使用详情，格式为 JSON。

   * 单击![](../../images/cluster_setting_icon.png)可调整服务器名称与切换网卡展示信息。

     :::tip

     切换网卡展示信息仅改变集群管理页服务器下 IP 地址的展示，不会影响功能运行。

     :::

   * 单击![](../../images/cluster_add_icon.png)可增加自定义的服务监控。