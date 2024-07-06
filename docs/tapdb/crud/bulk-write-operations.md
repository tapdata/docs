# 批量写入

TapDB 提供批量执行写入操作的功能，允许客户端对单个集合进行多种写入操作。批量写入操作影响单个集合，并允许应用程序确定所需的可接受确认级别。

使用 `db.collection.bulkWrite()` 方法可以执行批量插入、更新和删除操作，TapDB 还支持通过 `db.collection.insertMany()` 方法进行批量插入。

## 有序/无序操作

- **有序操作**：TapDB 以串行方式执行操作。如果在处理某个写入操作期间出现错误，TapDB 将停止并返回错误，不处理后续操作。
- **无序操作**：TapDB 可以并行执行操作，但不保证这种行为。如果在处理某个写入操作期间出现错误，TapDB 将继续处理列表中剩余的写入操作。

在分片集合上执行有序操作列表通常比无序操作列表慢，因为每个有序操作都必须等待前一个操作完成。

默认情况下，`bulkWrite()` 执行有序操作。要指定无序写入操作，请在选项文档中设置 `ordered: false`。

## bulkWrite () 方法

`bulkWrite()` 支持以下写入操作：

- insertOne

- updateOne

- updateMany

- replaceOne

- deleteOne

- deleteMany

每个写操作都会作为数组中的一个文档传递给 `bulkWrite()`。

## 示例

本节的示例使用 pizzas 集合：

```sql
db.pizzas.insertMany( [
    { _id: 0, type: "pepperoni", size: "small", price: 4 },
    { _id: 1, type: "cheese", size: "medium", price: 7 },
    { _id: 2, type: "vegan", size: "large", price: 8 }
] )
```

以下 `bulkWrite()` 示例对 `pizzas` 集合执行以下操作：

- 使用 `insertOne` 添加两个文档。
- 使用 `updateOne` 更新一个文档。
- 使用 `deleteOne` 删除一个文档。
- 使用 `replaceOne` 替换一个文档。

```sql
try {
    db.pizzas.bulkWrite( [
        { insertOne: { document: { _id: 3, type: "beef", size: "medium", price: 6 } } },
        { insertOne: { document: { _id: 4, type: "sausage", size: "large", price: 10 } } },
        { updateOne: {
            filter: { type: "cheese" },
            update: { $set: { price: 8 } }
        } },
        { deleteOne: { filter: { type: "pepperoni"} } },
        { replaceOne: {
            filter: { type: "vegan" },
            replacement: { type: "tofu", size: "small", price: 4 }
        } }
    ] )
} catch( error ) {
    print( error )
}
```

输出示例，包括已完成操作的摘要：

```sql
{
    acknowledged: true,
    insertedCount: 2,
    insertedIds: { '0': 3, '1': 4 },
    matchedCount: 2,
    modifiedCount: 2,
    deletedCount: 1,
    upsertedCount: 0,
    upsertedIds: {}
}
```

## 批量插入分片集合的策略

大批量插入操作（包括初始数据插入或例行数据导入）可能会影响分片集群的性能。对于批量插入，请考虑以下策略：

### 预拆分集合

如果分片集合为空，此集合将只有一个初始数据段，此数据段位于单个分片上。随后，TapDB 必须花一些时间接收数据、创建分割以及将分割的数据段分发给可用的分片。为了避免这一性能开销，可以预先分割集合，如分割分片集群中的数据段。

### 对 taps

要提高分片集群的写入性能，请使用 `bulkWrite()` 并将可选参数 `ordered` 设置为 `false`。taps 可以尝试将写入操作同时发送到多个分片。对于空集合，先按照分片集群中的拆分数据段。

### 避免单调限速

如果分片键在插入期间单调增加，则所有已插入数据都会进入集合中的最后一个数据段，该数据段将始终出现在单个分片上。因此，集群的插入容量永远不会超过该单个分片的插入容量。

如果插入量大于单个分片可以处理的容量，并且无法避免分片键的单调增加，则可以考虑对应用程序进行以下修改：

- 反转分片键的二进制位。这样将保留信息，并避免将插入顺序与递增的值序列相关联。
- 交换第一个和最后一个 16 位字，“随机打乱”插入。

以下示例（采用 C++ 编写）交换生成的 BSON ObjectId 的前导和尾随 16 位字，以使其不再单调递增。

```c++
using namespace tap;
    OID make_an_id() {
    OID x = OID::gen();
    const unsigned char *p = x.getData();
    swap( (unsigned short&) p[0], (unsigned short&) p[10] );
    return x;
}
void foo() {
    // create an object
    BSONObj o = BSON( "_id" << make_an_id() << "x" << 3 << "name" << "jane" );
    // now we may insert o into a sharded collection
}
```

:::tip

另请参阅[分片键](../sharding/tapdb-sharding#sharding)以了解有关选择分片键的信息。

:::