<template>
  <div>
    {{ cubeSelectTree }}
    <!-- key-name="no"
    key-code="carId" -->
    <CubeSelectTree
      v-model="cubeSelectTree"
      class="w220"
      :focus-onload="true"
      :popover-width="240"
      url="/class/getClassTree"
      :extra-param="extraParam"
    />
  </div>
</template>

<script>

export default {
  name: 'WCubeSelectTreeX',
  title: 'CubeSelectTree树形选择',
  data() {
    return {
      cubeSelectTree: '',
      extraParam: {
        classId: 'fe9881c1-92b9-43aa-89ae-bb7f97987477'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.w220 {
  width: 220px;
}
</style>
