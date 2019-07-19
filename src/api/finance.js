import request from '@/utils/request'
// 会员收支明细
// 会员收支明细列表数据
export function memberCashList (data) {
  return request({
    url: '/finance/user/balance_change',
    method: 'get',
    params: data
  })
}

// 会员收支明细顶部统计数据
export function getCashStatistics () {
  return request({
    url: '/finance/user/balance_change_statistics',
    method: 'get'
  })
}

// 会员收支明细列表数据
export function memberCashDetail (id) {
  return request({
    url: '/finance/user/balance_change',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 会员收支明细收支类型，来源类型
export function balanceStatus () {
  return request({
    url: '/finance/user/balance_change_status',
    method: 'get'
  })
}

// 提现申请管理
// 提现申请管理列表
export function cashApplyList (data) {
  return request({
    url: '/finance/withdraw/lists',
    method: 'get',
    params: data
  })
}

// 提现审核状态/提现状态
export function cashApplyStatus () {
  return request({
    url: '/finance/withdraw/list_option',
    method: 'get'
  })
}

// 提现申请管理列表详情
export function applyDetail (id) {
  return request({
    url: '/finance/withdraw/lists',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 提现申请管理列表详情页审核通过
export function applySuccess (data) {
  return request({
    url: '/finance/withdraw/apply_success',
    method: 'post',
    data: data
  })
}

// 提现申请管理列表详情页审核通过
export function applyReject (data) {
  return request({
    url: '/finance/withdraw/apply_failed',
    method: 'post',
    data: data
  })
}

// 会员银行卡管理
// 会员银行卡管理列表
export function memberBankList (data) {
  return request({
    url: '/member/user/bank_card_list',
    method: 'get',
    params: data
  })
}

// 获取信用卡列表
export function creditList (id) {
  return request({
    url: '/member/repay_c_c/list',
    method: 'get',
    params: {
      user_id: id
    }
  })
}

// 获取银行卡卡列表
export function bankList (id) {
  return request({
    url: '/member/bank_card/list',
    method: 'get',
    params: {
      user_id: id
    }
  })
}

// 佣金明细
// 佣金明细列表
export function commissionList (data) {
  return request({
    url: '/earning/record/lists',
    method: 'get',
    params: data
  })
}

// 订单业务列表 /分润模块列表
export function earningModule (data) {
  return request({
    url: '/earning/index/modules',
    method: 'get',
    params: data
  })
}

// 分润详情
export function earningDetail (id) {
  return request({
    url: '/earning/record/lists',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 佣金分润统计
export function getStatistics () {
  return request({
    url: '/earning/record/statistics',
    method: 'get'
  })
}
