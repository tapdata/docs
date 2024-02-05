# EXCEL

Tapdata 支持读取 Local（本地）、FTP、SFTP、SMB、S3FS 或 OSS 上的文件，支持的文件类型包括 [CSV](csv.md)、EXCEL、[JSON](json.md) 和 [XML](xml.md)，满足多样化的数据流转需求。

Excel 是使用广泛的数据统计和数据分析软件，完成 Agent 部署后，您可以跟随本文教程在 Tapdata 中添加 EXCEL 数据源，后续可将其作为源库来构建数据管道。

## 注意事项

- 一个连接配置仅对应一个模型（表），如有多个模型您需要分别为其创建链接。
- Excel 数据源仅适用于数据转换任务，暂不支持在数据复制任务中引用。
- 为避免超大 Excel 文件占满机器内存，推荐 Excel 文件不超过 512 MB。
- Tapdata 默认每隔 1 分钟检测 Excel 文件是否发生变更（如新增/修改文件），如发生变更则将涉及的文件全量新增后更新条件字段以完成修改，暂不支持同步删除文件或数据。
- Excel 文件中可用的数据类型为 BOOLEAN、DATE、DOUBLE、STRING、TEXT。

## <span id="prerequisite">准备工作</span>

本小节介绍在创建 EXCEL 数据源连接前所需的准备工作，请根据 EXCEL 文件的存放位置选择阅读。

### 文件存放在 Local/FTP/SFTP/SMB

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="unique-tabs">
   <TabItem value="local" label="Local（本地）">

   <p>当您将文件存放在 Tapdata 所属的设备上，可将其作为数据来源，准备工作如下：</p> 
  <ol>
   <li>登录至 Tapdata 所属设备。</li>
   <li>为便于管理，新建一个文件夹用来存放文件，以 root 用户为例，我们新建一个文件夹为： <code>/root/files</code>。</li>
   <li>将 Excel 文件存放至该文件夹。</li>
  </ol> 
  <p>后续在配置数据源时，您只需提供<strong>文件存放路径</strong>即可。</p>

   </TabItem>
   <TabItem value="ftp" label="FTP">
    <p>文件传输协议（FTP）是用于在网络上进行文件传输的一套标准协议。如需将 FTP 服务中的文件作为数据来源，准备工作如下：</p> 

  <ol>
   <li>安装 FTP 服务（如 <a href="https://security.appspot.com/vsftpd.html">vsftpd</a>）并保障网络通信正常。</li>
   <li>如开启了认证，您需要准备 FTP 的账号与密码，保障其具备文件读取权限。</li>
   <li>记录 Excel 文件存放路径，后续配置数据源时使用。</li>
  </ol>



   </TabItem>
   <TabItem value="sftp" label="SFTP">

   <p>安全文件传输协议（SFTP）可为文件提供一种安全加密的网络传输方法。如需将 SFTP 服务中的文件作为数据来源，准备工作如下：</p> 
  <ol>
   <li>安装 SFTP 服务（openssh-client 与 openssh-server）并保障网络通信正常。</li>
   <li>准备 SFTP 服务的账号、密码，保障其具备文件读取权限。</li>
   <li>记录 Excel 文件存放路径，后续配置数据源时使用。</li>
  </ol>



   </TabItem>
   <TabItem value="smb" label="SMB">

   <p>信息服务快协议（SMB）是一种Linux、UNIX系统上可用于共享文件和打印机等资源的协议。如需将 Samba 服务中的文件作为数据来源，准备工作如下：</p> 
  <ol>
   <li>安装 SMB （支持 1.0/2.0/3.0 版本）协议的软件，如 Samba ，保障网络通信正常。</li>
   <li>准备 Samba 服务的账号、密码，保障其具备文件读取权限。</li>
   <li>记录 Excel 文件存放的路径，后续配置数据源时使用。</li>
  </ol>

   </TabItem>
  </Tabs>


### 文件存放在 Amazon S3 

import Content2 from '../../../reuse-content/beta/_file-store-s3.md';

<Content2 />


### 文件存放在 OSS


import Content3 from '../../../reuse-content/beta/_file-store-oss.md';

<Content3 />


## 添加数据源

1. 登录 Tapdata 平台。

2. 在左侧导航栏，单击**连接管理**。

3. 单击页面右侧的**创建**。

4. 在弹出的对话框中，选择 **Excel**。

5. 在跳转到的页面，根据下述说明填写 Excel 的连接信息。

   ![连接 Excel](../../images/connect_excel.png)

   * **连接名称**：填写具有业务意义的独有名称。

   * **连接类型**：目前仅支持**源头**。

   * **文件协议**：根据 Excel 文件存放的位置选择下述协议，本文以 **FTP** 为例演示操作流程。
     
     :::tip
     
     关于如何获取各协议所需填写的信息，见 [准备工作](#prerequisite)。     
     
     :::
     
      * **Local**：文件存放在本地（引擎）所在的设备上，选择此项后，您还需要填写文件路径。
      * **FTP**（文件传输协议）：文件存放在 FTP 服务器上，选择此项后，您还需要填写 FTP 服务器的地址、端口、用户名、口令、文件路径等信息，如上图所示。
      * **SFTP**（安全加密文件传输协议）：文件存放在 SFTP 服务器上，选择此项后，您还需要填写 SFTP 服务器的地址、端口、用户名、口令、文件路径等信息。
      * **SMB**（文件共享协议）：文件存放在 SMB 服务器上，兼容 1.x、2.x、3.x，选择此项后，您还需要填写 SMB 服务器的地址、用户名、口令、文件路径等信息。
      * **S3FS**（遵循S3协议文件系统）：文件存放在 Amazon S3 存储桶上，选择此项后，您还需要填写 Accesskey、Secretkey、终端（固定为 **s3.amazonaws.com**）、桶和文件路径等信息。
      * **OSS**（对象存储服务）：文件存放在阿里云对象存储 OSS 上，选择此项后，您还需要填写云账户的 Accesskey、Secretkey、终端、桶和文件路径等信息。
     
   * **Agent 设置**：默认为**平台自动分配**，您也可以手动指定。

   * **模型加载时间**：当数据源中模型数量小于 10,000 时，每小时刷新一次模型信息；如果模型数据超过 10,000，则每天按照您指定的时间刷新模型信息。

6. 单击**连接测试**，测试通过后单击**保存**。

   :::tip

   如提示连接测试失败，请根据页面提示进行修复。

   :::

## 相关文档
[采集 Excel 数据至 MySQL](../../pipeline-tutorial/excel-to-mysql.md)
