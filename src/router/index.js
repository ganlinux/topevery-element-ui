import Vue from 'vue'
import hljs from 'highlight.js'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

export const routesList = [
  {
    path: 'Dashboard',
    name: 'Dashboard',
    meta: { title: '首页', icon: 'Dashboard', affix: true },
    component: () => import('@/views/Dashboard/index')
  },
  {
    path: 'RenderTable',
    name: 'RenderTable',
    meta: { title: '表格组件', icon: 'RenderTable', affix: true },
    component: () => import('@/views/RenderTable/index')
  },
  {
    path: 'SearchBar',
    name: 'SearchBar',
    meta: { title: '搜索组件', icon: 'SearchBar', affix: true },
    component: () => import('@/views/SearchBar/index')
  },
  {
    path: 'MaxHeight',
    name: 'MaxHeight',
    meta: { title: '计算高度容器组件', icon: 'MaxHeight', affix: true },
    component: () => import('@/views/MaxHeight/index')
  },
  {
    path: 'RenderTableList',
    name: 'RenderTableList',
    meta: { title: '表格列表组件', icon: 'RenderTableList', affix: true },
    component: () => import('@/views/RenderTableList/index')
  },
  {
    path: 'SelectBar',
    name: 'SelectBar',
    meta: { title: '下拉选择组件', icon: 'SelectBar', affix: true },
    component: () => import('@/views/SelectBar/index')
  },
  {
    path: 'SelectTree',
    name: 'SelectTree',
    meta: { title: '树形选择', icon: 'SelectTree', affix: true },
    component: () => import('@/views/SelectTree/index')
  },
  {
    path: 'CubeDialog',
    name: 'CubeDialog',
    meta: { title: '弹层', icon: 'CubeDialog', affix: true },
    component: () => import('@/views/CubeDialog/index')
  },
  {
    path: 'CubeSelect',
    name: 'CubeSelect',
    meta: { title: '业务选择组件', icon: 'CubeSelect', affix: true },
    component: () => import('@/views/CubeDialog/index')
  }
]

const menus = routesList.map(item => {
  return {
    path: item.path,
    component: item.component,
    name: 'Dashboard',
    meta: { title: '首页', icon: 'dashboard', affix: true }
  }
})

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      ...menus
    ]
  }
]

const router = new VueRouter({
  routes
})

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

export default router
