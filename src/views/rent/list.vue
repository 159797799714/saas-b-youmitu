<template>
  <div class="app-container">
    <div class="search">
      <div class="all-search">
        <el-input v-model="form.searchAll" placeholder="综合搜索"/>
      </div>
      <div class="time-search">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="按时间">
            <el-col :span="11">
              <el-date-picker v-model="form.date1" type="date" placeholder="请选择添加开始时间" style="width: 100%;"/>
            </el-col>
            <el-col :span="2" class="line">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="form.date2" type="date" placeholder="请添加结束时间" style="width: 100%;"/>
            </el-col>
          </el-form-item>
      </el-form></div>
      <div class="search-btn">
        <el-button type="primary">查询</el-button>
        <el-button type="info" plain>添加</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="status" label="用户状态" width="100"/>
      <el-table-column prop="id" label="ID" width="100"/>
      <el-table-column prop="company" label="公司名称" width="180"/>
      <el-table-column prop="username" label="登录账号"/>
      <el-table-column prop="contact_name" label="联系人"/>
      <el-table-column prop="contact_telephone" label="联系电话" width="180"/>
      <el-table-column prop="created_at" label="创建时间"/>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)" > 编辑 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" >
      <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" :total="400" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      form: {
        searchAll: '',
        date1: '',
        date2: ''
      },
      tableData: [{
        status: 1,
        id: 54545,
        company: '深圳xxx有限责任公司',
        username: 'ymt_saas_admin',
        contact_name: 'john',
        contact_telephone: '15979779714',
        created_at: '2019-01-14 10:35'
      }, {
        status: 2,
        id: 54545,
        company: '深圳xxx有限责任公司',
        username: 'ymt_saas_admin',
        contact_name: 'john',
        contact_telephone: '15979779714',
        created_at: '2019-01-14 10:35'
      }, {
        status: 2,
        id: 54545,
        company: '深圳xxx有限责任公司',
        username: 'ymt_saas_admin',
        contact_name: 'john',
        contact_telephone: '15979779714',
        created_at: '2019-01-14 10:35'
      }, {
        status: 2,
        id: 54545,
        company: '深圳xxx有限责任公司',
        username: 'ymt_saas_admin',
        contact_name: 'john',
        contact_telephone: '15979779714',
        created_at: '2019-01-14 10:35'
      }, {
        status: 2,
        id: 54545,
        company: '深圳xxx有限责任公司',
        username: 'ymt_saas_admin',
        contact_name: 'john',
        contact_telephone: '15979779714',
        created_at: '2019-01-14 10:35'
      }, {
        status: 2,
        id: 54545,
        company: '深圳xxx有限责任公司',
        username: 'ymt_saas_admin',
        contact_name: 'john',
        contact_telephone: '15979779714',
        created_at: '2019-01-14 10:35'
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.line{
  text-align: center;
}
.search{
  display: flex;
  .search-btn{
    margin-left: 20px;
    width: 200px;
  }
}
.btn{
  text-align: center;
}
.pagination{
  margin-top: 20px;
  text-align: right;
}
</style>
