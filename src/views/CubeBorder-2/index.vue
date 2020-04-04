
<template>
  <div class="datav-page">
    <CubeBorderBox2>
      <div class="cube-border-inner">
        <h1> CubeBorder-2页面 </h1>
      </div>
    </CubeBorderBox2>
  </div>
</template>

<script>

export default {
  name: 'Cubeborder2',
  pageConfig: {
    groupsKey: 'datav',
    groupsName: '数据可视化',
    pageTitle: 'Cubeborder2',
    pageName: 'Cubeborder2',
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

.cubeBox{
  height: 200px;
  width: 100%;
}
</style>
