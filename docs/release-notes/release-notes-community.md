# TapData Community 更新日志

import Content from '../reuse-content/_community-features.md';

<Content />

本文介绍 TapData Community 近期版本的更新日志，更多早期版本，请参见 [GitHub Release 页面](https://github.com/tapdata/tapdata/releases)。

## 3.8.0

### 功能优化

* 优化任务的表模型主键和索引的展示方式
* 优化模型推演逻辑，支持在引擎直接进行模型推演

### 问题修复

* 修复数据源异常处理存在忽略部分异常的问题
* 修复时间字段做关联键的聚合任务，反查不到数据的问题
* 修复挖掘任务延迟时间异常的问题
* 修复 MySQL 作为源时，大表初始化同步会占用大量数据库内存的问题

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