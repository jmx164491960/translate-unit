<template>
  <el-dialog :title="title"
    v-dialog-drag
    :visible="visible"
    @close="closeHandler">
    <div class="g-overflow-auto g-table-body" v-loading="isLoading">
      <div class="input-group">
        <label>{{'待处理事务备注'}}：</label>
        <el-input type="text" v-model="remark"></el-input>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="commitHandler">{{'提交'}}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  setPendingAction
} from '@/api/oaOrderManage';
export default {
  name: 'SetPending',
  props: ['visible', 'selection', 'pendingsettype'],
  data(){
    return {
      remark: '',
      tableData: [],
      isLoading: false
    }
  },
  computed: {
    title() {
      return this.pendingsettype == 0 ? '设置销售待处理' : '设置客服待处理';
    }
  },
  methods: {
    getData() {
    },
    closeHandler() {
      this.$emit('close');
    },
    commitHandler() {
      if (!this.remark || this.remark == '') {
        this.$message({
          type: 'warn',
          message: '不可为空！'
        });
        return;
      }
      const data = this.selection.map((item) => {
        return {
          pendingSetType: this.pendingsettype,
          packageId: item.id,
          pendingRemark: this.remark
        }
      });
      setPendingAction(data).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
      })
    }
  },
  watch: {
    visible(val) {
      this.remark = '';
      this.getData();
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  align-items: center;
  label {
    display: inline-block;
    width: 50%;
  }
}
.btn-box {
  margin-top: 48px;
}
</style>
