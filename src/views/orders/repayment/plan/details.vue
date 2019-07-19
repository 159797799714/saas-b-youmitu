<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="head-item">
      <div class="item-info">
        <div class="order-mode">
          计划状态：
          <span v-if="detail && detail.status === 0">执行中</span>
          <span v-else-if="detail && detail.status === 1">已完成</span>
          <span v-else-if="detail && detail.status === 2">取消还款</span>
          <span v-else-if="detail && detail.status === 3">还款失败</span>
        </div>
        <div class="order-num">计划编号：{{ detail ? detail.id : '' }}</div>
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
              <div class="label">申请人姓名</div>
              <div class="data">{{ detail.real_name }}</div>
            </div>
            <div class="item">
              <div class="label">通道别称</div>
              <div class="data">{{ detail.gateway_alias }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">申请人ID</div>
              <div class="data">{{ detail.tenant_user_id }}</div>
            </div>
            <div class="item">
              <div class="label">计划创建时间</div>
              <div class="data">{{ detail.created_at }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">申请人手机号</div>
              <div class="data">{{ detail.mobile }}</div>
            </div>
            <div class="item">
              <div class="label">还款开始时间</div>
              <div class="data">{{ detail.start_date }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">信用卡卡号</div>
              <div class="data">{{ detail.credit_card.account_no ? detail.credit_card.account_no : ''}}</div>
            </div>
            <div class="item">
              <div class="label">所属银行</div>
              <div class="data">{{ detail.credit_card.bank_name ? detail.credit_card.bank_name : '' }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">代还金额</div>
              <div class="data">{{ (detail.settlement_amount / 100).toFixed(2) }}元</div>
            </div>
            <div class="item">
              <div class="label">还款结束时间</div>
              <div class="data">{{ detail.end_date }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">还款总笔数</div>
              <div class="data">{{ detail.settlement_count }}</div>
            </div>
            <div class="item">
              <div class="label">实际结束时间</div>
              <div class="data">{{ detail.ended_at ? detail.ended_at : '--' }}</div>
            </div>
          </div>
          <div class="row">
            <div class="item">
              <div class="label">已还款金额</div>
              <div class="data">{{ detail.settled_amount ? (detail.settled_amount / 100).toFixed(2) + '元' : detail.settled_amount=== 0 ? '0元' : ''}}</div>
            </div>
            <div class="item">
              <div class="label">总手续费</div>
              <div class="data">{{ detail.total_fee ? (detail.total_fee / 100).toFixed(2) + '元' : '' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="tabIndex === 1" class="tab-bd manage">
        <el-table
          :data="planList"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column prop="date" label="时间" show-overflow-tooltip/>
          <el-table-column label="金额" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ (scope.row.settlement_total / 100).toFixed(2) + '元' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <div class="status status-0" v-if="scope.row.status === 0">执行中</div>
              <div class="status status-1" v-if="scope.row.status === 1">已完成</div>
              <div class="status status-2" v-if="scope.row.status === 2">取消还款</div>
              <div class="status status-3" v-if="scope.row.status === 3">还款失败</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="small" @click="showPlanDetails(scope.$index)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <Footbar :currentPage="planPage" :maxPage="planPageMax" :total="planTotal" :size="planNumber" @changePageSize="(val) => changePageSize(val, 'plan')" @changePageCurrent="(val) => changePageCurrent(val, 'plan')"/>
      </div>
      <div v-show="tabIndex === 2" class="tab-bd manage">
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
          <el-table-column prop="method_text" label="类型" show-overflow-tooltip/>
          <el-table-column label="总分润金额">
            <template slot-scope="scope">
              <div>{{ scope.row.earning_amount_text + '元' }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="showprofitDetails(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <Footbar :currentPage="profitPage" :maxPage="profitPageMax" :total="profitTotal" :size="profitNumber" @changePageSize="(val) => changePageSize(val, 'profit')" @changePageCurrent="(val) => changePageCurrent(val, 'profit')"/>
      </div>
    </div>
    <!-- 计划管理详情 S -->
    <el-dialog :visible.sync="planDetailPop" title="计划项详细">
      <el-table :data="planDetail">
        <el-table-column prop="timestamp" label="时间" width="200px" show-overflow-tooltip/>
        <el-table-column label="金额">
          <template slot-scope="scope">
            <div>{{ (scope.row.total / 100).toFixed(2) + '元' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="手续费">
          <template slot-scope="scope">
            <div>{{ (scope.row.fee / 100).toFixed(2) + '元' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            {{ scope.row.action === 'transaction'?'交易': '结算' }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div class="status status-0" v-if="scope.row.status === 0">执行中</div>
            <div class="status status-1" v-if="scope.row.status === 1">已完成</div>
            <div class="status status-2" v-if="scope.row.status === 2">已取消</div>
            <div class="status status-3" v-if="scope.row.status === 3">执行失败</div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="planDetailPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 计划管理详情 E -->
    <!-- 分润信息详情 S -->
    <el-dialog :visible.sync="profitDetailPop" title="分润信息详情">
      <el-table :data="profitDetail">
        <el-table-column label="用户ID/用户名" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ scope.row.user_id + '/' + scope.row.user_nickname }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="order_transaction" label="交易费率"/>
        <el-table-column prop="order_settlement" label="结算费率"/>
        <el-table-column prop="created_at" label="时间" show-overflow-tooltip/>
        <el-table-column prop="order_action" label="类型" show-overflow-tooltip/>
        <el-table-column prop="method_text" label="会员类型" show-overflow-tooltip/>
        <el-table-column label="分润金额">
          <template slot-scope="scope">
            <div>{{ (scope.row.amount_text / 100).toFixed(2) + '元' }}</div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="profitDetailPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分润信息详情 E -->
  </div>
</template>
<script>
import headerTab from '@/views/orders/component/headBar.vue'
import Footbar from '@/components/pagination/index.vue'
import { getRepayPlanDetail, getRepayPlanProjectDetail, getRepayPlanProfit } from '@/api/order'

export default {
  components: {
    headerTab,
    Footbar
  },
  data () {
    return {
      id: '',                                             // 订单id
      tab: {
        list: ['计划详情', '计划项管理', '分润信息']
      },                                                  // tab信息
      tabIndex: 0,                                        // tab当前索引
      detail: null,                                       // 计划详情
      planPage: 1,                                        // 计划管理分页-当前页
      planPageMax: 1,                                     // 计划管理分页-最大页
      planNumber: 10,                                     // 计划管理分页-每页显示的条数
      planTotal: 0,                                       // 计划管理分页-总条数
      planList: [],                                       // 计划管理列表
      planDetail: [],                                     // 计划管理详情
      planDetailPop: false,                               // 控制计划管理详情弹窗
      profitPage: 1,                                      // 分润信息分页-当前页
      profitPageMax: 1,                                   // 分润信息分页-最大页
      profitNumber: 10,                                   // 分润信息分页-每页显示的条数
      profitTotal: 0,                                     // 分润信息分页-总条数
      profitList: [],                                     // 分润信息列表
      profitDetail: [],                                   // 分润信息详情
      profitDetailPop: false                              // 控制分润信息详情弹窗
    }
  },
  created () {
    this.id = this.$route.query.id
    // 获取计划详情
    getRepayPlanDetail({
      id: this.id
    }).then(res => {
      if (res.data.data && res.data.code === 0) {
        console.log(res.data.data.plan_items[0].amount)
        this.planList = res.data.data.plan_items
        this.detail = res.data.data
      } else {
        this.$message.error(res.data.data && res.data.message ? res.data.message : '获取计划详情失败')
      }
    }).catch(err => {
      console.log(err)
    })
    // 计划项目列表
    // this.getPlanProjectList()
    // 分润信息
    // this.getProfit()
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    getPlanProjectDetail (id) {
      // 获取计划详情， 计划项管理详情
      getRepayPlanProjectDetail({
        id: id
      }).then(res => {
        if (res.data.data && res.data.code === 0) {
          this.planDetail = res.data.data
        } else {
          this.$message.error(res.data.data && res.data.message ? res.data.message : '获取计划项目详情失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getProfit (code) {
      // 获取分润信息
      getRepayPlanProfit({
        plan_id: this.id,
        number: this.profitNumber,
        page: this.profitPage
      }).then(res => {
        if (res.data.data && res.data.code === 0) {
          this.profitList = res.data.data
          this.profitPage = res.data.stat.page
          this.profitPageMax = res.data.stat.total_page
          this.profitNumber = res.data.stat.number
          this.profitTotal = res.data.stat.total_number
        } else {
          this.$message.error(res.data.data && res.data.message ? res.data.message : '获取分润信息失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    tabChange (obj) {
      // tab切换
      this.tabIndex = obj.index
    },
    showPlanDetails (index) {
      // 显示计划管理详情弹窗
      this.planDetailPop = true
      this.planDetail = this.planList[index].items
    },
    showprofitDetails (item) {
      this.profitDetail.length = 0
      this.profitDetail.push(item)
      this.profitDetailPop = true
    },
    changePageSize (val, type) {
      // 分页选择每页显示多少条数据
      switch (type) {
        case 'plan':
          this.planNumber = val.size
          this.planPage = 1
          this.getPlanProjectList()
          break
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
        case 'plan':
          this.planPage = val.page
          this.getPlanProjectList()
          break
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
<style scoped>
.el-dialog__wrapper>>> .el-dialog{
  max-width: 700px;
}
</style>
