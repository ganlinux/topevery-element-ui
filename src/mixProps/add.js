/**
 * @description add 弹层 引入并声明所有页表页面的公共变量及组件
 */

import rules from '@/mixProps/rules.js'

export default {
  mixins: [rules],
  props: {
    propsData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      fetchLoading: false,
      saveLoading: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}

