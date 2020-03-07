<template>
  <div>
    <div v-for="item in 1" :key="item.id">
      <markdown />
    </div>
  </div>
</template>

<script>

import markdown from './markdown.md'

export default {
  name: 'CubeDialog',
  components: {
    markdown
  }
}
</script>

<style lang="scss" scoped>
</style>
