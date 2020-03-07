<template>
  <div>
    Dashboard
    <CubeSelect />
  </div>
</template>

<script>

import { CubeSelect } from '~'

export default {
  name: 'Dashboard',
  components: {
    CubeSelect
  },
  mounted() {
    console.log(document.cookie, 'cookie')
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
