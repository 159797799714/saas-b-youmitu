<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="top">
      <div class="user-img">
        <img v-if="info.status === 0" src="@/assets/wait.png">
        <img v-if="info.status === 1" src="@/assets/success.png">
        <img v-if="info.status === 2" src="@/assets/error.png">
      </div>
      <div class="status-info">
        <div class="status">审核状态：{{ info.status_text }}</div>
        <div class="status-time">提现时间：{{ info.created_at }}</div>
      </div>
    </div>
    <div class="main-info">
      <div class="center-info">
        <div class="info-lists">
          <div class="item">
            <div class="tag">用户ID</div>
            <div class="data">{{ info.user_id?info.user_id: '' }}</div>
          </div>
          <div class="item">
            <div class="tag">实际应到账金额</div>
            <div class="data">{{ info.transfer_amount_text? info.transfer_amount_text: '' }}</div>
          </div>
          <div class="item">
            <div class="tag">姓名</div>
            <div class="data">{{ info.user_realname?info.user_realname : '' }}</div>
          </div>
          <div class="item">
            <div class="tag">提现银行卡号</div>
            <div class="data">{{ info.bank_card_number?info.bank_card_number: '' }}</div>
          </div>
          <div class="item">
            <div class="tag">手机号</div>
            <div class="data">{{ info.user_mobile?info.user_mobile: '' }}</div>
          </div>
          <div class="item">
            <div class="tag">所属支行</div>
            <div class="data">{{ info.bank_name?info.bank_name: '' }}</div>
          </div>
          <div class="item">
            <div class="tag">提现金额</div>
            <div class="data">{{ info.amount_text }}</div>
          </div>
          <div class="item">
            <div class="tag">提现时间</div>
            <div class="data">{{ info.created_at }}</div>
          </div>
          <div class="item">
            <div class="tag">手续费金额</div>
            <div class="data">{{ info.fee_text }}</div>
          </div>
          <div class="item">
            <div class="tag">审核状态</div>
            <div class="data">{{ info.status_text }}</div>
          </div>
          <div v-if="info.status === 2" class="item">
            <div class="tag">拒绝原因</div>
            <div class="data">{{ info.remark?info.remark: '' }}</div>
          </div>
        </div>
        <div v-if="info.status === 0">
          <div class="select">
            <div>选择审核状态：</div>
            <el-radio-group v-model="status" class="check-radio">
              <div class="item">
                <el-radio :label="0" class="check-li">审核通过</el-radio>
              </div>
              <div class="item">
                <el-radio :label="1" class="check-li">审核拒绝</el-radio>
              </div>
            </el-radio-group>
          </div>
          <div class="select" v-show="status === 0">
            <div>选择打款方式：</div>
            <el-radio-group v-model="way" class="check-radio">
              <div v-for="(item, index) in payType" :key="index" class="item">
                <el-radio :label="item.id" class="check-li">{{ item.name }}</el-radio>
              </div>
            </el-radio-group>
          </div>
          <div class="select" v-show="rejectForm.remark !== ''">
            <div>拒绝原因：{{ rejectForm.remark }}</div>
          </div>
          <div  class="submit-btn">
            <el-button type="primary" size="small" @click="saveAction(status)">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 审核拒绝弹窗 -->
    <el-dialog :visible.sync="rejectAlert" title="审核拒绝" class="dialog">
      <el-form :model="rejectForm" :rules="rules" ref="rejectForm">
        <el-form-item label="拒绝原因：" prop="remark">
          <el-input type="textarea" v-model="rejectForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="rejectAlert = false">取消</el-button>
        <el-button type="primary" size="small" @click="submitForm('rejectForm')">确认</el-button>
      </div>
    </el-dialog>
    <!-- 选择打款时间弹窗 -->
    <el-dialog :visible.sync="wayTimeAlert" title="选择打款时间" class="wayTimeAlert">
      <el-form :model="successForm">
        <el-form-item label="打款时间：">
          <el-date-picker
            v-model="successForm.transfer_time"
            type="datetime"
            placeholder="选择日期时间"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="wayTimeAlert = false">取消</el-button>
        <el-button type="primary" size="small" @click="sureTimeAction">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import Footbar from '@/components/pagination/index.vue'
