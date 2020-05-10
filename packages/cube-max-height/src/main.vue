<template>
  <div class="cubeMaxHeight">
    <slot
      ref="table"
      name="main"
    />
    <slot
      ref="footer"
      name="foot"
    />
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
    this.resizeHeight = debounce(400, true, () => {
      this.computedHeight();
    });
    window.addEventListener('resize', this.resizeHeight);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHeight);
  },
  methods: {
    computedHeight() {
      console.log('ss');
      const table = this.$slots.table[0];
      const footer = this.$slots.footer && this.$slots.footer[0];
      const innerHieght = window.innerHeight;
      const tableTop = table ? table.elm.getBoundingClientRect().top : 10;
      let maxHeight = Math.abs(innerHieght - tableTop - this.prefix);
      if (footer) {
        const footerHeight = footer.elm.offsetHeight;
        maxHeight = Math.abs(innerHieght - footerHeight - tableTop - this.prefix) || 0;
      }
      this.$emit('update:height', maxHeight);
      // setTimeout(() => {
      //   this.$emit('update:height', maxHeight);
      // }, 100);
    }
  }
};
</script>

