# 版本对比
import Content from '../reuse-content/_all-features.md';

<Content />

TapData 提供三种不同版本的产品，分别为 TapData Cloud、TapData Enterprise 和 TapData Community，可满足不同用户的需求和使用场景，下面将详细介绍它们的功能特点和适用场景。

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 版本介绍

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="TapData Enterprise">
```

TapData Enterprise 支持部署至本地数据中心，适用于对数据敏感性或网络隔离有严格要求的场景，提供企业级的数据集成解决方案。

**功能特点：**

- **本地部署**：支持在企业本地数据中心进行部署，满足数据安全和合规要求。
- **完全控制**：企业可以完全控制数据的存储、处理和传输，确保数据隐私。
- **高性能**：针对大规模数据集成任务进行优化，提供高效的数据同步和转换功能。
- **企业支持**：提供专业的技术支持和定制化服务，满足企业的特殊需求。

**适用场景：**

- 对数据敏感性或网络隔离有严格要求的场景，如金融机构、政府部门或希望完全控制数据的大型企业。
- 需要高数据处理性能和快速扩展能力的场景，如实时分析、交易系统等。
- 希望利用现有硬件部署服务，轻松实现横向扩展提升整体性能

</TabItem>

<TabItem value="TapData Cloud">

TapData Cloud 采用 SaaS（软件及服务）模式，注册 [TapData Cloud 账号](https://cloud.tapdata.net/console/v3/)即可快速开始使用，无需部署和维护基础设施，适用于快速部署和较低前期投资的场景。

**功能特点：**

- **快速部署**：无需复杂的安装和配置，几分钟内即可上线使用。
- **低前期投资**：无需购买和维护硬件设备，提供一个免费的 Agent 实例，按需使用，[按量付费](../billing/billing-overview.md)。
- **自动化运维**：系统自动进行版本更新和维护，让您专注于业务发展。
- **高可用性**：云端架构提供高可用性和扩展性，确保数据集成服务的持续性和安全性。

**适用场景**：

- 在探索数据集成和同步的初期阶段，需要一个低成本、高效率的数据集成平台。
- 需要适应业务规模迅速扩展，灵活应对负载变化，不希望在基础设施上进行大量投资的场景。

</TabItem>

<TabItem value="TapData Community">

TapData Community 是一个开源的数据集成平台，提供基础的数据同步和转换功能，支持通过 Docker 一键部署。随着项目或企业发展，您可以平滑升级至 TapData Cloud 或 TapData Enterprise，以获得更多高级功能或服务支持。

**功能特点：**

- **开源免费**：免费使用，开源社区支持，用户可以自由定制和扩展功能。
- **快速部署**：通过 Docker 一键部署，简化安装过程。
- **基础功能**：提供基本的数据同步和转换功能，满足初步的数据集成需求。
- **平滑升级**：用户可以根据项目需求，平滑升级至 TapData Cloud 或 TapData Enterprise，获得更多高级功能和服务支持。

**适用场景：**

- 数据集成项目的初步探索和实施。
- 低成本启动数据集成项目。
- 通过开源平台进行学习和实践的开发者和数据爱好者。

</TabItem>

</Tabs>



## 功能对比

在 TapData Community 面向开发者免费的基础上，TapData Enterprise 和 TapData Cloud 提供了更多更强的功能和特性，提升数据流转效率，满足更多场景需求。

<table><thead>
  <tr>
    <th>类别</th>
    <th>功能</th>
    <th>TapData Enterprise</th>
    <th>TapData Cloud</th>
    <th>TapData Community</th>
  </tr></thead>
<tbody>
  <tr>
    <td rowspan="4">基础功能</td>
    <td><a href="../quick-start/install">部署方式</a></td>
    <td>本地</td>
    <td><a href="https://cloud.tapdata.net/console/v3/">注册即用</a></td>
    <td>本地</td>
  </tr>
  <tr>
    <td><a href="../production-admin/install-tapdata-ha">处理引擎横向扩展</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../prerequisites">数据源连接管理</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
<tr>
  <td>支持的数据库</td>
  <td><span style={{ color: 'blue' }}>100+</span></td>
  <td><span style={{ color: 'blue' }}>100+</span></td>
  <td><span style={{ color: 'grey' }}>16</span></td>
</tr>
  <tr>
    <td rowspan="5">数据管道</td>
    <td><a href="../user-guide/data-pipeline/copy-data">数据复制</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
  <tr>
    <td><a href="../user-guide/data-pipeline/data-development">数据转换</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
  <tr>
    <td><a href="user-guide/data-pipeline/data-development/create-materialized-view">实时物化视图</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
  <tr>
    <td><a href="../user-guide/data-pipeline/data-development/process-node">表处理节点</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
  <tr>
    <td><a href="../user-guide/data-pipeline/copy-data/create-task#310-table-model">节点告警</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td rowspan="4"><a href="../user-guide/real-time-data-hub">实时数据中心</a></td>
    <td><a href="../user-guide/real-time-data-hub/etl-mode">数据集成平台模式</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../user-guide/real-time-data-hub/daas-mode">数据服务平台模式</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../user-guide/real-time-data-hub/daas-mode/daas-mode-dashboard">表血缘溯源</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../user-guide/real-time-data-hub/daas-mode/daas-mode-dashboard">切换目录视图</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td rowspan="6">高级功能</td>
    <td><a href="../user-guide/data-pipeline/verify-data">数据校验</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../user-guide/advanced-settings/share-cache">共享缓存</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
  <tr>
    <td><a href="../user-guide/advanced-settings/manage-function">函数管理</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
  <tr>
    <td><a href="../user-guide/advanced-settings/custom-node">自定义节点</a></td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
  </tr>
  <tr>
    <td><a href="../user-guide/advanced-settings/share-mining">共享挖掘</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../best-practice/heart-beat-task">心跳任务管理</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td rowspan="3">数据 API 服务</td>
    <td><a href="../user-guide/data-service/create-api-service">API 发布</a></td>
    <td>✅</td>
    <td>➖</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../user-guide/data-service/audit-api">API 审计</a><a href="../user-guide/data-service/monitor-api-request">统计</a></td>
    <td>✅</td>
    <td>➖</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../user-guide/data-service/create-api-service#release330-export-api">API 文档生成</a></td>
    <td>✅</td>
    <td>➖</td>
    <td>➖</td>
  </tr>
  <tr>
    <td rowspan="5">平台管理</td>
    <td><a href="../user-guide/manage-system/manage-role">角色权限管理</a></td>
    <td>✅</td>
    <td>➖</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../user-guide/manage-system/manage-cluster">管理集群</a></td>
    <td>✅</td>
    <td>无需</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../user-guide/manage-system/manage-cluster">组件管理</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td><a href="../user-guide/manage-system/manage-external-storage">管理外存</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
  <tr>
    <td><a href="../user-guide/other-settings/system-settings">系统设置</a></td>
    <td>✅</td>
    <td>➖</td>
    <td>➖</td>
  </tr>
  <tr>
    <td rowspan="2">监控告警</td>
    <td><a href="../user-guide/notification">自定义通知</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
  <tr>
    <td><a href="../user-guide/notification">自定义监控</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
  </tr>
  <tr>
    <td rowspan="2">技术支持</td>
    <td>支持方式</td>
    <td>在线客服、工单</td>
    <td>在线客服、工单</td>
    <td><a href="https://20778419.s21i.faiusr.com/4/2/ABUIABAEGAAg-JPfhwYonMrzlwEwZDhk.png">微信群</a>、<a href="https://join.slack.com/t/tapdatacommunity/shared_invite/zt-1biraoxpf-NRTsap0YLlAp99PHIVC9eA">Slack</a>、<a href="https://github.com/tapdata/tapdata/issues">Github Issues</a></td>
  </tr>
  <tr>
    <td>支持团队</td>
    <td>资深专家工程师</td>
    <td>专家工程师</td>
    <td>工程师/社区成员</td>
  </tr>
</tbody></table>
















