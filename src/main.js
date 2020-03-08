import 'normalize.css/normalize.css'
import './style/index.scss'
import './assets/styles/fonts/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/atom-one-dark.css'

import Vue from 'vue'
import App from './App.vue'

// import './plugins/element.js'

import tyelui from '../packages'

import router from './router'
import Element from 'element-ui'

import demoBlock from './components/demo-block'

Vue.config.productionTip = false
Vue.component('demo-block', demoBlock)

Vue.use(tyelui)

Vue.use(Element, {
  size: 'small'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
