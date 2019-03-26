<template>
  <display-layout class="oaOrderManage" :layout="layoutData">
    <template slot="selector" slot-scope="{isScroll}">
      <div class="radio-group-box">
        <a-radio-group @change="radioGroupChange" v-model="selectRadio">
          <a-radio-button
            v-for="item in radioOptions"
            :key="item.key"
            :value="item.key"
          >{{ lang(item.key) }}</a-radio-button>
        </a-radio-group>
      </div>
      <selector
        :is-scroll="isScroll"
        ref="selector"
        :selector-btn-show="selectorBtnShow"
        v-model="selectorData"
        :schema="selectorSchema"
        @onSearch="onSearch"
        @onReset="onReset"
        :is-multi-params="false"
      >
        <condition
          slot="condition"
          ref="condition"
          v-model="conditionData.value"
          :formRule="conditionData.formRule"
          :schema="conditionData.schema"
        ></condition>
      </selector>
    </template>

    <!-- 表格操作部分 -->
    <div slot="operate" class="operate">
      <table-btn-group
        :schema="tableBtnSchema"
        :selection="tableAttr.selection"
        @clear="$refs.oaOrderManageTable.clearSelection()"
        @btn-click="tableBtnClick"></table-btn-group>
      <!-- <img :src="intercept_tip" class="intercept-arrow" v-show="isIntercept && !isEn">
      <img :src="intercept_tip_en" class="intercept-arrow-en" v-show="isIntercept && isEn">-->
    </div>

    <!-- Table数据展示部分 -->
    <my-table
      slot="table"
      slot-scope="{height}"
      :height="height"
      :loading="tableAttr.loading"
      :name="tableAttr.name"
      ref="oaOrderManageTable"
      class="oaOrderManage-table"
      v-model="tableListData"
      :attr="tableAttr.attr"
      :status="tableAttr.status"
      :schema.sync="tableSchema"
      :selection.sync="tableAttr.selection"
      :total="tableAttr.total"
      :currentPage="tableAttr.currentPage"
      :pageSize="tableAttr.pageSize"
      :paginationDisabled.sync="tableAttr.paginationDisabled"
      :default-sort="tableAttr.defaultSortParam"
      @sort-change="onSortChange"
      @page-change="onPageChange"
      @size-change="onSizeChange"
    >
      <!--  订单编号 -->
      <template
        slot="orderNo"
        slot-scope="{row}"
        v-clipboard="row.orderNo"
        @success="copySuccess('orderNo')"
        @error="copyError('orderNo')"
      >
        <p>
          <a
            :href="'#/orderCenter/parcelDetails?parcelId=' + row.id"
            target="_blank"
          >{{row.orderNo}}</a>
          <span
            class="copy-phone"
            :title="commonLang('copyPhone')"
            v-if="row.orderNo"
            v-clipboard="row.orderNo"
            @success="copyContent('isCopyPhone')"
          >
            <icon name="fuzhi" :size="18"></icon>
          </span>
        </p>
        <p>
          <el-button>复制原ID</el-button>
        </p>
      </template>
      <!--  原订单号 -->
      <template
        slot="originalNo"
        slot-scope="{row}"
        v-clipboard="row.originalNo"
        @success="copySuccess('originalNo')"
      >
        <span>{{row.originalNo}}</span>
        <span
          class="copy-phone"
          :title="commonLang('copyPhone')"
          v-if="row.originalNo"
          v-clipboard="row.originalNo"
          @success="copyContent('isCopyPhone')"
        >
          <icon name="fuzhi" :size="18"></icon>
        </span>
      </template>
      <!--  UserID -->
      <template
        slot="userId"
        slot-scope="{row}"
        v-clipboard="row.userId"
        @success="copySuccess('userId')"
      >
        <span>{{row.userId}}</span>
        <span
          class="copy-phone"
          :title="commonLang('copyPhone')"
          v-if="row.userId"
          v-clipboard="row.userId"
          @success="copyContent('isCopyPhone')"
        >
          <icon name="fuzhi" :size="18"></icon>
        </span>
      </template>
    </my-table>

    <set-ship-mail
      :selection="tableAttr.selection"
      :visible.sync="isSetShipMail"></set-ship-mail>
    <merge-order
      @colse="isMergeOrder = false"
      :selection="tableAttr.selection"
      :visible="isMergeOrder"></merge-order>
    <summary-report
      @close="isSummaryReport = false"
      :selection="tableAttr.selection"
      :visible="isSummaryReport"
    ></summary-report>
    <cc-summary-report
      @close="isccSummaryReport = false"
      :selection="tableAttr.selection"
      :visible="isccSummaryReport"
    ></cc-summary-report>
    <print-cargo-order
      @close="isPrintCargoOrder = false"
      :selection="tableAttr.selection"
      :visible="isPrintCargoOrder"
    ></print-cargo-order>
    <print-cargo-detail
      @close="isPrintCargoDetail = false"
      :selection="tableAttr.selection"
      :visible="isPrintCargoDetail"
    ></print-cargo-detail>
    <batch-modify
      @close="isBatchModifySKUPOA = false"
      :selection="tableAttr.selection"
      :visible="isBatchModifySKUPOA"
    ></batch-modify>
    <fbaship
      @close="isFBAship = false"
      :selection="tableAttr.selection"
      :visible="isFBAship"
    ></fbaship>
    <!-- 0是销售待处理 1是客服待处理 -->
    <set-pending
      :pendingsettype="isSetSalePending ? 0 : 1"
      @close="isSetSalePending = false"
      :selection="tableAttr.selection"
      :visible="isSetSalePending || isSetCSPending"
    >
    </set-pending>

    <!--设置黑名单-->
    <set-black-list
      :selectedData="tableAttr.selection"
      :visible.sync="isSetBlackList"
      v-if="isSetBlackList"
      >
    </set-black-list>
    <!--更新状态-->
    <update-status :selectedData="tableAttr.selection"
      :visible.sync="isShowStatus"
      v-if="isShowStatus"
      @afterUpdate="afterUpdate"></update-status>
    <!-- 批量备注 -->
    <batch-remark-dialog :remarkData="tableAttr.selection"
      :visible.sync="isBatchRemarkDialog"
      v-if="isBatchRemarkDialog"
      @updateOrderRemark="updateOrderRemark"
    ></batch-remark-dialog>
    <!--发送邮件-->
    <send-email :selectedData="tableAttr.selection"
      :visible.sync="isSendEmail"
      v-if="isSendEmail"></send-email>
    <!--添加提醒-->
    <add-remind
      :selectedData="tableAttr.selection"
      :visible.sync="isAddRemind"
      v-if="isAddRemind">
    </add-remind>
    <!-- 批量转移/ 处理人分配 -->
    <batch-transfer-dialog :transferIds="transferIds"
      :visible.sync="isBatchTransferDialog"
      v-if="isBatchTransferDialog"
    ></batch-transfer-dialog>
    <!--批量联系买家-->
    <batch-contact-buyer :selectedData="tableAttr.selection"
      :visible.sync="isBatchContactBuyer"
      v-if="isBatchContactBuyer"
      :contactContent="contactContent"
    ></batch-contact-buyer>
  </display-layout>
