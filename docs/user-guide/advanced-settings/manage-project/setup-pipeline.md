# 搭建自动化部署流水线

本文面向运维与实施人员，介绍如何在使用 GitHub 和 GitHub Actions 将 TapData 项目发布到多套环境前，完成仓库、环境、凭据和自托管运行器准备。

## 准备工作

在开始配置之前，请确保已具备以下资源和信息：

| 所需资源 | 具体要求 |
| ---- | ---- |
| **GitHub 组织** | 至少拥有 1 个 GitHub 组织管理员权限。Worker 仓库与租户仓库可放在同一组织下。 |
| **TapData 环境** | 已准备好开发（Dev）、测试（Test）、生产（Prod）等多套 TapData 环境，且已知各环境的服务地址和管理员 Access Code。 |
| **内网部署服务器** | 至少 1 台 Linux 服务器（推荐 Ubuntu 20.04+）作为自托管运行器，并同时可访问 GitHub 和所有环境的 TapData 服务端口。部署时推荐注册为租户组织层级方便多仓库共享使用，更多介绍，见[添加自托管的运行器](https://docs.github.com/zh/actions/how-tos/manage-runners/self-hosted-runners/add-runners)。 |
| **数据库账号信息** | 已从 DBA 处获取各环境数据库的连接地址、账号和密码。 |
| **生产审批人账号** | 至少指定 1 个 GitHub 账号作为生产环境发布审批人。 |


## 架构与规划要点

### 仓库规划

自动化部署依赖两类 GitHub 仓库协同工作：

| 仓库类型 | 用途 | 可见性 |
| ------ | ---- | ----- |
| **Worker 仓库**（1 个） | 存放共享的部署脚本和 Workflow，方便跨仓库调用，由运维团队维护 | Internal |
| **租户仓库** | 存放从 TapData 导出的配置文件，每个团队或业务域独立一个租户仓库 | Internal 或 Private |

### 环境规划

推荐至少规划以下 4 个 GitHub Environment 或部署阶段：

* `dev`：开发环境，验证配置是否可正常导入，推荐 PR 合并到主分支后自动触发。
* `test`：测试环境，验证功能和吞吐，推荐推送 Git Tag 后自动触发，如 `v1.2.3` 这类格式作为版本标识。
* `prod`：生产环境，手动触发。
* `deploy`：生产发布审批门，不存放凭据，仅用于生产发布审批。

:::tip

测试和生产建议基于 Git Tag 部署，而不是直接基于分支部署，便于追溯和回滚；如企业有独立的用户验收测试流程，可在测试与生产之间增加一级环境。

:::

### 权限与安全设计

TapData 导出的配置文件在导出时自动脱敏，代码仓库中只存放业务配置逻辑。各环境的真实连接凭据独立存储在对应的 GitHub Environment Secrets 中，部署时按环境自动注入。

- 在租户仓库的 `main` 分支开启分支保护：禁止直接推送、要求 Pull Request、要求 Code Review 和 Workflow 检查通过后再合并。
- 生产部署审批人应为独立的运维人员，不建议由开发人员审批自己提交的变更。
- 组织级 Secrets / Variables 用于存放共享配置，例如 `GH_DEPLOY_TOKEN`、各环境的 TapData 地址和 Access Code。
- Environment 级 Secrets / Variables 用于存放各连接在不同环境下的真实连接信息。

### PAT 与命名规则

`GH_DEPLOY_TOKEN` 用于 Runner 拉取 Worker 仓库中的部署脚本，以及 TapData 平台向租户仓库推送配置并创建 Pull Request，权限建议如下：

- 同组织场景：优先使用 Fine-grained PAT，为 Worker 仓库授予 `Contents` 只读权限，为租户仓库授予 `Contents` 和 `Pull requests` 读写权限。
- 跨组织场景：可使用 Classic PAT，并勾选 `repo` 和 `workflow` 权限。

连接相关的 Secrets / Variables 命名规则为：将 TapData 中的连接名称转换为全大写，并将空格或连字符替换为下划线。例如连接名 `oracle-source` 对应前缀 `ORACLE_SOURCE`。

## 初始化步骤

以下步骤用于将前面的规划落实为可执行的 GitHub 自动化部署链路。

### 步骤一：初始化 GitHub 仓库结构

为实现部署逻辑与业务配置分离，我们采用双仓库架构，其中 **Worker 仓库** 由运维团队统一维护存放核心部署脚本，**租户仓库**由各业务团队各自维护存放项目配置，通过调用 Worker 仓库逻辑完成部署，无需关心底层实现。

1. 基于 TapData 提供的 Worker 样板仓库，在您的 GitHub 组织下创建独立副本，可通过 **Use this template** 或克隆后推送到新仓库的方式完成，并将仓库命名为 `tapdata-cicd-worker`、可见性设为 **Internal**。

   仓库包含部署和回滚的编排逻辑及与 TapData API 交互的底层脚本：

   ```text
   tapdata-cicd-worker/
   ├── .github/workflows/
   │   ├── tapdata-deploy.yml    # 核心部署逻辑
   │   └── tapdata-rollback.yml  # 核心回滚逻辑
   └── scripts/                  # 底层交互脚本
   ```

2. 为业务团队创建一个存放配置的租户仓库，仓库名称建议与 TapData 平台中的项目名称保持一致（例如 `user-center-sync`）。

3. 租户仓库只需创建两个轻量级的 Workflow 路由文件（可从 Worker 样板仓库中复制），用于把触发事件转发给 Worker 仓库处理：
   - **`tapdata-deploy.yml`**：负责监听配置文件的合并（如 `main` 分支的 `*_tapdata_export/**` 路径变更）、Tag 推送以及手动触发动作。
   - **`tapdata-rollback.yml`**：负责接收手动触发的回滚指令（指定环境和回滚版本）。
   
   :::tip
   在复制过来的这两个路由文件中，须找到 `uses:` 字段，并将其中的 `{worker-org}/{worker-repo}` 占位符替换为您刚刚创建的 Worker 仓库的实际路径。
   :::

4. 将修改好的 Workflow 文件提交并推送到租户仓库的 `main` 分支。


### 步骤二：配置组织级 Secrets 和 Variables

为了让 GitHub Actions 能够顺利连接并操作不同环境的 TapData 服务，我们需要在组织级别统一配置一些访问凭证（Secrets）和访问地址（Variables）。

1. 登录 GitHub，进入 **组织设置 → Developer settings → Personal access tokens → Tokens (classic)**。
   
2. 点击生成新 Token，名称可填 `tapdata-deploy`，有效期建议设置为 90 天以内，勾选 `repo` 权限范围，生成后请立即复制并妥善保存该 Token。
   
   :::tip
   如果您的 Worker 仓库和租户仓库在同一个 GitHub 组织下，建议使用更安全的 **Fine-grained PAT**。权限可精确控制为：Worker 仓库的 `Contents` 赋予**只读**权限；租户仓库的 `Contents` 和 `Pull requests` 赋予**读写**权限。
   :::

3. 进入 **组织设置 → Secrets and variables → Actions**。

4. 在 **Secrets** 标签卡下添加以下内容（加密存储）：

   | Secret 名称 | 内容说明 |
   | ----------- | ---- |
   | `GH_DEPLOY_TOKEN` | 刚刚在第一步中申请并保存的 PAT。 |
   | `DEV_TAPDATA_ACCESS_CODE` | 开发环境 TapData 实例的访问码。 |
   | `TEST_TAPDATA_ACCESS_CODE` | 测试环境 TapData 实例的访问码。 |
   | `PROD_TAPDATA_ACCESS_CODE` | 生产环境 TapData 实例的访问码。 |

5. 在 **Variables** 标签卡下添加以下内容（明文存储）：

   | Variable 名称 | 示例值 |
   | ------------- | ------ |
   | `DEV_TAPDATA_URL` | 开发环境地址，如 `http://10.0.0.1:3030` |
   | `TEST_TAPDATA_URL` | 测试环境地址，如 `http://10.0.0.2:3030` |
   | `PROD_TAPDATA_URL` | 生产环境地址，如 `http://10.0.0.3:3030` |

   :::tip
   如需获取 TapData Access Code，可使用管理员身份登录对应环境的 TapData 平台，进入**系统设置 → 用户管理**查看对应用户信息；部分场景下，也可由该用户登录后在右上角的**个人设置**中复制访问码。
   :::

### 步骤三：创建 Environment 并配置连接信息

1. 进入租户仓库的 **Settings → Environments**。
2. 依次创建 `dev`、`test`、`prod` 和 `deploy` 四个 Environment。
3. 为 `deploy` 配置 **Required reviewers**，作为生产发布审批门。
4. 为 `dev`、`test`、`prod` 配置对应环境下的真实连接信息，连接信息通常有两种保存方式：

   * **URI 格式**：适用于 MongoDB 等将用户名、密码包含在连接串中的场景，建议作为 Secret 保存，名称为 `{前缀}_URI`，例如 `FDM_URI`。
   * **Host:Port 格式**：适用于 PostgreSQL、Oracle、MySQL 等场景，地址和账号可存为 Variable，密码存为 Secret，名称分别为 `{前缀}_URL`、`{前缀}_USER`、`{前缀}_PASSWORD`，对应示例为 `ORACLE_SOURCE_URL`、`ORACLE_SOURCE_USER`、`ORACLE_SOURCE_PASSWORD`。

### 步骤四：安装自托管运行器

由于 GitHub 托管运行器无法直接访问企业内网中的 TapData 服务和数据库，需要在内网部署至少 1 台自托管运行器来执行部署任务，推荐注册到租户组织层级供多个仓库共享使用。

1. 进入 GitHub 组织的 **Settings → Actions → Runners**，点击 **New self-hosted runner**。
2. 在准备好的 Linux 服务器上，按 GitHub 页面提供的安装向导完成下载、注册和服务启动。
3. 安装完成后，返回 Runners 页面确认运行器状态为 `Idle`，并确保其可访问所有目标环境的 TapData 服务端口。

## 完成验证

在开始第一次自动化部署前，请对照以下清单进行最终检查：

- [ ] Worker 仓库可见性为 `Internal`，并包含部署与回滚工作流及核心脚本。
- [ ] 租户仓库 Workflow 中的 `{worker-org}/{worker-repo}` 已替换为真实路径。
- [ ] 组织级 Secrets / Variables 已配置 `GH_DEPLOY_TOKEN`、各环境 Access Code 和 TapData URL。
- [ ] 租户仓库中已创建 `dev`、`test`、`prod`、`deploy` 四个 Environment。
- [ ] `dev`、`test`、`prod` 环境下已按命名规范配置好连接信息。
- [ ] 至少有 1 台自托管运行器处于 `Idle` 状态，并可访问所有目标 TapData 环境。

完成以上检查后，即可继续阅读 [创建项目并部署](deploy-project.md)，将 TapData 配置打包并发布到目标环境。
