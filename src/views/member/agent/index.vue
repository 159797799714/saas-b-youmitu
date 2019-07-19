<template>
  <div class="main">
    <div class="info">代理管理</div>
    <div class="main-info">
      <div class="header">
        <div>
          <el-button type="primary" size="small" @click="dialogTableVisible = true">添加代理</el-button>
        </div>
        <div class="head-info">
          <el-input size="small" placeholder="搜索渠道名称/产品名称/联系人" class="input-with-select search-icon">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="ID" label="代理ID"/>
        <el-table-column prop="name" label="代理等级"/>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="address" label="手机号" width="80" show-overflow-tooltip/>
        <el-table-column prop="name" label="分佣比例" show-overflow-tooltip/>
        <el-table-column prop="address" label="锁粉数(区域总数)" width="120" show-overflow-tooltip/>
        <el-table-column prop="name" label="当前账户余额"/>
        <el-table-column prop="name" label="上级ID"/>
        <el-table-column prop="name" label="上级等级" show-overflow-tooltip/>
        <el-table-column prop="name" label="状态"/>
        <el-table-column prop="name" label="注册时间"/>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="gotoDetail">查看详情</el-button>
            <el-button size="small" type="danger" @click="handleEdit(scope.$index, scope.row)">冻结账户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <footbar/>
    </div>
    <!-- 添加代理弹窗 -->
    <el-dialog :visible.sync="dialogTableVisible" title="添加代理人">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="代理等级：" class="choose" size="small">
          <el-select v-model="grade" placeholder="二级代理">
            <el-option label="二级代理" value="2" class="select-li"/>
            <el-option label="一级代理" value="1" class="select-li"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="grade === '2'" :label-width="formLabelWidth" label="所属上级：">
          <el-autocomplete v-model="state3" :fetch-suggestions="querySearch" class="autocomplete" popper-class="my-autocomplete" size="small" placeholder="请输入内容">
            <i slot="suffix" class="el-icon-search" @click="handleIconClick"/>
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="代理名称：">
          <el-input v-model="form.name" size="small" placeholder="请输入代理名称"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="手机号：">
          <el-input v-model="form.name" size="small" placeholder="请输入代理手机号"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="设置密码：">
          <el-input v-model="form.name" size="small" placeholder="请设置代理初始密码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Footbar from '@/components/pagination/index.vue'
export default {
  components: {
    Footbar
  },
  data () {
    return {
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
      dialogTableVisible: false,
      form: {
        name: '',
        region: ''
      },
      grade: '2',
      formLabelWidth: '100px',
      restaurants: [],
      state3: ''
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSelectionChange (val) {
      console.log('选择了', val)
      // this.multipleSelection = val
    },
    gotoDetail () {
      this.$router.push({ name: 'agentDetail' })
    },
    // 弹窗上级搜索联想
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
        { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
        { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' }
      ]
    },
    handleSelect (item) {
      console.log(item)
    },
    handleIconClick (ev) {
      console.log(ev)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/views/member/common/common.scss";
.el-select{
  max-width: 2000px;
}
.select-li{
  max-width: 640px;
}
.autocomplete{
  flex: 1;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
