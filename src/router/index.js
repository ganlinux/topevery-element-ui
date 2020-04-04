import hljs from 'highlight.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import page from '@/views'

Vue.use(VueRouter)

const routesPages = []
Object.keys(page).forEach(item => {
  routesPages.push({
    path: `/${page[item].name}`,
    name: page[item].name,
    meta: { title: page[item].title },
    component: page[item]
  })
})

const routesPagesArray = []
const routesPagesObject = {}
Object.keys(page).forEach(item => {
  const pageItem = page[item]
  if (!pageItem.pageConfig) return
  const key = pageItem.pageConfig.groupsKey
  const groupsName = pageItem.pageConfig.groupsName
  const sort = pageItem.pageConfig.sort

  const title = pageItem.pageConfig.pageTitle
  if (!routesPagesObject[key]) {
    routesPagesObject[key] = {
      key: key,
      title: title,
      groupsName: groupsName,
      path: `${pageItem.pageConfig.pageName}`,
      name: pageItem.pageConfig.pageName,
      children: []
    }
  }
  routesPagesObject[key].children.push({
    key: key,
    title: title,
    sort: sort * 1,
    groupsName: groupsName,
    path: `${pageItem.pageConfig.pageName}`,
    name: pageItem.pageConfig.pageName,
    component: pageItem
  })
  routesPagesObject[key].children.sort((a, b) => a.sort - b.sort)
})
for (const key in routesPagesObject) {
  // eslint-disable-next-line no-prototype-builtins
  if (routesPagesObject.hasOwnProperty(key)) {
    const element = routesPagesObject[key]
    routesPagesArray.push(element)
  }
}

const routes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/Dashboard',
  //   children: [
  //     ...routesPages
  //   ]
  // }
]

for (const item of routesPagesArray) {
  routes.push({
    key: item.key,
    title: item.title,
    groupsName: item.groupsName,
    path: item.key === 'Dashboard' ? '/' : `/${item.key}`,
    redirect: item.children.length ? item.children[0].path : null,
    component: Layout,
    children: item.children
  })
}

const router = new VueRouter({
  routes
})

router.afterEach(route => {
  document.title = 'TopEvery Ui -' + route.meta.title
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

// 暴露菜单
export const menu = routes

export default router
