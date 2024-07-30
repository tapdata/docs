# Hudi

[Apache Hudi](https://hudi.apache.org/cn/docs/overview) 是一种数据湖的存储格式，在 Hadoop 文件系统之上提供了更新数据和删除数据的能力以及消费变化数据的能力。TapData 支持将 Hudi 作为**目标库**，构建数据传输管道。

## 环境要求

计算引擎的机器上应具备 Hadoop 的环境变量，Hadoop 版本与您的服务端安装的 Hadoop 应保持一致，您可以执行 `hadoop -version` 命令检查您的机器是否满足需求。

## 支持版本

Hudi 0.11.0

## 配置说明

- 集群地址：格式为 ip:port。
- 数据库：数据库名称。
- Kerberos认证
  - 密钥表示文件：上传 user.keytab 文件。
  - 配置文件：上传 krb5.conf 文件。
  - Hive主体配置：`spark2x/hadoop.[hadoop.com@HADOOP.COM](mailto:hadoop.com@HADOOP.COM)`（对应 principal 的值）。
- 账户、密码：分别填写数据库用户名和密码。
- 服务端 hadoop 配置文件：core-site.xml， 通常在服务端 Hadoop 安装目录下的 etc/Hadoop 目录。
- 服务端 hdfs 配置文件：hdfs-site.xml， 通常在服务端 Hadoop 安装目录下的 etc/Hadoop 目录。
- 服务端 hive 配置文件：hive-site.xml， 通常在服务端 Hive 安装目录的配置文件目录。
- 连接参数：`sasl.qop=auth-conf;auth=KERBEROS`