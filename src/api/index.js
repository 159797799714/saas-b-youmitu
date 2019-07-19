import request from '@/utils/request'
// 总览页面
// 用户统计
export function getUser (data) {
  return request({
    url: '/overview/index/user',
    method: 'get'
  })
}

// 收入统计
export function getIncome (data) {
  return request({
    url: '/overview/index/income',
    method: 'get'
  })
}
