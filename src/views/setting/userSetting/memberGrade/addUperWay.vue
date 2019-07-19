<template>
  <div class="main">
    <div class="info">
      <BonusHeadBar
        :selected="header.selectType"
        :list="header.list"/>
    </div>
    <div class="box">
      <div class="content">
        <div class="red-info">注：满足以下条件时，可升级成功</div>
        <div class="form">
          <el-form ref="form">
            <div class="row">
              <el-form-item label="升级名称" size="small">
                <el-input v-model="wayName"/>
              </el-form-item>
            </div>
            <div v-for="(item, index) in eventArr" :key="item.id" class="row">
              <el-form-item label="当用户进行" size="small">
                <el-select
                  v-model="item.name"
                  placeholder="请选择分类"
                  @change="(val) => typeChange(val, index)">
                  <el-option
                    v-if="sitem.id === item.id || eventIdArr.indexOf(sitem.id) === -1"
                    v-for="sitem in uperEventList"
                    :key="sitem.name"
                    :value="sitem.name"/>
                </el-select>
              </el-form-item>
              <el-form-item v-if="item.column" v-for="colItem in item.column" :key="colItem.param" size="small">
                <el-select
                  v-if="colItem.type === 'option'"
                  v-model="colItem.userSelected"
                  placeholder="请选择分类">
                  <el-option
                    v-for="optionItem in colItem.option"
                    :key="optionItem.name"
                    :label="optionItem.name"
                    :value="optionItem.id"/>
                </el-select>
                <el-input v-else v-model="colItem.userInput" maxlength="6">
                  <template slot="append">{{ colItem.unit }}</template>
                </el-input>
              </el-form-item>
              <el-button v-if="eventIdArr.length > 1" class="btn btn-delete" size="small" icon="el-icon-remove-outline" @click="removeItem(index)"></el-button>
            </div>
            <div class="row">
              <el-form-item v-if="eventIdArr.length < uperEventList.length" label="新增条件" size="small">
                <el-button class="btn btn-add" icon="el-icon-circle-plus-outline" size="small" @click="addItemAction"></el-button>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item size="small">
                <el-button class="btn sure-btn" type="primary" size="small" @click="submitAction">确定</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BonusHeadBar from '@/views/setting/components/headBar.vue'
import { getUperEventList, addUperWay, editUperWay } from '@/api/setting'

