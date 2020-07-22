import Cookies from 'js-cookie';
import axios from 'axios';

// import { MessageBox, Message } from 'element-ui'
// const token = localStorage.getItem('token')

const TokenKey = Cookies.get('TokenKey')
const token = Cookies.get(TokenKey);
// create an axios instance
const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.token = token;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    // eslint-disable-next-line no-undef
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const result = response;
    // const { success, msg } = result;
    // if (success) {
    //   return result;
    // } else {
    //   const message = msg || '网络请求异常';
    //   // eslint-disable-next-line no-undef
    //   return Promise.reject({ message: message, type: 'error' });
    // }
    return result
  },
  error => {
    // const message = error.msg ? error.msg : '网络异常';
    // return Promise.reject({ message: message, type: 'error' });
    return Promise.reject(error);
  }
);

export default service;
