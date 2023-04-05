# 一键自动流转数据

在数据服务平台模式下，您只需要简单地拖动源表至所需层级，即可一键生成数据管道并自动启动任务，极大简化任务配置流程，本文介绍如何实现数据在不同层级间的流转，并最终为提供给终端业务。

## 操作步骤

1. 登录 Tapdata 平台。

2. 在左侧导航栏，单击**数据面板**。

3. 在本页面，您可以直观地看到您已录入的数据源信息，Tapdata 基于数据治理和流转顺序，展示了四个层级。

   ![数据服务平台页面](../../../images/view_daas_dashboard.png)

   :::tip

   关于各层级的详细说明，见[数据服务平台分层介绍](enable-daas-mode.md)。

   :::

4. 将数据同步至平台缓存层。

   1. 在**源数据层**，单击![](../../../images/search_icon.png)图标，找到您需要同步的表，将其拖动至平台缓存层。

   2. 在弹出的对话框中，填写表前缀并单击**确定**，本案例中，我们要同步的表为 **customer**，此处填写前缀为 **MySQL**，那么在平台缓存层中，该表名为 **FDM_MySQL_customer**。

      完成操作后，Tapdata 将自动创建一个数据复制任务，将您选择表（含全量数据）实时同步至平台缓存层并自动校验，您可以单击平台缓存中表名右侧的![](../../../images/detail_icon.png)图标，跳转至任务监控页面来查看任务运行详情。

      ![创建缓存层任务](../../../images/create_cache_task.gif)

5. 将数据同步至平台加工层。

   :::tip

   该操作适用于对平台缓存层的的表进行表结构调整（如增加字段）、合并表、构建宽表等操作，如果缓存层的表已经满足您的需求，则无需执行本步骤，您可以直接发布 API 或将缓存层的表拖动至**数据目标和服务层**。

   :::

   1. 在**平台缓存层**，单击![](../../../images/search_icon.png)图标，找到您需要加工的表，将其拖动至平台加工层。

   2. 在弹出的对话框中，填写表名称并单击**确定**，如果该表名已存在则会覆盖表中已有的数据。

   3. 在平台加工层，找到目标表，单击其右侧的![](../../../images/detail_icon.png)图标，可查看该表关联的任务和表的基本信息，包含列信息、样本数据、Scheme 等信息。

      ![查看任务](../../../images/view_curated_task.png)

   4. （可选）如需针对该表执行自定义的 ETL 加工，单击图标![](../../../images/detail_icon.png)图标后，选择**任务**标签，单击相关任务名称进入任务监控页面，可在该页面停止并编辑任务，基于业务需求加入相关[处理节点](../../data-pipeline/data-development/process-node.md)。具体操作，见[创建数据开发任务](../../data-pipeline/data-development/create-task.md)。

6. 将数据同步至数据目标和服务层。

   1. 从**平台缓存层**或**平台缓存层**中，找到要同步的表，将其拖动至**数据目标和服务层**。

   2. 在弹出的对话框中，填写具有业务意义的任务名称并单击**确定**。

      Tapdata 将自动创建一个数据开发任务，将您的源表实时同步到选定的目标库中，提供给最终业务。

   3. 在页面右侧，单击目标库卡片中生成的任务名称，进入任务配置页面。

   4. 在跳转到的任务配置页面，您可以直接单击右上角的**启动**，也可以基于业务需求加入相关处理节点以实现自定义 ETL 流程，具体操作，见[创建数据开发任务](../../data-pipeline/data-development/create-task.md)。

   
   
   
   

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
    <TabItem value="linux" label="流转至平台缓存层" default>
    <ul>
    <li>在<b>源数据层</b>，单击<img src='https://deploy-preview-67--tapdata.netlify.app/img/search_icon.png'></img>图标，找到您需要同步的表，将其拖动至平台缓存层。</li>
    <p></p>
    <li>在弹出的对话框中，填写表前缀并单击<b>确定</b>，本案例中，我们要同步的表为 <b>customer</b>，此处填写前缀为 <b>MySQL</b>，那么在平台缓存层中，该表名为 <b>FDM_MySQL_customer</b>。</li>
    <p>完成操作后，Tapdata 将自动创建一个数据复制任务，将您选择表（含全量数据）实时同步至平台缓存层并自动校验，您可以单击平台缓存中表名右侧的<img src='https://deploy-preview-67--tapdata.netlify.app/img/detail_icon.png'></img>图标，跳转至任务监控页面来查看任务运行详情。</p>
    <img src='https://deploy-preview-67--tapdata.netlify.app/img/create_cache_task.gif'></img>
    <li>在平台加工层，找到目标表，单击其右侧的<img src='https://docs.tapdata.io/img/detail_icon.png'></img>图标，可查看该表关联的任务和表的基本信息，包含列信息、样本数据、Scheme 等信息。
    </li>
    <li>停止 Agent：<code>./tapdata stop</code>
    </li>
    </ul>
   </TabItem>
   <TabItem value="windows" label="流转至平台加工层">
    <p>进入 Agent 的安装目录，选择执行下述操作：</p>
    <ul>
    <li>查看 Agent 状态：双击应用程序 <b>sstatus.bat</b>
    </li>
    <li>启动 Agent：双击应用程序 <b>start.bat</b> 或 <b>tapdata.exe</b>
    </li>
    <li>停止 Agent：双击应用程序 <b>stop.bat</b>
    </li>
    </ul>
   </TabItem>
   <TabItem value="dockerandmac" label="流转至数据目标和服务层">
    <ol>
    <li>执行 <code>docker ps</code> 获取容器 ID。
    </li>
    <p></p>
    <li>执行下述格式的命令进入容器命令行。
    <pre>
    docker exec -it 容器ID /bin/bash</pre>
    <p>需替换命令中的容器 ID，例如 <code>docker exec -it 1dbee41b4adc /bin/bash</code>。</p>
    </li>
    <li>在容器命令行中，进入 Agent 的安装目录，然后选择执行下述命令：
    <ul>
    <li>查看命令帮助：<code>./tapdata help</code>
    </li>
    <li>查看 Agent 状态：<code>./tapdata status</code>
    </li>
    <li>启动 Agent：<code>./tapdata start</code>
    </li>
    <li>停止 Agent：<code>./tapdata stop</code>
    </li>
    </ul>
    </li>
    </ol>
   </TabItem>
  </Tabs>

   