<template>
  <div>
    <Md />
  </div>
</template>

<script>

// SelectBar
import Md from '~packages/CubeInput/index.md'

export default {
  name: 'CubeInputX',
  title: '输入框',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: 'CubeInput输入框',
    pageName: 'CubeInput',
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
