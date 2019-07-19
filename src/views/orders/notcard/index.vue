<template>
  <div class="main">
    <div class="info">无卡支付订单管理</div>
    <div class="main-info">
      <div class="header">
        <div>
          <!-- <el-button size="small"></el-button> -->
        </div>
        <div class="head-info">
          <el-date-picker
            v-model="dateArr"
            :picker-options="pickerOptions"
            type="datetimerange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="center"
            size="small"/>
          <el-select v-model="chargedStatusChecked" placeholder="扣款状态" size="small">
            <el-option
              v-for="item in chargedStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"/>
          </el-select>
          <el-select v-model="paymentStatusChecked" placeholder="收款状态" size="small">
            <el-option
              v-for="item in paymentStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"/>
          </el-select>
          <el-autocomplete
            v-model="state3"
            :fetch-suggestions="querySearch"
            popper-class="my-autocomplete"
            class="search-icon"
            size="small"
            placeholder="请输入关键字搜索"
            @select="handleSelect">
            <i slot="suffix" class="el-icon-search el-input__icon" @click="handleIconClick"/>
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
            </template>
          </el-autocomplete>
        </div>
      </div>
      <div :key="0" class="table-info">
        <el-table
          ref="multipleTable"
          :data="orderTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="name" label="订单编号"/>
          <el-table-column prop="name" label="申请人ID/姓名" show-overflow-tooltip/>
          <el-table-column prop="address" label="申请人手机号" show-overflow-tooltip/>
          <el-table-column prop="name" label="通道名称" show-overflow-tooltip/>
          <el-table-column prop="name" label="交易金额"/>
          <el-table-column prop="address" label="交易费率"/>
          <el-table-column prop="name" label="到账金额"/>
          <el-table-column prop="name" label="申请时间"/>
          <el-table-column prop="name" label="扣款状态"/>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope" width="160">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <footbar/>
    </div>
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
      restaurants: [],
      state3: '',
      orderTable: [
        {
          date: '2016-05-03',
          name: '银行卡',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      chargedStatus: [
        {
          name: '正在执行',
          value: 0
        },
        {
          name: '已完成',
          value: 1
        },
        {
          name: '取消计划',
          value: 2
        }
      ],
      chargedStatusChecked: '',
      paymentStatus: [
        {
          name: '已收款',
          value: 0
        },
        {
          name: '未收款',
          value: 1
        },
        {
          name: '收款异常',
          value: 2
        }
      ],
      paymentStatusChecked: '',
      dateArr: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    handleEdit (index, info) {
      console.log('查看计划详情', index, info)
      this.$router.push({ name: 'orderNotcardDetails', params: { info: info } })
    },
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
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' }
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
@import "src/styles/mixin.scss";
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    .head-info {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
      &> div {
        margin: 0 8px;
        overflow: hidden;
      }
    }
    .search-icon {
      width: 300px;
      margin-left: 16px;
    }
  }
}
// 搜索框默认样式
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
