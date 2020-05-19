<template>
  <div :class="classes">
    <div :class="barConClasses">
      <i v-for="i in 8" v-once :key="`trigger-${i}`" :class="`${prefix}-bar`" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Trigger',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    mode: String
  },
  data() {
    return {
      prefix: 'cube-split-trigger',
      initOffset: 0
    };
  },
  computed: {
    isVertical() {
      return this.mode === 'vertical';
    },
    classes() {
      return [
        this.prefix,
        this.isVertical ? `${this.prefix}-vertical` : `${this.prefix}-horizontal`
      ];
    },
    barConClasses() {
      return [
        `${this.prefix}-bar-con`,
        this.isVertical ? 'vertical' : 'horizontal'
      ];
    }
  }
};
</script>
