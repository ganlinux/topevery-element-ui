<!--
 * @Author: shiliangL
 * @Date: 2020-05-22 11:02:08
 * @LastEditTime: 2020-06-08 14:09:40
 * @LastEditors: Do not edit
 * @Description: 
 * @FilePath: /topevery-element-ui-v2/packages/cube-upload/src/index.vue
--> 
<template>
  <div style="width: 100%;height: 150px;border: 1px solid #eee;" v-loading="true">
    CubeUpload
  </div>
</template>

<script>

import Loading from 'topevery-element-ui/packages/loading';
export default {
  name: 'CubeUpload',
  components: {
    Loading
  },
  directives: {
    // loading: Loading.directive
  }
};
</script>
 