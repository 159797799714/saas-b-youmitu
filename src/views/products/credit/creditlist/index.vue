<template>
  <div class="main">
    <div class="info">信用卡分类</div>
    <div class="main-info">
      <div class="header">
        <div>
          <!-- <el-button type="primary" size="small" @click="addAlert">新增分类</el-button> -->
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
          <el-table-column prop="name" label="分类名称" width="120"/>
          <el-table-column prop="remark" label="分类描述" show-overflow-tooltip/>
          <el-table-column prop="id" label="信用卡数量"/>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope" width="220">
              <el-button size="small">查看产品</el-button>
              <el-button class="btn" size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="editAlert" title="编辑分类">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="分类名称">
          <el-input v-model="form.name" autofocus="true"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="分类描述">
          <el-input v-model="form.remark"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCreditCategory } from '@/api/goods'
export default {
  data () {
    return {
      creditList: [],
      editAlert: false,
      editIndex: '',
      multipleSelection: [],
      radio: '全部',
      form: {
        name: '',
        remark: ''
      },
      formLabelWidth: '80px'
    }
  },
  created () {
    // 初始化信用卡列表
    getCreditCategory().then(res => {
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
      console.log('点击了新增')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleEdit (index, info) {
      console.log('编辑第', index, info)
      this.editIndex = index
      this.editAlert = true
    },
    // 编辑弹窗操作
    formToNull () {
      this.form = {
        name: '',
        remark: ''
      }
    },
    cancel () {
      console.log('点击了取消')
      this.editAlert = false
      this.formToNull()
    },
    sure () {
      console.log(this.form)
      this.creditList[this.editIndex].name = this.form.name
      this.creditList[this.editIndex].remark = this.form.remark
      this.formToNull() // 清空输入框
      this.cancel() // 关闭弹窗
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
  }
  .block{
    text-align: right;
  }
}
</style>
