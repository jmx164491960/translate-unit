<template>
  <el-dialog :title="'设置发货中心和更改邮寄方式'" :visible="visible" :before-close="closeHandler" v-dialog-drag @close="closeHandler">
    <div>
      <el-form :model="checkList"
        :rules="rules"
        ref="checkList"
        label-width="120px">
        <!--订单编号-->
        <el-form-item :label="'订单编号'" prop="packageNo">
          <span class="input-box">
            <div class="order" v-for="order in selectedOrders">{{ order }}</div>
          </span>
        </el-form-item>
        <!--处理中心-->
        <el-form-item :label="'处理中心'" prop="dealCenter">
          <el-select v-model="checkList.dealCenter" :placeholder="'请选择处理中心'" clearable filterable @change="selectDealCenter">
            <el-option v-for="item in dealCenterOptions" :key="item.id" :label="item.id_lang" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!--邮寄方式-->
        <el-form-item :label="'邮寄方式'" prop="mailWay">
          <el-select v-model="checkList.mailWay" @change="selectMailWay"
            :placeholder="'请选择邮寄方式'" clearable filterable>
            <el-option v-for="item in mailWayOptions" :key="item.id" :label="item.id_lang" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!--运输级别-->
        <el-form-item :label="'运输级别'" prop="transport">
          <el-select v-model="checkList.transport"
            :placeholder="'请选择运输级别'" clearable filterable>
            <el-option v-for="item in transportOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      <div class="tips">{{'备注'}}:{{'如果只修改其中一个，可能会有邮寄方式和处理中心不匹配的情况，而修改失效！'}}</div>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- 确定 -->
      <el-button type="primary" @click="sureHandler">{{commonLang('sure')}}</el-button>
      <!-- 取消 -->
      <el-button @click="closeHandler">{{commonLang('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {setPostType} from '../../../../api/oaOrderManage'
  import {getShippingCenter, getShippingMethod} from '../../../../api/oaSearchOrder';
  import { getChannelAction, GetPostTypeListByPIDAction } from '../../../../api/oaOrderManage';

  export default {
    name: 'setShipMail',
    props: ['visible', 'selection'],
    data(){
      const validateDealCenter = (rule, value, callback) => {
        if (value === '') {
          if (this.checkList.mailWay === '') {
            callback(new Error('处理中心与邮寄方式至少一个不为空' + '!'));
          } else {
            this.$refs.checkList.validateField('mailWay');
            callback();
          }
        }
      };
      const validateMailWay = (rule, value, callback) => {
        if (value === '') {
          if (this.checkList.dealCenter === '') {
            callback(new Error('处理中心与邮寄方式至少一个不为空' + '!'));
          } else {
            this.$refs.checkList.validateField('dealCenter');
            callback();
          }
        }
      };
      const validateTransport = (rule, value, callback) => {
        if (value === '') {
          if (this.checkList.mailWay) {
            callback(new Error('选邮寄方式需选运输类型' + '!'));
          } else {
            callback();
          }
        }
      };
      return {
        checkList: {
          dealCenter: '',
          mailWay: '',
          transport: '',
        },
        rules: { //为空提示
          // packageNo: [
          //   required: true
          // ],
          dealCenter: [
            {
              // validator: validateDealCenter,
              required: true,
              trigger: 'change'
            }
          ],
          mailWay: [
            {
              required: true,
              // validator: validateMailWay,
              trigger: 'change'
            }
          ],
          transport: [
            {
              required: true,
              // validator: validateTransport,
              trigger: 'change'
            }
          ],
        },
        dealCenterOptions: [],
        mailWayOptions: [],
        transportOptions: []
      }
    },
    computed: {
      selectedOrders() {
        return this.selection.map(item => item.packageNo);
      }
    },
    created() {
      this.getDealCenter();
      this.getMailWayOptions();
    },
    methods: {
      closeHandler() {
        this.$emit('update:visible', false);
        Object.keys(this.checkList).forEach(item => {
          this.checkList[item] = '';
        });
        this.$refs['checkList'].resetFields();
      },
      selectDealCenter(value) {
        if (value) {
          GetPostTypeListByPIDAction({
            processCenterId: value
          }).then((res) => {
            res.data.forEach((item) => {
              item.id_lang = item.type;
            });
            this.mailWayOptions = res.data;
            // 更新之后和原来的对不上
            if (!res.data.some(item => this.checkList.mailWay === item.id)) {
              this.checkList.mailWay = '';
            }

            this.selectMailWay(this.checkList.mailWay);
          })
        }
      },

      selectMailWay(value) {
        if (value) {
          getChannelAction({
            postTypeId: value,
            processCenterId: this.checkList.dealCenter
          }).then((res) => {
            this.transportOptions = res.data;
            // 更新之后和原来的对不上
            if (!res.data.some(item => this.checkList.transport === item.id)) {
              this.checkList.transport = '';
            }
          })
        }
      },
      sureHandler() {
        // this.$emit('sure');
        // debugger
        this.$refs['checkList'].validate((valid) => {
          if (!valid) {
            return false
          } else {
            const params = {
              channelId: this.checkList.transport,
              oldPostType: null,
              orderIDs: this.selectedOrders,
              postTypeID: this.checkList.mailWay,
              processCenterId: this.checkList.dealCenter,
              state: null,
            };

            setPostType(params).then(res => {
              if (res.data) {
                this.visible = false;
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
              }
            })
          }
        });
      },
      getDealCenter() {
        const params = {
          tableName: 'cs_channel_area',
          columnName: 'process_center_id'
        };
        getShippingCenter(params).then(res => {
          if (res.data) {
            this.dealCenterOptions = res.data;
          }
        })
      },
      getMailWayOptions() {
        const params = {
          tableName: 'cs_post_type',
          columnName: 'id'
        }
        getShippingMethod(params).then(res => {
          if (res.data) {
            this.mailWayOptions = res.data;
          }
        })
      },
      getTransportOptions() {

      }
    },
  }
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  .el-dialog__body {
    padding: 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .el-form-item__label:before {
      right: 0;
    }
    .el-form {
      padding: 30px 50px 30px 20px;
      .tips{
        color: #F56C6C;
        margin-left: 52px;
      }
    }
  }
  .el-button {
    padding: 10px 25px;
  }
}
</style>
