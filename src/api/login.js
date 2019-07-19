import request from '@/utils/request'

// 登录
export function login (data) {
  return request({
    url: '/admin/auth/login',
    method: 'post',
    data: data
  })
}

// 重置密码
export function resetPass (data) {
  return request({
    url: '/admin/auth/resetPassword',
    method: 'post',
    params: data
  })
}

// 获取图形验证码
export function getCaptcha () {
  return request({
    url: '/index/captcha/index',
    method: 'post'
  })
}

// 获取手机验证码
export function getCode (data) {
  return request({
    url: '/index/sms/send',
    method: 'post',
    data: {
      mobile: data,
      type: 1
    }
  })
}
