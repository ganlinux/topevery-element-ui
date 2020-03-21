// 自动读取路由页面
const files = require.context('./', true, /index\.vue$/)
const pages = {}
files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})
export default pages
