import request from '@/utils/request'

export function getInfo (token) {
  return request({
    url: '/getUserInfo',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}
