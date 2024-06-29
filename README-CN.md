[English README](README.md)

# TapData 用户手册

<p align="left">
<a href="https://auth.tapdata.net/" rel="nofollow"><img src="https://20778419.s21i.faiusr.com/4/2/ABUIABAEGAAg39a1kQYoqLyr0gEwyAE4Mw.png" style="zoom: 50%;" /></a>
</p>
欢迎访问 TapData 文档仓库，本仓库存储了 TapData 用户手册的源文件（Markdown 格式），前往 TapData 文档中心：https://docs.tapdata.io

如您发现 TapData 文档问题，欢迎[提交 Issue](https://github.com/tapdata/docs/issues/new) 告诉我们，我们会尽快修复，您也可以直接提交 PR 来修改。

## 什么是 TapData?

[TapData](https://tapdata.net/) 是一款面向数据服务的平台化产品，旨在帮助企业打破多个数据孤岛，完成数据快速交付，同时依靠实时数据同步，提高数据传输效率。

🎮 [开始免费使用](https://auth.tapdata.net/)


![](https://20778419.s21i.faiusr.com/3/2/ABUIABADGAAgtLr-lgYotInUhwYwgA84uAg.gif)

## 如何贡献

我们非常欢迎更多贡献者来帮助改进文档，TapData 文档使用 Markdown 语言编写，下面是提交 PR 的流程，如果您对这些操作比较陌生，欢迎[联系我们](#Contact)获得帮助。

1. 克隆本仓库至本地。

   ```shell
   git clone https://github.com/tapdata/docs.git
   ```

2. 安装相关依赖。

   > 执行下述命令前需要 [Node.js](https://nodejs.org/en/download/) v16.14 或以上版本（可运行 `node -v` 查看版本号）。

   ```shell
   cd docs
   npm install
   # or 
   yarn install
   ```

3. 修改或新增文档。

4. 在本地环境运行网页服务并预览您的更改，地址为 http://localhost:3000/。

   ```shell
   npm run start
   ```

5. 确认无问题后，提交 PR。

## 目录结构说明

```shell
├── docs                      # 存放当前版本的文档
│   ├── cloud                 # TapData Cloud 文档
│   │   ├── images            # 统一存放屏幕截图、架构图等，供文档引用
│   │   ├── …………
│   ├── enterprise            # TapData 文档
│   │   ├── images            
│   │   ├── …………
│   └── reuse-content         # 可复用内容，我们可以在 Markdown 文件中引用该目录中的文件
├── docusaurus.config.js      # 网站配置文件
├── sidebars.js               # 当前版本手册的目录
├── src                       # 非文档文件，例如自定义 CSS 文件
│   ├── components
│   ├── css
│   └── pages
├── static                    # 静态目录，该目录中的文件会被复制至 build 目录中，可以在这里提供网站 Logo 或下载资源
│   └── img
├── versioned_docs            # 存放分版文档
│   └── version-2.0           # 存放 2.0 版本的文档
│       ├── cloud
│       ├── enterprise
│       └── reuse-content
├── versioned_sidebars        # 2.0 版本手册的目录
└── versions.json             # 手册可用的版本信息
```



## <span id="Contact">联系我们</span>

- [Slack 频道](https://join.slack.com/t/tapdatacommunity/shared_invite/zt-1biraoxpf-NRTsap0YLlAp99PHIVC9eA)

- [Twitter @tapdata_daas](https://twitter.com/tapdata_daas)

- 加入技术社区 

	<p align="left">
	<a href="https://20778419.s21i.faiusr.com/4/2/ABUIABAEGAAg-JPfhwYonMrzlwEwZDhk.png" rel="nofollow"><img src="https://20778419.s21i.faiusr.com/4/2/ABUIABAEGAAg-JPfhwYonMrzlwEwZDhk.png" style="zoom: 100%;" /></a>
	</p>
	
	
	​			
	​			
	​					
	​			
	​		
	​	

