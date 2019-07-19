<template>
  <div class="main">
    <div class="info">
      <BonusHeadBar
        :selected="header.selectType"
        :list="header.list"/>
    </div>
    <div class="box">
      <div class="left-span">
        <el-button type="primary" class="add-roler" size="small" @click="addRolerPop">新增角色</el-button>
        <el-table
          ref="roleTable"
          :data="roleList"
          :border="false"
          tooltip-effect="dark"
          style="width: 100%"
          :show-header="false"
          highlight-current-row
          @current-change="handleCurrentChange">
          <el-table-column
            align="left"
            label="角色名称"
            prop="name"
            :show-overflow-tooltip="true"/>
          <el-table-column
            label="操作"
            width="90">
            <template slot-scope="scope">
              <div class="opera">
                <div v-if="scope.$index > 0" class="el-icon-download el-icon-download-up icon" @click.stop="sortRole('up', scope.$index)"/><div v-if="scope.$index < roleList.length - 1" class="el-icon-download icon" @click.stop="sortRole('down', scope.$index)"/><div class="el-icon-edit-outline icon" @click.stop="editRole(scope.row)"/><div class="el-icon-delete icon" @click.stop="deleteRole(scope.row.id)"/>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="right-span">
        <div class="right-head-title">升级条件</div>
        <div class="uper-btn"><el-button size="small" @click="gotoAddUpper">新增升级方式</el-button></div>
        <el-table
          ref="multipleTable"
          :data="uperway"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            align="left"
            prop="name"
            label="升级方式"/>
          <el-table-column
            align="left"
            prop="config_desc"
            label="升级内容"/>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="gotoEditUpper(scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="deleteUpper(scope.row.id)"
                >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增/编辑角色 -->
      <el-dialog :visible.sync="rolerAlert" :title="rolerEditType === 'add' ? '新增角色' : '编辑角色'" class="alert">
        <div class="row">
          <div class="item-info">
            <span class="star">*</span>
            <div class="words">角色名称：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="rolerForm.name" size="small"/>
          </div>
        </div>
        <div v-if="false" class="row">
          <div class="item-info">
            <span class="star">*</span>
            <div class="words">角色简称：</div>
          </div>
          <div class="item-detail">
            <el-input v-model="rolerForm.shorterName" size="small"/>
          </div>
        </div>
        <div class="row">
          <div class="item-info">
            <span class="star">*</span>
            <div class="words">是否可锁粉：</div>
          </div>
          <div class="item-detail item-detail-radio">
            <el-radio v-model="rolerForm.lock_child" :label="1">是</el-radio>
            <el-radio v-model="rolerForm.lock_child" :label="0">否</el-radio>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="rolerAlert = false">取 消</el-button>
          <el-button size="small" type="primary" @click="sureRoler">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 删除角色 -->
      <el-dialog :visible.sync="deleteAlert" title="删除角色" class="alert">
        <div class="warn">
          <p>请确认是否删除当前会员等级？</p>
          <p>如删除请选择当前删除代理层级下的用户归属</p>
        </div>
        <div class="row">
          <div class="item-info">
            <div class="words">选择归属：</div>
          </div>
          <div class="item-detail">
            <el-select v-model="replaceRoleId" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                v-if="item.id !== delRolerId"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="deleteAlert = false">取 消</el-button>
          <el-button size="small" type="primary" @click="delRolerAction">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BonusHeadBar from '@/views/setting/components/headBar.vue'
import { getRolerList, delRoler, addRoler, editToler, adjust, getUperWay, delUperWay } from '@/api/setting'

