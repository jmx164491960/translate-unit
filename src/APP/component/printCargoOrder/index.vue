<template>
  <el-dialog :title="'汇总报表'"
    v-dialog-drag
    :visible="visible" @close="closeHandler">

    <div v-loading="isLoading" class="g-overflow-auto">
      <div class="btn-box">
        <el-button type="primary" v-print="'#print-cargo-order'">{{'打印'}}</el-button>
      </div>
      <div id="print-cargo-order">

        <div class="g-table-header g-table-border">
          <div class="item" v-for="t in tableHeaderSchema">
            <label>{{ t.name }}：</label>
            <span>{{ tableData[t.prop] }}</span>
          </div>
        </div>

        <!-- 表格1 -->
        <div class="print-single">
          <native-table
            :data="tableData.freightArray"
            :schema="tableSchema1"
          ></native-table>
          <div class="table1-title g-table-border">
            {{'汇总报表'}}
          </div>
        </div>

        <!-- 表格2 -->
        <div class="print-single">
          <div class="table-header2">
            <span class="left">{{'页批号'}}：_1</span>
            <span class="right">
              <img id="barcode" ref="barcode" />
            </span>
          </div>
          <native-table
            :data="tableData.itemDetails"
            :schema="tableSchema2"
          ></native-table>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { printBox } from '@/api/oaOrderManage';
import NativeTable from '@/components/NativeTable'

import jsbarcode from 'jsbarcode';
export default {
  name: 'printCargoOrder',
  props: ['visible', 'selection'],
  data(){
    return {
      tableData2: [],
      tableData1: [],
      tableData: {
        freightArray: [],
        itemDetails: [],
        seriesNo: '',
        printDate: '',
        printer: '',
        orderNum: 'x'
      },
      isLoading: true
    }
  },
  methods: {
    closeHandler() {
      this.$emit('close');
    },
    getData() {
      const data = this.selection.map(item => item.packageNo);
      printBox({packageNo: data.join(',')}).then((res) => {
        this.isLoading = false;
        this.tableData = res.data;
        jsbarcode(this.$refs.barcode, `code128.aspx?code=_1&width=235&height=40`, {
          format: 'CODE128'
        });
      });
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getData();
      }
    }
  },
  computed: {
    tableSchema1() {
      return [{
        name: '类别',
        prop: 'type'
      }, {
        name: '邮件数量',
        prop: 'billcount'
      }, {
        name: '邮件重量',
        prop: 'weight2'
      }, {
        name: '物品数量',
        prop: 'num'
      }, {
        name: '金额',
        prop: 'freight'
      }];
    },
    tableSchema2() {
      return [
        {
          name: 'SKU',
          prop: 'productcode'
        },
        {
          name: '颜色',
          prop: 'colorsel'
        },
        {
          name: 'POA',
          prop: 'poacode'
        },
        {
          name: '数量',
          prop: 'itemNum'
        },
        {
          name: '货架号',
          prop: 'rack'
        },
        {
          name: '备用货架号',
          prop: 'secondaryrack'
        },
        {
          name: '库存数',
          prop: 'quantity'
        },
        {
          name: '英仓库存',
          prop: 'quantityB'
        },
        {
          name: '美仓库存',
          prop: 'quantityA'
        }
      ];
    },
    tableHeaderSchema() {
      return [
        {
          name: '打印日期',
          prop: 'printDate'
        },
        {
          name: '打印人',
          prop: 'printer'
        },
        {
          name: '订单数',
          prop: 'orderNum'
        },
        {
          name: '序列号',
          prop: 'seriesNo'
        }
      ];
    }
  },
  components: {
    NativeTable
  }
}
</script>

<style lang="scss" scoped>
.print-single {
  page-break-after: always;
}
.table1-title {
  text-align: center;
  width: 100%;
  padding: 5px;
}

.table-header2 {
  display: flex;
  margin-top: 20px;
  align-items: center;
  .left {
    width: 50%;
  }
  .right {
    width: 50%;
  }
}
.btn-box {
  margin-bottom: 20px;
}
</style>
