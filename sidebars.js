/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

// Tapdata Cloud docs list
  cloud: [
    'cloud/what-is-tapdata-cloud',
    {
     type: 'category',
     label: '产品简介',
     link: {type: 'doc', id: 'cloud/introduction/README'},
     items: [
            'cloud/introduction/architecture',
            'cloud/introduction/features',
            'cloud/introduction/benefits',
            'cloud/introduction/use-cases',
            'cloud/introduction/supported-databases',
            'cloud/introduction/security',
            'cloud/introduction/terms',
     ]
    },
{
     type: 'category',
     label: '产品计费',
     link: {type: 'doc', id: 'cloud/billing/README'},
     items: [
            'cloud/billing/billing-overview',
            'cloud/billing/purchase',
            'cloud/billing/renew-subscribe',
            'cloud/billing/expiration',
            'cloud/billing/refund',
     ]
    },
    {
     type: 'category',
     label: '快速入门',
     link: {type: 'doc', id: 'cloud/quick-start/README'},
     items: [
            {
             type: 'category',
             label: '步骤一：安装 Agent',
             link: {type: 'doc', id: 'cloud/quick-start/install-agent/README'},
             items: [
                    'cloud/quick-start/install-agent/agent-on-selfhosted',
                    'cloud/quick-start/install-agent/agent-on-compute-nest',
             ]
            },
            'cloud/quick-start/connect-database',
            'cloud/quick-start/create-task',
     ]
    },
    {
         type: 'category',
         label: '连接数据源',
         link: {type: 'doc', id: 'cloud/prerequisites/README'},
         items: [
                 'cloud/prerequisites/allow-access-network',
                 {
                  type: 'category',
                  label: '数据仓库与数据湖',
                  link: {type: 'doc', id: 'cloud/prerequisites/warehouses-and-lake/README'},
                  items: [
                          'cloud/prerequisites/warehouses-and-lake/big-query',
                          'cloud/prerequisites/warehouses-and-lake/clickhouse',
                          'cloud/prerequisites/warehouses-and-lake/databend',
                          'cloud/prerequisites/warehouses-and-lake/doris',
                          'cloud/prerequisites/warehouses-and-lake/gaussdb',
                          'cloud/prerequisites/warehouses-and-lake/greenplum',
                          'cloud/prerequisites/warehouses-and-lake/selectdb',
                          'cloud/prerequisites/warehouses-and-lake/tablestore',
                          'cloud/prerequisites/warehouses-and-lake/yashandb',
                         ]
                  },
                 {
                  type: 'category',
                  label: '自建数据库',
                  link: {type: 'doc', id: 'cloud/prerequisites/on-prem-databases/README'},
                  items: [
                          'cloud/prerequisites/on-prem-databases/dameng',
                          'cloud/prerequisites/on-prem-databases/db2',
                          'cloud/prerequisites/on-prem-databases/elasticsearch',
                          'cloud/prerequisites/on-prem-databases/gbase-8a',
                          'cloud/prerequisites/on-prem-databases/gbase-8s',
                          'cloud/prerequisites/on-prem-databases/hive1',
                          'cloud/prerequisites/on-prem-databases/hive3',
                          'cloud/prerequisites/on-prem-databases/informix',
                          'cloud/prerequisites/on-prem-databases/kingbase-es-r3',
                          'cloud/prerequisites/on-prem-databases/kingbase-es-r6',
                          'cloud/prerequisites/on-prem-databases/mariadb',
                          'cloud/prerequisites/on-prem-databases/mongodb',
                          'cloud/prerequisites/on-prem-databases/mongodb-atlas',
                          'cloud/prerequisites/on-prem-databases/mrs-hive3',
                          'cloud/prerequisites/on-prem-databases/mysql',
                          'cloud/prerequisites/on-prem-databases/mysql-pxc',
                          'cloud/prerequisites/on-prem-databases/oceanbase',
                          'cloud/prerequisites/on-prem-databases/opengauss',
                          'cloud/prerequisites/on-prem-databases/oracle',
                          'cloud/prerequisites/on-prem-databases/postgresql',
                          'cloud/prerequisites/on-prem-databases/redis',
                          'cloud/prerequisites/on-prem-databases/sqlserver',
                          'cloud/prerequisites/on-prem-databases/tdengine',
                          'cloud/prerequisites/on-prem-databases/tidb',
                          ]
                  },
                  {
                   type: 'category',
                   label: '云数据库',
                   link: {type: 'doc', id: 'cloud/prerequisites/cloud-databases/README'},
                   items: [
                           'cloud/prerequisites/cloud-databases/aliyun-adb-mysql',
                           'cloud/prerequisites/cloud-databases/aliyun-adb-postgresql',
                           'cloud/prerequisites/cloud-databases/aliyun-mongodb',
                           'cloud/prerequisites/cloud-databases/aliyun-rds-for-mariadb',
                           'cloud/prerequisites/cloud-databases/aliyun-rds-for-mongodb',
                           'cloud/prerequisites/cloud-databases/aliyun-rds-for-mysql',
                           'cloud/prerequisites/cloud-databases/aliyun-rds-for-pg',
                           'cloud/prerequisites/cloud-databases/aliyun-rds-for-sql-server',
                           'cloud/prerequisites/cloud-databases/amazon-rds-mysql',
                           'cloud/prerequisites/cloud-databases/polardb-mysql',
                           'cloud/prerequisites/cloud-databases/polardb-postgresql',
                           'cloud/prerequisites/cloud-databases/tencentdb-for-mariadb',
                           'cloud/prerequisites/cloud-databases/tencentdb-for-mongodb',
                           'cloud/prerequisites/cloud-databases/tencentdb-for-mysql',
                           'cloud/prerequisites/cloud-databases/tencentdb-for-pg',
                           'cloud/prerequisites/cloud-databases/tencentdb-for-sql-server',
                          ]
                   },
                  {
                   type: 'category',
                   label: '消息队列与中间件',
                   link: {type: 'doc', id: 'cloud/prerequisites/mq-and-middleware/README'},
                   items: [
                           'cloud/prerequisites/mq-and-middleware/activemq',
                           'cloud/prerequisites/mq-and-middleware/ai-chat',
                           'cloud/prerequisites/mq-and-middleware/bes-channels',
                           'cloud/prerequisites/mq-and-middleware/hazelcast-cloud',
                           'cloud/prerequisites/mq-and-middleware/kafka',
                           'cloud/prerequisites/mq-and-middleware/rabbitmq',
                           'cloud/prerequisites/mq-and-middleware/rocketmq',
                          ]
                   },
                   {
                   type: 'category',
                   label: '客户管理与销售运营分析',
                   link: {type: 'doc', id: 'cloud/prerequisites/crm-and-sales-analytics/README'},
                   items: [
                           'cloud/prerequisites/crm-and-sales-analytics/hubspot',
                           'cloud/prerequisites/crm-and-sales-analytics/metabase',
                           'cloud/prerequisites/crm-and-sales-analytics/salesforce',
                           'cloud/prerequisites/crm-and-sales-analytics/zoho-crm',
                          ]
                   },
                   {
                    type: 'category',
                    label: 'SaaS 应用与 API 服务',
                    link: {type: 'doc', id: 'cloud/prerequisites/saas-and-api/README'},
                    items: [
                            'cloud/prerequisites/saas-and-api/coding',
                            'cloud/prerequisites/saas-and-api/github',
                            'cloud/prerequisites/saas-and-api/lark-approval',
                            'cloud/prerequisites/saas-and-api/lark-doc',
                            'cloud/prerequisites/saas-and-api/lark-im',
                            'cloud/prerequisites/saas-and-api/lark-task',
                            'cloud/prerequisites/saas-and-api/quick-api',
                            'cloud/prerequisites/saas-and-api/vika',
                            'cloud/prerequisites/saas-and-api/zoho-desk',
                           ]
                   },
                   {
                    type: 'category',
                    label: '电商平台',
                    link: {type: 'doc', id: 'cloud/prerequisites/e-commerce/README'},
                    items: [
                            'cloud/prerequisites/e-commerce/alibaba-1688',
                            'cloud/prerequisites/e-commerce/shein',
                           ]
                   },
                   {
                    type: 'category',
                    label: '文件',
                    link: {type: 'doc', id: 'cloud/prerequisites/files/README'},
                    items: [
                            'cloud/prerequisites/files/csv',
                            'cloud/prerequisites/files/excel',
                            'cloud/prerequisites/files/json',
                            'cloud/prerequisites/files/xml',
                           ]
                   },
                   {
                    type: 'category',
                    label: '其他',
                    link: {type: 'doc', id: 'cloud/prerequisites/others/README'},
                    items: [
                            'cloud/prerequisites/others/custom-connection',
                            'cloud/prerequisites/others/dummy',
                            'cloud/prerequisites/others/http-receiver',
                           ]
                   },
         ]
    },
    {
     type: 'category',
     label: '用户指南',
     link: {type: 'doc', id: 'cloud/user-guide/README'},
     items: [
             'cloud/user-guide/workshop',
             'cloud/user-guide/manage-agent',
             'cloud/user-guide/manage-connection',
             {
              type: 'category',
              label: '数据复制',
              link: {type: 'doc', id: 'cloud/user-guide/copy-data/README'},
              items:[
                    'cloud/user-guide/copy-data/create-task',
                    'cloud/user-guide/copy-data/create-task-via-drag',
                    'cloud/user-guide/copy-data/manage-task',
                    'cloud/user-guide/copy-data/monitor-task',
                    ]
            },
            {
             type: 'category',
             label: '数据转换',
             link: {type: 'doc', id: 'cloud/user-guide/data-development/README'},
             items:[
                   'cloud/user-guide/data-development/create-task',
                   'cloud/user-guide/data-development/create-materialized-view',
                   'cloud/user-guide/data-development/manage-task',
                   'cloud/user-guide/data-development/process-node',
                   'cloud/user-guide/data-development/monitor-task',
                   ]
             },
             'cloud/user-guide/real-time-data-hub',
             {
             type: 'category',
             label: '高级功能',
             link: {type: 'doc', id: 'cloud/user-guide/advanced-settings/README'},
             items:[
                   'cloud/user-guide/advanced-settings/share-mining',
                   'cloud/user-guide/advanced-settings/manage-external-storage',
                   ]
             },
             'cloud/user-guide/custom-node',
             'cloud/user-guide/operation-log',
             'cloud/user-guide/handle-schema-change',
             'cloud/user-guide/error-code-solution',
             'cloud/user-guide/trouble-shooting-connection',
             'cloud/user-guide/no-supported-data-type',
            ]
    },
    {
     type: 'category',
     label: '最佳实践',
     link: {type: 'doc', id: 'cloud/best-practice/README'},
     items: [
            'cloud/best-practice/data-sync',
            {
             type: 'category',
             label: 'MongoDB 实时同步',
             link: {type: 'doc', id: 'cloud/best-practice/mongodb-as-source/README'},
             items:[
                    'cloud/best-practice/mongodb-as-source/mongodb-to-mysql',
                    'cloud/best-practice/mongodb-as-source/mongodb-to-elasticsearch',
                    'cloud/best-practice/mongodb-as-source/mongodb-to-oracle',
                    'cloud/best-practice/mongodb-as-source/mongodb-to-sqlserver',
                    'cloud/best-practice/mongodb-as-source/mongodb-to-postgresql',
             ]
            },
            {
             type: 'category',
             label: 'MySQL 实时同步',
             link: {type: 'doc', id: 'cloud/best-practice/mysql-as-source/README'},
             items:[
                    'cloud/best-practice/mysql-as-source/mysql-to-bigquery',
                    'cloud/best-practice/mysql-as-source/mysql-to-aliyun',
                    'cloud/best-practice/mysql-as-source/mysql-to-elasticsearch',
                    'cloud/best-practice/mysql-as-source/mysql-to-mongodb',
                    'cloud/best-practice/mysql-as-source/mysql-to-oracle',
                    'cloud/best-practice/mysql-as-source/mysql-to-sqlserver',
                    'cloud/best-practice/mysql-as-source/mysql-to-postgresql',

             ]
            },
            {
             type: 'category',
             label: 'SQL Server 实时同步',
             link: {type: 'doc', id: 'cloud/best-practice/sqlserver-as-source/README'},
             items:[
                    'cloud/best-practice/sqlserver-as-source/sqlserver-to-elasticsearch',
                    'cloud/best-practice/sqlserver-as-source/sqlserver-to-oracle',
                    'cloud/best-practice/sqlserver-as-source/sqlserver-to-mongodb',
                    'cloud/best-practice/sqlserver-as-source/sqlserver-to-mysql',
                    'cloud/best-practice/sqlserver-as-source/sqlserver-to-postgresql',
             ]
            },
            {
             type: 'category',
             label: 'PostgreSQL 实时同步',
             link: {type: 'doc', id: 'cloud/best-practice/postgresql-as-source/README'},
             items:[
                    'cloud/best-practice/postgresql-as-source/postgresql-to-elasticsearch',
                    'cloud/best-practice/postgresql-as-source/postgresql-to-oracle',
                    'cloud/best-practice/postgresql-as-source/postgresql-to-mongodb',
                    'cloud/best-practice/postgresql-as-source/postgresql-to-mysql',
                    'cloud/best-practice/postgresql-as-source/postgresql-to-sqlserver',
             ]
            },
            {
             type: 'category',
             label: 'Oracle 实时同步',
             link: {type: 'doc', id: 'cloud/best-practice/oracle-as-source/README'},
             items:[
                    'cloud/best-practice/oracle-as-source/oracle-to-tablestore',
             ]
            },
            {
             type: 'category',
             label: '文件实时同步',
             link: {type: 'doc', id: 'cloud/best-practice/files-as-source/README'},
             items:[
                    'cloud/best-practice/files-as-source/excel-to-mysql',
             ]
            },            
        ]
        },
     {
      type: 'category',
      label: '常见问题',
      link: {type: 'doc', id: 'cloud/faq/README'},
      items:[
             'cloud/faq/data-security',
             'cloud/faq/agent-installation',
             'cloud/faq/database',
             'cloud/faq/task',
      ]
     },
     {
      type: 'category',
      label: '附录',
      link: {type: 'doc', id: 'cloud/appendix/README'},
      items: [
              'cloud/appendix/standard-js',
              'cloud/appendix/enhanced-js'
              ]
     },
     'cloud/faq/support',
     'cloud/release-notes',
  ],


