import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/atom-one-dark.css'
// import '@/assets/iconfont/iconfont.css'
import './style/index.scss'

import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js'

import tyelui from '../packages'

import router from './router'
import Element from 'element-ui'
import elementUIVerify from 'element-ui-verify'

import demoBlock from './components/demo-block'

Vue.config.productionTip = false
Vue.component('demo-block', demoBlock)

Vue.use(tyelui)

Vue.use(Element, {
  size: 'small'
})

// import elementUIVerify from './element-ui-verif.js'
Vue.use(elementUIVerify)
import { elementUIVerifyAddRule } from './element-ui-verify'
elementUIVerifyAddRule(elementUIVerify)

import uploader from 'vue-simple-uploader'
Vue.use(uploader)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
