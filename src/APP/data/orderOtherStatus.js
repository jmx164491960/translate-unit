export const getOrderOtherStatus = function(labelArr) {
  const options = [
    {
      name: '重发单',
      value: 6,
      translateKey: 'reissue'
    },
    {
      name: 'Event Gift',
      value: 7,
      translateKey: 'eventGift'
    },
    {
      name: '妥投时间即将到期',
      value: 2,
      translateKey: 'PDTIsAboutToExpire'
    },
    // {
    //   name: '销售待处理',
    //   value: ''
    // },
    // {
    //   name: '客服待处理',
    //   value: ''
    // },
    // {
    //   name: 'Eachine品牌批发单',
    //   value: ''
    // }
  ];
  return options.filter((item) => {
    return labelArr.indexOf(item.name) > -1;
  })
}