<template>
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
        <cube-select v-model="cubeSelect" :config="config" /> 
    </div>
</template>

<script>
  export default {
    data() {
      return {
        cubeSelect: { 'sectionId': '80DDEC81-5641-472F-8C6E-8A5DAE3D58E9', 'code': '翠屏区环卫一所' },
        config: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '标段选择-不分页',
          isNoPage: true, // 设置不分页
          isStaticOptions: true, // 设置为静态属性使用,
          options: [], // 外部传入的 options
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'companyName', label: '责任单位' }
          ]
        }
      };
    },
    mounted() {
      // 模拟插入数据 静态 options 同步或者异步都可以 如下模拟异步
      setTimeout(_=>{
        // this.config.options = this.$mockSection.records;
      }, 2000);
    }
  };

</script>  