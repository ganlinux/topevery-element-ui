<template>
  <div class="CardCarouselX">
    <!-- :stroke-color="['#8D39DF', '#4B1EDC']" -->
    <ProgressLine
      :percent="90"
      :stroke-width="12"
      status="active"
    />
    <!-- :stroke-color="['#F93951', '#23BFBB']" -->
    <ProgressLine
      :percent="65"
      :stroke-width="12"
      status="active"
    />
    <!-- :stroke-color="['#37C1E2', '#EAECC8']" -->
    <ProgressLine
      :percent="45"
      :stroke-width="12"
      status="active"
    />
    <!-- :stroke-color="['#0F5177', '#88D8CE']" -->
    <ProgressLine
      :percent="25"
      :stroke-width="12"
      status="active"
    />

    <Cube-Circle
      :size="250"
      :trail-width="5"
      :stroke-width="5"
      :percent="75"
      stroke-linecap="square"
      stroke-color="#37C1E2"
    >
      <div class="circle-custom">
        <h1>42,001,776</h1>
        <p>在线总人数</p>
        <span>
          作业完成率
          <i>75%</i>
        </span>
      </div>
    </Cube-Circle>
  </div>
</template>

<script>
export default {
  name: 'CardCarouselX',
  title: '进度条',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less">
.circle-custom {
  & h1 {
    color: #3f414d;
    font-size: 28px;
    font-weight: normal;
    padding: 0;
    margin: 0;
  }
  & p {
    color: #657180;
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  & span {
    display: block;
    padding-top: 6px;
    color: #657180;
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  & span i {
    font-style: normal;
    color: #3f414d;
  }
}
</style>

