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
          ref="smsTable"
          :data="smsLists"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="provider_name" label="服务商" align="left"/>
          <el-table-column label="状态" align="left">
            <template slot-scope="scope">
              <div :class="{'open': scope.row.status === 1}">{{ scope.row.status === 1 ? '启用中' : '关闭' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" align="left">
            <template slot-scope="scope">
              <el-switch
                :disabled="!scope.row.details.id"
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
        <div class="form-box">
          <el-form
            :model="editData"
            status-icon
            :rules="formRules"
            ref="editForm"
            label-width="140px"
            class="form">
            <el-form-item label="AccessKey ID" prop="access_key_id">
              <el-input v-model="editData.access_key_id" autocomplete="off" size="small"/>
            </el-form-item>
            <el-form-item label="Access Key Secret" prop="access_key_secret">
              <el-input v-model="editData.access_key_secret" autocomplete="off" size="small"/>
            </el-form-item>
            <el-form-item label="签名名称" prop="sign_name">
              <el-input v-model="editData.sign_name" autocomplete="off" size="small"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="savaConfig('editForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BonusHeadBar from '@/views/setting/components/headBar.vue'
import { getSmsConfigList, changeSmsConfigStatus, editSmsConfig } from '@/api/setting'

export default {
  components: {
    BonusHeadBar
  },
  data () {
    return {
      header: {
        selectType: 'smsInterface',
        list: [
          {
            text: '短信接口列表',
            type: 'smsInterface'
          }
        ]
      },
      smsLists: [],
      currentRow: null,
      currentIndex: 0,
      editData: {
        provider_id: '',
        access_key_id: '',
        access_key_secret: '',
        sign_name: ''
      },
      formRules: {
        access_key_id: [
          { required: true, message: '请输入AccessKey ID', trigger: 'blur' }
        ],
        access_key_secret: [
          { required: true, message: '请输入Access Key Secret', trigger: 'blur' }
        ],
        sign_name: [
          { required: true, message: '请输入签名名称', trigger: 'blur' },
          { min: 4, max: 10, message: '长度为 4 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  watch: {
    currentRow (val) {
      this.editData.id = val && val.id !== undefined ? val.id : ''
      this.editData.provider_id = val && val.provider_id !== undefined ? val.provider_id : ''
      this.editData.access_key_id = val && val.details && val.details.access_key_id !== undefined ? val.details.access_key_id : ''
      this.editData.access_key_secret = val && val.details && val.details.access_key_secret !== undefined ? val.details.access_key_secret : ''
      this.editData.sign_name = val && val.details && val.details.sign_name !== undefined ? val.details.sign_name : ''
    }
  },
  methods: {
    handleCurrentChange (item) {
      this.$refs['editForm'].resetFields()
      this.currentRow = item
      for (let i = 0; i < this.smsLists.length; i++) {
        if (item.id === this.smsLists[i].id) {
          this.currentIndex = i
          break
        }
      }
    },
    getList () {
      this.smsLists.length = 0
      getSmsConfigList().then(res => {
        if (res.data && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.smsLists = res.data.data
            // 第一行选中
            this.$nextTick(() => {
              this.$refs.smsTable.setCurrentRow(this.smsLists[this.currentIndex])
            })
          } else {
            this.$message({
              message: '暂无服务商数据',
              type: 'warning'
            })
          }
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取服务商数据失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeStatus (e, item) {
      changeSmsConfigStatus({
        provider: item.provider_id
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.getList()
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
    savaConfig (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认是否保存，点击保存立即生效?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            editSmsConfig({
              id: this.editData.id,
              access_key_id: this.editData.access_key_id,
              access_key_secret: this.editData.access_key_secret,
              sign_name: this.editData.sign_name,
              provider: this.editData.provider_id
            }).then(res => {
              if (res.data && res.data.code === 0) {
                this.getList()
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
        } else {
          return false
        }
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
      .form-box{
        padding: 20px 30px 0 10px;
        overflow: hidden;
        .form{
          .el-form-item{
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
  >>> .el-form-item__label{
    padding-right: 15px;
    font-size: 14px;
    color: #333;
  }
</style>
