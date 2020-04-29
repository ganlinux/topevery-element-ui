<template>
  <div>
    <el-date-picker
      v-model="valueTime"
      :type="initConfig.type"
      :size="initConfig.size"
      :clearable="initConfig.clearable"
      :editable="initConfig.editable"
      :disabled="initConfig.disabled"
      :value-format="initConfig.format"
      :placeholder="initConfig.placeholder"
      :picker-options="pickerOptions"
      @change="change"
    />
  </div>
</template>

<script>

import { deepMerge } from '../../uitls/index'

const isString = function(val) {
  return typeof val === 'string' || val instanceof String
}

const validator = function(val) {
  // either: String, Array of String, null / undefined
  return (
    val === null ||
    val === undefined ||
    isString(val) ||
    (Array.isArray(val) && val.length === 2 && val.every(isString))
  )
}

// const formatType = {
//   date: 'yyyy-MM-dd',
//   month: 'yyyy-MM',
//   datetime: 'yyyy-MM-dd HH:mm:ss',
//   time: 'HH:mm:ss',
//   week: 'yyyywWW',
//   timerange: 'HH:mm:ss',
//   daterange: 'yyyy-MM-dd',
//   monthrange: 'yyyy-MM',
//   datetimerange: 'yyyy-MM-dd HH:mm:ss',
//   year: 'yyyy'
// }

// const timeType = [
//   'date',
//   'datetime',
//   'time',
//   'time-select',
//   'week',
//   'month',
//   'year',
//   'daterange',
//   'monthrange',
//   'timerange',
//   'datetimerange',
//   'dates'
// ]

export default {
  name: 'CubeTime',
  props: {
    size: {
      type: String,
      default: () => 'small' // medium / small / mini
    },
    // eslint-disable-next-line vue/require-default-prop
    format: String,
    // eslint-disable-next-line vue/require-default-prop
    valueFormat: String,
    readonly: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    placeholder: String,
    startPlaceholder: {
      type: String,
      default: ''
    },
    endPlaceholder: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    prefixIcon: String,
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close'
    },
    name: {
      default: '',
      validator
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    id: {
      default: '',
      validator
    },
    // eslint-disable-next-line vue/require-default-prop
    popperClass: String,
    editable: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'left'
    },
    value: {
      type: String,
      default: () => ''
    },
    defaultValue: {
      type: String,
      default: () => ''
    },
    defaultTime: {
      type: String,
      default: () => ''
    },
    rangeSeparator: {
      type: String,
      default: '-'
    },
    pickerOptions: {
      type: Object,
      default: () => {}
    },
    unlinkPanels: Boolean,
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      valueTime: '',
      initConfig: {
        type: 'date',
        size: 'small',
        format: 'yyyy-MM-dd',
        placeholder: '选择日期'
      }
    }
  },
  watch: {
    config: {
      immediate: true,
      handler(config) {
        setTimeout(() => {
          const { initConfig } = this
          this.initConfig = deepMerge(initConfig, config || {})
        }, 0)
      }
    },
    value: {
      handler(valueTime) {
        this.valueTime = valueTime
      }
    }
  },
  methods: {
    change(item) {
      this.$emit('input', item)
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
