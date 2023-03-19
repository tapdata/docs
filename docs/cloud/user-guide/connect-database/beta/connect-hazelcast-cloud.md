# 连接 Hazelcast Cloud

1. 点击左侧菜单栏的【连接管理】，然后点击右侧区域【连接列表】右上角的【创建连接】按钮，打开连接类型选择页面，然后选择 **Hazelcast Cloud**。

2. 在打开的连接信息配置页面依次输入需要的配置信息。

   ![](../../../images/connect_hazelcast_cloud.png)

   * Connection Name：设置连接的名称，多个连接的名称不能重复
   * Cluster Name： database_name, string, 输入框, 必填
   * Token：plain_password, string, 输入框, 必填
   * Enable SSL：ssl，boolean，开关
   * Key Store File, sslKey, string, 上传文件，开了ssl才出现
   * Trust Key Store File, sslCA, string, 上传文件，开了ssl才出现
   * Key File Password, string, sslPass, 输入框，开了ssl才出现

3. 测试连接，提示测试通过后保存连接即可。
