## cube-chart 图表组件

数据可以可视的一种体现。通过聚和的数据以图表的形式展现。让数据更具有表现力和说服力。

:::tip
- 通过传入配置项完成图表配置。
- 响应式的props更好的完成图表数据的切换显示
- 更少的代码量，完成业务数据图表，用数据驱动图表视图
- 内置`cube-blue`,`cube-green`两个主题。通过设置组件的`theme`完成主题的切换
- 为了组件打包不至于过大echarts引用只是引用了部分（bar、line、pie、tooltip）
:::


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
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"/>
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

### 其他 Echarts 图表样例欣赏

:::demo
```html
<template>
<div class="cube-chart-list pie-chart">
  <div class="title"> 其他 </div>
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"
  />
</div>
</template>

<script>
// import 'echarts/lib/chart/bar';
export default {
  data() {
    const echarts = this.$echarts
    return {
       chartConfig:{
          backgroundColor: '#11183c',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '14%',
            top: '16%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
            axisLabel: {
              textStyle: {
                fontFamily: 'Microsoft YaHei'
              }
            }
          },
          yAxis: {
            type: 'value',
            max: '1200',
            axisLine: {
              show: false,
              lineStyle: {
                color: 'white'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            },
            axisLabel: {}
          },
          series: [{
            name: '1',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#fccb05'
                }, {
                  offset: 1,
                  color: '#f5804d'
                }]),
                barBorderRadius: 12
              }
            },
            data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
          },
          {
            name: '2',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#8bd46e'
                }, {
                  offset: 1,
                  color: '#09bcb7'
                }]),
                barBorderRadius: 11
              }

            },
            data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
          },
          {
            name: '3',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#248ff7'
                }, {
                  offset: 1,
                  color: '#6851f1'
                }]),
                barBorderRadius: 11
              }
            },
            data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
          }]
       }
    };
  },
};
</script>
```
:::

:::demo
```html
<template>
<div class="cube-chart-list pie-chart">
  <div class="title"> 其他 </div>
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"
  />
</div>
</template>

<script>
// import 'echarts/lib/chart/bar';
export default {
  data() {
    const echarts = this.$echarts
    return {
       chartConfig:{
          backgroundColor: '#11183c',
          grid: {
            top: "25%",
            bottom: "10%"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true
              }
            }
          },
          xAxis: {
            data: [
              "当年完成水量",
              "去年同期水量",
              "滚动目标值水量",
              "全年目标值水量",
              "当年完成金额",
              "去年同期金额",
              "滚动目标金额",
              "全年目标值",
            ],
            axisLine: {
              show: true, //隐藏X轴轴线
              lineStyle: { color: '#01FCE3' }
            },
            axisTick: {
              show: true //隐藏X轴刻度
            },
            axisLabel: {
              show: true,
              textStyle: {
                  color: "#01FCE3" //X轴文字颜色
              }
            },
          },
          yAxis: [{
            type: "value",
            name: "亿元",
            nameTextStyle: {
              color: "#01FCE3"
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisLabel: {
                show: true,
                textStyle: {
                  color: "#01FCE3"
                }
            },
          },
          {
            type: "value",
            name: "同比",
            nameTextStyle: {
              color: "#01FCE3"
            },
            position: "right",
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              textStyle: {
                  color: "#01FCE3"
              }
            }
          },
          {
            type: "value",
            gridIndex: 0,
            min: 50,
            max: 100,
            splitNumber: 8,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
              }
            }
          }],
          series: [{
            name: "销售水量",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
                //折线拐点标志的样式
                color: "#058cff"
            },
            lineStyle: {
                color: "#058cff"
            },
            areaStyle:{
                color: "rgba(5,140,255, 0.2)"
            },
            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
          },
          {
            name: "主营业务",
            type: "bar",
            barWidth: 15,
            itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#00FFE3"
                  },
                  {
                      offset: 1,
                      color: "#4693EC"
                  }
                  ])
                }
            },
            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
          }]
       }
    };
  },
};
</script>
```
:::