import { applyDetail, applyReject, applySuccess, cashApplyStatus } from '@/api/finance'
export default {
  data () {
    var checkRemark = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请填写拒绝原因'))
      } else {
        callback()
      }
    }
    return {
      payType: [],
      id: '',
      info: {},
      status: 0,
      way: 1,
      rejectAlert: false,
      wayTimeAlert: false,
      successForm: {
        id: '',
        transfer_type: 1,
        transfer_time: ''
      },
      rejectForm: {
        id: '',
        remark: ''
      },
      rules: {
        remark: [
          { validator: checkRemark, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    status (val, oldval) {
      this.rejectForm.remark = ''
      if (val === 1) {
        this.rejectAlert = true
      } else {
        this.rejectAlert = false
      }
    },
    way (val, oldval) {
      console.log(val)
      this.wayTimeAlert = true
      this.successForm.transfer_type = val
    }
  },
  created () {
    this.id = this.$route.query.id
    this.successForm.id = this.id
    this.rejectForm.id = this.id
    cashApplyStatus().then(res => {
      this.payType = res.data.data.transfer_type
    }).catch(err => {
      console.log(err)
    })
    this.getDetail()
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.rejectAlert = false
        } else {
          return false
        }
      })
    },
    // 获取详情信息
    getDetail () {
      applyDetail(this.id).then(res => {
        this.info = res.data.data[0]
      }).catch(err => {
        console.log(err)
      })
    },
    // 确认时间
    sureTimeAction () {
      if (this.successForm.transfer_time !== '') {
        this.wayTimeAlert = false
      } else {
        this.$message({
          type: 'warning',
          message: '请选择打款时间',
          duration: 1000
        })
      }
    },
    saveAction (item) {
      // 审核通过
      if (item === 0) {
        if (this.successForm.transfer_time !== '') {
          applySuccess(this.successForm).then(res => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.getDetail()
            } else {
              if (res.data.code === 30001) {
                this.$message({
                  type: 'warning',
                  message: '订单已经处理过了，不需要重复处理'
                })
              } else {
                this.$message.error(res.data.message)
              }
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          this.wayTimeAlert = true
        }
        // 审核拒绝
      } else if (item === 1) {
        if (this.rejectForm.remark !== '') {
          applyReject(this.rejectForm).then(res => {
            if (res.data.status) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.getDetail()
            } else {
              if (res.data.code === 30001) {
                this.$message({
                  type: 'warning',
                  message: '订单已经处理过了，不需要重复处理'
                })
              } else {
                this.$message.error(res.data.message)
              }
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          this.rejectAlert = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$font-color: #4a4a4a;
$border: 1px solid #EBEBEB;
$color: #4993FF;
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .top{
    display: flex;
    line-height: 60px;
    padding: 20px 0 20px 30px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    .user-img{
      display: inline-block;
      margin-right: 12px;
      height: 60px;
      width: 60px;
      border-radius: 100%;
      overflow: hidden;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .status-info{
      height: 60px;
      .status{
        margin-bottom: 8px;
        font-size: 20px;
        line-height: 28px;
        font-weight: bold;
      }
      .status-time{
        line-height: 20px;
        color: #666666;
      }
    }
  }
  .main-info {
    .center-info{
      padding: 44px 14px;
      .info-lists{
        display: flex;
        flex-wrap: wrap;
        .item{
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 33.33%;
          height: 40px;
          padding-right: 20px;
          margin-bottom: 10px;
          font-size: 14px;
          color: #666;
          overflow: hidden;
          .tag{
            width: 100px;
            margin-right: 20px;
            white-space: nowrap;
          }
          .data{
            flex-grow: 1;
            font-weight: 600;
            color: #333;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        &.info-lists{
          .item{
            width: 50%;
          }
        }
      }
    }
    .select{
      display: flex;
      margin-top: 26px;
      height: 20px;
      .check-radio{
        display: flex;
        margin-left: 12px;
        .item{
          width: 140px;
        }
      }
    }
    .submit-btn{
      margin-top:26px;
      padding-left: 23px;
    }
  }
}
</style>
<style scoped>
.dialog >>> .el-dialog{
  max-width: 550px;
}
.wayTimeAlert >>> .el-dialog{
  max-width: 460px;
}
</style>
