<template>
  <el-select
    v-model="selectValue"
    v-loadmore="loadmore"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :filterable="filterable"
    :disabled="disabled"
    :value-key="valueKey"
    :size="size"
    :loading="loading"
    @change="change"
    @clear="clear"
    @blur="blur"
    @focus="focus"
  >
    <el-option
      v-for="(item,index) in optionsList"
      :key="!theOnlyKey ? index : item[theOnlyKey]"
      :disabled="item.disabled"
      :label="item[optionName]"
      :value="!valueKey ? item[optionValue] : item"
    />
  </el-select>
</template>

<script>

/** 下拉组件封装
 * optionName 显示名称 默认'label'
 * optionValue 绑定字段 默认 'value'
 * options 下拉选项 必填
 * valueKey 绑定返回对象的时候唯一值,传入是返回对象则返回对象
 *
 */

export default {
  name: 'SelectBar',
  directives: {
    loadmore: {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
          if (CONDITION) {
            binding.value()
          }
        })
      }
    }
  },
  props: {
    theOnlyKey: { // option 需要传入唯一值推荐传入
      type: String,
      default: () => ''
    },
    value: {
      type: [Object, String, Number, Array],
      default: () => ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    clearable: {
      type: Boolean,
      default: () => true
    },
    multiple: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    filterable: {
      type: Boolean,
      default: () => true
    },
    collapseTags: {
      type: Boolean,
      default: () => false
    },
    size: {
      type: String,
      default: () => 'small'
    },
    valueKey: {
      type: String,
      default: () => ''
    },
    placeholder: {
      type: String,
      default: () => '请选择'
    },
    optionName: {
      type: String,
      default: () => 'label'
    },
    optionValue: {
      type: String,
      default: () => 'value'
    }
  },
  data() {
    return {
      loading: false,
      canLoadMore: false,
      selectValue: '',
      optionsList: []
    }
  },
  watch: {
    value: {
      handler(value) {
        this.selectValue = value
      }
    },
    options: {
      deep: true,
      immediate: true,
      handler(value) {
        this.optionsList = value || []
      }
    }
  },
  created() {
    const { value } = this
    this.selectValue = value
  },
  methods: {
    change(item) {
      this.$emit('input', item)
      this.$emit('change', item)
    },
    clear() {
      this.selectValue = ''
      this.$emit('input', '')
      this.$emit('clear')
    },
    blur() {
      this.$emit('blur')
    },
    focus() {
      this.$emit('focus')
    },
    loadmore() {

    }
  }
}
</script>
