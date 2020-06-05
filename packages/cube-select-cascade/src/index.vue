<!--
 * @Author: shiliangL
 * @Date: 2020-06-05 09:50:28
 * @LastEditTime: 2020-06-05 15:36:18
 * @LastEditors: Do not edit
 * @Description:  级联关联选择
 * @FilePath: /topevery-element-ui-v2/packages/cube-select-cascade/src/index.vue
--> 
<template>
  <span class="cube-select-cascade">
    <span class="cube-form-item__label">
      {{ parentConfig.title }}
    </span>
    <cube-select
      ref="parentSelect"
      :disabled="disabled"
      v-model="parentSelect"
      :config="parentConfig"
      @change="parentSelectChange"
    />
    <span class="cube-form-item__label">
      {{ childrenConfig.title }}
    </span>
    <cube-select
      :disabled="disabled"
      :extraParam="extraParam"
      ref="childrenSelect"
      v-model="childrenSelect"
      :config="childrenConfig"
      @change="childrenSelectChange"
    />
  </span>
</template>

<script>

import debounce from 'throttle-debounce/debounce';
import { deepMerge } from 'topevery-element-ui/src/utils/index.new';
import CubeSelect from 'topevery-element-ui/packages/cube-select';
import { isArray, isObject } from 'topevery-element-ui/src/utils/types';

export default {
  name: 'CubeSelectCascade',
  components: {
    CubeSelect
  },
  props: {
    disabled: {
      type: Boolean,
      default: () => false
    },
    config: {
      type: Object,
      default: () => {
        return {
          parentConfig: {},
          childrenConfig: {}
        };
      }
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      parentSelect: '',
      childrenSelect: '',
      extraParam: {},
      parentConfig: {
        keyName: 'code',
        keyCode: 'sectionId',
        title: '标题',
        placeholder: '请选择',
        inputWidth: '180px',
        clearable: false, // 级联不清空
        isNoPage: false, // 设置不分页
        method: 'get', // 请求方法
        url: '/static/section.json',
        column: [ // 仅仅作为展示用户使用
          { key: 'code', label: '名称' },
          { key: 'statusStr', label: '状态' }
        ]
      },
      childrenConfig: {
        keyName: 'code',
        keyCode: 'sectionId',
        title: '标题',
        placeholder: '请选择',
        inputWidth: '180px',
        clearable: false, // 级联不清空
        isNoPage: false, // 设置不分页
        relativeKey: 'companyId', // 关联依赖加载id
        method: 'get', // 请求方法
        url: '/static/section.json',
        column: [ // 仅仅作为展示用户使用
          { key: 'code', label: '名称' },
          { key: 'statusStr', label: '状态' }
        ]
      }
    };
  },
  watch: {
    config: {
      immediate: true,
      handler(configData) {
        const { parentConfig, childrenConfig } = configData;
        this.parentConfig = deepMerge(this.parentConfig, parentConfig || {});
        this.childrenConfig = deepMerge(this.childrenConfig, childrenConfig || {});
      }
    },
    value: {
      immediate: true,
      handler(value, valueOld) {
        if (value && isArray(value) && value.length >= 1) {
          const { parentConfig } = this;
          const { childrenConfig } = this;
          // label value;处理key-value
          this.parentSelect = value[0]['value'] ? {[parentConfig.keyCode]: value[0].value, [parentConfig.keyName]: value[0].label } : '';
          if (value.length >= 2) {
            this.childrenSelect = value[1]['value'] ? {[childrenConfig.keyCode]: value[1].value, [childrenConfig.keyName]: value[1].label } : '';
          }
          // 关联出下一级
          if (this.parentSelect && this.parentSelect[parentConfig.keyCode]) {
            const { relativeKey } = this.childrenConfig;
            this.extraParam[relativeKey] = this.parentSelect[parentConfig.keyCode];
          }
        } else {
          this.parentSelect = '';
          this.childrenSelect = '';
        }
      }
    }
  },
  mounted() {
    this.parentSelectChange2fetch = debounce(800, (item) => this.handlerChange(item));
  },
  methods: {
    parentSelectChange(item) {
      this.$refs['childrenSelect'] && this.$refs['childrenSelect'].clear();
      if (!item) return; // label value;
      const { keyName, keyCode } = this.parentConfig;
      this.$emit('input', [{label: item[keyName], value: item[keyCode]}]);
      this.$emit('change', [{label: item[keyName], value: item[keyCode]}]);
      this.parentSelectChange2fetch(item);
    },
    childrenSelectChange(item) {
      const { parentSelect, parentConfig } = this;
      if (!item) return; // label value;
      if (isObject(parentSelect)) {
        const { keyName, keyCode } = this.childrenConfig;
        const item1 = [{label: parentSelect[parentConfig.keyName], value: parentSelect[parentConfig.keyCode]}];
        const item2 = [{label: item[keyName], value: item[keyCode]}];
        this.$emit('input', [...item1, ...item2]);
        this.$emit('change', [...item1, ...item2]);
      }
    },
    handlerChange(item) {
      const { relativeKey } = this.childrenConfig;
      if (!item || !relativeKey || !item[relativeKey]) return;
      this.extraParam[relativeKey] = item[relativeKey];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>