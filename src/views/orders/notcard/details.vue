<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="head-item">
      <div class="item-info">
        <div class="order-mode">订单状态：待审核</div>
        <div class="order-num">订单号：646464646746</div>
      </div>
      <div class="control-btn"/>
    </div>
    <div class="main-info">
      <div class="tab-hd">
        <headerTab :list="tab.list" @change="tabChange"/>
      </div>
      <div v-show="tabIndex === 0" class="tab-bd details">
        <div class="row">
          <div class="item">
            <div class="label">订单编号</div>
            <div class="data">WK1215632621</div>
          </div>
          <div class="item">
            <div class="label">申请人ID</div>
            <div class="data">658452</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">申请人姓名</div>
            <div class="data">赤小白</div>
          </div>
          <div class="item">
            <div class="label">申请人手机号</div>
            <div class="data">17658566666</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">通道别称</div>
            <div class="data">京东白条</div>
          </div>
          <div class="item">
            <div class="label">交易金额</div>
            <div class="data">995.00元</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">订单交易费率</div>
            <div class="data">0.65%+0元</div>
          </div>
          <div class="item">
            <div class="label">到账金额</div>
            <div class="data">993.65元</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">付款卡号</div>
            <div class="data">62120236514523</div>
          </div>
          <div class="item">
            <div class="label">付款所属银行</div>
            <div class="data">中国工商银行</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">扣款状态</div>
            <div class="data">已扣款</div>
          </div>
          <div class="item">
            <div class="label">扣款时间</div>
            <div class="data">2019-05-30 15:45:30</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">订单状态</div>
            <div class="data">正常</div>
          </div>
          <div class="item">
            <div class="label">生成的账单号</div>
            <div class="data">JM6566511</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">消费城市</div>
            <div class="data">重庆市万州区</div>
          </div>
          <div class="item">
            <div class="label">申请时间</div>
            <div class="data">2019-03-20 15:20:50</div>
          </div>
        </div>
      </div>
      <div v-show="tabIndex === 1" class="tab-bd manage">
        <el-table
          :data="profitData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column prop="userid" label="用户ID"/>
          <el-table-column prop="username" label="用户名" show-overflow-tooltip/>
          <el-table-column prop="mobile" label="手机号" show-overflow-tooltip/>
          <el-table-column prop="rate" label="交易费率"/>
          <el-table-column prop="bouns" label="分佣金额"/>
          <el-table-column prop="type" label="类型"/>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import headerTab from '@/views/orders/component/headBar.vue'

export default {
  components: {
    headerTab
  },
  data () {
    return {
      tab: {
        list: ['订单信息', '分润信息']
      },
      tabIndex: 0,
      profitData: [
        {
          id: 1,
          userid: '1561651',
          username: '小白',
          mobile: '15012536451',
          rate: '50%',
          bouns: '1000',
          type: '一级代理'
        },
        {
          id: 2,
          userid: '1561651',
          username: '小白',
          mobile: '15012536451',
          rate: '50%',
          bouns: '1000',
          type: '首席银行家'
        },
        {
          id: 3,
          userid: '1561651',
          username: '小白',
          mobile: '15012536451',
          rate: '50%',
          bouns: '1000',
          type: '普通会员'
        }
      ]
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    tabChange (obj) {
      this.tabIndex = obj.index
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
</style>
