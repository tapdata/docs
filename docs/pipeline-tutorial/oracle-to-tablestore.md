# Oracle 实时同步至 Tablestore
import Content from '../reuse-content/_all-features.md';

<Content />

阿里云[表格存储](https://help.aliyun.com/document_detail/27280.html)（Tablestore）是面向海量结构化数据提供 Serverless 表存储服务，同时针对物联网场景深度优化提供一站式的IoTstore解决方案。通过 TapData 可以将 Oracle 实时同步至 Tablestore，轻松实现数据的流转，更好满足业务数据架构变化或大数据分析场景。

## 准备工作

在创建同步任务前，请确保您已经配置好了相关数据源：

1. [配置 Oracle 连接](../prerequisites/on-prem-databases/oracle.md)
2. [配置 Tablestore 连接](../prerequisites/warehouses-and-lake/tablestore.md)

同时还请注意参考[数据类型支持说明](../user-guide/no-supported-data-type.md)。

## 配置任务

1. 登录 TapData 服务平台。

2. 在左侧导航栏，单击**数据复制**。

3. 单击页面右侧的**创建**。

4. 在页面左侧，将 Oracle 和 Tablestore 数据源拖拽至右侧画布中，然后将其连接起来。

5. 单击 Oracle 数据源，在右侧面板中选择要同步的表，然后单击 Tablestore 数据源，即可查看到同步后的数据结构。

   ![任务配置](../images/oracle_to_tablestore_task_cn.png)

   :::tip

   由于 Tablestore 单个表的列数量不可超过 32 个，如 Oracle 中待同步表的列数量超过 32，您可以在页面左侧拖拽一个**字段编辑节点**进来，将其作为 Oracle 和 Tablestore 的中间节点连接起来，然后在**字段编辑节点**中屏蔽与业务无关的列以满足需求，更多介绍，见[处理节点](../user-guide/data-development/process-node.md)。

   :::

6. 确认无误后，单击**启动**。

   操作完成后，您可以在当前页面观察任务的执行情况，如 RPS（每秒处理记录数）、延迟、任务时间统计等信息，示例如下：
   
   ![查看任务运行详情](../images/oracle_to_tablestore_monitor_cn.png)

## 任务管理

在任务列表页面，您还可以对任务进行启动/停止、监控、编辑、复制、重置、删除等操作。

具体操作，见[管理任务](https://tapdata.netlify.app/cloud/user-guide/copy-data/manage-task)。