# Agent 部署/运行

本文列举 Tapdata Agent 在部署和运行遇到的常见问题。

### 一个用户下面两个 Agent，会有冲突吗？

不会冲突，启动任务时，可能会调度到实例 A，也可能调度到实例 B；通常在任务比较多时，启动多个实例来解决单节点负载问题。

### 安装了DockerWindows (64 bit)，一直检测不通过？

可以直接使用Docker方式部署实例，只需要在终端执行 docker run xxxx 即可启动实例，详细命令请查看Docker部署页说明。

### Agent 启动报错：start timout ？

启动 Agent 失败，可以看下 logs/tapdata-agent.log 日志内容，判断是否为网络问题，或者发送给客户支持协助定位。

### 怎么再次获取 token？

由于一个Agent配置不能同时用于两个实例，产品上没有提供再次获取token重新部署；建议创新创建一个新实例安装部署。

### 输入 token 后报错： java.lang.IllegalStateException: Cannot load configuration class: io.tapdata.Application？

软件包不完整，可以更换一个版本测试验证。

### 安装 Agent 提示 bash: /Users/lixing/tapdata/tapdata: cannot execute binary file？

暂时只提供了 Linux、Windows、Docker 三种部署方式，在MacOS 系统上建议使用 Docker 部署。

### Agent 一直是部署状态检测中？

需要根据提示安装部署 agent，如果已经安装部署，然后等待实例上线，如果超过 5 分钟还没有上线的话，可能部署失败。您可以联系在线客服，并提供日志来协助定位问题。

### 如何卸载重装 Agent

- Docker 容器启动的实例，直接删除容器，然后重新运行 启动容器的命令即完成了重新安装
- Host宿主机自建的实例，可以参考下面步骤操作
- 重新部署
  - 将安装目录中 application.yml 保存下来
  - 停止服务：`./tapdata stop -f`
  - 删除安装目录
  - 创建新的安装目录，并将 application.yml 复制到新的安装目录中
  - 下载 tapdata 工具
  - 执行 `./tapdata start backend `

- 创建新实例，全新安装
  - 停止服务: `./tapdata stop -f`
  - 删除安装目录
  - 在控制台创建新实例，根据提示完成部署


### 为什么需要将 Tapdata Agent 部署至本地环境？

Tapdata Agent 是数据同步、数据异构、数据开发场景中的关键程序。由于数据流转通常对时效性有较高的要求，因此，推荐将 Tapdata Agent 部署在数据库所属的本地网络中，从而极大降低数据延迟。

更多介绍，见[部署 Tapdata Agent](../quick-start/install-agent)。



### Agent 显示离线，如何重启？

Agent 每隔1分钟就会上报一次心跳，要是连续5次没有上报，就会显示离线。 离线不影响已运行任务的正常运行，但是新建任务会受到影响。 大部分情况都是网络不稳定导致，触发实例离线告警。

如下场景：在个人电脑安装了一个实例，隔一段时间不操作电脑进入休眠状态，导致agent离线；再次操作电脑时，又唤醒了agent，变为运行中。

输入 `./tapdata status` 命令可以检查agent的状态，在安装agent的电脑上输入 `tapdata start` 即可重启 Agent。

如果还是无法启动，可联系在线客服协助定位问题。

### 数据源和目标在两台服务器上，是否需要安装2个agent ？

不需要， 只需要部署在其中一台服务器上即可。



### 内网数据同步到外网服务器，Agent 应该安装在哪个服务器？

内网安装 Tapdata Agent 即可。

### 如果 Oracle 是 rac 模式，aix 的两节点 rac，如何部署 Agent？

只要能够能连到 rac 就可以了。agent 能连到 rac 的 scan/vip 就可以了，甚至不用跟 Oracle 在一起。 
如果想让 agent 在负载较低的 rac 节点工作，就给负载低的节点的 vip 就好了。

### Agent 运行出现 “OutOfMemoryError” 怎么处理？

如果Agent在运行过程中出现 “OutOfMemoryError” 报错，首先要确认部署 Agent 服务器的可用内存是否足够。

如果服务器本身可用内存不够，需要考虑更换Agent部署服务器，或者将任务设置中的【每次读取数量】的值调小。

如果服务器可用内存充足，可以尝试调大Agent的运行内存，然后重新启动Agent即可。

Agent运行内存调整方式

在Agent部署目录下找到`application.yml`文件

修改文件，在文件里增加配置：`tapdataJavaOpts: "-Xms4G -Xmx8G"`

具体的运行内存大小根据服务器的可用内存自行判断设置

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



