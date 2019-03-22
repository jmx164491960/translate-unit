<template>
  <el-dialog :title="'转FBA发货'"
    v-dialog-drag
    :visible="visible"
    
    @close="closeHandler">
    <div class="g-overflow-auto g-table-body" v-loading="isLoading">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          :label="'SKU/POA属性'"
          width="180">
          <template slot-scope="scope">
            <div>{{ scope.row.POA }}</div>
            <div v-if="scope.row.POA">{{ scope.row.SKU }}</div>
            <div v-if="scope.row.POA">属性：{{ scope.row.colorSel }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="'FBA标签'"
          width="180">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.label"></el-input>
          </template>
        </el-table-column>
      </el-table>

      <div class="btn-box">
        <el-button @click="commitHandler">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  getPackageDetail,
} from '@/api/parcelManagement';
import {
  setFBAorderAction
} from '@/api/oaOrderManage';
export default {
  name: 'FBAship',
  props: ['visible', 'selection'],
  data(){
    return {
      tableData: [],
      isLoading: true
    }
  },
  methods: {
    getData() {
      const id = this.selection[0].id;
      const data = {
        
        pageIndex: 1,
        pageSize: 10,
        orderBy: 'order_no desc',
        search: `|package_parent_id|${id}|eq`
      };
      getPackageDetail(data).then((res) => {
        const tableData = res.data.rows.map((item) => {
          return {
            POA: item.itemCode,
            SKU: item.sku,
            colorSel: item.colorSel,
            label: '',
            id: item.id
          };
        });
        this.tableData = tableData;
        this.isLoading = false;
      });
    },
    closeHandler() {
      this.$emit('close');
    },
    commitHandler() {
      if (this.tableData.some(item => !item.label || item.label == '')) {
        this.$message({
          type: 'warn',
          message: lang('key')
        });
        return;
      }
      const data = {
        id: this.selection[0].id,
        fbaLabelInfo: this.tableData.map((item) => {
          return {
            FBALabel: item.label,
            OrderdetailId: item.id
          };
        })
      }
      setFBAorderAction(data).then(() => {
        this.$message({
          type: 'success',
          message: lang('key')
        });
      }).catch((err) => {
        
        
        
        
      });
    }
  },
  watch: {
    visible(val) {
      this.getData();
    }
  }
}
</script

<style lang="scss" scoped>
</style>