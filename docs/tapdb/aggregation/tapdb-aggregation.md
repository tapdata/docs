# 聚合操作

聚合操作处理多个文档并返回计算结果。您可以使用聚合操作来：

- 将多个文档中的值组合在一起。

- 对分组数据执行操作，返回单一结果。

- 分析一段时间内的数据变化。

若要执行聚合操作，您可以使用：

- 聚合管道，这是执行聚合的首选方法。

- 单一目的聚合方法，这些方法很简单，但缺乏聚合管道的功能。

## 聚合管道

聚合管道由一个或多个处理文档的阶段组成：

- 每个阶段对输入文档执行一个操作。例如，某个阶段可以过滤文档、对文档进行分组并计算值。

- 从一个阶段输出的文档将传递到下一阶段。

- 一个聚合管道可以返回针对文档组的结果。例如，返回总值、平均值、最大值和最小值。

如使用通过聚合管道更新

:::warning

使用 `db.collection.aggregate()` 方法运行的聚合管道不会修改集合中的文档，除非管道包含 `$merge` 或 `$out` 阶段。

:::

### 聚合管道示例

以下聚合管道示例包含两个阶段，并返回按披萨名称分组后，各款中号披萨的总订单数量：

```
db.orders.aggregate( [
    // Stage 1: Filter pizza order documents by pizza size
    {
        $match: { size: "medium" }
    },
    // Stage 2: Group remaining documents by pizza name and calculate total quantity
    {
        $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
    }
] )
```

`$match` 阶段：

- 从披萨订单文档过滤出size为medium的披萨。

- 将剩余文档传递到$group阶段。

`$group` 阶段：

- 按披萨name对剩余文档进行分组。

- 使用$sum计算每种披萨name的总订单quantity。总数存储在聚合管道返回的totalQuantity字段中。

有关包含样本输入文档的可运行示例，请参阅完整聚合管道示例。

### 了解有关聚合管道的更多信息

如需了解有关聚合管道的更多信息，请参阅聚合管道。

## 单一目的聚合方法

单一目的聚合方法聚合单个集合中的文档。这些方法很简单，但缺乏聚合管道的功能。

方法                                       | 说明
:-----------------------------------------|:-----
 `db.collection.estimatedDocumentCount()` | 返回集合或视图中文档的近似数量。
 `db.collection.count()`                  | 返回集合或视图中文档的数量。
 `db.collection.distinct()`               | 返回具有指定字段的不同值的文档数组。