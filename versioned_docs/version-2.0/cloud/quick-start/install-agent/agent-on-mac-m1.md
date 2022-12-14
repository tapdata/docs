# Mac 平台上安装（M1 芯片）

## 安装步骤

1. 下载 JDK 镜像并启动，镜像可以使用 docker pull openjdk:8u312。

2. 下载 [📎tapdata-mac-arm64.zip](https://www.yuque.com/attachments/yuque/0/2022/zip/20356562/1664509990360-9a1e28ff-0ebb-43a3-ae7a-08726787c9db.zip)。

3. 将解压出的 tapdata-mac-arm64 拷贝到 docker 并重命名为 tapdata

4. 在 docker 中执行云版部署中 Linux 部分的后半段命令。

   :::tip

   命令从 `./tapdata start backend` 开始复制，如下图。 

   :::

   ![](../../images/install_agent_mac.png)



## 下一步

[连接数据库](../connect-database.md)