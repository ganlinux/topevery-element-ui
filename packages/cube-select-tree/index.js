/*
 * @Author: shiliangL
 * @Date: 2020-05-22 11:02:08
 * @LastEditTime: 2020-05-30 13:30:52
 * @LastEditors: Do not edit
 * @Description:
 * @FilePath: /topevery-element-ui-v2/packages/cube-select-tree/index.js
 */
import component from './src';

component.install = function(Vue, opts = {}) {
  Vue.prototype.$FETCH = {
    code: opts.code || 'code',
    data: opts.data || 'data',
    success: opts.success || 'success',
    pageList: opts.page || 'records',
    totalList: opts.total || 'total'
  };
  Vue.component(component.name, component);
};

export default component;
