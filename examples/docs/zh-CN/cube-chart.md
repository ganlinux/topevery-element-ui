## cube-chart 图表组件

数据可以可视的一种体现。通过聚和的数据以图表的形式展现。让数据更具有表现力和说服力。

- 通过传入配置项完成图表配置。
- 响应式的props更好的完成图表数据的切换显示
- 更少的代码量，完成业务数据图表，用数据驱动图表视图
- 内置`cube-blue`,`cube-green`两个主题。通过设置组件的`theme`完成主题的切换
- 为了组件打包不至于过大echarts引用只是引用了部分（bar、line、pie、tooltip）


echarts 具体分包情况描述如下，按需引入即可。
`````` JS
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
// import 'zrender/lib/svg/svg' 
``````

### 柱形图表基本配置用法

:::demo
```html
<template>
<div class="cube-chart-list">
  <div class="title"> 柱形图表 </div>
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"
  />
</div>
</template>

<script>
// import 'echarts/lib/chart/bar';
export default {
  data() {
    return {
      chartConfig: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: new Array(24).fill(0).map((value, index, array) => index + 1+'时'),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [{ type: 'value'}],
        series: [
          {
            name: '访问量',
            type: 'bar',
            data: new Array(24).fill(0).map((value, index, array) => Math.ceil(Math.random() * 1000))
          }
        ]
      }
    };
  }
};
</script>
```
:::

### 柱形图 - 组合使用配置

:::demo
```html
<template>
<div class="cube-chart-list">
  <div class="title"> 柱形图表 </div>
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"
  />
</div>
</template>

<script>
// import 'echarts/lib/chart/bar';
export default {
  data() {
    return {
      chartConfig: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: new Array(24).fill(0).map((value, index, array) => index + 1+'时'),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [{ type: 'value'}],
        series: [
          {
            name: '访问量',
            type: 'bar',
            data: new Array(24).fill(0).map((value, index, array) => Math.ceil(Math.random() * 1000))
          },
          {
            name: '在线量',
            type: 'bar',
            data: new Array(24).fill(0).map((value, index, array) => Math.ceil(Math.random() * 1000))
          }
        ]
      }
    };
  }
};
</script>
```
:::


### 折线图表基本配置用法

:::demo
```html
<template>
<div class="cube-chart-list">
  <div class="title"> 折线图表 </div>
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"
  />
</div>
</template>

<script>
// import 'echarts/lib/chart/bar';
export default {
  data() {
    return {
      chartConfig: {
          tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          top: "4%",
          left: "2%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: new Array(24).fill(0).map((value, index, array) => index + 1+'时'),
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "访问量",
            type: "line",
            data: new Array(24).fill(0).map((value, index, array) => Math.ceil(Math.random() * 1000)),
            smooth: true,
            areaStyle: {},
          },
        ],
      }
    };
  }
};
</script>
```
:::

### 折线图 - 组合使用配置

:::demo
```html
<template>
<div class="cube-chart-list">
  <div class="title"> 折线图表 </div>
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"
  />
</div>
</template>

<script>
// import 'echarts/lib/chart/bar';
export default {
  data() {
    return {
      chartConfig: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          top: "4%",
          left: "2%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: new Array(12).fill(0).map((value, index, array) => index + 1+'时'),
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "人员在线",
            type: "line",
            data: new Array(12).fill(0).map((value, index, array) => Math.ceil(Math.random() * 1000)),
            smooth: true,
            areaStyle: {},
          },
          {
            name: "车辆在线",
            type: "line",
            data: new Array(12).fill(0).map((value, index, array) => Math.ceil(Math.random() * 1000)),
            smooth: true,
            areaStyle: {},
          },
        ],
      },
    };
  }
};
</script>
```
:::

### 饼图基本配置用法

:::demo
```html
<template>
<div class="cube-chart-list pie-chart">
  <div class="title"> 饼图图表 </div>
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"
  />
</div>
</template>

<script>
// import 'echarts/lib/chart/bar';
export default {
  data() {
    return {
      chartConfig: {
        title: {
          text: '饼图程序调用高亮示例',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '60%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
    };
  }
};
</script>
```
:::


### Props -均为响应式 

* `initOptions`

  用来初始化 ECharts 实例。

* `theme`

  当前 ECharts 实例使用的主题。

* `options`

  ECharts 实例的数据。修改这个 prop 会触发 ECharts 实例的 `setOption` 方法。

  如果直接修改 `options` 绑定的数据而对象引用保持不变，`setOption` 方法调用时将带有参数 `notMerge: false`。否则，如果为 `options` 绑定一个新的对象，`setOption` 方法调用时则将带有参数 `notMerge: true`。

  例如，如果有如下模板：

  ```html
  <cube-chart :options="data"/>
  ```

  那么：

  ```js
  this.data = newObject // setOption(this.options, true)
  this.data.title.text = 'Trends' // setOption(this.options, false)
  ```

* `group`

  实例的分组，会自动绑定到 ECharts 组件的同名属性上。

* `autoresize` （默认值：`true`）

  这个 prop 用来指定 ECharts 实例在组件根元素尺寸变化时是否需要自动进行重绘。

* `manual-update` （默认值：`false`）

  在性能敏感（数据量很大）的场景下，我们最好对于 `options` prop 绕过 Vue 的响应式系统。当将 `manual-update` prop 指定为 `true` 且不传入 `options` prop 时，数据将不会被监听。然后，你需要用 `ref` 获取组件实例以后手动调用 `mergeOptions` 方法来更新图表。

### 计算属性

* `width` **[只读]**

  用来获取 ECharts 实例的当前宽度。

* `height` **[只读]**

  用来获取 ECharts 实例的当前高度。

* `computedOptions` **[只读]**

  用来读取 ECharts 更新内部 `options` 后的实际数据。

### 方法

* `mergeOptions`（底层调用了 ECharts 实例的 `setOption` 方法）

  *提供了一个更贴切的名称来描述 `setOption` 方法的实际行为。*

* `appendData`
* `resize`
* `dispatchAction`
* `showLoading`
* `hideLoading`
* `convertToPixel`
* `convertFromPixel`
* `containPixel`
* `getDataURL`
* `getConnectedDataURL`
* `clear`
* `dispose`

### 静态方法

* `connect`
* `disconnect`
* `registerMap`
* `registerTheme`
* `graphic.clipPointsByRect`
* `graphic.clipRectByRect`

### 事件

支持如下事件：

* `legendselectchanged`
* `legendselected`
* `legendunselected`
* `legendscroll`
* `datazoom`
* `datarangeselected`
* `timelinechanged`
* `timelineplaychanged`
* `restore`
* `dataviewchanged`
* `magictypechanged`
* `geoselectchanged`
* `geoselected`
* `geounselected`
* `pieselectchanged`
* `pieselected`
* `pieunselected`
* `mapselectchanged`
* `mapselected`
* `mapunselected`
* `axisareaselected`
* `focusnodeadjacency`
* `unfocusnodeadjacency`
* `brush`
* `brushselected`
* `rendered`
* `finished`
* 鼠标事件
  * `click`
  * `dblclick`
  * `mouseover`
  * `mouseout`
  * `mousemove`
  * `mousedown`
  * `mouseup`
  * `globalout`
  * `contextmenu`
* ZRender 事件 
  * `click`
  * `mousedown`
  * `mouseup`
  * `mousewheel`
  * `dblclick`
  * `contextmenu`