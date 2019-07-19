<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="head-item">
      <div class="item-info">
        <div class="order-mode">
          订单状态：
          <span v-if="detail && detail.status === 0">正在执行</span>
          <span v-else-if="detail && detail.status === 1">已执行</span>
          <span v-else-if="detail && detail.status === 2">执行失败</span>
        </div>
        <div class="order-num">订单号：{{ detail ? detail.order_no : '' }}</div>
      </div>
      <div class="control-btn"/>
    </div>
    <div class="main-info">
      <div class="tab-hd">
        <headerTab :list="tab.list" @change="tabChange"/>
      </div>
      <div v-show="tabIndex === 0" class="tab-bd details">
        <div v-if="detail">
          <div class="row">
            <div class="item">
              <div class="label">申请计划ID</div>
              <div class="data">{{ detail.real_name }}</div>
            </div>
            <div class="item">
              <div class="label">申请人姓名</div>
              <div class="data">{{ detail.real_name }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">申请人ID</div>
              <div class="data">{{ detail.tenant_user_id }}</div>
            </div>
            <div class="item">
              <div class="label">通道别称</div>
              <div class="data">{{ detail.gateway_alias }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">申请人手机号</div>
              <div class="data">{{ detail.mobile }}</div>
            </div>
            <div class="item">
              <div class="label">订单结算费率</div>
              <div class="data">{{ Number(detail.rate)? (detail.cost? ( detail.rate * 100).toFixed(4) * 1000 / 1000 + '%+' + (detail.cost / 100).toFixed(2) + '元': ( detail.rate * 100).toFixed(4) * 1000 / 1000 +'%') : ( detail.cost? (detail.cost / 100).toFixed(2) + '元': '0')}}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">结算金额</div>
              <div class="data">{{ (detail.total / 100).toFixed(2) + '元' }}</div>
            </div>
            <div class="item">
              <div class="label">到账金额</div>
              <div class="data">{{ (detail.amount / 100).toFixed(2) + '元' }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">结算卡号</div>
              <div class="data">{{ detail.credit_card.account_no }}</div>
            </div>
            <div class="item">
              <div class="label">所属银行</div>
              <div class="data">{{ detail.credit_card.bank_name }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">结算时间</div>
              <div class="data">{{ detail.executed_at ? detail.executed_at : '--' }}</div>
            </div>
            <div class="item">
              <div class="label">手续费</div>
              <div class="data">{{ detail.fee ? (detail.fee / 100).toFixed(2) + '元' : detail.fee === 0 ? '0元' : '' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="tabIndex === 1" class="tab-bd manage">
        <el-table
          :data="profitList"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column label="用户ID/用户名" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ scope.row.user_id + '/' + scope.row.user_nickname }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="user_mobile" label="手机号" show-overflow-tooltip/>
          <el-table-column prop="order_transaction" label="交易费率"/>
          <el-table-column prop="order_settlement" label="结算费率"/>
          <el-table-column label="分润金额">
            <template slot-scope="scope">
              <div>{{ (scope.row.amount_text / 100).toFixed(2) + '元' }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="method_text" label="类型" show-overflow-tooltip/>
        </el-table>
        <Footbar :currentPage="profitPage" :maxPage="profitPageMax" :total="profitTotal" :size="profitNumber" @changePageSize="(val) => changePageSize(val, 'profit')" @changePageCurrent="(val) => changePageCurrent(val, 'profit')"/>
      </div>
    </div>
  </div>
</template>
<script>
import headerTab from '@/views/orders/component/headBar.vue'
import Footbar from '@/components/pagination/index.vue'
import { getRepayOrderDetail, getRepayOrderProfit } from '@/api/order'

export default {
  components: {
    headerTab,
    Footbar
  },
  data () {
    return {
      id: '',                       // 订单id
      tab: {
        list: ['订单详细', '分润信息']
      },                            // tab列表
      tabIndex: 0,                  // tab选中的索引值
      detail: null,                 // 详情
      profitPage: 1,                // 分润信息分页-当前页
      profitPageMax: 1,             // 分润信息分页-最大页
      profitNumber: 10,             // 分润信息分页-每页显示的条数
      profitTotal: 0,               // 分润信息分页-总条数
      profitList: []                // 分润信息列表
    }
  },
  created () {
    this.id = this.$route.query.id
    // 获取交易管理详情
    getRepayOrderDetail({
      id: this.id,
      action: 'settlement'
    }).then(res => {
      if (res.data && res.data.code === 0) {
        this.detail = res.data.data
      } else {
        this.$message.error(res.data && res.data.message ? res.data.message : '获取结算管理详情失败')
      }
    }).catch(err => {
      console.log(err)
    })
    // 获取分润信息
    // this.getProfit()
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    getProfit () {
      // 获取分润信息
      getRepayOrderProfit({
        order_id: this.id,
        action: 'settlement',
        page: this.profitPage,
        number: this.profitNumber
      }).then(res => {
        if (res.data && res.data.code === 0) {
          this.profitList = res.data.data
          this.profitPage = res.data.stat.page
          this.profitPageMax = res.data.stat.total_page
          this.profitNumber = res.data.stat.number
          this.profitTotal = res.data.stat.total_number
        } else {
          this.$message.error(res.data && res.data.message ? res.data.message : '获取分润信息失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    tabChange (obj) {
      // tab切换
      this.tabIndex = obj.index
    },
    changePageSize (val, type) {
      // 分页选择每页显示多少条数据
      switch (type) {
        case 'profit':
          this.profitNumber = val.size
          this.profitPage = 1
          this.getProfit()
          break
      }
    },
    changePageCurrent (val, type) {
      // 分页选择的页码
      switch (type) {
        case 'profit':
          this.profitPage = val.page
          this.getProfit()
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$font-color: #4a4a4a;
$border: 1px solid #EBEBEB;
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .head-item{
    display: flex;
    justify-content: space-between;
    padding: 20px 26px;
    background: #fff;
    border-top: $border;
    .item-info{
      min-width: 200px;
      color: $font-color;
      .order-mode{
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        margin-bottom: 6px;
      }
      .order-num{
        font-size: 14px;
        line-height: 20px;
      }
    }
    .control-btn{
      display: flex;
      align-items: center;
      .reject{
        color: #fff;
        background: #F85E5E !important;
      }
    }
  }
  .main-info{
    padding: 0;
    .tab-hd{
      padding: 0 20px; line-height: 48px; border-bottom: 1px solid #EBEBEB;
    }
    .tab-bd{
      padding: 20px;
    }
    .details{
      .row{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
        .item{
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 50%;
          height: 40px;
          padding: 0 10px;
          font-size: 14px;
          color: #666;
          overflow: hidden;
          .label{
            width: 120px;
            margin-right: 10px;
          }
          .data{
            flex-grow: 1;
            font-weight: 700;
            color: #333;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
}
.el-table{
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
