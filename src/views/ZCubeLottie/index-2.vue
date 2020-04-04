<template>
  <div class="ZCubeLottie">
    ZCubeLottie

    <!-- <div
      ref="ZCubeLottieEl"
      class="ZCubeLottieDiv"
    /> -->
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="703.486" height="713" viewBox="0 0 703.486 713">
      <g id="组_1" data-name="组 1" transform="translate(-429.5 -430.5)">
        <g id="椭圆_1" data-name="椭圆 1" transform="translate(447 453.5)" fill="none" stroke="#000" stroke-width="4">
          <ellipse cx="334" cy="333.5" rx="334" ry="333.5" stroke="none" />
          <ellipse cx="334" cy="333.5" rx="332" ry="331.5" fill="none" />
        </g>
        <path id="椭圆_1_拷贝_4" data-name="椭圆 1 拷贝 4" d="M902.852,459.84c133.508,49.585,228.634,178.135,228.634,328.9,0,193.71-157.033,350.743-350.743,350.743M585.627,1080.25C491.774,1017.306,430,910.239,430,788.743,430,595.033,587.033,438,780.743,438" transform="translate(0.5 -3.284)" fill="none" stroke="#000" stroke-width="2" stroke-dasharray="32 16" />
        <ellipse id="椭圆_2" data-name="椭圆 2" cx="9" cy="8.5" rx="9" ry="8.5" transform="translate(886 445.5)" />
        <ellipse id="椭圆_2_拷贝" data-name="椭圆 2 拷贝" cx="9" cy="8" rx="9" ry="8" transform="translate(781 430.5)" />
        <ellipse id="椭圆_2_拷贝_2" data-name="椭圆 2 拷贝 2" cx="8" cy="8.5" rx="8" ry="8.5" transform="translate(587 1071.5)" />
        <circle id="椭圆_2_拷贝_3" data-name="椭圆 2 拷贝 3" cx="8.5" cy="8.5" r="8.5" transform="translate(764 1126.5)" />
        <path id="椭圆_1_拷贝_3" data-name="椭圆 1 拷贝 3" d="M860.566,560c111.161,0,208.478,59.277,262.064,147.945m43.919,158.039c0,120.252-69.369,224.3-170.273,274.318m-135.711,31.666c-140.264,0-258.485-94.378-294.624-223.1m-6.059-139.9c18.442-97.873,83.49-179.289,171.207-220.313" transform="translate(-78.883 -79)" fill="none" stroke="#000" stroke-width="2" />
      </g>
    </svg> -->
  </div>
</template>

<script>

import lottie from 'lottie-web'
import * as animationData from './data.json'

export default {
  name: 'ZCubeLottie',
  title: 'ZCubeLottie',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: 'ZCubeLottie测试',
    pageName: 'ZCubeLottie',
    sort: '1'
  },
  data() {
    return {
      defaultColor: ['#4fd2dd', '#235fa7'],
      mergedColor: []
    }
  },
  mounted() {
    const { mergeColor } = this
    mergeColor()
  },
  methods: {
    initLottie() {
      this.$nextTick().then(_ => {
        const element = this.$refs['ZCubeLottieEl']
        const animation = lottie.loadAnimation({
          container: element, // the dom element
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData // the animation data
        })
        console.log(animation)
      })
    },
    mergeColor() {
      const { color, defaultColor } = this
      this.mergedColor = Object.assign(defaultColor, color)
    }
  }
}
</script>

<style lang="less">
.ZCubeLottieDiv {
  height: 100px;
  width: 100px;
  background: aquamarine;
}
</style>

