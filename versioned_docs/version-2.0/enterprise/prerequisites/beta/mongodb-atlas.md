# MongoDB Atlas

MongoDB Atlas 是 MongoDB 提供的多云应用程序数据平台，在创建 MongoDB Atlas 连接前，您需要在跟随本文完成前置准备工作，完成操作后即可创建连接并在数据复制/开发任务中使用该数据源。

## 支持版本

MongoDB Atlas 5.0.15

:::tip

为保障数据兼容性，MongoDB 间数据同步时，推荐源/目标库均为 5.0 及以上版本。

:::

## 操作步骤

1. 登录 [MongoDB Atlas 平台](https://cloud.mongodb.com/v2)。

2. 设置网络访问控制，确保网络连通性。

   1. 在左侧导航栏，单击 **Network Access**。

   2. 单击右侧的 **ADD IP ADDRESS**。

   3. 在弹出的对话框中，填写 Tapdata 所属的公网地址（CIDR 格式）并单击 **Confirm**。

      ![设置网络白名单](../../images/atlas_add_ip_address.png)

3. 创建账号并授予权限，用于数据库连接。

   1. 在左侧导航栏，单击 **Database Access**。

   2. 在页面右侧，单击 **ADD NEW DATABASE USER**。

   3. 在弹出的对话框中，选择认证方式并设置权限。

      ![创建账号并授权](../../images/atlas_create_user.png)

      本案例中，我们以密码认证方式为例演示操作流程，权限选择说明如下

      * **作为源库**：选择 **Built-in Role** 为 **Only read any database**。

      * **作为目标库**：选择 **Built-in Role** 为 **Read and write to any database**。

   4. 单击 **Add User**。

4. 获取数据库连接信息。

   1. 在左侧导航栏，单击 **Database**。

   2. 找到目标数据库，单击 **Connect**。

   3. 在弹出的对话框中，选择 **Connect your application** 即可获取连接信息，该信息将在连接数据库时用到。

      ![获取连接信息](../../images/atlas_obtain_connection.png)

## 下一步

至此，已完成相关准备工作，接下来，您可以连接您可以 [MongoDB Atlas 数据源](../../user-guide/connect-database/beta/connect-mongodb-atlas.md)。