<template>
  <div class="cube-container-card-bs">
    <div
      v-if="$slots.header"
      ref="header"
      class="cube-container-card-bs__header"
    >
      <slot name="header" />
    </div>
    <div
      ref="wrapper"
      class="cube-container-card-bs__body"
    >
      <div class="cube-container-card-bs__body-wrapper-inner">
        <div class="cube-container-card-bs__body-card">
          <slot>
            <div
              v-for="(item,index) in 100"
              :key="item"
            > body默内容 - {{ index }} </div>
          </slot>
        </div>
      </div>
    </div>
    <div
      v-if="$slots.footer"
      ref="footer"
      class="cube-container-card-bs__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script>

import betterScroll from '../../mixProps/betterScroll'

export default {
  name: 'CubeContainer',
  mixins: [betterScroll]
}
</script>

<style lang="scss" scoped>
// 卡片式布局组件 - 滚动优化
.cube-container-card-bs {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  background: #edf5ff;
  .cube-container-card-bs__header {
    padding: 10px;
  }
  .cube-container-card-bs__body {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    .cube-container-card-bs__body-wrapper-inner {
      padding-bottom: 10px;
    }
    .cube-container-card-bs__body-card {
      position: relative;
      padding: 10px;
    }
  }
  .cube-container-card-bs__footer {
    padding: 10px;
  }
}
</style>
