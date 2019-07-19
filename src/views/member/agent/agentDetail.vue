<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="header">
      <div class="head-top">
        <div class="info-span">
          <div class="user-img">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="sum">刘德华</div>
        </div>
        <div>
          <el-button size="small" type="danger">冻结账户</el-button>
        </div>
      </div>
      <div class="header-info">
        <div class="left-box">
          <div class="small-item">
            <div class="item-name">账户状态</div>
            <div class="item-info">正常</div>
          </div>
          <div class="small-item">
            <div class="item-name">注册来源</div>
            <div class="item-info">PC端</div>
          </div>
        </div>
        <div class="right-box">
          <div class="num">
            <div>
              <div class="item-name">会员总数</div>
              <div class="item-attribute sum">￥299.00</div>
            </div>
          </div>
          <div class="num">
            <div>
              <div class="item-name">下级代理人数</div>
              <div class="item-attribute sum">￥6542.00</div>
            </div>
          </div>
          <div class="num">
            <div>
              <div class="item-name">可提现金额</div>
              <div class="item-attribute sum">￥299.00</div>
            </div>
          </div>
          <div class="num">
            <div>
              <div class="item-name">已提现金额</div>
              <div class="item-attribute sum">￥6542.00</div>
            </div>
          </div>
          <div class="num">
            <div>
              <div class="item-name">总收益</div>
              <div class="item-attribute sum">￥1050.00</div>
            </div>
          </div>
        </div>
      </div>
      <div class="subnav">
        <div v-for="(item, index ) in subList" :key="index" :class="{tag: true, actived: subIndex === index}" @click="subAction(index)">{{ item }}</div>
        <div ref="mover" class="mover"/>
      </div>
    </div>
    <div class="main-info">
      <!-- 基本信息 -->
      <div v-if="subIndex === 0" class="center-info">
        <!-- 第一列 -->
        <div class="row">
          <div class="small-title">基本资料</div>
          <div class="small-item">
            <div class="item-name">用户名称</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">用户ID</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">角色等级</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">注册时间</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
        </div>
        <!-- 第二列 -->
        <div class="row">
          <div class="small-title"/>
          <div class="small-item">
            <div class="item-name">真实姓名</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">手机号码</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">身份证号</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
        </div>
        <!-- 第三列 -->
        <div class="row">
          <div class="small-title"/>
          <div class="small-item">
            <div class="item-name">对应上级</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">上级ID</div>
            <div class="item-info">2019.01.03 15：10：10</div>
          </div>
          <div class="small-item">
            <div class="item-name">上级手机</div>
            <div class="item-info"/>
          </div>
          <div class="small-item">
            <div class="item-name"/>
            <div class="item-info"/>
          </div>
        </div>
      </div>
      <!-- 资金明细 -->
      <div v-if="subIndex === 1" class="main-head">
        <div>
          <!-- <el-button type="primary" size="small">导出CSV</el-button> -->
        </div>
        <div class="head-info">
          <el-input size="small" placeholder="搜索收支类型/来源/金额" class="input-with-select search-icon">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
      </div>
      <el-table
        v-if="subIndex === 1"
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="ID" label="时间"/>
        <el-table-column prop="name" label="收支类型"/>
        <el-table-column prop="name" label="订单类型" />
        <el-table-column prop="address" label="来源" width="120" show-overflow-tooltip/>
        <el-table-column prop="name" label="账户收支" show-overflow-tooltip/>
        <el-table-column prop="name" label="变动金额" show-overflow-tooltip/>
      </el-table>
      <!-- 锁粉信息 -->
      <div v-if="subIndex === 2" class="main-head">
        <div>
          <!-- <el-button type="primary" size="small">导出CSV</el-button> -->
        </div>
        <div class="head-info">
          <el-input size="small" placeholder="搜索收支类型/来源/金额" class="input-with-select search-icon">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
      </div>
      <el-table
        v-if="subIndex === 2"
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="ID" label="用户ID"/>
        <el-table-column prop="name" label="用户名称"/>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="address" label="手机号" width="150" show-overflow-tooltip/>
        <el-table-column prop="name" label="角色" show-overflow-tooltip/>
        <el-table-column prop="name" label="获取用户分润收益" width="150" show-overflow-tooltip/>
      </el-table>
      <!-- 常用申请人 -->
      <div v-if="subIndex === 3" class="main-head">
        <div>
          <!-- <el-button type="primary" size="small">导出CSV</el-button> -->
        </div>
        <div class="head-info">
          <el-input size="small" placeholder="搜索收支类型/来源/金额" class="input-with-select search-icon">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
      </div>
      <el-table
        v-if="subIndex === 3"
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="ID" label="申请人姓名"/>
        <el-table-column prop="name" label="申请人身份证号"/>
        <el-table-column prop="name" label="申请人手机号" />
        <el-table-column prop="address" label="填写时间" width="150" show-overflow-tooltip/>
      </el-table>
      <!-- 商户信息 -->
      <div v-if="subIndex === 4" class="center-info">
        <!-- 第一列 -->
        <div class="row">
          <div class="small-title">商户信息</div>
          <div class="small-item">
            <div class="item-name">店铺名称</div>
            <div class="item-info">咔咔新零售</div>
          </div>
          <div class="small-item">
            <div class="item-name">店铺地址</div>
            <div class="item-info">深圳市奇迹诞生的地方</div>
          </div>
          <div class="small-item">
            <div class="item-name">店铺地址</div>
            <div class="item-info">
              <div class="shoper-img"/>
            </div>
          </div>
        </div>
        <!-- 第二列 -->
        <div class="row">
          <div class="small-title"/>
          <div class="small-item">
            <div class="item-name">法人姓名</div>
            <div class="item-info">刘德华</div>
          </div>
          <div class="small-item">
            <div class="item-name">身份证号</div>
            <div class="item-info">421036199810698516</div>
          </div>
        </div>
        <!-- 第三列 -->
        <div class="row"/>
      </div>
      <!-- 信用卡/储蓄卡 -->
      <div v-if="subIndex === 5" class="main-head">
        <div>
          <!-- <el-button type="primary" size="small">导出CSV</el-button> -->
        </div>
        <div class="head-info">
          <el-input size="small" placeholder="搜索收支类型/来源/金额" class="input-with-select search-icon">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
      </div>
      <el-table
        v-if="subIndex === 5"
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="ID" label="卡片类型"/>
        <el-table-column prop="name" label="持卡人姓名"/>
        <el-table-column prop="name" label="银行卡号" />
        <el-table-column prop="address" label="银行名称" width="150" show-overflow-tooltip/>
        <el-table-column prop="name" label="银行信息" show-overflow-tooltip/>
        <el-table-column prop="name" label="添加时间" show-overflow-tooltip/>
        <el-table-column prop="name" label="状态" show-overflow-tooltip/>
      </el-table>
      <!-- 信用卡订单 -->
      <div v-if="subIndex === 6" class="main-head">
        <div>
          <!-- <el-button type="primary" size="small">导出CSV</el-button> -->
        </div>
        <div class="head-info">
          <el-input size="small" placeholder="搜索收支类型/来源/金额" class="input-with-select search-icon">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </div>
      </div>
      <el-table
        v-if="subIndex === 6"
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="ID" label="订单编号"/>
        <el-table-column prop="name" label="产品名称"/>
        <el-table-column prop="name" label="申请人姓名" />
        <el-table-column prop="address" label="申请人身份证号" width="150" show-overflow-tooltip/>
        <el-table-column prop="name" label="申请人手机号" show-overflow-tooltip/>
        <el-table-column prop="name" label="申请时间" show-overflow-tooltip/>
        <el-table-column prop="name" label="订单状态" show-overflow-tooltip/>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      subList: ['基本信息', '资金明细', '锁粉信息', '下级代理', '信用卡/储蓄卡', '信用卡订单', '贷款订单'],
      subIndex: 0,
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
      origin: this.$route.params.origin
    }
  },
  beforeCreate () {
    console.log(this.$route.params)
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    subAction (index) {
      this.subIndex = index
      this.$refs.mover.style.left = index * 14.285 + '%'
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSelectionChange (val) {
      console.log('选择了', val)
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
$font-color: #4a4a4a;
$border: 1px solid #EBEBEB;
$color: #4993FF;
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .header{
    position: relative;
    padding: 20px 26px;
    padding-bottom: 0;
    margin-top: 1px;
    height: 210px;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    // 字体加粗
    .sum{
      font-size: 20px;
      font-weight: 600;
    }
    .head-top{
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      .info-span{
        display: flex;
        align-items: center;
        .user-img{
          margin-right: 20px;
          height: 48px;
          width: 48px;
          border-radius: 100%;
          overflow: hidden;
          background: #4993FF;
        }
      }
    }
    .header-info{
      padding-left: 71px;
      display: flex;
      justify-content: space-between;
      .left-box{
        min-width: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &>div{
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
        }
        .item-info{
          display: flex;
          .item-name{
            min-width: 76px;
            font-weight: 600;
          }
          .item-attribute{
            min-width: 80px;
          }
        }
      }
      .right-box{
        flex: 1;
        max-width: 690px;
        display: flex;
        justify-content: space-between;
        .num{
          min-width: 83px;
          text-align: right;
          display: flex;
          flex-direction: row;
          .item-name{
            margin-bottom: 16px;
          }
        }
      }
    }
    .subnav{
      position: absolute;
      bottom: 0;
      display: flex;
      .tag{
        margin-right: 20px;
        width: 92px;
        text-align: center;
        line-height: 46px;
        font-weight: 600;
      }
      .actived{
        color: $color;
      }
      .mover{
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 90px;
        background: $color;
        transition: 0.5s;
      }
    }
  }
  .main-info{
    flex: 1;
    background: #fff;
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
          .shoper-img{
            height: 180px;
            width: 335px;
            border: 1px solid gray;
          }
          .item-name{
            width: 76px;
            font-weight: 600;
          }
        }
      }
    }
    .main-head {
      display: flex;
      justify-content: space-between;
      div {
        min-width: 200px;
        overflow: hidden;
      }
      .head-info {
        margin-bottom: 16px;
      }
      .search-icon {
        width: 300px;
        float: right;
        margin-left: 16px;
      }
    }
  }
}
</style>
