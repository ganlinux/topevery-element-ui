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
  methods: {

  },
  mounted () {
    console.log(document.cookie, 'cookie')
  }
}
</script>

<style lang="scss" scoped>
</style>
