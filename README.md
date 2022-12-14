[中文项目介绍](README-CN.md)

# Tapdata Documentation

<p align="left">
<a href="https://auth.tapdata.net/" rel="nofollow"><img src="https://20778419.s21i.faiusr.com/4/2/ABUIABAEGAAg39a1kQYoqLyr0gEwyAE4Mw.png" style="zoom: 50%;" /></a> 
</p>

Welcome to Tapdata documentation!

This repository stores all the source files of Tapdata documentation, click to visit: https://docs.tapdata.io

If you find documentation issues, feel free to [create an Issue](https://github.com/tapdata/docs/issues/new) to let us know or directly create a Pull Request to help fix or update it.

## What is Tapdata?

[Tapdata](https://tapdata.io/) is a live data platform designed to connect data silos and provide fresh data to the downstream operational applications & operational analytics.

🎮 [Try it for free](https://auth.tapdata.net/)

![](https://20778419.s21i.faiusr.com/3/2/ABUIABADGAAgtLr-lgYotInUhwYwgA84uAg.gif)

## Contributing

We welcome contributions to help improve the documentation! Here is the steps:

> The Tapdata docs are written in Markdown. If you have any questions about the steps blow, please [contact us](#Contact).

1. Clone repository.

   ```shell
   git clone https://github.com/tapdata/docs.git
   ```

2. Install the dependencies.

   > [Node.js](https://nodejs.org/en/download/) version 16.14 or above (which can be checked by running `node -v`).

   ```shell
   cd docs
   npm install
   # or 
   yarn install
   ```

3. Modify or add your documentations.

4. Run a local development server to preview (http://localhost:3000/) your changes as you edit the files.

   ```shell
   npm run start
   ```

5. Create a pull request.

## Project structure

```shell
├── docs		       # Docs for the current version
│   ├── cloud		       # Tapdata Cloud Docs
│   │   ├── images	       # Screen shots, illustrations for docs
│   │   ├── …………
│   ├── enterprise	       # Tapdata Enterprise Docs
│   │   ├── images						
│   │   ├── …………
│   └── reuse-content	       # Reuse content, we can use Markdown files as components and import them elsewhere 
├── docusaurus.config.js       # A config file containing the site configuration
├── sidebars.js		       # Sidebar for the current version
├── src			       # Non-documentation files like pages or custom React components
│   ├── components
│   ├── css
│   └── pages
├── static		       # Static directory that will be copied into the root of the final build directory
│   └── img
├── versioned_docs	       # Versioned docs
│   └── version-2.0	       # Docs for the 2.0 version
│       ├── cloud
│       ├── enterprise
│       └── reuse-content
├── versioned_sidebars	       # Sidebar for the 2.0 version
└── versions.json	       # File to indicate what versions are available
```



## <span id="Contact">Contact</span>

We have a few channels for contact:

- [Slack channel](https://join.slack.com/t/tapdatacommunity/shared_invite/zt-1biraoxpf-NRTsap0YLlAp99PHIVC9eA)
- [@tapdata_daas](https://twitter.com/tapdata_daas) on Twitter
- Wechat: 

<p align="left">
<a href="https://20778419.s21i.faiusr.com/4/2/ABUIABAEGAAg3Z6tkAYoqdfZ4AIwjAM4jAM.png" rel="nofollow"><img src="https://20778419.s21i.faiusr.com/4/2/ABUIABAEGAAg3Z6tkAYoqdfZ4AIwjAM4jAM.png" style="zoom: 50%;" /></a>
</p>
