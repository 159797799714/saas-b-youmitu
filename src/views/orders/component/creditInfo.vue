<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="head-item">
      <div class="item-info">
        <div class="order-mode">订单状态：待审核</div>
        <div class="order-num">订单号：646464646746</div>
      </div>
      <div class="control-btn">
        <el-button type="primary" size="small">通过</el-button>
        <el-button type="danger" size="small" class="reject">拒绝</el-button>
      </div>
    </div>
    <div class="main-info">
      <div class="center-info">
        <!-- 第一列 -->
        <div class="row">
          <div class="small-title">订单详情</div>
          <div class="small-item">
            <div class="item-name">申请时间</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">订单号</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">产品名称</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>

          <div class="small-title title">申请人信息</div>
          <div class="small-item">
            <div class="item-name">申请人</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-title title">经办人信息</div>
          <div class="small-item">
            <div class="item-name">用户状态</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">用户名称</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">经办人ID</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-title title">分润信息</div>
        </div>
        <!-- 第二列 -->
        <div class="row">
          <div class="small-title"/>
          <div class="small-item">
            <div class="item-name">批款额度</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">分佣类型</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">分佣比例</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>

          <div class="small-title title"/>
          <div class="small-item">
            <div class="item-name">手机号</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-title title"/>
          <div class="small-item">
            <div class="item-name">角色等级</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">代理级别</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">经办人姓名</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-title title"/>
        </div>
        <!-- 第三列 -->
        <div class="row">
          <div class="small-title"/>
          <div class="small-item">
            <div class="item-name">佣金</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name"/>
            <div class="item-info"/>
          </div>
          <div class="small-item">
            <div class="item-name"/>
            <div class="item-info"/>
          </div>
          <div class="small-title title"/>
          <div class="small-item">
            <div class="item-name">身份证号</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-title title"/>
          <div class="small-item">
            <div class="item-name">手机号</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">微信号</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">身份证号</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-title title"/>
        </div>
      </div>
      <div class="bonus">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="用户ID"
            width="100"/>
          <el-table-column
            prop="name"
            label="用户名称"/>
          <el-table-column
            prop="name"
            label="手机号"
            width="180"/>
          <el-table-column
            prop="name"
            label="分佣金额"/>
          <el-table-column
            prop="address"
            label="分佣类型"/>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '242424',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '100544',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '422424',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '242452',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
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
    .center-info{
      display: flex;
      padding: 16px;
      .row{
        flex: 1;
        .small-title{
          height: 28px;
          font-size: 20px;
          line-height: 28px;
          font-weight: 600;
          color: $font-color;
        }
        .title{
          margin-top: 40px;
        }
        .small-item{
          height: 20px;
          margin-top: 26px;
          display: flex;
          .item-name{
            width: 76px;
            font-weight: 600;
          }
        }
      }
    }
    .bonus{
      border: $border;
    }
  }
}
</style>
