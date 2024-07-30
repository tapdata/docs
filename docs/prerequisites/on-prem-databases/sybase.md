# Sybase

Sybase 是一种关系型*数据库*系统，是一种典型的 UNIX 或 WindowsNT 平台上客户机/服务器环境下的大型数据库系统。

## 配置说明

* 数据库连接与端口：需要正确填写您的数据库链接和端口

* 账号密码：配置数据源是请填写您的账号密码，权限配置示例如下，假设账号为 username：

  ```sql
  sp_displaylogin username
  sp_role 'grant', sa_role, username
  sp_role 'grant', replication_role, username
  sp_role 'grant', sybase_ts_role, username
  ```

* 获取字符集：正确的字符集配置可以正常解析中文繁体与中文简体字文本以及一些特殊字符，请通过已下方式来查询字符集设置

  ```sql
  -- 执行以下SQL获取 Run Value 字段的值
  sp_configure 'default character set id';
  
  -- 获取上一步骤时查询到的 Run Value， 执行以下SQL获取对应字符集
  select name,id from master..syscharsets where id= ${Run Value}
  ```
