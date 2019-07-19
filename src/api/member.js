import request from '@/utils/request'

// 获取角色列表
export function getRolerList (data) {
  return request({
    url: '/member/user/userLevel',
    method: 'get',
    params: data
  })
}

// 获取角色列表
export function getStatusList (data) {
  return request({
    url: '/member/user/status',
    method: 'get',
    params: data
  })
}

// 获取会员列表
export function getMemberList (data) {
  return request({
    url: '/member/user/list',
    method: 'get',
    params: data
  })
}

// 获取会员详情
export function getMemberDetail (data) {
  return request({
    url: '/member/user/detail',
    method: 'get',
    params: data
  })
}

// 冻结/解冻会员
export function memberFreeze (data) {
  return request({
    url: '/member/user/freeze',
    method: 'post',
    data: data
  })
}

// 变更上级
export function memberChangeParent (data) {
  return request({
    url: '/member/user/changeParent',
    method: 'post',
    data: data
  })
}

// 升降级
export function memberChangeLevel (data) {
  return request({
    url: '/member/user/changeUserLevel',
    method: 'post',
    data: data
  })
}

// 获取会员资金明细
export function getMemberBalance (data) {
  return request({
    url: '/member/user/balanceChangeRecode',
    method: 'get',
    params: data
  })
}

// 获取会员锁粉列表
export function getMemberLockList (data) {
  return request({
    url: '/member/user/lockList',
    method: 'get',
    params: data
  })
}

// 获取会员信用卡列表
export function getMemberCreditcardList (data) {
  return request({
    url: '/member/repay_c_c/list',
    method: 'get',
    params: data
  })
}

// 获取会员储蓄卡列表
export function getMemberDepositcardList (data) {
  return request({
    url: '/member/bank_card/list',
    method: 'get',
    params: data
  })
}
