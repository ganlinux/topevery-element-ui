<template>
  <div class="div">
    <div class="demo-split">
      <Cube-Split v-model="split" min="200">
        <div
          slot="left"
          class="demo-split-pane"
        >
          Left Pane
          <CubeCircle :percent="value1" :stroke-width="14" :size="100">
            <p>占比: {{ value1 }}%</p>
          </CubeCircle>
        </div>
        <div
          slot="right"
          class="demo-split-pane"
        >
          Right Pane
          <CubeCircle :percent="value2" :stroke-width="14" :size="100">
            <p>占比: {{ value2 }}%</p>
          </CubeCircle>
        </div>
      </Cube-Split>
    </div>
    <div class="demo-split">
      <Cube-Split v-model="split2" mode="vertical" min="100">
        <div slot="top" class="demo-split-pane">
          Top Pane
        </div>
        <div slot="bottom" class="demo-split-pane">
          Bottom Pane
        </div>
      </Cube-Split>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CubeSplitX',
  title: 'CubeSplit分割面板',
  data() {
    return {
      value1: 70,
      value2: 80,
      split: 0.5,
      split2: 0.5
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
