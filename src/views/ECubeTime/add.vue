<template>
  <div>
    SHILIANG

    <el-button type="primary" @click="dispatchX">dispatchX</el-button>
    <el-button type="primary" @click="broadcastX">broadcastX</el-button>

    <add2 />
  </div>
</template>

<script>

import emitter from '@/mixProps/emitter'
import add2 from './add2'

export default {
  name: 'SHILIANG',
  componentName: 'SHILIANG',
  components: {
    add2
  },
  mixins: [emitter],
  methods: {
    dispatchX() {
      this.dispatch('CubeTimeShiliangL', 'change', '什么鬼东西')
    },
    broadcastX() {
      this.broadcast('CubeTimeShiliangL3', 'change', '什么鬼东西????')
      this.broadcast('CubeTimeShiliangL2', 'change', '什么鬼东西????')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
