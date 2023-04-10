# 产品运维

本文列出 Tapdata 运维相关的常见问题。

## 如何启停服务？

登录 Tapdata 平台后，在**系统管理** > **集群管理**中，可选择要目标服务，执行启停服务。

![启停服务](../images/start_and_stop_service.png)

除本方法外，您也可以通过内置  tapdata 命令工具来执行启停操作，该工具的在 Tapdata 安装目录中，可通过 `./tapdata help` 查看命令帮助信息，输出示例如下：

```bash
./tapdata help
 _______       _____  _____       _______
|__   __|/\   |  __ \|  __ \   /\|__   __|/\    
   | |  /  \  | |__) | |  | | /  \  | |  /  \   
   | | / /\ \ |  ___/| |  | |/ /\ \ | | / /\ \  
   | |/ ____ \| |    | |__| / ____ \| |/ ____ \ 
   |_/_/    \_\_|    |_____/_/    \_\_/_/    \_\ 

WORK DIR:/root/tapdata
usage: tapdata [option] [subsystem]
Option:
  start            Start Tapdata
  stop             Stop Tapdata
  restart          Restart Tapdata
  status           Check the running status
  init             Initialize Tapdata Configuration
  resetpassword    Reset MongoDB password or certificate key file password
  --version        Tapdata version
  help             Show this usage information
  
Subsystem:
  frontend         Tapdata management portal
  backend          Data Processing Node
  apiserver        API Server Node
```





## 如何查看运行日志？

在 2.15 之前版本，日志分散存放在 Tapdata 安装目录中的各文件夹中，从 2.15 版本开始，日志信息集中存放在安装目录下的 logs 目录中。



## 如何调整 Java 可用的内存大小？

默认情况下，可用的内存为 4 GB，如需调整，可前往 Tapdata 安装目录下的配置文件 **application.yml**，编辑该文件，根据服务器的可用内存和任务负载调整内存配置信息，例如配置为 `tapdataJavaOpts: "-Xms8G -Xmx16G"`，即表示初始内存 8G，最大内存 16G，示例如下：

```yaml
tapdata:
    cloud:
        accessCode: ""
        retryTime: '3'
        baseURLs: ""
    mode: cluster
    conf:
        tapdataPort: '3030'
        backendUrl: 'http://127.0.0.1:3030/api/'
        apiServerPort: '3080'
        apiServerErrorCode: 'true'
        tapdataJavaOpts: ""
        SCRIPT_DIR: etc
        reportInterval: 20000
        uuid: 093288a0-9ab9-4752-bd1c-7163aea4a7ba
        Decimal128ToNumber: 'false'
        tapdataTMJavaOpts: '-Xmx8G -Xms16G'
```

:::tip

如果内存分配较小，但任务负载较多，Java 程序可能因可用内存不足而不停地执行垃圾回收操作，引起 CPU 使用率激增。

:::

## 管理端子进程不停重启，如何排查？

1. 检查作为 Tapdata 存储引擎的 MongoDB 是否可以正常连接，且版本需为 4.0 及以上。
2. 执行 `./tapdata restart frontend`，随后可以在 logs 目录中找到 frontendDebug.log 文件并查看，通过日志的报错信息分析具体原因。



## 任务调度的规则是什么？

- 任务启动时：查询每个存活的引擎运行任务的数量，将任务调度到运行任务数量最小的引擎运行。
- 心跳超时：引擎会向接管的任务发送心跳信息，当心跳超时后，重新调度任务到运行任务数量最小的存活的引擎。
- 接管超时：调度给存活引擎后，任务未在超时时间内被引擎接管，重新调度任务到运行任务数量最小的存活的引擎。



## Tapdata 所依赖的 MongoDB 库异常，如何排查？

MongoDB 数据库异常可能有多种不同的原因，通常的排查流程如下：

1. 检查硬件资源，例如 CPU、内存、磁盘空间，如果资源不足或者磁盘空间已经用尽，可能会导致数据库异常。

2. 检查 MongoDB 日志文件，尤其是最近几次启动的日志文件。日志文件通常会记录警告、错误、异常等信息，这些信息可以帮助确定问题的来源。

   您也可以通过 mongo shell 登录上数据库查看，更多介绍，见 [getLog](https://www.mongodb.com/docs/manual/reference/command/getLog/)。

3. 登录上 MongoDB 数据，执行 `db.serverStatus()` 命令查看当前数据库的状态及统计信息，分析是否存在性能等问题。更多介绍，见 [serverStatus](https://www.mongodb.com/docs/manual/reference/command/serverStatus/)。

4. 尝试使用 MongoDB 自带的工具进行故障排查，例如使用 `mongotop` 命令查看各个集合的读写操作情况，使用 `mongostat` 命令查看服务器的活动状态。



## Tapdata 所依赖的 MongoDB 库中，库名是什么，集合有哪些？

采用的数据库名称为 tapdata，您可以通过 mongo shell 登录上数据库查看具体包含的集合，示例如下：

```bash
# 进入 tapdata 数据库
use tapdata;

# 查看当前数据库中有哪些集合
show collections;

# 查看指定集合中的数据
db.ClusterState.find();
```

主要关注的集合如下，随着版本更新，可能会有所变化：

- ClusterState: 集群状态信息
- ClusterStateLog: 集群状态日志
- Connections: 连接源属性信息
- DatabaseTypes: 支持的数据源类型(字典数据)
- DataCatalog: 数据目录信息
- DataFlows: 任务属性状态信息
- DataFlowStage: 任务属性阶段信息
- DeleteCaches: 缓存的删除数据
- Events: 任务执行的通知事件
- Jobs: 任务执行过程信息
- LineageGraph: 数据地图
- Logs: 日志信息
- Message: 消息
- MessageQueue: 消息队列
- MetadataDefinition: 元数据定义
- MetadataInstances: 元数据信息
- Modules: 数据发布 - API 发布信息
- nodeConfig: 自定义节点配置信息
- Permission: 权限信息(字典数据)
- Role: 角色
- RoleMapping: 角色有那些权限
- ScheduleTasks: 任务调度信息
- Settings: 系统设置信息
- User: 用户信息
- UserLogs: 用户操作信息
- Workers: 进程信息
- License: License 信息
- TypeMappings: 类型映射



## MongoDB 数据库如何保障高可用？

避免使用单节点架构，可采用副本集部署架构来保障高可用，例如采用三节点的副本集架构时，其中一个节点作为 Primary 节点，其他节点作为 Secondary 节点。

在副本集中，写入 Primary 节点的数据会自动同步至 Secondary 节点上，当 Primary 节点故障或不可用时，副本集会自动选举一个新的 Primary 节点，从而保证数据库的可用性和数据的完整性，最大程度地减少数据库出现故障的时间和影响。

您可以登录 MongoDB 数据库，通过 `rs.status()` 命令查看副本集状态和各节点的状态信息。更多介绍，见 [Replication](https://www.mongodb.com/docs/v4.4/replication/)。
