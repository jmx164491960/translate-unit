export function getTableBtnSchema(arr) {
  const data = [
    {
      name: '设置到黑名单',
      value: 'setToBlackList'
    },
    {
      name: '移动到',
      value: 'showMoveList'
    },
    {
      name: '移动到批发待发货',
      value: 'moveToPendShip'
    },
    {
      name: '设置发货中心和更改邮寄方式',
      value: 'setShipMail'
    },
    {
      name: '批量修改订单备注',
      value: 'orderRemark'
    },
    {
      name: '添加提醒',
      value: 'addReminder'
    },
    {
      name: '发送邮件',
      value: 'sendEmail'
    },
    {
      name: '标志为联系中',
      value: 'markedAsLink'
    },
    {
      name: '处理人分配',
      value: 'handlerAllocation'
    },
    {
      name: '批量contact buyer',
      value: 'batchContactBuyer'
    },
    {
      name: '批量确认地址无误',
      value: 'batchConfirmAddressCorrect'
    },
    {
      name: '批量打开订单详情',
      value: 'batchOpeningOrderContent'
    },
    {
      name: '设置留言已处理',
      value: 'setMsgProcess'
    },
    {
      name: '审核退件单',
      value: 'reviewBackOrder'
    },
    {
      name: '重新匹配报关单',
      value: 'rematchOrder'
    },
    {
      name: '设置邮寄方式不跳转',
      value: 'setMailNotJump'
    },
    {
      name: '确认偏远地区订单',
      value: 'confirmFarOrder'
    },
    {
      name: '确认并提交快递订单',
      value: 'confirmToSendOrder'
    },
    {
      name: '转FBA发货',
      value: 'FBAship'
    },
    {
      name: '设置销售待处理',
      value: 'setSalePending'
    },
    {
      name: '设置客服待处理',
      value: 'setCSPending'
    },
    {
      name: '合并订单',
      value: 'mergeOrder'
    },
    {
      name: '汇总报表',
      value: 'summaryReport'
    },
    {
      name: '打印配货单',
      value: 'printCargoOrder'
    },
    {
      name: '打印配货明细',
      value: 'printCargoDetail'
    },
    {
      name: '显示库存状态',
      value: 'showStock'
    },
    {
      name: '添加退款单',
      value: 'addRrefundSlip'
    },
    {
      name: '导出excel',
      value: 'exportExcel'
    },
    {
      name: '批量拦截',
      value: 'batchInterception'
    },
    {
      name: '虚拟发货',
      value: 'virtualDelivery'
    },
    {
      name: '批量拆分产品组',
      value: 'batchSplitPG'
    },
    {
      name: '批量修改SKU/POA',
      value: 'batchModifySKUPOA'
    },
    {
      name: '查询后台订单状态'
    },
    {
      name: '重发',
      value: 'reSend'
    },
    {
      name: '联系中',
      value: 'contacting'
    }
  ];
  return data.filter((item) => {
    return arr.indexOf(item.name) > -1;
  });
}