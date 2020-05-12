import 'packages/theme-chalk/src/index.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './play/App.vue';
import routes from './play/router';

import Element from 'main/index.js';
Vue.use(Element);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
