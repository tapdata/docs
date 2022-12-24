# 管理 Agent

Agent 管理列表可以对 Agent 进行创建、部署、停止、删除等操作。您可以在这里修改 Agent 的名称、查看 Agent 详情。

![](../images/agent_list.png)

## 创建 Agent

点击【创建Agent】可以创建一个Agent，用户可以根据需要创建多个Agent，Agent创建完成后需要进行部署启动才可以使用。

![](../images/create_agent.png)

## 部署 Agent

点击 Agent 列表的部署按钮可以打开Agent部署页面，选择您需要部署Agent的版本按照部署操作指引进行部署即可，相关介绍，见[安装 Agent](../quick-start/install-agent)。

![](../images/install_agent.png)

## 升级 Agent

当 Agent 有新版本可用时，Agent 版本后会显示升级按钮，点击升级按钮可以对 Agent 进行升级。目前支持自动升级和手动升级两种方式。

![](../images/update_agent.png)

### 自动升级

只有Agent状态为运行中时才可以使用自动升级，升级前会对Agent进行检测，如果要升级的Agent上有任务正在运行，为了避免升级Agent对任务造成影响，需要先手动停止所有任务才可以升级Agent。

自动升级时，Agent会自动下载升级包进行升级，所以需要一定的时间，升级成功后升级提醒图标会自动消失，如果升级失败会自动回滚，此时用户可以通过手动升级功能再进行升级。

![](../images/auto_update_agent.png)

### 手动升级

如果Agent状态为离线，则只能使用手动升级。点击手动升级会进入手动升级页面。按照页面指引，在部署Agent的宿主机执行升级命令即可完成升级。

## 停止Agent

对于运行中的Agent，点击停止按钮，可以停止Agent的运行，对于自建实例目前只支持停止，暂不支持启动。

## 删除Agent

已经停止的Agent用户可以删除。点击删除按钮即可完成Agent的删除。

## 管理 Agent

完成安装后，Agent 会自动将状态等信息上报至 Tapdata Cloud，您可以通过界面或命令行管理 Agent：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
    <TabItem value="ui" label="通过界面管理 Agent" default>
    <ol>
      <li>  登录 Tapdata Cloud。</li>
      <p></p>
      <li>  在左侧导航栏，单击 <b>Agent 管理</b>即可查看所有 Agent 的状态。</li>
      <p></p>
      <li>  单击目标 Agent 的名称，在右侧弹出的面板中可查看 Agent 版本、安装目录等信息，也可以执行管理操作（如停止）。<img src='https://docs.tapdata.io/img/manage_agent_cn.png'></img></li>
    </ol>
   </TabItem>
   <TabItem value="cli" label="通过命令管理 Agent">
    <p>&nbsp; &nbsp; 进入 Agent 部署目录，选择执行下述命令来管理 Agent。</p>
    <ul>
    <li>查看命令帮助：<code>./tapdata help</code>
    </li>
    <li>查看 Agent 状态：<code>./tapdata status</code>
    </li>
    <li>启动 Agent：<code>./tapdata start</code>
    </li>
    <li>停止 Agent：<code>./tapdata stop</code>
    </li>
    </ul>
   </TabItem>
  </Tabs>

## 目录结构及功能介绍

在完成 Tapdata Agent 的部署及启动后，Tapdata Agent 会自动在当前目录下生成其运行所需文件及目录，这些文件及目录主要用于任务信息、日志、配置文件、数据源证书文件的存放：

```bash
~/.tapdata/cert/ 
#如果中间库存在证书，那么此目录将用来存放证书相关文件

~/.tapdata/logs/ 
#此目录用来存放日志相关文件

~/.tapdata/os-monitor/
#此目录用来存放os-monitor配置文件

~/.tapdata/application.yml 
#该文件为Tapdata Agent配置文件

~/.tapdata/tapdata.conf
#该文件为早期版本Tapdata Agent配置文件，新版已由application.yml替代

~/agent.yml
#该文件同为Tapdata Agent配置文件
```









## Windows

## 管理 Tapdata Agent

进入到 Tapdata Agent 的安装目录，然后通过以下方式来对 Tapdata Agent 进行管理：

* 关闭 Tapdata Agent：双击 `stop.bat`
* 启动 Tapdata Agent：双击 `start.bat` 或者直接双击 `tapdata.exe`
* 查看 Tapdata Agent 状态：双击 `status.bat`



## 调整 Tapdata Agent 运行内存

在Agent部署目录下找到 `application.yml` 文件，找到 tapdataJavaOpts 配置，比如：`tapdataJavaOpts: "-Xms4G -Xmx8G"`

调整该配置里内存的值，具体的运行内存大小根据服务器的可用内存自行判断设置。

```yaml
tapdata:
    conf:
        tapdataPort: '3030'
        backendUrl: 'https://cloud.tapdata.net/api/'
        apiServerPort: ""
        tapdataJavaOpts: "-Xms4G -Xmx8G"
        reportInterval: 20000
        uuid: a5f266a1-a495-412f-a433-29d345713c176
    cloud:
        accessCode: ""
        baseURLs: 'https://cloud.tapdata.net/api/'
        username: null
        token: 
spring:
    data:
        mongodb:
            username: ""
            password: ""
            mongoConnectionString: ""
            uri: ""
            ssl: ""
            sslCA: ""
            sslCertKey: ""
            sslPEMKeyFilePassword: ""
            authenticationDatabase: ""
```

配置文件修改完成后，重启Agent生效

```bash
#先停止Agent
./tapdata stop -f

#然后再启动Agent
./tapdata start
```




以上目录并不会占用太多磁盘空间，为了确保 Tapdata Agent 的稳定运行及在您遇到问题时 Tapdata 技术客服能够协助您快速定位问题根因，请勿删除这些目录以及目录中的文件。







## Docker

### 管理 Tapdata Agent

关闭Tapdata Agent：

```bash
#通过docker exec进入容器对应目录并执行下方命令
./tapdata stop
```

启动Tapdata Agent：

```bash
#通过docker exec进入容器对应目录并执行下方命令
./tapdata start
```

查看Tapdata Agent状态：：

```bash
#通过docker exec进入容器对应目录并执行下方命令
./tapdata status
```



### Tapdata Agent 目录结构

完成 Tapdata Agent 部署及启动后，Tapdata Agent 会自动在当前目录下生成其运行所需文件及目录，这些文件及目录主要用于任务信息、日志、配置文件、数据源证书文件的存放：

```bash
~/.tapdata/cert/ 
#如果中间库存在证书，那么此目录将用来存放证书相关文件

~/.tapdata/logs/ 
#此目录用来存放日志相关文件

~/.tapdata/os-monitor/
#此目录用来存放os-monitor配置文件

~/.tapdata/application.yml 
#该文件为Tapdata Agent配置文件

~/.tapdata/tapdata.conf
#该文件为早期版本Tapdata Agent配置文件，新版已由application.yml替代

~/agent.yml
#该文件同为Tapdata Agent配置文件
```


以上目录并不会占用太多磁盘空间，为了确保 Tapdata Agent 的稳定运行及在您遇到问题时 Tapdata 技术客服能够协助您快速定位问题根因，请勿删除这些目录以及目录中的文件。
