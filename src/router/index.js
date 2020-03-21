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

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/Dashboard',
    children: [
      ...routesPages
    ]
  }
]

const router = new VueRouter({
  routes
})

console.log(routesPages)
// 暴露菜单
export const menu = routesPages
export default router
