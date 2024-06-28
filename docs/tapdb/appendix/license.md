# 使用 License

本文介绍 TapDB 产品的 License 文件如何使用及其常见问题。

## 操作步骤

1. 将获取到的 License 文件上传至 TapDB 所部署的机器上，赋予其读权限。

    >提示: 为保障 License 文件的有效性，请勿修改该文件的名称或内容。

2. 启动 TapDB 时，通过增加参数 --license 来指定 License 文件位置，示例如下：

    ```
    ./tapdb --license=/mypath/to/license
    ```

## 常见问题

- 问：License 文件内容是什么样的？

    答：示例如下：
    ```
    product:tapdb
    customer:customer
    expireAt:1718037761
    createAt:2024-05-13 00:42:41
    sales:Alice
    signature:N************************************************WKYP/Q==
    ```
  
- 问：TapDB 在什么阶段检测 License？

    答：为避免影响数据库稳定性，TapDB 仅在启动时检测 License，如果运行过程中 License 授权过期，不会影响数据库运行，下次启动时会报错无法启动。


- 问：启动报错 “BadValue: please set license file path with --license ”

    答：启动 TapDB 时，未指定 License 文件。


- 问：启动报错 “ "msg":"license is invalid 2, please send email to team@tapdata.io to get an valid license"}, BadValue: license is not valid ”

    答：License 文件可能因修改导致无效，请联系技术支持团队重新获取。


- 问：TapDB 正常启动，提示 “license will expire in","attr":{"days":28}}”

    答：License 有效期小于 30 天时，会额外打印剩余有效期时间，本案例中有效期剩余 8 天，请及时联系技术支持团队申请新的 License 文件。