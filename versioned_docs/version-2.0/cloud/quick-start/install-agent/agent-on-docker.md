# Docker 平台上安装

## 环境要求

- 系统版本：64位
- 硬件环境：x86



## Docker 镜像要求


Tapdata Agent 的运行依赖本地 Java 环境，因此，在部署前您需要确保您的docker镜像中已存在 Java 环境，为了尽量简化部署，我们提供了包含 Java环境的 docker 镜像用于快速部署。如果您希望使用其它镜像，请联系您的docker镜像管理员或前往 [docker 官网](https://hub.docker.com/search)寻找。

## 安装步骤

1. 请复制下方命令并在本地部署环境执行，其包含镜像的下载及运行，Tapdata Agent 的下载、自动部署及启动。

   ![](../../images/install_agent_docker_1.png)

   :::tip

   部署过程无需 root 权限，为便于后续维护，推荐在独立的文件夹部署 Tapdata Agent.。

   :::

2. Docker 安装成功后，会自动输出已安装 Agent 的容器ID，您可以通过 `docker ps` 命令来查看正在运行的docker。

   ![](../../images/install_agent_docker_2.png)



Tapdata Agent 运行后会在 Tapdata 官网`Agent管理`页面自动注册，此时您可通过管理页面对其进行管控，也可在本地使用命令行方式对其进行管控，如果您的本地部署环境无法连通公网，那么您可能无法在`Agent管理`页面看到您的 Tapdata Agent。



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

## 视频教程

<iframe      src="https://20778419.s21v.faiusr.com/58/2/ABUIABA6GAAgpJSHkQYo-p_9KA.mp4"   width="100%"      height="539"      frameborder="0"    allowfullscreen="true"  > </iframe>



## 下一步

[连接数据库](../connect-database.md)
