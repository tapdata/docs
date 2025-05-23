# TapData Community

import Content from '../reuse-content/_community-features.md';

<Content />

TapData 社区版（Community）是一个开源的实时数据平台，可帮助您实现数据的实时同步和转换，本文将演示如何快速安装和启动 TapData 社区版。

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 前提条件

在开始之前，请确保您的环境满足以下条件：

- 硬件配置：8 核 CPU（X86 架构）、16 GB 内存
- 存储规格：100 GB
- 操作系统：CentOS 7 + 、Ubuntu 16.04 +、Red Hat Enterprise Linux（RHEL）7.x/8.x
- 网络环境：可与数据目标数据库通信

## 组件介绍

TapData 社区版包括以下主要组件：

- **连接器（Connectors）**：允许 TapData 社区版连接到各种数据源，例如数据库、数据仓库和消息队列等。
- **数据处理引擎**：负责执行数据的转换、清洗和加工等任务
- **监控和管理界面**：提供简单易用的界面化平台，用于配置、管理和监控数据流。

## 安装 TapData 社区版



```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="Docker 平台下部署">
```
1. 确保 [Docker](https://docs.docker.com/get-docker/) 已安装并启动。

2. 打开终端或命令行界面，执行以下命令拉取最新的 TapData Docker 镜像：

   ```bash
   docker pull ghcr.io/tapdata/tapdata:latest
   ```

3. 执行以下命令启动 TapData 容器：

   ```bash
   docker run -d -p 3030:3030 --restart always --name tapdata --privileged ghcr.io/tapdata/tapdata:latest
   ```

   参数解释：

   - `-d`：表示后台运行容器。
   - `-p 3030:3030`：映射容器的 3030 端口到宿主机的 3030 端口，允许您通过浏览器访问 Tapdata。
   - `--name tapdata`：为您的容器指定一个名字，本案例指定为 **tapdata**。
   - `--restart always`：重启 docker 服务时，自动启动该容器。
   - `--privileged`：为容器提供更高权限，确保依赖组件（如内嵌 MongoDB）正常启动，建议生产环境根据需求精细配置权限。

   :::tip

   TapData 社区版默认会使用容器内的 MongoDB 来存储元数据、任务配置等数据，如需使用自有的 MongoDB，可在启动容器时通过 `-e` 来指定 MongoDB [URI 连接串信息](https://www.mongodb.com/docs/v5.0/reference/connection-string/#standard-connection-string-format)，例如：`docker run  -d -p 3030:3030 --name tapdata -e MONGO_URI=mongodb://root:Tap123456@192.168.1.18:29917/tapdata_community?authSource=admin' --restart always ghcr.io/tapdata/tapdata:latest`。

   :::

4. （可选）执行 `docker logs -f tapdata` 查看容器启动日志，完成启动后关键日志提示如下：

   ```bash
   <<< Start Server [SUCCESS]
   All Done, Please Visit http://localhost:3030
   ```

5. 通过浏览器登录 TapData 平台，本机的登录地址为 http://localhost:3030，默认账号为 admin@admin.com，密码为 admin，首次登录请及时修改密码以保障安全性。

   :::tip

   如需在同一内网的其他设备上访问 TapData 服务，请确保网络可互通。

   :::

</TabItem>

<TabItem value="Linux 平台下部署">

1. 访问 [TapData Community Release 页面](https://github.com/tapdata/tapdata/releases)，获取最新的安装包，然后将其上传至待部署的设备中。

2. 在待部署的设备上，执行下述格式的命令，解压安装包并进入解压后的路径。

   ```shell
   tar -zxvf 安装包名&&cd tapdata
   ```

   以 3.5.6 版本为例，即为`tar -zxvf tapdata-v3.5.16-663b7b11.tar.gz && cd tapdata`

3. [安装 MongoDB](../administration/production-deploy/install-replica-mongodb.md)（4.0 及以上版本），TapData 会将其作为中间库存储任务和元数据信息。

3. 执行下述格式的命令，指定刚刚部署的 MongoDB 的 [URI 连接串信息](https://www.mongodb.com/docs/v5.0/reference/connection-string/#standard-connection-string-format)。

   ```bash
   export MONGO_URI=mongodb://{admin}:{password}@{host}:{port}/{database_name}?replicaSet={replica_name}&authSource=admin
   ```

   示例：`export MONGO_URI=mongodb://root:Tap123456@192.168.1.18:20017/tapdata_community?replicaSet=rs1&authSource=admin`

4. 执行 `./start.sh`启动 TapData 服务，完成启动后关键日志提示如下：

   :::tip

   如采用非 root 用户部署，应避免使用 `sudo` 提权操作以避免安装失败。在执行命令前，请使用 `sudo chown -R <your-username>:<your-group> <installation-dir>` 或 `sudo chmod -R 777 <installation-dir>` 为当前用户赋予安装目录的完全权限。

   :::

   ```bash
   <<< Start Server [SUCCESS]
   All Done, Please Visit http://localhost:3030
   ```

5. 通过浏览器登录 TapData 平台，本机的登录地址为 http://localhost:3030，默认账号为 admin@admin.com，密码为 admin，首次登录请及时修改密码以保障安全性。

   :::tip

   如需在同一内网的其他设备上访问 TapData 服务，请确保网络可互通。

   :::


</TabItem>
</Tabs>



## 下一步

[连接数据库](../quick-start/connect-database.md)