  
<template>
  <div :class="classes"></div>
</template>

<script>
export default {
  name: 'Resizer',
  props: {
    split: {
      validator(value) {
        return ['vertical', 'horizontal'].indexOf(value) >= 0;
      },
      required: true,
      default: ()=> 'vertical'
    },
    className: String
  },
  computed: {
    classes() {
      const classes = ['splitter-pane-resizer', this.split, this.className];
      return classes.join(' ');
    }
  }
};
</script>