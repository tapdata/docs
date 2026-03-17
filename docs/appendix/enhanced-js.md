# 增强 JS 内置函数（Beta）
import Content from '../reuse-content/_all-features.md';

<Content />

增强 JS 节点（Beta）可使用所有的内置函数，实现外部调用（如网络、数据库等），如仅需对数据记录进行处理和运算，请使用[标准 JS 节点](standard-js.md)。

使用方法及场景介绍，见 [JS 处理节点](../user-guide/data-development/process-node.md#js-process)。

:::tip

本功能仅支持在数据转换任务中使用。

:::

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

说明：对日期的年/月/日/时/分/秒进行加减运算。

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

## networkUtil

### GetAddress

说明：网络工具，获取 IP 地址或 MAC 地址。

示例：

```javascript
// 获取第一张网卡的 MAC 地址
var mac = networkUtil.GetAddress("mac");

// 获取 IP 地址 
var ip = networkUtil.GetAddress("ip");
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

### add/remove

说明：日期类型。

示例：

```javascript
var dte = new Date();
var year = dte.getYear()+1900;
```

## ScriptExecutorsManager

### getScriptExecutor

说明：获取数据源执行器。

示例：

```javascript
var source = ScriptExecutorsManager.getScriptExecutor('mysql-connection-name');
```


## ScriptExecutor


<details>

<summary>准备工作（可选）</summary>

为便于后续演示，我们提前在数据库中执行了以下 SQL 语句，创建订单表 Orders 和存储过程模拟真实的业务场景。

```sql
-- 1. 创建订单表
CREATE TABLE Orders (
    order_id VARCHAR(20) PRIMARY KEY,
    order_date DATETIME,
    total_amount DECIMAL(10, 2),
    status INT DEFAULT 0, -- 0:待支付, 1:已支付, 2:已发货, 9:已关闭
    points INT DEFAULT 0  -- 订单积分
);

-- 初始化测试数据
INSERT INTO Orders (order_id, order_date, total_amount, status, points) VALUES 
('ORD_001', NOW(), 100.00, 0, 0),
('ORD_002', NOW(), 5000.00, 1, 0), 
('ORD_003', '2023-01-01 10:00:00', 50.00, 0, 0); -- 一条旧数据用于演示自动关闭

-- 2. 存储过程1（无入参）：批量关闭过期订单
-- 作用：模拟定时任务，将所有 30 天前的未支付订单标记为 '9'(已关闭)
DELIMITER $$
CREATE PROCEDURE sp_close_expired_orders()
BEGIN
    UPDATE Orders SET status = 9 WHERE status = 0 AND order_date < DATE_SUB(NOW(), INTERVAL 30 DAY);
END$$
DELIMITER ;

-- 3. 存储过程2（带入参）：订单发货
-- 作用：将指定订单的状态更新为 '2'(已发货)
DELIMITER $$
CREATE PROCEDURE sp_ship_order(IN p_order_id VARCHAR(20))
BEGIN
    UPDATE Orders SET status = 2 WHERE order_id = p_order_id;
END$$
DELIMITER ;

-- 4. 存储过程3（复杂场景）：计算订单积分（含输入、输出参数）
-- 作用：输入订单金额，返回该订单可获得的积分
-- 规则：金额 < 1000，每 10 元积 1 分；金额 >= 1000，每 10 元积 2 分
DELIMITER $$
CREATE PROCEDURE sp_calculate_points(
    IN p_amount DECIMAL(10,2), 
    OUT p_points INT
)
BEGIN
    IF p_amount < 1000 THEN
        SET p_points = FLOOR(p_amount / 10);
    ELSE
        SET p_points = FLOOR(p_amount / 10) * 2;
    END IF;
END$$
DELIMITER ;
```

</details>

### execute / executeQuery

说明：通过 `ScriptExecutorsManager` 获取特定数据源的脚本执行器，随后调用本方法执行 SQL 语句或 NoSQL 操作，简单场景下推荐使用本方法。

* **executeQuery**：主要用于查询（SELECT），返回值为数组类型（结果集），具备试运行效果（可预览结果）。
* **execute**：用于执行 SQL 语句，可返回多个结果集，相当于普通数据库工具的执行效果，对于简单查询场景，可使用本方法获取结果集，但需注意本方法不具备试运行数据预览效果。

:::tip

`execute` 或 `executeQuery` 前的对象为 `source` 表示对源库执行操作，为 `target` 表示对目标库执行操作。

:::

#### 结构化数据库（如 MySQL）

示例：

* 使用 execute 执行 DML

  ```javascript
  // 获取源库连接（请替换为您实际的源连接名称，如 'Source_MySQL'）
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // 简单执行 SQL，例如把订单状态为 0(待支付) 的更新为 9(已关闭)
  var result = source.execute({
      "sql": "UPDATE Orders SET status = 9 WHERE order_id = 'ORD_001'"
  });
  log.info("Update result: " + result); 
  ```

* 使用 executeQuery 执行查询

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // 查询所有大额订单（金额 > 1000）
  var result = source.executeQuery({
      "sql": "SELECT * FROM Orders WHERE total_amount > 1000"
  });
  log.info("High value orders: " + result);
  ```

* 使用 execute 调用存储过程（无入参）

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // 调用批量关闭过期订单的存储过程
  // 等价于 source.call("sp_close_expired_orders", [])
  var result = source.execute({
      "sql": "CALL sp_close_expired_orders()"
  });
  ```

* 使用 execute 调用存储过程（有入参）

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // 调用发货存储过程（需自行拼接 SQL 参数）
  // 等价于 source.call("sp_ship_order", [...])
  var result = source.execute({
      "sql": "CALL sp_ship_order('ORD_002')"
  });
  ```

:::tip

`execute` 和 `executeQuery` **不支持**直接获取存储过程的 `OUT`（输出）或 `INOUT`（输入输出）参数，也不支持获取非查询类的返回值。对于此类复杂场景，请使用本文的 `call` 方法。

:::

#### NoSQL 数据库（如 MongoDB）

参数说明：

* **database**：操作的数据库名称。
* **collection**：操作的集合名称。
* **op**：要执行的操作（INSERT/UPDATE/DELETE，仅 execute）。
* **filter**：查询、更新或者删除的条件。
* **opObject**：新增、更新的具体数据。
* **upsert**：是否采用 MongoDB 的 UPSERT 模式（不存在则新增），默认为 **false**。
* **multi**：是否更新多条记录，默认为 **false**。
* **sort**：排序条件（仅 executeQuery）。
* **limit**：限制输出条数（仅 executeQuery）。

示例：

* 使用 execute 执行更新

  ```javascript
  var result = target.execute({
      database: "test",
      collection: "user",
      op: "update",
      filter: {id: 1},
      opObject: {name: "user001", age: 20},
      upsert: true
  });
  ```

* 使用 executeQuery 执行查询

  ```javascript
  var users = target.executeQuery({
      database: "test",
      collection: "user",
      filter: {age: {$gt: 10}},
      sort: {age: -1},
      limit: 10
  });
  ```

### call

说明：调用数据库中自定义的存储过程，支持复杂的输入/输出参数及返回值。对于包含多结果集或复杂参数（IN/OUT/RETURN）的存储过程，推荐使用本方法。

:::tip

本方法基于 JDBC 通用接口实现，建议参数类型尽量使用基础类型（如 `int`, `double`, `varchar`），避免使用数据库特有的复杂类型，以最大程度兼容不同数据库系统。

:::

参数说明：

`call(procedureName, parameters)`

* **procedureName**：存储过程名称。
* **parameters**：参数数组，严格按照参数顺序排列，包含以下属性：
    * **mode**：参数模式，可选 `in` | `out` | `in/out` | `return`。
    * **type**：数据类型，支持 `int` | `double` | `varchar` 等常用类型。
    * **value**：入参的具体值。
    * **name**：参数名称（可选，指定后返回结果中该参数的 Key 将使用此名称，否则自动生成）。

示例：

* 简单调用（无入参）

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // 调用无参存储过程：批量关闭过期订单
  source.call("sp_close_expired_orders", []);
  ```

* 带入参调用

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // 调用有参存储过程：发货（更新订单 ORD_002 的状态为 2）
  source.call("sp_ship_order", [
      {"mode": "in", "type": "varchar", "value": 'ORD_002'}
  ]);
  ```

* 复杂调用（含返回值、出参）

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // 场景：计算订单积分
  // 输入：订单金额 5000 (in)
  // 输出：获得积分 (out)
  var result = source.call("sp_calculate_points", [
      {"mode": "in",  "type": "decimal", "value": 5000.00},
      {"name": "points", "mode": "out", "type": "int"}
  ]);
  
  // 结果以 Map 形式返回
  // 例如：{points=1000}
  log.info("Points earned: " + result.points);
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

### getValueByKey/needSplit/removeValueByKey/containsKey/getValuePositionInMap/deepCloneMap/copyToNewMap/putValueInMap/recursiveFlatMap/obj2Map

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

## rest

### get/post/patch/delete

说明：调用 HTTP 的相关方法（如 Get），格式参考：

```javascript
rest.get(url, header)
rest.get(url, header, returnType)
rest.get(url, header, connectTimeOut, readTimeOut)
rest.get(url, header, returnType, connectTimeOut, readTimeOut)
```

* **returnType**：返回的结果类型，默认为 array。
* **connectTimeOut**：连接超时时间，单位毫秒，默认为 10000 毫秒，需要指定连接超时时间时可使用该参数。
* **readTimeOut**：读取超时时间，单位毫秒，默认为 30000 毫秒，需要指定读取超时时间时可使用该参数。

示例：

* Get

  ```javascript
  var result = rest.get('http://127.0.0.1:1234/users?where[user_id]=1', {status: 0}, {}, 30, 300);rest.get(url)
  rest.get(url, headers)
  rest.get(url, connectTimeOut, readTimeOut)
  rest.get(url, headers, connectTimeOut, readTimeOut)
  ```

* Post

  ```javascript
  var result = rest.post('http://127.0.0.1:1234/users?id=1', {}, '[array/object/string]', 30, 300);rest.post(url, parameters)
  rest.post(url, parameters, headers, returnType)
  rest.post(url, parameters, connectTimeOut, readTimeOut)
  rest.post(url, parameters, headers, returnType, connectTimeOut, readTimeOut)
  ```

* Patch

  ```javascript
  var result = rest.patch('http://127.0.0.1:1234/users/find', {}, {}, '[array/object/string]', 30, 300);rest.patch(url, parameters)
  rest.patch(url, parameters, headers)
  rest.patch(url, parameters, connectTimeOut, readTimeOut)
  rest.patch(url, parameters, headers, connectTimeOut, readTimeOut)
  ```

* Delete

  ```javascript
  var result = rest.delete('http://127.0.0.1:1234/users?where[user_id]=1', {}, 30, 300);
  ```

## mongo

### getData/insert/update/delete

说明：对 MongoDB 数据执行增删改查操作，格式参考：

```javascript
mongo.getData(uri, collection)
mongo.getData(uri, collection, filter)
mongo.getData(uri, collection, filter, limit, sort)
```

示例：

* 查询数据

  ```javascript
  var result = mongo.getData('mongodb://127.0.0.1:27017/test', 'users', {id: 1}, 10, {add_time: -1});mongo.insert(url, collection, inserts)
  ```

* 插入数据，支持传入数组或者对象

  ```javascript
  mongo.insert('mongodb://127.0.0.1:27017/test', 'users', [{id: 1, name: 'test1'}, {id: 2, name: 'test2'}]);mongo.update(url, collection, filter, update)
  ```

* 更新数据

  ```javascript
  var modifyCount = mongo.update('mongodb://127.0.0.1:27017/test', 'users', {id: 1}, {name: 'test3'});mongo.delete(url, collection, filter)
  ```

* 删除数据

  ```javascript
  var deleteCount = mongo.delete('mongodb://127.0.0.1:27017/test', 'users', {id: 1});
  ```



### aggregate

说明：内置目标节点数据库聚合操作。

参数说明：

* **database**：操作的数据库名称。
* **collection**：操作的集合名称。
* **pipeline**：聚合管道参数。

返回值：数组类型，表示聚合的结果集。

示例：

```javascript
var aa = ScriptExecutor.getScriptExecutor('mongo-test');
var users = aa.aggregate({
    database: "test",
    collection: "user",
    pipeline: [{'$match':{'CUSTOMER_ID':'C000026278'}}]
});
```
