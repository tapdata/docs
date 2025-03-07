# TapData Shell 介绍

import Content from '../reuse-content/_enterprise-and-cloud-features.md';

<Content />

TapData Shell 是 TapData 实时数据平台提供的命令行工具套件，基于[变更数据捕获](../introduction/change-data-capture-mechanism.md)（CDC）技术，帮助用户高效执行流式数据处理任务。除了通过[图形化界面](../user-guide/data-development/create-task.md)使用 TapData 产品外，您还可以通过交互式命令行或 Python 程序的方式来实现同构/异构数据库的实时处理，满足灵活、自动化的数据集成和流式处理场景，例如构建实时宽表、实时物化视图等。

## 工作原理

![TapData Shell 工作原理](../images/tapshell_introduction.png)

TapData Shell 典型应用场景如上，数据处理流程主要包括以下步骤：

- **数据采集**：通过 TapData CDC 连接并监控数据源中的更新事件（如新增、更新、删除操作），并将其转化为数据流。
- **数据流处理**：支持用户使用命令行、编程或图形化界面对数据流进行实时处理，包括数据的合并、清洗、转换等复杂操作。
- **数据存储或输出**：将处理后的数据流保存到物化视图中，以支持快速查询和应用服务；或者直接将数据流发送至下游数据库或消息队列（如 Kafka）中，实现数据的快速传递。

