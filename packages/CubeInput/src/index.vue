<template>
  <el-input
    v-model.trim="inputValue"
    class="CubeInput"
    :class="hide?'hide':''"
    :placeholder="placeholder"
    :clearable="clearable"
    :readonly="readonly"
    :disabled="disabled"
    :size="size"
    :type="type"
    :rows="rows"
    :show-word-limit="showLimit"
    :maxlength="maxlength"
    :autosize="autosize"
    :show-password="showPassword"
    :suffix-icon="rightIcon"
    :prefix-icon="leftIcon"
    @blur="blur"
    @focus="focus"
    @change="change"
    @clear="clear"
    @keyup.enter.native="enter"
  >
    <template v-if="$slots.before">
      <div
        slot="prepend"
        class="before"
      >
        <slot name="before" />
      </div>
    </template>
    <template v-if="$slots.after">
      <div
        slot="append"
        class="after"
      >
        <slot name="after" />
      </div>
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'CubeInput',
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
  },
  watch: {
    value: {
      immediate: true,
      handler(item) {
        this.inputValue = item
      }
    }
  },
  methods: {
    blur() {
      this.$emit('blur')
    },
    focus() {
      this.$emit('focus')
    },
    enter() {
      this.$emit('enter')
    },
    change(item) {
      this.$emit('change', item)
      this.$emit('input', item)
    },
    clear() {
      this.$emit('clear')
      this.$emit('input', '')
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.CubeInput {
  /deep/.el-input-group__prepend {
    cursor: pointer;
  }
  /deep/.el-input-group__append {
    cursor: pointer;
  }
}
.hide{
  display: none;
}
</style>
