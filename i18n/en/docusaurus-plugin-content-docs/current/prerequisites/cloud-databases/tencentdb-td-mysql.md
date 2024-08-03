# TencentDB TD-SQL

TDSQL MySQL Edition (TDSQL for MySQL) is a distributed database deployed on Tencent Cloud, supporting automatic horizontal sharding and Shared Nothing architecture. This document explains how to connect TencentDB TD-SQL on the TapData platform.

## Supported Versions

TD-SQL 5.0, 5.1, 5.5, 5.6, 5.7, 8.x

## Configuration Instructions

* For account and permission settings, refer to [Create Account](https://cloud.tencent.com/document/product/557/82992) and [Modify Permissions](https://cloud.tencent.com/document/product/557/82993).
* To use this data source as a source database for incremental data synchronization, it relies on the database's Binlog feature, which is enabled by default. For more information, see [Binlog Retention Settings](https://cloud.tencent.com/document/product/236/53513).
* When synchronizing from this data source to other heterogeneous databases, if there are table-level cascade settings, the data updates and deletions triggered by these cascades will not be transferred to the target. To implement similar cascading capabilities on the target side, you can use triggers or other methods based on the target's requirements.