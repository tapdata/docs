# 连接 SelectDB

SelectDB Cloud 是基于 Apache Doris 内核打造的全托管的云原生实时数据仓库服务。本文介绍如何在 Tapdata 中连接 SelectDB Cloud （简称 SelectDB）数据源。

## 支持的版本

SelectDB Cloud 2.0.13 以上


## 操作步骤

1. [登录 SelectDB 完成授权操作](../../prerequisites/beta/selectdb.md)。

2. 登录 Tapdata 平台，单击左侧导航栏的**连接管理**。

4. 单击页面右侧的**创建连接**。

5. 在弹出的对话框中，单击 **Beta 数据源**页签，然后选择 **SelectDB**。

6. 在跳转到的页面，根据下述说明填写 SelectDB 的连接信息。

   ![连接 SelectDB](../../images/connect_selectdb.png)

   - **连接名称**：填写具有业务意义的独有名称。
   - **连接类型**：仅支持**目标**。
   - **FE 地址**：FE 节点的公网连接地址。
   - **JDBC 端口**：数据库的服务端口。
   - **Http 接口地址**：HTTP 协议访问地址，关于地址的介绍及获取方式，见[官方文档](https://cn.selectdb.com/cloud-docs/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/%E8%BF%9E%E6%8E%A5%E4%BB%93%E5%BA%93)。
   - **数据库**：数据库名称，即一个连接对应一个数据库，如有多个数据库则需创建多个数据连接。
   - **账号**、**密码**：分别填写数据库的账号和密码。
   - **包含表**：默认为**全部**，您也可以选择自定义并填写包含的表，多个表之间用英文逗号（,）分隔。
   - **排除表**：打开该开关后，可以设定要排除的表，多个表之间用英文逗号（,）分隔。
   - **agent 设置**：默认为**平台自动分配**，您也可以手动指定 Agent。

7. 单击页面下方的**连接测试**，提示通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::



## 常见错误

连接测试失败，提示：“Unknown error 1044”

如果已经完成[授权](../../prerequisites/beta/selectdb.md)，您可以跟随下述步骤检查并修复该问题，然后重新进行连接测试。

1. 执行下述命令，查看 Grant_priv 字段的值是否为 **Y**，其中 **username** 需替换为真实的用户名。

   ```sql
   SELECT host,user,Grant_priv,Super_priv FROM Doris.user where user='username';
   ```

   

2. 如果值不为 **Y**，则执行下述命令，其中 **username** 需替换为真实的用户名。

   ```sql
   UPDATE Doris.user SET Grant_priv='Y' WHERE user='username';
   FLUSH PRIVILEGES;
   ```

   
