# 部署 Tapdata Enterprise

本文介绍如何在本地环境部署 Tapdata Enterprise。

## 软硬件环境要求

* CPU：8 核
* 内存：16 GB
* 存储空间：100 GB
* 操作系统：CentOS 7 + 或 Ubuntu 16.04 +



## 操作步骤

1. 设置服务器系统参数。

   ```shell
   ulimit -n 1024000 
   echo "* soft nofile 1024000" >> /etc/security/limits.conf 
   echo "* hard nofile 1024000" >> /etc/security/limits.conf 
   systemctl disable firewalld.service 
   systemctl stop firewalld.service 
   setenforce 0 
   sed -i "s/enforcing/disabled/g" /etc/selinux/config 
   ```

   

2. 安装 Java 1.8。

   ```shell
   //查看java版本
   java -version
   //安装java
   yum install java -y
   ```

   

3. 安装 MongoDB，并采用副本集架构，更多介绍，见 [MongoDB 副本集](https://docs.mongodb.com/manual/replication/)。

   ```shell
   mkdir -p /tapdata/mongodb/data
   mkdir -p /tapdata/mongodb/log
   cp mongodb-linux-x86_64-rhel70-5.0.8.tgz  /tapdata/mongodb 
   cd /tapdata/mongodb 
   tar -zxf mongodb-linux-x86_64-rhel70-5.0.8.tar.gz
   
   
   # 启动mongodb
   nohup ./mongod --dbpath=/taptata/mongodb/data --logpath=/taptata/mongodb/log --port=27017 --replSet tapdata &
   
   # 启动mongodb后，进入mongo，并初始化为复制集
   # 注意，如果是已有MongoDB，请勿执行该步骤
   # mongo > rs.initiate()
   ```

   

4. 安装并启动 Tapdata Enterprise，其中 license 文件可[联系我们](mailto:team@tapdata.io)获取。

   ```shell
   cd /tapdata/
   tar -zxf tapdata-v2.4.0.tar.gz
   cd tapdata-v2.4.0
   # 将 license.txt 文件放到 tapdata-v2.4.0 下
   ```

   

5. 注册数据源。

   ```shell
   # 解压 pdk-2.4.zip
   # 按照 registerTapdata.md 指引操作，注册数据源后可以使用
   # cd到pdk 目录执行注册名令
   # 例如:
   java -jar tapdata-pdk-cli-v1.0-SNAPSHOT-jar-with-dependencies.jar register -a 123454-7d3e-4792-dsd1-sds132e422421dsd dist/mongodb-connector-v1.0-SNAPSHOT.jar  -t http://host:port
   ```

   

   

:::tip

   安装时直接使用系统初始化功能启动 Agent，请勿复制已有 workDir 的内容到新环境启动，否则会导致 Agent 的唯一 ID 重复，任务运行不正常。
:::



## 下一步

[连接数据库](connect-database.md)