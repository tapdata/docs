# KingbaseES-R6

### **1. KingbaseES-R6安装说明**

基于开源数据库Postgres开发的国产数据库，R6兼容Postgres9.6版本绝大多数特性。 目前主要有V8-R3与V8-R6两种，适配的驱动与license都不相同。

### **2. 安装方式**

r6-docker安装方式：docker pull chyiyaqing/kingbase:v8r6 其它的步骤与r3类同，目前镜像有问题

r6-linux安装： 下载[官网](https://www.kingbase.com.cn/)linux安装iso和license

- useradd -m kingbase
- passwd kingbase
- mkdir /home/kingbase/ES/V8
- mount KingbaseES_V008R006C006B0013_Lin64_install.iso /home/kingbase/setup
- su kingbase
- sh /home/kingbase/setup/setup.sh
- 按提示安装，中间需要提供license路径，选择安装目录/home/kingbase/ES/V8
- 启停服务 cd /home/kingbase/ES/V8/Server/bin ./sys_ctl -w start -D /home/kingbase/ES/V8/data ./sys_ctl stop -m fast -w -D /home/kingbase/ES/V8/data
- umount /home/kingbase/setup

### **3. R6特性**

全部向postgres原生兼容，详细可以参见postgres，oracle模式下，也默认全小写，pg_前缀和SYS_前缀完全兼容 r6的oracle模式慎用，"<全大写>"表名和字段名会自动转为小写。