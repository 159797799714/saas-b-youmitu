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
          :data="wayLists"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="name" label="提现方式" align="left"/>
          <el-table-column label="状态" align="left">
            <template slot-scope="scope">
              <div :class="{'open': scope.row.status === 1}">{{ scope.row.status === 1 ? '启用中' : '关闭' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" align="left">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus($event, scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="details-right">
        <div class="title">编辑配置</div>
        <div class="form">
          <div class="item" v-for="(item, key, index) in editData" :key="index">
            <div class="label">{{ key }}</div>
            <div class="box">
              <el-input v-model="editData[key]" size="small" placeholder=""/>
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
import { getWithdrawWayList, changeWithdrawWayStatus, editWithdrawWay } from '@/api/setting'

export default {
  components: {
    BonusHeadBar
  },
  data () {
    return {
      header: {
        selectType: 'withdrawWay',
        list: [
          {
            text: '提现方式设置',
            type: 'withdrawWay'
          }
        ]
      },
      wayLists: [],
      currentRow: null,
      currentIndex: 0,
      editData: {}
    }
  },
  created () {
    this.getWithdrawWay()
  },
  watch: {
    currentRow (val) {
      this.editData = {}
      if (val && !this.isEmpty(val.details)) {
        for (const key in val.details) {
          this.$set(this.editData, key, val.details[key])
        }
      } else {
        this.$set(this.editData, 'app_id', '')
        this.$set(this.editData, 'key', '')
        this.$set(this.editData, 'app_secret', '')
        this.$set(this.editData, 'mch_id', '')
      }
    }
  },
  methods: {
    isEmpty (obj) {
      if (!obj && obj !== 0 && obj !== '') return true
      if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) return true
      if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) return true
      return false
    },
    handleCurrentChange (item) {
      this.currentRow = item
      for (let i = 0; i < this.wayLists.length; i++) {
        if (item.id === this.wayLists[i].id) {
          this.currentIndex = i
          break
        }
      }
    },
    getWithdrawWay () {
      getWithdrawWayList().then(res => {
        if (res.data && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.wayLists = res.data.data
            // 第一行选中
            this.$nextTick(() => {
              this.$refs.table.setCurrentRow(this.wayLists[this.currentIndex])
            })
          } else {
            this.$message({
              message: '暂无提现方式',
              type: 'warning'
            })
          }
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '提现方式失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeStatus (e, item) {
      changeWithdrawWayStatus({
        pay_type: item.pay_id
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.getWithdrawWay()
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
    savaConfig () {
      let formData = {
        pay_id: this.currentRow.pay_id || ''
      }
      for (const key in this.editData) {
        formData[key] = this.editData[key]
        if (!this.editData[key]) {
          this.$message({
            message: '请填写' + key,
            type: 'warning'
          })
          return false
        }
      }
      this.$confirm('确认是否保存，点击保存立即生效?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        editWithdrawWay(formData).then(res => {
          if (res.data && res.data.code === 0) {
            this.getWithdrawWay()
            this.$message({
              message: '保存成功',
              type: 'success'
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
            width: 70px;
            margin-right: 15px;
            font-size: 14px;
            color: #333;
            text-align: right;
          }
          .box{
            flex-grow: 1;
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
