/*
 * @Author: shiliangL
 * @Date: 2020-05-22 11:02:08
 * @LastEditTime: 2020-05-30 12:16:28
 * @LastEditors: Do not edit
 * @Description:
 * @FilePath: /topevery-element-ui-v2/examples/play.js
 */
import 'packages/theme-chalk/src/index.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './play/App.vue';
import routes from './play/router';

import Element from 'main/index.js';
Vue.use(Element, {
  AdminToken: 'shiliangl'
});

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
