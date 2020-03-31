<template>
  <div
    :style="circleSize"
    :class="wrapClasses"
  >
    <svg viewBox="0 0 100 100">
      <defs v-if="showDefs">
        <linearGradient
          :id="id"
          x1="100%"
          y1="0%"
          x2="0%"
          y2="0%"
        >
          <stop
            offset="0%"
            :stop-color="strokeColor[0]"
          />
          <stop
            offset="100%"
            :stop-color="strokeColor[1]"
          />
        </linearGradient>
      </defs>
      <path
        :d="pathString"
        :stroke="trailColor"
        :stroke-width="trailWidth"
        :fill-opacity="0"
        :style="trailStyle"
        :stroke-linecap="strokeLinecap"
      />
      <!-- :stroke-width="computedStrokeWidth" -->
      <path
        :d="pathString"
        :stroke-linecap="strokeLinecap"
        :stroke="strokeValue"
        :stroke-width="computedStrokeWidth"
        fill-opacity="0"
        :style="pathStyle"
      />
    </svg>
    <div :class="innerClasses">
      <slot />
    </div>
  </div>
</template>
<script>

import { oneOf } from '../../uitls/assist'
import { random_str } from '../../uitls'

const prefixCls = 'cube-chart-circle'

export default {
  name: 'CubeCircle',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 120
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    strokeColor: {
      type: [String, Array],
      default: '#2d8cf0'
    },
    strokeLinecap: {
      validator(value) {
        return oneOf(value, ['square', 'round'])
      },
      default: 'round'
    },
    trailWidth: {
      type: Number,
      default: 6
    },
    trailColor: {
      type: String,
      default: '#eaeef2'
    },
    dashboard: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: `cube-chart-circle-${random_str(3)}`
    }
  },
  computed: {
    circleSize() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    },
    computedStrokeWidth() {
      return this.percent === 0 && this.dashboard ? 0 : this.strokeWidth
    },
    radius() {
      return 50 - this.strokeWidth / 2
    },
    pathString() {
      if (this.dashboard) {
        return `M 50,50 m 0,${this.radius}
                    a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}
                    a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}`
      } else {
        return `M 50,50 m 0,-${this.radius}
                    a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
                    a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`
      }
    },
    len() {
      return Math.PI * 2 * this.radius
    },
    trailStyle() {
      let style = {}
      if (this.dashboard) {
        style = {
          'stroke-dasharray': `${this.len - 75}px ${this.len}px`,
          'stroke-dashoffset': `-${75 / 2}px`,
          'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
        }
      }
      return style
    },
    pathStyle() {
      let style = {}
      if (this.dashboard) {
        style = {
          'stroke-dasharray': `${(this.percent / 100) * (this.len - 75)}px ${this.len}px`,
          'stroke-dashoffset': `-${75 / 2}px`,
          'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
        }
      } else {
        style = {
          'stroke-dasharray': `${this.len}px ${this.len}px`,
          'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
          'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        }
      }
      return style
    },
    wrapClasses() {
      return `${prefixCls}`
    },
    innerClasses() {
      return `${prefixCls}-inner`
    },
    strokeValue() {
      let color = this.strokeColor
      if (typeof this.strokeColor !== 'string') {
        color = `url(#${this.id})`
      }
      return color
    },
    showDefs() {
      return typeof this.strokeColor !== 'string'
    }
  }
}
</script>

<style lang="less" scoped>

@css-prefix: cube-;
 @circle-prefix-cls: ~"@{css-prefix}chart-circle";

.@{circle-prefix-cls}{
    display: inline-block;
    position: relative;
    &-inner {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        line-height: 1;
    }
}

</style>
