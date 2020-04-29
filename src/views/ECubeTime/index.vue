<template>
  <div>
    {{ time }}
    <cube-button type="primary" @click="changeStatus">改变配置</cube-button>
    <CubeTime v-model="time" :config="config" />
    <CubeTime v-model="time" :config="config" />
    <Md v-if="false" />
  </div>
</template>

<script>

import Md from '~packages/CubeTime/index.md'

export default {
  name: 'CubeTimeX',
  title: '输入框',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: '日期时间',
    pageName: 'CubeTimeX',
    sort: '1'
  },
  components: {
    Md
  },
  data() {
    return {
      time: '',
      config: {
        disabled: false
      }
    }
  },
  methods: {
    changeStatus() {
      this.config.disabled = !this.config.disabled
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