export default {
  components: {
    BonusHeadBar
  },
  data () {
    return {
      header: {
        selectType: 'level',
        list: [
          {
            text: '会员等级配置',
            type: 'level'
          }
        ]
      },
      selectIndex: 0,
      roleList: [],
      currentRow: null,
      currentIndex: 0,
      uperway: [],
      rolerAlert: false,
      rolerEditType: 'add',
      rolerForm: {
        id: '',
        name: '',
        shorterName: '',
        lock_child: 1
      },
      deleteAlert: false,
      delRolerId: '',         // 要删除的角色的等级id
      replaceRoleId: ''      // 删除角色需要替换的角色Id
    }
  },
  watch: {
    currentRow (val) {
      if (val && val.id !== undefined) {
        this.getUperWayList(this.currentRow.id)
      }
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      // 获取角色列表
      getRolerList().then(res => {
        if (res.data && res.data.code === 0) {
          if (res.data.data.length > 0) {
            this.roleList = res.data.data
            this.$nextTick(() => {
              this.$refs.roleTable.setCurrentRow(this.roleList[this.currentIndex])
            })
          } else {
            this.$message({
              message: '暂无角色列表',
              type: 'warning'
            })
          }
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取角色列表失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleCurrentChange (item) {
      this.currentRow = item
      for (let i = 0; i < this.roleList.length; i++) {
        if (item.id === this.roleList[i].id) {
          this.currentIndex = i
          break
        }
      }
    },
    getUperWayList (id) {
      // 获取对应角色升级条件
      getUperWay({
        user_level_id: id
      }).then(res => {
        this.uperway = []
        if (res.data && res.data.code === 0) {
          this.uperway = res.data.data
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取角色升级条件失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addRolerPop () {
      this.rolerEditType = 'add'
      this.rolerForm.id = ''
      this.rolerForm.name = ''
      this.rolerForm.shorterName = ''
      this.rolerForm.lock_child = 1
      this.rolerAlert = true
    },
    editRole (item) {
      // 修改会员名称
      this.rolerEditType = 'edit'
      this.rolerForm.id = item.id
      this.rolerForm.name = item.name
      this.rolerForm.shorterName = ''
      this.rolerForm.lock_child = item.lock_child
      this.rolerAlert = true
    },
    sureRoler () {
      if (this.rolerEditType === 'add') {
        // 新增角色
        addRoler({
          name: this.rolerForm.name,
          lock_child: this.rolerForm.lock_child
        }).then(res => {
          this.rolerAlert = false
          if (res.data && res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '新增成功',
              duration: 1000
            })
            this.getRoleList()
          } else {
            this.$message.error(res.data && res.data.message ? res.data.message : '新增失败')
          }
        }).catch(err => {
          this.rolerAlert = false
          this.$message.error(err)
        })
      } else {
        // 编辑角色
        editToler({
          id: this.rolerForm.id,
          name: this.rolerForm.name,
          lock_child: this.rolerForm.lock_child
        }).then(res => {
          this.rolerAlert = false
          if (res.data && res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '修改成功',
              duration: 1000
            })
            this.getRoleList()
          } else {
            this.$message.error(res.data && res.data.message ? res.data.message : '修改失败')
          }
        }).catch(err => {
          this.rolerAlert = false
          this.$message.error(err)
        })
      }
    },
    sortRole (type, index) {
      // 排序
      let arr = []
      for (let i = 0; i < this.roleList.length; i++) {
        arr.push(this.roleList[i].id)
      }
      switch (type) {
        case 'up':
          arr.splice(index, 1, ...arr.splice(index - 1, 1, arr[index]))
          this.currentIndex = index - 1
          break
        case 'down':
          arr.splice(index, 1, ...arr.splice(index + 1, 1, arr[index]))
          this.currentIndex = index + 1
          break
      }
      adjust({
        ids: arr.join(',')
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.getRoleList()
          this.$message({
            message: res.data && res.data.message ? res.data.message : '调整成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '调整失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    deleteRole (id) {
      // 删除角色
      this.delRolerId = id
      this.replaceRoleId = ''
      this.deleteAlert = true
    },
    delRolerAction () {
      // 确认删除角色
      if (this.replaceRoleId.length <= 0) {
        this.$message({
          message: `请选择用户归属`,
          type: 'warning',
          duration: 600
        })
        return
      }
      // 删除角色
      delRoler({
        id: this.delRolerId,
        trans_level_id: this.replaceRoleId
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.currentIndex = 0
          this.getRoleList()
          this.$message({
            message: res.data && res.data.message ? res.data.message : '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '删除失败')
        }
        this.deleteAlert = false
      }).catch(err => {
        this.$message.error(err.message ? err.message : '出错了')
      })
    },
    gotoAddUpper () {
      this.$router.push({ name: 'addUperWay', query: { id: this.currentRow.id } })
    },
    gotoEditUpper (item) {
      this.$router.push({ name: 'addUperWay', query: { id: item.user_level_id, wayId: item.id, data: item.config_json, name: item.name } })
    },
    deleteUpper (id) {
      this.$confirm('确认删除此条升级方式吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delUperWay({
          id: id,
          user_level_id: this.currentRow.id
        }).then(res => {
          if (res.data && res.data.code === 0) {
            this.$message({
              type: 'success',
              message: res.data && res.data.message ? res.data.message : '删除成功!'
            })
            this.getUperWayList(this.currentRow.id)
          } else {
            this.$message.error(res.data && res.data.message ? res.data.message : '删除失败')
          }
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
@import 'src/views/setting/css/index.scss';
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .info{
    padding: 0;
  }
  .box{
    flex: 1;
    display: flex;
    background: #fff;
    .left-span{
      width: 220px;
      height: 100%;
      padding: 16px 10px;
      .add-roler{
        margin-bottom: 16px;
        width: 100%;
        text-align: center;
      }
      .el-table{
        cursor: pointer;
        .opera{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          div{
            margin-left: 6px;
            cursor: pointer;
          }
          .el-icon-download-up{
            transform: rotate(180deg);
          }
        }
      }
    }
    .right-span{
      flex: 1;
      padding: 0 16px;
      overflow: auto;
      border-left: $ipt-border;
      .right-head-title{
        font-size: $font-20;
        font-weight: 600;
        line-height: 28px;
        margin: 18px 0;
      }
      .uper-btn{
        margin-bottom: 16px;
      }
      .one-row{
        padding-left: 30px;
      }
    }
    .row{
      margin-top: 28px;
      margin-bottom: 30px;
      display: flex;
      line-height: 32px;
    }
    .line{
      padding-left: 76px;
    }
    .item-info{
      display: flex;
      align-items: center;
      .star{
        color: red;
      }
    }
    .item-detail{
      flex: 1;
      display: flex;
      overflow: hidden;
      .check-radio{
        display: flex;
        .item{
          margin-right: 60px;
          .check-li{
            line-height: 32px;
          }
        }
      }
      .el-checkbox{
        min-width: 80px;
      }
      .add-tag{
        border: 1px dashed $border-color;
      }
      &.item-detail-radio{
        align-items: center;
        padding-left: 20px;
      }
    }
  }
  .warn{
    p{
      font-size: 14px;
      line-height: 20px;
      color: #FF6F6F;
    }
  }
}
</style>
<style scoped>
  .left-span .el-table--fit,
  >>> .left-span .el-table td{
    border: none;
  }
  .alert >>> .el-dialog{
    width: 544px;
  }
  .item-detail>>> .el-select{
    flex: 1;
  }
</style>
