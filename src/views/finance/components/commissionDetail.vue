<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="main-info">
      <div class="center-info">
        <div class="info-lists">
          <div class="item">
            <div class="tag">订单号</div>
            <div class="data">{{ infoArr.from_order_id }}</div>
          </div>
          <div class="item">
            <div class="tag">订单业务</div>
            <div class="data">{{ infoArr.module_text }}</div>
          </div>
          <div class="item">
            <div class="tag">订单总分润金额</div>
            <div class="data">{{ infoArr.earning_amount_text }}</div>
          </div>
          <div class="item">
            <div class="tag">订单发起人ID</div>
            <div class="data">{{ infoArr.from_user_id? infoArr.from_user_id: '' }}</div>
          </div>
          <div class="item">
            <div class="tag">订单发起人姓名</div>
            <div class="data">{{ infoArr.from_user_realname? infoArr.from_user_realname: '' }}</div>
          </div>
          <div class="item">
            <div class="tag">订单发起人所得分润</div>
            <div class="data">{{ infoArr.from_user_amount_text }}</div>
          </div>
          <div class="item">
            <div class="tag">所属上级ID</div>
            <div class="data">{{ infoArr.user_id}}</div>
          </div>
          <div class="item">
            <div class="tag">上级姓名</div>
            <div class="data">{{ infoArr.user_realname? infoArr.user_realname: '' }}</div>
          </div>
          <div class="item">
            <div class="tag">所属上级所得分润</div>
            <div class="data">{{ (infoArr.amount/100).toFixed(2) }}元</div>
          </div>
          <div class="item">
            <div class="tag">订单时间</div>
            <div class="data">{{ infoArr.created_at }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { earningDetail } from '@/api/finance'
export default {
  data () {
    return {
      id: '',
      infoArr: []
    }
  },
  created () {
    this.id = this.$route.query.id
    earningDetail(this.id).then(res => {
      this.infoArr = res.data.data[0]
      // console.log(res.data.data[0])
    }).catch(err => {
      console.log(err)
    })
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
$color: #4993FF;
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .main-info {
    .center-info{
      padding: 14px;
      .info-lists{
        display: flex;
        flex-wrap: wrap;
        .item{
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 33.33%;
          height: 40px;
          padding-right: 20px;
          margin-bottom: 10px;
          font-size: 14px;
          color: #666;
          overflow: hidden;
          .tag{
            width: 120px;
            margin-right: 20px;
            white-space: nowrap;
          }
          .data{
            flex-grow: 1;
            font-weight: 600;
            color: #333;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        &.info-lists{
          .item{
            width: 50%;
          }
        }
      }
    }
  }
}
</style>
