<template>
  <div class="scroll-bar-container">
    <el-scrollbar class="container-scroll">
      <slot />
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'ScrollBar'
}
</script>

<style lang="scss" scoped>
.scroll-bar-container {
  padding: 4px;
}
</style>
