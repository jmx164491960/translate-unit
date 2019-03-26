import { getSelectorSchema } from './selectorSchema';
import { getConditionSchema } from './conditionSchema';
import {
  getTableSchema,
  getTableAttr } from './tableSchema';
import {
  getTableBtnSchema
} from './TableBtnSchema';
import parcelStateMap from '@/common/data/parcelStateMap';
import { getOrderOtherStatus } from './orderOtherStatus';

export function getRadioGroupData() {
  return {
    toCheck: {
      name: '待检查',
      executor: function() {
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          '重发单',
          'Event Gift',
          '妥投时间即将到期',
          '销售待处理',
          '客服待处理',
          'Eachine品牌批发单'
        ]);
        return {
          selectorSchema,
          conditionSchema: getConditionSchema(),
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: getTableBtnSchema([
            '设置到黑名单',
            '移动到',
            '移动到批发待发货',
            '设置发货中心和更改邮寄方式',
            '批量修改订单备注',
            '添加提醒',
            '发送邮件',
            '标志为联系中',
            '处理人分配',
            '批量contact buyer',
            '批量确认地址无误',
            '批量打开订单详情',
            '设置留言已处理',
            '审核退件单',
            '重新匹配报关单',
            '设置邮寄方式不跳转',
            '确认偏远地区订单',
            '确认并提交快递订单',
            '转FBA发货',
            '设置销售待处理',
            '设置客服待处理',
          ])
        };
      }
    },
    toMatch: {
      name: '待匹配',
      executor: function() {
        // selectorSchema
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          '重发单',
          'Event Gift'
        ]);
        // conditionSchema
        const conditionSchema = getConditionSchema([
          'country',
          'itemId',
          'storeName',
          'deliveryCenter',
          'mailingMethod',
          'skuBaseState',
          'salesManager',
          'logisticsAccount',
          'siteName',
          'errorMessage',
          'seller',
          'orderTrackingStatus'
        ]);
        return {
          selectorSchema: selectorSchema,
          conditionSchema: conditionSchema,
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: getTableBtnSchema([
            '设置到黑名单',
            '批量修改订单备注',
            '添加提醒',
            '发送邮件'
          ])
        };
      }
    },
    confirmed: {
      name: '已确认',
      executor: function() {
        // selectorSchema
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          '重发单',
          'Event Gift'
        ]);
        // conditionSchema
        let conditionSchema = getConditionSchema([
          'country',
          'itemId',
          'storeName',
          'deliveryCenter',
          'mailingMethod',
          'skuBaseState',
          'salesManager',
          'logisticsAccount',
          'siteName',
          'errorMessage',
          'seller',
          'orderTrackingStatus'
        ]);
        return {
          selectorSchema: selectorSchema,
          conditionSchema: conditionSchema,
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: getTableBtnSchema([
            '设置到黑名单',
            '批量修改订单备注',
            '添加提醒',
            '发送邮件'
          ])
        };
      }
    },
    unconfirmed: {
      name: '未确认',
      executor: function() {
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          '重发单',
          'Event Gift'
        ]);
        return {
          selectorSchema,
          conditionSchema: getConditionSchema([
            'orderType',
            'country',
            'itemId',
            'storeName',
            'deliveryCenter',
            'skuBaseStatus',
            'salesManager',
            'logisticsAccount',
            'siteName',
            'errorMessage',
            'seller',
            'orderTrackingStatus'
          ]),
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: getTableBtnSchema([
            '设置到黑名单',
            '移动到',
            '设置发货中心和更改邮寄方式',
            '批量修改订单备注',
            '合并订单',
            '添加提醒',
            '发送邮件'
          ])
        };
      }
    },
    lock: {
      name: '锁定',
      executor: function() {
        return {
          selectorSchema: [],
          conditionSchema: [],
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: []
        };
      }
    },
    contactCustomer: {
      name: '联系客户',
      executor: function() {
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          '重发单',
          'Event Gift',
          '妥投时间即将到期',
          '销售待处理',
          '客服待处理',
          'Eachine品牌批发单',
          '虚发订单'
        ]);
        return {
          selectorSchema,
          conditionSchema: getConditionSchema([
            'orderType',
            'country',
            'itemId',
            'storeName',
            'deliveryCenter',
            'shippingMethod',
            'skuBaseStatus',
            'salesManager',
            'processPerson',
            'customerServiceTeamLeader',
            'logisticsAccount',
            'siteName',
            'errorMessage',
            'paymentMethod',
            'seller',
          ]),
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: getTableBtnSchema([
            '汇总报表',
            '设置到黑名单',
            '移动到',
            '批量修改订单备注',
            '打印配货单',
            '打印配货明细',
            '添加提醒',
            '发送邮件',
            '标志为联系中',
            '处理人分配',
            // 批量打开订单明细
            // 批量打开订单详情
            '显示库存状态',
            '批量contact buyer',
            '添加退款单'
          ])
        };
      }
    },
    stockout: {
      name: '缺货订单',
      executor: function() {
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          '重发单',
          'Event Gift',
          '妥投时间即将到期',
          '销售待处理',
          '客服待处理',
          'Eachine品牌批发单'
        ]);
        return {
          selectorSchema,
          conditionSchema: getConditionSchema([
            'orderType',
            'country',
            'itemId',
            'storeName',
            'deliveryCenter',
            'shippingMethod',
            'skuBaseStatus',
            'salesManager',
            'processPerson',
            'customerServiceTeamLeader',
            'logisticsAccount',
            'siteName',
            'errorMessage',
            'paymentMethod',
            'seller',
            'orderTrackingStatus'
            // 时间
          ]),
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: getTableBtnSchema([
            '汇总报表',
            '设置到黑名单',
            '移动到',
            // '移动到批发待发货',
            '设置发货中心和更改邮寄方式',
            '批量修改订单备注',
            '打印配货单',
            '打印配货明细',
            '添加提醒',
            '发送邮件',
            // '批量打开订单详情',
            '批量拆分产品组',
            '批量修改SKU/POA',
            '查询后台订单状态'
          ])
        };
      }
    },
    // consignProblemOrder: {
    //   name: '交寄问题订单',
    //   executor: function() {
    //     return {
    //       selectorSchema: getSelectorSchema(),
    //       conditionSchema: getConditionSchema(),
    //       tableSchema: getTableSchema(),
    //       tableAttr: getTableAttr(),
    //       tableBtnSchema: []
    //     };
    //   }
    // },
    intercepted: {
      name: '已拦截',
      executor: function() {
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          '重发单',
          'Event Gift'
        ]);
        return {
          selectorSchema,
          conditionSchema: getConditionSchema([
            'orderType',
            'country',
            'itemId',
            'storeName',
            'deliveryCenter',
            'shippingMethod',
            'skuBaseStatus',
            'salesManager',
            'customerServiceTeamLeader',
            'logisticsAccount',
            'siteName',
            'errorMessage',
          ]),
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: getTableBtnSchema([
            '设置到黑名单',
            '移动到',
            '设置发货中心和更改邮寄方式',
            '批量修改订单备注',
            '添加提醒',
            '发送邮件',
            '转FBA发货'
          ])
        };
      }
    },
    inBack: {
      name: '退回中',
      executor: function() {
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          '重发单',
          'Event Gift'
        ]);
        return {
          selectorSchema,
          conditionSchema: getConditionSchema([
            'orderType',
            'country',
            'processPerson',
            'itemId',
            'storeName',
            'deliveryCenter',
            'shippingMethod',
            'skuBaseStatus',
            'salesManager',
            'customerServiceTeamLeader',
            'logisticsAccount',
            'siteName',
            'errorMessage',
            'seller',
            'orderTrackingStatus'
          ]),
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: []
        };
      }
    },
    returned: {
      name: '已退回',
      executor: function() {
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          '重发单',
          'Event Gift'
        ]);
        return {
          selectorSchema,
          conditionSchema: getConditionSchema([
            'orderType',
            'country',
            'processPerson',
            'itemId',
            'storeName',
            'deliveryCenter',
            'shippingMethod',
            'skuBaseStatus',
            'salesManager',
            'customerServiceTeamLeader',
            'logisticsAccount',
            'siteName',
            'errorMessage',
            'seller',
            'orderTrackingStatus'
          ]),
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: getTableBtnSchema([
            '设置到黑名单',
            '批量修改订单备注',
            '重发',
            '添加提醒',
            '发送邮件',
            // '导出Excel',
            '批量contact buyer',
            '处理人分配',
            '联系中'
          ])
        };
      }
    },
    cancelOrder: {
      name: '已取消',
      executor: function() {
        let selectorSchema = getSelectorSchema();
        const orderOtherStatus = selectorSchema.find((item) => {
          return item.translateKey === 'orderOtherStatus';
        });
        orderOtherStatus.options = getOrderOtherStatus([
          'WE',
          'JE',
          'JSE',
          'Wish需要妥投',
          '重发单',
          'eGD',
          'Event Gift'
        ]);
        return {
          selectorSchema,
          conditionSchema: getConditionSchema([
            'deliveryCenter',
            'onlineMailingMethod',
            'storeName',
            'country',
            'itemId',
            'siteName',
            'skuBaseState',
            'salesManager'
          ]),
          tableSchema: getTableSchema(),
          tableAttr: getTableAttr(),
          tableBtnSchema: getTableBtnSchema([
            '移动到',
            '转FBA发货',
          ])
        };
      }
    },
    // deleted: {
    //   name: '已删除',
    //   executor: function() {
    //     return {
    //       selectorSchema: getSelectorSchema(),
    //       conditionSchema: getConditionSchema(),
    //       tableSchema: getTableSchema(),
    //       tableAttr: getTableAttr(),
    //       tableBtnSchema: []
    //     };
    //   }
    // }
  };
};

const temp = getRadioGroupData();
export const radioOptions = Object.keys(temp).map((key) => {
  return {
    name: temp[key].name,
    key,
    value: parcelStateMap.find(item => item.label === key).value
  };
})

export function getBindData(key) {
  const temp = getRadioGroupData();
  const data = temp[key].executor();
  data.tableBtnSchema.forEach((item) => {
    item.belong = key;
  });
  return data;
}