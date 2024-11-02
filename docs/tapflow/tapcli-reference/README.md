# 命令参考

TapData Shell 是由 TapData 提供的命令行工具，您可以通过命令行便捷地调用 TapFlow 功能，实现数据同步任务的管理、数据源连接配置、以及数据处理操作，适用于需要自动化或脚本化管理数据同步的场景。

输入 `h` 即可展示命令使用的提示信息，示例如下：

```bash
h
- show datasource/table               
    1. show dbs            : show datasource list
    2. use $db_name        : switch to datasource
    3. show tables         : after use $db_name, used to show tables
    4. desc $table_name    : describe table schema                  
    5. peek $table_name    : peek some records from table  
...
```

本章节将介绍详细的命令参考和使用方法：

import DocCardList from '@theme/DocCardList';

<DocCardList />