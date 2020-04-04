<script>
import { Button } from 'element-ui'
export default {
  name: 'CubeButton',
  extends: Button, // 指定继承组件
  props: {
    value: {
      type: [String, Number],
      default: () => ''
    },
    placeholder: {
      type: String,
      default: () => '请输入内容'
    },
    type: {
      type: String,
      default: () => 'text' // textarea
    },
    autosize: {
      type: [Boolean, Object], // 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
      default: () => false // boolean / object
    },
    rows: {
      type: Number,
      default: () => 2
    },
    leftIcon: {
      type: String,
      default: () => ''
    },
    rightIcon: {
      type: String,
      default: () => ''
    },
    size: {
      type: String,
      default: () => 'small' // medium / small / mini
    },
    clearable: {
      type: Boolean,
      default: () => true
    },
    showLimit: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    maxlength: {
      type: String,
      default: () => ''
    },
    showPassword: {
      type: Boolean,
      default: () => false
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    hide: { // 是否隐藏/特殊校验的时候占位做错误提示使用
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      inputValue: ''
    }
  }
}
</script>

