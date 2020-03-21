<template>
  <div class="map">
    <div
      id="CubeMap"
      class="CubeMap"
    />
    <div class="tools">
      <el-button
        type="primary"
        @click="stopDraw"
      > 停止绘制 </el-button>
      <el-button
        type="primary"
        @click="draw(1)"
      >标点</el-button>
      <el-button
        type="primary"
        @click="draw(2)"
      >画线</el-button>
      <el-button
        type="primary"
        @click="draw(3)"
      >画面</el-button>
      <el-button
        type="danger"
        @click="cleanMap"
      > 清空所有绘制 </el-button>
      <el-tooltip
        placement="top"
        effect="light"
      >
        <div slot="content">
          1、已绘制图层双击取消删除
          <br>
          2、清空所有绘制会清空地图上所有图形
          <br>
          2、画面、画线操作时,双击完成绘制
        </div>
        <el-button>操作说明</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>

const data = [[{ 'lng': 114.295603, 'lat': 22.612399 }, { 'lng': 114.303652, 'lat': 22.609463 }, { 'lng': 114.310551, 'lat': 22.612399 }, { 'lng': 114.315725, 'lat': 22.607861 }, { 'lng': 114.326648, 'lat': 22.611865 }, { 'lng': 114.331822, 'lat': 22.616135 }, { 'lng': 114.345908, 'lat': 22.611598 }, { 'lng': 114.363155, 'lat': 22.619071 }, { 'lng': 114.369479, 'lat': 22.627344 }, { 'lng': 114.388452, 'lat': 22.62174 }, { 'lng': 114.399375, 'lat': 22.636951 }, { 'lng': 114.445943, 'lat': 22.663234 }, { 'lng': 114.423521, 'lat': 22.684043 }, { 'lng': 114.378103, 'lat': 22.657231 }, { 'lng': 114.384715, 'lat': 22.666836 }, { 'lng': 114.367755, 'lat': 22.676173 }, { 'lng': 114.346483, 'lat': 22.67724 }, { 'lng': 114.325211, 'lat': 22.671638 }, { 'lng': 114.301639, 'lat': 22.667903 }, { 'lng': 114.283242, 'lat': 22.663634 }, { 'lng': 114.294453, 'lat': 22.653229 }, { 'lng': 114.27778, 'lat': 22.652962 }, { 'lng': 114.270019, 'lat': 22.645757 }, { 'lng': 114.268007, 'lat': 22.637485 }, { 'lng': 114.278643, 'lat': 22.633215 }, { 'lng': 114.28353, 'lat': 22.629479 }, { 'lng': 114.272319, 'lat': 22.614534 }, { 'lng': 114.286117, 'lat': 22.611865 }], [{ 'lng': 114.350795, 'lat': 22.718984 }, { 'lng': 114.356256, 'lat': 22.694446 }, { 'lng': 114.390464, 'lat': 22.691512 }, { 'lng': 114.400812, 'lat': 22.684043 }, { 'lng': 114.435595, 'lat': 22.694446 }, { 'lng': 114.461466, 'lat': 22.690712 }, { 'lng': 114.453992, 'lat': 22.710183 }, { 'lng': 114.425821, 'lat': 22.726184 }, { 'lng': 114.375229, 'lat': 22.730451 }]]

import { gpsPoints } from './gps'

