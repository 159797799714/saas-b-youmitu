<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="main-info">
      <div class="header">
        <div>
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">新增</el-button>
        </div>
        <div class="head-info" @click="handleEdit(1, [])">
          <el-input size="small" placeholder="搜索银行名称代码查询" class="input-with-select search-icon">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
      </div>
      <div class="table-info">
        <el-table
          ref="multipleTable"
          :data="linkList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column align="left" prop="id" label="序号"/>
          <el-table-column align="left" prop="bank_name" label="银行名称"/>
          <el-table-column align="left" prop="bank_code" label="银行代码"/>
          <el-table-column align="left" prop="settlement_cycle" label="结算周期"/>
          <el-table-column align="left" prop="earning_amount" label="上游佣金价格" show-overflow-tooltip/>
          <el-table-column label="操作" width="290">
            <template slot-scope="scope" width="290">
              <el-button size="small" @click="setAgentPrice(scope.$index)">设置代理价格</el-button>
              <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button class="btn" size="small" type="danger" @click="delAction(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <footbar/>
    </div>
    <editAlert v-if="Alert" :from="from" @editAlert="editAlertAction"/>
  </div>
</template>
<script>
import Footbar from '@/components/pagination/index.vue'
import EditAlert from '@/views/products/credit/upper/editAlert.vue'
import { getLink, delLink } from '@/api/goods'
export default {
  components: {
    Footbar,
    EditAlert
  },
  data () {
    return {
      linkList: [
        {
          id: 10,
          bank_name: '我是谁',
          bank_code: '20',
          settlement_cycle: '2周'
        }
      ],
      multipleSelection: [],
      radio: '全部',
      tabs: ['银行统计', '信用卡统计'],
      selectIndex: 0,
      Alert: false,
      from: 0
    }
  },
  created () {
    // 初始化查看银行，链接列表
    getLink(this.$route.params.id).then(res => {
      console.log(res)
      // this.linkList = res.data.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    selextTab (index) {
      this.selectIndex = index
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    goback () {
      this.$router.go(-1)
    },
    setAgentPrice (index) {
      this.from = 1
      this.Alert = true
    },
    // 编辑
    handleEdit (index, row) {
      this.from = 0
      this.Alert = true
    },
    // 父组件接受子组件的自定义事件
    editAlertAction (editAlert) {
      console.log('接收到了编辑弹窗的', editAlert)
      this.Alert = false
    },
    delAction (row) {
      delLink(row).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.header {
    display: flex;
    justify-content: space-between;
    div {
      min-width: 200px;
      overflow: hidden;
      .tab-item{
        width: 90px;
        height: 32px;
        margin-right: 20px;
        font-weight: 500;
        text-align: center;
        display: inline-block;
        &:hover{
          color: #4993FF;
        }
      }
      .actived{
        border-bottom: 2px solid #4993FF;
        color: #4993FF;
      }
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
  .bank-logo{
      height: 32px;
      width: 32px;
    }
</style>
