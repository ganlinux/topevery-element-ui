<template>
  <div class="datav-page">
    <div
      :ref="ref"
      class="cube-border-box-2"
      :style="`box-shadow: inset 0 0 40px ${mergedColor[1]}; border: 1px solid ${mergedColor[0]}`"
    >
      <svg class="cube-svg-container" :width="width" :height="height">
        <polyline class="cube-bb7-line-width-2" :stroke="mergedColor[0]" :points="`0, 25 0, 0 25, 0`" />
        <polyline class="cube-bb7-line-width-2" :stroke="mergedColor[0]" :points="`${width - 25}, 0 ${width}, 0 ${width}, 25`" />
        <polyline class="cube-bb7-line-width-2" :stroke="mergedColor[0]" :points="`${width - 25}, ${height} ${width}, ${height} ${width}, ${height - 25}`" />
        <polyline class="cube-bb7-line-width-2" :stroke="mergedColor[0]" :points="`0, ${height - 25} 0, ${height} 25, ${height}`" />
        <polyline class="cube-bb7-line-width-5" :stroke="mergedColor[1]" :points="`0, 10 0, 0 10, 0`" />
        <polyline class="cube-bb7-line-width-5" :stroke="mergedColor[1]" :points="`${width - 10}, 0 ${width}, 0 ${width}, 10`" />
        <polyline class="cube-bb7-line-width-5" :stroke="mergedColor[1]" :points="`${width - 10}, ${height} ${width}, ${height} ${width}, ${height - 10}`" />
        <polyline class="cube-bb7-line-width-5" :stroke="mergedColor[1]" :points="`0, ${height - 10} 0, ${height} 10, ${height}`" />
      </svg>
      <div class="border-box-content">
        <slot>
          <h1> cube-border-box-2 可视化大屏边框组件 </h1>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>

import autoResize from '../../uitls/autoResize'
import { deepMerge } from '../../uitls'

export default {
  name: 'CubeBorderBox2',
  mixins: [autoResize],
  props: {
    color: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      ref: 'border-box-2',
      defaultColor: ['#4fd2dd', '#235fa7'],
      mergedColor: []
    }
  },
  watch: {
    color: {
      immediate: true,
      handler(newColor) {
        const { defaultColor } = this
        this.mergedColor = deepMerge(defaultColor, newColor || {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cube-border-box-2 {
  position: relative;
  width: 100%;
  height: 100%;
}
.cube-border-box-2 .cube-svg-container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.cube-border-box-2 .cube-svg-container polyline {
  fill: none;
  stroke-linecap: round;
}
.cube-border-box-2 .cube-bb7-line-width-2 {
  stroke-width: 2;
}
.cube-border-box-2 .cube-bb7-line-width-5 {
  stroke-width: 5;
}
.cube-border-box-2 .border-box-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.cube-border {
  h1 {
    font-weight: normal;
    text-align: center;
    color: #ffffff;
  }
}
</style>
