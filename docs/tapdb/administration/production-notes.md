# 生产说明

本页详细介绍了影响 TapDB 系统配置的因素，尤其是在生产环境中运行时的注意事项。

:::tip

TapDB 4.2 删除了已弃用的 MMAPv1 存储引擎，建议将 MMAPv1 存储引擎更改为 WiredTiger 存储引擎。

:::

## 平台支持说明

:::tip

在 macOS 10.12.x、10.13.x 和 10.14.0 上非正常关闭期间，TapDB 4.0 可能会丢失数据。 Apple 已在 macOS 10.14.1 中修复此问题。

:::

### x86_64 架构

TapDB 需要满足以下最低配置要求的 x86_64 微架构：

**对于 Intel x86_64**：

- Sandy Bridge 或更高版本的酷睿处理器
- Tiger Lake 或更高版本的赛扬或奔腾处理器

**对于 AMD x86_64**：

- Bulldozer 或更高版本的处理器



从 TapDB 5.0 开始，TapDB、taps 和旧版 TapDB shell 不再支持不符合最低微架构要求的 x86_64 平台。

- TapDB 仅支持运行 Red Hat Compatible Kernel (RHCK) 的 Oracle Linux。TapDB 不支持 Unbreakable Enterprise Kernel (UEK)。
- TapDB 5.0 需要使用 AVX 指令集，该指令集在部分 Intel 和 AMD 处理器上可用。

### arm64 架构

在 arm64 上，TapDB 需要 ARMv8.2-A 或更高版本的微架构。

从 TapDB 5.0 开始，TapDB、taps 和旧版 TapDB shell 不再支持不符合最低微架构要求的 arm64 平台。

:::tip

TapDB 不再支持缺乏适当 CPU 架构的单板硬件（如 Raspberry Pi 4）。

:::

## 平台支持列表

### x86_64架构

- Ubuntu 22.04，20，18
- CentOS 8.5，7.2
- Debian 10 
- Kylin v10-sp2
- openEuler-22.03-sp3

### arm 架构

- CentOS 8.5
- Kylin v10-sp1

## dbPath

`dbPath` 目录中的文件必须与配置的存储引擎 `tapdbdbPath--storageEngine` 相对应。必须拥有指定 dbPath 的读取和写入权限。

如果您使用防病毒 (AV) 扫描程序或端点检测和响应 (EDR) 扫描程序，请将扫描程序配置为从扫描中排除 `database storage path` 和 `database log path` 。

`database storage path` 中的数据文件已压缩。此外，如果使用加密存储引擎，数据文件也会被加密。扫描这些文件的 I/O 和 CPU 成本可能会显着降低性能，而不提供任何安全优势。

如不排除 `database storage path` 和 `database log path` 中的目录，扫描程序可能会隔离或删除重要文件。丢失或隔离的文件可能会损坏数据库并使 TapDB 实例崩溃。

## 并发

### WiredTiger

WiredTiger 支持读取者和写入者对集合中的文档进行并发访问。客户端可以在写入操作进行时读取文档，并且多个线程可以同时修改集合中的不同文档。

## 数据一致性

### 日记

TapDB 使用预写式日志记录到磁盘上的日志。日志保证在由于崩溃或其他严重故障而终止的情况下，TapDB 可以快速恢复已写入日志但未写入数据文件的 写入操作 TapDB。

保持日志功能处于启用状态，以确保 TapDB 能够在崩溃后恢复其数据文件并使数据文件保持在有效状态。有关更多信息，请参阅日志。

从 TapDB 4.0 ，您不能为使用 WiredTiger 存储引擎的副本集成员指定 `--nojournal` 选项或 `storage.journal.enabled: false` 。

### 读关注 (read concern)

从 TapDB 3.6，如果写入请求确认，则可以使用因果一致会话来读取自己的写入。

TapDB 3.6 之前的版本，为了读取您自己的写入，您必须使用 `{ w: "majority" }` 写关注发出写入操作，然后使用 `primary` 读取偏好以及 `"majority"` 或 `"linearizable"` 读关注发出读取操作。

