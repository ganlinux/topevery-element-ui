<template>
  <div>
    CubeViewer
    <div> 组件形式调用 </div>
    <cube-viewer
      :images="images"
      class="images clearfix"
    >
      <template slot-scope="scope">
        <img
          v-for="src in scope.images"
          :src="src"
          :key="src"
          class="image"
        >
      </template>
    </cube-viewer>

    <div> 指令形式调用 </div>
    <div
      v-cube-viewer
      class="images clearfix"
    >
      <template v-for="image in images">
        <img
          :src="image"
          class="image"
          :key="image"
        >
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://picsum.photos/200/200',
        'https://picsum.photos/300/200',
        'https://picsum.photos/250/200'
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.image {
  height: 200px;
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}
</style>