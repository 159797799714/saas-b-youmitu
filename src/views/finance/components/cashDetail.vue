<template>
  <div class="main">
    <div class="info" @click="goback"><i class="el-icon-arrow-left"/>返回上一页</div>
    <div class="main-info">
      <div class="center-info">
        <div class="info-lists">
          <div class="item">
            <div class="tag ">用户收支订单编号</div>
            <div class="data">{{ Info.id }}</div>
          </div>
          <div class="item">
            <div class="tag">用户ID</div>
            <div class="data">{{ Info.user_id }}</div>
          </div>
          <div class="item">
            <div class="tag">用户名</div>
            <div class="data">{{ Info.user_nickname? Info.user_nickname: ''}}</div>
          </div>
          <div class="item">
            <div class="tag">姓名</div>
            <div class="data">{{ Info.user_realname? Info.user_realname: ''}}</div>
          </div>
          <div class="item">
            <div class="tag">关联手机号</div>
            <div class="data">{{ Info.user_mobile }}</div>
          </div>
          <div class="item">
            <div class="tag">角色等级</div>
            <div class="data">{{ Info.user_level_name?Info.user_level_name: '' }}</div>
          </div>
          <div class="item">
            <div class="tag">收支来源</div>
            <div class="data">{{ Info.from_type_text }}</div>
          </div>
          <div class="item">
            <div class="tag">业务订单编号</div>
            <div class="data">{{ Info.from_id }}</div>
          </div>
          <div class="item">
            <div class="tag">收支类型</div>
            <div class="data">{{ Info.type_text }}</div>
          </div>
          <div class="item">
            <div class="tag">变动前账户余额</div>
            <div class="data">{{ Info.before_amount_text }}</div>
          </div>
          <div class="item">
            <div class="tag">收支金额</div>
            <div class="data">{{ Info.amount_text }}</div>
          </div>
          <div class="item">
            <div class="tag">变动后账户余额</div>
            <div class="data">{{ Info.after_amount_text }}</div>
          </div>
          <div class="item">
            <div class="tag">时间</div>
            <div class="data">{{ Info.created_at }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Footbar from '@/components/pagination/index.vue'
import { memberCashDetail } from '@/api/finance'
export default {
  data () {
    return {
      id: '',
      Info: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    memberCashDetail(this.id).then(res => {
      this.Info = res.data.data[0]
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
            width: 100px;
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
