# 连接 Custom Connection

在数据源类型选择页面选择 Custom Connection，打开 Custom Connection连 接配置页面。

![](../../images/custom-connection.png)

连接名称：连接的名字

连接的类型：

- 源和目标
- 源
- 目标

集合名称：做源时需要设置，实际就是表名称，表示从Custom Connection里获取到的数据要生成的数据模型的名字

唯一主键：设置以获取到的数据模型里哪一个字段作为主键字段

同步方式：作为源时需要设置

- 历史数据：选择历史数据的话，只会执行一次历史数据脚本
- 增量数据：选择增量数据的话，会以2S的频率定期执行增量数据脚本。目前频率为固定频率，不可配置，后续会考虑放开增量脚本的执行间隔给用户配置。
- 历史数据和增量数据：执行一次历史数据脚本后，再按照固定周期执行增量脚本

JS引擎版本：无效设置，会去掉，可以不用管

前置操作：在执行数据脚本前先执行的JS操作脚本，只会执行一次。可根据需要打开或关闭

增量数据脚本：增量数据获取和处理的JS脚本，选择同步方式包含增量数据时需要设置

历史数据脚本：历史数据获取和处理的JS脚本，选择同步方式包含历史数据时需要设置

目标数据处理脚本：目标数据处理的JS脚本，当连接类型包含目标时才会显示的设置项。用来将数据处理为符合目标Custom Connection的格式

后置操作：在数据脚本执行完成之后再执行的JS操作脚本，只会执行一次。可根据需要打开或关闭

## 常用函数

### Http

```javascript
Http Return Instructions

// data为返回的body，可能是array或object或string

{code:200, data:[]}
rest.get(url, header)
rest.get(url, header, returnType)
rest.get(url, header, connectTimeOut, readTimeOut)
rest.get(url, header, returnType, connectTimeOut, readTimeOut)

// 调用http的 get 方法
// returnType: 返回的结果类型，默认为array
// connectTimeOut：连接超时时间，单位毫秒(ms)，默认为 10000 ms，需要指定连接超时时间时可以使用该参数
// readTimeOut：读取超时时间，单位毫秒(ms)，默认为 30000 ms，需要指定读取超时时间时可以使用该参数

var result = rest.get('http://127.0.0.1:1234/users?id=1', {}, '[array/object/string]', 30, 300);
rest.post(url, parameters)
rest.post(url, parameters, headers, returnType)
rest.post(url, parameters, connectTimeOut, readTimeOut)
rest.post(url, parameters, headers, returnType, connectTimeOut, readTimeOut)

// 调用http的 post 方法
// returnType: 返回的结果类型，默认为array
// connectTimeOut：连接超时时间，单位毫秒(ms)，默认为 10000 ms，需要指定连接超时时间时可以使用该参数
// readTimeOut：读取超时时间，单位毫秒(ms)，默认为 30000 ms，需要指定读取超时时间时可以使用该参数

var result = rest.post('http://127.0.0.1:1234/users/find', {}, {}, '[array/object/string]', 30, 300);
rest.patch(url, parameters)
rest.patch(url, parameters, headers)
rest.patch(url, parameters, connectTimeOut, readTimeOut)
rest.patch(url, parameters, headers, connectTimeOut, readTimeOut)

// 调用http的 patch 方法
// connectTimeOut：连接超时时间，单位毫秒(ms)，默认为 10000 ms，需要指定连接超时时间时可以使用该参数
// readTimeOut：读取超时时间，单位毫秒(ms)，默认为 30000 ms，需要指定读取超时时间时可以使用该参数

var result = rest.patch('http://127.0.0.1:1234/users?where[user_id]=1', {status: 0}, {}, 30, 300);
rest.delete(url)
rest.delete(url, headers)
rest.delete(url, connectTimeOut, readTimeOut)
rest.delete(url, headers, connectTimeOut, readTimeOut)

// 调用http的 delete 方法
// connectTimeOut：连接超时时间，单位毫秒(ms)，默认为 10000 ms，需要指定连接超时时间时可以使用该参数
// readTimeOut：读取超时时间，单位毫秒(ms)，默认为 30000 ms，需要指定读取超时时间时可以使用该参数

var result = rest.delete('http://127.0.0.1:1234/users?where[user_id]=1', {}, 30, 300);
```

### **MongoDB**

```javascript
mongo.getData(uri, collection)
mongo.getData(uri, collection, filter)
mongo.getData(uri, collection, filter, limit, sort)

// MongoDB 查询数据

var result = mongo.getData('mongodb://127.0.0.1:27017/test', 'users', {id: 1}, 10, {add_time: -1});
mongo.insert(url, collection, inserts)

// MongoDB 插入数据
// inserts 表示插入的数据，可以传入数组或者对象

mongo.insert('mongodb://127.0.0.1:27017/test', 'users', [{id: 1, name: 'test1'}, {id: 2, name: 'test2'}]);
mongo.update(url, collection, filter, update)

// MongoDB更新数据

var modifyCount = mongo.update('mongodb://127.0.0.1:27017/test', 'users', {id: 1}, {name: 'test3'});
mongo.delete(url, collection, filter)

// MongoDB删除数据

var deleteCount = mongo.delete('mongodb://127.0.0.1:27017/test', 'users', {id: 1});
```