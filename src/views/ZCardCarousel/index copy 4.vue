<template>
  <div id="cube">
    <ScrollBar>
      <figure v-for="k in 20" :key="k" class="front">1</figure>
      <figure class="back">2</figure>
      <figure class="right">3</figure>
      <figure class="left">4</figure>
      <figure class="top">5</figure>
      <figure class="bottom">6</figure>
    </ScrollBar>
  </div>
</template>

<script>
export default {
  name: 'CardCarouselX',
  title: 'CardCarousel-TEST'
}
</script>

<style lang="scss" scoped>
#box.show-front  { transform: translateZ(  -50px ) rotateY(    0deg ); }
#box.show-back   { transform: translateZ(  -50px ) rotateX( -180deg ); }
#box.show-right  { transform: translateZ( -150px ) rotateY(  -90deg ); }
#box.show-left   { transform: translateZ( -150px ) rotateY(   90deg ); }
#box.show-top    { transform: translateZ( -100px ) rotateX(  -90deg ); }
#box.show-bottom { transform: translateZ( -100px ) rotateX(   90deg ); }
</style>
