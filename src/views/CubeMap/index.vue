<template>
  <div>
    <div
      id="CubeMap"
      class="CubeMap"
    />
    <div class="tools">
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CubeMap',
  data() {
    return {
      overlays: [],
      styleOptions: {
        strokeColor: 'red', // 边线颜色。
        fillColor: 'red', // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 2, // 边线的宽度，以像素为单位。
        strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, // 填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' // 边线的样式，solid或dashed。
      }
    }
  },
  mounted() {
    this.$nextTick().then(_ => {
      setTimeout(() => {
        this.mapReady()
      }, 200)
    })
  },
  methods: {
    mapReady() {
      const map = this.map = new BMap.Map('CubeMap', { enableMapClick: false, minZoom: 12 })
      map.centerAndZoom(new BMap.Point(114.12744, 22.64469), 13)
      map.enableScrollWheelZoom(true)
      this.map.addEventListener('click', e => {
        this.onMapClick(e)
      })
      this.initDrawingManager(map)
    },
    initDrawingManager(map) {
      const { styleOptions } = this
      // eslint-disable-next-line no-undef
      this.drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: false, // 是否显示工具栏
        // eslint-disable-next-line no-undef
        // drawingMode: BMAP_DRAWING_POLYGON, // 绘制模式  多边形
        // eslint-disable-next-line no-undef
        drawingToolOptions: {
          // eslint-disable-next-line no-undef
          anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
          // eslint-disable-next-line no-undef
          offset: new BMap.Size(5, 5), // 偏离值
          drawingModes: [
            // eslint-disable-next-line no-undef
            BMAP_DRAWING_POLYGON
          ]
        },
        // 圆的样式
        circleOptions: styleOptions,
        // 线的样式
        polylineOptions: styleOptions,
        // 多边形的样式
        polygonOptions: styleOptions,
        // 矩形的样式
        rectangleOptions: styleOptions
      })
      // eslint-disable-next-line no-undef
      this.drawingManager && this.drawingManager.addEventListener('overlaycomplete', this.overlaycomplete)
    },
    draw() {
      this.drawingManager && this.drawingManager.draw()
    },
    overlaycomplete(e) {
      console.log(e)
      this.polygon = e.overlay
      this.overlays.push(e.overlay)
    },
    clearAllOverLayout() {
      this.map && this.map.clearOverlays()
    //   this.overlays.map(item => this.map && this.map.removeOverlay(item))
    },
    onMapClick(e) {
      if (this.polygon) {
        this.clearAllOverLayout()
      }
      console.log(e, '地图点击')
    }
  }
}
</script>

<style lang="scss" scoped>
.CubeMap {
  height: 100%;
  width: 100%;
}
.tools {
  position: fixed;
  top: 80px;
  right: 40px;
  z-index: 99999999;
}
</style>
