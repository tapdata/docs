# 数据库和集合

TapDB 将数据记录存储为文档（特别是BSON 文档），这些文档聚集在集合中。数据库存储一个或多个文档集合。

## 数据库

在 TapDB 中，数据库用于保存一个或多个文档集合。要选择要使用的数据库，请在 TapDB shell 中执行 `use <db>` 语句，如下例所示：

```
use myDB
```

### 创建数据库

如果数据库不存在，TapDB 会在您首次向该数据库存储数据时创建该数据库。因此，您可以切换到一个不存在的数据库，并在 TapDB shell

```
use myNewDB
db.myNewCollection1.insertOne( { x: 1 } )
```

`insertOne()` 操作会同时创建数据库 `myNewDB` 和集合 `myNewCollection1` 如果尚不存在）。确保数据库和集合名称都遵循TapDB命名限制。

## 集合

TapDB 将文档存储在集合中。集合类似于关系数据库中的表。
![](../images/collection.svg)

### 创建集合

如果集合不存在，TapDB 会在您首次存储该集合的数据时创建该集合。

```
db.myNewCollection2.insertOne( { x: 1 } )
db.myNewCollection3.createIndex( { y: 1 } )
```

如果相应的集合尚不存在，则 `insertOne()` 和 `createIndex()` 操作都会创建相应的集合。确保集合名称遵循 TapDB命名限制。

### 显式创建

TapDB 提供了 `db.createCollection()` 方法来显式创建具有各种选项的集合，例如设置最大大小或文档验证规则。如果不指定这些选项，则无需显式创建集合，因为 TapDB 会在您首次存储集合数据时创建新集合。

### 文档验证

默认情况下，集合不要求其文档具有相同的模式，即单个集合中的文档不需要具有相同的字段集，并且在集合内的不同文档中，字段的数据类型可以不同。

从 TapDB 3开始。 2 ，但是，您可以在更新和插入操作期间对集合实施文档验证规则。

### 修改文档结构

若要更改集合中文档的结构，例如添加新字段、删除现有字段或将字段值更改为新类型，请将文档更新为新结构。

### 唯一标识符

系统为集合分配了一个不可变的 UUID。集合 UUID 在副本集的所有节点和分片集群的分片中保持不变。

要检索集合的 UUID，请运行 `listCollections` 命令或 `db.getCollectionInfos()` 方法。