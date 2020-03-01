<template>
  <div>
    <h1>This is an about page</h1>
    <el-button
      type="primary"
      @click="dialogVisible=true"
    >主要按钮</el-button>
    <CubeDialog
      destroy-on-close
      title="cubeDialogTitle"
      append-to-body
      :visible.sync="dialogVisible"
    >

      <H1> 内容测试 </H1>
      <MaxHeight>
      <H1> 内容测试 </H1>
      </MaxHeight>
    </CubeDialog>

  </div>
</template>

<script>

import { CubeDialog, MaxHeight } from '~'
export default {
  components: {
    CubeDialog,
    MaxHeight
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
