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
    path: 'CubeIcon',
    name: 'CubeIcon',
    meta: { title: 'Icon图标库', icon: 'CubeIcon', affix: true },
    component: () => import('@/views/CubeIcon/index')
  },
  {
    path: 'CubeRadio',
    name: 'CubeRadio',
    meta: { title: 'CubeRadio单选', icon: 'CubeRadio', affix: true },
    component: () => import('@/views/CubeRadio/index')
  },
  {
    path: 'SelectBar',
    name: 'SelectBar',
    meta: { title: 'SelectBar选择组件', icon: 'SelectBar', affix: true },
    component: () => import('@/views/SelectBar/index')
  },
  {
    path: 'CubeTable',
    name: 'CubeTable',
    meta: { title: 'CubeTable表格', icon: 'CubeTable', affix: true },
    component: () => import('@/views/CubeTable/index')
  },
  {
    path: 'CubeTableList',
    name: 'CubeTableList',
    meta: { title: 'CubeTableList列表', icon: 'CubeTableList', affix: true },
    component: () => import('@/views/CubeTableList/index')
  },
  {
    path: 'CubeSelect',
    name: 'CubeSelect',
    meta: { title: 'CubeSelect选择', icon: 'CubeSelect', affix: true },
    component: () => import('@/views/CubeSelect/index')
  },
  {
    path: 'CubeSelectTree',
    name: 'CubeSelectTree',
    meta: { title: 'CubeSelectTree选择', icon: 'CubeSelectTree', affix: true },
    component: () => import('@/views/CubeSelectTree/index')
  },
  {
    path: 'MaxHeight',
    name: 'MaxHeight',
    meta: { title: '业务组件', icon: 'MaxHeight', affix: true },
    component: () => import('@/views/MaxHeight/index')
  },
  {
    path: 'RenderTableList',
    name: 'RenderTableList',
    meta: { title: '业务组件', icon: 'RenderTableList', affix: true },
    component: () => import('@/views/RenderTableList/index')
  },

  {
    path: 'SelectTree',
    name: 'SelectTree',
    meta: { title: '业务组件', icon: 'SelectTree', affix: true },
    component: () => import('@/views/SelectTree/index')
  },
  {
    path: 'CubeDialog',
    name: 'CubeDialog',
    meta: { title: '业务组件', icon: 'CubeDialog', affix: true },
    component: () => import('@/views/CubeDialog/index')
  },
  {
    path: 'CubeMap',
    name: 'CubeMap',
    meta: { title: '地图相关', icon: 'CubeMap', affix: true },
    component: () => import('@/views/CubeMap/index')
  },
  {
    path: 'FormValidation',
    name: 'FormValidation',
    meta: { title: '表单数据验证', icon: 'FormValidation', affix: true },
    component: () => import('@/views/FormValidation/index')
  },
  {
    path: 'CardCarousel',
    name: 'CardCarousel',
    meta: { title: 'CardCarousel', icon: 'CardCarousel', affix: true },
    component: () => import('@/views/CardCarousel/index')
  },
  {
    path: 'Other',
    name: 'Other',
    meta: { title: '其他', icon: 'Other', affix: true },
    component: () => import('@/views/CubeDialog/index')
  }
]

const menus = routesList.map(item => {
  return {
    path: item.path,
    component: item.component,
    name: item.name,
    meta: item.meta
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
