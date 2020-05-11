<!-- 选择组件 提供分页检索选择应数据量大列表卡顿以及分页接口数据选择 -->
<template>
  <el-cascader
    v-model="selectValue"
    :disabled="disabled"
    :filterable="defaultConfig.filterable"
    :debounce="defaultConfig.debounce"
    :clearable="defaultConfig.clearable"
    :placeholder="placeholder2"
    :size="defaultConfig.size"
    :options="defaultConfig.options"
    :props="{checkStrictly: defaultConfig.selectAny, emitPath:false, expandTrigger:'hover'}"
    :value="defaultConfig.keyCode"
    :label="defaultConfig.keyName"
    :children="defaultConfig.children"
    @change="change"
  />
</template>

<script>

import ElCascader from 'packages/cascader';
import request from 'utils/request';
import { deepMerge, noEmptyChildren } from 'utils/index.new.js';
import { isObject } from 'utils/types';
import emitter from 'mixins/emitter';

export default {
  name: 'CubeCascader',
  mixins: [emitter],
  props: {
    validateEvent: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    extraParam: {
      type: Object,
      default: () => {
        // return {
        //   treeId: 'aed26b5a-00e8-4c87-99a5-3345582239f9'
        // }
      }
    },
    config: {
      type: Object,
      default: () => { }
    },
    value: { // 编辑显示传入对象
      type: [Object, String],
      default: () => { }
    }
  },
  components: {
    ElCascader
  },
  data() {
    return {
      placeholder2: '请选择',
      loading: false,
      selectValue: '',
      // 默认参数
      defaultConfig: {
        placeholder: '请选择',
        clearable: true,
        filterable: true,
        debounce: 500,
        size: 'small',
        selectAny: false, // 是否可选任意一级
        options: [],
        keyCode: 'value', // 指定选项的值为选项对象的某个属性值
        keyName: 'label', // 指定选项标签为选项对象的某个属性值
        children: 'children', // 指定选项的子选项为选项对象的某个属性
        method: 'GET',
        url: '',
        focusOnload: false // 是否获取焦点就加载 、 如果false则只会加载请求一次数据
      }
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value) {
          this.selectValue = value;
        } else {
          this.selectValue = '';
          this.placeholder2 = this.defaultConfig.placeholder;
        }
      }
    },
    config: {
      immediate: true,
      handler(configData) {
        this.defaultConfig = deepMerge(this.defaultConfig, configData || {});
        this.placeholder2 = this.defaultConfig.placeholder;
      }
    },
    'config.options': {
      handler(options) {
        if (Array.isArray(options)) this.defaultConfig.options = options || [];
      }
    }
  },
  mounted() {
    const { focusOnload } = this.defaultConfig;
    if (!focusOnload) {
      this.fetchTableData();
    }
  },
  beforeDestroy() {
    this.selectValue = null;
  },
  methods: {
    focus() {
      this.$emit('focus');
    },
    blur() {
      this.$emit('blur');
    },
    clear() {
      this.selectValue = '';
      this.placeholder2 = this.defaultConfig.placeholder;
      this.$emit('input', '');
      this.$emit('change', '');
    },
    change(item) {
      this.$emit('input', item);
      this.$emit('change', item);
    },
    fetchTableData() {
      const { extraParam } = this;
      const { url, method } = this.defaultConfig;
      if (!url) return;
      // this.loading = true
      this.defaultConfig.options = [];
      const params = isObject(extraParam) ? { ...extraParam } : {};
      const paramsKey = method.toUpperCase() !== 'POST' ? 'params' : 'data';
      request({ url, method: method.toUpperCase(), [paramsKey]: params }).then((data) => {
        this.loading = false;
        if (data.success) {
          const result = data.data;
          if (Array.isArray(result)) this.defaultConfig.options = noEmptyChildren(result) || [];
        }
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
