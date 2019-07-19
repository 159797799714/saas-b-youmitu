<template>
  <div class="main">
    <div class="info">交易管理</div>
    <div class="main-info">
      <div class="header">
        <div>
          <!-- <el-button size="small">导出</el-button> -->
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
          <el-select v-model="orderStatusChecked" placeholder="请选择" size="small" class="select-frame">
            <el-option
              v-for="item in orderStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value"/>
          </el-select>
          <!-- <el-input
            placeholder="请输入关键字搜索"
            v-model="searchStr"
            clearable
            size="small">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input> -->
        </div>
      </div>
      <div :key="0" class="table-info">
        <el-table
          ref="multipleTable"
          :data="orderList"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column prop="order_no" label="订单编号"/>
          <el-table-column prop="client_repay_plan_id" label="所属计划ID"/>
          <el-table-column label="申请人ID/姓名" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ scope.row.tenant_user_id + '/' + scope.row.real_name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="gateway_alias" label="通道别称" show-overflow-tooltip/>
          <el-table-column label="交易金额">
            <template slot-scope="scope">
              <div>{{ (scope.row.total / 100).toFixed(2) + '元' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="手续费">
            <template slot-scope="scope">
              <div>{{ (scope.row.fee / 100).toFixed(2) + '元' }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="到账金额">
            <template slot-scope="scope">
              <div>{{ (scope.row.amount / 100).toFixed(2) }}</div>
            </template>
          </el-table-column> -->
          <el-table-column label="交易时间">
            <template slot-scope="scope">
              <div>{{ scope.row.created_at ? scope.row.created_at : '--' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="扣款状态">
            <template slot-scope="scope">
              <div class="status status-0" v-if="scope.row.status === 0">正在执行</div>
              <div class="status status-1" v-if="scope.row.status === 1">已扣款</div>
              <div class="status status-2" v-if="scope.row.status === 2">扣款失败</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="small" @click="gotoDetail(scope.$index, scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <Footbar :currentPage="orderPage" :maxPage="orderPageMax" :total="orderTotal" :size="orderNumber" @changePageSize="changePageSize" @changePageCurrent="changePageCurrent"/>
    </div>
  </div>
</template>

<script>
import Footbar from '@/components/pagination/index.vue'
import { getRepayOrderList } from '@/api/order'

export default {
  components: {
    Footbar
  },
  data () {
    return {
      searchStr: '',                                                          // 搜索关键字
      orderPage: 1,                                                           // 当前页
      orderPageMax: 1,                                                        // 最大页
      orderNumber: 10,                                                        // 每页显示的条数
      orderTotal: 0,                                                          // 总条数
      orderList: [],                                                          // 订单数据列表
      orderStatus: [
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
      ],                                                                      // 订单状态
      orderStatusChecked: '',                                                 // 订单状态选中的value值
      dateArr: '',                                                            // 筛选的日期
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
      }                                                                       // 筛选日期的配置
    }
  },
  created () {
    // 获取订单列表
    this.getList()
  },
  methods: {
    getList () {
      // 获取交易订单列表
      getRepayOrderList({
        action: 'transaction',
        page: this.orderPage,
        number: this.orderNumber
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.orderList = res.data.data
          this.orderPage = res.data.stat.page
          this.orderPageMax = res.data.stat.total_page
          this.orderNumber = res.data.stat.number
          this.orderTotal = res.data.stat.total_number
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取交易管理数据失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changePageSize (val) {
      // 分页选择每页显示多少条数据
      this.orderNumber = val.size
      this.orderPage = 1
      this.getList()
    },
    changePageCurrent (val) {
      // 分页选择的页码
      this.orderPage = val.page
      this.getList()
    },
    gotoDetail (index, info) {
      // 查看详情
      this.$router.push({ name: 'repaymentTransactionDetails', query: { id: info.id } })
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
    .el-input{
      max-width: 280px;
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
.table-info{
  .status{
    &.status-0{
      color: #0067FF;
    }
    &.status-1{
      color: #65C200;
    }
    &.status-2{
      color: #FF1111;
    }
    &.status-3{
      color: #FF1111;
    }
  }
}
</style>
