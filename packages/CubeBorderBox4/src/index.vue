<template>
  <div
    :ref="ref"
    class="cube-border-box-4"
  >
    <svg
      class="cube-svg-container"
      :width="width"
      :height="height"
    >
      <defs>
        <path
          :id="path"
          :d="`M2.5, 2.5 L${width - 2.5}, 2.5 L${width - 2.5}, ${height - 2.5} L2.5, ${height - 2.5} L2.5, 2.5`"
          fill="transparent"
        />
        <radialGradient
          :id="gradient"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stop-color="#fff"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color="#fff"
            stop-opacity="0"
          />
        </radialGradient>

        <mask :id="mask">
          <circle
            cx="0"
            cy="0"
            r="150"
            :fill="`url(#${gradient})`"
          >
            <animateMotion
              :dur="`${dur}s`"
              :path="`M2.5, 2.5 L${width - 2.5}, 2.5 L${width - 2.5}, ${height - 2.5} L2.5, ${height - 2.5} L2.5, 2.5`"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>
      <use
        :stroke="mergedColor[0]"
        stroke-width="2"
        :xlink:href="`#${path}`"
      />
      <use
        :stroke="mergedColor[1]"
        stroke-width="3"
        :xlink:href="`#${path}`"
        :mask="`url(#${mask})`"
      >
        <animate
          attributeName="stroke-dasharray"
          :from="`0, ${length}`"
          :to="`${length}, 0`"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </use>
    </svg>
    <div class="border-box-content">
      <slot />
    </div>
  </div>
</template>

<script>

import autoResize from '../../uitls/autoResize'
import { deepMerge } from '../../uitls'

export default {
  name: 'CubeBorderBox4',
  mixins: [autoResize],
  props: {
    color: {
      type: Array,
      default: () => ([])
    },
    dur: {
      type: Number,
      default: 4
    }
  },
  data() {
    const timestamp = Date.now()
    return {
      ref: 'border-box-4',
      path: `border-box-4-path-${timestamp}`,
      gradient: `border-box-4-gradient-${timestamp}`,
      mask: `border-box-4-mask-${timestamp}`,
      defaultColor: ['#4fd2dd', '#235fa7'],
      mergedColor: []
    }
  },
  computed: {
    length() {
      const { width, height } = this
      return (width + height - 5) * 2
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
.cube-border-box-4 {
  position: relative;
  width: 100%;
  height: 100%;
}
.cube-border-box-4 svg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}
.cube-border-box-4 .border-box-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
