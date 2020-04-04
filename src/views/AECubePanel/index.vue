<template>
  <div>
    <CubePanel
      class="cube-card"
      show-maximum
      full-mode="document"
    >
      <div slot="title">我是自定义title</div>
      <div>
        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
      </div>
    </CubePanel>

    <CubePanel
      class="cube-card"
      show-minimum
      show-maximum
      full-mode="document"
    >
      <div slot="title">我是自定义title</div>
      <div>
        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
      </div>
    </CubePanel>

    <CubePanel
      class="cube-card"
      shadow="hover"
      show-minimum
      show-maximum
      full-mode="document"
    >
      <div slot="title">我是自定义title</div>
      <div>
        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
      </div>
    </CubePanel>
  </div>
</template>

<script>

export default {
  pageConfig: {
    groupsKey: 'layout',
    groupsName: '布局类',
    pageTitle: 'CubePanel面板',
    pageName: 'CubePanel',
    sort: '2'
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
.cube-card {
  height: 200px;
  margin-bottom: 10px;
}
</style>
