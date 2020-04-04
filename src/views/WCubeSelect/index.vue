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
  pageConfig: {
    groupsKey: 'business',
    groupsName: '业务组件',
    pageTitle: 'CubeSelect列表选择组件',
    pageName: 'CubeSelect',
    sort: '1'
  },
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
