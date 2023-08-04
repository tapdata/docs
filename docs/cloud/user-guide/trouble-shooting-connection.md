# 连接测试及失败排查方法

为保障数据源的连接有效性，当您完成[数据连接配置](../prerequisites/README.md)后，可单击**连接测试**以验证数据源配置是否满足要求、网络连通性是否正常等。本文介绍 Tapdata Cloud 常见的检查项目及失败时的排查方法。

- **检查服务连接是否可用**

  Tapdata Cloud 尝试连接数据源，如果网络不可达则提示测试失败，此时请检查网络连通性，如：本地 iptables 配置、网络中的 ACL 限制等。

- **检查用户名密码及数据库是否正确**

  Tapdata Cloud 尝试使用您配置的用户名与密码来连接数据源，如果用户名、密码或数据库名错误则提示测试失败，此时请检查认证信息的正确性。

- **检查数据源版本信息是否可用**

  Tapdata Cloud 对数据源进行版本检测，如果不支持该版本则提示测试失败。

- **加载模型**

  Tapdata Cloud 尝试加载数据源中的表结构信息，如果无法加载则提示测试失败，此时请检查数据库用户是否被授予了相应权限。

- **检查binlog是否开启，并且为ROW级**（适用于 MySQL）

  Tapdata Cloud 检查数据库的 binlog 是否开启、binlog 格式是否为 ROW，如果不满足要求则提示测试失败，设置方法，见 [MySQL 数据源准备工作](../prerequisites/certified/mysql.md)。此时请检查数据库相关配置。

- **检查 cdc 同步同步所需的权限是否授权**

  Tapdata Cloud 检查数据库账号是否具备执行 CDC（变化数据捕捉）所需的权限，如果权限不满足则提示测试失败，此时请检查数据库用户是否被授予了相应权限。

- **检查 archive log 是否开启**（适用于 Oracle）

  Tapdata Cloud 检查是否开启 archive log，如果未开启则测试失败，开启方法，见 [Oracle 数据源准备工作](../prerequisites/certified/oracle.md)。

- **检查 supplemental log 模式是否正确**（适用于 Oracle）

  Tapdata Cloud 检查supplemental log 模式是否正确，如不正确则提示测试失败，设置方法，见 [Oracle 数据源准备工作](../prerequisites/certified/oracle.md)。

- **检查 DDL 语句所需的权限是否授权**（适用于 Oracle）

  Tapdata Cloud 检查数据库账号是否具备 DDL 执行权限，如果权限不满足则提示测试失败，授权示例，见 [Oracle 数据源准备工作](../prerequisites/certified/oracle.md)。



## 推荐阅读

[数据源连接前的准备工作](../prerequisites/config-database/README.md)