export default {
  components: {
    BonusHeadBar
  },
  data () {
    return {
      header: {
        selectType: 'condition',
        list: [
          {
            text: '升级条件管理',
            type: 'condition'
          }
        ]
      },
      levelId: '',         // 升级方式对应的会员等级id
      wayId: '',           // 编辑升级方式的id
      wayList: '',         // 编辑升级方式
      wayName: '',         // 升级方式自定义的名字
      uperEventList: [],   // 升级事件列表
      eventArr: [],        // 用户选择的事件列表
      eventIdArr: []       // 用户选择的事件列表id
    }
  },
  created () {
    this.levelId = this.$route.query.id
    this.wayId = this.$route.query.wayId ? this.$route.query.wayId : ''
    this.wayList = this.$route.query.data ? JSON.parse(this.$route.query.data) : ''
    this.wayName = this.$route.query.name ? this.$route.query.name : ''
    if (this.wayList) this.header.list[0].text = '编辑条件管理'
    this.getUperEvent()
  },
  methods: {
    getUperEvent () {
      getUperEventList().then(res => {
        if (res.data && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.uperEventList = this.objDeepCopy(res.data.data)
            this.uperEventList.forEach(item => {
              if (item.column) {
                item.column.forEach(sitem => {
                  if (sitem.type === 'option') {
                    sitem.userSelected = sitem.option[0].id
                  } else {
                    sitem.userInput = ''
                  }
                })
              }
            })
            if (!this.wayList) {
              this.eventIdArr.push(this.uperEventList[0].id)
              this.$set(this.eventArr, 0, this.objDeepCopy(this.uperEventList[0]))
            } else {
              for (const key in this.wayList) {
                this.eventIdArr.push(parseInt(key))
                for (let i = 0; i < this.uperEventList.length; i++) {
                  if (parseInt(key) === this.uperEventList[i].id) {
                    if (this.uperEventList[i].column) {
                      for (let j = 0; j < this.uperEventList[i].column.length; j++) {
                        if (this.uperEventList[i].column[j].type === 'option') {
                          this.uperEventList[i].column[j].userSelected = parseInt(this.wayList[key].type)
                        } else if (this.uperEventList[i].column[j].type === 'float') {
                          this.uperEventList[i].column[j].userInput = (parseInt(this.wayList[key][this.uperEventList[i].column[j].param]) / 100).toFixed(2)
                        } else {
                          this.uperEventList[i].column[j].userInput = parseInt(this.wayList[key][this.uperEventList[i].column[j].param])
                        }
                      }
                    }
                    this.$set(this.eventArr, this.eventArr.length, this.objDeepCopy(this.uperEventList[i]))
                  }
                }
              }
            }
          } else {
            // this.$message({
            //   message: '暂无用户升级列表',
            //   type: 'warning'
            // })
          }
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取用户升级列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    typeChange (val, index) {
      for (let i = 0; i < this.uperEventList.length; i++) {
        if (val === this.uperEventList[i].name) {
          this.$set(this.eventArr, index, this.objDeepCopy(this.uperEventList[i]))
          this.eventIdArr[index] = this.uperEventList[i].id
          break
        }
      }
    },
    addItemAction () {
      for (let i = 0; i < this.uperEventList.length; i++) {
        if (this.eventIdArr.indexOf(this.uperEventList[i].id) === -1) {
          this.$set(this.eventArr, this.eventArr.length, this.objDeepCopy(this.uperEventList[i]))
          this.eventIdArr.push(this.uperEventList[i].id)
          break
        }
      }
    },
    removeItem (index) {
      this.eventArr.splice(index, 1)
      this.eventIdArr.splice(index, 1)
    },
    submitAction () {
      if (this.wayName.length <= 0) {
        this.$message({
          message: `请输入定义的升级名称`,
          type: 'warning',
          duration: 500
        })
        return
      }
      let isErr = false
      let formData = []
      for (let i = 0; i < this.eventArr.length; i++) {
        let name = this.eventArr[i].name
        if (this.eventArr[i].column) {
          let obj = {}
          obj.id = this.eventArr[i].id
          obj.param = {}
          for (let j = 0; j < this.eventArr[i].column.length; j++) {
            if (this.eventArr[i].column[j].type !== 'option') {
              obj.param[this.eventArr[i].column[j].param] = this.eventArr[i].column[j].userInput
              if (this.eventArr[i].column[j].userInput.length <= 0) {
                this.$message({
                  message: `请输入${name}的${this.eventArr[i].column[j].desc}`,
                  type: 'warning'
                })
                isErr = true
              }
              if (this.eventArr[i].column[j].type === 'float') {
                obj.param[this.eventArr[i].column[j].param] = this.eventArr[i].column[j].userInput * 100
                if (!/^\d+(\.\d{0,10})?$/.test(this.eventArr[i].column[j].userInput)) {
                  this.$message({
                    message: `${name}的${this.eventArr[i].column[j].desc}的值请输入整数或者小数`,
                    type: 'warning'
                  })
                  isErr = true
                }
              }
              if (this.eventArr[i].column[j].type === 'int' && !/^\d+$/.test(this.eventArr[i].column[j].userInput)) {
                this.$message({
                  message: `${name}的${this.eventArr[i].column[j].desc}的值请输入整数`,
                  type: 'warning'
                })
                isErr = true
              }
            } else {
              obj.param[this.eventArr[i].column[j].param] = this.eventArr[i].column[j].userSelected
            }
          }
          formData.push(obj)
        } else {
          formData.push({
            id: this.eventArr[i].id
          })
        }
      }
      if (isErr) return
      let data = {}
      if (!this.wayList) {
        // 新增
        addUperWay({
          user_level_id: this.levelId,
          name: this.wayName,
          config_json: formData
        }).then(res => {
          if (res.data && res.data.code === 0) {
            this.$message({
              message: res.data && res.data.message ? res.data.message : '成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$router.go(-1)
              }
            })
          } else {
            this.$message.error(res.data && res.data.message ? res.data.message : '失败')
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        // 编辑
        editUperWay({
          id: this.wayId,
          user_level_id: this.levelId,
          name: this.wayName,
          config_json: formData
        }).then(res => {
          if (res.data && res.data.code === 0) {
            this.$message({
              message: res.data && res.data.message ? res.data.message : '成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.$router.go(-1)
              }
            })
          } else {
            this.$message.error(res.data && res.data.message ? res.data.message : '失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    objDeepCopy (source) {
      let _this = this
      let sourceCopy = source instanceof Array ? [] : {}
      for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? _this.objDeepCopy(source[item]) : source[item]
      }
      return sourceCopy
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
  .box{
    flex: 1;
    padding: 16px;
    padding-bottom: 0px;
    display: flex;
    background: #ECF0F5;
    .content{
      flex: 1;
      padding: 14px 26px;
      background: #fff;
      .red-info{
        margin-bottom: 34px;
        color: #F85E5E;
        line-height: 20px;
      }
      .form{
        .row{
          display: flex;
          margin-bottom: 30px;
        }
        .btn-add{
          height: 32px;
          padding: 0;
          font-size: 18px;
          border: 0;
        }
        .btn-delete{
          box-sizing: border-box;
          height: 32px;
          padding: 4px;
          font-size: 18px;
          border: 0;
        }
      }
      .sure-btn{
        margin-top: 36px;
        margin-left: 94px;
      }
    }
  }
}
</style>
<style scoped>
.el-form-item{
  margin-bottom: 0;
  margin-right: 20px;
  max-width: 364px;
}
.el-form-item >>> .el-form-item__label{
  width: 84px;
  color: #333;
  text-align: right;
  font-weight: 600;
}
>>> .el-input{
  min-width: 196px;
}
</style>
