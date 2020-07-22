/*
 * @Author: shiliangL
 * @Date: 2020-05-22 11:02:08
 * @LastEditTime: 2020-07-22 10:21:08
 * @LastEditors: Do not edit
 * @Description:
 * @FilePath: /topevery-element-ui-v2/examples/entry.js
 */

import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import Element from 'main/index.js';
import hljs from 'highlight.js';
import echarts from 'echarts/lib/echarts';
import request from 'main/utils/request';

import routes from './route.config';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import title from './i18n/title';

import 'packages/theme-chalk/src/index.scss';
import './assets/styles/common.scss';
import './demo-styles/index.scss';
import './assets/styles/fonts/style.css';
import icon from './icon.json';
import 'highlight.js/styles/atom-one-dark.css';

import tree from './assets/mock/tree.json';
import list from './assets/mock/list.json';
import page from './assets/mock/page.json';
import section from './assets/mock/section.json';

import './topevery-icon/iconfont.css';
import topicon from './topevery-icon/iconfont.json';
import './topevery-icon/iconfont.js';

Vue.use(Element);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => (globalEle.$data.$isEle),
      set: (data) => {globalEle.$data.$isEle = data;}
    }
  }
});

// 其他npm 包使用
import Clipboard from 'v-clipboard';
Vue.use(Clipboard);

// 数据添加到原型 方便在文档中使用
Vue.prototype.$icon = icon; // Icon 列表页用
Vue.prototype.$topicon = topicon.glyphs; // Icon 列表页用

Vue.prototype.$mockTree = tree.data;
Vue.prototype.$mockList = list.data;
Vue.prototype.$mockPage = page.data;
Vue.prototype.$mockSection = section.data;
Vue.prototype.$echarts = echarts;
Vue.prototype.$request = request;

// 设置文档调试url
const $baseURL = localStorage.getItem('$baseURL') ? JSON.parse(localStorage.getItem('$baseURL')) : 'http://hw-topevery-dev-ui:49526' ;
console.log($baseURL, '$baseURL-调试');
Vue.prototype.$baseURL = $baseURL;

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  setTimeout(()=>{
    Vue.nextTick(() => {
      const blocks = document.querySelectorAll('pre code:not(.hljs)');
      Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
  }, 0);
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Element';
  ga('send', 'event', 'PageView', route.name);
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
