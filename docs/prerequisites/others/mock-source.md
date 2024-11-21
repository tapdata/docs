# Mock Source

import Content from '../../reuse-content/_all-features.md';

<Content />

Mock Source 可作为源库，主要用于性能测试场景。

## 参数说明

- `初始化数据量`：全量同步的数据总数，范围：`0 ~ 9223372036854775807`。
- `增量间隔 + 增量间隔总数`：控制增量产生数据的频率，表示 `增量间隔` 时间内产生 `增量间隔总数` 条数据，范围：`0 ~ 2147483647`。
- `增量事件类型`：表示生成哪些事件类型的数据，如果三个都勾选，则先生成 `插入事件` 再生成 `更新事件` 最后生成 `删除事件`，以这个顺序循环直到结束。
- `表名 + 字段定义`：用于定义作为源时的数据模型。

## 模型

### 字段类型

- `string[($byte)][fixed]`： 字符串

  - `$byte`: 字节长度（默认：`64`）
  - `fixed`: 如果定长字符器加上此标识（默认：非定长）

- number[($precision,$scale)]：数值

  - `$precision`: 长度（范围 `1-40`，默认 `4`）
  - `$scale`: 精度（范围 `0-10`，默认 `1`）

- `boolean`: 布尔值

- `date`: 日期

- `array`: 数组

- `binary`: 字节

- `map`: 键值对

- `time`: 时间

- `datetime`: 时期+时间

- `now`: 当前时间

- `uuid`: UUID

- `serial[($begin,$step)]：自增

  - `$begin`: 开始位置（默认：`1`）
  - `$step`: 步长（默认：`1`）

- `rnumber[($precision)]：数字随机

  - `$precision`: 长度（默认：`4`）

- `rstring[($byte)]`：指定长度的随机字符
  - `$byte`: 字节长度（默认：`64`）
  
- `rdatetime[($fraction)]`：指定精度的日期
  - `$fraction`: 时间精度（默认：`0`，范围 0-9 整数）
  
- `rlongstring[($byte)]`：指定长度的随机长字符
  - `$byte`: 字节长度（默认：`1000`）
  
- `rlongbinary[($byte)]`：指定长度的随机二进制
  - `$byte`: 字节长度（默认：`1000`）

### 字段默认值

生成数据时使用的默认值，不设置时数据为 `null`

## 说明

当 `mode='ConnHeartbeat'` 时，其它参数不需要配置：

- 全量无数据
- 有固定的数据模型：

```
 _tapdata_heartbeat_table=[
   { "type": "string(64)", "pri": true, "name": "id", "def": "$connId" },
   { "type": "now", "pri": false, "name": "ts" }
]
```

- 固定的频率：`1条/1000ms`
- 只产生更新事件