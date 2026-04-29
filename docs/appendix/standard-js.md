# 标准 JS 内置函数
import Content from '../reuse-content/_all-features.md';

<Content />

标准 JS 节点只能对数据记录进行处理和运算，如需使用所有的系统内置函数，实现外部调用（如网络、数据库等），可使用[增强 JS 节点](enhanced-js.md)。

使用方法及场景介绍，见 [JS 处理节点](../user-guide/data-pipeline/data-development/process-node#js-process)。

## context

### global

说明：节点维度下的一个任务周期内的 hashMap 容器，可在 js 节点上自定义响应的内容。

示例：

```js
let myVariable = context.global["myVariable"];
if ("undifine" == myVariable || null == myVariable){
  myVariable = context.global["myVariable"] = {
      "key":1,
      "status":false
   }
}
myVariable.key++;
```

## DateUtil

### parse

说明：将各种格式的日期字符串转换为 Date 类型。

示例：

* 一般用法：

  ```javascript
  var dte = DateUtil.parse('2010-01-01 00:00:00'); 
  ```

* 高级用法：`parse(dateString, timeoffset)`，即在转换的同时指定时区偏移量。

  ```javascript
  // 东8区
  var dte = DateUtil.parse('2010-01-01 00:00:00', 8);
  
  // 0时区
  var dte = DateUtil.parse('2010-01-01 00:00:00', 0);
  ```


### determineDateFormat

说明：获取日期格式。

示例：

```javascript
var format = DateUtil.determineDateFormat('2010-01-01 00:00:00');
```

### timeStamp2Date

说明：将时间戳按照指定格式转为日期字符串。

示例：

```javascript
var dteStr = DateUtil.timeStamp2Date(1592233019140, 'yyyy-MM-dd HH:mm:ss');
```

### addYears/addMonths/addDays/addHours/addMinutes/addSeconds

说明：对日期的年/月/日/时/分/秒进行加减运算。支持传入 `Date`（即 `DateTime`）类型。

示例：

```javascript
var dte = DateUtil.addYears(new Date(), 1);
dte = DateUtil.addYears(dte, -1);
```

### sameYear/sameMonth/sameDay/sameHour/sameMinute/sameSecond

说明：对日期的年/月/日/时/分/秒进行比较运算。

示例：

```javascript
if ( DataUtil.sameYear(new Date(), new Date()) ) {
    ...
}
```

:::tip

以下方法在 **4.18 版本**后可用。

:::

### isBefore/isAfter/isEqual

说明：比较两个日期的先后关系，支持传入 `Date`（即 `DateTime`）类型。

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `isBefore(a, b)` | a 是否在 b 之前 | `boolean` |
| `isAfter(a, b)` | a 是否在 b 之后 | `boolean` |
| `isEqual(a, b)` | a 与 b 是否相等 | `boolean` |

示例：

```javascript
var d1 = new Date();
var d2 = DateUtil.addDays(d1, 1);
var before = DateUtil.isBefore(d1, d2);  // true
var after = DateUtil.isAfter(d1, d2);    // false
var equal = DateUtil.isEqual(d1, d1);    // true
```

### compare

说明：比较两个日期，返回整数。a 早于 b 返回负数，相等返回 0，a 晚于 b 返回正数。

示例：

```javascript
var result = DateUtil.compare(d1, d2);  // < 0 表示 d1 早于 d2
```

### isSameDay/isSameMonth

说明：判断两个日期是否在同一天/同一月，可指定时区。

| 方法 | 说明 |
| --- | --- |
| `isSameDay(a, b, zoneId)` | 判断 a 和 b 是否为同一天（`zoneId` 可传 `null` 使用系统默认时区） |
| `isSameMonth(a, b, zoneId)` | 判断 a 和 b 是否为同一月 |

示例：

```javascript
var d1 = new Date();
var d2 = DateUtil.addHours(d1, 2);
var sameDay = DateUtil.isSameDay(d1, d2, null);    // true
var sameMonth = DateUtil.isSameMonth(d1, d2, null); // true
```

### diffMillis/diffSeconds/diffMinutes/diffHours/diffDays

说明：计算两个日期之间的差值（`a - b`），返回对应时间单位的数值。

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `diffMillis(a, b)` | 毫秒差值 | `long` |
| `diffSeconds(a, b)` | 秒差值 | `long` |
| `diffMinutes(a, b)` | 分钟差值 | `long` |
| `diffHours(a, b)` | 小时差值 | `long` |
| `diffDays(a, b)` | 天差值 | `long` |

示例：

```javascript
var d1 = new Date();
var d2 = DateUtil.addHours(d1, 3);
var diffMs = DateUtil.diffMillis(d2, d1);     // 10800000
var diffSec = DateUtil.diffSeconds(d2, d1);   // 10800
var diffMin = DateUtil.diffMinutes(d2, d1);   // 180
var diffHour = DateUtil.diffHours(d2, d1);    // 3
var diffDay = DateUtil.diffDays(d2, d1);      // 0
```

## idGen/UUIDGenerator

### uuid

说明：生成 uuid，如采用 `var str = uuid();`，即可获取随机字符串。

示例：

```javascript
// 下述两种方法均可
var uuid = idGen.uuid();
var uuid = UUIDGenerator.uuid();
```

### objectId

说明：生成 MongoDB ObjectId。

示例：

```javascript
// 下述两种方法均可
var oid = idGen.objectId();
var oid = UUIDGenerator.objectId();
```

### objectIdStr

说明：生成 MongoDB ObjectId 字符串部分。

示例：

```javascript
// 下述两种方法均可
var oidStr = idGen.objectIdStr();
var oidStr = UUIDGenerator.objectIdStr();
```



## HashMap

### put/remove

说明：哈希字典。

示例：

```javascript
var map = new HashMap();
map.put("name", "test");
map.remove("name");
```

## LinkedHashMap

说明：JAVA 内置有序 map 容器

示例：

```js
var map = new LinkedHashMap();//创建
map.put("key", "This is a LinkedHashMap")://向容器中加入key-value键值对
let value = map.get("key");//根据key获取value
let isEmpty = map.isEmpty();//判断容器是否为空
let size = map.size();//获取容器中键值对的数目
map.remove("key");//移出容器中指定键的键值对
```

## ArrayList

### add/remove

说明：数组类型。

示例：

```javascript
var list = new ArrayList();
list.add("test1");
list.remove(0);
```

## Date

说明：日期类型。在 JS 中，`new Date()` 创建的对象实际类型为 `DateTime`，兼容 JavaScript `Date` 的常用方法。

:::tip

以下 Date 对象的实例方法在 **4.18 版本**后可用。

:::

### 构造方法

```javascript
// 获取当前时间
var dte = new Date();

// 通过毫秒时间戳构造
var dte = new Date(1592233019140);
```

### 获取方法（Getter）

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `getFullYear()` | 获取4位数年份 | `int` |
| `getYear()` | 获取年份（返回值为年份减去1900） | `int` |
| `getMonth()` | 获取月份（0-11，0 表示一月） | `int` |
| `getDate()` | 获取日期（1-31） | `int` |
| `getDay()` | 获取星期几（0=周日，6=周六） | `int` |
| `getHours()` | 获取小时（0-23） | `int` |
| `getMinutes()` | 获取分钟（0-59） | `int` |
| `getDateSeconds()` | 获取秒（0-59） | `int` |
| `getMilliseconds()` | 获取毫秒（0-999） | `int` |
| `getTime()` | 获取自 1970-01-01 以来的毫秒数 | `long` |
| `getTimezoneOffset()` | 获取时区偏移量（分钟，正值表示在 UTC 之后） | `int` |

### UTC 获取方法

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `getUTCFullYear()` | 获取 UTC 4位数年份 | `int` |
| `getUTCMonth()` | 获取 UTC 月份（0-11） | `int` |
| `getUTCDate()` | 获取 UTC 日期（1-31） | `int` |
| `getUTCDay()` | 获取 UTC 星期几（0=周日） | `int` |
| `getUTCHours()` | 获取 UTC 小时（0-23） | `int` |
| `getUTCMinutes()` | 获取 UTC 分钟（0-59） | `int` |
| `getUTCSeconds()` | 获取 UTC 秒（0-59） | `int` |
| `getUTCMilliseconds()` | 获取 UTC 毫秒（0-999） | `int` |

### 设置方法（Setter）

| 方法 | 说明 |
| --- | --- |
| `setFullYear(year)` | 设置4位数年份 |
| `setYear(year)` | 设置年份（传入值加上1900为实际年份） |
| `setMonth(month)` | 设置月份（0-11） |
| `setDate(date)` | 设置日期（1-31） |
| `setHours(hours)` | 设置小时（0-23） |
| `setMinutes(minutes)` | 设置分钟（0-59） |
| `setDateSeconds(seconds)` | 设置秒（0-59） |
| `setMilliseconds(ms)` | 设置毫秒（0-999） |
| `setTime(millis)` | 设置自 1970-01-01 以来的毫秒数 |

### UTC 设置方法

| 方法 | 说明 |
| --- | --- |
| `setUTCFullYear(year)` | 设置 UTC 年份 |
| `setUTCMonth(month)` | 设置 UTC 月份（0-11） |
| `setUTCDate(date)` | 设置 UTC 日期（1-31） |
| `setUTCHours(hours)` | 设置 UTC 小时（0-23） |
| `setUTCMinutes(minutes)` | 设置 UTC 分钟（0-59） |
| `setUTCSeconds(seconds)` | 设置 UTC 秒（0-59） |
| `setUTCMilliseconds(ms)` | 设置 UTC 毫秒（0-999） |

### 格式化方法

| 方法 | 说明 | 示例返回值 |
| --- | --- | --- |
| `toDateString()` | 返回日期部分的可读字符串 | `"Wed May 08 2024"` |
| `toTimeString()` | 返回时间部分的可读字符串 | `"14:30:00 GMT+0800"` |
| `toISOString()` | 返回 ISO 8601 格式的 UTC 字符串 | `"2024-05-08T06:30:00.000Z"` |
| `toJSON()` | 返回 JSON 序列化字符串（同 `toISOString()`） | `"2024-05-08T06:30:00.000Z"` |
| `toGMTString()` | 返回 GMT 格式字符串 | — |
| `toUTCString()` | 返回 UTC 格式字符串 | — |
| `toLocaleString()` | 返回本地化日期时间字符串 | — |
| `toLocaleDateString()` | 返回本地化日期字符串 | — |
| `toLocaleTimeString()` | 返回本地化时间字符串 | — |
| `valueOf()` | 返回毫秒时间戳（同 `getTime()`） | — |

### 比较方法

| 方法 | 说明 |
| --- | --- |
| `after(dateTime)` | 当前日期是否在指定日期之后 |
| `before(dateTime)` | 当前日期是否在指定日期之前 |

### 示例

```javascript
var dte = new Date();
var year = dte.getFullYear();      // 获取4位数年份，如 2024
var month = dte.getMonth();        // 获取月份，0-11
var day = dte.getDate();           // 获取日期，1-31
var hours = dte.getHours();        // 获取小时
var iso = dte.toISOString();       // "2024-05-08T06:30:00.000Z"

// 修改日期
dte.setFullYear(2025);
dte.setMonth(0);                   // 设置为一月

// 比较两个日期
var dte2 = new Date();
if (dte.before(dte2)) {
    // dte 早于 dte2
}
```

## JSONUtil

### json2List/obj2Json/obj2JsonPretty/json2Map

说明：JSON 格式转换。

示例：

```javascript
var d = new Date();
var json = JSONUtil.obj2Json(d)
```

## HanLPUtil

### hanLPParticiple

说明：汉语分词工具，括号中需要设置两个参数，格式为`(String inputString, String language)`。

示例：

```javascript
var d = HanLPUtil.hanLPParticiple('你好', 'HK_T')
```

参数说明：

- **inputString**：需要进行分词的字符串。

- **language**：带分词的语言类型，支持： 
  - CH_S：简体中文。

  - CH_T：繁体中文。

  - HK_T：香港繁体。 

  - TW_T：台湾繁体。

返回值：数组类型，即分词后的结果集。

## split_chinese

说明：汉语分词工具，括号中需要设置两个参数，格式为`(String inputString, String language)`。

示例：

```javascript
var strs = split_chinese("这是一个中文句子", "CH_S");
```

参数说明：

- **inputString**：需要进行分词的字符串。

- **language**：带分词的语言类型，支持： 
  - CH_S：简体中文。

  - CH_T：繁体中文。

  - HK_T：香港繁体。 

  - TW_T：台湾繁体。

返回值：数组类型，即分词后的结果集。

## util

### strToBase64/base64ToStr/unwind

说明：字符串格式转换。

示例：

```javascript
// 将字符串装换为 Base64 格式
var b = util.strToBase64('aa');
// 将 JSON 数组按照层级拆分
var list = util.unwind(map, 'a.b.c');
```

## MD5Util/MD5

说明：MD5 加密工具。

示例：

```javascript
// 获取字符串的 MD5 签名，第二个参数为是否转换大写
var b = MD5Util.crypt('aa', true);
// 或者采用下述方法
var b = MD5('aa', true);
```

## Collections

### sort/get/emptySet/emptyList

说明：集合工具类，如排序、获取集合等。

示例：

```javascript
// 为 List 排序
Collections.sort(list);
// 获取空集合
var set = Collections.emptySet();
```

## MapUtil

#### getValueByKey/needSplit/removeValueByKey/containsKey/getValuePositionInMap/deepCloneMap/copyToNewMap/putValueInMap/recursiveFlatMap/obj2Map

说明：字典工具类。

示例：

```javascript
// 从给定的map中获取指定层级的值
var a = MapUtil.getValueByKey(map, 'a.b.c');
```

## sleep

说明：程序休眠指定时长，单位为毫秒。

示例：

```javascript
// 程序休眠 10 毫秒
sleep(10);
```

