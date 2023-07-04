# MongoDB

安装 Agent 后，您需要在 Tapdata Cloud 平台为 Agent 和 MongoDB 建立连接，完成操作后即可在数据复制/开发任务中使用该数据源。本文介绍建立连接前的准备工作（如授权账号等）。

## 支持版本

MongoDB 3.2、3.4、3.6、4.0、4.2

:::tip

Tapdata Cloud 基于 MongoDB 的 Change Stream 实现，此特性在 MongoDB 4.0 开始支持，因此，推荐源和目标数据库的版本为 4.0 及以上。

:::

## 作为源库

1. 保障源库的架构为副本集或分片集群，如果为单节点架构，您可以将其配置为单成员的副本集以开启 Oplog。
   具体操作，见[如何将单节点转为副本集](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/)。

2. 配置充足的 Oplog 存储空间，至少需要容纳 24 小时的 Oplog。
   具体操作，见[修改 Oplog 大小](https://docs.mongodb.com/manual/tutorial/change-oplog-size/)。

3. 根据权限管控需求选择下述步骤，创建用于数据同步/开发任务的账号并授予权限。

   :::tip
   由于分片服务器不会向 config 数据库获取用户权限，因此，当源库为分片集群架构时，您需要在每个分片的主节点上创建相应的用户并授予权限。
   :::

   * 授予指定库（以 **demodata** 库为例）的读权限

     ```bash
     use admin
     db.createUser(
       {
         user: "tapdata",
         pwd: "my_password",
         roles: [
            { role: "read", db: "demodata" },
            { role: "read", db: "local" },
            { role: "read", db: "config" },
            { role: "clusterMonitor", db: "admin" },
         ]
       }
     )
     ```
     
   * 授予所有库的读权限。
   
     ```bash
     use admin
     db.createUser(
       {
         user: "tapdata",
         pwd: "my_password",
         roles: [
         { role: "readAnyDatabase", db: "admin" },
            { role: "clusterMonitor", db: "admin" },
      ]
       }
      )
     ```

4. 在设置 MongoDB URI 时，推荐将写关注级别设置为大多数，即 `w=majority`，否则可能因 Primary 节点异常宕机导致的数据丢失文档。

5. 源库为集群架构时，为提升数据同步性能，Tapdata Cloud 将会为每个分片创建一个线程并读取数据，在配置数据同步/开发任务前，您还需要执行下述操作。

   * 关闭源库的均衡器（Balancer），避免块迁移对数据一致性的影响。具体操作，见[如何停止平衡器](https://docs.mongodb.com/manual/reference/method/sh.stopBalancer/)。
   * 清除源库中，因块迁移失败而产生的孤立文档，避免 _id 冲突。具体操作，见[如何清理孤立文档](https://docs.mongodb.com/manual/reference/command/cleanupOrphaned/)。



### 作为目标库

授予指定库（以 **demodata** 库为例）的写权限，并授予 **clusterMonitor** 角色以供数据验证使用，示例如下：

```bash
use admin
db.createUser(
  {
    user: "tapdata",
    pwd: "my_password",
    roles: [
       { role: "readWrite", db: "demodata" },
       { role: "clusterMonitor", db: "admin" },
    ]
  }
)
```

:::tip

仅当 MongoDB 为 3.2 版本时，需要授予 local 数据库的读权限。

:::



## 下一步

[连接 MongoDB 数据库](../../../user-guide/connect-database/certified/connect-mongodb.md)

