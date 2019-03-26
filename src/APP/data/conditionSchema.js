export function getConditionSchema(keys) {
  const data = [
    // 订单类型
    {
      name: 'orderType',
      // cate: '订单类型',
      translateKey: 'orderType',
      formSchema: [
        {
          name: 'orderType',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '订单类型',
          translateKey: 'orderType',
          options: [],
          memoryName: 'oaOrderManage-orderType-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    // 时间
    {
      name: 'time',
      translateKey: 'time',
      formSchema: [
        {
          name: 'exportDate',
          fieldType: 'DateRange',
          // label: '导入时间',
          translateKey: 'importTime'
        },
        {
          name: 'consignDate',
          fieldType: 'DateRange',
          // label: '交寄时间',
          translateKey: 'handoverTime'
        },
        {
          name: 'shippingDate',
          fieldType: 'DateRange',
          // label: '发货时间',
          translateKey: 'deliveryTime',
        },
        {
          name: 'signDate',
          fieldType: 'DateRange',
          // label: '签收时间',
          translateKey: 'submissionTime',
        },
      ],
      group: 4,
      rule: {},
      visible: false
    },
    // 国家
    {
      name: 'country',
      // cate: '国家',
      translateKey: 'country',
      formSchema: [
        {
          name: 'country',
          fieldType: 'TreeSelect',
          placeholderKey: 'country',
          // label: '国家',
          translateKey: 'country',
          options: [],
          memoryName: 'oaOrderManage-country-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        }
      ],
      rule: {},
      visible: false
    },
    // 订单状态
    {
      name: 'orderStatus',
      // cate: '订单状态',
      translateKey: 'orderStatus',
      formSchema: [
        {
          name: 'orderStatus',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '订单状态',
          translateKey: 'orderStatus',
          options: [],
          memoryName: 'oaOrderManage-orderStatus-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    // 在线邮寄方式
    {
      name: 'onlinePostMethod',
      // cate: '在线邮寄方式',
      translateKey: 'onlineMailingMethod',
      formSchema: [
        {
          name: 'onlinePostMethod',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '在线邮寄方式',
          translateKey: 'onlineMailingMethod',
          options: [],
          memoryName: 'oaOrderManage-onlinePostMethod-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    // 邮寄方式
    {
      name: 'shippingMethod',
      // cate: '邮寄方式',
      translateKey: 'mailingMethod',
      formSchema: [
        {
          name: 'shippingMethod',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '邮寄方式',
          translateKey: 'mailingMethod',
          options: [],
          memoryName: 'oaOrderManage-shippingMethod-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    // 店铺名称
    {
      name: 'shopName',
      // cate: '店铺名称',
      translateKey: 'storeName',
      formSchema: [
        {
          name: 'shopName',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '店铺名称',
          translateKey: 'storeName',
          options: [],
          memoryName: 'oaOrderManage-shopName-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    // 发货中心
    {
      name: 'shippingCenter',
      // cate: '发货中心',
      translateKey: 'deliveryCenter',
      formSchema: [
        {
          name: 'shippingCenter',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '发货中心',
          translateKey: 'deliveryCenter',
          options: [],
          memoryName: 'oaOrderManage-shippingCenter-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    {
      name: 'salesManager',
      // cate: '销售经理',
      translateKey: 'salesManager',
      formSchema: [
        {
          name: 'salesManager',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '销售经理',
          translateKey: 'salesManager',
          options: [],
          memoryName: 'orOrderManage-salesManager-history', // TODO
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true
          }
        }
      ]
    },
    // 物流账号
    {
      name: 'logisticsAccount',
      // cate: '物流账号',
      translateKey: 'logisticsAccount',
      formSchema: [
        {
          name: 'logisticsAccount',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '物流账号',
          translateKey: 'logisticsAccount',
          options: [],
          memoryName: 'oaOrderManage-logisticsAccount-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    // 站点名称
    {
      name: 'siteName',
      // cate: '站点名称',
      translateKey: 'siteName',
      formSchema: [
        {
          name: 'siteName',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '站点名称',
          translateKey: 'siteName',
          options: [],
          memoryName: 'oaOrderManage-siteName-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    // 错误提示
    {
      name: 'errorTip',
      // cate: '错误提示',
      translateKey: 'errorMessage',
      formSchema: [
        {
          name: 'errorTip',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '错误提示',
          translateKey: 'errorMessage',
          options: [],
          memoryName: 'oaOrderManage-errorTip-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    // 订单追踪状态
    {
      name: 'orderTraceStatus',
      // cate: '订单追踪状态',
      translateKey: 'orderTrackingStatus',
      formSchema: [
        {
          name: 'orderTraceStatus',
          fieldType: 'TreeSelect',
          placeholderKey: 'pleaseSelect',
          // label: '订单追踪状态',
          translateKey: 'orderTrackingStatus',
          options: [],
          memoryName: 'oaOrderManage-orderTraceStatus-history',
          searchCount: 0,
          attr: {
            valueConsistsOf: 'BRANCH_PRIORITY',
            async: true,
          }
        },
      ],
      rule: {},
      visible: false
    },
    // 物品ID
    {
      name: 'goods',
      // cate: '物品ID',
      translateKey: 'itemId',
      formSchema: [
        {
          name: 'goodsId',
          fieldType: 'TextInput',
          placeholderKey: 'pleaseEnter',
          // label: '物品ID',
          translateKey: 'itemId'
        },
      ],
      rule: {},
      visible: false
    },
    // {
    //   name: 'skuBaseStatus',
    //   // cate: 'SKU基础状态',
    //   translateKey: 'skuBaseState',
    //   formSchema: [
    //     {
    //       name: 'skuBaseStatus',
    //       fieldType: 'SelectList',
    //       placeholderKey: 'pleaseEnter',
    //       translateKey: 'skuBaseState',
    //       // label: 'SKU基础状态',
    //       options: [
    //         {
    //           label: 'test',
    //           value: 1,
    //           translateKey: '1',
    //         },
    //         {
    //           label: 'test',
    //           value: 0,
    //           translateKey: '2'
    //         }
    //       ]
    //     }
    //   ],
    //   rule: {},
    //   visible: false
    // },
    // {
    //   name: 'payType',
    //   // cate: '支付方式',
    //   translateKey: 'paymentMethod',
    //   formSchema: [
    //     {
    //       name: 'payType',
    //       fieldType: 'SelectList',
    //       placeholderKey: 'paymentMethod',
    //       // label: '支付方式',
    //       options: [
    //         {
    //           label: 'test',
    //           value: 1,
    //           translateKey: '1',
    //         },
    //         {
    //           label: 'test',
    //           value: 0,
    //           translateKey: '2'
    //         }
    //       ]
    //     }
    //   ],
    //   rule: {},
    //   visible: false
    // },
    // {
    //   name: 'csLeader',
    //   // cate: '客服组长',
    //   translateKey: 'customerServiceTeamLeader',
    //   formSchema: [
    //     {
    //       name: 'csLeader',
    //       fieldType: 'SelectList',
    //       placeholderKey: 'pleaseEnter',
    //       translateKey: 'customerServiceTeamLeader',
    //       // label: '客服组长',
    //       options: [
    //         {
    //           label: 'test',
    //           value: 1,
    //           translateKey: '1',
    //         },
    //         {
    //           label: 'test',
    //           value: 0,
    //           translateKey: '2'
    //         }
    //       ]
    //     }
    //   ],
    //   rule: {},
    //   visible: false
    // },
    // 处理人
    {
      name: 'processPerson',
      translateKey: 'processPerson',
      formSchema: [{
        name: 'processPerson',
        fieldType: 'TextInput',
        placeholderKey: 'pleaseEnter',
        translateKey: 'processPerson'
      }],
      rule: {},
      visible: false
    },
    {
      name: 'seller',
      // cate: '销售员',
      translateKey: 'seller',
      formSchema: [
        {
          name: 'seller',
          fieldType: 'TextInput',
          placeholderKey: 'pleaseEnter',
          // label: '销售员',
          translateKey: 'seller'
        },
      ],
      rule: {},
      visible: false
    },
    // {
    //   name: 'isHasCustomerMsg',
    //   // cate: '有无客户留言',
    //   translateKey: 'withOrWithoutCustomerMessage',
    //   formSchema: [
    //     {
    //       name: 'isHasCustomerMsg',
    //       fieldType: 'SelectList',
    //       translateKey: 'withOrWithoutCustomerMessage',
    //       placeholderKey: 'pleaseEnter',
    //       // label: '有无客户留言',
    //       options: [
    //         {
    //           label: 'test',
    //           value: 1,
    //           translateKey: '1',
    //         },
    //         {
    //           label: 'test',
    //           value: 0,
    //           translateKey: '2'
    //         }
    //       ]
    //     }
    //   ],
    //   rule: {},
    //   visible: false
    // },
    // 是否投诉
    // {
    //   name: 'isComplain',
    //   // cate: '是否投诉',
    //   translateKey: 'whetherToComplain',
    //   formSchema: [
    //     {
    //       name: 'isComplain',
    //       fieldType: 'SelectList',
    //       translateKey: 'whetherToComplain',
    //       placeholderKey: 'pleaseEnter',
    //       options: [
    //         {
    //           label: 'test',
    //           value: 1,
    //           translateKey: '1',
    //         },
    //         {
    //           label: 'test',
    //           value: 0,
    //           translateKey: '2'
    //         }
    //       ]
    //     }
    //   ],
    //   rule: {},
    //   visible: false
    // },
  ];

  let defaultKeys = ['time']; // 默认就有的，比如时间

  // 传空默认是全部
  if (!keys) {
    return data;
  } else {
    keys = [...defaultKeys, ...keys];
    return data.filter((item) => {
      return keys.indexOf(item.translateKey) > -1;
    });
  }
}