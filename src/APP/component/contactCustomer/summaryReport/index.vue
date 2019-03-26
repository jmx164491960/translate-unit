<template>
  <el-dialog :title="'配货总汇'"
    v-dialog-drag
    :visible="visible" @close="closeHandler">
    <div class="g-overflow-auto g-table-body" v-loading="isLoading">
      <div class="btn-box">
        <span class="tip">{{'按SKU和Title统计'}}</span>
        <el-button type="primary" @click="exportHandler">{{'导出Excel'}}</el-button>
      </div>

      <div class="table-header">
        <div>
          <label>{{ '打印日期' }}：</label>
          <span>{{ printDate }}</span>
        </div>
        <div>
          <label>{{ '打印人' }}：</label>
          <span>{{ printer }}</span>
        </div>
      </div>
      <el-table
        :data="resData"
        style="width: 100%">

        <el-table-column
          v-for="item in tableSchema"
          :key="item.name"
          :label="item.name"
          :prop="item.prop"
        ></el-table-column>

      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { summaryReportDownload, getSummaryReportAction } from '@/api/oaOrderManage';

export default {
  name: 'summaryReport',
  props: ['visible', 'selection'],
  data(){
    return {
      resData: [],
      isLoading: true,
      printDate: '',
    }
  },
  methods: {
    closeHandler() {
      this.$emit('close');
    },
    getData() {
      this.printDate = new Date();
      const data = this.selection.map(item => item.id);
      getSummaryReportAction(data).then((res) => {
        this.isLoading = false;
        this.resData = res.data;
      });
    },
    exportHandler() {
      const data = this.selection.map(item => item.id);
      summaryReportDownload(data);
    }
  },
  computed: {
    ...mapGetters(['name', 'language', 'enName', 'userstate']),
    // 全名
    printer() {
      // 中文环境下显示用户名，英文环境下显示用户英文名，没有英文名则显示用户名
      switch (this.language) {
        case 'zh': {
          return this.name
        }
        default: {
          return (this.userstate.enName || this.name)
        }
      }
    },
    tableSchema() {
      return [{
        name: 'SKU',
        prop: 'itemcode'
      }, {
        name: 'CustomerLabel',
        prop: 'CustomerLabel'
      }, {
        name: 'Name',
        prop: 'itemname_Zn'
      }, {
        name: 'Quantity',
        prop: 'ItemNum'
      }, {
        name: 'Title',
        prop: 'itemname'
      }, {
        name: '采购员',
        prop: 'username'
      }];
    }
  },
  watch: {
    visible(val) {
      this.getData();
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
