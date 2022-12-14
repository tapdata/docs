# 开始数据同步

数据同步功能是 Tapdata Cloud 的重要功能和核心优势。如下图所示，在两个数据存储节点中，Tapdata Agent 作为处理的桥梁，在用户简单设置后即可全自动的将数据从一个节点中读取（源端），并写入至另一个节点（目标端）。在整个过程中，Tapdata Agent 仅作为数据的处理层确保处理的流程符合用户的预期，不会对用户数据做任何形式的上传、保存。

![](../../images/data_synchronization.png)

Tapdata Cloud 支持多种数据存储的接入，不仅支持同类型数据存储（如 MySQL 间，Oracle 间）的数据同步，同时也支持不同类型数据存储（如 Oracle 到 MySQL，MySQL 到 MongoDB）之间以异构方式进行数据同步。



基于Tapdata Agent的可配置性，其支持全量同步、增量同步、全量及增量三种任务类型，您可根据对应的数据场景选择对应的同步模式来满足需求：

* 全量同步：适合一次性的数据迁移、异构场景
* 增量同步（含全量）：适合实时的数据迁移、异构场景。

import DocCardList from '@theme/DocCardList';

<DocCardList />
