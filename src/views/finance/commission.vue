<template>
  <div class="main">
    <div class="info">佣金明细</div>
    <div class="head-item">
      <div class="item">
        <div class="item-title">订单总分润金额</div>
        <div class="item-info">￥{{ statistics.earning_amount }}</div>
      </div>
      <div class="item">
        <div class="item-title">发起人所得分润金额</div>
        <div class="item-info">￥{{ statistics.from_user_amount }}</div>
      </div>
      <div class="item">
        <div class="item-title"> 所属上级所得分润金额</div>
        <div class="item-info">￥{{ statistics.amount }}</div>
      </div>
    </div>
    <div class="main-info">
      <div class="header">
        <div>
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
            size="small"
            class="select-time"/>
          <el-select v-model="orderID" placeholder="订单业务" size="small" class="select-frame">
            <el-option
              v-for="item in chargedStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </div>
      </div>
      <div class="table-info">
        <el-table
          ref="multipleTable"
          :data="orderTable"
          id="out-table"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="from_order_id" label="订单号"/>
          <el-table-column prop="module_text" label="订单业务"/>
          <el-table-column label="订单总分润金额">
            <template slot-scope="scope">
              {{ (scope.row.earning_amount/100).toFixed(2) }}元
            </template>
          </el-table-column>
          <el-table-column label="发起人ID/姓名">
            <template slot-scope="scope">
              {{ scope.row.from_user_id }}/{{ scope.row.from_user_realname? scope.row.from_user_realname: '' }}
            </template>
          </el-table-column>
          <el-table-column prop="from_user_amount_text" label="发起人分润"/>
          <el-table-column label="上级ID/姓名">
            <template slot-scope="scope">
              {{ scope.row.user_id }}/{{ scope.row.user_realname }}
            </template>
          </el-table-column>
          <el-table-column label="上级所得分润">
            <template slot-scope="scope">
              {{ (scope.row.amount/100).toFixed(2) }}元
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="订单时间"/>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope" width="160">
              <el-button size="small" @click="gotoDetail(scope.$index, scope.row.id)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="foot">
          <div class="sum">
            <div class="sum-num">共{{ stat.total_number }}条纪录</div>
            <div class="position">第{{ stat.page }}/{{ stat.total_page }}页</div>
          </div>
          <div class="page">
            <el-pagination
              :total="stat.total_number"
              :page-sizes="[10, 20, 30, 40]"
              popper-class="页"
              layout="prev, pager, next, sizes, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { commissionList, earningModule } from '@/api/finance'
import { exportExcel } from '@/utils/excel'
export default {
  data () {
    return {
      restaurants: [],
      state3: '',
      orderTable: [],
      statistics: {
        earning_amount: '0.00',
        from_user_amount: '0.00',
        amount: '0.00'
      },
      chargedStatus: [],
      orderID: '',
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
      },
      requestData: {
        number: 10,
        page: 1
      },
      stat: {}
    }
  },
  beforeMount () {
    if (this.orderTable) {
      console.log(this.orderTable)
    } else { console.log(this.orderTable === false) }
  },
  created () {
    // 获取订单业务模块选项
    earningModule().then(res => {
      this.chargedStatus = res.data.data
    }).catch(err => {
      console.log(err)
    })
    // 获取头部总金额
    // getStatistics().then(res => {
    //   this.statistics = res.data.data
    //   // console.log(res.data.data)
    // }).catch(err => {
    //   console.log(err)
    // })
    // 获取分润表格数据
    // this.getTableList()
  },
  watch: {
    orderID (val, oldval) {
      this.requestData.module = val
      this.getTableList()
    },
    dateArr (val, oldval) {
      if (val) {
        this.requestData.start_time = val[0]
        this.requestData.end_time = val[1]
      } else {
        this.requestData.start_time = null
        this.requestData.end_time = null
      }
      this.getTableList()
    }
  },
  methods: {
    // 导出excel
    outExcel (idName, excelName) {
      exportExcel(idName, excelName)
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect (item) {
      console.log(item)
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    getTableList () {
      commissionList(this.requestData).then(res => {
        this.orderTable = res.data.data
        this.stat = res.data.stat
      }).catch(err => {
        console.log(err)
      })
    },
    gotoDetail (index, id) {
      this.$router.push({ name: 'commissionDetail', query: { id: id } })
    },
    // 分页器事件
    handleSizeChange (val) {
      this.requestData.number = val
      this.getTableList()
    },
    handleCurrentChange (val) {
      this.requestData.page = val
      this.getTableList()
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
  .head-item{
    display: flex;
    padding: 31px 53px;
    background: #fff;
    border-top: $border;
    .item{
      margin-right: 80px;
      .item-title{
        margin-bottom: 12px;
        font-size: 14px;
        line-height: 20px;
        color: #4A4A4A;
      }
      .item-info{
        line-height: 28px;
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
  .main-info{
    padding: 16px;
    .header{
      display: flex;
      justify-content: space-between;
      .head-info{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 16px;
        &> div {
          margin-left: 16px;
          overflow: hidden;
        }
        .select-frame{
          max-width: 110px;
          background: #E8E8E8;
        }
        .select-time{
          max-width: 260px;
        }
      }
    }
  }
}
</style>
