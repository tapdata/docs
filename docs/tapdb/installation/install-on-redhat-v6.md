# Red Hat/CentOS 上部署

使用本教程手动安装 TapDB 6.0 在 Red Hat Enterprise Linux、CentOS Linux 或 Oracle Linux [ 1 ]，使用下载的.tgz tarball。

早期版本的部署方式，见[附录章节](../appendix/install-on-ubuntu-v4.md)。

## 注意事项

* 使用 .tgz 包安装服务器时，需要按照 tapsh 安装说明单独下载并安装tapsh。
* 在生产环境中部署 TapDB 之前，请考虑[生产说明](../administration/production-notes.md)文档，其中提供了针对生产 TapDB 部署的性能注意事项和配置建议。

## 安装 TapDB

### 前提条件

使用以下命令安装 TapDB .tgz Tarball 所需的依赖项：

```
sudo yum install libcurl openssl xz-libs
```

### 操作步骤

请按照以下步骤从 .tgz 手动安装 TapDB。

1. 下载 tarball。

    安装所需的必备包后，请从链接下载 TapDB Community tgz tarball：

2. 从下载的存档中提取文件。

    例如，从系统 shell 中，您可以使用 tar 命令进行提取：

    ```
    tar -zxvf TapDB-linux-*-6.0.tgz
    ```

3. 确保二进制文件位于 PATH 环境变量中列出的目录下。

    TapDB 二进制文件位于 tarball 的 bin/ 目录中。您可以执行以下任一操作：

    - 将二进制文件复制到 PATH 变量中列出的目录中，例如 `/usr/local/bin`（根据需要使用您的安装目录来更新 `/path/to/the/TapDB-directory/`）

        ```
        sudo cp /path/to/the/TapDB-directory/bin/* /usr/local/bin/
        ```

    - 创建指向 PATH 变量中所列目录的二进制文件的符号链接，例如 `/usr/local/bin`（根据需要使用您的安装目录更新 `/path/to/the/TapDB-directory/`）：

        ```
        sudo ln -s  /path/to/the/TapDB-directory/bin/* /usr/local/bin/
        ```
    
4. 安装 TapDB Shell (tapsh)。

   安装 tapsh 然后使用 TapDB Shell 连接到您的部署。

   从链接下载版本的软件包并解压缩。

## 运行 TapDB

### 前提条件

大多数类 Unix 操作系统都会限制进程可以使用的系统资源。这些限制可能会对 TapDB 操作产生负面影响，应该进行调整。

:::tip

如果打开文件数的 ulimit 值低于 64000，TapDB 会生成启动警告。

:::

### 目录路径

#### 使用默认目录

默认情况下，TapDB 使用 tapdb 用户帐户运行，并且使用以下默认目录：

- `/var/lib/tapdb`（数据目录）

- `/var/log/tapdb`（日志目录）

创建 TapDB 数据与日志目录：

```
sudo mkdir -p /var/lib/tapdb
sudo mkdir -p /var/log/tapdb
```

默认情况下，TapDB 使用 tapdb 用户帐户运行。创建一个 tapdb 和一个 TapDB 群组。确保 tapdb 属于该群组，然后将这些目录的所有者和群组设为 tapdb：

```
sudo chown -R tapdb:tapdb /var/lib/tapdb
sudo chown -R tapdb:tapdb /var/log/tapdb
```

#### 使用非默认目录

要使用除默认目录外的数据目录和/或日志目录：

1. 创建新目录。

2. 编辑配置文件 `/etc/tapdb.conf` 并相应修改以下字段：

   - `storage.dbPat`h指定新的数据目录路径（例如`/some/data/directory` ）

   - `systemLog.path`指定新的日志文件路径（例如`/some/log/directory/tapdb.log` ）

3. 确保运行 TapDB 的用户有权访问这些目录：

    ```
    sudo chown -R tapdb:tapdb <directory>
    ```

    如果更改运行 TapDB 进程的用户，必须赋予新用户访问这些目录的权限。

4. 如果已强制执行，请配置 SELinux。

#### 配置 SELinux

:::warning

配置不当的 SELinux 策略可能会不安全，或者可能会阻止您的tapdb实例运行。

如果 SELinux 处于enforcing（强制执行）模式，则须为 TapDB 自定义 SELinux 策略以

- 允许访问 cgroup

- 允许访问 netstat

:::

### 操作步骤

请按照以下步骤在您的系统上运行 TapDB。 参照这些操作说明的前提是您在使用默认设置。

1. 创建数据和日志目录。

    创建 TapDB 实例存储其数据的目录。例如：

    ```
    sudo mkdir -p /var/lib/tapdb
    ```

    创建 TapDB 实例用于存储日志的目录。例如：

    ```
    sudo mkdir -p /var/log/tapdb
    ```

    启动 TapDB 进程的用户必须具有对这些目录的读取和写入权限。例如，如果你打算自己运行 TapDB：

    ```
    sudo chown `whoami` /var/lib/tapdb   # Or substitute another user
    sudo chown `whoami` /var/log/tapdb   # Or substitute another user
    ```
2. 运行 TapDB

    要运行 TapDB，请在系统提示符下运行tapdb进程。

    ```
    tapdb --dbpath /var/lib/tapdb --logpath /var/log/tapdb/tapdb.log --fork
    ```

    有关命令行选项--dbpath和--logpath的详细信息，请参阅选项。

3. 验证 TapDB 是否已成功启动。

    检查日志文件 `/var/log/TapDB/tapdb.log` 中以下行的进程输出，验证 TapDB 是否成功启动：

    ```
    [initandlisten] waiting for connections on port 27017
    ```

    可能会在进程输出中看到非严重警告。只要看到上述日志行，便可在 TapDB 初次计算期间安心地忽略这些警告。

4. 开始使用 TapDB。

    tapsh在与 相同的主机上启动tapdb 会话。您可以运行不带任何命令行选项的tapsh tapdb，以连接到使用默认端口 在本地主机上运行的27017 }。

    ```
    tapsh
    ```

    有关使用tapsh连接的更多信息，例如连接到在不同主机和/或端口上运行的tapdb实例，请参阅tapsh 文档。

## 更多信息

### 默认绑定本地主机

默认情况下，TapDB 启动时会将bindIp设置为127.0.0.1 ，从而绑定到本地主机网络接口。这意味着tapdb只能接受来自同一计算机上运行的客户端的连接。远程客户端将无法连接到tapdb ，并且tapdb将无法初始化副本集，除非将此值设置为可从远程客户端访问的有效网络接口。

该值可通过以下任一方式配置：

- 在 TapDB 配置文件中使用bindIp ，或

- 通过命令行参数--bind_ip

:::warning

在绑定到非本地主机（例如可公开访问）的 IP 地址之前，请确保您已保护集群免遭未经授权的访问。

::::