### 写关注
写关注描述了 TapDB 为写入操作请求的确认级别。写关注的级别会影响写入操作的返回速度。当写入操作具有较弱的写关注时，它们会快速返回。对于更强的写关注，客户端在发送写入操作后必须等待，直到 TapDB 在请求的写关注级别确认写入操作。由于写关注不足，写入操作可能在客户端看来已成功，但在某些服务器故障的情况下可能不会持久化。

## 网络

### 使用可信网络环境

务必在可信环境中运行 TapDB，使用网络规则阻止来自所有未知计算机、系统和网络的访问。与任何依赖于网络访问的敏感系统一样，您的 TapDB 部署应该只能由需要访问的特定系统访问，例如应用程序服务器、监控服务和其他 TapDB 组件。

:::tip

默认情况下，未启用授权，并且tapdb假定环境可信。根据需要启用 authorization 模式。

:::

### 禁用 HTTP 接口

在版本 3.6 中进行了更改：TapDB 3.6 删除了已弃用的 HTTP 接口和 TapDB 的 REST API。

早期版本的 TapDB 提供一个 HTTP 接口来检查服务器的状态，且可选地运行查询。该 HTTP 接口默认禁用。请勿在生产环境中启用该 HTTP 接口。

### 管理连接池大小

通过调整连接池大小以适应您的使用案例，避免 TapDB 或 taps 实例的连接资源过载。从当前数据库请求典型数量的 110 - 115 % 开始，并根据需要修改连接池大小。

connPoolStats 命令返回有关分片集群中taps和tapdb实例的当前数据库的打开连接数的信息。

## 硬件考虑因素

TapDB 专门针对商用硬件而设计，几乎没有硬件要求或限制。TapDB 的核心组件在小端硬件上运行，主要是 x86/x86_64 处理器。客户端库（即驱动程序）可以在大端或小端系统上运行。

### 分配足够的 RAM 和 CPU

至少应确保每个tapdb或taps实例都能访问两个实际核心或一个多核物理 CPU。

#### WiredTiger

WiredTiger存储引擎是多线程的，可以利用额外的 CPU 内核。具体来说，相对于可用 CPU 数量的活动线程（即并发操作）总数可能会影响性能：

- 吞吐量随着并发活动操作数量增加而增加，最高可达 CPU 数量。

- 当同时活跃的操作数量超过 CPU 数量且超出的数量达到一定阈值时，吞吐量便会降低。

阈值取决于您的应用程序。您可以通过试验和测量吞吐量来确定应用程序的最佳并发活动操作数量。`tapstat` 的输出在 (ar|aw) 列中提供了关于活动读取/写入数量的统计信息。

借助 WiredTiger，TapDB 可同时利用 WiredTiger 内部缓存和文件系统缓存。

默认情况下，WiredTiger 对所有集合使用 Snappy 区块压缩，对所有索引使用前缀压缩。压缩默认值可以在全局级别进行配置，也可以在集合和索引创建期间针对每个集合和每个索引进行设置。

WiredTiger 内部缓存和磁盘格式中的数据使用不同的表示形式：

- 文件系统缓存中的数据与磁盘上的数据格式相同，并且同样拥有数据文件压缩带来的好处。操作系统使用文件系统缓存来减少磁盘 I/O。

- WiredTiger 内部缓存中加载的索引具有与磁盘上格式不同的数据表示形式，但仍可利用索引前缀压缩来减少 RAM 使用量。索引前缀压缩会对被索引字段中的常用前缀去重。

- WiredTiger 内部缓存中的集合数据未压缩，并使用与磁盘上格式不同的表示形式。区块压缩可大幅节省磁盘上存储空间，但数据必须解压缩才能由服务器操作。

要调整 WiredTiger 内部缓存的大小，请参阅storage.wiredTiger.engineConfig.cacheSizeGB和--wiredTigerCacheSizeGB 。避免将 WiredTiger 内部缓存大小增加到超过其默认值。

