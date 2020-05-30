import CuebScrollTo from './src/directive';
import { setDefaults } from './src/scrollTo';

const install = function(Vue, options) {
  if (options) setDefaults(options);
  Vue.directive('cueb-scroll-to', CuebScrollTo);
  Vue.prototype.$cuebScrollTo = CuebScrollTo.scrollTo;
};

if (typeof window !== 'undefined' && window.Vue) {
  window.CuebScrollTo = CuebScrollTo;
  window.CuebScrollTo.setDefaults = setDefaults;
  window.Vue.use(install);
}

CuebScrollTo.install = install;
CuebScrollTo.directive = CuebScrollTo;

export default CuebScrollTo;
