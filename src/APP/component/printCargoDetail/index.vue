<template>
  <el-dialog :title="'配货单'"
    v-dialog-drag
    :visible="visible" @close="closeHandler">

    <div class="g-overflow-auto" v-loading="isLoading">

      <div v-if="!isLoading && !printData.orderInfoForPrintDetailList.length > 0">
        {{'数据为空'}}
      </div>
      <template v-else>
        <div class="btn-box">
          <el-button
            type="primary"
            v-print="'#print-cargo-detail'">{{'打印'}}</el-button>
        </div>

        <div id="print-cargo-detail">
            <template v-for="(item, index) in printData.orderInfoForPrintDetailList">
              <div class="table-header">
                <span>{{ item.goodsFormNo }}</span>
                <div v-for="t in tableHeaderSchema">
                  <label>{{ t.name }}：</label>
                  <span>{{ item[t.prop] }}</span>
                </div>
              </div>

              <native-table
                :schema="tableSchema"
                :data="item.printItemDetailList"
              ></native-table>
            </template>
        </div>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { printBoxDetail } from '@/api/oaOrderManage';
import NativeTable from '@/components/NativeTable';

export default {
  name: 'printCargoDetail',
  props: ['visible', 'selection'],
  data(){
    return {
      printData: {
        orderInfoForPrintDetailList: []
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
      printBoxDetail({packageNo: data.join(',')}).then((res) => {
        this.isLoading = false;
        this.printData = res.data;
      });
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getData();
      } else {
        this.printData = {
          orderInfoForPrintDetailList: []
        };
      }
    }
  },
  components: {
    NativeTable
  },
  computed: {
    tableSchema() {
      return [{
        name: 'SKU',
        prop: 'sKU'
      }, {
        name: 'Quantity',
        prop: 'quantity'
      }, {
        name: 'Title',
        prop: 'title'
      }, {
        name: 'ItemName',
        prop: 'ItemName'
      }, {
        name: 'packing',
        prop: 'packing'
      }, {
        name: 'Color',
        prop: 'color'
      }, {
        name: 'Shelf',
        prop: 'shelf'
      }, {
        name: 'Second Shelf',
        prop: 'secondShelf'
      }, {
        name: 'CustomerLabel',
        prop: 'customerLabel'
      }, {
        name: 'Stock',
        prop: 'stock'
      }, {
        name: 'Area',
        prop: 'area'
      }];
    },
    tableHeaderSchema() {
      return [
        {
          name: '订单编号',
          prop: 'packageNo'
        },
        {
          name: '国家',
          prop: 'country'
        },
        {
          name: '日期',
          prop: 'date'
        },
        {
          name: 'Ebaysrn',
          prop: 'Ebaysrn'
        },
        {
          name: '用户编号',
          prop: 'ebayUserId'
        },
        {
          name: '邮寄方式',
          prop: 'postType'
        },
        {
          name: '地址',
          prop: 'address'
        },
        {
          name: '备注',
          prop: 'remark'
        }
      ];
    }
  }
}
</script>

<style lang="scss" scoped>
#print-cargo-detail {
  height: 600px;
}
.table-header {
  border: 1px solid #000;
  margin-top: 60px;
  padding: 10px;
  .input-group {
    display: inline-flex;
    align-items: center;
    label {
      margin-right: 10px;
    }
    .input-box {
    }
    margin: 5px 0;
    margin-right: 20px;
  }
  &:first-child {
    margin-top: 0;
  }
}
.print-single {
  page-break-after: always;
}
.btn-box {
  margin-bottom: 20px;
}

</style>
