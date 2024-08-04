# OceanBase (Oracle Mode)

OceanBase is a financial-grade distributed relational database. TapData supports using OceanBase (Oracle) as a target database, helping you quickly build data flow paths. The following describes how to connect to the OceanBase (Oracle Mode) data source on the TapData platform.

## Supported Versions

OceanBase 4.x (Enterprise Edition)

## Preparations

1. Create a user account for data synchronization and grant the necessary permissions.

   :::tip

   OceanBase (Oracle Mode) is highly compatible with Oracle and supports most Oracle features. The authorization requirements for source reading and target writing can fully refer to Oracle's relevant documentation.

   :::

2. If you need to use OceanBase (Oracle Mode) as a source database for incremental synchronization, follow these steps.

    1. Download the [ObLogProxy](https://www.oceanbase.com/softwarecenter-enterprise) service.

       OBLogProxy is OceanBase's incremental log proxy service. It can connect to OceanBase and read incremental logs, providing Change Data Capture (CDC) capabilities for downstream services.

    2. Execute the command `rpm -i oblogproxy-{version}.{arch}.rpm` to install OBLogProxy. The default installation path is /usr/local/oblogproxy.

    3. Modify its configuration file `conf/conf.json`. Find the following configuration and fill in the database account and password. This user must be a sys tenant user and must have read permissions for the OceanBase database under the sys tenant.

       ```bash
       "ob_sys_username": ""
       "ob_sys_password": ""
       ```

       To encrypt the username and password, use `./bin/logproxy -x username` and `./bin/logproxy -x password`.

    4. Execute the following command to start ObLogProxy.

       ```bash
       cd /usr/local/oblogproxy
       ./run.sh start
       ```

    5. Contact TapData technical support to obtain the ob-log-decoder installation package, then execute the following command to extract the package.

       ob-log-decoder is a TapData component tailored for OceanBase-Oracle mode, interfacing with the liboblog CDC component to provide Change Data Capture (CDC) capabilities for downstream services.

       ```bash
       # Extract CDC
       rpm2cpio oceanbase-cdc-4.2.1.4-104010012024030720.el7.x86_64.rpm | cpio -idv
       ```

    6. Copy obcdcServer to the extracted bin directory `${work_directory}/home/admin/oceanbase/bin`.

    7. Then execute the following commands in sequence to start the service. The default database user is `cluster_user=root@sys`.

       ```bash
       export LD_LIBRARY_PATH=${work_directory}/home/admin/oceanbase/lib64/
       ./obcdcServer
       ```

## Connect to Oceanbase(Oracle Mode)


1. Log in to the TapData platform.

2. In the left navigation bar, click **Connection**.

3. Click **Create** on the right side of the page.

4. In the pop-up dialog, search for and select **OceanBase(Oracle)**.

5. On the redirected page, fill in the OceanBase (Oracle) connection information as described below.

    * **Connection Information Settings**
        * **Name**: Enter a unique name with business significance.
        * **Type**: Supports OceanBase (Oracle) as a source or target database.
        * **Host**: Database connection address.
        * **Port**: Database service port, default is **2881**.
        * **Tenant**: Tenant name.
        * **Database**: Database name. Each connection corresponds to one database. If there are multiple databases, multiple data connections need to be created.
        * **User**: Tenant account for the database, in the format `username@tenantname`. For example, to connect to the default test tenant using the `datasync` account, enter `datasync@test`.
        * **Password**: Password corresponding to the tenant account.
        * **Connection Parameters**: Additional connection parameters, default is empty.
        * **RPC Port**: Default is **2882**.
        * **Raw Log Server Host**: Enter the address of the machine where the log service installed during preparations is located. This parameter is only required when using OceanBase as a source database for incremental synchronization.
        * **Raw Log Server Port**: Default is **8190**.
        * **CDC User and Password**: Enter the account and password for Change Data Capture. This parameter is only required when using OceanBase as a source database for incremental synchronization.
        * **Time Zone**: Default is the database's time zone, but you can manually specify it based on business needs.
    * **Advanced Settings**
        * **CDC Log Caching**: Mining the source database's incremental logs, this feature allows multiple tasks to share incremental logs from the source database, avoiding redundant reads and thus significantly reducing the load on the source database during incremental synchronization. Upon enabling this feature, an external storage should be selected to store the incremental log.
        * **Model Load Time**: When the number of models in the data source is less than 10,000, model information is refreshed every hour. If the number of models exceeds 10,000, it is refreshed daily at the time you specify.
        * **Agent Settings**: Default is **automatically allocated by the platform**, but you can manually specify an agent.

6. Click **Test**. After passing the test, click **Save**.

   :::tip

   If the connection test fails, follow the prompts on the page to resolve the issues.

   :::