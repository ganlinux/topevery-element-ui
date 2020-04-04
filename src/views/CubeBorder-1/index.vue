
<template>
  <div class="datav-page">
    <CubeBorderBox1>
      <div class="cube-border-inner">
        <h1> CubeBorder-1页面 </h1>
      </div>
    </CubeBorderBox1>
  </div>
</template>

<script>

export default {
  name: 'Cubeborder1',
  pageConfig: {
    groupsKey: 'datav',
    groupsName: '数据可视化',
    pageTitle: 'Cubeborder1',
    pageName: 'Cubeborder1',
    sort: '2'
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.datav-page {
  background: #333333;
}
.cube-border-inner {
  h1 {
    font-weight: normal;
    text-align: center;
    color: #ffffff;
  }
}
</style>
