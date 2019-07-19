<template>
  <div class="main">
    <div class="info">上游渠道</div>
    <div class="main-info">
      <div class="header">
        <div>
          <el-button type="primary" size="small" @click="addAlert(form)">新增</el-button>
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
          :data="upperList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="id" label="序号" align="left" width="120"/>
          <el-table-column prop="name" label="上游渠道名称" align="left"/>
          <el-table-column prop="contact_name" label="联系人" align="left" show-overflow-tooltip/>
          <el-table-column prop="contact_mobile" label="手机号" align="left"/>
          <el-table-column prop="id" label="已添加银行数量" align="left" show-overflow-tooltip/>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope" width="280">
              <el-button size="small" @click="seeBank(scope.row)">查看银行</el-button>
              <el-button
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                class="btn"
                size="small"
                type="danger"
                @click="delAction(scope.$index,scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <footbar/>
      <!-- 新增渠道弹窗 -->
      <el-dialog :visible.sync="Visible" :title="title">
        <el-form ref="form" :model="form">
          <el-form-item
            :rules="[
              { required: true }
            ]"
            label="选择渠道：">
            <el-select v-model="form.code" placeholder="请选择">
              <el-option
                v-for="item in channelList"
                :key="item.code"
                :label="item.name"
                :value="item.code"/>
            </el-select>
          </el-form-item>
          <el-form-item
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '联系人姓名不能为空' }
            ]"
            prop="contact_name"
            label="联系人：">
            <el-input v-model="form.contact_name" maxlength="10"/>
          </el-form-item>
          <el-form-item
            :rules="[
              { required: true, message: '电话不能为空' }
            ]"
            prop="contact_mobile"
            label="联系电话：">
            <el-input v-model.number="form.contact_mobile" type="tel" maxlength="11"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="cancel">取 消</el-button>
          <el-button v-if="title === '新增渠道'" size="small" type="primary" @click="sureAddAction">确 定</el-button>
          <el-button v-if="title === '编辑渠道'" size="small" type="primary" @click="sureEditAction">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Footbar from '@/components/pagination/index.vue'
import { getChannelList, delChannel, addChannel, updateChannel, getChannelCodeList } from '@/api/goods'
export default {
  components: {
    Footbar
  },
  data () {
    return {
      upperList: [],
      multipleSelection: [],
      Visible: false,
      title: '',
      form: {
        code: '',
        contact_name: '',
        contact_mobile: ''
      },
      formLabelWidth: '92px',
      channelList: []
    }
  },
  created () {
    // 初始化银行列表
    getChannelList().then(res => {
      // console.log(res.data.data)
      this.upperList = res.data.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    // 获取渠道代码列表
    getCode () {
      getChannelCodeList().then(res => {
        this.channelList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 更新渠道列表
    ChannelList () {
      getChannelList().then(res => {
        this.upperList = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    // 编辑
    handleEdit (index, info) {
      this.form = info
      this.getCode()
      this.title = '编辑渠道'
      this.Visible = true
    },
    seeBank (row) {
      this.$router.push({ name: 'seeBank', params: { id: row.id } })
    },
    addAlert (form) {
      this.form = {
        code: '',
        contact_name: '',
        contact_mobile: ''
      }
      this.getCode()
      this.Visible = true
      this.title = '新增渠道'
    },
    cancel () {
      this.Visible = false
    },
    // 添加渠道
    sureAddAction () {
      if (this.form.code !== '' && this.form.contact_name !== '' && this.form.contact_mobile !== '') {
        addChannel(this.form).then(res => {
          if (res.data.message === 'success') {
            this.$refs['form'].resetFields()
            this.$message({
              message: '恭喜你，添加渠道成功',
              type: 'success'
            })
            this.cancel()
            this.ChannelList()
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.$message({
          message: '请检查格式，每项都不能为空',
          type: 'warning'
        })
      }
    },
    // 删除渠道
    delAction (index, id) {
      delChannel(id).then(res => {
        this.upperList.splice(index, 1)
      }).catch(error => {
        console.log(error)
      })
    },
    // 编辑渠道
    sureEditAction () {
      updateChannel(this.form).then(res => {
        if (res.data.message === 'success') {
          this.$message({
            message: '恭喜你，渠道信息修改成功',
            type: 'success'
          })
          this.cancel()
          this.ChannelList()
        }
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
    border: 1px solid #E8E8E8;
    border-bottom: 0;
  }
}
</style>
