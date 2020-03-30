import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/getUserInfo',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取验证码
export function getCaptcha(params) {
  return request({
    url: '/captcha',
    method: 'get',
    params
  })
}
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取人员类型树
export function getClassTree(data) {
  return request({
    url: '/class/getClassTree',
    method: 'post',
    data
  })
}

// 人员列表分页
export function getPersonListPage(data) {
  return request({
    url: '/person/getPersonListPage',
    method: 'post',
    data
  })
}
