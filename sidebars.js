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
                    'cloud/quick-start/install-agent/agent-on-linux',
                    'cloud/quick-start/install-agent/agent-on-windows',
                    'cloud/quick-start/install-agent/agent-on-docker',
                    'cloud/quick-start/install-agent/agent-on-mac-m1',
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
              label: '认证数据源',
              link: {type: 'doc', id: 'cloud/prerequisites/certified/README'},
              items: [
                      'cloud/prerequisites/certified/clickhouse',
                      'cloud/prerequisites/certified/kafka',
                      'cloud/prerequisites/certified/mysql',
                      'cloud/prerequisites/certified/mongodb',
                      'cloud/prerequisites/certified/oracle',
                      'cloud/prerequisites/certified/postgresql',
                      'cloud/prerequisites/certified/sqlserver',
                      ]
              },
              {
               type: 'category',
               label: 'Beta 数据源',
               link: {type: 'doc', id: 'cloud/prerequisites/beta/README'},
               items: [
                       'cloud/prerequisites/beta/apache-doris',
                       'cloud/prerequisites/beta/big-query',
                       'cloud/prerequisites/beta/csv',
                       'cloud/prerequisites/beta/excel',
                       'cloud/prerequisites/beta/larktask',
                       'cloud/prerequisites/beta/mariadb',
                       'cloud/prerequisites/beta/tidb',
                       ]
               },
               {
               type: 'category',
               label: 'Alpha 数据源',
               link: {type: 'doc', id: 'cloud/prerequisites/alpha/README'},
               items: [
                       'cloud/prerequisites/alpha/aliyun-rds-for-mysql',
                       'cloud/prerequisites/alpha/activemq',
                       'cloud/prerequisites/alpha/elasticsearch',
                       'cloud/prerequisites/alpha/json',
                       'cloud/prerequisites/alpha/opengauss',
                       'cloud/prerequisites/alpha/rabbitmq',
                       'cloud/prerequisites/alpha/rocketmq',
                       'cloud/prerequisites/alpha/tablestore',
                       'cloud/prerequisites/alpha/vika',
                       'cloud/prerequisites/alpha/xml',
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
             /* {
              type: 'category',
              label: '连接数据库',
              link: {type: 'doc', id: 'cloud/user-guide/connect-database/README'},
              items:[
                    {
                     type: 'category',
                     label: '认证数据源',
                     link: {type: 'doc', id: 'cloud/user-guide/connect-database/certified/README'},
                     items:[
                            'cloud/user-guide/connect-database/certified/connect-clickhouse',
                            'cloud/user-guide/connect-database/certified/connect-kafka',
                            'cloud/user-guide/connect-database/certified/connect-mysql',
                            'cloud/user-guide/connect-database/certified/connect-mongodb',
                            'cloud/user-guide/connect-database/certified/connect-oracle',
                            'cloud/user-guide/connect-database/certified/connect-postgresql',
                            'cloud/user-guide/connect-database/certified/connect-sqlserver',
                           ]
                    }, 
                    {
                     type: 'category',
                     label: 'Beta 数据源',
                     link: {type: 'doc', id: 'cloud/user-guide/connect-database/beta/README'},
                     items:[
                            'cloud/user-guide/connect-database/beta/connect-csv',
                            'cloud/user-guide/connect-database/beta/connect-dummydb',
                            'cloud/user-guide/connect-database/beta/connect-excel',
                            'cloud/user-guide/connect-database/beta/connect-larktask',
                            'cloud/user-guide/connect-database/beta/connect-mariadb',
                            'cloud/user-guide/connect-database/beta/connect-tidb',
                           ]
                    },
                    {
                     type: 'category',
                     label: 'Alpha 数据源',
                     link: {type: 'doc', id: 'cloud/user-guide/connect-database/alpha/README'},
                     items:[
                            'cloud/user-guide/connect-database/alpha/connect-adb-mysql',
                            'cloud/user-guide/connect-database/alpha/connect-adb-pg',
                            'cloud/user-guide/connect-database/alpha/connect-aliyun-rds-mysql',
                            'cloud/user-guide/connect-database/alpha/connect-elasticsearch',
                            'cloud/user-guide/connect-database/alpha/connect-hazelcast-cloud',
                            'cloud/user-guide/connect-database/alpha/connect-json',
                            'cloud/user-guide/connect-database/alpha/connect-mq',
                            'cloud/user-guide/connect-database/alpha/connect-opengauss',
                            'cloud/user-guide/connect-database/alpha/connect-xml',
                           ]
                    }, 
              ]
             },*/
             'cloud/user-guide/manage-connection',
             {
              type: 'category',
              label: '数据复制',
              link: {type: 'doc', id: 'cloud/user-guide/copy-data/README'},
              items:[
                    'cloud/user-guide/copy-data/create-task',
                    'cloud/user-guide/copy-data/manage-task',
                    'cloud/user-guide/copy-data/monitor-task',
                    ]
            },
            {
             type: 'category',
             label: '数据开发（Beta）',
             link: {type: 'doc', id: 'cloud/user-guide/data-development/README'},
             items:[
                   'cloud/user-guide/data-development/create-task',
                   'cloud/user-guide/data-development/manage-task',
                   'cloud/user-guide/data-development/process-node',
                   'cloud/user-guide/data-development/monitor-task',
                   ]
             },
             'cloud/user-guide/custom-node',
             'cloud/user-guide/operation-log',
             {
              type: 'category',
              label: '数据面板（Beta）',
              link: {type: 'doc', id: 'cloud/user-guide/data-console/README'},
              items:[
                    {
                     type: 'category',
                     label: '数据集成平台模式',
                     link: {type: 'doc', id: 'cloud/user-guide/data-console/etl-mode/README'},
                     items:[
                            'cloud/user-guide/data-console/etl-mode/etl-mode-dashboard',
                            'cloud/user-guide/data-console/etl-mode/create-etl-task',
                           ]
                    },
                    {
                     type: 'category',
                     label: '数据服务平台模式',
                     link: {type: 'doc', id: 'cloud/user-guide/data-console/daas-mode/README'},
                     items:[
                            'cloud/user-guide/data-console/daas-mode/enable-daas-mode',
                            'cloud/user-guide/data-console/daas-mode/daas-mode-dashboard',
                            'cloud/user-guide/data-console/daas-mode/create-daas-task',
                           ]
                    },
                    ]
             },               
             'cloud/user-guide/trouble-shooting-connection',
             'cloud/user-guide/no-supported-data-type',
            ]
    },
    {
     type: 'category',
     label: '最佳实践',
     link: {type: 'doc', id: 'cloud/best-practice/README'},
     items: [
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
        ]
        },
     'cloud/release-notes',
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
                    'enterprise/quick-start/install/install-tapdata-ha',
                    'enterprise/quick-start/install/install-tapdata-stand-alone',                    
             ]
            },
            'enterprise/quick-start/connect-database',
            'enterprise/quick-start/create-task',
     ]
    },
{
     type: 'category',
     label: '准备工作',
     link: {type: 'doc', id: 'enterprise/prerequisites/README'},
     items: [
            {
             type: 'category',
             label: '认证数据源',
             link: {type: 'doc', id: 'enterprise/prerequisites/certified/README'},
             items: [
                     'enterprise/prerequisites/certified/clickhouse',
                     'enterprise/prerequisites/certified/kafka',
                     'enterprise/prerequisites/certified/mysql',
                     'enterprise/prerequisites/certified/mongodb',
                     'enterprise/prerequisites/certified/oracle',
                     'enterprise/prerequisites/certified/postgresql',
                     'enterprise/prerequisites/certified/sqlserver',
             ]
            },
            {
             type: 'category',
             label: 'Beta 数据源',
             link: {type: 'doc', id: 'enterprise/prerequisites/beta/README'},
             items: [
                     'enterprise/prerequisites/beta/apache-doris',
                     'enterprise/prerequisites/beta/csv-and-excel',
                     'enterprise/prerequisites/beta/larktask', 
                     'enterprise/prerequisites/beta/lark-im',
                     'enterprise/prerequisites/beta/mariadb', 
                     'enterprise/prerequisites/beta/mongodb-atlas', 
                     'enterprise/prerequisites/beta/selectdb',
                     'enterprise/prerequisites/beta/tidb',
                     'enterprise/prerequisites/beta/zoho-crm',                     
             ]
            },                        
            {
             type: 'category',
             label: 'Alpha 数据源',
             link: {type: 'doc', id: 'enterprise/prerequisites/alpha/README'},
             items: [
                     'enterprise/prerequisites/alpha/activemq',                     
                     'enterprise/prerequisites/alpha/elasticsearch',
                     'enterprise/prerequisites/alpha/json-and-xml',
                     'enterprise/prerequisites/alpha/opengauss',                     
                     'enterprise/prerequisites/alpha/rabbitmq',
                     'enterprise/prerequisites/alpha/rocketmq',                     
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
             {
              type: 'category',
              label: '连接数据库',
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
                            'enterprise/user-guide/connect-database/beta/connect-zoho', 
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
             },
             {
              type: 'category',
              label: '数据面板',
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
                            'enterprise/user-guide/data-pipeline/data-development/manage-task',
                            'enterprise/user-guide/data-pipeline/data-development/process-node',
                            'enterprise/user-guide/data-pipeline/data-development/monitor-task',
                           ]
                    },
                    'enterprise/user-guide/data-pipeline/verify-data',
                    'enterprise/user-guide/data-pipeline/pre-check',
                    'enterprise/user-guide/data-pipeline/error-code-solution',
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
        ]
    },
    {
     type: 'category',
     label: '最佳实践',
     link: {type: 'doc', id: 'enterprise/best-practice/README'},
     items: [
            'enterprise/best-practice/excel-to-mysql',
            'enterprise/best-practice/mysql-to-redis',
            'enterprise/best-practice/oracle-to-kafka',
            'enterprise/best-practice/heart-beat-task',
            'enterprise/best-practice/alert-via-qqmail',
            'enterprise/best-practice/full-breakpoint-resumption',
            'enterprise/best-practice/extract-array',
        ]
    },
  'enterprise/release-notes',
    {
     type: 'category',
     label: '常见问题',
     link: {type: 'doc', id: 'enterprise/faq/README'},
     items: [
            'enterprise/faq/use-product',
            'enterprise/faq/operation'
        ]
    },
    {
     type: 'category',
     label: '附录',
     link: {type: 'doc', id: 'enterprise/appendix/README'},
     items: [
            'enterprise/appendix/standard-js',
            'enterprise/appendix/enhanced-js'
        ]
    },
  'enterprise/support',
 ]
};

module.exports = sidebars;
