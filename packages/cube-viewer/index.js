import Viewer from 'viewerjs';
import component from './src/viewer';
import directive from './src/directive';
import { extend } from './src/utils';

component.install = function(Vue, {defaultOptions = { zIndex: 99999999}}) {
  Viewer.setDefaults(defaultOptions);
  // Vue.use(directive); //为什么这里使用指令不行
  Vue.component(component.name, extend(component, { name }));
};
component.directive = directive;

export default component;
