# Mock Target


import Content from '../../reuse-content/_all-features.md';

<Content />


Mock Target 可作为目标库，主要用于性能测试场景。

## 参数说明

- `写入间隔 + 写入间隔总数`：用于作为目标时，控制消费事件的频率。表示 `写入间隔` 时间内消费 `写入间隔总数` 条数据，范围：`0 ~ 2147483647`。
- `打印写入日志`：打开时输出接收到的事件数据。