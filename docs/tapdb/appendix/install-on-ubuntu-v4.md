# 在 Ubuntu 上部署（V4 版本）

本文档说明在 Ubuntu Linux 系统上的部署  TapDB 4.0 的具体流程。

# 注意事项

## 平台支持

获取 Ubuntu Linux 二进制安装包（tarball 文件）时，明确安装包对应的架构和系统版本。

这里以支持 x86_64 架构64位 Ubuntu 22.04 LTS（"Jammy"）版本的 TapDB 安装包为例。

# 安装 TapDB

## 前提条件

以下命令在系统中安装TapDB 安装包的依赖文件：

```
sudo apt-get install libcurl4 libgssapi-krb5-2 libldap-2.5-0 libwrap0 libsasl2-2 libsasl2-modules libsasl2-modules-gssapi-mit snmp openssl liblzma5
```

## 安装过程

根据下面步骤，使用 TapDB 安装包手动安装。

> 为了方便用户在原有 MongoDB 实例的迁移，配置文件及目录文件的名称都沿用了 MongoDB 的习惯。
> 
> 如有特别注意的地方，会在文档中标注。

### 1. 创建数据和日志目录

创建 TapDB 实例存放数据的目录。例如：

```
sudo mkdir -p /var/lib/tapdb
```

创建 TapDB 实例存放日志的目录。例如：

```
sudo mkdir -p /var/log/taplog
```

用户启动 TapDB 进程，必须有上述目录的读写权限。例如：

```
sudo chown `whoami` /var/lib/tapdb     # 或者是其他用户名称
sudo chown `whoami` /var/log/taplog   # 或者是其他用户名称
```

### 2. 启动 TapDB

在系统环境中运行`tapdb`来启动 TapDB。

```
tapdb --dbpath /var/lib/tapdb --logpath /var/log/tapdb/tapdb.log --fork
```

### 3. 验证 TapDB 已经启动成功

通过检查进程的日志文件`/var/log/tapdb/tapdb.log`，来验证 TapDB 已经启动成功：

```
[initandlisten] waiting for connections on port 27017
```

日志中出现上面的内容表示启动成功，或者不成功的情况下，日志中会给出相关信息。

### 4. 开始使用 TapDB

在运行 tapdb 的主机上，启动`tap`；tapdb使用27017作为默认端口，可以不带任何命令行选项直接启动 Tap Shell：

```
tap
```