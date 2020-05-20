<template>
  <div style="width: 100%;height: 150px;border: 1px solid #eee;" v-loading="true">
    CubeUpload
  </div>
</template>

<script>

import Loading from 'packages/loading';
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
 