export function getTableAttr() {
  return {
    name: 'oaOrderManageTable',
    loading: false,
    attr: {},
    status: 'noData',
    selection: [],
    currentPage: 1,
    total: 0,
    pageSize: 20,
    paginationDisabled: true,
    defaultSortParam: {
      prop: 'createdTime',
      order: 'descending'
    },
    cusPrompt: '',
    sortParam: '' // 排序参数
  };
}

export function getTableSchema() {
  return [
    // 包裹单号
    {
      prop: 'packageNo',
      translateKey: 'parcelNumber',
      // sortable: 'custom',
      isUseTemplate: true,
      'min-width': '160px',
      noHide: true
    },
    // 客户单号
    {
      prop: 'orderList',
      translateKey: 'shipworksOrder',
      // sortable: 'custom',
      isHide: true,
      isUseTemplate: true,
      width: '160px'
    },
    // 平台
    {
      prop: 'platformName',
      translateKey: 'platform'
    },
    // 店铺
    {
      prop: 'shopName',
      translateKey: 'shopId',
      width: '120px'
    },
    // 错误提示
    {
      prop: 'errorCode_lang',
      translateKey: 'errorTip',
      isUseTemplate: true,
      isHide: true,
      width: '170px'
    },

    // 拦截原因
    {
      prop: 'holdupReasons',
      translateKey: 'holdupReasons',
      isHide: true,
      width: '170px'
    },
    // 客户留言
    {
      prop: 'ppNote',
      translateKey: 'ppNote',
      isHide: true,
      width: '170px'
    },
    // 邮件地址
    {
      prop: 'email',
      translateKey: 'email',
      isHide: true,
      width: '170px'
    },
    // 物流收货时间
    {
      prop: 'receiveTime',
      translateKey: 'receiveTime',
      isHide: true,
      width: '170px'
    },
    // 订单备注
    {
      prop: 'orderRemark',
      translateKey: 'orderRemark',
      // showOverflowTooltip: false,
      isUseTemplate: true,
      isHide: true,
      width: '170px'
    },

    // 包裹价值(USD)
    {
      prop: 'totalAmount',
      // sortable: 'custom',
      translateKey: 'parcelValue',
      isHide: true,
      isUseTemplate: true,
      width: '100px',
      align: 'right'
    },
    // 包裹原币金额
    {
      prop: 'originalGoodsAmount',
      translateKey: 'parcelOriginalGoodsPayment',
      isUseTemplate: true,
      align: 'right',
      isHide: true
    },
    // 原币种
    {
      prop: 'originalCurrency',
      translateKey: 'originalCurrency',
      isHide: true
    },
    // 包裹状态
    {
      prop: 'packageStatus_lang',
      translateKey: 'parcelState',
      isUseTemplate: true,
      sortable: 'custom',
      width: '150px'
    },
    // 新客户单号
    {
      prop: 'orderNo',
      translateKey: 'newOrderNo',
      isUseTemplate: true,
      width: '120px'
    },
    // 包裹类型
    {
      prop: 'orderType',
      translateKey: 'parcelType'
    },
    // 跟踪号
    {
      prop: 'traceId',
      // sortable: 'custom',
      translateKey: 'trackingNumber'
    },
    // 邮寄方式
    {
      prop: 'postType_lang',
      // sortable: 'custom',
      translateKey: 'mailWay'
    },
    // 国家
    {
      prop: 'country_lang',
      translateKey: 'country'
    },
    // 支付类型
    {
      prop: 'paymentType_lang',
      translateKey: 'paymentType',
      isHide: true
    },
    // 发货大区
    {
      prop: 'largeAreaId_lang',
      // sortable: 'custom',
      translateKey: 'shippingRegions',
      isUseTemplate: true,
      isHide: true
    },
    // 发货区域
    {
      prop: 'areaId_lang',
      // sortable: 'custom',
      translateKey: 'deliveryArea',
      isUseTemplate: true,
      isHide: true
    },
    // 处理中心
    {
      prop: 'processCenterId_lang',
      // sortable: 'custom',
      isHide: true,
      translateKey: 'processingCenter'
    },
    // 店铺
    {
      prop: 'shopName',
      translateKey: 'shopId',
      isHide: true
    },
    // 州
    {
      prop: 'county',
      translateKey: 'county',
      isHide: true
    },
    // 城市
    {
      prop: 'city',
      translateKey: 'city',
      isHide: true
    },
    // 邮编
    {
      prop: 'zip',
      translateKey: 'zip',
      isHide: true
    },
    // 地址1
    {
      prop: 'address1',
      translateKey: 'buyerAddress1',
      isHide: true
    },
    // 地址2
    {
      prop: 'address2',
      translateKey: 'buyerAddress2',
      isHide: true
    },
    // 发货时间
    {
      prop: 'sendDate',
      translateKey: 'sendDate',
      isHide: true
    },
    // 在线邮寄方式
    {
      prop: 'platformPostType',
      translateKey: 'shippingService',
      isHide: true
    },
    // 客户名称
    {
      prop: 'customerName',
      translateKey: 'cusName',
      width: '170px',
      isUseTemplate: true,
      isHide: true
    },
    // 收件人姓名
    {
      prop: 'receiveName',
      translateKey: 'receiveName',
      isHide: true
    },
    // 电话
    {
      prop: 'phone',
      translateKey: 'phone',
      isHide: true
    },
    // 负责人
    {
      prop: 'directorName',
      translateKey: 'handler',
      width: '100px',
      isHide: true
    },
    // 创建时间
    {
      prop: 'createTime',
      translateKey: 'createTime',
      width: '180px',
      isUseTemplate: true,
      sortable: 'custom'
    }
  ];
}
