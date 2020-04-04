<template>
  <div>
    <Md />
  </div>
</template>

<script>

import Md from '~packages/SearchBar/index.md'

export default {
  name: 'SearchBarX',
  title: 'CubeTable搜索栏',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: 'CubeTable搜索栏',
    pageName: 'SearchBar',
    sort: '1'
  },
  components: {
    Md
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
