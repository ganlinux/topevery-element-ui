<template>
  <div class="tools map-tools">
    <div class="btn-list">
      <div
        class="btn"
        @click.stop="stopDraw"
      >
        <div> 停止绘制 </div>
      </div>
      <div
        v-if="type.indexOf(1) > -1"
        class="btn"
        @click.stop="draw(1)"
      >
        <div> 标点 </div>
      </div>
      <div
        v-if="type.indexOf(2) > -1"
        class="btn"
        @click.stop="draw(2)"
      >
        <div> 画线 </div>
      </div>
      <div
        v-if="type.indexOf(3) > -1"
        class="btn"
        @click.stop="draw(3)"
      >
        <div> 画面 </div>
      </div>
      <div
        class="del"
        @click.stop="cleanMap"
      >
        <div> 清空所有绘制 </div>
      </div>
    </div>
    <div class="map-tip">
      <el-tooltip
        placement="top"
        effect="light"
      >
        <div slot="content">
          1、鼠标右键编辑、删除图形
          <br>
          2、清空所有绘制会清空地图上所有图形
          <br>
          2、画面、画线操作时,双击完成绘制
        </div>
        提示
        <el-button type="text"><i class="el-icon-question" /></el-button>
      </el-tooltip>
    </div>

    <transition name="el-zoom-in-top">
      <ul
        v-if="visible"
        v-clickOutside="clickOutside"
        :style="{left:left+'px',top:top+'px'}"
        class="contextmenu"
      >
        <li v-if="drawType!=='Marker'" @click.stop="handlerContextmenu(1)"> 编辑 </li>
        <li @click.stop="handlerContextmenu(0)"> 删除 </li>
      </ul>
    </transition>
  </div>
</template>

<script>

// 本绘制组件不在提供实时更新双向数据绑定
// 新增编辑保存的时候手动refs获取对应的方法

