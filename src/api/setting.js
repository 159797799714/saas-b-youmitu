import request from '@/utils/request'

// 获取角色列表
export function getRolerList (data) {
  return request({
    url: '/member/user_level_config/list',
    method: 'get',
    params: data
  })
}

// 调整角色顺序
export function adjust (data) {
  return request({
    url: '/member/user_level_config/adjust',
    method: 'post',
    data: data
  })
}

// 删除角色
export function delRoler (data) {
  return request({
    url: '/member/user_level_config/del',
    method: 'post',
    data: data
  })
}

// 新增角色
export function addRoler (data) {
  return request({
    url: '/member/user_level_config/add',
    method: 'post',
    data: data
  })
}

// 编辑角色
export function editToler (data) {
  return request({
    url: '/member/user_level_config/edit',
    method: 'post',
    data: data
  })
}

// 升级配置
// 获取升级方式列表
export function getUperWay (data) {
  return request({
    url: '/member/user_level_up_config/list',
    method: 'get',
    params: data
  })
}

// 删除升级方式
export function delUperWay (data) {
  return request({
    url: '/member/user_level_up_config/del',
    method: 'post',
    data: data
  })
}

// 编辑升级方式
export function editUperWay (data) {
  return request({
    url: '/member/user_level_up_config/edit',
    method: 'post',
    data: data
  })
}

// 新增升级方式
export function addUperWay (data) {
  return request({
    url: '/member/user_level_up_config/add',
    method: 'post',
    data: data
  })
}

// 升级事件列表
export function getUperEventList (data) {
  return request({
    url: '/member/user_level_up_config/eventList',
    method: 'get',
    params: data
  })
}

// 获取网站基础设置
export function getBaseWebConfig () {
  return request({
    url: '/setting/basis_config/getInfo',
    method: 'get'
  })
}

// 获取登录首页logo icon，基础信息YangChao:

export function getWebSiteIcon () {
  return request({
    url: '/setting/basis_config/getWebSiteIcon',
    method: 'get'
  })
}

// 添加网站基础设置
export function addBaseWebConfig (data) {
  return request({
    url: '/setting/basis_config/create',
    method: 'post',
    data: data
  })
}

// 获取短信配置列表
export function getSmsConfigList (data) {
  return request({
    url: '/setting/sms_config/getConfigList',
    method: 'get',
    params: data
  })
}

// 添加短信配置
export function editSmsConfig (data) {
  return request({
    url: '/setting/sms_config/create',
    method: 'post',
    data: data
  })
}

// 短信配置开启和关闭
export function changeSmsConfigStatus (data) {
  return request({
    url: '/setting/sms_config/Status',
    method: 'post',
    data: data
  })
}

// 添加短信模板信息
export function addSmsTemplate (data) {
  return request({
    url: '/setting/sms_template/create',
    method: 'post',
    data: data
  })
}

// 租户模板列表
export function getSmsTemplateTenantList (data) {
  return request({
    url: '/setting/sms_template/getTenantList',
    method: 'get',
    params: data
  })
}

// 短信模板开启关闭
export function changeSmsTemplateStatus (data) {
  return request({
    url: '/setting/Sms_Template/status',
    method: 'POST',
    data: data
  })
}

// 短信模板变量列表
export function getSmsTemplateVariableList (data) {
  return request({
    url: '/setting/sms_template/getVariableList',
    method: 'POST',
    data: data
  })
}

// 提现方式列表
export function getWithdrawWayList () {
  return request({
    url: '/setting/pay_config/getList',
    method: 'get'
  })
}

// 提现方式状态
export function changeWithdrawWayStatus (data) {
  return request({
    url: '/setting/pay_config/status',
    method: 'POST',
    data: data
  })
}

// 提现方式修改
export function editWithdrawWay (data) {
  return request({
    url: '/setting/pay_config/create',
    method: 'POST',
    data: data
  })
}

// 提现配置列表
export function getWithdrawConfigList () {
  return request({
    url: '/setting/withdraw_config/getList',
    method: 'get'
  })
}

// 修改提现设置状态
export function changeWithdrawConfigStatus (data) {
  return request({
    url: '/setting/withdraw_config/status',
    method: 'POST',
    data: data
  })
}

// 修改提现配置
export function editWithdrawConfig (data) {
  return request({
    url: '/setting/withdraw_config/create',
    method: 'POST',
    data: data
  })
}

// 查看代还通道列表
export function getRepayWayList () {
  return request({
    url: '/repay/gateway/index',
    method: 'get'
  })
}

// 查看代还通道详情
export function getRepayWayDetail (data) {
  return request({
    url: '/repay/gateway/view',
    method: 'get',
    params: data
  })
}

// 修改代还通道配置
export function editRepayWayConfig (data) {
  return request({
    url: '/repay/gateway/update',
    method: 'put',
    data: data
  })
}

// 启用代还通道配置
export function enableRepayWay (data) {
  return request({
    url: '/repay/gateway/enable',
    method: 'put',
    data: data
  })
}

// 禁用代还通道配置
export function disableRepayWay (data) {
  return request({
    url: '/repay/gateway/disable',
    method: 'put',
    data: data
  })
}

// 查看代还分润规则列表
export function getRepayBonusRuleList (data) {
  return request({
    url: '/repay/rule/index',
    method: 'get',
    params: data
  })
}

// 查看代还分润规则详情
export function getRepayBonusRuleDetail (data) {
  return request({
    url: '/repay/rule/view',
    method: 'get',
    params: data
  })
}

// 编辑代还分润规则
export function editRepayBonusRule (data) {
  return request({
    url: '/repay/rule/update',
    method: 'put',
    data: data
  })
}
