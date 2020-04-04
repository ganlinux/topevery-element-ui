<template>
  <div class="MaxHeight" :style="{height: heightPx }">
    <slot>
      <div>content</div>
    </slot>
  </div>
</template>

<script>

import { debounce } from '~pu'

export default {
  name: 'MaxHeight',
  props: {
    prefix: {
      type: Number,
      default: 20
    },
    minHeight: {
      type: Number,
      default: 120
    },
    calcHeight: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      height: 200
    }
  },
  computed: {
    heightPx() {
      // return 'auto' || `${this.height}px`
      const { calcHeight, height } = this
      return calcHeight ? `${height}px` : 'auto'
    }
  },
  mounted() {
    this.resizeHeight = debounce(() => {
      this.computedHeight()
    }, 300)
    if (!this.calcHeight) return
    this.resizeHeight()
    window.addEventListener('resize', this.resizeHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHeight)
  },
  methods: {
    computedHeight() {
      const boxTop = this.$el.getBoundingClientRect().top || 0
      const innerHieght = window.innerHeight || 0
      this.height = Math.abs(innerHieght - boxTop - this.prefix) > this.minHeight ? Math.abs(innerHieght - boxTop - this.prefix) : this.minHeight
      setTimeout(() => {
        this.$emit('input', this.height)
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.MaxHeight{
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
