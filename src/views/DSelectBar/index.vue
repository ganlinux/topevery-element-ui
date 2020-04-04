<template>
  <div>
    <Md />
  </div>
</template>

<script>

// SelectBar

import Md from '~packages/SelectBar/index.md'

export default {
  name: 'SelectBarX',
  title: '选择器',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: 'SelectBar选择器',
    pageName: 'SelectBar',
    sort: '1'
  },
  components: {
    Md
  }
}
</script>

<style lang="scss" scoped>

</style>
