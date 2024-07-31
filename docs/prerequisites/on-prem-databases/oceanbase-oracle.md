# OceanBase（Oracle 模式）

OceanBase 数据库是一个金融级分布式关系数据库，TapData 支持将 OceanBase（Oracle） 作为目标库，帮助您快速构建数据流转链路。接下来，我们将介绍如何在 TapData 平台中连接 OceanBase（Oracle模式）数据源。



## 支持版本

OceanBase 4.x（企业版）

## 准备工作

1. 创建用户数据同步的账号并授予权限。

   :::tip

   OceanBase（Oracle 模式）高度兼容 Oracle，支持 Oracle 的绝大部分功能，对于源读取和目标写入相关授权要求完全可以参考 Oracle 的相关文档。

   :::

2. 如需将 OceanBase（Oracle 模式）作为源库并进行增量同步，您还需要执行下述步骤。

   1. 下载 [ObLogProxy](https://www.oceanbase.com/softwarecenter-enterprise) 服务。

      OBLogProxy 是 OceanBase 的增量日志代理服务，它可以与 OceanBase 建立连接并进行增量日志读取，为下游服务提供了变更数据捕获（CDC）的能力。

   2. 执行 `rpm -i oblogproxy-{version}.{arch}.rpm` 格式的命令安装 OBLogProxy，默认安装路径为 /usr/local/oblogproxy。

   3. 修改其配置文件 ` conf/conf.json`，找到下述配置并填写数据库的账号和密码，该用户必须是 sys 租户的用户，且必须具备 sys 租户下 OceanBase 数据库的读权限。

      ```bash
      "ob_sys_username": ""
      "ob_sys_password": ""
      ```

      如需实现加密设置用户名和密码，方式为 `./bin/logproxy -x username` 和 `./bin/logproxy -x password`。

   4. 执行下述命令启动 ObLogProxy。

      ```bash
      cd /usr/local/oblogproxy
      ./run.sh start
      ```

   5. 联系 TapData 技术支持获取 ob-log-decoder 安装包，然后执行下述命令解压安装包。

      ob-log-decoder是 TapData 为 OceanBase-Oracle 模式量身打造，用于对接 liboblog cdc 组件为下游服务提供了变更数据捕获（CDC）的能力。

      ```bash
      # 解压 cdc
      rpm2cpio oceanbase-cdc-4.2.1.4-104010012024030720.el7.x86_64.rpm | cpio -idv
      ```

   6. 将 obcdcServer 复制到解压后的bin目录 `${work_directory}/home/admin/oceanbase/bin`。

   7. 然后依次执行下述命令启动服务，默认使用的数据库用户是 `cluster_user=root@sys`

      ```bash
      export LD_LIBRARY_PATH=${work_directory}/home/admin/oceanbase/lib64/
      ./obcdcServer



## 添加数据源

1. 登录 TapData 平台。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建**。

4. 在弹出的对话框中，搜索并选择 **OceanBase（Oracle）**。

5. 在跳转到的页面，根据下述说明填写 OceanBase（Oracle） 的连接信息。

   * **连接信息设置**
     * **连接名称**：填写具有业务意义的独有名称。
     * **连接类型**：目前仅支持 OceanBase 作为**目标**库。
     * **地址**：数据库连接地址。
     * **端口**：数据库的服务端口，默认为 **2881**。
     * **数据库**：数据库名称，即一个连接对应一个数据库，如有多个数据库则需创建多个数据连接。
     * **账号**：数据库的租户账号，格式为 `用户名@租户名`，例如要通过 `datasync` 账号连接默认的 test 租户时，即填写为 `datasync@test`。
     * **密码**：租户账号对应的密码。
     * **连接参数**：额外的连接参数，默认为空。
     * **RPC 端口**：默认为 **2882**。
     * **日志服务器地址**：填写您在准备工作中安装的日志服务所属的机器地址，此参数仅在作为源库且需要增量同步时填写。
     * **日志服务器端口**：默认为 **8190**。
     * **CDC 账号和密码**：填写用于数据变更捕获的账号和密码，此参数仅在作为源库且需要增量同步时填写。
     * **时区**：默认为数据库所用的时区，您也可以根据业务需求手动指定。
   * **高级设置**
     * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定 Agent。
     * **模型加载时间**：当数据源中模型数量小于 10,000 时，每小时刷新一次模型信息；如果模型数据超过 10,000，则每天按照您指定的时间刷新模型信息。
   
6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::