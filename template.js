/**
 * 自动生成文件脚本,执行命令 npm run tep `文件名`
 */

// eslint-disable-next-line no-unused-vars
const fs = require('fs')

const dirName = process.argv[2]

if (!dirName) {
  console.log('文件夹名称不能为空！')
  console.log('示例：npm run tep test')
  process.exit(0)
}

// 页面模版
const indexTep = `
<template>
  <div class="${dirName}">
    ${dirName}页面
  </div>
</template>

<script>

export default {
  name: '${titleCase(dirName)}',
  pageConfig: {
    groupsKey: '组key',
    groupsName: '组Name',
    pageTitle: '菜单名称',
    pageName: '路由name',
    sort: '排序'
  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.${dirName}{

}
</style>
`

// model文件模版
// eslint-disable-next-line no-unused-vars
const mixTep = `
export default {
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {

  }
}
`

// service页面模版
// eslint-disable-next-line no-unused-vars
const serviceTep = `
import request from '@/utils/request'

export const fetchDate = (params) => {
  return request({
    url: '/api/bigdata/xxxx',
    method: 'get',
    params
  })
}

export const save = (data) => {
  return request({
    url: '/api/bigdata/xxxx',
    method: 'post',
    data
  })
}

export const update = (data) => {
  return request({
    url: '/api/bigdata/xxxx',
    method: 'post',
    data
  })
}
`

fs.mkdirSync(`./src/views/${dirName}`) // mkdir $1
process.chdir(`./src/views/${dirName}`) // cd $1

fs.writeFileSync('index.vue', indexTep)
// fs.writeFileSync('api.js', serviceTep)
// fs.writeFileSync('mixProps.js', mixTep)

console.log(`模版${dirName}已创建,请手补全其他信息`)

function titleCase(str) {
  const array = str.toLowerCase().split(' ')
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length)
  }
  const string = array.join(' ')
  return string
}

process.exit(0)