export default {
  name: 'CubeMapDraw',
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        function clickHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e)
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler
        document.addEventListener('click', clickHandler)
      },
      update() { },
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  },
  props: {
    /** 是否显示清除覆盖物按钮 */
    map: {
      type: Object,
      default: () => { }
    },
    /** * 显示的类型。 */
    type: {
      type: Array,
      default() {
        return [1, 2, 3]
      }
    },
    /** * marker 坐标点。1个 */
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
      default: () => []

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
      drawType: null,
      visible: false,
      top: 0,
      left: 0,
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
        if (!this.map) {
          this.$message({ type: 'error', message: '地图初始化失败' })
          return
        }
        this.initDrawingManager(this.map)
      }, 200)
    })
  },
  methods: {
    mapInit() {
      // eslint-disable-next-line no-undef
      this.map = new BMap.Map('CubeMap', {
        enableMapClick: false,
        minZoom: 12
      })
      // const { lng, lat } = this.center
      // eslint-disable-next-line no-undef
      // this.map.centerAndZoom(new BMap.Point(lng, lat), 16)

      const center = { lng: 114.12744, lat: 22.64469 }
      // eslint-disable-next-line no-undef
      this.map.centerAndZoom(new BMap.Point(center.lng, center.lat), 16)

      // 开启鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true)
      this.initDrawingManager(this.map)
    },
    // 初始化绘图工具
    initDrawingManager(map) {
      map.disableDoubleClickZoom()
      // eslint-disable-next-line no-undef
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

      setTimeout(() => {
        this.initDrawLoadData()
      }, 200)
    },
    // 选择绘图方式
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
    // 绘制完成
    overlaycomplete(e) {
      const _this = this
      const overlay = e.overlay
      overlay._key_ = this.guid()
      overlay._drawType_ = overlay.BQ
      _this.drawType = overlay.BQ
      // Polygon Marker Polyline
      if (_this.drawType !== 'Marker') {
        if (_this.drawType === 'Polygon') {
          overlay._pointArray_ = 'polygonPointList'
          this.polygonPointList.push(overlay)
        } else {
          overlay._pointArray_ = 'linePointList'
          this.linePointList.push(overlay)
        }
        overlay.addEventListener('rightclick', function(e) {
          e.domEvent.preventDefault()
          _this.left = e.clientX
          _this.top = e.clientY
          _this.visible = true
          this.map && this.map.disableDragging()
          this.map && this.map.disableScrollWheelZoom()
          _this.rightclickOverlay = this
        })
        // 开启编辑模式
        overlay.enableEditing()
        // 绘制完成抛出所有坐标
        const poitn = _this.getAllPointListt()
        _this.$emit('change', poitn)
      } else {
        const { oneMarker, oneMarkerPoint } = _this
        if (oneMarker) {
          if (oneMarkerPoint) _this.map && _this.map.removeOverlay(oneMarkerPoint)
          overlay._pointArray_ = null
          _this.oneMarkerPoint = overlay
          // 绘制完成抛出所有坐标
          const poitn = _this.getAllPointListt()
          _this.$emit('change', poitn)
        } else {
          overlay._pointArray_ = 'markerPointList'
          this.markerPointList.push(overlay)
          overlay.addEventListener('rightclick', function(e) {
            e.domEvent.preventDefault()
            _this.left = e.clientX
            _this.top = e.clientY
            _this.visible = true
            this.map && this.map.disableDragging()
            this.map && this.map.disableScrollWheelZoom()
            _this.rightclickOverlay = this
          })
          // 绘制完成抛出所有坐标
          const poitn = _this.getAllPointListt()
          _this.$emit('change', poitn)
        }
      }
    },
    // 右键菜单删除
    handlerContextmenu(type) {
      const { rightclickOverlay } = this
      if (!rightclickOverlay) return
      if (type) {
        // 编辑覆盖物
        rightclickOverlay._drawType_ !== 'Marker' && rightclickOverlay.enableEditing && rightclickOverlay.enableEditing()
      } else {
        // 删除 数组坐标数据
        this.map && this.map.removeOverlay(rightclickOverlay)
        if (rightclickOverlay._pointArray_) {
          if (Array.isArray(this[rightclickOverlay._pointArray_]) && this[rightclickOverlay._pointArray_].length) {
            // const index = this[rightclickOverlay._pointArray_].findIndex(item => item._key_ !== rightclickOverlay._key_)
            this[rightclickOverlay._pointArray_] = this[rightclickOverlay._pointArray_].filter(item => item._key_ !== rightclickOverlay._key_)
          }
        } else {
          this.oneMarkerPoint = null
        }
      }
      this.clickOutside()
    },
    // 清空地图
    cleanMap() {
      this.$confirm('是否确定删除地图上所有的绘制, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.markerPointList = []
        this.linePointList = []
        this.polygonPointList = []
        this.drawingManager && this.drawingManager.close()
        this.map && this.map.clearOverlays()
      }).catch(() => {

      })
    },
    // 停止绘图
    stopDraw() {
      this.drawingManager && this.drawingManager.close()
    },
    // 点击右键弹层外部
    clickOutside() {
      this.visible = false
      this.map && this.map.enableDragging()
      this.map && this.map.enableScrollWheelZoom()
      this.rightclickOverlay = null
    },
    // 数据加载绘制图形
    initDrawLoadData() {
      let allPoints = []
      // 画面
      if (Array.isArray(this.polygonPoints) && this.polygonPoints.length) {
        const _this = this
        this.polygonPoints.forEach(itemArr => {
          const list = itemArr.map(item => new BMap.Point(item.lng, item.lat))
          const Polygon = new BMap.Polygon(list, { ...this.styleOptions })
          Polygon._key_ = this.guid()
          Polygon._pointArray_ = 'polygonPointList'
          Polygon._drawType_ = 'Polygon'

          Polygon.addEventListener('rightclick', function(e) {
            e.domEvent.preventDefault()
            _this.left = e.clientX
            _this.top = e.clientY
            _this.visible = true
            this.map && this.map.disableDragging()
            this.map && this.map.disableScrollWheelZoom()
            _this.rightclickOverlay = this
          })

          this.polygonPointList.push(Polygon)
          this.map.addOverlay(Polygon)
          allPoints = allPoints.concat(list)
        })
      }
      // 画线
      if (Array.isArray(this.linePoints) && this.linePoints.length) {
        const _this = this
        this.linePoints.forEach(itemArr => {
          const list = itemArr.map(item => new BMap.Point(item.lng, item.lat))
          const PolygonLine = new BMap.Polyline(list, { ...this.styleOptions })
          PolygonLine._key_ = this.guid()
          PolygonLine._pointArray_ = 'linePointList'
          PolygonLine._drawType_ = 'Polyline'

          PolygonLine.addEventListener('rightclick', function(e) {
            e.domEvent.preventDefault()
            _this.left = e.clientX
            _this.top = e.clientY
            _this.visible = true
            this.map && this.map.disableDragging()
            this.map && this.map.disableScrollWheelZoom()
            _this.rightclickOverlay = this
          })

          this.linePointList.push(PolygonLine)
          this.map.addOverlay(PolygonLine)
          allPoints = allPoints.concat(list)
        })
      }
      // 单个点
      if (this.oneMarker) {
        const { lng, lat } = this.markerPoint
        if (!lng) return
        const onePoint = new BMap.Point(lng, lat)
        this.oneMarkerPoint = new BMap.Marker(onePoint)
        this.oneMarkerPoint._pointArray_ = null
        this.map.addOverlay(this.oneMarkerPoint)
        allPoints.push(onePoint)
      } else {
        // 多个点
        if (Array.isArray(this.markerPoints) && this.markerPoints.length) {
          const _this = this
          this.markerPoints.forEach(item => {
            const { lng, lat } = this.item
            const onePoint = new BMap.Point(lng, lat)
            const oneMarkerPoint = new BMap.Marker(onePoint)
            oneMarkerPoint._key_ = this.guid()
            oneMarkerPoint._pointArray_ = 'markerPointList'
            oneMarkerPoint._drawType_ = 'Marker'

            oneMarkerPoint.addEventListener('rightclick', function(e) {
              e.domEvent.preventDefault()
              _this.left = e.clientX
              _this.top = e.clientY
              _this.visible = true
              this.map && this.map.disableDragging()
              this.map && this.map.disableScrollWheelZoom()
              _this.rightclickOverlay = this
            })

            this.markerPointList.push(oneMarkerPoint)
            this.map.addOverlay(oneMarkerPoint)
            allPoints.push(onePoint)
          })
        }
      }
      this.map && this.map.setViewport(allPoints)
    },
    guid(length = 36) {
      // return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36) + new Date().getTime()
      function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
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
    // 对外暴露坐标
    getAllPointListt() {
      return {
        oneMarkerPoint: this.oneMarkerPoint ? this.oneMarkerPoint.getPosition() : null, // 单个坐标mark
        markerPointList: this.markerPointList.map(item => item.getPosition()) || [], // 多个坐标mark
        linePointList: this.linePointList.map(item => item.getPath()) || [], // 线条
        polygonPointList: this.polygonPointList.map(item => item.getPath()) || [] // 画
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tools {
  position: absolute;
  text-align: right;
  top: 10px;
  right: 10px;
  z-index: 999;
}

.map-tools {
  height: 44px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  user-select: none;
  text-align: right;

  .btn-list {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px rgba(10, 41, 59, 0.1);
    padding-right: 16px;
    font-weight: 400;
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #207afe;
      padding-left: 16px;
      position: relative;
      cursor: pointer;
      &:active {
        background: transparent;
        color: #207afe;
        opacity: 0.8;
      }
      &::after {
        content: "";
        position: absolute;
        right: -10px;
        top: 0;
        width: 1px;
        height: 100%;
        background: #e1e9f1;
      }
    }
    .del {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding-left: 16px;
      color: #ff0404;
      &:active {
        background: transparent;
        opacity: 0.8;
      }
    }
  }

  img {
    width: 16px;
    height: 16px;
    border: none;
    display: block;
  }

  .map-tip {
    height: 100%;
    cursor: pointer;
    width: 50px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 1);
  }
}

.contextmenu {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #fff;
  position: absolute;
  list-style-type: none;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  z-index: 99999999;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 80px;
  text-align: left;
  li {
    margin: 0;
    padding: 7px 16px;
    list-style: none;
    cursor: pointer;
    &:hover {
      background: #eee;
      color: #1D6FFF;
    }
  }
}
</style>
