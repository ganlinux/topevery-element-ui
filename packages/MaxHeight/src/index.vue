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
      return `${this.height}px`
    }
  },
  mounted() {
    this.resizeHeight()
    window.addEventListener('resize', this.resizeHeight)
  },
  created() {
    this.resizeHeight = debounce(() => {
      this.computedHeight()
    }, 400)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHeight)
  },
  methods: {
    computedHeight() {
      console.log('xxxx')
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
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
