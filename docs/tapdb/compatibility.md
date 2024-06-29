# 兼容性

为了方便用户对原有 MongoDB 实例的迁移，TapDB 完全兼容 MongoDB；

## 版本号

TapDB 的各个版本都对应于 MongoDB 的版本号；
TapDB 的使用方式也都兼容 MongoDB 各版本的文档。

## 副本集/分片配置

TapDB 的副本集，以及分片集群使用也完全兼容 MongoDB，可以无缝迁移和使用;
配置文件及目录文件的名称都可以沿用 MongoDB 的习惯；

## 举例

TapDB v4.4，相当于 MongoDB v4.4；

tap 命令相当于mongo，详情可以参考 MongoDB 的 [mongo](https://www.mongodb.com/docs/v4.4/reference/program/mongo/#mongodb-binary-bin.mongo)；

tapdb 命令相当于mongod，配置文件启动，方式和 MongoDB 完全兼容，可以参考[配置文件](https://www.mongodb.com/docs/v4.4/reference/configuration-options/)。

taps 命令相当于mongos，使用方式可以参考[mongos](https://www.mongodb.com/docs/v4.4/core/sharded-cluster-query-router/)。