:::tip

storage.wiredTiger.engineConfig.cacheSizeGB限制 WiredTiger 内部缓存的大小。操作系统使用可用的空闲内存进行文件系统缓存，这允许压缩的 TapDB 数据文件保留在内存中。此外，操作系统还使用任何空闲 RAM 来缓冲文件系统区块和文件系统缓存。

为了容纳额外的 RAM 用户，您可能必须减少 WiredTiger 的内部缓存大小。

:::

默认 WiredTiger 内部缓存大小值假定每台计算机有一个tapdb实例。如果一台计算机包含多个 TapDB 实例，则应减少该设置以容纳其他tapdb实例。

如果在容器（例如tapdb 、 lxc 、Docker 等）中运行cgroups ，而该容器无法访问系统中的所有可用 RAM，则必须将storage.wiredTiger.engineConfig.cacheSizeGB设置为一个值小于容器中可用的 RAM 量。确切的数量取决于容器中运行的其他进程。请参阅memLimitMB 。

要查看有关缓存和逐出率的统计信息，请参阅`wiredTiger.cache` 命令返回的`serverStatus` 字段。

#### 压缩和加密

使用加密时，配备 AES-NI 指令集扩展的 CPU 表现出显着的性能优势。

#### 使用固态硬盘 (SSD)

TapDB 在搭配 SATA SSD（固态硬盘）的情况下具有很好的效果以及出色的性价比。

如果可用且注重经济性，请使用固态硬盘 (SSD)。

商用 (SATA) 旋转驱动器通常是不错的选择，因为价格更昂贵的旋转驱动器提供的随机 I/O 性能提升并不明显（仅为 2 倍左右）。使用固态硬盘或增加 RAM 可能更有效地提高 I/O 吞吐量。

#### TapDB 和 NUMA 硬件

在具有非统一内存访问 (NUMA) 的系统上运行 TapDB 可能会导致许多操作问题，包括时段性的性能缓慢和系统进程使用率较高。

在 NUMA 硬件上运行 TapDB 服务器和客户端时，应当配置内存交织策略，以便主机以非 NUMA 方式运行。当部署在 Linux（自版本 2.0 起）和 Windows（自版本 2.6 起）计算机上时，TapDB 会在启动时检查 NUMA 设置。如果 NUMA 配置可能会降低性能，TapDB 会打印警告消息。

##### 在 Windows 上配置 NUMA

在 Windows 上，必须通过计算机的 BIOS 启用内存交织。有关详细信息，请参阅您的系统文档。

##### 在 Linux 上配置 NUMA

在 Linux 上，您必须禁用区域回收，并确保tapdb和taps实例由numactl启动，这通常是通过平台的初始化系统配置的。您必须执行这两个操作，才能正确禁用 TapDB 的 NUMA。

1. 使用以下命令禁用区域回收：

    ```
    echo 0 | sudo tee /proc/sys/vm/zone_reclaim_mode
    ```
    ```
    sudo sysctl -w vm.zone_reclaim_mode=0
    ```

2. 确保tapdb和taps由numactl启动。这通常是通过平台的初始化系统配置的。运行以下命令，确定平台上正在使用的初始化系统：

    ```
    ps --no-headers -o comm 1
    ```

    -如果为 `systemd`，则您的平台使用 systemd init 系统，并且您必须 按照下面的 systemd 标签页中的步骤来编辑 TapDB 服务文件。

    - 如果为 "`init`"，则您的平台使用 SysV Init 系统且无需执行此步骤。SysV Init 的默认 TapDB 初始化脚本包括默认通过 `numactl` 来启动 TapDB 实例的必要步骤。

    - 如果您管理自己的初始化脚本（即不使用这些初始化系统中的任何一个），则必须按照下面 Custom init scripts（自定义初始化脚本）选项卡中的步骤来编辑您的自定义初始化脚本。

### 磁盘和存储系统

#### 交换

