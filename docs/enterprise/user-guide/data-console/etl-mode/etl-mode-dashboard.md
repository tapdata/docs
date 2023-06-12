# 数据集成界面介绍

数据面板功能默认为数据集成模式，该模式适用于数据复制/同步、数据上云或构建 ETL 管道，您只需要简单地拖动源表至目标即可自动完成数据复制任务的创建，可帮助您简化任务配置流程。本文介绍如何使用数据集成模式的界面，帮助您快速了解各功能模块。

:::tip

随着源库承载的任务增多，为最大限度地降低数据提取对源库的影响，同时契合您组织的数据分层治理的理念，您也可以[开启数据服务平台模式（Beta）](../daas-mode/enable-daas-mode.md)，将数据实时同步至平台缓存层。

:::

## 操作步骤

1. 登录 Tapdata 平台。

2. 在左侧导航栏，单击**数据面板**。

3. 在本页面，您可以直观地看到您已录入的数据源信息，接下来，我们将介绍各模块的具体作用。

   ![数据集成模式界面](../../../images/etl_dashboard.png)

   

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
    <TabItem value="5" label="① 切换视图" default>
   <p>单击<img src='/img/switch_icon.png'></img>图标，以目录结构的形式展现数据源信息（再次单击可切换回 Console 视图）。</p>
   <p>如果选中具体的表，您还可以在页面右侧看到表详情信息，各标签页介绍如下：</p>
   <img src='/img/data_category_view.png'></img>
   <ul>
   <li><b>概览</b>：可查看表的基本信息，例如表大小、行数、列信息、样本数据等。</li>
   <li><b>Schema</b>：可查看表的列详情，如列类型、主键、外键、默认值等。</li>
   <li><b>任务</b>：可查看该表相关的任务及其状态，您也可以在该页签中创建新的任务。</li>
   <li><b>血缘</b>：以图的形式直观展现数据血缘关系，帮助您更好地管控数据质量，单击任务节点可直接跳转至相关任务的监控页面。
   <img src='/img/data_lineage.png'></img>
   </li>
  </ul> 

   </TabItem>
    <TabItem value="1" label="② 添加数据源">
    <p>单击<img src='/img/add_icon.png'></img>图标，在弹出的对话框，我们可以添加数据源，选中某个数据源后将跳转至连接配置页面，具体配置方法，见<a href="../../connect-database">连接数据源</a>。</p>
   </TabItem>
   <TabItem value="2" label="③ 搜索表">
   <p>单击<img src='/img/search_icon.png'></img>图标，输入表名的关键词，可帮助您快速定位到具体的表，该操作在其他层级的模块中也可使用。</p>
   <img src='/img/search_table.png'></img>
   </TabItem>
   <TabItem value="3" label="④ 数据源详情">
   <p>在数据连接的右侧，单击<img src='/img/detail_icon.png'></img>图标，页面右侧将展示该数据源的连接信息和关联的任务。</p>
   <img src='/img/data_source_detail.png'></img>
   </TabItem>
   <TabItem value="4" label="⑤ 表详情">

   <p>在表名的右侧，单击<img src='/img/detail_icon.png'></img>图标，页面右侧将展示该表关联的任务和表的基本信息，包含表大小、行数、列信息、样本数据、Scheme（如主键/外键） 等。</p>
   <img src='/img/table_detail.png'></img>
   </TabItem>
   <TabItem value="6" label="⑥ 切换模式">
   <p>单击<img src='/img/setting_icon.png'></img>图标，在弹出的对话框中，可选择<a href="../daas-mode/enable-daas-mode">开启数据服务平台模式（Beta）</a>，将数据实时同步至平台缓存层。</p>
</TabItem>
</Tabs>