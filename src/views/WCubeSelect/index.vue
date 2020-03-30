<template>
  <div>
    <Md />
  </div>
</template>

<script>

import Md from '~packages/CubeSelect/index.md'
export default {
  name: 'CubeSelectX',
  title: 'CubeSelect列表选择组件',
  components: {
    Md
  },
  data() {
    return {
      cubeSelectCar: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.w220{
  width: 220px;
}
</style>