在可以避免交换或将交换保持在最低限度的情况下，TapDB 性能最佳，因为从交换中检索数据总是比访问 RAM 中的数据慢。但是，如果托管 TapDB 的系统耗尽 RAM，则交换可以阻止 Linux OOM Killer 终止`tapdb`进程。

一般来说，您应选择以下交换策略之一：

1. 在您的系统上分配交换空间，并将内核配置为仅允许在高内存负载下进行交换，或是

2. 请勿在系统上分配交换空间，并将内核配置为完全禁用交换

请参阅设置 vm.swappiness，了解在 Linux 系统上按照这些指南配置交换的说明。

:::tip

如果您的 TapDB 实例托管在还运行其他软件（例如网络服务器）的系统上，则应选择第一个交换策略。在此情况下，请勿禁用交换。如果可能，强烈建议在自己的专用系统上运行 TapDB。

:::

#### RAID

为了在存储层方面获得最佳性能，请使用 RAID-10 支持的磁盘。RAID-5 和 RAID-6 通常无法提供足够的性能来支持 TapDB 部署。

#### 远程文件系统 (NFS)

使用 WiredTiger 存储引擎，如果远程文件系统符合 ISO/IEC 9945-1:1996 (POSIX.1)，则 WiredTiger 对象可以存储在远程文件系统上。由于远程文件系统通常比本地文件系统慢，因此使用远程文件系统进行存储可能会降低性能。

如果决定使用 NFS，请将以下 NFS 选项添加到 `/etc/fstab` 文件中：

- bg

- hard

- nolock

- noatime

- nointr

根据您的内核版本，其中一些值可能已设置为默认值。有关更多信息，请参阅您的平台文档。

#### 将组件分离到不同存储设备

为了提高性能，请考虑根据应用程序的访问和写入模式将数据库的数据和日志分布存放到不同的存储设备上。将组件安装为单独的文件系统，并使用符号链接将每个组件的路径映射到存储它的设备。

对于 WiredTiger 存储引擎，您还可以将索引存储在不同的存储设备上。请参阅`storage.wiredTiger.engineConfig.directoryForIndexes` 。

:::tip

使用其他存储设备会影响创建数据快照式备份的能力，因为这些文件会位于不同的设备和卷上。

:::

#### 调度

##### 虚拟设备或云托管设备的调度

对于通过虚拟机监控程序连接到虚拟机实例或由云托管提供商托管的本地区块设备，客户机操作系统应使用cfq调度程序以获得最佳性能。 cfq调度器允许操作系统将 I/O 调度推迟到底层虚拟机监控程序。

:::tip

如果满足以下所有条件，则可以使用noop调度器进行调度：

- 虚拟机监视器为 VMware。

- 使用副本集拓扑结构或分片集群。

- 虚拟机位于同一虚拟主机上。

- 包含 DBpaths 的底层存储是一个常见的 LUN 块存储。

:::

##### 调度物理服务器

对于物理服务器，操作系统应该使用截止时间调度程序。截止时间调度程序限制每个请求的最大延迟，并保持良好的磁盘吞吐量，这是磁盘密集型数据库应用程序的最佳选择。

## 架构

### 副本集

有关副本集部署的架构注意事项的概述，请参阅副本集架构文档。

### 分片集群

有关针对生产部署的推荐分片集群架构的概述，请参阅分片集群生产架构。

## 压缩

WiredTiger 可以使用以下一种压缩库压缩集合数据：

- snappy

    提供低于 zlib 或 zstd 的压缩率，但 CPU 成本比二者均低。 

- ZLIB

    提供高于 snappy 的压缩率，但 CPU 成本高于 snappy 和 zstd。

- zstd （从 TapDB 4开始可用。 2 ）

    提供高于 snappy 和 zlib 的压缩率，且 CPU 成本低于 zlib。

默认情况下，WiredTiger 使用snappy压缩库。要更改压缩设置，请参阅`storage.wiredTiger.collectionConfig.blockCompressor` 。

