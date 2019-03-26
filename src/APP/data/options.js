const lang = $lang('parcelManagement');
import {
  getLogisticsAccount,
  getCountries,
  getOnlinePostMethod,
  getOrderStatus, getOrderTraceStatus,
  getOrderType,
  getPlatformShop, getShippingCenter, getShippingMethod, getSiteName,
  getErrorTip
} from '@/api/oaSearchOrder';
import { isEmptyResult } from '@/common/utils'

/**
 * 设置表单项选项
 * @param {string} namePath 类别名.表单项名
 * @param {array} options 选项
 */
export function setOptionsByNamePath (namePath, options, conditionData) {
  let schema = conditionData.schema
  if (isEmptyResult(schema)) {
    return
  }
  let [categoryName, formItemName] = namePath.split('.')
  let category = schema.find(item => item.name === categoryName) || {}
  let formItem = category.formSchema.find(item => item.name === formItemName)
  formItem.options = options;
  return conditionData;
}

export function getOrderTypeOptions() {
  const params = {
    tableName: 'crm_order_parent',
    columnName: 'order_type'
  }
  return getOrderType(params).then(response => {
    let data = response.data
    data = data.sort((a, b) => a.id_lang.localeCompare(b.id_lang))
    let arr = data.map(item => {
      return {
        label: item.id_lang,
        id: item.id
      }
    })
    const finallyArray = [
      {
        label: lang('orderType'),
        id: 'orderType',
        children: arr
      }
    ];
    return finallyArray;
    // return setOptionsByNamePath('orderType.orderType', finallyArray)
  })
};

export function getCountriesOptions() {
  const params = {
    tableName: 'cs_crm_countrys',
    columnName: 'shortening'
  }
  return getCountries(params).then(response => {
    let data = response.data
    data = data.sort((a, b) => a.id_lang.localeCompare(b.id_lang))
    let arr = data.map(item => {
      return {
        label: item.id_lang,
        id: item.id
      }
    });
    const finallyArray = [
      {
        label: lang('countryList'),
        id: 'countries',
        children: arr
      }
    ];
    return finallyArray;
    // this.setOptionsByNamePath('country.country', finallyArray)
  });
}

export function getOrderStatusOptions() {
  const params = {
    tableName: 'cs_order_state',
    columnName: 'id'
  }
  return getOrderStatus(params).then(response => {
    let data = response.data
    data = data.sort((a, b) => a.id_lang.localeCompare(b.id_lang))
    let arr = data.map(item => {
      return {
        label: item.id_lang,
        id: item.id
      }
    });
    return [
      {
        label: lang('orderStatus'),
        id: 'orderStatus',
        children: arr
      }
    ];
  });
}

// 获取邮寄方式
export function getShippingMethodOptions () {
  const params = {
    tableName: 'cs_post_type',
    columnName: 'id'
  }
  return getShippingMethod(params).then(response => {
    console.log('response', response)
    let data = response.data
    data = data.sort((a, b) => a.id_lang.localeCompare(b.id_lang))
    let arr = data.map(item => {
      return {
        label: item.id_lang,
        id: item.id
      }
    });
    return [
      {
        label: lang('mailingMethod'),
        id: 'shippingMethod',
        children: arr
      }
    ];
    // this.setOptionsByNamePath('shippingMethod.shippingMethod', finallyArray)
  });
}

// 获取在线邮寄方式
export function getOnlinePostMethodOptions() {
  return getOnlinePostMethod().then(response => {
    let data = response.data
    data = data.sort((a, b) => a.id_lang.localeCompare(b.id_lang))
    let arr = data.map(item => {
      return {
        label: item.id_lang,
        id: item.id
      }
    });
    return [
      {
        label: lang('onlineMailingMethod'),
        id: 'onlinePostMethod',
        children: arr
      }
    ];
  });
}

// 获取平台店铺列表
export function getPlatformShopOptions() {
  return getPlatformShop().then(response => {
    console.log('platformShop', response)
    let data = response.data
    data = data.sort((a, b) => a.siteName.localeCompare(b.siteName))
    data = data.filter(item => item.shopList.length)
    return data.map(item => {
      item.shopList = item.shopList.sort((a, b) => a.shopName.localeCompare(b.shopName))
      return {
        label: item.siteName,
        id: 'platform' + item.csConnectionSiteNum,
        children: item.shopList.map(subItem => {
          return {
            label: subItem.shopName,
            id: subItem.shopId
          }
        })
      }
    })
    // this.setOptionsByNamePath('shopName.shopName', arr)
  })
}

