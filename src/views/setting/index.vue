<template>
  <div class="content">
    <div class="leftNav">
      <leftNav :index="nav.index" :list="nav.list"/>
    </div>
    <div class="right-section">
      <router-view/>
    </div>
  </div>
</template>
<script>
import LeftNav from '@/views/setting/components/leftNav.vue'
export default {
  components: {
    LeftNav
  },
  data () {
    return {
      title: '',
      nav: {
        index: '0',
        list: [
          {
            title: '网站基础设置',
            iconClass: 'icon-wangzhanshezhi',
            child: [
              {
                title: '网站信息',
                pathName: 'websiteInfomation'
              }
            ]
          },
          {
            title: '用户设置',
            iconClass: 'icon-yonghushezhi1',
            child: [
              {
                title: '会员等级配置',
                pathName: 'userSetting'
              },
              {
                title: '会员分润配置',
                pathName: 'memberBonus'
              }
            ]
          },
          {
            title: '短信设置',
            iconClass: 'icon-duanxinshezhi',
            child: [
              {
                title: '短信接口设置',
                pathName: 'smsInterface'
              },
              {
                title: '短信模块列表',
                pathName: 'smsLists'
              }
            ]
          },
          {
            title: '支付提现设置',
            iconClass: 'icon-zhifutixian',
            child: [
              {
                title: '支付方式设置',
                pathName: 'paymentPay'
              },
              {
                title: '提现方式设置',
                pathName: 'paymentWithdraw'
              },
              {
                title: '提现规则设置',
                pathName: 'paymentRule'
              }
            ]
          },
          {
            title: '产品相关设置',
            iconClass: 'icon-chanpinshezhi',
            child: [
              // {
              //   title: '无卡支付通道设置',
              //   pathName: 'notcard'
              // },
              {
                title: '代还通道设置',
                pathName: 'repayment'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/views/setting/css/index.scss';
$nav-color: #E6EBF4;
.content{
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  .leftNav{
    width: 200px;
    height: 100%;
    border-right: solid 1px #e6e6e6;
  }
  .right-section{
    flex: 1;
    display: flex;
  }
}
</style>
