### 限制说明

Tapdata 系统当前版本 Elasticsearch 仅支持作为目标，支持的数据源的类型为：Oracle、MySQL、MongoDB、PostgreSQL、SQL Server。

| **源端**   | **目标端**    | **支持情况** |
| ---------- | ------------- | ------------ |
| Oracle     | Elasticsearch | 支持         |
| MySQL      | Elasticsearch | 支持         |
| MongoDB    | Elasticsearch | 支持         |
| PostgreSQL | Elasticsearch | 支持         |
| SQL Server | Elasticsearch | 支持         |

### 支持版本

Elasticsearch 7.6



### 配置说明

- Host/IP
- Port
- 数据库名
- 集群名

:::tip

Elastic Search 的密码不是必填项，但是如果您要配置的 Elastic Search 数据库有密码，而您未在Tapdata中配置密码的话，检测会不通过。

:::

### 连接测试项

- 检测host/IP 和 port
- 检查账号和密码