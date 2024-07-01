# Ubuntu 上安装

## 概述

使用本教程手动安装 TapDB v6.0，使用下载的.tgz tarball 运行 Ubuntu Linux LTS（长期支持）版本上的 Community Edition。

## 注意事项

* 在生产环境中部署 TapDB 之前，请考虑[生产说明](../administration/production-notes.md)文档，其中提供了针对生产 TapDB 部署的性能注意事项和配置建议。

## 安装 TapDB

### 先决条件

使用以下命令安装 TapDB Community Edition .tgz Tarball 所需的依赖项：

Ubuntu 22.04 (Jammy)

```
sudo apt-get install libcurl4 libgssapi-krb5-2 libldap-2.5-0 libwrap0 libsasl2-2 libsasl2-modules libsasl2-modules-gssapi-mit snmp openssl liblzma5
```

Ubuntu 20.04 (Focal)， Ubuntu 18.04（Bionic）

```
sudo apt-get install libcurl4 openssl liblzma5
```

### 步骤

请按照以下步骤从 .tgz 手动安装 TapDB。

1. 下载 tarball。

   安装所需的必备包后，请从链接下载 TapDB tgz tarball：

2. 从下载的存档中提取文件。

   例如，从系统 shell 中，您可以使用 tar 命令进行提取：

    ```
    tar -zxvf tapdb-linux-*-6.0.tgz
    ```

3. 确保二进制文件位于 PATH 环境变量中列出的目录下。

   TapDB 二进制文件位于 tarball 的 bin/ 目录中。您可以执行以下任一操作：

    - 将二进制文件复制到 PATH 变量中列出的目录中，例如 `/usr/local/bin`（根据需要使用您的安装目录来更新 `/path/to/the/tapdb-directory/`）

        ```
        sudo cp /path/to/the/tapdb-directory/bin/* /usr/local/bin/
        ```

    - 创建指向 PATH 变量中所列目录的二进制文件的符号链接，例如 `/usr/local/bin`（根据需要使用您的安装目录更新 `/path/to/the/tapdb-directory/`）：

        ```
        sudo ln -s  /path/to/the/tapdb-directory/bin/* /usr/local/bin/
        ```

## 运行 TapDB

### ulimit 注意事项

大多数类 Unix 操作系统都会限制进程可以使用的系统资源。这些限制可能会对 TapDB 操作产生负面影响，应该进行调整。

:::tip

如果打开文件数的 ulimit 值低于 64000，TapDB 会生成启动警告。

:::

### 步骤

请按照以下步骤运行 TapDB。 这些说明假设您使用的是默认设置。

1. 创建 TapDB 数据与日志目录：
    
    ```
    sudo mkdir -p /var/lib/tapdb
    sudo mkdir -p /var/log/tapdb
    ```
   
    启动 TapDB 进程的用户必须具有对这些目录的读取和写入权限。例如，如果你打算自己运行 TapDB：

    ```
    sudo chown `whoami` /var/lib/tap     # Or substitute another user
    sudo chown `whoami` /var/log/tapdb   # Or substitute another user
    ```

2. 运行 TapDB。

    要运行 TapDB，请在系统提示符下运行tapdb进程。

    ```
    tapdb --dbpath /var/lib/tap --logpath /var/log/tapdb/tapdb.log --fork
    ```

    有关命令行选项--dbpath和--logpath的详细信息，请参阅选项。

3. 验证 TapDB 是否已成功启动。

   检查日志文件 `/var/log/TapDB/tapdb.log` 中以下行的进程输出，验证 TapDB 是否成功启动：

    ```
    [initandlisten] waiting for connections on port 27017
    ```

   可能会在进程输出中看到非严重警告。只要看到上述日志行，便可在 TapDB 初次计算期间安心地忽略这些警告。

4. 开始使用 TapDB。

   tap在与 相同的主机上启动tapdb 会话。您可以运行不带任何命令行选项的tap，以连接到使用默认端口 在本地主机上运行的27017 }。

    ```
    tap
    ```

## 更多信息

### 默认绑定本地主机

默认情况下，TapDB 启动时会将bindIp设置为127.0.0.1 ，从而绑定到本地主机网络接口。这意味着tapdb只能接受来自同一计算机上运行的客户端的连接。远程客户端将无法连接到tapdb ，并且tapdb将无法初始化副本集，除非将此值设置为可从远程客户端访问的有效网络接口。

该值可通过以下任一方式配置：

- 在 TapDB 配置文件中使用bindIp ，或

- 通过命令行参数--bind_ip

:::warning

在绑定到非本地主机（例如可公开访问）的 IP 地址之前，请确保您已保护集群免遭未经授权的访问。

::::