// Tapdata Enterprise docs list
  enterprise: [
  'enterprise/what-is-tapdata-enterprise',
    {
     type: 'category',
     label: '产品简介',
     link: {type: 'doc', id: 'enterprise/introduction/README'},
     items: [
             'enterprise/introduction/architecture',
             'enterprise/introduction/features',
             'enterprise/introduction/benefits',
             'enterprise/introduction/use-cases',
             'enterprise/introduction/supported-databases',
             'enterprise/introduction/terms',
       ]
    },
    {
     type: 'category',
     label: '快速入门',
     link: {type: 'doc', id: 'enterprise/quick-start/README'},
     items: [
            {
             type: 'category',
             label: '部署 Tapdata',
             link: {type: 'doc', id: 'enterprise/quick-start/install/README'},
             items: [
                    'enterprise/quick-start/install/install-tapdata-stand-alone',
                    'enterprise/quick-start/install/install-on-windows',                 
             ]
            },
            'enterprise/quick-start/connect-database',
            'enterprise/quick-start/create-task',
     ]
    },
{
         type: 'category',
         label: '连接数据源',
         link: {type: 'doc', id: 'enterprise/prerequisites/README'},
         items: [
                 {
                  type: 'category',
                  label: '数据仓库与数据湖',
                  link: {type: 'doc', id: 'enterprise/prerequisites/warehouses-and-lake/README'},
                  items: [
                          'enterprise/prerequisites/warehouses-and-lake/big-query',
                          'enterprise/prerequisites/warehouses-and-lake/clickhouse',
                          'enterprise/prerequisites/warehouses-and-lake/databend',
                          'enterprise/prerequisites/warehouses-and-lake/doris',
                          'enterprise/prerequisites/warehouses-and-lake/gaussdb',
                          'enterprise/prerequisites/warehouses-and-lake/greenplum',
                          'enterprise/prerequisites/warehouses-and-lake/selectdb',
                          'enterprise/prerequisites/warehouses-and-lake/tablestore',
                          'enterprise/prerequisites/warehouses-and-lake/yashandb',
                         ]
                  },
                 {
                  type: 'category',
                  label: '自建数据库',
                  link: {type: 'doc', id: 'enterprise/prerequisites/on-prem-databases/README'},
                  items: [
                          'enterprise/prerequisites/on-prem-databases/dameng',
                          'enterprise/prerequisites/on-prem-databases/db2',
                          'enterprise/prerequisites/on-prem-databases/elasticsearch',
                          'enterprise/prerequisites/on-prem-databases/gbase-8a',
                          'enterprise/prerequisites/on-prem-databases/gbase-8s',
                          'enterprise/prerequisites/on-prem-databases/hive1',
                          'enterprise/prerequisites/on-prem-databases/hive3',
                          'enterprise/prerequisites/on-prem-databases/informix',
                          'enterprise/prerequisites/on-prem-databases/kingbase-es-r3',
                          'enterprise/prerequisites/on-prem-databases/kingbase-es-r6',
                          'enterprise/prerequisites/on-prem-databases/mariadb',
                          'enterprise/prerequisites/on-prem-databases/mongodb',
                          'enterprise/prerequisites/on-prem-databases/mongodb-atlas',
                          'enterprise/prerequisites/on-prem-databases/mrs-hive3',
                          'enterprise/prerequisites/on-prem-databases/mysql',
                          'enterprise/prerequisites/on-prem-databases/mysql-pxc',
                          'enterprise/prerequisites/on-prem-databases/oceanbase',
                          'enterprise/prerequisites/on-prem-databases/opengauss',
                          'enterprise/prerequisites/on-prem-databases/oracle',
                          'enterprise/prerequisites/on-prem-databases/postgresql',
                          'enterprise/prerequisites/on-prem-databases/redis',
                          'enterprise/prerequisites/on-prem-databases/sqlserver',
                          'enterprise/prerequisites/on-prem-databases/tdengine',
                          'enterprise/prerequisites/on-prem-databases/tidb',
                          ]
                  },
                  {
                   type: 'category',
                   label: '云数据库',
                   link: {type: 'doc', id: 'enterprise/prerequisites/cloud-databases/README'},
                   items: [
                           'enterprise/prerequisites/cloud-databases/aliyun-adb-mysql',
                           'enterprise/prerequisites/cloud-databases/aliyun-adb-postgresql',
                           'enterprise/prerequisites/cloud-databases/aliyun-mongodb',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-mariadb',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-mongodb',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-mysql',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-pg',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-sql-server',
                           'enterprise/prerequisites/cloud-databases/amazon-rds-mysql',
                           'enterprise/prerequisites/cloud-databases/polardb-mysql',
                           'enterprise/prerequisites/cloud-databases/polardb-postgresql',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-mariadb',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-mongodb',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-mysql',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-pg',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-sql-server',
                          ]
                   },
                  {
                   type: 'category',
                   label: '消息队列与中间件',
                   link: {type: 'doc', id: 'enterprise/prerequisites/mq-and-middleware/README'},
                   items: [
                           'enterprise/prerequisites/mq-and-middleware/activemq',
                           'enterprise/prerequisites/mq-and-middleware/ai-chat',
                           'enterprise/prerequisites/mq-and-middleware/bes-channels',
                           'enterprise/prerequisites/mq-and-middleware/hazelcast-cloud',
                           'enterprise/prerequisites/mq-and-middleware/kafka',
                           'enterprise/prerequisites/mq-and-middleware/rabbitmq',
                           'enterprise/prerequisites/mq-and-middleware/rocketmq',
                          ]
                   },
                   {
                   type: 'category',
                   label: '客户管理与销售运营分析',
                   link: {type: 'doc', id: 'enterprise/prerequisites/crm-and-sales-analytics/README'},
                   items: [
                           'enterprise/prerequisites/crm-and-sales-analytics/hubspot',
                           'enterprise/prerequisites/crm-and-sales-analytics/metabase',
                           'enterprise/prerequisites/crm-and-sales-analytics/salesforce',
                           'enterprise/prerequisites/crm-and-sales-analytics/zoho-crm',
                          ]
                   },
                   {
                    type: 'category',
                    label: 'SaaS 应用与 API 服务',
                    link: {type: 'doc', id: 'enterprise/prerequisites/saas-and-api/README'},
                    items: [
                            'enterprise/prerequisites/saas-and-api/coding',
                            'enterprise/prerequisites/saas-and-api/github',
                            'enterprise/prerequisites/saas-and-api/lark-approval',
                            'enterprise/prerequisites/saas-and-api/lark-doc',
                            'enterprise/prerequisites/saas-and-api/lark-im',
                            'enterprise/prerequisites/saas-and-api/lark-task',
                            'enterprise/prerequisites/saas-and-api/quick-api',
                            'enterprise/prerequisites/saas-and-api/vika',
                            'enterprise/prerequisites/saas-and-api/zoho-desk',
                           ]
                   },
                   {
                    type: 'category',
                    label: '电商平台',
                    link: {type: 'doc', id: 'enterprise/prerequisites/e-commerce/README'},
                    items: [
                            'enterprise/prerequisites/e-commerce/alibaba-1688',
                            'enterprise/prerequisites/e-commerce/shein',
                           ]
                   },
                   {
                    type: 'category',
                    label: '文件',
                    link: {type: 'doc', id: 'enterprise/prerequisites/files/README'},
                    items: [
                            'enterprise/prerequisites/files/csv',
                            'enterprise/prerequisites/files/excel',
                            'enterprise/prerequisites/files/json',
                            'enterprise/prerequisites/files/xml',
                           ]
                   },
                   {
                    type: 'category',
                    label: '其他',
                    link: {type: 'doc', id: 'enterprise/prerequisites/others/README'},
                    items: [
                            'enterprise/prerequisites/others/custom-connection',
                            'enterprise/prerequisites/others/dummy',
                            'enterprise/prerequisites/others/http-receiver',
                           ]
                   },
         ]
    },
    {
     type: 'category',
     label: '用户指南',
     link: {type: 'doc', id: 'enterprise/user-guide/README'},
     items: [
             'enterprise/user-guide/workshop',
             /*{
              type: 'category',
              label: '连接数据源',
              link: {type: 'doc', id: 'enterprise/user-guide/connect-database/README'},
              items:[
                    {
                     type: 'category',
                     label: '认证数据源',
                     link: {type: 'doc', id: 'enterprise/user-guide/connect-database/certified/README'},
                     items:[
                            'enterprise/user-guide/connect-database/certified/connect-clickhouse',
                            'enterprise/user-guide/connect-database/certified/connect-kafka',
                            'enterprise/user-guide/connect-database/certified/connect-mysql',
                            'enterprise/user-guide/connect-database/certified/connect-mongodb',
                            'enterprise/user-guide/connect-database/certified/connect-oracle',
                            'enterprise/user-guide/connect-database/certified/connect-postgresql',
                            'enterprise/user-guide/connect-database/certified/connect-sqlserver',
                           ]
                    },
                    {
                     type: 'category',
                     label: 'Beta 数据源',
                     link: {type: 'doc', id: 'enterprise/user-guide/connect-database/beta/README'},
                     items:[
                            'enterprise/user-guide/connect-database/beta/custom-connection',
                            'enterprise/user-guide/connect-database/beta/connect-csv',
                            'enterprise/user-guide/connect-database/beta/connect-db2',
                            'enterprise/user-guide/connect-database/beta/connect-doris',
                            'enterprise/user-guide/connect-database/beta/connect-dummy',
                            'enterprise/user-guide/connect-database/beta/connect-excel',
                            'enterprise/user-guide/connect-database/beta/connect-github',
                            'enterprise/user-guide/connect-database/beta/connetc-http-receiver',
                            'enterprise/user-guide/connect-database/beta/connect-larktask',
                            'enterprise/user-guide/connect-database/beta/connect-lark-im',
                            'enterprise/user-guide/connect-database/beta/connect-mariadb',
                            'enterprise/user-guide/connect-database/beta/connect-mongodb-atlas',
                            'enterprise/user-guide/connect-database/beta/connect-redis',
                            'enterprise/user-guide/connect-database/beta/connect-salesforce',
                            'enterprise/user-guide/connect-database/beta/connect-selectdb',
                            'enterprise/user-guide/connect-database/beta/connect-tdengine',
                            'enterprise/user-guide/connect-database/beta/connect-tidb',
                           ]
                    },
                    {
                     type: 'category',
                     label: 'Alpha 数据源',
                     link: {type: 'doc', id: 'enterprise/user-guide/connect-database/alpha/README'},
                     items:[
                            'enterprise/user-guide/connect-database/alpha/connect-activemq',
                            'enterprise/user-guide/connect-database/alpha/connect-elasticsearch',
                            'enterprise/user-guide/connect-database/alpha/connect-gbase-8a',
                            'enterprise/user-guide/connect-database/alpha/connect-gbase-8s', 
                            'enterprise/user-guide/connect-database/alpha/connect-json',
                            'enterprise/user-guide/connect-database/alpha/connect-oceanbase',
                            'enterprise/user-guide/connect-database/alpha/connect-opengauss',
                            'enterprise/user-guide/connect-database/alpha/connect-rabbitmq',
                            'enterprise/user-guide/connect-database/alpha/connect-rocketmq',
                            'enterprise/user-guide/connect-database/alpha/connect-xml',
                           ]
                    },
                    ]
             },*/
             'enterprise/user-guide/manage-connection',
             {
              type: 'category',
              label: '实时数据中心',
              link: {type: 'doc', id: 'enterprise/user-guide/data-console/README'},
              items:[
                    {
                     type: 'category',
                     label: '数据集成模式',
                     link: {type: 'doc', id: 'enterprise/user-guide/data-console/etl-mode/README'},
                     items:[
                            'enterprise/user-guide/data-console/etl-mode/etl-mode-dashboard',
                            'enterprise/user-guide/data-console/etl-mode/create-etl-task',
                           ]
                    },
                    {
                     type: 'category',
                     label: '数据服务平台模式',
                     link: {type: 'doc', id: 'enterprise/user-guide/data-console/daas-mode/README'},
                     items:[
                            'enterprise/user-guide/data-console/daas-mode/enable-daas-mode',
                            'enterprise/user-guide/data-console/daas-mode/daas-mode-dashboard',
                            'enterprise/user-guide/data-console/daas-mode/create-daas-task',
                           ]
                    },
                    ]
             },             
             {
              type: 'category',
              label: '数据管道',
              link: {type: 'doc', id: 'enterprise/user-guide/data-pipeline/README'},
              items:[
                    {
                     type: 'category',
                     label: '数据复制',
                     link: {type: 'doc', id: 'enterprise/user-guide/data-pipeline/copy-data/README'},
                     items:[
                            'enterprise/user-guide/data-pipeline/copy-data/create-task',
                            'enterprise/user-guide/data-pipeline/copy-data/process-node',
                            'enterprise/user-guide/data-pipeline/copy-data/monitor-task',
                           ]
                    },
                    {
                     type: 'category',
                     label: '数据转换',
                     link: {type: 'doc', id: 'enterprise/user-guide/data-pipeline/data-development/README'},
                     items:[
                            'enterprise/user-guide/data-pipeline/data-development/create-task',
                            'enterprise/user-guide/data-pipeline/data-development/create-materialized-view',
                            'enterprise/user-guide/data-pipeline/data-development/manage-task',
                            'enterprise/user-guide/data-pipeline/data-development/process-node',
                            'enterprise/user-guide/data-pipeline/data-development/monitor-task',
                           ]
                    },
                    'enterprise/user-guide/data-pipeline/verify-data',
                    'enterprise/user-guide/data-pipeline/pre-check',
                    ]
             },
             {
              type: 'category',
              label: '高级设置',
              link: {type: 'doc', id: 'enterprise/user-guide/advanced-settings/README'},
              items:[
                     'enterprise/user-guide/advanced-settings/share-cache',
                     'enterprise/user-guide/advanced-settings/manage-function',
                     'enterprise/user-guide/advanced-settings/custom-node',
                     'enterprise/user-guide/advanced-settings/share-mining',
                    ]
             },
             {
              type: 'category',
              label: '数据服务',
              link: {type: 'doc', id: 'enterprise/user-guide/data-service/README'},
              items:[
                     'enterprise/user-guide/data-service/manage-app',
                     'enterprise/user-guide/data-service/create-api-service',
                     'enterprise/user-guide/data-service/create-api-client',
                     'enterprise/user-guide/data-service/create-api-server',
                     'enterprise/user-guide/data-service/audit-api',
                     'enterprise/user-guide/data-service/monitor-api-request',
                     'enterprise/user-guide/data-service/api-auth',
                     'enterprise/user-guide/data-service/query-via-restful',
                     'enterprise/user-guide/data-service/query-via-graphql',
                     'enterprise/user-guide/data-service/api-query-params',
                    ]
             },
             {
              type: 'category',
              label: '系统管理',
              link: {type: 'doc', id: 'enterprise/user-guide/manage-system/README'},
              items:[
                     'enterprise/user-guide/manage-system/manage-role',
                     'enterprise/user-guide/manage-system/manage-user',
                     'enterprise/user-guide/manage-system/manage-cluster',
                     'enterprise/user-guide/manage-system/manage-external-storage',
                    ]
             },
             {
              type: 'category',
              label: '其他设置',
              link: {type: 'doc', id: 'enterprise/user-guide/other-settings/README'},
              items:[
                     'enterprise/user-guide/other-settings/system-settings',
                     'enterprise/user-guide/other-settings/manage-license',
                     'enterprise/user-guide/other-settings/check-version',
                    ]
             },
             'enterprise/user-guide/notification',
             'enterprise/user-guide/no-supported-data-type',
        ]
    },
    {
     type: 'category',
     label: '生产部署与运维',
     link: {type: 'doc', id: 'enterprise/production-admin/README'},
     items: [
            'enterprise/production-admin/install-tapdata-ha',
            'enterprise/production-admin/install-replica-mongodb',
            'enterprise/production-admin/operation',
            'enterprise/production-admin/emergency-plan',
        ]
    },
    {
     type: 'category',
     label: '同步案例',
     link: {type: 'doc', id: 'enterprise/pipeline-tutorial/README'},
     items: [
            'enterprise/pipeline-tutorial/excel-to-mysql',
            'enterprise/pipeline-tutorial/mysql-to-redis',
            'enterprise/pipeline-tutorial/oracle-to-kafka',
            'enterprise/pipeline-tutorial/extract-array',
        ]
    },
    {
         type: 'category',
         label: '最佳实践',
         link: {type: 'doc', id: 'enterprise/best-practice/README'},
         items: [
                'enterprise/best-practice/data-sync',
                'enterprise/best-practice/handle-schema-change',
                'enterprise/best-practice/heart-beat-task',
                'enterprise/best-practice/alert-via-qqmail',
                'enterprise/best-practice/full-breakpoint-resumption',
                'enterprise/best-practice/raw-logs-solution',
            ]
        },
    {
     type: 'category',
     label: '故障排查',
     link: {type: 'doc', id: 'enterprise/troubleshooting/README'},
     items: [
            'enterprise/troubleshooting/error-code',
            'enterprise/troubleshooting/error-and-solutions',
        ]
    },
    {
     type: 'category',
     label: '常见问题',
     link: {type: 'doc', id: 'enterprise/faq/README'},
     items: [
            'enterprise/faq/use-product',
            'enterprise/faq/data-pipeline',
        ]
    },
    {
     type: 'category',
     label: '附录',
     link: {type: 'doc', id: 'enterprise/appendix/README'},
     items: [
            'enterprise/appendix/standard-js',
            'enterprise/appendix/enhanced-js',
            'enterprise/appendix/benchmark'
        ]
    },
  'enterprise/support',
  'enterprise/release-notes',
 ]
};

module.exports = sidebars;
