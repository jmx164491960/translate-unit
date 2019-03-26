<template>
  <el-dialog :title="'配货总汇'"
    v-dialog-drag
    :visible="visible" @close="closeHandler">
    <div class="g-overflow-auto g-table-body" v-loading="isLoading">
      <div v-if="!isLoading && !resData.printTotalOrderDetailList.length > 0">
        {{'数据为空'}}
      </div>
      <template v-else>
        <div class="btn-box">
          <span class="tip">{{'按SKU和Title统计'}}</span>
          <el-button type="primary" @click="exportHandler">{{'导出Excel'}}</el-button>
        </div>

        <div class="table-header">
          <div v-for="t in tableHeaderSchema">
            <label>{{ t.name }}：</label>
            <span>{{ resData[t.key] }}</span>
          </div>
        </div>
        <el-table
          :data="resData.printTotalOrderDetailList"
          style="width: 100%">

          <el-table-column
            v-for="item in tableSchema"
            :key="item.name"
            :label="item.name"
            :prop="item.prop"
          ></el-table-column>

        </el-table>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { printTotal, exportPrintTotal } from '@/api/oaOrderManage';

export default {
  name: 'summaryReport',
  props: ['visible', 'selection'],
  data(){
    return {
      resData: {
        printTotalOrderDetailList: []
      },
      isLoading: true
    }
  },
  computed: {
    tableSchema() {
      return [{
        name: 'SKU',
        prop: 'sku'
      }, {
        name: 'CustomerLabel',
        prop: 'customerLabel'
      }, {
        name: 'Name',
        prop: 'name'
      }, {
        name: 'Quantity',
        prop: 'quantity'
      }, {
        name: 'Title',
        prop: 'title'
      }, {
        name: '采购员',
        prop: 'buyer'
      }];
    },
    tableHeaderSchema() {
      return [
        {
          name: '打印日期',
          key: 'printDate'
        },
        {
          name: '打印人',
          key: 'printer'
        }
      ];
    }
  },
  methods: {
    closeHandler() {
      this.$emit('close');
    },
    getData() {
      const data = this.selection.map(item => item.packageNo);
      printTotal({packageNo: data.join(',')}).then((res) => {
        this.isLoading = false;
        this.resData = res.data;
      });
    },
    exportHandler() {
      const data = this.resData.printTotalOrderDetailList;
      exportPrintTotal(data).then((res) => {
        
      });
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getData();
      } else {
        this.resData = {
          printTotalOrderDetailList: []
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .tip {
    margin-right: 20px;
  }
  margin-bottom: 20px;
}
.table-header {
  border: 1px solid #000;
  margin-top: 20px;
  padding: 10px;
}
</style>