:::demo
```html
<template>
<div class="cube-chart-list pie-chart">
  <div class="title"> 其他 </div>
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"
  />
</div>
</template>

<script>
// import 'echarts/lib/chart/bar';
export default {
  data() {
    const echarts = this.$echarts
    return {
      chartConfig:{
        backgroundColor: '#11183c',
        grid: {
            left: '5%',
            right: '10%',
            top: '20%',
            bottom: '15%',
            containLabel: true
        },
        tooltip: {
            show: true,
            trigger: 'item'
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: '#30eee9'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#397cbc'
              }
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#195384'
              }
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
          type: 'value',
          name: '信息量',
          min: 0,
          max: 1000,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#2ad1d2'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#27b4c2'
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#11366e'
            }
          }
        },
        {
          type: 'value',
          name: '浏览量',
          min: 0,
          max: 1000,
          axisLabel: {
            formatter: '{value} 人',
            textStyle: {
              color: '#186afe'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#186afe'
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#11366e'
            }
          }
        }
      ],
      series: [{
        name: '已采纳',
        type: 'line',
        stack: '总量',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#0092f6',
            lineStyle: {
              color: "#0092f6",
              width: 1
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: 'rgba(7,44,90,0.3)'
              }, {
                offset: 1,
                color: 'rgba(0,146,246,0.9)'
              }])
            }
          }
        },
        markPoint: {
          itemStyle: {
            normal: {
              color: 'red'
            }
          }
        },
        data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
      },
      {
        name: '已发布',
        type: 'line',
        stack: '总量',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#00d4c7',
            lineStyle: {
              color: "#00d4c7",
              width: 1
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: 'rgba(7,44,90,0.3)'
              }, {
                offset: 1,
                color: 'rgba(0,212,199,0.9)'
              }]),
            }
          }
        },
        data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410]
      },
      {
        name: '浏览量',
        type: 'line',
        stack: '总量',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#aecb56',
            lineStyle: {
              color: "#aecb56",
              width: 1
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: 'rgba(7,44,90,0.3)'
              }, {
                offset: 1,
                color: 'rgba(114,144,89,0.9)'
              }]),
            }
          }
        },
        data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190]
      }]
    }
    };
  },
};
</script>
```
:::

:::demo
```html
<template>
<div class="cube-chart-list pie-chart">
  <div class="title"> 其他 </div>
  <cube-chart style="width: 100%;height: 100%;" autoresize :options="chartConfig"
  />
</div>
</template>

<script>
// import 'echarts/lib/chart/bar';

const myColor = [
  '#eb2100',
  '#eb3600',
  '#d0570e',
  '#d0a00e',
  '#34da62',
  '#00e9db',
  '#00c0e9',
  '#0096f3',
  '#33CCFF',
  '#33FFCC'
];

export default {
  data() {
    return {
      chartConfig: {
        backgroundColor: '#11183c',
        grid: {
          left: '10%',
          top: '8%',
          right: '5%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: [{ show: false }],
        yAxis: [
          {
            axisTick: 'none',
            axisLine: 'none',
            offset: '27',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '14'
              }
            },
            // 罗湖  福田  南山  盐田 龙岗  宝安  光明新区  坪山新区 大鹏新区  龙华新区
            data: [
              '罗湖区',
              '福田区',
              '南山区',
              '盐田区',
              '龙岗区',
              '宝安区',
              '光明区',
              '坪山区',
              '大鹏区',
              '龙华区'
            ]
          },
          {
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '14'
              }
            },
            data: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
          },
          {
            name: '分拨延误TOP 10',
            nameGap: '50',
            nameTextStyle: {
              color: '#ffffff',
              fontSize: '14'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)'
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: [4, 13, 25, 29, 38, 44, 50, 52, 60, 72],
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#ffffff',
                  fontSize: '14'
                }
              }
            },
            barWidth: 18,
            itemStyle: {
              normal: {
                color: function(params) {
                  const num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                barBorderRadius: 5
              }
            },
            z: 2
          },
          {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#0e2147',
                barBorderRadius: 5
              }
            },
            z: 1
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