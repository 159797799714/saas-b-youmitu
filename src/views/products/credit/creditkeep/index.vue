<template>
  <div class="main">
    <div class="info">信用卡</div>
    <div class="main-info">
      <div class="header">
        <div>
          <el-button type="primary" size="small" @click="addAction">新增</el-button>
          <el-button size="small">批量操作</el-button>
        </div>
        <div class="head-info">
          <el-input size="small" placeholder="搜索渠道名称/产品名称/联系人" class="input-with-select search-icon">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
      </div>
      <div class="table-info">
        <el-table
          ref="multipleTable"
          :data="creditList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column align="left" prop="id" label="产品编号"/>
          <el-table-column align="left" prop="name" label="卡号名称" show-overflow-tooltip/>
          <el-table-column
            align="left"
            label="卡片图片">
            <template slot-scope="scope">
              <img :src="scope.row.logo_url" class="card-img">
            </template>
          </el-table-column>
          <el-table-column align="left" prop="bank_id" label="所属银行"/>
          <el-table-column align="left" prop="name" label="所属分类" show-overflow-tooltip/>
          <el-table-column align="left" prop="sort" label="排序"/>
          <el-table-column align="left" label="操作" width="180">
            <template slot-scope="scope" width="180">
              <el-button
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button class="btn" size="small" type="danger" @click="delAction(scope.$index, scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <footbar/>
    </div>
  </div>
</template>
<script>
import Footbar from '@/components/pagination/index.vue'
import { getCreditList, delCredit } from '@/api/goods'
export default {
  components: {
    Footbar
  },
  data () {
    return {
      creditList: [],
      multipleSelection: [],
      radio: '全部'
    }
  },
  created () {
    // 初始化银行列表
    getCreditList().then(res => {
      // console.log(res.data.data)
      this.creditList = res.data.data
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
      this.$router.push({ name: 'addCredit', params: { from: '信用卡' } })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit (index, info) {
      console.log('银行编辑第', index, info)
    },
    delAction (index, id) {
      delCredit(id).then(res => {
        console.log(res.data.data)
        this.creditList.splice(index, 1)
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
    .card-img{
      height: 32px;
      width: 32px;
    }
  }
  .block{
    text-align: right;
  }
}
</style>
