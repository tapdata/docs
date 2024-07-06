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


// TapDB docs list
  tapdb: [
  'tapdb/what-is-tapdb',
  {
     type: 'category',
     label: '产品介绍',
     link: {type: 'doc', id: 'tapdb/introduction/README'},
     items: [
            'tapdb/introduction/db-collection',
            'tapdb/introduction/document',
        ]
    },
  {
     type: 'category',
     label: '安装 TapDB',
     link: {type: 'doc', id: 'tapdb/installation/README'},
     items: [
            'tapdb/installation/install-on-debian',
            'tapdb/installation/install-on-redhat',
            'tapdb/installation/install-on-ubuntu',
        ]
    },
   {
     type: 'category',
     label: 'CRUD 操作',
     link: {type: 'doc', id: 'tapdb/crud/README'},
     items: [
            'tapdb/crud/bulk-write-operations',
            'tapdb/crud/tapdb-crud',
        ]
    },
   'tapdb/aggregation/tapdb-aggregation',
   'tapdb/indexes/tapdb-indexes',
   'tapdb/transactions/tapdb-transactions',
   'tapdb/replication/tapdb-replication',
   'tapdb/sharding/tapdb-sharding',
   /*{
     type: 'category',
     label: '聚合操作',
     link: {type: 'doc', id: 'tapdb/aggregation/README'},
     items: [
            'tapdb/aggregation/tapdb-aggregation',
        ]
    },
   
   {
     type: 'category',
     label: '索引',
     link: {type: 'doc', id: 'tapdb/indexes/README'},
     items: [
            'tapdb/indexes/tapdb-indexes',
        ]
    },
   {
     type: 'category',
     label: '事务',
     link: {type: 'doc', id: 'tapdb/transactions/README'},
     items: [
            'tapdb/transactions/tapdb-transactions',
        ]
    },
   {
     type: 'category',
     label: '复制',
     link: {type: 'doc', id: 'tapdb/replication/README'},
     items: [
            'tapdb/replication/tapdb-replication',
        ]
    },
   {
     type: 'category',
     label: '分片',
     link: {type: 'doc', id: 'tapdb/sharding/README'},
     items: [
            'tapdb/sharding/tapdb-sharding',
        ]
    },*/
   {
     type: 'category',
     label: '管理 TapDB',
     link: {type: 'doc', id: 'tapdb/administration/README'},
     items: [
            'tapdb/administration/production-notes',
            'tapdb/administration/backups',
        ]
    }, 
   {
     type: 'category',
     label: '附录',
     link: {type: 'doc', id: 'tapdb/appendix/README'},
     items: [
            'tapdb/appendix/license',
            'tapdb/appendix/compatibility',
            'tapdb/appendix/install-on-ubuntu-v4',
        ]
    }, 

  ]
};

module.exports = sidebars;
