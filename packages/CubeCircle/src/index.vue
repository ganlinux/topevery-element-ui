<template>
  <div
    class="cube-circle"
    :style="circleStyle"
  >
    <svg
      :width="circleSize"
      :height="circleSize"
      :viewBox="`0 0 ${circleSize*2} ${circleSize*2}`"
    >
      <path
        :d="pathString"
        stroke="#f3f3f3"
        :stroke-width="strokeWidth"
        fill-opacity="0"
      />
      <path
        :d="pathString"
        stroke-linecap="round"
        :stroke="color"
        :stroke-width="strokeWidth"
        fill-opacity="0"
        :style="pathStyle"
      />
    </svg>
    <div class="cube-circle-content">
      <slot />
    </div>
  </div>
</template>
<script>

export default {
  name: 'CubeCircle',
  props: {
    color: {
      type: String,
      default: '#3B91FF'
    },
    percent: {
      type: [Number, String],
      default: 0
    },
    strokeWidth: {
      type: Number,
      default: 12
    },
    size: {
      type: Number,
      default: 120
    }
  },
  data() {
    return {}
  },
  computed: {
    circleStyle() {
      return {
        height: `${this.circleSize}px`
      }
    },
    circleSize() {
      return this.size + (this.strokeWidth / 2)
    },
    radius() {
      return this.circleSize - this.strokeWidth / 2
    },
    pathString() {
      return `M ${this.circleSize},${this.circleSize} m 0,-${this.radius}
        a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
        a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`
    },
    len() {
      return Math.PI * 2 * this.radius
    },
    pathStyle() {
      const percent = this.percent * 1
      return {
        'stroke-dasharray': `${this.len}px ${this.len}px`,
        'stroke-dashoffset': `${((100 - Math.min(percent, 100)) / 100 * this.len)}px`,
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cube-circle {
  display: inline-block;
  position: relative;
  .cube-circle-content {
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
