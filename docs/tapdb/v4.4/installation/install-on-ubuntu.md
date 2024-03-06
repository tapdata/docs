# 概览

本文档说明在 Ubuntu Linux 系统上的部署方式。

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
sudo mkdir -p /var/lib/mongo
```

创建 TapDB 实例存放日志的目录。例如：

```
sudo mkdir -p /var/log/mongodb
```

用户启动 TapDB 进程，必须有上述目录的读写权限。例如：

```
sudo chown `whoami` /var/lib/mongo     # 或者是其他用户名称
sudo chown `whoami` /var/log/mongodb   # 或者是其他用户名称
```

### 2. 启动 TapDB

在系统环境中运行 tapdb **（相当于 MongoDB 的 mongod）** 来启动 TapDB。

```
tapdb --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
```

tapdb 的命令完全兼容 MongoDB 的 mongod，详情可以参考 MongoDB 的 [--dbpath](https://www.mongodb.com/docs/v4.4/reference/program/mongod/#std-option-mongod.--dbpath)，[--logpath](https://www.mongodb.com/docs/v4.4/reference/program/mongod/#std-option-mongod.--logpath) 和 [Options](https://www.mongodb.com/docs/v4.4/reference/program/mongod/#std-label-mongod-options)。

### 3. 验证 TapDB 已经启动成功

通过检查进程的日志文件`/var/log/mongodb/mongod.log`，来验证 TapDB 已经启动成功：

```
[initandlisten] waiting for connections on port 27017
```

日志中出现上面的内容表示启动成功，或者不成功的情况下，日志中会给出相关信息。

### 4. 开始使用 TapDB

在运行 tapdb 的主机上，启动 tap **（相当于 MongoDB 的 mongo）**；如果 tapdb 是使用的默认的27017端口，可以不带任何命令行选项直接启动 Tap Shell：

```
tap
```

tap 的命令完全兼容 MongoDB 的 mongo，详情可以参考 MongoDB 的 [mongo](https://www.mongodb.com/docs/v4.4/reference/program/mongo/#mongodb-binary-bin.mongo)。

## 附加信息

TapDB 也可以通过配置文件启动，方式和 MongoDB 完全兼容，可以参考[配置文件](https://www.mongodb.com/docs/v4.4/reference/configuration-options/)。

TapDB 的[副本集](https://www.mongodb.com/docs/v4.4/reference/glossary/#std-term-replica-set)，以及[分片集群](https://www.mongodb.com/docs/v4.4/tutorial/deploy-shard-cluster/)使用也完全兼容 MongoDB，可以无缝迁移和使用。

TapDB 的分片集路由文件 taps **（相当于 MongoDB 的 mongos）**，使用方式可以参考[mongos](https://www.mongodb.com/docs/v4.4/core/sharded-cluster-query-router/)。