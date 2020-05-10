## cube-chart


:::demo 测试图表基本用法。
```html
<template>
  <cube-chart
    autoresize
    theme="cube-blue"
    :options="chartConfig"
  />
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
            data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '访问量',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 20, 33, 39, 33, 22]
          }
        ]
      }
    };
  }
};
</script>
```
:::