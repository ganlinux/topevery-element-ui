<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import hljs from 'highlight.js'
export default {
  mounted() {
    this.$nextTick().then(_ => {
      const blocks = document.querySelectorAll('pre code:not(.hljs)')
      Array.prototype.forEach.call(blocks, hljs.highlightBlock)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
ul,li{
  list-style: none;
}
</style>
