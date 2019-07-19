<template>
  <div :class="classObj" class="app-wrapper">
    <el-header class="header">
      <div class="logo">
        <img :src="logoUrl">
        <p>{{ platform_name }}</p>
      </div>
      <div class="headnav">
        <li v-for="(item, index) in headnavList" :key="index" :class="{actived: index == selectItem}" @click="selectAction(index)" >{{ item.title }}</li>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="@/assets/admin.png" class="user-avatar">
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item >
              <span style="display:block;" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <div v-if="headnavList[selectIndex].list.length > 0" class="leftnav">
      <leftbar :list="headnavList[selectIndex].list"/>
    </div>
    <div :class="{'main-container': true, container2: selectItem === '0'}">
      <app-main class="content-bg">
        <router-view/>
      </app-main>
    </div>
  </div>
</template>

<script>
import { getWebSiteIcon } from '@/api/setting'
import { AppMain, Leftbar } from './components'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Leftbar
  },
  data () {
    return {
      headnavList: [{
        title: '总览',
        href: { name: 'index' },
        list: []
      }, {
        title: '用户管理',
        href: { name: 'member' },
        list: [
          {
            title: '会员管理',
            iconClass: 'icon-wode',
            child: [
              {
                title: '会员管理',
                pathName: 'member'
              }
            ]
          }
          // {
          //   title: '代理管理',
          //   iconClass: 'icon-duixiang',
          //   child: [
          //     {
          //       title: '代理管理',
          //       pathName: 'agent'
          //     }
          //   ]
          // }
        ]
      // }, {
      //   title: '产品管理',
      //   href: { name: 'products' },
      //   list: [
      //     {
      //       title: '信用卡',
      //       iconClass: 'icon-tongxunlu',
      //       child: [
      //         {
      //           title: '银行列表',
      //           pathName: 'bankkeep'
      //         },
      //         {
      //           title: '信用卡列表',
      //           pathName: 'creditkeep'
      //         },
      //         {
      //           title: '信用卡分类',
      //           pathName: 'creditlist'
      //         },
      //         {
      //           title: '上游渠道管理',
      //           pathName: 'upper'
      //         }
      //       ]
      //     }
      //   ]
      }, {
        title: '订单管理',
        href: { name: 'orders' },
        list: [
          // {
          //   title: '信用卡首次订单',
          //   iconClass: 'icon-tongxunlu',
          //   child: [
          //     {
          //       title: '信用卡首次订单',
          //       pathName: 'creditOrderOne'
          //     }
          //   ]
          // },
          // {
          //   title: '信用卡二次订单',
          //   iconClass: 'icon-tongxunlu',
          //   child: [
          //     {
          //       title: '信用卡二次订单',
          //       pathName: 'creditOrderTwo'
          //     }
          //   ]
          // },
          // {
          //   title: '套现订单管理',
          //   iconClass: 'icon-zhifu',
          //   child: [
          //     {
          //       title: '套现订单管理',
          //       pathName: 'notcardOrder'
          //     }
          //   ]
          // },
          {
            title: '智能代还',
            iconClass: 'icon-daihuan',
            child: [
              {
                title: '计划管理',
                pathName: 'orders'
              },
              {
                title: '交易管理',
                pathName: 'repaymentTransaction'
              },
              {
                title: '结算管理',
                pathName: 'repaymentSettlement'
              }
            ]
          }
        ]
      }, {
        title: '财务管理',
        href: { name: 'finance' },
        list: [
          {
            title: '会员收支明细',
            iconClass: 'icon-huiyuan',
            child: [
              {
                title: '会员收支明细',
                pathName: 'finance'
              }
            ]
          },
          {
            title: '提现申请管理',
            iconClass: 'icon-tixian',
            child: [
              {
                title: '提现申请管理',
                pathName: 'cashApply'
              }
            ]
          },
          {
            title: '会员银行卡管理',
            iconClass: 'icon-yinhangka',
            child: [
              {
                title: '会员银行卡管理',
                pathName: 'memberCard'
              }
            ]
          },
          {
            title: '佣金明细',
            iconClass: 'icon-qian',
            child: [
              {
                title: '佣金明细',
                pathName: 'commission'
              }
            ]
          }
        ]
      }, {
      //   title: '运营管理',
      //   href: { name: 'material' },
      //   list: [
      //     {
      //       title: '素材管理',
      //       iconClass: 'icon-sucai',
      //       child: [
      //         {
      //           title: '素材管理',
      //           pathName: 'material'
      //         }
      //       ]
      //     },
      //     {
      //       title: '海报管理',
      //       iconClass: 'icon-yingxiaogongju-shoujihaibao',
      //       child: [
      //         {
      //           title: '海报管理',
      //           pathName: 'poster'
      //         }
      //       ]
      //     },
      //     {
      //       title: '网络素材',
      //       iconClass: 'icon-iconset0402',
      //       child: [
      //         {
      //           title: '网络素材',
      //           pathName: 'network'
      //         }
      //       ]
      //     }
      //   ]
      // }, {
      //   title: '权限角色',
      //   href: { path: '/404' },
      //   list: []
      // }, {
        title: '系统管理',
        href: { name: 'setting' },
        list: []
      }],
      selectItem: '',
      selectIndex: 0,
      logoUrl: '',                            // 后台logo
      platform_name: ''                       // 后台名称
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created () {
    for (let index = 0; index < this.headnavList.length; index++) {
      if (this.$route.path.indexOf(this.headnavList[index].href.name) !== -1) {
        this.selectItem = '' + index
        this.selectIndex = index
        break
      }
    }
  },
  beforeMount () {
    this.getInfo()
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    // 顶部导航栏
    selectAction (index) {
      this.selectItem = index.toString()
      this.selectIndex = index
      this.$router.push(this.headnavList[index].href)
    },
    logout () {
      // sessionStorage.clear()
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    getInfo () {
      // 获取logo
      getWebSiteIcon().then(res => {
        if (res.data.code === 0) {
          this.logoUrl = '//' + res.data.data.domain + res.data.data.website_icon
          this.platform_name = res.data.data.platform_name
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    .header{
      height: 50px !important;
      padding: 0;
      background: #4993FF;
      color: #fff;
      display: flex;
      line-height: 100%;
      text-align: center;
      .logo{
        width: 180px;
        margin-left: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        &>img{
          display: block;
          height: 32px;
        }
        p{
          width: 80px;
          margin-left: 10px;
          line-height: 100%;
          font-size: 16px;
          font-weight: 600;
          text-align: left;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .headnav{
        display: flex;
        height: 100%;
        flex: 1;
        overflow: hidden;
        li{
          width: 95px;
          text-align: center;
          line-height: 50px;
          color: white;
          &:hover{
            background: #4487E9;
            cursor: pointer;
          }
        }
        .actived{
          background: #4487E9;
        }
        .avatar-container {
          height: 50px;
          display: inline-block;
          position: absolute;
          right: 35px;
          .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            line-height: initial;
            .user-avatar {
              width: 30px;
              height: 30px;
              margin-top: 5px;
              border-radius: 10px;
            }
            .el-icon-caret-bottom {
              position: absolute;
              right: -20px;
              top: 25px;
              font-size: 12px;
            }
          }
        }
      }
    }
    .leftnav{
      box-sizing: border-box;
      width: 180px;
      height: calc(100% - 60px);
      position: absolute;
      padding-top: 17px;
      border-right: 1px solid #ECF0F5;
      background: $color-bg-white;
      li{
        height: 46px;
        width: 100%;
        line-height: 46px;
        text-align: center;
        color: #444;
        border-right: 4px solid #fff;
        font-weight: $font-600;
        &:hover{
          color: #4993FF;
          background: #F0F8FF;
          border-right: 4px solid #4993FF;
        }
      }
      .actived{
        color: #4993FF;
        background: #F0F8FF;
        border-right: 4px solid #4993FF;
      }
    }
    .container2{
      margin-left: 0px !important;
    }
    .content-bg{
      width: 100%;
      box-sizing: border-box;
      background: #ECF0F5;
      display: flex;
      flex-direction: column;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
