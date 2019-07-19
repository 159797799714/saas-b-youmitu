import request from '@/utils/request'
// 获取银行列表
export function getGoodsBankList () {
  return request({
    url: '/credit_card/bank/lists',
    method: 'get'
  })
}
// 删除银行
export function delBank (id) {
  return request({
    url: '/credit_card/bank/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}

// 银行绑定渠道
export function getBindchannel (id) {
  return request({
    url: '/credit_card/bank/bindchannel',
    method: 'post',
    data: {
      id: id,
      channel_id: id
    }
  })
}
// 银行分类列表
export function getBankCategoryList (data) {
  return request({
    url: '/credit_card/bank/category_list',
    method: 'post',
    data: {
      id: data.id,
      name: data.name
    }
  })
}

// 银行状态列表
export function getStatusList (data) {
  return request({
    url: '/credit_card/bank/status_list',
    method: 'post',
    data: {
      id: data.id,
      name: data.name
    }
  })
}

// 添加银行
export function addBank (data) {
  console.log(data)
  return request({
    url: '/credit_card/bank/create',
    method: 'post',
    data: data
  })
}

// 编辑银行数据
export function updateBank (data) {
  return request({
    url: '/credit_card/bank/update',
    method: 'post',
    data: data
  })
}

// 银行详情
export function getBankInfo (data) {
  return request({
    url: '/credit_card/bank/update',
    method: 'post',
    data: data
  })
}

// 银行选择渠道列表
export function getBankBindChannelList (id) {
  return request({
    url: '/credit_card/bank/bind_channel_list',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 银行设置状态
export function setBankStatus (id, status) {
  return request({
    url: '/credit_card/bank/set_status',
    method: 'post',
    data: {
      id: id,
      status: status
    }
  })
}

// 编辑信用卡数据
export function updateCredit (data) {
  return request({
    url: '/credit_card/creditcard/update',
    method: 'post',
    data: data
  })
}

// 信用卡

// 添加信用卡
export function addCredit (data) {
  return request({
    url: '/credit_card/credit_card/create',
    method: 'post',
    data: data
  })
}

// 信用卡详情
export function getCreditInfo (data) {
  return request({
    url: '/credit_card/credit_card/info',
    method: 'get',
    data: data
  })
}

// 信用卡列表
export function getCreditList (data) {
  return request({
    url: '/credit_card/credit_card/lists',
    method: 'get',
    data: data
  })
}

// 信用卡分类列表
export function getCreditCategory (data) {
  return request({
    url: '/credit_card/credit_card/category_list',
    method: 'get',
    data: data
  })
}

// 删除信用卡
export function delCredit (id) {
  return request({
    url: '/credit_card/credit_card/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}

// 渠道

// 渠道列表
export function getChannelList (data) {
  return request({
    url: '/credit_card/channel/lists',
    method: 'get',
    data: data
  })
}

// 渠道代码列表
export function getChannelCodeList (data) {
  return request({
    url: '/credit_card/channel/code_list',
    method: 'get',
    data: data
  })
}

// 编辑渠道数据
export function updateChannel (data) {
  return request({
    url: '/credit_card/channel/update',
    method: 'post',
    data: {
      id: data.id,
      code: data.code,
      contact_name: data.contact_name,
      contact_mobile: data.contact_mobile
    }
  })
}

// 删除渠道
export function delChannel (data) {
  return request({
    url: '/credit_card/channel/delete',
    method: 'post',
    data: {
      id: data
    }
  })
}

// 添加渠道
export function addChannel (data) {
  return request({
    url: '/credit_card/channel/create',
    method: 'post',
    data: data
  })
}

// 链接
// 链接列表
export function getLink (data) {
  return request({
    url: '/credit_card/link/lists',
    method: 'get',
    data: {
      channel_id: data
    }
  })
}

// 删除链接
export function delLink (data) {
  return request({
    url: '/credit_card/link/delete',
    method: 'post',
    data: data
  })
}

// 编辑链接数据
export function updateLink (data) {
  return request({
    url: '/credit_card/link/update',
    method: 'post',
    data: data
  })
}

// 添加链接
export function addLink (data) {
  return request({
    url: '/credit_card/link/create',
    method: 'post',
    data: data
  })
}
