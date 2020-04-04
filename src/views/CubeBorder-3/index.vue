
<template>
  <div class="datav-page">
    <div class="cubeBox">
      <CubeBorderBox3>
        <div class="cube-border-inner">
          <span> CubeBorder-3页面 </span>
        </div>
      </CubeBorderBox3>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cubeborder3',
  pageConfig: {
    groupsKey: 'datav',
    groupsName: '数据可视化',
    pageTitle: 'Cubeborder3',
    pageName: 'Cubeborder3',
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
