# 支持的数据源
Tapdata 支持丰富的数据源，具体如下：



## 认证数据源

<table>
<thead>
  <tr>
    <th rowspan="2">类型</th>
    <th colspan="3">作为来源</th>
    <th colspan="2">作为目标</th>
    <th rowspan="2">版本</th>
  </tr>
  <tr>
    <th>全量</th>
    <th>增量</th>
    <th>DDL 采集</th>
    <th>数据写入</th>
    <th>DDL 应用</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>ClickHouse</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>v21.x</td>
  </tr>
  <tr>
    <td>Kafka</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>2.3.x、0.x、1.x</td>
  </tr>
  <tr>
    <td>MongoDB</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>3.2、3.4、3.6、4.0+</td>
  </tr>
  <tr>
    <td>MySQL</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>5.0、5.1、5.5、5.6、5.7、8.x</td>
  </tr>
  <tr>
    <td>Oracle</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>9i、10g、11g、12c、19c</td>
  </tr>
  <tr>
    <td>PostgreSQL</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>✅</td>
    <td>9.4+</td>
  </tr>
  <tr>
    <td>SQL Server</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>2005 2008 2012 2014 2016 2017</td>
  </tr>
</tbody>
</table>



## Beta 数据源

:::tip

Beta 版本数据源处于公测阶段，尚未通过 Tapdata 认证测试流程，如在使用过程中有疑问，欢迎[联系我们](mailto:team@tapdata.io)。

:::

<table>
<thead>
  <tr>
    <th rowspan="2">类型</th>
    <th colspan="3">作为来源</th>
    <th colspan="2">作为目标</th>
    <th rowspan="2">版本</th>
  </tr>
  <tr>
    <th>全量</th>
    <th>增量</th>
    <th>DDL 采集</th>
    <th>数据写入</th>
    <th>DDL 应用</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>ActiveMQ</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>5.14.x</td>
  </tr>
  <tr>
    <td>Coding</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>➖</td>
    <td>➖</td>
    <td>不涉及</td>
  </tr>
  <tr>
    <td>Dameng</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>7.x、8.x</td>
  </tr>
  <tr>
    <td>DB2</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>9.7 LUW</td>
  </tr>
  <tr>
    <td>Doris</td>
    <td>➖</td>
    <td>➖</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>0.15.0</td>
  </tr>
  <tr>
    <td>DummyDB</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Elasticsearch</td>
    <td>➖</td>
    <td>➖</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>5.x、6.x、7.x</td>
  </tr>
  <tr>
    <td>Excel</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>➖</td>
    <td>➖</td>
    <td>XLS/XLSX 格式</td>
  </tr>
  <tr>
    <td>Gbase 8a</td>
    <td>➖</td>
    <td>➖</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>8x</td>
  </tr>
  <tr>
    <td>Gbase 8s</td>
    <td>➖</td>
    <td>➖</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>8x</td>
  </tr>
  <tr>
    <td>Hive 1</td>
    <td>➖</td>
    <td>➖</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>3.1.2+</td>
  </tr>
  <tr>
    <td rowspan="2"><b>类型</b></td>
    <td colspan="3"><b>作为来源</b></td>
    <td colspan="2"><b>作为目标</b></td>
    <td rowspan="2"><b>版本</b></td>
  </tr>
  <tr>
    <td><b>全量</b></td>
    <td><b>增量</b></td>
    <td><b>DDL 采集</b></td>
    <td><b>数据写入</b></td>
    <td><b>DDL 应用</b></td>
  </tr>
  <tr>
    <td>KingBaseES-R3</td>
    <td>✅</td>
    <td>➖</td>
    <td>➖</td>
    <td>✅</td>
    <td>✅</td>
    <td>V8R3</td>
  </tr>
  <tr>
    <td>KingBaseES-R6</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>✅</td>
    <td>V8R6</td>
  </tr>
  <tr>
    <td>MariaDB</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>10.x</td>
  </tr>
  <tr>
    <td>OceanBase（MySQL模式）</td>
    <td>➖</td>
    <td>➖</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>3.x</td>
  </tr>
  <tr>
    <td>RabbitMQ</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>3.8.x</td>
  </tr>
  <tr>
    <td>Redis</td>
    <td>➖</td>
    <td>➖</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>2.8 ~ 6.0</td>
  </tr>
  <tr>
    <td>RocketMQ</td>
    <td>✅</td>
    <td>✅</td>
    <td>➖</td>
    <td>✅</td>
    <td>➖</td>
    <td>4.9.x</td>
  </tr>
</tbody>
</table>