import auxiliary from '../auxiliary/index'
import VueHighlightJS from 'vue-highlightjs'
export default ({
  Vue,
}) => {
  Vue.use(auxiliary)
  Vue.use(VueHighlightJS)
}
