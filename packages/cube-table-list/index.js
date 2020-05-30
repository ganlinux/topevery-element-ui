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
