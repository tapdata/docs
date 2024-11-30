# 快速入门

本文将演示如何使用 Tap Shell 构建最简单的数据流任务，以帮助您快速掌握数据复制和流式处理的操作流程。如需了解如何利用 TapFlow 的多表处理功能来实现更复杂的业务需求（如实时宽表），推荐阅读[典型案例](tapflow-tutorial/README.md)。

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 步骤一：安装 TapFlow 

1. [下载并安装 Python 3](https://www.python.org/downloads/)，版本为 Python 3.6 及以上。

2. 执行下述命令创建虚拟环境，以便隔离依赖包，避免与系统 Python 环境冲突。

   ```bash
   python3 -m venv tapflow_env
   ```

3. 执行下述命令激活虚拟环境，安装 Tap Shell 及其所需的依赖包。

   ```bash
   # 激活虚拟环境
   source tapflow_env/bin/activate
   
   # 安装 Tap Shell
   pip3 install tapflow
   # 或者
   pip install tapflow
   ```

   至此已完成安装，退出命令行后再次使用 Tap Shell 前，需要先激活虚拟环境。

5. 输入 `tap` 启动 Tap Shell 。

6. 基于 TapData [部署方式](../quick-start/install/README.md)选择要连接产品系列，然后设置连接所需的认证信息，本案例以连接至 TapData Cloud 平台为例：

   ```bash
   Tap Flow requires TapData Live Data Platform(LDP) cluster to run. 
   If you would like to use with TapData Enterprise or TapData Community, type L to continue. 
   If you would like to use TapData Cloud, or you are new to TapData, type C or press ENTER to continue. 
   
   (if selected L)
   Please enter server:port of TapData LDP server: 
   Please enter access code
   
   (if pressed enter/C)
   # You may obtain the keys by log onto TapFlow Cloud, and click: "User Center" on the top right, then copy & paste the accesskey and secret key pair.
   # You can sign up for a new account from: https://cloud.tapdata.io if you don't have one
   # 
   Enter AK:   
   Enter SK:  
   ```

   * 输入 `C` 或回车键：即连接至 TapData Cloud 平台，此时需要输入访问密钥（Access Key）和密钥（Secret Key），输入时字符不可见，输入完成按回车键即可。

   * 输入 `L`：即连接至本地部署的 TapData Enterprise 平台，此时需要请输入服务器地址和访问码。

     <details>
     <summary>如何获取访问密钥？</summary>

     <Tabs className="unique-tabs">
     <TabItem value="TapData Cloud 平台">
     
     注册并登录 [TapData Cloud 平台](https://cloud.tapdata.net/)，单击右上角的用户名并选择**用户中心**，即可获取 Access Key 和 Secret Key 信息。
     
     ![获取 TapData Cloud 平台的 AK 信息](../images/obtain_cloud_ak.png)
     
     </TabItem>
     
     <TabItem value="TapData Enterprise 平台">
     
     联系管理员获取 TapData Enterprise 平台的登录地址，完成登录后单击右上角的用户名并选择**个人设置**，即可获取访问码。
     
     ![获取 TapData Enterprise 平台的访问码](../images/obtain_enterprise_ak.png)
     
     </TabItem>
     </Tabs>     
     
     </details>

密钥信息验证通过后，命令行将打印欢迎信息和当前的 Agent 等信息，表示已成功连接到 TapData 实时数据平台，此时可通过 `h` 命令查看帮助信息。

```bash
Mon Oct 21 15:53:50 CST 2024 connecting remote server: https://cloud.tapdata.net ...
Mon Oct 21 15:53:50 CST 2024 Welcome to TapData Live Data Platform, Enjoy Your Data Trip !
========================================================================================================================
TapData Cloud Service Running Agent: 1
Agent name: agent-192*****67, ip: 172.17.0.3, cpu usage: 16%
```

## 步骤二：创建数据流

在完成数据源配置后，我们可以通过下述任意方式来创建一个数据流，将 MySQL 数据同步到 MongoDB：

- **基于交互式命令创建**：通过命令行直接交互操作，实时定义和调整数据流，适合快速验证和简单任务的构建。
- **基于 Python 编程创建**：通过 Python 代码编程方式控制数据流逻辑，便于保存、复用和版本化管理，适合复杂场景下的动态任务构建和自动化部署。

<details><summary>什么是数据流（Data Flow）？</summary>
在 Tapdata 中，数据流（Data Flow）是一个执行单元，用于在数据源之间进行数据同步、处理和转换。它可以包含多个数据同步任务，将不同数据源的数据整合、清洗、转换后写入目标系统，实现从源到目标的高效数据流动。



而数据流任务是比单一的实时同步任务更上层，适合定义复杂的数据管道，可以满足多表关联、数据聚合等需求，是 Tapdata 实现实时数据处理的基础。

</details>




```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="基于交互式命令创建" default>
```

接下来，我们通过 Tap Shell 完成数据源配置，这里我们将 MySQL 数据库作为源库，MongoDB 作为目标库。

1. 执行下述格式的命令，添加源 MySQL  数据库，名称保存为 `MySQL_ECommerce`。

   ```python
   # 定义一个字典变量 mysql_json_config，用于存储 MySQL 数据源的连接配置
   mysql_json_config = {
       'database': 'ECommerceData',  # 数据库名称
       'port': 3306,                 # MySQL 端口，通常为 3306
       'host': '192.168.1.18',       # MySQL 主机地址
       'username': 'your_username',  # 数据库用户名
       'password': 'your_passwd'     # 数据库密码
   }
   
   # 创建数据源连接对象 mysql_conn，引用 mysql_json_config 配置并将其作为源库保存
   mysql_conn = DataSource('mysql', 'MySQL_ECommerce', mysql_json_config).type('source').save()
   ```

   配置完成后该连接信息将保存至 TapData 平台，系统将自动进行连接测试，通过后自动加载其 Schema 信息，示例输出信息如下：

   ````python
   datasource MySQL_ECommerce creating, please wait...                                
   save datasource MySQL_ECommerce success, will load schema, please wait...          
   load schema status: finished
   ````

2. 执行下述格式的命令，添加作为目标的 MongoDB 数据库，名称保存为 `MongoDB_ECommerce`。

   ```python
   # 定义一个字典变量 mongodb_json_config，用于存储 MongoDB 数据源的 URI 连接信息
   mongodb_json_config = {
       "uri": "mongodb://your_username:your_passwd@192.168.1.18:27017/ecommerce?authSource=admin"
   }
   
   # 创建数据源连接对象 mongodb_conn，引用 mongodb_json_config 配置并将其作为目标库保存
   mongodb_conn = DataSource("mongodb", "MongoDB_ECommerce", mongodb_json_config).type("target").save()
   ```

   :::tip

   - Tap Shell 支持连接[数十种常见数据源](../prerequisites/supported-databases.md)，每种数据源类型的配置参数可能略有不同，如需了解更多的权限和参数等说明，见[连接数据源](../prerequisites/README.md)。
   - 若出现 “**load schema status: error**” 错误，通常是权限或配置问题，可再次使用相同名称重试，系统会提示 “**database MongoDB_ECommerce exists, will update its config**” 并覆盖原配置。 

   :::

3. 将创建一个名为 **MySQL_to_MongoDB_Order_Sync** 的数据流，将 MySQL 的订单数据同步到 MongoDB 的目标集合中。

   ```python
   # 创建数据流任务对象，并指定源表和目标表
   myflow = Flow("MySQL_to_MongoDB_Order") \
          .read_from("MySQL_ECommerce.ecom_orders") \
          .write_to("MongoDB_ECommerce.orders_collection") \
          .save()
   ```

   在上述示例中，`read_from` 用于指定 MySQL 中的 `ecom_orders` 表作为数据源，而 `write_to` 指定 MongoDB 的 `orders_collection` 作为数据的目标存储，设置完成后，任务将进入待启动状态，命令提示如下：

   ```python
   Flow updated: source added
   Flow updated: sink added
   ```

4. 通过以下命令启动同步任务。TapData 会自动执行全量同步，并在完成后进入增量同步模式，捕获源表的实时数据变更并同步到目标。

   ```python
   myflow.start()
   ```

   启动任务后，系统将输出任务状态信息，示例如下：

   ```python
   Task start succeed
   ```

5. 在任务运行过程中，您可以随时查看任务的状态和运行统计信息。

   ```python
   stats MySQL_to_MongoDB_Order
   ```

   示例输出：

   ```bash
   job current status is: running, qps is: 0.0, total rows: 198881, delay is: 253ms
   ```

   此外，还可以通过 `logs <flow name/id>` 命令查看任务日志，以便调试或监控同步进度。

6. （可选）如果需要停止任务，可以使用  `stop <flow name/id>`  命令。

</TabItem>
<TabItem value="基于 Python 编程创建">

通过编程方式，您可以灵活定义和管理数据流，以下示例展示了如何使用 Python 创建一个从 MySQL 到 MongoDB 的数据流。

1. 在您的 Python 脚本中，导入所需的模块：

   ```python
   from tapflow.lib import *
   ```

2. 定义源数据库（MySQL）和目标数据库（MongoDB）的连接配置，并创建对应的连接对象。

   ```python
   # 定义 MySQL 数据源的连接配置
   mysql_config = {
       'database': 'ECommerceData',
       'port': 3306,
       'host': '192.168.1.18',
       'username': 'your_username',
       'password': 'your_password'
   }
   
   # 创建 MySQL 数据源对象，并保存为源库
   mysql_source = DataSource('mysql', 'MySQL_ECommerce', mysql_config).type('source').save()
   
   # 定义 MongoDB 数据源的连接配置
   mongodb_config = {
       'uri': 'mongodb://your_username:your_password@192.168.1.18:29917/ecommerce?authSource=admin'
   }
   
   # 创建 MongoDB 数据源对象，并保存为目标库
   mongodb_target = DataSource('mongodb', 'MongoDB_ECommerce', mongodb_config).type('target').save()
   ```

3. 定义数据流，将数据从 MySQL 的 `ecom_orders` 表同步到 MongoDB 的 `orders_collection` 集合。

   ```python
   # 创建数据流任务
   flow = Flow("MySQL_to_MongoDB_Order_Sync")
   flow.read_from("MySQL_ECommerce.ecom_orders")
   flow.write_to("MongoDB_ECommerce.orders_collection")
   ```

4. 保存数据流配置并启动任务。

   ```python
   # 保存数据流配置
   flow.save()
   
   # 启动数据流任务
   flow.start()
   print("数据流任务已启动。")
   ```

5. （可选）通过以下代码检测任务的运行状态。

   ```python
   # 输出任务状态
   while True:
       status = flow.status()
       if status == "running":
           print(f"任务状态：{status}")
           break
       elif status == "error":
           print("任务启动失败，请检查配置或日志。")
           break
   ```

6. 将上述代码合并一起保存为 `ecom_flow.py`，然后通过以下命令运行：

   ```shell
   tap -f ecom_flow.py
   ```

   输出示例如下：

   ```bash
   datasource MySQL_ECommerce creating, please wait...                                  
   save datasource MySQL_ECommerce success, will load schema, please wait...            
   load schema status: finished
   datasource MongoDB_ECommerce creating, please wait...                                
   save datasource MongoDB_ECommerce success, will load schema, please wait...          
   load schema status: finished
   Flow updated: source added
   Flow updated: sink added
   数据流任务已启动。
   任务状态：running
   ```

   


<details><summary>进一步优化</summary>

   - **配置管理**：将数据源配置提取到配置文件或环境变量中，保护敏感信息。
   - **异常处理**：添加异常捕获，处理可能出现的连接错误或运行时错误。
   - **日志记录**：使用 `logging` 模块记录任务运行信息，方便调试和监控。

</details>

   </TabItem>
  </Tabs>



## 进阶阅读

* [典型使用案例](tapflow-tutorial/README.md)
* [TapFlow API 参考](api-reference/README.md)
* [Tap Shell 命令参考](tapcli-reference.md)









