<template>
  <CubeContainer @scroll="({x, y}) => { scrollTop = y }">
    <div slot="header"> header {{ scrollTop }} <el-button type="primary" size="mini" @click="isList=!isList"> 切换显示内容 </el-button> </div>
    <div>
      <template v-if="isList">
        <div v-for="(item, index) in 100" :key="index"> 内容{{ item }}</div>
      </template>
      <CubeFrame v-else />
    </div>
    <div slot="footer"> footer </div>
  </CubeContainer>
</template>

<script>

import CubeFrame from './CubeFrame'

export default {
  pageConfig: {
    groupsKey: 'layout',
    groupsName: '布局类',
    pageTitle: '滚动条容器',
    pageName: 'CubeContainer',
    sort: '1'
  },
  components: {
    CubeFrame
  },
  data() {
    return {
      scrollTop: 0,
      isList: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
