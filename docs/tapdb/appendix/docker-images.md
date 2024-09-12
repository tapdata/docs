# Docker 镜像说明

对于麒麟、欧拉、龙蜥等操作系统提供了部分镜像包；

## 导入镜像包

tapdb-4.4xcl-x86_64-kylin-v10-sp2.tgz, 

表示 TapDB v4.4(对应 MongoDB v4.4), 架构是 x86_64;

系统环境是 Kylin v10 SP2;

```shell
# 导入镜像文件
sudo docker load -i tapdb-4.4xcl-x86_64-kylin-v10-sp2-img.tgz
```

## 容器使用

默认情况下, 

DB storage 在容器的 `/data/db` 目录; 

license文件在容器中的路径是, `/tapdb/config/license.txt`; 

也可以自定义;

```shell
# 默认情况启动容器
sudo docker run -it \
--name tapdb \
-v <本地license文件所在目录>:/tapdb/config \
-p 27017:27017 \
tapdb-4.4xcl-x86_64-kylin-v10-sp2:x86_64
```

也可以自定义传入启动参数

```shell
# 自定义启动参数
sudo docker run -itd \
--name tapdb \
-v <本地license文件所在目录>:/tapdb/config \
-p 27017:28000 \
tapdb-4.4xcl-x86_64-kylin-v10-sp2:x86_64 \
tapdb --dbpath /tapdb/db --port 28000 --bind_ip_all --license=/tapdb/config/license.txt
```


在容器的 `/tapdb/config/tapdb.conf`, 有 tapdb 启动配置文件样例, 也可以指定配置启动容器;

```shell
# 自定义配置文件启动
sudo docker run -itd \
--name tapdb \
-v <本地配置文件所在目录>:/tapdb/config \
-p 27017:27017 \
tapdb-4.4xcl-x86_64-kylin-v10-sp2:x86_64 \
tapdb --config /tapdb/config/tapdb.conf --license=/tapdb/config/license.txt
```

在容器的 `/tapdb/config/license.txt`, 是 tapdb 服务启动的授权文件, 如果过期, 可用新的 license 文件覆盖;

```shell
sudo docker cp ./license.txt <容器>:/tapdb/config/
```
