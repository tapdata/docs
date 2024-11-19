# TapDB 兼容性

## 版本号

* TapDB 的各个版本都对应于 MongoDB 的版本号（TapDB v4.4，相当于 MongoDB v4.4）。
* TapDB 可用的版本从 v4.0 到落后于 MongoDB 的一个主版本号（比如当前 MongoDB 主版本号是 v7.0，那么TapDB可用的版本是 v4.0 ～ v6.0）。
* TapDB 的使用方式也都兼容 MongoDB 各版本的文档。

## 副本集/分片配置

* TapDB 的副本集，以及分片集群使用也完全兼容 MongoDB，可以无缝迁移和使用。
* 配置文件及目录文件的名称都可以沿用 MongoDB 的习惯。

## 语法

* TapDB 兼容 MongoDB 的全部协议和语法。
* `tap` 命令相当于 `mongo`，详情可以参考 MongoDB 的 [mongo](https://www.mongodb.com/docs/v4.4/reference/program/mongo/#mongodb-binary-bin.mongo)。
* `tapdb` 命令相当于 `mongod`，配置文件启动，方式和 MongoDB 完全兼容，可以参考[配置文件](https://www.mongodb.com/docs/v4.4/reference/configuration-options/)。
* `taps` 命令相当于 `mongos`，使用方式可以参考[mongos](https://www.mongodb.com/docs/v4.4/core/sharded-cluster-query-router/)。

## 驱动

* TapDB 兼容 MongoDB 的所有驱动。
* MongoDB 所支持的 C、C++、C#、Go、Java、Kotlin、Node.js、PHP、Python等等都适配于TapDB。