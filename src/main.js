import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

// import tyelui from 'tyelui'
import router from './router'

Vue.config.productionTip = false

// Vue.use(tyelui)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
