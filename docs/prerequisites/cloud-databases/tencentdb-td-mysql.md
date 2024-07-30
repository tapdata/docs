# TencentDB TD-SQL

TDSQL MySQL版（TDSQL for MySQL）是部署在腾讯云上的一种支持自动水平拆分、Shared Nothing 架构的分布式数据库。本文介绍如何在 TapData 平台上连接 TencentDB TD-SQL。

## 支持版本

TD-SQL 5.0、5.1、5.5、5.6、5.7、8.x

## 配置说明

* 账号与权限设置，见[创建账号](https://cloud.tencent.com/document/product/557/82992)、[修改权限](https://cloud.tencent.com/document/product/557/82993)。
* 如需将本数据源作为源库执行增量数据同步，需依赖于数据库的 Binlog 功能，默认已开启，更多介绍，见 [Binlog 保留设置](https://cloud.tencent.com/document/product/236/53513)。
* 从该数据源同步至其他异构数据库时，如果存在表级联设置，因该级联触发产生的数据更新和删除不会传递到目标。如需要在目标端构建级联处理能力，可以视目标情况，通过触发器等手段来实现该类型的数据同步。