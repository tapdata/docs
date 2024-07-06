# 聚合操作

聚合操作处理多个文档并返回计算结果。您可以使用聚合操作进行以下操作：

- 组合多个文档中的值。
- 对分组数据执行操作，返回单一结果。
- 分析一段时间内的数据变化。

若要执行聚合操作，您可以使用：

- **聚合管道**：这是执行聚合的首选方法，允许进行复杂的数据处理。
- **单一目的聚合方法**：这些方法操作简单，但功能不如聚合管道丰富。

## 聚合管道

聚合管道由一个或多个处理文档的阶段组成：

- 每个阶段都对输入文档执行一个操作。例如，某个阶段可以过滤文档、对文档进行分组并计算值。
- 从一个阶段输出的文档会传递到下一阶段。
- 聚合管道可以返回对文档组的综合结果，例如总值、平均值、最大值和最小值。

如使用通过聚合管道更新

:::tip

使用 `db.collection.aggregate()` 方法运行的聚合管道不会修改集合中的文档，除非管道包含 `$merge` 或 `$out` 阶段。

:::

### 聚合管道示例

以下聚合管道示例包含两个阶段，并返回按披萨名称分组后各款中号披萨的总订单数量：

```sql
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

- 过滤出尺寸为中号的披萨订单文档。
- 将过滤后的文档传递到下一阶段 `$group`。

`$group` 阶段：

- 按披萨名称对文档进行分组。
- 使用 `$sum` 计算每种披萨的总订单数量，并将总数存储在聚合结果的 `totalQuantity` 字段中。

## 单一目的聚合方法

单一目的聚合方法用于聚合集合中的文档。这些方法简单易用，但功能相对有限。

方法                                       | 说明
:-----------------------------------------|:-----
 `db.collection.estimatedDocumentCount()` | 返回集合或视图中文档的近似数量。 
 `db.collection.count()`                  | 返回集合或视图中文档的数量。
 `db.collection.distinct()`               | 返回具有指定字段的不同值的文档数组。