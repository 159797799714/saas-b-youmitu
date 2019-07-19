<template>
  <div class="main">
    <div class="info">会员收支明细</div>
    <div class="head-item">
      <div class="item">
        <div class="item-title">综合收入金额</div>
        <div class="item-info">¥{{ statistics.income }}</div>
      </div>
      <div class="item">
        <div class="item-title">综合支出金额</div>
        <div class="item-info">¥{{ statistics.out }}</div>
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
          <el-select v-model="type" placeholder="收款类型" size="small" class="select-frame">
            <el-option
              v-for="item in typeLit"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
          <el-select v-model="from_type" placeholder="收款来源" size="small" class="select-frame">
            <el-option
              v-for="item in fromTypeList"
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
          <el-table-column prop="from_id" label="用户收支订单"/>
          <el-table-column label="申请人ID/姓名">
            <template slot-scope="scope">
              {{ scope.row.user_id ? scope.row.user_id : '' }}/{{ scope.row.user_realname }}
            </template>
          </el-table-column>
          <el-table-column prop="user_mobile" label="手机号"/>
          <el-table-column prop="from_type_text" label="收支来源"/>
          <el-table-column prop="type_text" label="收支类型"/>
          <el-table-column prop="amount_text" label="收支金额"/>
          <el-table-column prop="created_at" label="时间"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="gotoDetail(scope.$index, scope.row.id)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
      <!-- <Footbar :currentPage="memberPage" :maxPage="memberPageMax" :total="memberTotal" :size="memberNumber" @changeSize="changeSize" @changePage="changePage"/> -->
      </div>
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
</template>

<script>
// import Footbar from '@/components/pagination/index.vue'
import { memberCashList, getCashStatistics, balanceStatus } from '@/api/finance'
import { exportExcel } from '@/utils/excel'
export default {
  // components: {
  //   Footbar
  // },
  data () {
    return {
      stat: {},
      restaurants: [],
      state3: '',
      requestData: {
        number: 10,
        page: 1
      },
      statistics: {},
      orderTable: [],
      typeLit: [],
      type: '',
      fromTypeList: [],
      from_type: '',
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
  created () {
    // 获取会员明细初始列表
    this.getTableList()
    // 获取会员明细顶部统计数据
    this.getHeadStatistic()
    // 获取收支类型和来源类型
    balanceStatus().then(res => {
      this.typeLit = res.data.data.type
      this.fromTypeList = res.data.data.from_type
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    dateArr (val, oldval) {
      if (val) {
        this.requestData.start_time = val[0]
        this.requestData.end_time = val[1]
      } else {
        this.requestData.start_time = null
        this.requestData.end_time = null
      }
      this.getTableList()
    },
    type (val, oldval) {
      this.requestData.type = val
      this.getTableList()
    },
    from_type (val, oldval) {
      this.requestData.from_type = val
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
    getTableList () {
      // 获取会员明细初始列表
      memberCashList(this.requestData).then(res => {
        this.stat = res.data.stat
        this.orderTable = res.data.data
      }).catch(err => {
        this.$message.error(err)
      })
    },
    getHeadStatistic () {
      // 获取会员明细顶部统计数据
      getCashStatistics().then(res => {
        this.statistics = res.data.data
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelect (item) {
      console.log(item)
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    // 分页器事件
    handleSizeChange (val) {
      this.requestData.number = val
      this.getTableList()
    },
    handleCurrentChange (val) {
      this.requestData.page = val
      this.getTableList()
    },
    gotoDetail (index, id) {
      console.log('详细', index, id)
      this.$router.push({ name: 'cashDetail', query: { id: id } })
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