WiredTiger 默认对所有索引使用前缀压缩。

## 时钟同步

TapDB 组件 保留逻辑时钟以支持时间相关的操作。使用 NTP 同步主机时钟可降低组件之间时钟漂移的风险。组件之间的时钟漂移会增加时间相关操作出现错误或异常行为的可能性，例如：

- 如果任何给定 TapDB 组件的底层系统时钟与同一部署中的其他组件偏差一年或更长时间，则这些节点之间的通信可能会变得不可靠或完全停止。

    maxAcceptableLogicalClockDriftSecs参数控制组件之间可接受的时钟漂移量。
    maxAcceptableLogicalClockDriftSecs值较低的集群对时钟漂移的容忍度也相应较低。

- 对于返回当前集群或系统时间的操作，例如Date() 、 NOW和CLUSTER_TIME ，具有不同系统时钟的两个集群成员可能会返回不同的值。

- 依赖计时的功能在集群中可能会出现不一致或不可预测的行为，并且 TapDB 组件之间存在时钟漂移。

使用 Wired Tiger 存储引擎运行低于 或 的 TapDB 的部署需要 NTP3.4.6 3.2.17同步，其中时钟漂移可能会导致 检查点挂起 。此问题已在 TapDB3 中修复。4.6+ 变更日志和 TapDB3.2.17+ 发布说明，并在 TapDB3.6, 4.0, 4.2 和更高版本的所有单点版本中解决。

## 平台特定注意事项

### Linux 上的 TapDB

#### 内核和文件系统

在 Linux 上的生产环境中运行 TapDB 时，应使用Linux kernel 2.6.36 版本或更高版本，使用 XFS 或 EXT4 文件系统。尽可能使用 XFS，因为它通常在 TapDB 中表现更好。

使用WiredTiger 存储引擎时，强烈建议对数据承载节点使用 XFS，以避免将 EXT 4与 WiredTiger 一起使用时可能出现的性能问题。

- 一般来说，如果您使用 XFS 文件系统，请至少使用 Linux 内核版本2.6.25。

- 如果使用 EXT4 文件系统，请至少使用 Linux 内核版本 2.6.28 。

- 在 Red Hat Enterprise Linux 和 CentOS 上，至少应使用 Linux 内核版本 2.6.18-194。

#### 系统 C 库

TapDB 使用 GNU C 库 (glibc)（在 Linux 上运行）。通常，每个 Linux 发行版都提供自己的经过审查的该库版本。为获得最佳结果，请使用此系统提供版本可用的最新更新。您可以使用系统的软件包管理器检查是否安装了最新版本。例如：

- 在 RHEL / CentOS 上，以下命令会更新系统提供的 GNU C 库：

    ```
    sudo yum update glibc
    ```

- 在 Ubuntu / Debian 上，以下命令会更新系统提供的 GNU C 库：

    ```
    sudo apt-get install libc6
    ```

#### fsync() 用于目录

:::tip

TapDB 需要的文件系统要能够在fsync() 支持 目录上。例如，HGFS 和 Virtual Box 的共享文件夹不 支持此操作。

:::

#### 将 vm.swappiness 设置为 1 或 0

“Swappiness”是一个影响虚拟内存管理器行为的 Linux 内核设置。vm.swappiness 设置范围从 0 到 100：值越大，它就越倾向于将内存页面交换到磁盘，而不是从 RAM 中删除页面。

- 设置为0会完全禁用交换[4] 。

- 设置为 1 允许内核仅进行交换以避免内存不足问题。

- 设为 60 可指示内核频繁交换到磁盘，也是众多 Linux 发行版上的默认值。

- 设置为 100 将通知内核主动交换到磁盘。

在可以避免交换或将交换保持在最低限度的情况下，TapDB 性能最佳。因此，您应根据应用程序需求和集群配置，将 vm.swappiness 设置为 1 或 0。

:::tip

