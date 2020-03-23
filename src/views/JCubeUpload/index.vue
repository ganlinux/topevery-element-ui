<template>
  <div class="div">
    <CubeUpload />
  </div>
</template>

<script>
export default {
  name: 'CubeUploadX',
  title: 'CubeUpload上传',
  data() {
    return {
      value1: 70,
      value2: 80,
      split: 0.5,
      split2: 0.5
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-split {
  height: 200px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>
