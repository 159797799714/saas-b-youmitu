import request from '@/utils/request'

// 获取计划列表
export function getRepayPlanList (data) {
  return request({
    url: '/repay/plan/index',
    method: 'get',
    params: data
  })
}

// 获取计划详情
export function getRepayPlanDetail (data) {
  return request({
    url: '/repay/plan/view',
    method: 'get',
    params: data
  })
}

// 根据计划主键获取计划项目列表
export function getRepayPlanProjectList (data) {
  return request({
    url: '/repay/plan_item/index',
    method: 'get',
    params: data
  })
}

// 获取计划项目详情
export function getRepayPlanProjectDetail (data) {
  return request({
    url: '/repay/plan_item/view',
    method: 'get',
    params: data
  })
}

// 查看计划管理分润信息
export function getRepayPlanProfit (data) {
  return request({
    url: '/earning/record/repay_plan',
    method: 'get',
    params: data
  })
}

// 查看订单分润信息
export function getRepayOrderProfit (data) {
  return request({
    url: '/earning/record/repay_order',
    method: 'get',
    params: data
  })
}

// 查看订单列表
export function getRepayOrderList (data) {
  return request({
    url: '/repay/order/index',
    method: 'get',
    params: data
  })
}

// 查看订单详情
export function getRepayOrderDetail (data) {
  return request({
    url: '/repay/order/view',
    method: 'get',
    params: data
  })
}
