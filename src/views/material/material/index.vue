<template>
  <div class="main">
    <div class="info">素材管理</div>
    <div class="box">
      <div class="left-span">
        <div class="add-roler" @click="rolerAlert = true">新增分类</div>
        <div v-for="(item, index) in tabs" :key="index" :class="{'tab-li': true,'actived':selectIndex === index}" @click="selectItem(index)">
          <div class="tab-li-name">{{ item }}</div>
          <div v-show="selectIndex === index" class="probability"><i class="el-icon-edit-outline icon"/><i class="el-icon-delete icon"/></div>
        </div>
      </div>
      <div class="right-span">
        <div class="right-head-title">素材列表</div>
        <div class="uper-btn"><el-button size="small" type="primary" @click="gotoAddmaterial">新增素材</el-button></div>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column
            align="left"
            prop="ID"
            label="编号"/>
          <el-table-column
            align="left"
            prop="address"
            label="标题"/>
          <el-table-column
            align="left"
            prop="name"
            label="类型"/>
          <el-table-column
            align="left"
            prop="name"
            label="作者"/>
          <el-table-column
            align="left"
            prop="name"
            label="来源"/>
          <el-table-column
            align="left"
            prop="name"
            label="状态"/>
          <el-table-column
            align="left"
            prop="date"
            label="创建时间"/>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button size="small">下架</el-button>
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 新增角色 -->
      <el-dialog :visible.sync="rolerAlert" title="新增分类">
        <el-form :model="rolerForm">
          <el-form-item label="分类名称" >
            <el-input v-model="rolerForm.name"/>
          </el-form-item>
          <el-form-item label="角色分润" >
            <el-input v-model="rolerForm.name"/>
          </el-form-item>
          <el-form-item label="所属上级" >
            <el-select v-model="rolerForm.upper" placeholder="所属上级">
              <el-option label="区域一" value="shanghai"/>
              <el-option label="区域二" value="beijing"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelRoler">取 消</el-button>
          <el-button type="primary" @click="sureRoler">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectIndex: 0,
      tabs: ['全部', '招代理', '拓业务', '正能量', '活动'],
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        ID: '1480415'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        ID: '1480415'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        ID: '1480415'
      }],
      multipleSelection: [],
      rolerAlert: false,
      // formLabelWidth: '1'
      rolerForm: {
        name: '',
        bonus: '',
        upper: ''
      }
    }
  },
  methods: {
    selectItem (index) {
      this.selectIndex = index
    },
    handleSelectionChange (val) {
      console.log('选择了', val)
      // this.multipleSelection = val
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    cancelRoler () {
      this.rolerAlert = false
    },
    sureRoler () {
      this.cancelRoler()
    },
    gotoAddmaterial () {
      this.$router.push({ name: 'addMaterial' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
$li-bg: #F0F8FF;
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .box{
  flex: 1;
  display: flex;
  margin: 16px;
  background: #fff;
  .left-span{
    width: 220px;
    height: 100%;
    padding: 16px 10px;
    .add-roler{
      margin-bottom: 16px;
      height: $height-32;
      width: 100%;
      text-align: center;
      line-height: $height-32;
      color: #fff;
      border-radius: 4px;
      background: $btn-color;
    }
    .tab-li{
      height: $height-32;
      padding-left: 30px;
      padding-right: 8px;
      line-height: $height-32;
      display: flex;
      justify-content: space-between;
      .icon{
        margin-right: 8px;
      }
    }
    .actived{
      background: $li-bg;
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
}
}
</style>
