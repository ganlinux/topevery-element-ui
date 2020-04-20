<template>
  <div>
    <!-- {{ treeSelect }} -->
    <CubeSelectTree v-model="treeSelect" :config="config" />

    <CubeVideoPlayer />
  </div>
</template>

<script>

export default {
  name: 'TreeSelect',
  title: 'ZCubeLottie',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: 'ZCubeLottie测试',
    pageName: 'ZCubeLottie',
    sort: '1'
  },
  data() {
    return {
      defaultColor: ['#4fd2dd', '#235fa7'],
      treeSelect: null,
      config: {
        selectValuekey: [],
        selectAny: false,
        placeholder: '请选择人员类型',
        extraParam: {
          classId: '34DC941E-6877-48C7-930A-7AFE313125D2'
        },
        url: '/class/getClassTree'
        // url: '/map/getSectionTree'
      }
    }
  }
}
</script>

<style scoped>

</style>
