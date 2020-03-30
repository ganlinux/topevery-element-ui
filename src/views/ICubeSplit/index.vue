<template>
  <div class="div">
    <CubeSplit :cube-split-height="cubeSplitHeight">
      <template slot="left">
        <div style="margin: 10px;">
          左右分割面板 - 自动计算最大高度 - 如果设置 cubeSplitHeight 高度 自动计算失效
          <el-button type="primary" size="small" @click="setCubeSplitHeight">设置cubeSplitHeight = {{ cubeSplitHeight }} </el-button>
          {{ cubeSplitHeight ? '自动计算高度关闭':'自动计算高度' }}
          <!-- <div v-for="(item, index) in 100" :key="index"> 数据 </div> -->
        </div>
      </template>
      <template slot="right">
        <div style="margin: 10px;">
          <div v-for="(item, index) in 100" :key="index"> 数据 </div>
        </div>
      </template>
    </CubeSplit>

  </div>
</template>

<script>
export default {
  name: 'CubeSplitX',
  title: 'CubeSplit分割面板',
  data() {
    return {
      cubeSplitHeight: 0
    }
  },
  methods: {
    setCubeSplitHeight() {
      const { cubeSplitHeight } = this
      this.cubeSplitHeight = cubeSplitHeight ? 0 : 300
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-split {
  height: 200px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>
