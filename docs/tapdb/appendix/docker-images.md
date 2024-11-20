# Docker 镜像说明

对于麒麟、欧拉、龙蜥等操作系统提供了部分镜像包，本文介绍其使用方法。

## 1. 导入镜像包

### TapDB v4.4 样例

镜像包名称：tapdb-4.4xcl-x86_64-kylin-v10-sp2-img.tgz

`-img` 表示这是一个镜像包； 

`tapdb-4.4xcl-x86_64` 表示 TapDB v4.4版本(对应 MongoDB v4.4)，架构是 x86_64；

`kylin-v10-sp2` 表示系统环境是 Kylin v10 SP2。

```shell
# 导入镜像文件
sudo docker load -i tapdb-4.4xcl-x86_64-kylin-v10-sp2-img.tgz
```

### TapDB v6.3 样例

镜像包名称：tapdb-6.3xcl-amd64-kylin-v10-sp3-image.tar

`-image` 表示这是一个镜像包； 

`tapdb-6.3xcl-amd64` 表示 TapDB v6.3版本(对应 MongoDB v6.3)，架构是 x86_64；

`kylin-v10-sp3` 表示系统环境是 Kylin v10 SP3。

```shell
# 导入镜像文件
sudo docker load -i tapdb-6.3xcl-amd64-kylin-v10-sp3-image.tar
```

## 2. 容器使用

### TapDB v4.4 样例

默认情况下，DB Storage 在容器的 `/data/db` 目录；

license文件在容器中的路径是`/tapdb/config/license.txt`，也可以自定义。

```shell
# 默认情况启动容器
sudo docker run -it \
--name tapdb \
-v <本地license文件所在目录>:/tapdb/config \
-p 27017:27017 \
tapdb-4.4xcl-x86_64-kylin-v10-sp2:x86_64 \
tapdb --license=/tapdb/config/license.txt
```

也可以自定义传入启动参数；

```shell
# 自定义启动参数
sudo docker run -itd \
--name tapdb \
-v <本地license文件所在目录>:/tapdb/config \
-p 27017:28000 \
tapdb-4.4xcl-x86_64-kylin-v10-sp2:x86_64 \
tapdb --dbpath /tapdb/db --port 28000 --bind_ip_all --license=/tapdb/config/license.txt
```


在容器的 `/tapdb/config/tapdb.conf` 提供了启动配置文件样例，您也可以自定义配置来启动容器。

```shell
# 自定义配置文件启动
sudo docker run -itd \
--name tapdb \
-v <本地配置文件和license文件所在目录>:/tapdb/config \
-p 27017:27017 \
tapdb-4.4xcl-x86_64-kylin-v10-sp2:x86_64 \
tapdb --config /tapdb/config/tapdb.conf --license=/tapdb/config/license.txt
```

### TapDB v6.3 样例

数据库启动配置文件 tapdb.conf 样例：
```yaml
systemLog:
   verbosity: 0
   quiet: false
   traceAllExceptions: false
   destination: file
   path: /tapdb/log/tapdb.log
   logAppend: true
   logRotate: rename

processManagement:
   fork: false
   pidFilePath: /tapdb/log/tapdb.pid

storage:
   dbPath: /tapdb/db
   directoryPerDB: true
   engine: wiredTiger
   wiredTiger:
      engineConfig:
         cacheSizeGB: 1
         journalCompressor: snappy
         directoryForIndexes: false
      collectionConfig:
         blockCompressor: snappy
      indexConfig:
         prefixCompression: true

net:
   bindIp: 0.0.0.0
   port: 27017
   maxIncomingConnections: 20000

replication:
   oplogSizeMB: 1024
   replSetName: rs
```

```shell
# 自定义配置文件启动
sudo docker run -itd \
--name tapdb \
-v <本地配置文件和license文件所在目录>:/tmp \
-p 27017:27017 \
tapdata/tapdb:v10-sp3-r6.3 \
/bin/bash -c "mkdir -p /tapdb/db && mkdir -p /tapdb/log && tapdb --config /tmp/tapdb.conf --license=/tmp/license.txt"
```

## 3. 授权文件更新

容器中的 `license.txt` 是 tapdb 服务启动的授权文件，如果过期需及时替换为新的 License 文件。

```shell
sudo docker cp ./license.txt <容器>:/tapdb/config/

# 或者
sudo docker cp ./license.txt <容器>:/tmp
```
