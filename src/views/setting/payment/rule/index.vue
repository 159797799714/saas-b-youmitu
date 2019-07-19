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
          :data="withdrawLists"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="name" label="用户规则" align="left"/>
          <el-table-column label="状态" align="left">
            <template slot-scope="scope">
              <div :class="{'open': scope.row.details && scope.row.details.status === 1}">{{ scope.row.details && scope.row.details.status === 1 ? '可提现' : '不可提现' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否可提现" align="left">
            <template slot-scope="scope">
              <el-switch
                :disabled="!scope.row.details.id"
                v-model="scope.row.details.status"
                :active-value="1"
                :inactive-value="0"
                :validate-event="false"
                @change="changeStatus($event, scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="details-right">
        <div class="title">编辑配置</div>
        <div class="form">
          <div class="item">
            <div class="label">单次最低提现金额</div>
            <div class="box">
              <el-input
                v-model="editData.min_amount"
                size="small"
                placeholder=""
                suffix-icon="el-icon-yen"/>
            </div>
          </div>
          <div class="item">
            <div class="label">单次最高提现金额</div>
            <div class="box">
              <el-input
                v-model="editData.max_amount"
                size="small"
                placeholder=""
                suffix-icon="el-icon-yen"/>
            </div>
          </div>
          <div class="item">
            <div class="label">每日提现最多次数</div>
            <div class="box">
              <el-input
                v-model="editData.max_frequency"
                size="small"
                placeholder=""/>
            </div>
          </div>
          <div class="item">
            <div class="label">每日提现总金额</div>
            <div class="box">
              <el-input
                v-model="editData.day_max_amount"
                size="small"
                placeholder=""
                suffix-icon="el-icon-yen"/>
            </div>
          </div>
          <div class="item">
            <div class="label">提现手续费</div>
            <div class="box box-2">
              <el-input
                v-model="editData.handling_fee"
                size="small"
                placeholder=""
                suffix-icon="el-icon-percent"/>
              <div class="add">+</div>
              <el-input
                v-model="editData.attach_amount"
                size="small"
                placeholder=""
                suffix-icon="el-icon-yen"/>
            </div>
          </div>
          <div class="item">
            <div class="label">提现最低手续费</div>
            <div class="box">
              <el-input
                v-model="editData.min_handling_fee"
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
import BonusHeadBar from '@/views/setting/components/headBar.vue'
import { getWithdrawConfigList, changeWithdrawConfigStatus, editWithdrawConfig } from '@/api/setting'

export default {
  components: {
    BonusHeadBar
  },
  data () {
    return {
      header: {
        selectType: 'withdrawRule',
        list: [
          {
            text: '提现规则设置',
            type: 'withdrawRule'
          }
        ]
      },
      withdrawLists: [],
      currentRow: null,
      currentIndex: 0,
      editData: {
        min_amount: '',
        max_amount: '',
        max_frequency: '',
        day_max_amount: '',
        handling_fee: '',
        min_handling_fee: '',
        attach_amount: '',
        user_level: ''
      }
    }
  },
  created () {
    this.getWithdrawConfig()
  },
  watch: {
    currentRow (val) {
      this.editData.min_amount = val && val.details && val.details.min_amount !== undefined ? (val.details.min_amount / 100).toFixed(2) : ''
      this.editData.max_amount = val && val.details && val.details.max_amount !== undefined ? (val.details.max_amount / 100).toFixed(2) : ''
      this.editData.max_frequency = val && val.details && val.details.max_frequency !== undefined ? val.details.max_frequency : ''
      this.editData.day_max_amount = val && val.details && val.details.day_max_amount !== undefined ? (val.details.day_max_amount / 100).toFixed(2) : ''
      this.editData.handling_fee = val && val.details && val.details.handling_fee !== undefined ? (val.details.handling_fee * 100).toFixed(6) * 100000 / 100000 : ''
      this.editData.min_handling_fee = val && val.details && val.details.min_handling_fee !== undefined ? (val.details.min_handling_fee / 100).toFixed(2) : ''
      this.editData.attach_amount = val && val.details && val.details.attach_amount !== undefined ? (val.details.attach_amount / 100).toFixed(2) : ''
      this.editData.user_level = val && val.id !== undefined ? val.id : ''
    }
  },
  methods: {
    getWithdrawConfig () {
      getWithdrawConfigList().then(res => {
        if (res.data && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.withdrawLists = res.data.data
            // 第一行选中
            this.$nextTick(() => {
              this.$refs.table.setCurrentRow(this.withdrawLists[this.currentIndex])
            })
          } else {
            this.$message({
              message: '暂无提现规则',
              type: 'warning'
            })
          }
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '提现规则失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeStatus (e, item) {
      changeWithdrawConfigStatus({
        user_level: item.id
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.getWithdrawConfig()
          this.$message({
            message: e ? '开启成功' : '关闭成功',
            type: 'success'
          })
        } else {
          item.status = item.status === 0 ? 1 : 0
          this.$message.error(res.data && res.data.message ? res.data.message : e ? '开启成功' : '关闭成功')
        }
      }).catch(err => {
        console.log(err)
        item.status = item.status === 0 ? 1 : 0
      })
    },
    handleCurrentChange (item) {
      this.currentRow = item
      for (let i = 0; i < this.withdrawLists.length; i++) {
        if (item.id === this.withdrawLists[i].id) {
          this.currentIndex = i
          break
        }
      }
    },
    savaConfig () {
      if (!/^\d+(\.\d{0,2})?$/.test(this.editData.min_amount)) {
        this.$message({
          message: '单次最低提现金额输入错误，请输入整数或者最多两位小数',
          type: 'warning'
        })
        return
      }
      if (!/^\d+(\.\d{0,2})?$/.test(this.editData.max_amount)) {
        this.$message({
          message: '单次最高提现金额输入错误，请输入整数或者最多两位小数',
          type: 'warning'
        })
        return
      }
      if (!/^\d+$/.test(this.editData.max_frequency)) {
        this.$message({
          message: '每日提现最多次数输入错误，请输入整数',
          type: 'warning'
        })
        return
      }
      if (!/^\d+(\.\d{0,2})?$/.test(this.editData.day_max_amount)) {
        this.$message({
          message: '每日提现总金额输入错误，请输入整数或者最多两位小数',
          type: 'warning'
        })
        return
      }
      if (!/^\d+(\.\d{0,10})?$/.test(this.editData.handling_fee)) {
        this.$message({
          message: '提现手续费百分比输入错误，请输入整数或者小数',
          type: 'warning'
        })
        return
      }
      if (!/^\d+(\.\d{0,2})?$/.test(this.editData.attach_amount)) {
        this.$message({
          message: '提现手续费附加金额输入错误，请输入整数或者最多两位小数',
          type: 'warning'
        })
        return
      }
      if (!/^\d+(\.\d{0,2})?$/.test(this.editData.min_handling_fee)) {
        this.$message({
          message: '提现最低手续费输入错误，请输入整数或者最多两位小数',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认是否保存，点击保存立即生效?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        editWithdrawConfig({
          min_amount: parseInt(this.editData.min_amount * 100),
          max_amount: parseInt(this.editData.max_amount * 100),
          max_frequency: this.editData.max_frequency,
          day_max_amount: parseInt(this.editData.day_max_amount * 100),
          handling_fee: this.editData.handling_fee / 100,
          min_handling_fee: parseInt(this.editData.min_handling_fee * 100),
          attach_amount: parseInt(this.editData.attach_amount * 100),
          user_level: this.editData.user_level
        }).then(res => {
          if (res.data && res.data.code === 0) {
            this.$message({
              message: res.data && res.data.message ? res.data.message : '成功',
              type: 'success'
            })
            this.getWithdrawConfig()
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
      .form{
        padding: 30px 30px 0;
        overflow: hidden;
        .item{
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .label{
            width: 120px;
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
}
.el-table{
  cursor: pointer;
}
</style>
