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
      <div class="bonus">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="计划订单自编号"/>
          <el-table-column
            prop="name"
            label="平台商户号"/>
          <el-table-column
            prop="name"
            label="用户消费类型"/>
          <el-table-column
            prop="name"
            label="消费金额"/>
          <el-table-column
            prop="address"
            label="手续费金额"/>
          <el-table-column
            prop="date"
            label="消费产品名称"/>
          <el-table-column
            prop="name"
            label="预计还款时间"/>
          <el-table-column
            prop="name"
            label="实际完成还款时间"/>
          <el-table-column
            prop="name"
            label="订单完成状态"/>
          <el-table-column
            prop="address"
            label="订单成交平台所得收益"/>
        </el-table>
      </div>
      {{ this.$route.params.info }}
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
