# 数据源/目标

### Tapdata Cloud 支持哪些数据源？

Tapdata Cloud 支持丰富的数据库，包括常见关系型、非关系型以及队列型数据源，详情见[支持的数据库](../introduction/supported-databases.md)。 

### 连接测试失败怎么办？

连接测试的前提是要启动 agent ，请先检查 agent 状态。

创建数据连接时，需要参照页面右侧连接配置帮助，按指南完成相关参数的设定。

![](../images/check_error.png)

### kafka中的主题表达式什么意思

主题表达式是用来匹配消息队列名称的正则表达式，用户可以根据需求定义一个正则表达式来匹配订阅一个或者多个消息队列消费消息。

### 当测试 MySQL 连接时，提示：The server time zone value ' 'is unrecognized

出现该问题时，可以在您的 MySQL 连接的连接串里添加参数：**serverTimezone=Asia/Shanghai**。

![](../images/modify_connection_setting.png)

### Oracle 同步到 SQL Server，Select 权限是否足够？

Oracle 需要一些额外的权限来做 CDC，具体配置与授权，见 [Oracle 准备工作](../prerequisites/on-prem-databases/oracle.md)。



### 数据库有白名单机制，如何设置？

需要在白名单中添加部署 agent 的机器。



### 为 Oracle 建立连接时，如何填写 Schema？

按照建库时设定的 Schema 填写，注意区分大小写。 

在 Oracle 中，Schema（模式）是数据的逻辑结构或模式对象的集合。架构由数据库用户拥有，并与该用户具有相同的名称。每个用户都拥有一个模式，更多介绍，见 [Oracle 官方文档](https://docs.oracle.com/cd/B19306_01/server.102/b14220/schema.htm)。



