<!--
 * @Author: shiliangL
 * @Date: 2020-07-08 15:32:45
 * @LastEditTime: 2020-07-11 10:25:51
 * @LastEditors: Do not edit
 * @Description: 
 * @FilePath: /topevery-element-ui-v2/packages/cube-more-type/src/index.vue
--> 

<template>
  <el-popover
    placement="bottom"
    :width="defaultConfig.popoverWidth"
    trigger="click"
  >
    <div
      class="cubeMoreType-main-list"
      :style="{height: defaultConfig.maxHeight+'px'}"
    >
      <div
        class="main-list-item"
        v-for="(item,index) in defaultConfig.options"
        :key="index"
      >
        <div
          v-if="item.title"
          class="title"
        > {{item.title}}: </div>
        <div class="checkbox-list">
          <el-checkbox-group
            v-model="item.ids"
            @change="getSelectListName"
          >
            <el-checkbox
              v-for="(itemk,indexk) in item.list"
              :key="indexk"
              :label="itemk.value"
            > {{itemk.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <el-input
      :style="{width: defaultConfig.inputWidth+'px'}"
      slot="reference"
      v-model="selectList"
      class="w180"
      readonly
      :clearable="defaultConfig.clearable"
      :size="defaultConfig.size"
      :placeholder="defaultConfig.placeholder"
    />
  </el-popover>
</template>

<script>

import { deepMerge } from 'topevery-element-ui/src/utils/index.new';
import ElInput from 'topevery-element-ui/packages/input';
import ElPopover from 'topevery-element-ui/packages/popover';

export default {
  name: 'CubeMoreType',
  props: {
    size: {
      type: String,
      default: () => 'small'
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    extraParam: {
      type: Object,
      default: () => { }
    },
    config: {
      type: Object,
      default: () => { }
    },
    value: { // 编辑显示传入对象
      type: [Object],
      // { key: 'name', label: '名称' },
      default: () => { }
    }
  },
  components: {
    ElInput,
    ElPopover
  },
  data() {
    return {
      visible: false,
      selectList: '',
      // 默认参数
      defaultConfig: {
        placeholder: '其他查询',
        clearable: true, // 是否可以清除
        popoverWidth: 320, // 弹层宽度
        maxHeight: 240, // 弹层宽度
        inputWidth: '220px', // 输入框宽度
        size: 'small', // 输入框大小
        options: [
          {
            title: '公厕情况',
            keyCode: 'basicArr1',
            ids: [],
            list: [
              { value: '11', label: '正常' },
              { value: '22', label: '维修' },
              { value: '33', label: '在建' },
              { value: '44', label: '拆迁' }
            ]
          },
          {
            title: '产权类型',
            keyCode: 'basicArr2',
            ids: [],
            list: [
              { value: '21', label: '自有' },
              { value: '24', label: '政用' }
            ]
          },
          {
            title: '收费情况',
            keyCode: 'basicArr2',
            ids: [],
            list: [
              { value: '21', label: '免费' },
              { value: '24', label: '收费' }
            ]
          },
          {
            title: '无障碍室',
            keyCode: 'basicArr2',
            ids: [],
            list: [
              { value: '21', label: '有' },
              { value: '24', label: '无' }
            ]
          },
          {
            title: '母婴室',
            keyCode: 'basicArr2',
            ids: [],
            list: [
              { value: '21', label: '有' },
              { value: '24', label: '无' }
            ]
          }
        ]
      }
    };
  },
  watch: {
    config: {
      immediate: true,
      handler(configData) {
        this.defaultConfig = deepMerge(this.defaultConfig, configData || {});
      }
    },
    value: {
      handler(value) {
        console.log('sbbsb');
        if (!value) {
          this.reset();
        }
      }
    }
  },
  methods: {
    reset() {
      const { options } = this.defaultConfig;
      options.forEach((item) => {
        item.ids = [];
        item[item.keyCode] = [];
      });
      this.selectList = null;
    },
    getSelectListName() {
      const { options } = this.defaultConfig;
      const nameListArray = [];
      const params = {};
      options.forEach((item) => {
        item[item.keyCode] = item.ids;
        params[item.keyCode] = item.ids;
        item.list.forEach((kk) => {
          if (item.ids.includes(kk.value)) {
            nameListArray.push(kk.label);
          }
        });
      });
      this.selectList = nameListArray.join(',');
      this.$emit('updated:params', params);
      this.$emit('change', params);
      this.$emit('input', params);
    }
  }
};

</script>
 