export default {
  name: 'CubeMapDraw',
  props: {
    /** 是否显示清除覆盖物按钮 */
    clear: {
      type: Boolean,
      default: true
    },
    /** 填充透明度 */
    fillOpacity: {
      type: Number,
      default: 0.5
    },
    /** 填充颜色 */
    fillColor: {
      type: String,
      default: '#fff'
    },
    /** 线条颜色 */
    strokeColor: {
      type: String,
      default: 'blue'
    },
    /** 线条宽度 */
    strokeWeight: {
      type: Number,
      default: 1
    },
    /** 是否可編輯 */
    isEditing: {
      type: Boolean,
      default: true
    },
    /** * 显示的类型。*/
    isShow: {
      type: Boolean,
      default: true
    },
    /** * 显示的类型。 */
    type: {
      type: Array,
      default() {
        return [1, 2, 3]
      }
    },
    /** * 坐标点。1个 */
    markerPoint: {
      type: Object,
      default() {
        return {
          lng: null,
          lat: null
        }
      }
    },
    /** * 坐标点 多个 */
    markerPoints: {
      type: Array,
      default: () => []
    },
    /** * 线段 多个 */
    linePoints: {
      type: Array,
      default: () => []

    },
    /** * 多边形 多个 */
    polygonPoints: {
      type: Array,
      default: () => [1]

    },
    /** * 是否可以双击 */
    canDbclick: {
      type: Boolean,
      default: true
    },
    /** * 是否标点只能是一个 */
    oneMarker: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      map: null,
      drawType: null,
      oneMarkerPoint: null, // 一个Marker信息对象。
      markerPointList: [], // 多个Marker信息对象。
      linePointList: [], // 多个线条信息对象。
      polygonPointList: [], // 多个面信息对象。
      styleOptions: {
        strokeColor: '#3689F3', // 边线颜色。
        fillColor: '#3689F3', // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 2, // 边线的宽度，以像素为单位。
        strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.4, // 填充的透明度，取值范围0 - 1。
        strokeStyle: 'dashed。' // 边线的样式，solid dashed。
      }
    }
  },
  mounted() {
    this.$nextTick().then(_ => {
      setTimeout(() => {
        // this.mapReady()
        this.initMap()
      }, 200)
    })
  },
  methods: {
    mapReady() {
      this.map = new BMap.Map('CubeMap', { enableMapClick: false, minZoom: 12 })
      this.map.centerAndZoom(new BMap.Point(114.12744, 22.64469), 13)
      this.map.enableScrollWheelZoom(true)

      this.$nextTick().then(_ => {
        setTimeout(() => {
          this.initDrawingManager(this.map)
        }, 200)
      })
    },
    initDrawLoadData() {
      let allPoints = []
      // 画面
      if (Array.isArray(this.polygonPoints) && this.polygonPoints.length) {
        // const _this = this
        // this.polygonPoints.forEach(itemArr => {
        data.forEach(itemArr => {
          const list = itemArr.map(item => new BMap.Point(item.lng, item.lat))

          for (const item of list) {
            const { lng, lat } = item
            const onePoint = new BMap.Point(lng, lat)
            const oneMarkerPoint = new BMap.Marker(onePoint)
            oneMarkerPoint._key_ = this.getRandomID()
            this.map.addOverlay(oneMarkerPoint)
          }

          const polygon = new BMap.Polygon(list, { ...this.styleOptions })
          if (polygon) {
            const _this = this
            polygon._key_ = this.getRandomID()
            this.polygonPointList.push(polygon)
            polygon.addEventListener('dblclick', function(e) {
              e.domEvent.preventDefault()
              _this.map && _this.map.removeOverlay(this)
              const _index = _this.polygonPointList.findIndex(item => item._key_ !== e._key_)
              _this.polygonPointList = _this.polygonPointList.splice(_index, 1)
            })
          }

          setTimeout(() => {
            if (this.polygonPointList.length) {
              this.polygonPointList.map(item => item.enableEditing())
            }
          }, 20)
          this.map.addOverlay(polygon)
          allPoints = allPoints.concat(list)
        })
      }
      // 画线
      // if (Array.isArray(this.linePoints) && this.linePoints.length) {
      //   this.linePoints.forEach(itemArr => {
      //     const list = itemArr.map(item => new BMap.Point(item.lng, item.lat))
      //     const PolygonLine = new BMap.Polyline(list, { ...this.styleOptions })
      //     PolygonLine._key_ = this.getRandomID()
      //     PolygonLine.enableEditing()
      //     this.linePointList.push(PolygonLine)
      //     this.map.addOverlay(PolygonLine)
      //     allPoints = allPoints.concat(list)
      //     const _this = this
      //     PolygonLine.addEventListener('dblclick', function(e) {
      //       e.domEvent.preventDefault()
      //       _this.map && _this.map.removeOverlay(this)
      //       const _index = _this.linePointList.findIndex(item => item._key_ !== e._key_)
      //       _this.linePointList = _this.linePointList.splice(_index, 1)
      //     })
      //   })
      // }
      // 单个点
      // if (this.oneMarker) {
      //   const _this = this
      //   const { lng, lat } = this.markerPoint
      //   if (!lng) return
      //   const onePoint = new BMap.Point(lng, lat)
      //   this.oneMarkerPoint = new BMap.Marker(onePoint)
      //   this.map.addOverlay(this.oneMarkerPoint)
      //   allPoints.push(onePoint)
      //   this.oneMarkerPoint.addEventListener('dblclick', function(e) {
      //     e.domEvent.preventDefault()
      //     _this.map && _this.map.removeOverlay(this)
      //     _this.oneMarkerPoint = null
      //   })
      // } else {
      //   // 多个点
      //   if (Array.isArray(this.markerPoints) && this.markerPoints.length) {
      //     const _this = this
      //     this.markerPoints.forEach(item => {
      //       const { lng, lat } = this.item
      //       const onePoint = new BMap.Point(lng, lat)
      //       const oneMarkerPoint = new BMap.Marker(onePoint)
      //       oneMarkerPoint._key_ = this.getRandomID()
      //       this.markerPointList.push(oneMarkerPoint)
      //       this.map.addOverlay(oneMarkerPoint)
      //       allPoints.push(onePoint)
      //       oneMarkerPoint.addEventListener('dblclick', function(e) {
      //         e.domEvent.preventDefault()
      //         _this.map && _this.map.removeOverlay(this)
      //         const _index = _this.markerPointList.findIndex(item => item._key_ !== e._key_)
      //         _this.markerPointList = _this.markerPointList.splice(_index, 1)
      //       })
      //     })
      //   }
      // }
      this.map && this.map.setViewport(allPoints)
    },
    getRandomID(length = 36) {
      return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36) + new Date().getTime()
    },
    initDrawingManager(map) {
      const { styleOptions } = this
      // eslint-disable-next-line no-undef
      this.drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: false, // 是否显示工具栏
        // eslint-disable-next-line no-undef
        drawingMode: BMAP_DRAWING_POLYGON, // 绘制模式  多边形
        // eslint-disable-next-line no-undef
        drawingToolOptions: {
          // eslint-disable-next-line no-undef
          anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
          // eslint-disable-next-line no-undef
          offset: new BMap.Size(5, 5), // 偏离值
          drawingTypes: [
            // eslint-disable-next-line no-undef
            BMAP_DRAWING_MARKER,
            // eslint-disable-next-line no-undef
            BMAP_DRAWING_POLYLINE,
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

      this.$nextTick().then(_ => {
        setTimeout(() => {
          this.initDrawLoadData(this.map)
        }, 200)
      })
    },
    draw(type) {
      switch (type) {
        case 1:
          this.drawingManager.open()
          // eslint-disable-next-line no-undef
          this.drawingManager.setDrawingMode(BMAP_DRAWING_MARKER)
          break
        case 2:
          this.drawingManager.open()
          // eslint-disable-next-line no-undef
          this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE)
          break
        case 3:
          this.drawingManager.open()
          // eslint-disable-next-line no-undef
          this.drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON)
          break
        default:
          break
      }
    },
    overlaycomplete(e) {
      const _this = this
      const overlay = e.overlay
      overlay._key_ = this.getRandomID()
      _this.drawType = overlay.BQ
      // Polygon Marker Polyline
      if (_this.drawType !== 'Marker') {
        _this.drawType === 'Polygon' ? this.polygonPointList.push(overlay) : this.linePointList.push(overlay)
        overlay.enableEditing()
        // console.log(overlay.getPath(), 'xxx') 获坐标
        // const { lng, lat } = overlay.getPath()[0]
        // const label = new BMap.Label('删除', { position: new BMap.Point(lng, lat) })
        // label.setStyle({
        //   color: 'red',
        //   fontSize: '12px',
        //   fontFamily: '微软雅黑',
        //   cursor: 'pointer'
        // })
        overlay.addEventListener('dblclick', function(e) {
          e.domEvent.preventDefault()
          _this.map && _this.map.removeOverlay(this)
          _this.map && _this.map.removeOverlay(overlay)
          if (_this.drawType === 'Polygon') {
            const _index = _this.polygonPointList.findIndex(item => item._key_ !== e._key_)
            _this.polygonPointList = _this.polygonPointList.splice(_index, 1)
          } else {
            const _index = _this.linePointList.findIndex(item => item._key_ !== e._key_)
            _this.linePointList = _this.linePointList.splice(_index, 1)
          }
        })
        // this.map.addOverlay(label)
      } else {
        const { oneMarker, oneMarkerPoint } = _this
        if (oneMarker) {
          if (oneMarkerPoint) _this.map && _this.map.removeOverlay(oneMarkerPoint)
          _this.oneMarkerPoint = overlay
          overlay.addEventListener('dblclick', function(e) {
            e.domEvent.preventDefault()
            _this.map && _this.map.removeOverlay(this)
            _this.oneMarkerPoint = null
          })
        } else {
          // console.log(overlay.getPosition(), '坐标')
          this.markerPointList.push(overlay)
          overlay.addEventListener('dblclick', function(e) {
            e.domEvent.preventDefault()
            _this.map && _this.map.removeOverlay(this)
            const _index = _this.markerPointList.findIndex(item => item._key_ !== e._key_)
            _this.markerPointList = _this.markerPointList.splice(_index, 1)
          })
        }
      }
    },
    cleanMap() {
      this.drawingManager && this.drawingManager.close()
      this.map && this.map.clearOverlays()
      this.markerPointList = []
      this.linePointList = []
      this.polygonPointList = []
    },
    stopDraw() {
      this.drawingManager && this.drawingManager.close()
    },
    getPolygonPointListPoints() {
      return this.polygonPointList.map(item => item.getPath()) || []
    },
    getLinePointList() {
      return this.linePointList.map(item => item.getPath()) || []
    },
    getMarkerPointList() {
      return this.markerPointList.map(item => item.getPosition()) || []
    },
    getMarkerPoint() {
      return this.oneMarkerPoint ? this.oneMarkerPoint.getPosition() : null
    },
    getAllPointListt() {
      return {
        oneMarkerPoint: this.oneMarkerPoint ? this.oneMarkerPoint.getPosition() : null,
        markerPointList: this.markerPointList.map(item => item.getPosition()) || [],
        linePointList: this.linePointList.map(item => item.getPath()) || [],
        polygonPointList: this.polygonPointList.map(item => item.getPath()) || []
      }
    },
    initMap() {
      this.map = new BMap.Map('CubeMap', { enableMapClick: false, minZoom: 12 })
      this.map.centerAndZoom(new BMap.Point(114.12744, 22.64469), 13)
      this.map.enableScrollWheelZoom(true)

      const arrPois = gpsPoints.map(item => new BMap.Point(item.lat, item.lng))
      console.log(gpsPoints, 'xx')

      // this.map && this.map.setViewport(arrPois)

      // 画轨迹
      const polyLine = new BMap.Polyline(arrPois, {
        strokeColor: 'red', // 设置颜色
        strokeWeight: 5, // 宽度
        strokeOpacity: 0.5 // 透明度
      })
      this.map.addOverlay(polyLine)
      // 画轨迹结束
      // eslint-disable-next-line no-undef
      BMapLib.LuShu.prototype._move = function(initPos, targetPos, effect) {
        // var pointsArr = [initPos, targetPos] // 点数组
        var me = this
        // 当前的帧数
        var currentCount = 0
        // 步长，米/秒
        var timer = 10
        var step = this._opts.speed / (1000 / timer)
        // 初始坐标
        var init_pos = this._projection.lngLatToPoint(initPos)
        // 获取结束点的(x,y)坐标
        var target_pos = this._projection.lngLatToPoint(targetPos)
        // 总的步长
        var count = Math.round(me._getDistance(init_pos, target_pos) / step)
        // 显示折线 syj201607191107
        // 如果想显示小车走过的痕迹，放开这段代码就行
        // this._map.addOverlay(
        //   new BMap.Polyline(pointsArr, {
        //     strokeColor: "#111",
        //     strokeWeight: 5,
        //     strokeOpacity: 0.5
        //   })
        // ); // 画线
        // 如果小于1直接移动到下一点
        if (count < 1) {
          me._moveNext(++me.i)
          return
        }
        me._intervalFlag = setInterval(function() {
          // 两点之间当前帧数大于总帧数的时候，则说明已经完成移动
          if (currentCount >= count) {
            clearInterval(me._intervalFlag)
            // 移动的点已经超过总的长度
            if (me.i > me._path.length) {
              return
            }
            // 运行下一个点
            me._moveNext(++me.i)
          } else {
            currentCount++
            var x = effect(init_pos.x, target_pos.x, currentCount, count)
            var y = effect(init_pos.y, target_pos.y, currentCount, count)
            var pos = me._projection.pointToLngLat(new BMap.Pixel(x, y))
            // 设置marker
            if (currentCount === 1) {
              var proPos = null
              if (me.i - 1 >= 0) {
                proPos = me._path[me.i - 1]
              }
              if (me._opts.enableRotation === true) {
                me.setRotation(proPos, initPos, targetPos)
              }
              if (me._opts.autoView) {
                if (!me._map.getBounds().containsPoint(pos)) {
                  me._map.setCenter(pos)
                }
              }
            }
            // 正在移动
            me._marker.setPosition(pos)
            // 设置自定义overlay的位置
            me._setInfoWin(pos)
          }
        }, timer)
      }
      // this.initLushu(this.map, arrPois, this.mycaiId)
    },
    initLushu(map, arrPois, mycaiId) {
      // eslint-disable-next-line no-undef
      this.lushu = new BMapLib.LuShu(map, arrPois, {
        defaultContent: mycaiId, // "从天安门到百度大厦"
        autoView: true, // 是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: new BMap.Icon(
          'http://developer.baidu.com/map/jsdemo/img/car.png',
          new BMap.Size(52, 26),
          {
            anchor: new BMap.Size(27, 13)
          }
        ),
        speed: this.speed,
        enableRotation: true, // 是否设置marker随着道路的走向进行旋转
        landmarkPois: [
          {
            lng: 116.306954,
            lat: 40.05718,
            html: '加油站',
            pauseTime: 2
          }
        ]
      })
    },
    play(val) {
      if (this.arrIndex >= this.gpsArr.length - 3) {
        this.arrIndex = 0
      }
      switch (val) {
        case 1:
          this.lushu.start()
          break
        case 2:
          this.lushu.pause()
          break
        case 3:
          this.lushu.stop()
          this.arrIndex = 0
          this.percentage = 0
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  height: 84vh;
  width: 100%;
  .CubeMap {
    height: 100%;
    width: 100%;
  }
  .tools {
    position: fixed;
    top: 90px;
    right: 40px;
    z-index: 99999999;
  }
}
</style>
