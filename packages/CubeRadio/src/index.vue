<template>
  <el-radio-group
    v-model="selectValue"
    :disabled="disabled"
    :size="size"
    :text-color="textColor"
    :fill="fill"
    @change="change"
  >
    <template v-if="!button">
      <el-radio
        v-for="(item,index) in optionsList"
        :key="index"
        :disabled="item.disabled"
        :border="border"
        :label="item[optionValue]"
        :class="vertical? 'vertical':'' "
      >{{ item[optionName] }}</el-radio>
    </template>
    <template v-else>
      <el-radio-button
        v-for="(item,index) in optionsList"
        :key="index"
        :disabled="item.disabled"
        :border="border"
        :label="item[optionValue]"
        :class="vertical? 'vertical':'' "
      >{{ item[optionName] }}</el-radio-button>
    </template>
  </el-radio-group>
</template>

<script>
export default {
  name: 'CubeRadio',
  props: {
    valueKey: { // 传入指定唯一值返回对象
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
    disabled: {
      type: Boolean,
      default: () => false
    },
    button: {
      type: Boolean,
      default: () => false
    },
    border: {
      type: Boolean,
      default: () => false
    },
    size: {
      type: String,
      default: () => 'small'
    },
    vertical: {
      type: Boolean,
      default: () => false
    },
    optionName: {
      type: String,
      default: () => 'label'
    },
    optionValue: {
      type: String,
      default: () => 'value'
    },
    textColor: {
      type: String,
      default: () => '#ffffff'
    },
    fill: {
      type: String,
      default: () => '#409EFF'
    }
  },
  data() {
    return {
      selectValue: 0,
      optionsList: []
    }
  },
  watch: {
    value: {
      handler(value) {
        const { valueKey, optionValue } = this
        if (valueKey) {
          this.selectValue = value[optionValue]
        } else {
          this.selectValue = value
        }
      }
    },
    options: {
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
    change(selectKey) {
      const { valueKey, optionValue, optionsList } = this
      if (valueKey) {
        const item = optionsList.find(item => item[optionValue] === selectKey)
        this.$emit('input', item)
        this.$emit('change', item)
      } else {
        this.$emit('input', selectKey)
        this.$emit('change', selectKey)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vertical{
  display: block;
  margin-bottom: 4px;
  margin-left: 4px;
}
.is-bordered{
  margin-right: 0;
}
</style>