// 获取发货中心
export function getShippingCenterOptions() {
  const params = {
    tableName: 'cs_channel_area',
    columnName: 'process_center_id'
  }
  return getShippingCenter(params).then(response => {
    let data = response.data
    data = data.sort((a, b) => a.id_lang.localeCompare(b.id_lang))
    let arr = data.map(item => {
      return {
        label: item.id_lang,
        id: item.id
      }
    })

    return [
      {
        label: lang('deliveryCenter'),
        id: 'shippingCenter',
        children: arr
      }
    ];
  });
}

// 销售经理
export function getLogisticsAccountOptions() {
  return getLogisticsAccount().then(response => {
    let data = response.data
    data = data.sort((a, b) => a.plateFormName.localeCompare(b.plateFormName))
    data = data.filter(item => item.flytUserId.length)
    console.log('getLogisticsAccount', response)
    const arr = data.map(item => {
      item.flytUserId = item.flytUserId.sort((a, b) => a.localeCompare(b))
      return {
        label: item.plateFormName,
        id: item.plateFormName,
        children: item.flytUserId.map(subItem => {
          return {
            label: subItem,
            id: subItem
          }
        })
      }
    });
    return arr;
    // this.setOptionsByNamePath('logisticsAccount.logisticsAccount', arr)
  });
}

// 获取站点
export function getSiteNameOptions() {
  return getSiteName().then(response => {
    console.log('response', response)
    let data = response.data;
    data = data.sort((a, b) => a.value.localeCompare(b.value));
    let arr = data.map(item => {
      return {
        label: item.value,
        id: item.id
      }
    });

    return [
      {
        label: lang('siteInformation'),
        id: 'siteName',
        children: arr
      }
    ];
    // this.setOptionsByNamePath('siteName.siteName', finallyArray);
  });
}

// 获取错误信息
export function getErrorTipOptions () {
  return getErrorTip().then(response => {
    console.log('getErrorTip', response)
    let data = response.data
    data = data.sort((a, b) => a.type.localeCompare(b.type))
    data = data.filter(item => item.errorprompts.length)
    return data.map(item => {
      item.errorprompts = item.errorprompts.sort((a, b) => a.errorMsg.localeCompare(b.errorMsg))
      return {
        label: item.type,
        id: item.type,
        children: item.errorprompts.map(subItem => {
          return {
            label: subItem.errorMsg,
            id: subItem.errorCode
          }
        })
      }
    })
    // this.setOptionsByNamePath('errorTip.errorTip', arr)
  })
}

// 获取订单追踪状态
export function getOrderTraceStatusOptions() {
  const params = {
    tableName: 'cs_package',
    columnName: 'channel_track_status'
  }
  return getOrderTraceStatus(params).then(response => {
    console.log('response', response)
    let data = response.data
    data = data.sort((a, b) => a.id_lang.localeCompare(b.id_lang))
    let arr = data.map(item => {
      return {
        label: item.id_lang,
        id: item.id
      }
    })
    return [
      {
        label: lang('orderTrackingStatus'),
        id: 'orderTraceStatus',
        children: arr
      }
    ];
    // this.setOptionsByNamePath('orderTraceStatus.orderTraceStatus', finallyArray)
  });
}

export const setOptionHandlers = [
  {
    executor: getOrderTypeOptions,
    path: 'orderType.orderType'
  }, {
    executor: getCountriesOptions,
    path: 'country.country'
  }, {
    executor: getOrderStatusOptions,
    path: 'orderStatus.orderStatus'
  }, {
    executor: getShippingMethodOptions,
    path: 'shippingMethod.shippingMethod'
  }, {
    executor: getOnlinePostMethodOptions,
    path: 'onlinePostMethod.onlinePostMethod'
  }, {
    executor: getPlatformShopOptions,
    path: 'shopName.shopName'
  }, {
    executor: getShippingCenterOptions,
    path: 'shippingCenter.shippingCenter'
  },
  // {
  //   executor: getLogisticsAccountOptions,
  //   path: 'logisticsAccount.logisticsAccount'
  // },
  {
    executor: getSiteNameOptions,
    path: 'siteName.siteName'
  }, {
    executor: getErrorTipOptions,
    path: 'errorTip.errorTip'
  }, {
    executor: getOrderTraceStatusOptions,
    path: 'orderTraceStatus.orderTraceStatus'
  }
];

// SKU基础状态

// 支付方式

// 客服组长

// 有无客户留言

// 是否投诉

// 供应链状态

// 产品状态

// （预）邮寄方式

// 问题类型

// code: 虚发订单,
// WE JE JSE Wish需要妥投 重发单 eGD