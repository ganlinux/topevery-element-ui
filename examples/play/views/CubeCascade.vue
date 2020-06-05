<!--
 * @Author: shiliangL
 * @Date: 2020-06-05 09:48:22
 * @LastEditTime: 2020-06-05 15:10:38
 * @LastEditors: Do not edit
 * @Description: 
 * @FilePath: /topevery-element-ui-v2/examples/play/views/CubeCascade.vue
--> 
<template>
  <div>
      <cube-select-cascade v-model="selectCascade" @config="config" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectCascade: [],
      config: {
        parentConfig: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '企业选择',
          inputWidth: '180px',
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
          placeholder: '司机选择',
          inputWidth: '180px',
          isNoPage: false, // 设置不分页
          relativeKey: 'companyId', // 关联依赖加载id -关键key 级联关系
          method: 'get', // 请求方法
          url: '/static/section.json',
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'statusStr', label: '状态' }
          ]
        }
      }
    };
  },
  mounted() {
    // 假如是编辑 则需要手动处理一下参数
    setTimeout(_=>{
      this.selectCascade = [
        { label: '父级联', value: '132123123' },
        { label: '子级联', value: '132123123' }
      ];
    }, 2000);
  }
};
</script>

<style lang="scss" scoped>

</style>