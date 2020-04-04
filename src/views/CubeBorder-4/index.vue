
<template>
  <div class="datav-page">
    <div class="cubeBox">
      <CubeBorderBox4>
        <div class="cube-border-inner">
          <span> CubeBorder-4页面 </span>
        </div>
      </CubeBorderBox4>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cubeborder4',
  pageConfig: {
    groupsKey: 'datav',
    groupsName: '数据可视化',
    pageTitle: 'Cubeborder4',
    pageName: 'Cubeborder4',
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
  padding-top: 4rem;
}
.cubeBox{
  width: 100%;
  height: 100%;
  color: #ffffff;
}
</style>
