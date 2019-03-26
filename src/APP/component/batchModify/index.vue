<template>
  <el-dialog :title="'批量修改' + 'SKU/POA'" :visible="visible" @close="closeHandler">

    <el-form :model="formData" :rules="rules" ref="formData" :label-width="mdLabelWidth" class="form-data">
      <el-form-item required :label="'SKU/POA'" prop="oldsku">
        <el-input v-model="formData.oldsku"></el-input>
      </el-form-item>
      <el-form-item required :label="'替换为'+'SKU/POA'" prop="newsku">
        <el-input v-model="formData.newsku"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sureHandler">{{'确认'}}</el-button>
        <el-button @click="closeHandler">{{'关闭'}}</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script>
import { batchEditProductAction } from '@/api/oaOrderManage';
  export default {
    name: 'MergeOrder',
    props: ['visible', 'selection'],
    data(){
      return {
        rules: {
          oldsku: {
            required: true,
            message: '请输入' + 'SKU/POA'
          },
          newsku: {
            required: true,
            message: '替换为' + 'SKU/POA'
          }
        },
        formData: {
          oldsku: '',
          newsku: ''
        }
      }
    },
    methods: {
      closeHandler() {
        this.$emit('close');
      },
      sureHandler() {
        this.$refs['formData'].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            batchEditProductAction({
              oldsku: this.formData.oldsku,
              newsku: this.formData.newsku,
              packageNo: this.selection.map(item => item.packageNo).join(',')
            }).then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
            });
          }
        });
      }
    },
  }
</script>