</template>

<script>
import DisplayLayout from '@/components/Layout/displayLayout';
import Selector from '@/components/Selector';
import MyTable from '@/components/MyTable';
import Condition from '@/components/Condition';
import TableBtnGroup from '@/components/TableBtnGroup/2.0';
import SetShipMail from './component/setShipMail';
import MergeOrder from './component/mergeOrder';
import SummaryReport from './component/summaryReport';
import ccSummaryReport from './component/contactCustomer/summaryReport';
import PrintCargoOrder from './component/printCargoOrder';
import PrintCargoDetail from './component/printCargoDetail';
import BatchModify from './component/batchModify';
import fbaship from './component/FBAship';
import SetPending from './component/SetPending';

// 复用查询订单页组件
import SetBlackList from '@/views/OASearchOrder/component/setBlackList'
import updateStatus from '@/views/OASearchOrder/component/updateStatus'
import BatchRemarkDialog from '@/views/parcelManagement/components/batchRemarkDialog'
import sendEmail from '@/views/OASearchOrder/component/sendEmail'
import addRemind from '@/views/OASearchOrder/component/addRemind'
import BatchTransferDialog from '@/views/orderManagement/components/batchTransferDialog'
import batchContactBuyer from '@/views/OASearchOrder/component/batchContactBuyer'