大多数系统和用户进程在 cgroup 中运行，默认情况下将 vm.swappiness 设置为 60。如果运行的是 RHEL/CentOS，请将 vm.force_cgroup_v2_swappiness 设置为 1，以确保指定的 vm.swappiness 值覆盖任何 cgroup 默认值。

:::

[4]	对于 3.5 之前的 Linux 内核版本或 RHEL 之前的 2.6.32-303 / CentOS 内核版本，将 vm.swappiness 设置为 0 时，内核仍能在某些紧急情况下进行交换。

:::tip

如果 TapDB 实例托管在还运行其他软件（例如网络服务器）的系统上，则应将 vm.swappiness 设置为 1。如果可能，强烈建议在自己的专用系统上运行 TapDB。

:::

- 要检查系统上的当前交换设置，请运行：

    ```
    cat /proc/sys/vm/swappiness
    ```

- 要更改系统上的交换状态，请执行以下操作：

    1. 编辑 /etc/sysctl.conf 文件并添加以下行：

     ```
     vm.swappiness = 1
     ```

     2. 运行如下命令以应用设置：
     ```
    sudo sysctl -p
     ```

:::tip

如果正在运行 RHEL/CentOS 并使用tuned性能配置文件，则还必须编辑所选配置文件以将 vm.swappiness 设置为 1 或 0。

:::

#### 建议配置

对于所有 TapDB 部署：

- 使用网络时间协议 (NTP) 在主机之间同步时间。这在分片集群中尤其重要。

对于 WiredTiger 存储引擎，请考虑以下建议：

- 关闭包含atime的存储卷的数据库文件

- 根据ulimit参考中的建议，调整平台的ulimit设置。当高强度使用时，较低的ulimit值会对 TapDB 产生负面影响，并可能导致与 TapDB 进程的连接失败和服务丢失。

- 禁用透明大页。 TapDB 在使用普通（ 4096字节）虚拟内存页面时性能更好。请参阅透明大页设置。

- 在 BIOS 中禁用 NUMA。如果不可行，请参阅 NUMA 硬件上的 TapDB。

- 如果不使用默认的 TapDB 目录路径或端口，请为 TapDB 配置 SELinux。

对于 WiredTiger 存储引擎：

- 无论存储介质类型（旋转磁盘、SSD 等）为何，均应将预读大小设为 8 到 32 之间。

    更高的预读通常有利于顺序 I/O 操作。由于 TapDB 磁盘访问模式通常是随机的，因此使用更高的预读设置的好处有限，或者可能会导致性能下降。因此，除非测试表明更高的预读值具有可测量、可重复且可靠的优势，否则为了获得最佳的 TapDB 性能，请将预读值设置在 8 到 32 之间。TapDB 商业支持部门可提供有关备用预读配置的建议和指导。

#### TapDB 和 TLS/SSL 库

在 Linux 平台上，您可能会在 TapDB 日志中看到以下语句之一：

```
<path to TLS/SSL libs>/libssl.so.<version>: no version information available (required by /usr/bin/tapdb)
<path to TLS/SSL libs>/libcrypto.so.<version>: no version information available (required by /usr/bin/tapdb)
```

这些警告表明系统的 TLS/SSL 库与编译tapdb所针对的 TLS/SSL 库不同。通常，这些消息不需要干预；但是，您可以使用以下操作来确定tapdb期望的符号版本：

```
objdump -T <path to tapdb>/tapdb | grep " SSL_"
objdump -T <path to tapdb>/tapdb | grep " CRYPTO_"
```

这些操作将返回类似于以下行之一的输出：

```
0000000000000000      DF *UND*       0000000000000000  libssl.so.10 SSL_write
0000000000000000      DF *UND*       0000000000000000  OPENSSL_1.0.0 SSL_write
```

此输出中的最后两个字符串是符号版本和符号名称。将这些值与以下操作返回的值进行比较，以检测符号版本不匹配情况：

```
objdump -T <path to TLS/SSL libs>/libssl.so.1*
objdump -T <path to TLS/SSL libs>/libcrypto.so.1*
```

