# OceanBase (MySQL Mode)

**OceanBase** is a natively distributed relational database developed by Ant Group. It is compatible with both MySQL and Oracle syntax and features high availability, high performance, and strong consistency. Tapdata supports OceanBase as both a source and a target database, enabling you to build real-time, multi-source data pipelines for synchronization and integration across heterogeneous systems.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Supported Versions and Architectures

- **Version**: OceanBase 4.0 and above
- **Architecture**: Single-node or clustered deployments

## Supported Data Types

| Category  | Data Types                                                   |
| --------- | ------------------------------------------------------------ |
| String    | CHAR, VARCHAR, TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT, BINARY, VARBINARY |
| Integer   | TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT                    |
| Numeric   | DECIMAL, FLOAT, DOUBLE                                       |
| Date/Time | DATE, TIME, DATETIME, TIMESTAMP, YEAR                        |
| Enum/Set  | ENUM, SET                                                    |
| JSON      | JSON                                                         |
| Binary    | TINYBLOB, BLOB, MEDIUMBLOB, LONGBLOB                         |
| Bit       | BIT                                                          |
| Spatial   | POINT, LINESTRING, POLYGON, GEOMETRY, MULTIPOINT, MULTILINESTRING, MULTIPOLYGON, GEOMCOLLECTION |

## Supported Sync Operations

- **DML**: INSERT, UPDATE, DELETE

  :::tip

  When OceanBase is used as a target database, you can configure write policies through advanced settings in the task node: for insert conflicts, you can choose to update or discard; for update failures, you can choose to insert or just log the errors.

  :::

- **DDL**: ADD COLUMN, CHANGE COLUMN, DROP COLUMN, RENAME COLUMN

## Prerequisites

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="As Source Database" default>
```

1. Ensure the network where the TapData Agent resides is included in the [tenant allowlist](https://en.oceanbase.com/docs/common-oceanbase-database-10000000001971592) of OceanBase and has internal network access.

2. Log in to the [tenant](https://en.oceanbase.com/docs/common-oceanbase-database-10000000001971107) as `root` and create a user for data synchronization using the following command format:

   ```sql
   CREATE USER 'username' IDENTIFIED BY 'password';
   ```

   - **username**: Enter user name.
   - **password**: Corresponding password.

3. Grant read permissions to the user at the database level. You can also apply more fine-grained [permission controls](https://en.oceanbase.com/docs/common-oceanbase-database-10000000001971491) as needed:

   ```sql
   -- Grant read access to a specific database
   GRANT SELECT ON database_name.* TO 'username' IDENTIFIED BY 'password';
   ```

4. To support incremental data reading from OceanBase, follow the guide to [deploy the OceanBase Binlog Service.](https://en.oceanbase.com/docs/community-obd-en-10000000002136447)

   :::tip
   
   The Binlog service consists of OBProxy and obbinlog (formerly oblogproxy). OBProxy handles client access, while obbinlog pulls incremental logs and generates Binlogs. For details, see [Binlog Service Overview.](https://en.oceanbase.com/docs/common-ocp-10000000002168919)
   
   :::

</TabItem>

<TabItem value="As Target Database">

1. Ensure the network where the TapData Agent resides is included in the [tenant allowlist](https://en.oceanbase.com/docs/common-oceanbase-database-10000000001971592) of OceanBase and has internal network access.

2. Log in to the [tenant](https://en.oceanbase.com/docs/common-oceanbase-database-10000000001971107) as `root` and create a user for data synchronization using the following command format:

   ```sql
   CREATE USER 'username' IDENTIFIED BY 'password';
   ```

   - **username**: Enter user name.
   - **password**: Corresponding password.

3. Grant full permissions to the user at the database level. You can also apply more fine-grained [permission controls](https://en.oceanbase.com/docs/common-oceanbase-database-10000000001971491) as needed:

   ```sql
   -- Grant full access to a specific database
   GRANT ALL ON database_name.* TO username;
   ```

   - **database_name**: Database name
   - **username**: Username

</TabItem>
</Tabs>

## Connect to OceanBase (MySQL Mode)

1. [Log in to Tapdata platform](../../user-guide/log-in.md).

2. In the left navigation bar, click **Connections**.

3. Click **Create** on the right side of the page.

4. In the pop-up dialog, search for and select **OceanBase**.

5. On the redirected page, fill in the connection details as described below:

   ![OceanBase Connection Example](../../images/oceanbase_connection.png)

   - **Connection Settings**
     - **Name**: Enter a business-meaningful name for easy identification and management.
     - **Type**: Select whether OceanBase will act as a source or target.
     - **Host**: Host address of the database, typically the OBProxy deployment address. IP or domain name are both supported.
     - **Port**: Access port for the database. Default is **2881**.
     - **Tenant**: Logical tenant name in OceanBase (similar to an instance in traditional databases).
     - **Database**: Name of the database. One connection corresponds to one database; create multiple connections for multiple databases.
     - **User**: Username within the tenant.
     - **Password**: Password corresponding to the username.
     - **Connection Parameter String**: Optional JDBC parameters (e.g., encoding, SSL); leave empty if not needed.
     - **RPC Port**: OBProxy service port, used to access OceanBase. Default is **2882**.
     - **Log Proxy Port**: Port for the log proxy service (used for Binlog/incremental sync). Default is **2983**.
     - **Time Zone**: Default is UTC (UTC+0). If the source or target database uses a different time zone, configure accordingly. Affects time zone–less fields (e.g., `DATETIME`), but not `TIMESTAMP`, `DATE`, or `TIME`.
   - **Advanced Settings**
     - **CDC Log Caching**: [Mining the source database's](../../user-guide/advanced-settings/share-mining.md) incremental logs. This allows multiple tasks to share the same source database’s incremental log mining process, reducing duplicate reads and minimizing the impact of incremental synchronization on the source database. After enabling this feature, you will need to select an external storage to store the incremental log information.
     - **Agent Settings**: Defaults to **Platform Automatic Allocation**, you can also manually specify an agent.
     - **Model Load Time**: If there are less than 10,000 models in the data source, their schema will be updated every hour. But if the number of models exceeds 10,000, the refresh will take place daily at the time you have specified.
     - **Enable Heartbeat Table**: When OceanBase is used as **source and target** or **source**, you can enable this option. Tapdata will create a `_tapdata_heartbeat_table` in the source and update it every 10 seconds for health monitoring (requires proper permissions).

6. Click **Test**. If successful, click **Save**.

   If the connection test fails, follow the on-screen instructions to resolve the issue.

## Node Advanced Features

When OceanBase (MySQL Mode) is used as a **source node** in a data replication or transformation task, Tapdata provides built-in advanced options to improve performance and handle complex scenarios.

![OceanBase Node Advanced Settings](../../images/oceanbase_advanced_settings.png)

**Single Table Concurrent Read** (Disabled by default): When enabled, Tapdata splits large tables based on partitions and **launches multiple read threads in parallel**, reading different partitions simultaneously. This significantly improves full read performance. Recommended for large tables and when database resources are sufficient.

- **Max Split Count for Single Table**: Default to 16.
- **Single Table Concurrent Read Thread Size**: Default to 8.

These parameters can be adjusted in the UI.