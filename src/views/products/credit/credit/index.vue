<template>
  <div class="main">
    <tab :from="1"/>
    <div class="main-info">
      <div class="header">
        <div>
          <el-button type="primary" size="small" @click="addAction">新增</el-button>
          <!-- <el-button size="small">导出</el-button> -->
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
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="name" label="产品编号" width="120"/>
          <el-table-column prop="name" label="产品名称" />
          <el-table-column prop="address" label="渠道名称" show-overflow-tooltip/>
          <el-table-column label="平台佣金价格" />
          <el-table-column prop="name" label="下游佣金价格" />
          <el-table-column prop="address" label="平台二次佣金价格" show-overflow-tooltip/>
          <el-table-column label="下游二次佣金价格" width="120"/>
          <el-table-column prop="name" label="结算周期" />
          <el-table-column prop="name" label="状态" show-overflow-tooltip/>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope" width="280">
              <el-button size="small">状态</el-button>
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                class="btn"
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <footbar/>
    </div>
  </div>
</template>
<script>
import Tab from '@/views/products/component/Tab.vue'
import Footbar from '@/components/pagination/index.vue'
export default {
  components: {
    Tab,
    Footbar
  },
  data () {
    return {
      tableData3: [
        {
          date: '2016-05-03',
          name: '信用卡',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: [],
      radio: '全部',
      tabsList: ['银行卡发布', '信用卡发布'],
      selectIndex: 1,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    addAction () {
      this.$router.push({ name: 'release', params: { from: '信用卡' } })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit (index, info) {
      console.log('银行编辑第', index, info)
    }
  }
}
</script>
<style lang="scss" scoped>
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
  }
  .block{
    text-align: right;
  }
}
</style>
