import 'packages/theme-chalk/src/index.scss';

import Vue from 'vue';
import App from './play/index.vue';

import Element from 'main/index.js';
Vue.use(Element);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
