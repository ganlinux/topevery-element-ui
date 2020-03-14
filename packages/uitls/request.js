import axios from 'axios'
import { Message } from 'element-ui'
import { token } from './token'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken, getTokenR } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (token) {
      config.headers['token'] = token
      // config.headers['refresh_token'] = getTokenR()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.success) {
      return response
    } else {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
