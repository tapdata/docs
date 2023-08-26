# 计费概述

本文介绍 Tapdata Cloud 的计费项、计费方式和价格说明等计费信息。

## 计费方式

Tapdata Cloud 按照订阅 Agent 实例的**规格**和**数量**收费，完成账号注册即可获得 1 个免费的 Agent 实例，此外，您还可以选择包月、包年、连续包月、连续包年订阅方式来购买更多的 Agent 实例，来满足业务需求：

- **包月**：一次性购买一个月的服务，订阅到期后不会自动续费，可手动续费。
- **包年**：一次性购买一年的服务，订阅到期后不会自动续费，可手动续费。
- **连续包月**：按月支付订阅费，每期自动扣取下一月的订阅费用。
- **连续包年**：按年支付订阅费，每期自动扣取下一年的订阅费用。

:::tip

当选择连续包月/包年计费方式时，Tapdata Cloud 会在每期的到期日自动扣取下一周期的订阅费用，您可以前往用户中心查看扣费详情。

:::

## 支付方式

您可以通过信用卡或对公转账的方式支付 Tapdata Cloud 费用。




## 规格说明

由于数据流转通常受 Agent 所属机器负载/性能、网络传输延迟、网络带宽、源/目标库读写性能等多种因素影响，请根据数据量和任务数量选择合适的 Agent 规格进行订阅。下表各规格的性能仅为参考，实际运行以场景真实表现为准。

各规格的定价，以购买流程的展示为准，推荐选择连续包月（**95 折**）或连续包年（**9 折**）。

<table>
<thead>
  <tr>
    <th rowspan="2">规格</th>
    <th rowspan="2">运行任务数参考</th>
    <th colspan="2">宿主机硬件推荐 ①</th>
    <th rowspan="2">性能参考（QPS）</th>
  </tr>
  <tr>
    <th>CPU 核数</th>
    <th>内存规格</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>SMALL</td>
    <td>3</td>
    <td>1 core</td>
    <td>4 GB</td>
    <td>2,000</td>
  </tr>
  <tr>
    <td>LARGE</td>
    <td>5</td>
    <td>2 cores</td>
    <td>6 GB</td>
    <td>4,000</td>
  </tr>
  <tr>
    <td>XLARGE</td>
    <td>10</td>
    <td>4 cores</td>
    <td>10 GB</td>
    <td>8,000</td>
  </tr>
  <tr>
    <td>2XLARGE</td>
    <td>20</td>
    <td>8 cores</td>
    <td>19 GB</td>
    <td>16,000</td>
  </tr>
  <tr>
    <td>3XLARGE</td>
    <td>30</td>
    <td>12 cores</td>
    <td>28 GB</td>
    <td>24,000</td>
  </tr>
  <tr>
    <td>4XLARGE</td>
    <td>40</td>
    <td>16 cores</td>
    <td>37 GB</td>
    <td>32,000</td>
  </tr>
  <tr>
    <td>8XLARGE</td>
    <td>80</td>
    <td>32 cores</td>
    <td>72 GB</td>
    <td>64,000</td>
  </tr>
</tbody>
</table>


:::tip

在[购买 Agent 实例](purchase.md)时，如您选择**半托管模式**，您需要提供宿主机以[部署 Agent](../quick-start/install-agent/README.md)，同时为保障最大程度地保障数据流转性能，需确保其拥有足够的计算、存储和带宽等资源；如您选择**全托管模式**，则由 Tapdata Cloud 提供所有的计算和存储资源。

:::

