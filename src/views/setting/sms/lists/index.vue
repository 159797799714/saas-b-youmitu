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
          <el-table-column prop="template_name" label="触发事件" align="left"/>
          <el-table-column label="模板编号" align="left">
            <template slot-scope="scope">
              {{ scope.row.details.template_verify_code }}
            </template>
          </el-table-column>
          <el-table-column label="短信内容" align="left" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.details.content? scope.row.details.content:scope.row.template_content }}
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
        <div class="edit">
          <div class="title">编辑短信内容</div>
          <div class="form">
            <div class="item">
              <div class="box">
                <el-input
                  ref="moduleNumber"
                  size="small"
                  v-model="editData.template_verify_code"
                  placeholder="请输入短信模板编号"/>
              </div>
            </div>
            <div class="item">
              <div class="box">
                <textarea
                  ref="editTextarea"
                  rows="6"
                  v-model="editData.content"
                  placeholder="请输入短信内容"/>
              </div>
            </div>
            <div class="item">
              <div class="box">
                <el-button type="primary" size="small" @click="savaConfig">保存</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="opeartion">
          <el-table
            :data="moduleLists"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="variable" label="参数" align="left" :show-overflow-tooltip="true"/>
            <el-table-column prop="name" label="名称" align="left"/>
            <el-table-column label="操作" align="left">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="text"
                  @click="insert(scope.row)">插入</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BonusHeadBar from '@/views/setting/components/headBar.vue'
import { getSmsTemplateTenantList, changeSmsTemplateStatus, getSmsTemplateVariableList, addSmsTemplate } from '@/api/setting'

export default {
  components: {
    BonusHeadBar
  },
  data () {
    return {
      header: {
        selectType: 'repay',
        list: [
          {
            text: '智能代还',
            type: 'repay'
          }
        ]
      },
      smsLists: [],
      currentRow: null,
      currentIndex: 0,
      editData: {
        template_verify_code: '',
        use_type: '',
        content: ''
      },
      moduleLists: []
    }
  },
  created () {
    this.getSmsList()
    this.getModuleList()
  },
  watch: {
    currentRow (val) {
      this.editData.template_verify_code = val && val.details && val.details.template_verify_code !== undefined ? val.details.template_verify_code : ''
      this.editData.use_type = val && val.template_id !== undefined ? val.template_id : ''
      this.editData.content = val && val.details && val.details.content !== undefined ? val.details.content : ''
    }
  },
  methods: {
    handleCurrentChange (item) {
      this.currentRow = item
      for (let i = 0; i < this.smsLists.length; i++) {
        if (item.id === this.smsLists[i].id) {
          this.currentIndex = i
          break
        }
      }
    },
    getSmsList () {
      this.smsLists.length = 0
      getSmsTemplateTenantList().then(res => {
        if (res.data && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.smsLists = res.data.data
            // 第一行选中
            this.$nextTick(() => {
              this.$refs.smsTable.setCurrentRow(this.smsLists[this.currentIndex])
            })
          } else {
            this.$message({
              message: '暂无短信模版',
              type: 'warning',
              duration: 500
            })
          }
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取短信模版失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeStatus (e, item) {
      changeSmsTemplateStatus({
        use_type: item.details.use_type
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.getSmsList()
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
    getModuleList () {
      this.moduleLists.length = 0
      getSmsTemplateVariableList().then(res => {
        if (res.data && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.moduleLists = res.data.data
          } else {
            this.$message({
              message: '暂无默认模版',
              type: 'warning'
            })
          }
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取默认模版失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    insert (item) {
      let start = this.$refs.editTextarea.selectionStart || this.$refs.editTextarea.value.length
      let value = this.$refs.editTextarea.value
      this.editData.content = value.substring(0, start) + item.variable + value.substring(start)
      this.$nextTick(() => {
        if (this.$refs.editTextarea.selectionStart !== undefined) this.$refs.editTextarea.selectionStart = start + item.variable.length
        if (this.$refs.editTextarea.selectionEnd !== undefined) this.$refs.editTextarea.selectionEnd = start + item.variable.length
        this.$refs.editTextarea.focus()
      })
    },
    savaConfig () {
      if (this.editData.template_verify_code.length <= 0) {
        this.$message({
          message: '请输入短信模版编号',
          type: 'warning'
        })
        this.$refs.moduleNumber.focus()
        return
      }
      if (this.editData.content.length <= 0) {
        this.$message({
          message: '请输入短信内容',
          type: 'warning'
        })
        this.$refs.editTextarea.focus()
        return
      }
      this.$confirm('确认是否保存，点击保存立即生效?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        addSmsTemplate({
          template_verify_code: this.editData.template_verify_code,
          use_type: this.editData.use_type,
          content: this.editData.content
        }).then(res => {
          if (res.data && res.data.code === 0) {
            this.getSmsList()
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
      .el-table{
        cursor: pointer;
      }
      .open{
        color: #4993FF;
      }
    }
    .details-right{
      width: 440px;
      .edit{
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 20px;
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
              width: 130px;
              margin-right: 15px;
              font-size: 14px;
              color: #333;
              text-align: right;
            }
            .box{
              flex-grow: 1;
              textarea{
                display: block;
                resize: none;
                height: 94px;
                padding: 5px 15px;
                line-height: 1.5;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                width: 100%;
                font-size: inherit;
                color: #606266;
                background-color: #FFF;
                background-image: none;
                border: 1px solid #DCDFE6;
                border-radius: 4px;
                -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                -o-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                &:focus{
                  outline: 0;
                  border-color: #409EFF;
                }
                &::placeholder{
                  color: #C0C4CC;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
