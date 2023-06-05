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

4. 跟随下述流程，一键完成数据流转。

   :::tip
   通过平台加工层，您可以对表进行表结构调整（如增加字段）、合并表、构建宽表等操作，如果缓存层的表已经满足您的业务需求，则无需使用平台加工层，您可以直接发布 API 或将缓存层的表拖动至**数据目标和服务层**。
   :::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
    <TabItem value="cache" label="流转至平台缓存层" default>
    <ol>
    <li>在<b>源数据层</b>，单击<img src='/img/search_icon.png'></img>图标，找到您需要同步的表，将其拖动至<b>平台缓存层</b>。</li>
    <p></p>
    <li>在弹出的对话框中，填写表前缀并单击<b>确定</b>，本案例中，我们要同步的表为 <b>customer</b>，此处填写前缀为 <b>MySQL</b>，那么在平台缓存层中，该表名为 <b>FDM_MySQL_customer</b>。</li>
    <img src='/img/create_cache_task.gif'></img>
    <p>完成操作后，Tapdata 将自动创建一个数据复制任务，将您选择表（含全量数据）实时同步至平台缓存层并自动校验，您可以单击平台缓存中表名右侧的<img src='/img/detail_icon.png'></img>图标，跳转至任务监控页面来查看任务运行详情。</p>
    </ol>
   </TabItem>
   <TabItem value="curated" label="流转至平台加工层">
    <ol>
    <li>在<b>平台缓存层</b>，单击<img src='/img/search_icon.png'></img>图标，找到您需要加工的表，将其拖动至<b>平台加工层</b>。</li>
    <p></p>
    <li>在弹出的对话框中，填写表名称并选择是否启动任务。
    <p></p>
    <ul>
    <li><b>仅保存</b>：仅保存任务链路，页面将提示保存成功，单击提示信息即可跳转到任务配置页面，您可以<a href="../../data-pipeline/data-development/process-node">添加处理节点</a>，实现表结构调整（如增加字段）、合并表、构建宽表等需求，完成设置后单击页面右上角的<b>启动</b>。
    </li>
    <li><b>保存并运行</b>：无需执行额外的操作，由 Tapdata 自动创建一个数据开发任务并运行，将该表实时同步至平台加工层。
    </li>
    </ul></li>
    <p></p>
    <li>在<b>平台加工层</b>，找到目标表，单击其右侧的<img src='/img/detail_icon.png'></img>图标，可查看该表关联的任务和表的基本信息，包含列信息、样本数据、Scheme 等信息。</li>
    <img src='/img/view_curated_task.png'></img>
    </ol>
   </TabItem>
   <TabItem value="target" label="流转至数据目标和服务层">
    <ol>
    <li>从<b>平台缓存层</b>或<b>平台缓存层</b>中，找到要同步的表，将其拖动至<b>数据目标和服务层</b>中的目标数据源中。</li>
    <img src='/img/analyze_customer.gif'></img>
    <p></p>
    <li>在弹出的对话框中，填写具有业务意义的任务名称，然后选择是否启动任务。
    <p></p>
    <ul>
    <li><b>仅保存</b>：仅保存任务链路，此时，您可以单击目标库卡片中的任务名称，在跳转到的任务配置页面<a href="../../data-pipeline/data-development/process-node">添加处理节点</a>，实现更多复杂处理（如数据过滤、增删字段等），完成设置后单击页面右上角的<b>启动</b>。
    </li>
    <li><b>保存并运行</b>：无需执行额外的操作，由 Tapdata 自动创建一个数据开发任务并运行，将该表实时同步至平台加工层。
    </li>
    </ul>
    </li>
    <p></p>
    <p>完成设置后，Tapdata 将自动创建一个数据开发任务，将您的源表实时同步到选定的目标库中，提供给最终业务。您还可以单击目标库卡片中的任务名称，进入任务监控页面查看详细的运行状态，更多介绍，见<a href="../../data-pipeline/data-development/monitor-task">监控任务</a>。</p>
    </ol>
   </TabItem>
  </Tabs>