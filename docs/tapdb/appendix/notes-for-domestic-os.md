# 部分国产操作系统下的 TapDB 安装包的说明

## TapDB v6.3 + 统信 UOS v20

由于统信 UOS v20 系统自带的 lib 库无法运行 TapDB v6 版本, 安装包的 lib64 目录下有 libstdc++.so.6 库文件, 需要 `export LD_LIBRARY_PATH=lib64绝对路径`, 然后再启动;