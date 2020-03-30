<template>
  <iframe
    v-bind="$attrs"
    class="container-frame"
    :src="src"
    frameborder="0"
  />
</template>

<script>
export default {
  name: 'CubeFrame',
  props: {
    src: {
      type: String,
      required: false,
      default: `./cube.html`
    }
  }
}
</script>

<style lang="scss" scoped>
.container-frame {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  min-height: 500px;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
