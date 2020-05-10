<template>
  <div class="cubeMaxHeight">
    <slot
      ref="main"
      name="main"
    >
      <div> main </div>
    </slot>
    <slot
      ref="foot"
      name="foot"
    >
      <div> foot </div>
    </slot>
  </div>
</template>

<script>

import debounce from 'throttle-debounce/debounce';

export default {
  name: 'CubeMaxHeight',
  props: {
    prefix: {
      // 余量fix一些场景一下需要减掉部分的高度
      type: Number,
      default: () => 10
    }
  },
  mounted() {
    this.computedHeight();
    this.resizeHeight = debounce(200, () => {
      this.computedHeight();
    });
    window.addEventListener('resize', this.resizeHeight);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHeight);
  },
  methods: {
    computedHeight() {
      const main = this.$slots && this.$slots.main[0] && this.$slots.main[0];
      const foot = this.$slots && this.$slots.foot[0] && this.$slots.foot[0];
      const innerHieght = window.innerHeight;
      const mainTop = main ? main.elm.getBoundingClientRect().top : 10;
      let maxHeight = Math.abs(innerHieght - mainTop - this.prefix);
      if (foot) {
        const footHeight = foot.elm.offsetHeight;
        maxHeight = Math.abs(innerHieght - footHeight - mainTop - this.prefix) || 0;
      }
      this.$emit('update:height', maxHeight);
    }
  }
};
</script>

