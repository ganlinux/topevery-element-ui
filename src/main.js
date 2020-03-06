import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import 'highlight.js/styles/atom-one-dark.css'

import Vue from 'vue'
import App from './App.vue'

// import './plugins/element.js'

// import tyelui from 'tyelui'
import router from './router'
import Element from 'element-ui'

import CodeSnippet from './components/code-snippet'

Vue.config.productionTip = false
Vue.component('code-snippet', CodeSnippet)

// Vue.use(tyelui)

Vue.use(Element, {
  size: 'small'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
