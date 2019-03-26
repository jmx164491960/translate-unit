/** need to translate */
import {
  moveToPendShipAction,
  confirmFarOrderAction,
  confirmToSendOrderAction,
  mergeOrderAction,
  SetPostTypeNotChange,
  auditReturnOrderAction,
  setPPNoteAction,
  repostOrderNewIdsAction,
  reMatchHaiGuanAction
} from '@/api/oaOrderManage';
import { lang } from '@/common/utils/i18nFinal'
import {isCanSetPostType, setContacter} from '../../api/oaOrderManage'
const commonLang = lang('common');

function messageBox(type, params) {
  const fnList = {
    confirm() {
      return vmCrm.$confirm(params.content, '提示' || params.title, {
        confirmButtonText: commonLang('sure'),
        cancelButtonText: commonLang('cancel'),
        type: 'warning' ||  params.type
      });
    }
  }

  return fnList[type]();
}

function actionHandler(promise) {
  promise.then(() => {
    this.$message({
      type: 'success',
      message: '操作成功'
    });
  });
}

export default function(fnName) {
  const fnList = {
    moveToPendShip: function() {
      const selection = this.tableAttr.selection;
      const flag = !selection.some(item => item.orderType !== 'wholesale');
      if (flag) {
        this.$confirm('是否移动所选数据到“批发待发货”？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = selection.map(item => item.packageNo);
          moveToPendShipAction(ids).then(() => {
            this.onSearch();
          })
        });
      } else {
        this.$message({
          type: 'info',
          message: `只有订单类型为批发的可执行该操作`
        });
      }
    },
    setCSPending() {
      const flag = !this.tableAttr.selection.some(item => item.platformId != 7);
      if (flag) {
        this.$confirm('是否设置客服待处理？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isSetCSPending = true;
        });
      } else {
        this.$message({
          type: 'info',
          message: '只有ebay平台的订单可执行该操作'
        })
      }
    },
    setShipMail() {
      const orderIds = this.tableAttr.selection.map(item => item.packageNo);
      isCanSetPostType(orderIds).then(res => {
        if (res.data) {
          console.log(res.data);
          this.isSetShipMail = true;
        }
      })
    },
    reviewBackOrder() {
      messageBox('confirm', {
        content: '确定要审核吗？'
      }).then(() => {
        auditReturnOrderAction(this.tableAttr.selection.map(item => item.id)).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          });
        });
      });
    },
    setMsgProcess() {
      messageBox('confirm', {
        content: '确定要设置为留言已处理？'
      }).then(() => {
        setPPNoteAction({
          orders: this.tableAttr.selection.map(item => item.packageNo)
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          });
        })
      });
    },
    reviewBackOrder() {
      messageBox('confirm', {
        content: '确定要审核吗？'
      }).then(() => {
        // TODO
      });
    },
    rematchOrder() {
      messageBox('confirm', {
        content: '确定要匹配报关单吗？'
      }).then(() => {
        reMatchHaiGuanAction(this.tableAttr.selection.map(item => item.id)).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          });
        });
      });
    },
    setMailNotJump() {
      messageBox('confirm', {
        content: '确定要设置邮寄方式不跳转吗？'
      }).then(() => {
        const ids = this.tableAttr.selection.map(item => item.id);
        SetPostTypeNotChange(ids).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        })
      });
    },
    confirmFarOrder() {
      messageBox('confirm', {
        content: '确认偏远地区订单吗？'
      }).then(() => {
        let selection = this.tableAttr.selection;
        const ids = selection.map(item => item.id);
        confirmFarOrderAction(ids).then(() => {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        });
      });
    },
    confirmToSendOrder() {
      messageBox('confirm', {
        content: '确认并提交快递订单吗？'
      }).then(() => {
        const ids = this.tableAttr.selection.map(item => item.id);
        actionHandler.call(this, confirmToSendOrderAction(ids));
      });
    },
    FBAship() {
      if (this.tableAttr.selection.length !== 1) {
        this.$message({
          type: 'warn',
          message: '只能操作单条数据'
        });
        return;
      }
      messageBox('confirm', {
        content: '确定要转FBA发货吗？'
      }).then(() => {
        this.isFBAship = true;
      });
    },
    setSalePending() {
      messageBox('confirm', {
        content: '确定要设置销售待处理吗？'
      }).then(() => {
        this.isSetSalePending = true;
      });
    },
    mergeOrder() {
      // this.isMergeOrder = true;
      messageBox('confirm', {
        content: '确定要合并订单吗？'
      }).then(() => {
        mergeOrderAction({
          packageNos: this.tableAttr.selection.map(item => item.packageNo)
        }).then(() => {
          this.$message({
            type: 'success',
            message: '合并成功'
          });
        });
      });
    },
    summaryReport({
      belong
    }) {
      console.log('belong:', belong);
      if (belong === 'contactCustomer') {
        this.isccSummaryReport = true;
      } else if (belong === 'stockout') {
        this.isSummaryReport = true;
      }
    },
    printCargoOrder() {
      this.isPrintCargoOrder = true;
    },
    printCargoDetail() {
      this.isPrintCargoDetail = true;
    },
    batchSplitPG() {

    },
    batchModifySKUPOA() {
      this.isBatchModifySKUPOA = true;
    },
    contacting() {
      messageBox('confirm', {
        content: '确定设置为联系中？'
      }).then(() => {
        setContacter({
          packageNos: this.tableAttr.selection.map(item => item.packageNo).join(',')
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        });
      });
    },
    reSend() {
      messageBox('confirm', {
        content: '确认要重发？',
      }).then(() => {
        actionHandler.call(
          this,
          repostOrderNewIdsAction({packageNos: this.tableAttr.selection.map(item => item.packageNo).join(',')
        }));
      });
    }
  };

  return fnList[fnName];
}
