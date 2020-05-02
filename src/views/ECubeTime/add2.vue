<template>
  <div>

    add2 - {{ AddItemText }} - son

    <add3 />
  </div>
</template>

<script>

import add3 from './add3'
export default {
  name: 'CubeTimeShiliangL2',
  componentName: 'CubeTimeShiliangL2',
  components: {
    add3
  },
  data() {
    return {
      AddItemText: 'AddItemText'
    }
  },
  created() {
    this.$on('change', this.change)
  },
  methods: {
    changeStatus() {
      this.config.disabled = !this.config.disabled
    },
    change(e) {
      console.log(e, 'CubeTimeShiliangL2')
      this.AddItemText = 'change'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
