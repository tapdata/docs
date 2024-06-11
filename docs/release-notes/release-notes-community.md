# TapData Community 更新日志

import Content from '../reuse-content/_community-features.md';

<Content />

本文介绍 TapData Community 近期版本的更新日志，更多早期版本，请参见 [GitHub Release 页面](https://github.com/tapdata/tapdata/releases)。

## 3.7.0

### 新增功能

* 新增 Mock Source 和 Mock Target 数据源，可用于数据迁移测试场景

### 功能优化

* 优化启动任务时的跳过错误的交互逻辑

### 问题修复

* 修复任务运行模型与配置模型不一致的问题
* 修复过滤源端数据后，任务事件统计不准确的问题
* 修复 Oracle 和 PostgreSQL 同步场景下，时区处理异常的问题
* 修复连接列表加载速度过慢的问题
* 修复心跳任务重置失败时，可能导致相关联任务无法启动的问题