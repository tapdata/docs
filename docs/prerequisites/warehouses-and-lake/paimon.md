---
pdkId: paimon-plus
---

# Paimon Plus

import Content1 from '../../reuse-content/_enterprise-and-community-features.md';

<Content1 />

Paimon Plus 是 TapData 提供的 [Apache Paimon](https://paimon.apache.org/) 连接器。Apache Paimon 是一种数据湖格式，支持使用 Flink 和 Spark 构建实时湖仓架构。TapData 支持将 Paimon Plus 作为源或目标库，用于批量和实时数据同步。

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 支持版本

Apache Paimon 0.8.2 及以上版本

## 支持同步的操作

- **DML**：INSERT、UPDATE、DELETE
- **DDL**：不支持采集或应用 DDL 操作。

:::tip

- 作为源库时，支持全量读取和基于 Paimon Snapshot 的增量读取。任务首次进入增量且没有可用断点时，将从当时最新 Snapshot 的下一个 Snapshot 开始读取，不回放此前的历史变更。
- 作为目标库时，不支持运行时动态模型变更。如需创建或调整目标表结构，请在任务启动前完成。

:::

## 支持的数据类型

| Paimon 类型 | TapData 类型 |
| --- | --- |
| BOOLEAN | TapBoolean |
| TINYINT、SMALLINT、INT、BIGINT | TapNumber |
| FLOAT、DOUBLE、DECIMAL | TapNumber |
| CHAR、VARCHAR、STRING | TapString |
| BINARY、VARBINARY | TapBinary |
| DATE | TapDate |
| TIME(0-3) | TapTime |
| TIMESTAMP、TIMESTAMP_LTZ | TapDateTime |

使用 TapData 自动创建目标表时，TapArray、TapMap、TapRow 和 TapRaw 类型将映射为 Paimon STRING，并以 JSON 字符串存储。连接器不会自动迁移已有目标列，也不支持向已有的 Paimon ARRAY、MAP、ROW、MULTISET 或 VARIANT 列写入数据。

:::tip

您可以增加[类型修改](../../user-guide/data-development/process-node.md#类型修改)处理节点，调整写入目标表的数据类型。

:::

## 注意事项

- 将 Paimon Plus 作为源库时，TapData Agent 需要访问仓库元数据和表数据，并具备列举数据库、列举表、读取表结构和数据文件的权限。
- 增量读取时，Paimon 的 INSERT 和 UPDATE_AFTER 会转换为插入事件，DELETE 和 UPDATE_BEFORE 会转换为删除事件。因此，一次更新可能表现为“删除旧记录 + 插入新记录”。如果下游依赖原生 UPDATE 事件，请先验证更新和删除场景的处理结果。
- 如需向目标表执行更新或删除操作，请为表设置主键；对于大表，可根据查询和写入特点设置分区。
- Paimon 不支持传统索引，仅支持主键。
- 将 Paimon Plus 作为目标库并开启软删除时，TapData 会将 DELETE 转换为带删除标记的 UPDATE。由于该操作需要完整行数据，源端 DELETE 事件必须提供完整的 before 数据，否则主键外字段可能写入 null。当源库为 MongoDB 6.0 及以上版本时，请开启节点的[文档原像](../on-prem-databases/mongodb.md#节点高级特性)功能；其他源端应确保 CDC 日志包含删除前的完整行数据。

## 连接 Paimon Plus

1. [登录 TapData 平台](../../user-guide/log-in.md)。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建**。

4. 在弹出的对话框中，搜索并选择 **Paimon Plus**。

5. 根据下述说明填写连接信息。

   - **基本设置**
     - **连接名称**：填写具有业务意义的独有名称。
     - **连接类型**：选择将 Paimon Plus 作为源库或目标库。
     - **仓库路径**：填写 Paimon 存储数据的根路径。S3 路径示例为 `s3://bucket/path`，HDFS 路径示例为 `hdfs://namenode:port/path`，OSS 路径示例为 `oss://bucket/path`，本地文件系统路径示例为 `/local/path/to/warehouse`。作为源库时，需要具备读取仓库元数据和表数据的权限；作为目标库时，还需要具备写入、创建和删除权限。
     - **存储类型**：根据 Paimon 仓库使用的存储选择 S3、HDFS、OSS 或本地文件系统。

       ```mdx-code-block
       <Tabs className="unique-tabs">
       <TabItem value="S3" default>
       ```

       支持 AWS S3、MinIO 等兼容标准 S3 协议的对象存储，需要填写下述配置：

       * **S3 端点**：填写包含端口号的 S3 服务端点，例如 `http://192.168.1.57:9000/`。
       * **S3 访问密钥**：填写访问密钥 ID。
       * **S3 密钥**：填写访问密钥对应的密钥。
       * **S3 区域**：填写 S3 服务所在区域，例如 `us-east-1`。
       * **权限要求**：作为源库时，需要具备列举 Bucket、列举目录和读取对象的权限；作为目标库时，还需要具备写入和删除对象的权限。

       </TabItem>
       <TabItem value="HDFS">

       使用 HDFS 存储时，需要填写下述配置：

       * **HDFS 主机**：填写 NameNode 主机名，例如 `192.168.1.57`。
       * **HDFS 端口**：填写 NameNode 端口号，例如 `9000`。
       * **HDFS 用户**：填写操作 HDFS 的用户，例如 `hadoop`。
       * **权限要求**：作为源库时，HDFS 用户需要具备仓库路径及其子目录的读取和执行权限；作为目标库时，还需要具备写入、创建和删除权限。

       </TabItem>
       <TabItem value="OSS">

       使用阿里云 OSS 存储时，需要填写下述配置：

       * **OSS 端点**：填写 OSS 服务端点，例如 `https://oss-cn-hangzhou.aliyuncs.com`。
       * **OSS 访问密钥**：填写访问密钥 ID。
       * **OSS 密钥**：填写访问密钥对应的密钥。
       * **权限要求**：作为源库时，需要具备列举 Bucket、列举目录和读取对象的权限；作为目标库时，还需要具备写入和删除对象的权限。

       </TabItem>
       <TabItem value="Local">

       填写 TapData Agent 所在服务器能够访问的本地文件系统路径。作为源库时，Agent 运行用户需要具备仓库路径及其子目录的读取权限；作为目标库时，还需要具备写入、创建和删除权限。

       </TabItem>
       </Tabs>

     - **数据库名称**：填写 Paimon 数据库名称，默认为 `default`。一个连接对应一个数据库，如需访问多个数据库，请分别创建连接。
   - **高级设置**
     - **Agent 设置**：默认为**平台自动分配**，也可以手动指定 Agent。
     - **模型加载时间**：数据源中的模型少于 10,000 个时，每小时更新一次模型信息；超过 10,000 个时，系统将在指定时间每天更新一次。

6. 单击页面下方的**连接测试**。测试通过后，单击**保存**。

   :::tip

   如连接测试失败，请根据页面提示检查仓库路径、存储凭据、网络连通性和访问权限。

   :::

## 节点高级特性

在配置数据同步或转换任务时，可以在 Paimon Plus 节点的高级配置中设置建表与写入参数。将 Paimon Plus 作为源节点时，连接器会自动加载已有源表，并按照源表自身的 Schema、分区、分桶及其他表属性读取数据，无需重复设置。

### 表结构与存储

以下设置主要在目标表不存在、由 TapData 自动创建目标表时生效。对于已有目标表，TapData 沿用其表结构和表属性，不会自动改写。

| 配置 | 说明 |
| --- | --- |
| **Hash 键** | 默认关闭。开启后，如果主键或更新条件字段超过 5 个，TapData 将在自动创建的目标表中增加 `_hash_key` 字段并以其作为主键，用于降低宽主键场景的写入开销。 |
| **分区键** | 默认为空。用于指定自动创建目标表的分区字段；置空表示不使用分区。 |
| **分桶模式** | 默认为**动态模式**。支持动态模式、延迟分桶和固定模式。动态模式适合通用场景；延迟分桶仅适用于主键表，由 Paimon 在后台调整桶数；固定模式需要同时设置**分桶数量**。 |
| **分桶数量** | 默认为 **1**，仅在选择固定模式时显示，用于指定自动创建目标表的桶数。 |
| **文件格式** | 默认为空，表示使用 Paimon 默认值；也可以选择 ORC、Parquet、Avro、CSV 或 JSON。 |
| **压缩格式** | 默认为空，表示使用 Paimon 默认值；也可以选择 None、Snappy、LZ4、ZSTD、GZIP 或 BZIP2。 |
| **表属性** | 默认为空。可以通过键值对添加 Paimon 表属性。连接器仅支持同步执行 Snapshot 过期操作；如果设置 `snapshot.expire.execution-mode`，其值必须为 `SYNC`。已有表使用 `ASYNC` 时，任务也会在写入前报错。 |
| **目标文件大小（MB）** | 默认为 **128 MB**，可设置范围为 32～1024 MB，用于控制 Compaction 后的目标文件大小。 |

### 写入与 Compaction

| 配置 | 说明 |
| --- | --- |
| **写入缓冲区大小（MB）** | 默认为 **256 MB**，可设置范围为 64～2048 MB。调大后可以提高吞吐量，同时会增加内存占用。 |
| **数据磁盘溢写** | 默认关闭。开启后，写入缓冲区可以将数据溢写到磁盘。 |
| **磁盘溢写容量（GB）** | 仅在开启数据磁盘溢写后显示。默认为 **1 GB**，可设置范围为 1～10 GB，用于限制溢写数据占用的磁盘空间。 |
| **磁盘临时目录** | 仅在开启数据磁盘溢写后显示。默认为 `/tmp`，用于存放溢写数据。请确保 TapData Agent 对该目录具有读写权限，并预留足够空间。 |
| **批量累积大小** | 默认为 **100000**，可设置范围为 0～1000000。达到该记录数后触发提交；设置为 0 表示写入后立即提交。 |
| **提交间隔（毫秒）** | 默认为 **30000** 毫秒，可设置范围为 0～300000 毫秒。达到该时间间隔后触发提交；设置为 0 表示不按时间触发提交。 |
| **启用异步提交** | 默认启用。开启后，TapData 在后台提交已累积的数据，减少提交操作对数据写入的阻塞。 |
| **异步提交并发数** | 默认为 **1**，可设置范围为 1～16，用于限制同时提交的物理表数量。仅在启用异步提交后显示。 |
| **启用自动压缩** | 默认启用，用于定期执行 Compaction，合并小文件。 |
| **压缩间隔（分钟）** | 默认为 **30** 分钟，可设置范围为 1～1440 分钟。仅在启用自动压缩后生效。 |
| **是否更新主键** | 默认关闭。开启后，如果主键值发生变化，TapData 会将更新转换为“删除旧记录 + 写入新记录”。源端必须提供更新前数据，否则任务将报错。开启后会增加更新操作的处理开销。 |

### 停止任务与资源回收

任务停止时，Paimon Plus 会先提交已接收的数据，再执行一次最终 Compaction，并等待相关任务退出后清理临时资源。通常建议保留以下默认值；当目标表 Compaction 耗时较长时，可以适当调大。

| 配置 | 说明 |
| --- | --- |
| **STOP 总超时（秒）** | 默认为 **180** 秒。限制等待数据提交、最终 Compaction 和资源清理完成的总时间。 |
| **最终 Compaction 超时（秒）** | 默认为 **120** 秒。限制停止阶段最终 Compaction 可使用的时间；超时后连接器将请求取消 Compaction。 |
| **Compaction 取消宽限（秒）** | 默认为 **30** 秒。请求取消 Compaction 后，连接器在该时间内等待 Compaction 实际退出。 |

上述三个参数均为节点级设置，需要填写正整数，不支持按表设置。如果超过总超时时间，或者 Compaction 在取消宽限时间内仍未退出，任务将报告停止失败。为避免删除仍在使用的文件，连接器会保留相关临时资源，直至原进程退出。