import { getTableAttr } from './data/tableSchema';
import { radioOptions, getBindData } from './data/radioGroup';
import executor from './executor';
import otherExecutor from '../OASearchOrder/executor';
import {
  getSearchList
} from '@/api/oaSearchOrder'
// import {
//   getErrorTip,
//   getLogisticsAccount,
//   getOnlinePostMethod,
//   getOrderStatus,
//   getOrderTraceStatus,
//   getPlatformShop,
//   getShippingCenter,
//   getShippingMethod,
//   getSiteName
// } from '@/api/oaSearchOrder';
import {
  setOptionHandlers,
  setOptionsByNamePath
} from './data/options';

import { isEmptyResult } from '@/common/utils';

const initData = getBindData(radioOptions[0].key);
const {
  selectorSchema,
  conditionSchema,
  tableSchema,
  tableBtnSchema
} = initData;
const conditionData = {
  value: '',
  formRule: '',
  schema: conditionSchema
};

export default {
  name: 'oaOrderManage',
  inject: ['reload'],
  provide() {
    return {
      __langCate: 'parcelManagement'
    }
  },
  data() {
    return {
      lastSearchParam: {}, // 最新一次的查询
      layoutData: {
        title: 'oaOrderManage',
        brief: 'oaOrderManageBrief'
      },
      // 顶部的raido
      radioOptions,
      selectRadio: radioOptions[0].key,
      selectorData: {
        number: {
          select: 'shipworks_order',
          input: ''
        },
        productToken: {
          select: 'SKU',
          input: ''
        },
        otherOrderStatus: []
      },
      selectorBtnShow: true,
      selectorSchema,
      conditionData,
      tableBtnSchema,
      tableSchema,
      tableListData: [],
      tableAttr: getTableAttr(),
      isSetShipMail: false,
      isMergeOrder: false,
      isSummaryReport: false,
      isccSummaryReport: false,
      isPrintCargoOrder: false,
      isPrintCargoDetail: false,
      isBatchModifySKUPOA: false,
      isFBAship: false,
      isSetSalePending: false,
      isSetCSPending: false,

      // 复用查询订单的相关功能变量
      isSetBlackList: false,
      isShowStatus: false,
      isBatchRemarkDialog: false,
      isSendEmail: false,
      isAddRemind: false,
      isBatchTransferDialog: false,
      isBatchContactBuyer: false,

      contactContent:[]
    };
  },
  created() {
    // 请求数组
    this.conditionData;
    setOptionHandlers.forEach((obj) => {
      obj.executor().then((res) => {
        try {
          setOptionsByNamePath(obj.path, res, this.conditionData);
        } catch(e) {
          console.log(e, obj.path)
        }
      });
    });

    this.onSearch();
  },
  components: {
    ccSummaryReport,
    SetPending,
    fbaship,
    PrintCargoDetail,
    BatchModify,
    PrintCargoOrder,
    SetShipMail,
    DisplayLayout,
    TableBtnGroup,
    Selector,
    MyTable,
    Condition,
    SetBlackList,
    updateStatus,
    BatchRemarkDialog,
    sendEmail,
    addRemind,
    BatchTransferDialog,
    batchContactBuyer,
    MergeOrder,
    SummaryReport
  },
  methods: {
    lang: $lang('parcelManagement'),
    selectorLang: $lang('Selector'),
    tableLang: $lang('table'),
    /**
     * 列表 - 列表复制订单编号
     * @param {Number} value 复制的内容
     * @return
     */
    copySuccess(value) {
      console.log(value);
    },

    tableBtnClick({fnName, isEmpty, belong}) {
      if (!isEmpty && !this._selectDataTip()) {
        return false;
      }
      const fn = otherExecutor(fnName);
      if (fn) {
        console.log(1);
        fn.call(this);
      } else {
        console.log(2, fnName);
        executor(fnName).call(this, {belong});
      }
    },

    // 至少选择一条数据
    _selectDataTip() {
      if (!this.tableAttr.selection.length) {
        this.$message({
          message: this.commonLang('emptySelectionTip'),
          type: 'warning'
        })
        return false
      }
      return true
    },

    radioGroupChange(item) {
      this.resetHandler();
      const {
        selectorSchema,
        conditionSchema,
        tableSchema,
        tableBtnSchema
      } = getBindData(this.selectRadio);
      this.selectorData = {
        number: {
          select: 'shipworks_order',
          input: ''
        },
        productToken: {
          select: 'SKU',
          input: ''
        },
        otherOrderStatus: []
      };
      this.selectorSchema = selectorSchema;
      this.conditionData = {
        value: '',
        formRule: '',
        schema: conditionSchema
      };
      this.tableSchema = tableSchema;
      this.tableBtnSchema = tableBtnSchema;

      // 如果这些查询条件都为空，那就隐藏按钮组
      if (selectorSchema.length === 0 && conditionSchema.length === 0) {
        this.selectorBtnShow = false;
      } else {
        this.selectorBtnShow = true;
      }

      this.onSearch();
      // reset
    },

    // 重置
    resetHandler() {
      this.tableListData = [];
      this.tableAttr = getTableAttr();
    },

    // 搜索
    onSearch () {
      this.tableAttr.currentPage = 1
      this.getListData().then(res => {
        // 保存上一次搜索参数，以供翻页使用
        this.lastSearchParam = this.searchParam()
      }).catch(error => {
        this.tableAttr.loading = false
      })

      const conditionData = this.conditionData.value
      const hasNoHistory = ['time', 'detailedFiltration', 'isComplain', 'isTrackingNumber', 'isRefund', 'goodsId']
      Object.keys(conditionData).forEach(item => {
        if (!hasNoHistory.includes(item)) {
          // 树选择组件刷新
          this.conditionData.schema
          .find(subItem => subItem.name === item).formSchema
          .find(subItem => subItem.name === item)
            .searchCount++
        }
      })
    },

    // 获取列表数据
    getListData (searchParam) {
      this.tableAttr.loading = true
      return getSearchList(searchParam || this.searchParam()).then(result => {
        // console.log('getListData', result)
        this.tableAttr.loading = false
        const data = result.data
        if (data.rows && data.rows.length) {
          this.tableListData = data.rows
          this.tableAttr.paginationDisabled = false
        } else {
          this.tableListData = []
          this.tableAttr.status = 'noData'
          this.tableAttr.paginationDisabled = true
        }
        this.tableAttr.total = data.records
        this.tableAttr.currentPage = data.page
      })
    },

    onReset() {
      // 重置Condition组件为初始状态
      this.$refs.condition._clear();
    },

    _onTableSort({ column, prop, order }) {},

    // 列表当前页改动
    onPageChange (value) {
      this.tableAttr.currentPage = value
      const params = Object.assign({}, this.lastSearchParam, {pageIndex: value})
      this.getListData(params)
    },

    // 列表当前页展示条数改动
    onSizeChange (value) {
      this.tableAttr.pageSize = value
      const params = Object.assign({}, this.lastSearchParam, {pageSize: value})
      this.getListData(params)
    },

    /**
     * 列表 - 列表数据手动按照字段排序
     * @param { Object } sortObj 后台返回的该订单的相关信息
     * @return
     */
    onSortChange (sortObj) {
      // 映射后台字段
      const propMap = {
        // packageNo: 'p.package_no',
        // orderList: 'p.order_no',
        packageStatus_lang: 'cp.package_status',
        // totalAmount: 'p.total_amount',
        // largeAreaId_lang: 'large_area_id',
        // areaId_lang: 'area_id',
        // processCenterId_lang: 'p.process_center_id',
        // postType_lang: 'p.post_type',
        // traceId: 'trace_id',
        createTime: 'cp.create_time'
      }
      const orderMap = {
        ascending: 'asc',
        descending: 'desc'
      }
      this.tableAttr.sortParam = sortObj.prop ? `${propMap[sortObj.prop]} ${orderMap[sortObj.order]}` : 'cp.create_time desc'

      // 暂时解决初始化触发sortchange导致调用两次 getListData
      if (this.noInit) {
        this.getListData();
      }
      // 初始化不调用
      this.noInit = true
    },

    // 处理搜索参数
    searchParam () {
      let columns = [],
        values = [],
        operates = [];

      const submitArray = [
        {
          column: 'cp.package_No',
          value: {
            key: 'shipworks_order',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.phone',
          value: {
            key: 'phone',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'coa.customer_tax_no',
          value: {
            key: 'userTraceId',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'op.paypal_transaction_id',
          value: {
            key: 'paypal_transaction_id',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.trace_id',
          value: {
            key: 'systemTraceId',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'op.flytuser_id',
          value: {
            key: 'UserID',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'cp.email',
          value: {
            key: 'email',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'pd.item_code',
          value: {
            key: 'goodsNo',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'cpor.order_no',
          value: {
            key: 'originalOrderID',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'cp.receive_name',
          value: {
            key: 'receiver',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'pd.sku',
          value: {
            key: 'sku',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'pd.item_code',
          value: {
            key: 'pmx',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'pd.poa',
          value: {
            key: 'poa',
            value: null
          },
          operate: 'multiple_eq'
        },
        // 已修改地址 WE时效不达标暂时没有
        {
          column: 'coa.is_event_gift',
          value: {
            key: 'eventGift',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'coa.is_delivered_date_expire',
          value: {
            key: 'dueDate',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'jump_abroad_warehouse_status',
          value: {
            key: 'UnmarketableJumpOrders',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'cp.is_repost_order',
          value: {
            key: 'duplicateInvoice',
            value: null
          },
          operate: 'Eq'
        },

        {
          column: 'cp.order_type',
          value: {
            key: 'orderType',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.package_status',
          value: {
            key: 'orderStatus',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.create_time',
          value: {
            key: 'exportDate',
            value: null
          },
          operate: 'scope'
        },
        {
          column: 'cp.jjdate',
          value: {
            key: 'consignDate',
            value: null
          },
          operate: 'scope'
        },
        {
          column: 'cp.send_date',
          value: {
            key: 'shippingDate',
            value: null
          },
          operate: 'scope'
        },
        {
          column: 'cp.sign_date',
          value: {
            key: 'signDate',
            value: null
          },
          operate: 'scope'
        },
        {
          column: 'pd.count',
          value: {
            key: 'detailedFiltration',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'cp.country_id',
          value: {
            key: 'country',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.platform_post_type',
          value: {
            key: 'onlinePostMethod',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.shop_id',
          value: {
            key: 'shopName',
            value: []
          },
          operate: 'multiple_eq'
        },
        {
          column: 'platform_id',
          value: {
            key: 'shopName',
            value: []
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.process_center_id',
          value: {
            key: 'shippingCenter',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.post_type',
          value: {
            key: 'shippingMethod',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cs.user_id',
          value: {
            key: 'logisticsAccount',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'coa.web_site',
          value: {
            key: 'siteName',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.error_code',
          value: {
            key: 'errorTip',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'SellerCube.dbo.TransactionComplain',
          value: {
            key: 'isComplain',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'cp.have_trace_id',
          value: {
            key: 'isTrackingNumber',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'cp.have_refund_repost',
          value: {
            key: 'isRefund',
            value: null
          },
          operate: 'Eq'
        },
        {
          column: 'cp.channel_track_status',
          value: {
            key: 'orderTraceStatus',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'pd.item_id',
          value: {
            key: 'goodsId',
            value: null
          },
          operate: 'multiple_eq'
        },
        {
          column: 'cp.total_amount',
          value: {
            key: 'lessThanOrEqual',
            value: null
          },
          operate: 'LessEq'
        },
        {
          column: 'cp.total_amount',
          value: {
            key: 'moreThanOrEqual',
            value: null
          },
          operate: 'GreatEq'
        }
      ];
      const conditionData = this.conditionData.value;
      console.log(this.selectorData);
      if (Object.keys(this.selectorData).length > 0) {
        submitArray.forEach(item => {
          Object.keys(this.selectorData).forEach(selectItem => {
            if (Array.isArray(this.selectorData[selectItem])) {
              this.selectorData[selectItem].forEach(otherItem => {
                if (otherItem.key === item.value.key) {
                  item.value.value = otherItem.value
                }
              })
            } else {
              if (this.selectorData[selectItem].select === item.value.key) {
                const tempinput = this.selectorData[selectItem].input.split(/，+|,+| +/g).filter(str => str !== '').join(',')
                item.value.value = tempinput
              }
            }
          })

          Object.keys(conditionData).forEach(conditionItem => {
            if (conditionItem === 'time') {
              Object.keys(conditionData['time']).forEach(timeItem => {
                if (timeItem === item.value.key) {
                  if (conditionData['time'][timeItem].length) {
                    const timeInterval = conditionData['time'][timeItem]
                    const createStart = initTime(timeInterval[0], 'start')
                    const createEnd = initTime(timeInterval[1], 'end')
                    item.value.value = parseTime(createStart, null, true) + ' - ' + parseTime(createEnd, null, true)
                  }
                }
              })
            } else if (conditionItem === 'shopName') {
              const shopValue = conditionData['shopName']['shopName'].filter(item => !String(item).includes('usually++'))

              const PREFIX = 'platform'
              shopValue.forEach(shopItem => {
                if (item.column === 'platform_id') {
                  if ((shopItem + '').includes(PREFIX)) {
                    const platformId = shopItem.replace(PREFIX, '')
                    item.value.value.push(platformId)
                  }
                } else if (item.column === 'cp.shop_id' && !(shopItem + '').includes(PREFIX)) {
                  item.value.value.push(shopItem)
                }
              })
              if (item.value.key === 'shopName') {
                item.value.value = item.value.value.join(',')
              }
            } else {
              if (conditionItem === item.value.key) {
                if (Array.isArray(conditionData[conditionItem][conditionItem])) {
                  const mulValue = conditionData[conditionItem][conditionItem].filter(item => !String(item).includes('usually++'))
                  item.value.value = mulValue.join(',')
                } else {
                  item.value.value = conditionData[conditionItem][conditionItem]
                }
              }
            }
          })
        });
      }

      submitArray.forEach(item => {
        if (Array.isArray(item.value.value)) {
          if (item.value.value.length) {
            columns.push(item.column)
            values.push(item.value.value)
            operates.push(item.operate)
          }
        } else {
          if (item.value.value) {
            columns.push(item.column)
            values.push(item.value.value)
            operates.push(item.operate)
          }
        }
      })

      // 增加状态值的查询
      columns.push('cp.package_status');
      values.push(this.radioOptions.find(item => item.key === this.selectRadio).value);
      operates.push('Eq');

      const search = '|' + columns.join('`') + '|' + values.join('`') + '|' + operates.join('`')

      const searchObj = {
        pageIndex: this.tableAttr.currentPage,
        pageSize: this.tableAttr.pageSize,
        pageId: this.pageId,
        orderBy: this.sortParam || 'cp.create_time desc',
        search: search
      }

      console.log('searchObj:', searchObj);
      return searchObj;

    },

    /**
     * 设置表单项选项
     * @param {string} namePath 类别名.表单项名
     * @param {array} options 选项
     */
    setOptionsByNamePath (namePath, options) {
      let schema = this.conditionData.schema
      if (isEmptyResult(schema)) {
        return
      }
      let [categoryName, formItemName] = namePath.split('.')
      let category = schema.find(item => item.name === categoryName) || {}
      let formItem = category.formSchema.find(item => item.name === formItemName)
      formItem.options = options
    },

    // 更新状态后的回调
    afterUpdate(status) {
      if (status === true) {
        this.onSearch();
      }

      if (status === '11') {
        this.$nextTick(() => {
          this.isAddRemind = true;
        })
      }
    },
  }
};
</script>


<style lang="scss" scoped>
.radio-group-box {
  padding-top: 20px;
  margin-bottom: 20px;
}
.oaOrderManage {
  .package-template {
    display: flex;
    justify-content: center;
    align-items: center;
    .customer-name {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .copy-packageNo {
      cursor: pointer;
      margin-left: 3px;
      height: 20px;
    }
  }

  // 批量打开拦截提示
  .operate {
    position: relative;
  }

  .table-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  .icon__errorMore {
    right: 5px;
  }

  .icon__parcelStatus {
    right: 6px;
    fill: #229ee6;
  }

  .intercept-arrow,
  .intercept-arrow-en {
    position: absolute;
    z-index: 9999999;
    top: -137px;
  }

  .intercept-arrow {
    left: 150px;
  }

  .intercept-arrow-en {
    left: 137px;
  }

  .table-operate {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    min-height: 40px;
    background-color: #ecf5ff;
    border: solid 1px #b3d8ff;
    opacity: 0.9;
    margin-bottom: 10px;
    padding-left: 16px;
    padding-right: 16px;

    .statistic__checked {
      margin-left: 10px;
      color: #888888;
      font-size: 14px;
    }

    .btn__clearChecked {
      margin-left: 14px;
    }

    .btn__batchOperate {
      margin-left: 54px;

      .btn {
        margin-right: 20px;
        margin-left: 0;
      }

      .tipDot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #1890ff;
      }
    }
  }

  .toggle-selector {
    margin-left: 50px;
  }
}
.move-tooltip {
  .ant-tooltip-content {
    .ant-tooltip-arrow {
      border-bottom-color: #eee;
    }
    .ant-tooltip-inner {
      background: #fff;
      .move-to-content {
        .el-radio-group {
          padding: 5px 14px;
          display: flex;
          flex-direction: column;
          .el-radio {
            margin-left: 0;
            margin-bottom: 5px;
          }
        }
      }
      .hasProblemTag {
        transition: all 0.5s;
        width: auto;
        display: flex;
        .el-radio-group {
          padding-right: 0;
        }
      }
      .btn-operate {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