此过程既不精确也不详尽： tapdb库中的libcrypto使用的许多符号并非以CRYPTO_开头。

### Windows 上的 TapDB

对于使用 WiredTiger 存储引擎的 TapDB 实例，Windows 上的性能与 Linux 上的性能相当。

### 虚拟环境中的 TapDB

本部分介绍在一些比较常见的虚拟环境中运行 TapDB 时的注意事项。

#### VMware

TapDB 与 VMware 兼容。

VMware 支持内存复用，因而可为虚拟机分配比物理机可用内存更多的内存。当内存超量时，虚拟机监控程序会在各虚拟机之间重新分配内存。VMware 的气球驱动程序 (vmmemctl) 会回收被视为价值最低的页面。

气球驱动程序驻留在客户机操作系统中。在某些配置下，当气球驱动程序扩展时，它可能会干扰 TapDB 的内存管理并影响 TapDB 的性能。

为了防止气球驱动程序和内存过量承诺功能对性能产生负面影响，请为运行 TapDB 的虚拟机保留全部内存量。为虚拟机预留适当数量的内存，可以防止本地操作系统中的气球在管理程序存在内存压力时膨胀。

尽管气球驱动程序和内存超配功能可能会在某些配置下对 TapDB 性能产生负面影响，但请勿禁用这些功能。如果禁用这些功能，虚拟机监控程序可能会使用其交换空间来满足内存请求，这会对性能产生负面影响。

通过设置 VMware 关联性规则 ，确保虚拟机停留在特定 ESX/ESXitapdb 主机上 。如果您必须手动将虚拟机迁移到其他主机，并且虚拟机上的 实例是 主节点 ，则必须先step down 主节点，然后`shut down the instance` 。

遵循 vMotion 网络最佳实践 和 VMKernel 。不遵循最佳实践可能会导致性能问题，并影响 副本集 和 分片集群 的高可用性机制。

您可以克隆运行 TapDB 的虚拟机。您可以使用此功能部署新的虚拟主机，将其添加为副本集的成员。

#### KVM

TapDB 与 KVM 兼容。

KVM 支持内存复用，因而可以为虚拟机分配比物理机可用内存更多的内存。当内存超量时，虚拟机监控程序会在各虚拟机之间重新分配内存。KVM 的气球驱动程序会回收被视为价值最低的页面。

气球驱动程序驻留在客户机操作系统中。在某些配置下，当气球驱动程序扩展时，它可能会干扰 TapDB 的内存管理并影响 TapDB 的性能。

为了防止气球驱动程序和内存过量承诺功能对性能产生负面影响，请为运行 TapDB 的虚拟机保留全部内存量。为虚拟机预留适当数量的内存，可以防止本地操作系统中的气球在管理程序存在内存压力时膨胀。

尽管气球驱动程序和内存超配功能可能会在某些配置下对 TapDB 性能产生负面影响，但请勿禁用这些功能。如果禁用这些功能，虚拟机监控程序可能会使用其交换空间来满足内存请求，这会对性能产生负面影响。

## 性能监测

### iostat

在 Linux 上，使用 iostat 命令可检查磁盘 I/O 是否是数据库的瓶颈。运行 iostat 时应指定秒数，以避免显示涵盖服务器启动以来的时间的统计信息。

例如，以下命令将显示扩展统计信息以及每个显示报告的时间，流量以 MB/s 为单位，间隔时间为一秒：

```
iostat -xmt 1
```

iostat 中的关键字段：

- %util：这是快速检查时最有用的字段，表示设备/驱动程序正在使用的时间百分比。

- avgrq-sz：平均请求大小。此值的数字越小，则表示随机 I/O 操作越多。

### bwm-ng

bwm-ng 是一个用于监控网络使用情况的命令行工具。如果怀疑存在基于网络的瓶颈，可以使用 bwm-ng 开始诊断过程。

## 备份

要备份 TapDB 数据库，请参阅[TapDB 备份方法](backups.md)概述。