<!--
 * @Author: shiliangL
 * @Date: 2020-07-08 15:32:45
 * @LastEditTime: 2020-07-08 15:55:02
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
    <div class="cubeMoreType-main-list">
      <div
        class="main-list-item"
        v-for="(item,index) in defaultConfig.options"
        :key="index"
      >
        <div v-if="item.title" class="title"> {{item.title}}: </div>
        <el-checkbox-group v-model="item.value">
          <el-checkbox
            v-for="(itemk,indexk) in item.list"
            :key="indexk"
            :label="itemk.value"
          > {{itemk.label}} </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <el-input
      style="width: 180px;"
      slot="reference"
      v-model="selectList"
      class="w180"
      placeholder="请输入内容"
    />
  </el-popover>
</template>

<script>

import ElInput from 'topevery-element-ui/packages/input';
import ElPopover from 'topevery-element-ui/packages/popover';

export default {
  name: 'CubeMoreType',
  components: {
    ElInput,
    ElPopover
  },
  props: {
    extraParam: {
      type: Object,
      default: () => { }
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
  data() {
    return {
      selectList: null,
      // 默认参数
      defaultConfig: {
        popoverWidth: 340,
        options: [
          {
            title: '公厕情况',
            value: [],
            list: [
              { value: '1', label: '正常' },
              { value: '2', label: '维修' },
              { value: '3', label: '在建' },
              { value: '4', label: '拆迁' }
            ]
          },
          {
            title: '产权类型',
            value: [],
            list: [
              { value: '1', label: '正常' },
              { value: '2', label: '维修' },
              { value: '3', label: '在建' },
              { value: '4', label: '拆迁' }
            ]
          }
        ]
      }
    };
  }
};

</script>
 