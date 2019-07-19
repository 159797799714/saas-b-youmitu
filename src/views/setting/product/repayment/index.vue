<template>
  <div class="main">
    <div class="info">
      <BonusHeadBar
        :selected="header.selectType"
        :list="header.list"/>
    </div>
    <div class="details">
      <div class="details-left">
        <el-table
          ref="table"
          :data="providerLists"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="sys_repay_gateway.name" label="通道名称" align="left"/>
          <el-table-column label="上游交易费率" align="left">
            <template slot-scope="scope">
              <div>{{ (scope.row.sys_repay_gateway.transaction_fee_rate * 100).toFixed(2) * 100000 / 100000 + '%+' + (scope.row.sys_repay_gateway.transaction_fee_fixed / 100).toFixed(2) + '元' }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="rate_down" label="上游结算费率" align="left">
            <template slot-scope="scope">
              <div>{{ (scope.row.sys_repay_gateway.settlement_fee_rate * 100).toFixed(2) * 100000 / 100000 + '%+' + (scope.row.sys_repay_gateway.settlement_fee_fixed / 100).toFixed(2) + '元' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="left">
            <template slot-scope="scope">
              <div :class="{'open': scope.row.status === 0}">{{ scope.row.status === 0 ? '启用中' : '关闭' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" align="left">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="0"
                :inactive-value="10"
                @change="changeStatus($event, scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="details-right">
        <div class="title">编辑配置</div>
        <div v-if="currentRow" class="form-box">
          <el-form
            :model="editData"
            status-icon
            :rules="formRules"
            ref="editForm"
            label-width="105px"
            class="form">
            <el-form-item label="通道名称" prop="name">
              <el-input :disabled="true" v-model="editData.name" autocomplete="off" size="small"/>
            </el-form-item>
            <el-form-item label="通道别称" prop="alias">
              <el-input v-model="editData.alias" autocomplete="off" size="small"/>
            </el-form-item>
            <el-form-item label="下游交易费率" prop="transaction_fee_rate">
              {{ editData.transaction_fee_rate + '%+' + editData.transaction_fee_fixed + '元'}}
              <!-- <el-input v-model="editData.transaction_fee_rate" autocomplete="off" size="small" suffix-icon="el-icon-percent"/> -->
            </el-form-item>
            <!-- <el-form-item label="" prop="transaction_fee_fixed">
              <el-input v-model="editData.transaction_fee_fixed" autocomplete="off" size="small" suffix-icon="el-icon-yen"/>
            </el-form-item> -->
            <el-form-item label="下游结算费率" prop="settlement_fee_rate">
              {{ editData.settlement_fee_rate + '%+' + editData.settlement_fee_fixed + '元'}}
              <!-- <el-input v-model="editData.settlement_fee_rate" autocomplete="off" size="small" suffix-icon="el-icon-percent"/> -->
            </el-form-item>
            <!-- <el-form-item label="" prop="settlement_fee_fixed">
              <el-input v-model="editData.settlement_fee_fixed" autocomplete="off" size="small" suffix-icon="el-icon-yen"/>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" size="small" @click="savaConfig('editForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BonusHeadBar from '@/views/setting/components/headBar.vue'
import { getRepayWayList, enableRepayWay, disableRepayWay, editRepayWayConfig } from '@/api/setting'

export default {
  components: {
    BonusHeadBar
  },
  data () {
    let validateAlias = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('别称不能为空'))
      }
      callback()
    }
    let validateRate = (rule, value, callback) => {
      if (!/^\d+(\.\d{0,10})?$/.test(value)) {
        return callback(new Error('请输入整数或者小数'))
      }
      callback()
    }
    let validateMoney = (rule, value, callback) => {
      if (!/^\d+(\.\d{0,2})?$/.test(value)) {
        return callback(new Error('请输入整数或者两位小数'))
      }
      callback()
    }
    return {
      header: {
        selectType: 'repayChannel',
        list: [
          {
            text: '代还通道设置',
            type: 'repayChannel'
          }
        ]
      },
      providerLists: [],
      currentRow: null,
      currentIndex: 0,
      editData: {
        id: '',
        name: '',
        alias: '',
        transaction_fee_rate: '',
        transaction_fee_fixed: '',
        settlement_fee_rate: '',
        settlement_fee_fixed: ''
      },
      formRules: {
        alias: [
          { validator: validateAlias, trigger: 'blur' }
        ],
        transaction_fee_rate: [
          { validator: validateRate, trigger: 'blur' }
        ],
        transaction_fee_fixed: [
          { validator: validateMoney, trigger: 'blur' }
        ],
        settlement_fee_rate: [
          { validator: validateRate, trigger: 'blur' }
        ],
        settlement_fee_fixed: [
          { validator: validateMoney, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  watch: {
    currentRow (val) {
      this.editData.id = val && val.id !== undefined ? val.id : ''
      this.editData.name = val && val.sys_repay_gateway && val.sys_repay_gateway.name !== undefined ? val.sys_repay_gateway.name : ''
      this.editData.alias = val && val.alias !== undefined ? val.alias : ''
      this.editData.transaction_fee_rate = val && val.transaction_fee_rate !== undefined ? (val.transaction_fee_rate * 100).toFixed(6) * 100000 / 100000 : ''
      this.editData.transaction_fee_fixed = val && val.transaction_fee_fixed !== undefined ? (val.transaction_fee_fixed / 100).toFixed(2) : ''
      this.editData.settlement_fee_rate = val && val.settlement_fee_rate !== undefined ? (val.settlement_fee_rate * 100).toFixed(6) * 100000 / 100000 : ''
      this.editData.settlement_fee_fixed = val && val.settlement_fee_fixed !== undefined ? (val.settlement_fee_fixed / 100).toFixed(2) : ''
    }
  },
  methods: {
    handleCurrentChange (item) {
      this.currentRow = item
      for (let i = 0; i < this.providerLists.length; i++) {
        if (item.id === this.providerLists[i].id) {
          this.currentIndex = i
          break
        }
      }
    },
    getList () {
      this.providerLists.length = 0
      getRepayWayList().then(res => {
        if (res.data && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.providerLists = res.data.data
            // 第一行选中
            this.$nextTick(() => {
              this.$refs.table.setCurrentRow(this.providerLists[this.currentIndex])
            })
          } else {
            this.$message({
              message: '没有代还通道数据',
              type: 'warning'
            })
          }
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取代还通道列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeStatus (e, item) {
      if (e === 0) {
        enableRepayWay({
          id: item.id
        }).then(res => {
          if (res.data && res.data.code === 0) {
            this.getList()
            this.$message({
              message: '开启成功',
              type: 'success'
            })
          } else {
            item.status = item.status === 0 ? 10 : 0
            this.$message.error(res.data && res.data.message ? res.data.message : '开启失败')
          }
        }).catch(err => {
          item.status = item.status === 0 ? 10 : 0
          console.log(err)
        })
      } else {
        disableRepayWay({
          id: item.id
        }).then(res => {
          if (res.data && res.data.code === 0) {
            this.$message({
              message: '关闭成功',
              type: 'success'
            })
          } else {
            item.status = item.status === 0 ? 10 : 0
            this.$message.error(res.data && res.data.message ? res.data.message : '关闭失败')
          }
        }).catch(err => {
          item.status = item.status === 0 ? 10 : 0
          console.log(err)
        })
      }
    },
    savaConfig (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认是否保存，点击保存立即生效?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            editRepayWayConfig({
              id: this.editData.id,
              alias: this.editData.alias,
              transaction_fee_rate: this.editData.transaction_fee_rate / 100,
              transaction_fee_fixed: this.editData.transaction_fee_fixed * 100,
              settlement_fee_rate: this.editData.settlement_fee_rate / 100,
              settlement_fee_fixed: this.editData.settlement_fee_fixed * 100
            }).then(res => {
              if (res.data && res.data.code === 0) {
                this.getList()
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 500
                })
              } else {
                this.$message.error(res.data && res.data.message ? res.data.message : '保存失败')
              }
            }).catch(err => {
              console.log(err)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消保存',
              duration: 500
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .info{
    padding: 0;
  }
  .details{
    display: flex;
    padding: 40px 30px;
    .details-left{
      flex-grow: 1;
      min-width: 380px;
      margin-right: 30px;
      .open{
        color: #4993FF;
      }
    }
    .details-right{
      box-sizing: border-box;
      width: 440px;
      background-color: #F7F9FB;
      border: 1px solid #e8e8e8;
      .title{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 50px;
        padding: 0 30px;
        font-size: 14px;
        color: #4A4A4A;
        border-bottom: 1px solid #eee;
      }
      .form-box{
        padding: 20px 30px 0;
        overflow: hidden;
        .form{
          .el-form-item{
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
  >>> .el-form-item__label{
    padding-right: 15px;
    font-size: 14px;
    color: #333;
  }
</style>
