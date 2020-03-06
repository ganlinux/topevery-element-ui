<template>
  <div class="SingleComponent">
    <div class="SingleComponent-wrapper">
      <demo></demo>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SingleComponent',
  components: {
    // demo: () => import(`../components/${this.componentName}/demo`),
  },
  data () {
    return {
      componentName: ''
    }
  }
}

</script>
