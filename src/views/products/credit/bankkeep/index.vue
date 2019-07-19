<template>
  <div class="main">
    <div class="info">银行管理</div>
    <div class="main-info">
      <div class="header">
        <div>
          <el-button type="primary" size="small" @click="addAction">新增</el-button>
          <el-button size="small">批量操作</el-button>
        </div>
        <div class="head-info">
          <el-radio-group v-model="radio" size="small">
            <el-radio-button label="全部"/>
            <el-radio-button label="上架"/>
            <el-radio-button label="正在上架"/>
            <el-radio-button label="下架"/>
          </el-radio-group>
          <el-input size="small" placeholder="搜索渠道名称/产品名称/联系人" class="input-with-select search-icon">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
      </div>
      <div class="table-info">
        <el-table
          ref="multipleTable"
          :data="bankList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="left" width="55"/>
          <el-table-column prop="id" align="left" label="产品编号"/>
          <el-table-column prop="name" align="left" label="产品名称" />
          <el-table-column prop="code" align="left" label="银行代码" />
          <el-table-column
            align="left"
            label="银行logo">
            <template slot-scope="scope">
              <img :src="scope.row.logo_url" class="bank-logo">
            </template>
          </el-table-column>
          <el-table-column align="left" prop="show_order_count" label="申请基数"/>
          <el-table-column align="left" prop="sort" label="排序"/>
          <el-table-column
            align="left"
            label="状态"
            width="90">
            <template slot-scope="scope">
              <em :class="{'state-point': true, red: scope.row.status_text === '已下线', gray: scope.row.status_text === '即将开放'}"/><i>{{ scope.row.status_text }}</i>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="340">
            <template slot-scope="scope" width="340">
              <el-button size="small" @click="changeState(scope.row, scope.$index)">状态</el-button>
              <el-button size="small" @click="bindAction(scope.row)">绑定渠道</el-button>
              <el-button
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                class="btn"
                size="small"
                type="danger"
                @click="delAction(scope.$index, scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 绑定渠道弹窗 -->
      <el-dialog :visible.sync="channelAlert" title="绑定渠道">
        <el-table :data="channelsList" class="table">
          <el-table-column property="channel_id" label="序号"/>
          <el-table-column property="channel_name" label="渠道名称"/>
          <el-table-column property="earning_amount" label="渠道价格"/>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.is_bind == 1" size="small" class="btn">已选择</el-button>
              <el-button v-if="scope.row.is_bind == 0" size="small" type="primary" @click="selectChannel(scope.row)">选 择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="sureAction">确 定</el-button>
          <el-button size="small" @click="channelAlert = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 状态弹窗 -->
      <el-dialog :visible.sync="stateAlert" title="修改银行状态" class="dialog">
        <el-form :model="form">
          <el-form-item class="el-dialog__body" label="修改状态">
            <el-select v-model="status" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="changeStateSubmit">确认</el-button>
          <el-button size="small" @click="stateAlert = false">取消</el-button>
        </div>
      </el-dialog>
      <footbar/>
    </div>
  </div>
</template>
<script>
import Footbar from '@/components/pagination/index.vue'
import { getGoodsBankList, delBank, getStatusList, setBankStatus, getBankBindChannelList } from '@/api/goods'
export default {
  components: {
    Footbar
  },
  data () {
    return {
      bankList: [],
      multipleSelection: [],
      radio: '全部',
      channelAlert: false,
      channelsList: [],
      stateAlert: false,
      form: {
        state: ''
      },
      statusIndex: '', // 编辑状态时选中的那行的index
      statusList: [],
      status: '',
      statusId: ''
    }
  },
  watch: {
    status (val, oldVal) {
      console.log(val)
    }
  },
  created () {
    // 初始化银行列表
    getGoodsBankList().then(res => {
      // console.log(res.data.data)
      this.bankList = res.data.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    addAction () {
      this.$router.push({ name: 'addBank', params: { from: '银行' } })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit (index, info) {
      console.log('点击了编辑第', index, info)
    },
    bindAction (row) {
      getBankBindChannelList(row.id).then(res => {
        console.log(res.data.data)
        this.channelsList = res.data.data
      }).catch(err => {
        console.log(err)
      })
      this.channelAlert = true
    },
    selectChannel (row) {
      console.log(row)
      this.channelAlert = false
    },
    sureAction () {
      this.channelAlert = false
    },
    // 点击状态
    changeState (data, index) {
      getStatusList(data, index).then(res => {
        // console.log(res.data.data)
        this.statusList = res.data.data
        this.status = data.status_text
        this.statusIndex = index
        this.statusId = data.id
        this.stateAlert = true
      }).catch(err => {
        console.log(err)
      })
    },
    // 状态弹窗确认
    changeStateSubmit () {
      if (this.statusId !== '') {
        setBankStatus(this.statusId, this.status).then(res => {
          if (res.data.message === 'success') {
            this.stateAlert = false
            this.$message({
              message: '恭喜你，状态修改成功',
              type: 'success'
            })
            switch (this.status) {
              case 0:
                this.bankList[this.statusIndex].status_text = '已下线'
                break
              case 1:
                this.bankList[this.statusIndex].status_text = '已上线'
                break
              case 2:
                this.bankList[this.statusIndex].status_text = '即将开放'
                break
            }
          } else {
            this.$message.error('修改失败')
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error('请选择一个状态')
      }
    },
    // 删除
    delAction (index, id) {
      delBank(id).then(res => {
        console.log(res)
        this.bankList.splice(index, 1)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    div {
      min-width: 200px;
      overflow: hidden;
    }
    .head-info {
      margin-bottom: 16px;
    }
    .search-icon {
      width: 300px;
      float: right;
      margin-left: 16px;
    }
  }
  .table-info{
    margin-bottom: 16px;
    .bank-logo{
      height: 32px;
      width: 32px;
    }
  }
  .state-point{
    display: inline-block;
    margin-right: 8px;
    height: 6px;
    width: 6px;
    border-radius: 100%;
    background: #52C41A;
  }
  .green{
    background: #52C41A;
  }
  .red{
    background: #F85E5E;
  }
  .gray{
    background: #c1c1c1;
  }
  .block{
    text-align: right;
  }
  .table{
    max-height: 500px;
    overflow: auto;
    .btn{
      width: 64px;
      border: 1px solid #4993FF;
      color: #FFF;
      color: #4993FF;
    }
  }
  .el-dialog__body{
    padding: 60px 30px;
  }
  .dialog .el-dialog{
    max-width: 880px !important;
  }
}
</style>
