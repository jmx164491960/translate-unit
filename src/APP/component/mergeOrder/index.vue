<template>
  <el-dialog :title="'合并订单'" :visible="visible" @close="closeHandler">
    <div>
      <div class="input-group">
        <label>{{'请选择主订单编号'}}：</label>
        <span class="input-box">
          <el-select v-model="mainOrder" @change="changeHandler" :placeholder="'请选择'">
            <el-option
              v-for="item in OrderOptions"
              :key="item.packageNo"
              :label="item.packageNo"
              :value="item.packageNo">
            </el-option>
          </el-select>
        </span>
      </div>
    </div>
    <div class="btn-box">
      <el-button type="primary" @click="sureHandler">{{'确认'}}</el-button>
      <el-button @click="closeHandler">{{'关闭'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  mergeOrderAction
} from '@/api/oaOrderManage';
  export default {
    name: 'MergeOrder',
    props: ['visible', 'selection'],
    data(){
      return {
        mainOrder: ''
      }
    },
    computed: {
      OrderOptions() {
        return this.selection.map(item => {
          return {
            packageNo: item.packageNo
          };
        });
      }
    },
    methods: {
      closeHandler() {
        this.$emit('close');
      },
      changeHandler() {
        // this.$emit('sure');
      },
      sureHandler() {
        mergeOrderAction({
          packageNos: this.selection.map(item => item.packageNo) 
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  align-items: center;
  label {
    flex: 1;
    width: 200px; 
  }
  .input-box {
    flex: 2;
  }
  margin-bottom: 20px;
}
</style>
