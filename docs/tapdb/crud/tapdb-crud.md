# CRUD 操作

增删改查操作用于创建、读取、更新和删除文档。

## 创建操作

创建或插入操作用于将新文档添加到集合中。如果集合当前不存在，插入操作会创建集合。

TapDB 提供以下方法将文档插入到集合中：

- `db.collection.insertOne()`

- `db.collection.insertMany()`

在 TapDB 中，插入操作针对的是单个集合。TapDB 中的所有写入操作在单个文档级别都具有原子性。

![](../images/crud-annotated-mongodb-insertOne.bakedsvg.svg)

## 读取操作

读取操作用于从集合中检索文档，即查询集合中的文档。TapDB 提供以下方法来从集合中读取文档：

- db.collection.find()

您可以指定查询过滤器或条件来识别要返回的文档。

![](../images/crud-annotated-mongodb-find.bakedsvg.svg)

## 更新操作

更新操作用于修改集合中的现有文档 。TapDB 提供以下方法来更新集合中的文档：

- `db.collection.updateOne()`

- `db.collection.updateMany()`

- `db.collection.replaceOne()`

在 TapDB 中，更新操作针对的是单个集合。TapDB 中的所有写入操作在单个文档级别都具有原子性。

您可以指定条件或过滤器来识别要更新的文档。这些过滤器使用与读取操作相同的语法。

![](../images/crud-annotated-mongodb-updateMany.bakedsvg.svg)

## 删除操作

删除操作用于从集合中删除文档。TapDB 提供以下方法来删除集合中的文档：

- `db.collection.deleteOne()`

- `db.collection.deleteMany()`

在 TapDB 中，删除操作针对的是单个集合。TapDB 中的所有写入操作在单个文档级别都具有原子性。

您可以指定条件或过滤器来识别要删除的文档。这些过滤器使用与读取操作相同的语法。

![](../images/crud-annotated-mongodb-deleteMany.bakedsvg.svg)

## 批量写入

TapDB 提供批量执行写入操作的功能。有关详情，请参阅[批量写入操作](bulk-write-operations.md)。