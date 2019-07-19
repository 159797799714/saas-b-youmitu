<template>
  <div>
    <el-tabs v-model="channelIndex" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in channelList" :key="index" :label="item.alias" type="card"/>
    </el-tabs>
    <div class="edit">
      <div class="edit-left">
        <el-table
          ref="table"
          :data="roleList"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="tenant_level" label="会员等级" align="left"/>
          <el-table-column label="交易费率" align="left">
            <template slot-scope="scope">
              <div>{{ (scope.row.transaction_fee_rate * 100).toFixed(4) * 1000 / 1000 + '%+' + (scope.row.transaction_fee_fixed / 100).toFixed(2) + '元' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="结算费率" align="left">
            <template slot-scope="scope">
              <div>{{ (scope.row.settlement_fee_rate * 100).toFixed(4) * 1000 / 1000 + '%+' + (scope.row.settlement_fee_fixed / 100).toFixed(2) + '元' }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="edit-right">
        <div class="title">编辑配置</div>
        <div class="form">
          <div class="item">
            <div class="label">会员等级</div>
            <div class="box">
              <el-input
                :disabled="true"
                v-model="editData.tenant_level"
                size="small"
                placeholder=""/>
            </div>
          </div>
          <div class="item">
            <div class="label">交易费率</div>
            <div class="box box-2">
              <el-input
                v-model="editData.transaction_fee_rate"
                size="small"
                placeholder=""
                suffix-icon="el-icon-percent"/>
              <div class="add">+</div>
              <el-input
                v-model="editData.transaction_fee_fixed"
                size="small"
                placeholder=""
                suffix-icon="el-icon-yen"/>
            </div>
          </div>
          <div class="item">
            <div class="label">结算费率</div>
            <div class="box box-2">
              <el-input
                v-model="editData.settlement_fee_rate"
                size="small"
                placeholder=""
                suffix-icon="el-icon-percent"/>
              <div class="add">+</div>
              <el-input
                v-model="editData.settlement_fee_fixed"
                size="small"
                placeholder=""
                suffix-icon="el-icon-yen"/>
            </div>
          </div>
          <div class="item">
            <div class="label">&nbsp;</div>
            <div class="box">
              <el-button type="primary" size="small" @click="savaConfig">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRepayWayList, getRepayBonusRuleList, editRepayBonusRule } from '@/api/setting'

export default {
  data () {
    return {
      channelList: [],
      channelIndex: 0,
      roleList: [],
      currentRow: {},
      currentIndex: 0,
      editData: {
        id: '',
        tenant_level: '',
        transaction_fee_rate: '',
        transaction_fee_fixed: '',
        settlement_fee_rate: '',
        settlement_fee_fixed: ''
      }
    }
  },
  created () {
    // 获取通道列表
    getRepayWayList().then(res => {
      if (res.data && res.data.code === 0) {
        if (res.data.data.length > 0) {
          this.channelList = res.data.data
          this.getRoleList(this.channelList[this.channelIndex].sys_repay_gateway.code)
        } else {
          this.$message({
            message: '没有代还通道数据',
            type: 'warning',
            duration: 500
          })
        }
      } else {
        this.$message.error(res.data && res.data.message ? res.data.message : '获取代还通道列表失败')
      }
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    currentRow (val) {
      this.editData.transaction_fee_rate = val && val.transaction_fee_rate !== undefined ? (val.transaction_fee_rate * 100).toFixed(4) * 1000 / 1000 : ''
      this.editData.transaction_fee_fixed = val && val.transaction_fee_fixed !== undefined ? (val.transaction_fee_fixed / 100).toFixed(2) : ''
      this.editData.settlement_fee_rate = val && val.settlement_fee_rate !== undefined ? (val.settlement_fee_rate * 100).toFixed(4) * 1000 / 1000 : ''
      this.editData.settlement_fee_fixed = val && val.settlement_fee_fixed !== undefined ? (val.settlement_fee_fixed / 100).toFixed(2) : ''
      this.editData.id = val && val.id !== undefined ? val.id : ''
      this.editData.tenant_level = val && val.tenant_level !== undefined ? val.tenant_level : ''
    }
  },
  methods: {
    handleClick (tab) {},
    handleCurrentChange (item) {
      this.currentRow = item
      for (let i = 0; i < this.roleList.length; i++) {
        if (item.id === this.roleList[i].id) {
          this.currentIndex = i
          break
        }
      }
    },
    getRoleList (code) {
      getRepayBonusRuleList({
        code: code
      }).then(res => {
        if (res.data && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.roleList = res.data.data
            this.$nextTick(() => {
              this.$refs.table.setCurrentRow(this.roleList[this.currentIndex])
            })
          } else {
            this.$message({
              message: '没有代还的会员等级分润列表',
              type: 'warning',
              duration: 500
            })
          }
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取代还的会员等级分润列表失败')
        }
      })
    },
    savaConfig () {
      if (!/^\d+(\.\d{0,10})?$/.test(this.editData.settlement_fee_rate)) {
        this.$message({
          message: '提现手续费百分比输入错误，请输入整数或者小数',
          type: 'warning',
          duration: 500
        })
        return
      }
      if (!/^\d+(\.\d{0,2})?$/.test(this.editData.settlement_fee_fixed)) {
        this.$message({
          message: '每日提现总金额输入错误，请输入整数或者最多两位小数',
          type: 'warning',
          duration: 500
        })
        return
      }
      let data = {
        id: this.editData.id,
        settlement_fee_rate: parseFloat((this.editData.settlement_fee_rate / 100).toFixed(6)),
        settlement_fee_fixed: parseInt(this.editData.settlement_fee_fixed * 100),
        transaction_fee_rate: parseFloat((this.editData.transaction_fee_rate / 100).toFixed(6)),
        transaction_fee_fixed: parseInt(this.editData.transaction_fee_fixed * 100)
      }
      this.$confirm('确认是否保存，点击保存立即生效?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        editRepayBonusRule(data).then(res => {
          if (res.data && res.data.code === 0) {
            this.getRoleList(this.channelList[this.channelIndex].sys_repay_gateway.code)
            this.$message({
              type: 'success',
              message: '保存成功',
              duration: 500
            })
          } else {
            this.$message.error(res.data && res.data.message ? res.data.message : '保存失败失败')
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .edit{
    display: flex;
    .edit-left{
      flex-grow: 1;
      min-width: 380px;
      margin-right: 30px;
    }
    .edit-right{
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
      .form{
        padding: 30px 30px 0;
        overflow: hidden;
        .item{
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .label{
            width: 80px;
            margin-right: 15px;
            font-size: 14px;
            color: #333;
            text-align: right;
          }
          .box{
            flex-grow: 1; display: flex; align-items: center;
            &.box-2{
              width: 243px;
              .add{
                margin: 0 4px; font-size: 14px; color: #4A4A4A;
              }
            }
          }
        }
      }
    }
  }
  .el-table{
    cursor: pointer;
  }
</style>
<style scoped>
>>> .is-active{
  background-color: transparent;
}
</style>
