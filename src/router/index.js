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

router.afterEach(route => {
  document.title = 'TopEvery Ui -' + route.meta.title
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

// 暴露菜单
export const menu = routesPages
export default router
