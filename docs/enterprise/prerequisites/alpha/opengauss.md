# openGauss

在创建 openGauss 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。



## 支持版本

OpenGauss 3.0.0 及以上

## 支持字段类型
<details>
<summary><b>单击展开查看详细</b></summary>

- smallint
- integer
- bigint
- numeric
- real
- double precision
- character
- character varying
- text
- bytea
- bit
- bit varying
- boolean
- date
- interval
- timestamp
- timestamp with time zone
- point
- line
- lseg
- box
- path
- polygon
- circle
- cidr
- inet
- macaddr
- uuid
- xml
- json
- tsvector
- tsquery
- oid
- regproc
- regprocedure
- regoper
- regoperator
- regclass
- regtype
- regconfig
- regdictionary

</details>


## 操作步骤

1. 登录 openGauss 数据库，执行下述格式的命令，创建用于数据同步/开发任务的账号。

   ```sql
   CREATE USER username PASSWORD 'password';
   ```

   * **username**：用户名。
   * **password**：密码。

2. 为刚创建的账号授予权限，简易示例如下，推荐基于业务需求设置更精细化的权限控制。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
    <TabItem value="source" label="作为源库" default>
    <pre>GRANT SELECT ON ALL TABLES IN SCHEMA schemaname TO username;</pre>
   </TabItem>
   <TabItem value="target" label="作为目标库">
    <pre>GRANT INSERT,UPDATE,DELETE,TRUNCATE ON ALL TABLES IN SCHEMA schemaname TO username;</pre>
   </TabItem>
  </Tabs>


   * **schemaname**：目标表所属的模型名称。
   * **username**：用户名。



## 下一步

至此，已完成相关准备工作，接下来，您可以连接 [openGauss 数据源](../../user-guide/connect-database/alpha/connect-opengauss.md)。
