# 搭建自动化部署流水线

本文面向运维与实施人员，介绍如何在使用 GitHub 和 GitHub Actions 将 TapData 项目发布到多套环境前，完成仓库、环境、凭据和自托管运行器准备。

## 准备工作

在开始配置之前，请确保已具备以下资源和信息：

| 所需资源 | 具体要求 |
| ---- | ---- |
| **GitHub 组织** | 至少拥有 1 个 GitHub 组织管理员权限。Worker 仓库与租户仓库可放在同一组织下。 |
| **TapData 环境** | 至少准备测试和生产两套 TapData 环境；如有独立的开发验证、性能验证或用户验收流程，可按需增加对应环境。 |
| **内网部署服务器** | 至少 1 台 Linux 服务器（推荐 Ubuntu 20.04+）作为自托管运行器，并同时可访问 GitHub 和所有环境的 TapData 服务端口。服务器需安装 `git`、`bash`、`jq`、`curl`，并注册 `tapdata` 标签。更多介绍，见[添加自托管的运行器](https://docs.github.com/zh/actions/how-tos/manage-runners/self-hosted-runners/add-runners)。 |
| **数据库账号信息** | 已从 DBA 处获取各环境数据库的连接地址、账号和密码。 |
| **部署审批人账号** | 至少指定 1 个 GitHub 账号作为资源导入审批人。 |


## 架构与规划要点

### 仓库规划

自动化部署依赖两类 GitHub 仓库协同工作：

| 仓库类型 | 用途 | 可见性 |
| ------ | ---- | ----- |
| **Worker 仓库**（1 个） | 存放共享的部署脚本和 Workflow，方便跨仓库调用，由运维团队维护 | Internal |
| **租户仓库** | 存放从 TapData 导出的配置文件，每个团队或业务域独立一个租户仓库 | Internal 或 Private |

### 环境规划

推荐先规划测试和生产两个业务环境，再按需增加中间环境。下列小写值是 GitHub Environment 和 Workflow 中使用的固定名称，括号中为对应的业务含义：

* `sit`：系统集成测试（SIT）环境，推送 Git Tag 后自动触发，如 `v1.2.3` 这类格式作为版本标识。
* `prod`：生产（Prod）环境，通过 GitHub Actions 手动触发；需要在租户仓库 Workflow 的 `workflow_dispatch.target_env.options` 中加入该选项。
* `deploy`：资源导入审批门，不存放凭据；当连接、任务或 API 需要导入目标环境时，用于人工确认后再继续执行。

:::tip

如需增加中间阶段，可继续创建 `dev`（开发验证）、`lpt`（性能验证）或 `aat`（用户验收）等环境。官方租户模板默认会在 `main` 分支合并后发布到 `dev`；如果不使用开发验证环境，需调整租户仓库的部署 Workflow，避免 PR 合并后触发到未配置的 `dev` 环境。

:::

### 权限与安全设计

TapData 导出的配置文件在导出时自动脱敏，代码仓库中只存放业务配置逻辑。各环境的真实连接凭据独立存储在对应的 GitHub Environment Secrets / Variables 中，部署时按环境自动注入。

- 在租户仓库的 `main` 分支开启分支保护：禁止直接推送、要求 Pull Request、要求 Code Review 和 Workflow 检查通过后再合并。
- `deploy` 审批人应为独立的运维人员，不建议由开发人员审批自己提交的变更。
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

1. 基于 TapData 提供的官方 Worker 仓库（[tapdata/tapdata-cicd-worker](https://github.com/tapdata/tapdata-cicd-worker/tree/main)），在您的 GitHub 组织下创建独立副本，可通过 **Use this template** 或克隆后推送到新仓库的方式完成，并将仓库命名为 `tapdata-cicd-worker`、可见性设为 **Internal**。

   仓库包含部署和回滚的编排逻辑及与 TapData API 交互的底层脚本：

   ```text
   tapdata-cicd-worker/
   ├── .github/workflows/
   │   ├── tapdata-deploy.yml       # 核心部署逻辑
   │   └── tapdata-rollback.yml     # 核心回滚逻辑
   ├── conf/
   │   └── Task_Run_Order.json      # 任务执行顺序配置
   ├── scripts/                     # 底层交互脚本
   └── tenant-template/.github/workflows/
       ├── tapdata-deploy.yml       # 租户仓库调用模板
       └── tapdata-rollback.yml     # 租户仓库回滚调用模板
   ```

2. 为业务团队创建一个存放配置的租户仓库，仓库名称建议与 TapData 平台中的项目名称保持一致（例如 `user-center-sync`）。

3. 租户仓库只需创建两个轻量级的 Workflow 路由文件（从 Worker 仓库的 `tenant-template/.github/workflows/` 目录复制），用于把触发事件转发给 Worker 仓库处理：
   - **`tapdata-deploy.yml`**：负责监听配置文件的合并（如 `main` 分支的 `*_tapdata_export/**` 路径变更）、Tag 推送以及手动触发动作，默认将租户仓库名作为项目名。
   - **`tapdata-rollback.yml`**：负责接收手动触发的回滚指令（指定环境和回滚版本）。
   
   :::tip
   在复制过来的这两个路由文件中，须将 `{WORKER_REPO}` 占位符替换为您刚刚创建的 Worker 仓库路径，例如 `your-org/tapdata-cicd-worker`。如 TapData 项目名与租户仓库名不一致，还需调整 `project` 入参。
   :::

4. 将修改好的 Workflow 文件提交并推送到租户仓库的 `main` 分支。


### 步骤二：配置组织级 Secrets 和 Variables

为了让 GitHub Actions 能够顺利连接并操作不同环境的 TapData 服务，我们需要在组织级别统一配置一些访问凭证（Secrets）和访问地址（Variables）。

1. 登录具备仓库权限的 GitHub 账号，进入个人 **Settings → Developer settings → Personal access tokens**。
   
2. 点击生成新 Token，名称可填 `tapdata-deploy`，有效期建议设置为 90 天以内，勾选 `repo` 权限范围，生成后请立即复制并妥善保存该 Token。
   
   :::tip
   如果您的 Worker 仓库和租户仓库在同一个 GitHub 组织下，建议使用更安全的 **Fine-grained PAT**。权限可精确控制为：Worker 仓库的 `Contents` 赋予**只读**权限；租户仓库的 `Contents` 和 `Pull requests` 赋予**读写**权限。
   :::

3. 进入 **组织设置 → Secrets and variables → Actions**。

4. 在 **Secrets** 标签卡下添加以下内容（加密存储）：

   | Secret 名称 | 内容说明 |
   | ----------- | ---- |
   | `GH_DEPLOY_TOKEN` | 刚刚在第一步中申请并保存的 PAT。 |
   | `SIT_TAPDATA_ACCESS_CODE` | 系统集成测试环境 TapData 实例的访问码。 |
   | `PROD_TAPDATA_ACCESS_CODE` | 生产环境 TapData 实例的访问码。 |
   | `{ENV}_TAPDATA_ACCESS_CODE` | 可选，如启用开发验证、性能验证或用户验收等中间环境，按环境代码补充对应访问码，例如 `DEV_TAPDATA_ACCESS_CODE`。 |
   | `VAULT_ENCRYPTION_KEY` | 可选，用于加密流水线生成的 `vault.json` 凭据文件。 |

5. 在 **Variables** 标签卡下添加以下内容（明文存储）：

   | Variable 名称 | 示例值 |
   | ------------- | ------ |
   | `SIT_TAPDATA_URL` | 系统集成测试环境地址，如 `http://10.0.0.2:3030` |
   | `PROD_TAPDATA_URL` | 生产环境地址 |
   | `{ENV}_TAPDATA_URL` | 可选，如启用中间环境，按环境代码补充对应地址，例如 `DEV_TAPDATA_URL`。 |

   :::tip
   如需获取 TapData Access Code，可使用管理员身份登录对应环境的 TapData 平台，进入**系统设置 → 用户管理**查看对应用户信息；部分场景下，也可由该用户登录后在右上角的**个人设置**中复制访问码。
   :::

### 步骤三：创建 Environment 并配置连接信息

1. 进入租户仓库的 **Settings → Environments**。
2. 至少创建 `sit`、`prod` 和 `deploy` 三个 Environment，其中 `sit` 和 `prod` 对应测试、生产业务环境，`deploy` 作为资源导入审批门。
3. 为 `deploy` 配置 **Required reviewers**，作为资源导入审批门。
4. 如需对用户验收或生产发布流程本身增加环境级审批，可在 `aat` 或 `prod` Environment 中另行配置 **Required reviewers**。
5. 如需开发验证、性能验证或用户验收等中间环境，再按实际流程创建对应 Environment。
6. 为测试、生产及其他实际启用环境配置对应环境下的真实连接信息，连接信息通常有两种保存方式：

   * **URI 格式**：适用于 MongoDB 等将用户名、密码包含在连接串中的场景，建议作为 Secret 保存，名称为 `{前缀}_URI`，例如 `FDM_URI`。
   * **Host:Port 格式**：适用于 PostgreSQL、Oracle、MySQL 等场景，地址和账号可存为 Variable，密码存为 Secret，名称分别为 `{前缀}_URL`、`{前缀}_USER`、`{前缀}_PASSWORD`，对应示例为 `ORACLE_SOURCE_URL`、`ORACLE_SOURCE_USER`、`ORACLE_SOURCE_PASSWORD`。

   如果多个连接可共用同一套默认连接信息，也可以配置 `DEFAULT_URL`、`DEFAULT_USER` 和 `DEFAULT_PASSWORD` 作为兜底值。

### 步骤四：安装自托管运行器

由于 GitHub 托管运行器无法直接访问企业内网中的 TapData 服务和数据库，需要在内网部署至少 1 台自托管运行器来执行部署任务，推荐注册到租户组织层级供多个仓库共享使用。

1. 进入 GitHub 组织的 **Settings → Actions → Runners**，点击 **New self-hosted runner**。
2. 在准备好的 Linux 服务器上，按 GitHub 页面提供的安装向导完成下载、注册和服务启动，注册时添加 `tapdata` 标签。
3. 安装完成后，返回 Runners 页面确认运行器状态为 `Idle`，并确保其带有 `tapdata` 标签且可访问所有目标环境的 TapData 服务端口。

## 完成验证

在开始第一次自动化部署前，请对照以下清单进行最终检查：

- [ ] Worker 仓库可见性为 `Internal`，并包含部署与回滚工作流及核心脚本。
- [ ] 租户仓库 Workflow 中的 `{WORKER_REPO}` 已替换为真实路径。
- [ ] 组织级 Secrets / Variables 已配置 `GH_DEPLOY_TOKEN`、测试和生产环境 Access Code 及 TapData URL。
- [ ] 租户仓库中已创建 `sit`、`prod`、`deploy`，以及实际启用的中间环境。
- [ ] 测试、生产及其他实际启用环境下已按命名规范配置好连接信息。
- [ ] 至少有 1 台自托管运行器处于 `Idle` 状态，带有 `tapdata` 标签，并可访问所有目标 TapData 环境。

完成以上检查后，即可继续阅读 [创建项目并部署](deploy-project.md)，将 TapData 配置打包并发布到目标环境。
