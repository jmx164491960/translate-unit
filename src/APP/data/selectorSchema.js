export function getSelectorSchema() {
  return [
    {
      name: 'number',
      label: '',
      fieldType: 'SelectList',
      translateKey: 'number',
      placeholderKey: 'pleaseEnterContent',
      options: [
        {
          value: 'shipworks_order',
          translateKey: 'orderNumber'
        },
        {
          // label: '货号',
          value: 'goodsNo',
          translateKey: 'itemNumber'
        },
        {
          value: 'paypal_transaction_id',
          translateKey: 'paypalNo'
        },
        {
          // label: '原订单ID',
          value: 'originalOrderID',
          translateKey: 'originalOrderId'
        },
        {
          // label: '(系统)跟踪号',
          value: 'systemTraceId',
          translateKey: 'systemTrackingNumber'
        },
        {
          // label: '用户跟踪号',
          value: 'userTraceId',
          translateKey: 'userTrackingNumber'
        },
        {
          label: 'UserID',
          value: 'UserID',
          // translateKey: 'paypalNo'
        },
        {
          // label: '收件人',
          value: 'receiver',
          translateKey: 'receiver'
        },
        {
          // label: '邮件地址',
          value: 'email',
          translateKey: 'emailAddress'
        },
        {
          value: 'phone',
          translateKey: 'phone'
        },
      ]
    },
    {
      name: 'productToken',
      // label: '产品标识',
      fieldType: 'SelectList',
      translateKey: 'productIdentification',
      placeholderKey: 'pleaseEnter',
      options: [
        {
          label: 'SKU',
          value: 'sku',
          // translateKey: 'orderNo'
        },
        {
          label: 'POA',
          value: 'poa',
          // translateKey: 'orderNo'
        },
        {
          label: 'PMX',
          value: 'pmx',
          // translateKey: 'orderNo'
        },
      ],
      isMultiParams: false
    },
    // {
    //   name: 'skuStatus',
    //   label: 'SKU基础状态',
    //   fieldType: 'SelectList',
    //   placeholderKey: 'TODO',
    //   options: [
    //     {
    //       label: 'test',
    //       value: 'test'
    //     }
    //   ],
    //   isMultiParams: false
    // },
    // {
    //   name: 'payType',
    //   label: '支付方式',
    //   fieldType: 'SelectList',
    //   placeholderKey: 'TODO',
    //   options: [
    //     {
    //       label: 'test',
    //       value: 'test'
    //     }
    //   ]
    // },
    // {
    //   name: 'isHasCustomMsg',
    //   label: '有无客人留言',
    //   fieldType: 'SelectList',
    //   placeholderKey: 'TODO',
    //   options: [
    //     {
    //       label: 'test',
    //       value: 'test'
    //     }
    //   ]
    // },
    // {
    //   name: 'orderAmount',
    //   label: '订单金额(USD)',
    //   fieldType: 'SelectList',
    //   // translateKey: 'number',
    //   placeholderKey: 'pleaseEnter',
    //   options: [
    //     {
    //       label: '小于等于',
    //       value: 'lessThanOrEqual',
    //       // translateKey: 'orderNo'
    //     },
    //     {
    //       label: '大于等于',
    //       value: 'moreThanOrEqual',
    //       // translateKey: 'orderNo'
    //     },
    //   ],
    //   isMultiParams: false
    // },
    // 订单其他状态[1:Event Gift、2:妥投时间即将到期、3:已修改地址、4:WE时效不达标、5:滞销跳转订单、6:重发单]
    {
      name: 'otherOrderStatus',
      // label: '订单其他状态',
      fieldType: 'CheckBoxList',
      translateKey: 'orderOtherStatus',
      options: [
        {
          label: '重发单',
          value: 6,
          translateKey: 'reissue'
        },
        {
          label: 'Event Gift',
          value: 7,
          translateKey: 'eventGift'
        },
        {
          label: '妥投时间即将到期',
          value: 2,
          translateKey: 'PDTIsAboutToExpire'
        },
        {
          label: '销售待处理',
          value: ''
        },
        {
          label: '客服待处理',
          value: ''
        },
        {
          label: 'Eachine品牌批发单',
          value: ''
        }
      ]
    },
    {
      name: 'advancedOptions',
      // label: '',
      fieldType: 'ConditionList',
      translateKey: 'advancedOptions'
    }
  ];
}