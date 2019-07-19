<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="main-info">
      <div class="header">
        <span v-for="(item, index) in navList" :key="index" :class="{nav: true, selected: index === selectIndex}" @click="selectNav(index)">{{ item }}</span>
      </div>
      <div v-if="selectIndex === 0" class="table-info">
        <el-table
          ref="multipleTable"
          :data="creditList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="id" label="持卡人姓名"/>
          <el-table-column prop="account_no" label="银行卡号"/>
          <el-table-column prop="holder_telephone" label="预留手机号"/>
          <el-table-column prop="bank_name" label="银行名称"/>
          <el-table-column label="有效期">
            <template slot-scope="scope">
              {{ scope.row.billing_day }}天
            </template>
          </el-table-column>
          <el-table-column label="CVV码">
            <template slot-scope="scope">
              {{ scope.row.cvv }}
            </template>
          </el-table-column>
          <el-table-column prop="repayment_day" label="还款日"/>
          <el-table-column prop="expire_date" label="账单日"/>
          <el-table-column label="卡片额度">
            <template slot-scope="scope">
              {{ (scope.row.amount/100).toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="添加时间"/>
        </el-table>
      </div>
      <div v-if="selectIndex === 1" class="table-info">
        <el-table
          ref="multipleTable"
          :data="bankList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="realname" label="持卡人姓名"/>
          <el-table-column prop="card_number" label="银行卡号"/>
          <el-table-column prop="bank_name" label="银行民称"/>
          <el-table-column prop="bank_code" label="银行信息"/>
          <el-table-column label="添加时间">
            <template slot-scope="scope">
              {{ scope.row.created_at }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { creditList, bankList } from '@/api/finance'
export default {
  data () {
    return {
      user_id: '',
      creditList: [],
      bankList: [],
      navList: ['信用卡', '储蓄卡'],
      selectIndex: 0
    }
  },
  created () {
    this.user_id = this.$route.query.id
    this.getCreditList()
  },
  watch: {
    selectIndex (val, oldval) {
      if (val === 0) {
        this.getCreditList()
      } else if (val === 1) {
        this.getBankList()
      }
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    selectNav (index) {
      this.selectIndex = index
    },
    // 获取信用卡列表
    getCreditList () {
      creditList(this.user_id).then(res => {
        this.creditList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取银行列表
    getBankList () {
      bankList(this.user_id).then(res => {
        this.bankList = res.data.data
      }).catch(err => {
        console.log(err)
      })
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
  .main-info {
    padding: 0 16px;
    .header{
      margin-bottom: 16px;
      border-bottom: 1px solid #EBEBEB;
      .nav{
        display: inline-block;
        width: 74px;
        margin-right: 16px;
        text-align: center;
        line-height: 40px;
        border-bottom: 2px solid #fff;
        cursor: pointer;
      }
      .selected{
        color: #4993FF;
        border-bottom: 2px solid #4993FF;
      }
    }
  }
}
</style>
