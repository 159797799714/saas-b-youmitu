import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/login/forget')
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('@/views/login/center')  // 外部跳入时接受参数
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/index',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/index/index')
      }
    ]
  },
  // 产品管理
  {
    path: '/products',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'products',
        component: () => import('@/views/products/credit/bankkeep')
      }, {
        path: 'kinds',
        redirect: 'bankkeep',
        name: 'bankkeep',
        component: () => import('@/views/products/credit/bankkeep')
      }, {
        path: 'bankkeep',
        name: 'bankeep',
        component: () => import('@/views/products/credit/bankkeep')
      }, {
        path: 'creditkeep',
        name: 'creditkeep',
        component: () => import('@/views/products/credit/creditkeep')
      }, {
        path: 'creditlist',
        name: 'creditlist',
        component: () => import('@/views/products/credit/creditlist')
      }, {
        path: 'addBank',
        name: 'addBank',
        component: () => import('@/views/products/component/addBank.vue')
      }, {
        path: 'addCredit',
        name: 'addCredit',
        component: () => import('@/views/products/component/addCredit.vue')
      }, {
        path: 'upper',
        name: 'upper',
        component: () => import('@/views/products/credit/upper')
      }, {
        path: 'seeBank',
        name: 'seeBank',
        component: () => import('@/views/products/credit/upper/seeBank')
      }
    ]
  },
  // 订单管理
  {
    path: '/orders',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'orders',
        component: () => import('@/views/orders/repayment/plan')
      }, {
        path: 'creditInfo',
        name: 'creditInfo',
        component: () => import('@/views/finance/memberCard')
      }, {
        path: 'notcard',
        name: 'notcardOrder',
        component: () => ('@/views/orders/notcard/index')
      }, {
        path: 'notcard/details',
        name: 'notcardOrderDetails',
        component: (notcardOrderDetails) => ('@/views/orders/notcard/details')
      }, {
        path: 'repayment/plan',
        name: 'repaymentPlan',
        component: () => ('@/views/orders/repayment/plan')
      }, {
        path: 'repayment/plan/details',
        name: 'repaymentPlanDetails',
        component: () => import('@/views/orders/repayment/plan/details')
      }, {
        path: 'repayment/transaction',
        name: 'repaymentTransaction',
        component: () => import('@/views/orders/repayment/transaction')
      }, {
        path: 'repayment/transaction/details',
        name: 'repaymentTransactionDetails',
        component: () => import('@/views/orders/repayment/transaction/details')
      }, {
        path: 'repayment/settlement',
        name: 'repaymentSettlement',
        component: () => import('@/views/orders/repayment/settlement')
      }, {
        path: 'repayment/settlement/details',
        name: 'repaymentSettlementDetails',
        component: () => import('@/views/orders/repayment/settlement/details')
      }, {
        path: 'Info',
        name: 'Info',
        component: () => import('@/views/orders/component/Info')
      }
    ]
  },
  // 财务管理
  {
    path: '/finance',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'finance',
        component: () => import('@/views/finance/memberCashList')
      }, {
        path: 'memberCashList',
        name: 'memberCashList',
        component: () => import('@/views/finance/memberCashList')
      }, {
        path: 'commission',
        name: 'commission',
        component: () => import('@/views/finance/commission')
      }, {
        path: 'memberCard',
        name: 'memberCard',
        component: () => import('@/views/finance/memberCard')
      }, {
        path: 'cashApply',
        name: 'cashApply',
        component: () => import('@/views/finance/cashApply')
      }, {
        path: 'cashDetail',
        name: 'cashDetail',
        component: () => import('@/views/finance/components/cashDetail')
      }, {
        path: 'applyDetail',
        name: 'applyDetail',
        component: () => import('@/views/finance/components/applyDetail')
      }, {
        path: 'memberCardDetail',
        name: 'memberCardDetail',
        component: () => import('@/views/finance/components/memberCardDetail')
      }, {
        path: 'commissionDetail',
        name: 'commissionDetail',
        component: () => import('@/views/finance/components/commissionDetail')
      }
    ]
  },
  // 会员管理
  {
    path: '/member',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'member',
        component: () => import('@/views/member')
      },
      {
        path: 'agent',
        name: 'agent',
        component: () => import('@/views/member/agent')
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/member/detail')
      },
      {
        path: 'agentDetail',
        name: 'agentDetail',
        component: () => import('@/views/member/agent/agentDetail')
      }
    ]
  },
  // 素材管理
  {
    path: '/material',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'material',
        component: () => import('@/views/material/material')
      },
      {
        path: 'addMaterial',
        name: 'addMaterial',
        component: () => import('@/views/material/material/addMaterial')
      },
      {
        path: 'network',
        name: 'network',
        component: () => import('@/views/material/network')
      },
      {
        path: 'poster',
        name: 'poster',
        component: () => import('@/views/material/poster')
      }
    ]
  },
  // 系统设置
  {
    path: '/setting',
    component: () => import('@/views/setting'),
    children: [
      {
        path: '/',
        name: 'setting',
        component: () => import('@/views/setting/website/information')
      },
      {
        path: 'website/infomation',
        name: 'websiteInfomation',
        component: () => import('@/views/setting/website/information')
      },
      {
        path: 'userSetting',
        name: 'userSetting',
        component: () => import('@/views/setting/userSetting/memberGrade')
      },
      {
        path: 'userSetting/edit',
        name: 'addUperWay',
        component: () => import('@/views/setting/userSetting/memberGrade/addUperWay')
      },
      {
        path: 'member/bonus',
        name: 'memberBonus',
        component: () => import('@/views/setting/userSetting/memberBonus')
      },
      {
        path: 'sms/interface',
        name: 'smsInterface',
        component: () => import('@/views/setting/sms/interface')
      },
      {
        path: 'sms/lists',
        name: 'smsLists',
        component: () => import('@/views/setting/sms/lists')
      },
      {
        path: 'payment/pay',
        name: 'paymentPay',
        component: () => import('@/views/setting/payment/pay')
      },
      {
        path: 'payment/withdraw',
        name: 'paymentWithdraw',
        component: () => import('@/views/setting/payment/withdraw')
      },
      {
        path: 'payment/rule',
        name: 'paymentRule',
        component: () => import('@/views/setting/payment/rule')
      },
      {
        path: 'product/notcard',
        name: 'notcard',
        component: () => import('@/views/setting/product/notcard')
      },
      {
        path: 'product/repayment',
        name: 'repayment',
        component: () => import('@/views/setting/product/repayment')
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
export default new Router({
  // mode: 'history',
  // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
