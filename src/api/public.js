import request from '@/utils/request'

// 上传图片
export function upload (data) {
  return request({
    url: '/index/upload/image',
    method: 'post',
    data: data
  })
}
