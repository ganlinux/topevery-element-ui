<template>
  <div class="WCubeChartList">
    <div class="theme-setting">
      <el-tag
        effect="plain"
        @click="theme=''"
      >默认主题</el-tag>
      <el-tag @click="theme='cube-blue-theme'">蓝色主题</el-tag>
      <el-tag
        type="success"
        @click="theme='cube-green-theme'"
      >绿色主题</el-tag>
    </div>

    <el-card shadow="never">
      <div slot="header">
        描述title
      </div>
      <CuebEchart
        :autoresize="true"
        :theme="theme"
        :options="fwl"
      />
    </el-card>

    <el-card shadow="never">
      <div slot="header">
        <span>描述title</span>
      </div>
      <CuebEchart
        :autoresize="true"
        :theme="theme"
        :options="sqs"
      />
    </el-card>

    <el-card shadow="never">
      <div slot="header">
        <span>描述title</span>
      </div>
      <CuebEchart
        :autoresize="true"
        :theme="theme"
        :options="xsl"
      />
    </el-card>

    <el-card shadow="hover">
      <div slot="header">
        <div slot="header">描述title</div>
      </div>
      <div>
        <CuebEchart autoresize :options="chart1" />
      </div>
    </el-card>

    <el-card shadow="hover">
      <div slot="header">
        描述title
      </div>
      <div>
        <CuebEchart autoresize :options="chart3" />
      </div>
    </el-card>

    <el-card shadow="hover">
      <div slot="header">描述title</div>
      <div>
        <CuebEchart
          ref="myLine1"
          theme="byui-echarts-theme"
          autoresize
          :options="chart5"
          class="my-line1"
        />
      </div>
    </el-card>

    <el-card shadow="hover">
      <div slot="header">描述title</div>
      <div style="width: 600px;">
        <CuebEchart ref="myPie" :options="chart2" class="my-pie" />
        <el-row :gutter="15" style="margin: 0; background: #0f375f;">
          <el-col
            v-for="(item, index) in pieData"
            :key="item.id"
            :span="12"
          >
            <div
              ref="pie-legend"
              class="grid-content bg-purple pie-legend"
              @mouseenter="connectPie(index)"
              @mouseleave="loseConnect(index)"
            >
              <i
                :style="{
                  background: item.itemStyle.color,
                }"
              />
              <span>{{ item.name }}</span>
              <span>{{ item.value }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card shadow="hover">
      <div slot="header">描述title</div>
      <div>
        <CuebEchart ref="myChartLine6" :options="chart6" />
      </div>
    </el-card>

    <el-card shadow="hover">
      <div slot="header">描述title</div>
      <div>
        <CuebEchart ref="myChartLine7" :options="chart7" />
      </div>
    </el-card>

  </div>
</template>

<script>

import echarts from 'echarts'
import CuebEchart from '@/plugins/cubeEchart'

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
]

export default {
  name: 'WCubeChartList',
  title: 'Chart图表相关',
  pageConfig: {
    groupsKey: 'chart',
    groupsName: '图表',
    pageTitle: '图标列表',
    pageName: 'WCubeChartList',
    sort: '1'
  },
  components: {
    CuebEchart
  },
  data() {
    return {
      theme: 'cube-blue-theme',
      // 访问量
      fwl: {
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
            boundaryGap: false,
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
            type: 'line',
            data: [10, 52, 20, 33, 39, 33, 22],
            smooth: true,
            areaStyle: {}
          }
        ]
      },
      // 授权数
      sqs: {
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
            name: '授权数',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 20, 33, 39, 33, 22]
          }
        ]
      },
      // 销售量
      xsl: {
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
            boundaryGap: false,
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
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
            name: '销售量',
            type: 'line',
            data: [10, 52, 20, 33, 39, 33, 22, 10, 22, 23, 13, 29],
            smooth: true,
            areaStyle: {}
          },
          {
            name: '签单量',
            type: 'line',
            data: [20, 12, 30, 23, 31, 13, 32, 12, 12, 13, 13, 29],
            smooth: true,
            areaStyle: {}
          }
        ]
      },
      chart1: {
        title: {
          text: '2019年销售水量和主营业务收入对比',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 20
          },
          top: '3%',
          left: '10%'
        },
        backgroundColor: '#0f375f',
        grid: {
          top: '25%',
          bottom: '10%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        legend: {
          data: ['销售水量', '主营业务'],
          top: '15%',
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: {
          data: [
            '当年完成水量',
            '去年同期水量',
            '滚动目标值水量',
            '全年目标值水量',
            '当年完成金额',
            '去年同期金额',
            '滚动目标金额',
            '全年目标值'
          ],
          axisLine: {
            show: true // 隐藏X轴轴线
          },
          axisTick: {
            show: true // 隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ebf8ac' // X轴文字颜色
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '亿元',
            nameTextStyle: {
              color: '#ebf8ac'
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ebf8ac'
              }
            }
          },
          {
            type: 'value',
            name: '同比',
            nameTextStyle: {
              color: '#ebf8ac'
            },
            position: 'right',
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
              formatter: '{value} %', // 右侧Y轴文字显示
              textStyle: {
                color: '#ebf8ac'
              }
            }
          },
          {
            type: 'value',
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
                color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
              }
            }
          }
        ],
        series: [
          {
            name: '销售水量',
            type: 'line',
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'circle', // 标记的图形为实心圆
            symbolSize: 10, // 标记的大小
            itemStyle: {
              // 折线拐点标志的样式
              color: '#058cff'
            },
            lineStyle: {
              color: '#058cff'
            },
            areaStyle: {
              color: 'rgba(5,140,255, 0.2)'
            },
            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
          },
          {
            name: '主营业务',
            type: 'bar',
            barWidth: 15,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#00FFE3'
                  },
                  {
                    offset: 1,
                    color: '#4693EC'
                  }
                ])
              }
            },
            data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
          }
        ]
      },
      pieData: [
        {
          value: 154,
          name: '刑事',
          itemStyle: {
            color: '#ea9300'
          }
        },
        {
          value: 321,
          name: '治安',
          itemStyle: {
            color: '#0c77df'
          }
        },
        {
          value: 231,
          name: '122警情',
          itemStyle: {
            color: '#749f83'
          }
        },
        {
          value: 562,
          name: '交通事故',
          itemStyle: {
            color: '#c23531'
          }
        },
        {
          value: 442,
          name: '纠纷',
          itemStyle: {
            color: '#61a0a8'
          }
        },
        {
          value: 123,
          name: '群众求助',
          itemStyle: {
            color: '#00ffff'
          }
        },
        {
          value: 386,
          name: '举报违法',
          itemStyle: {
            color: '#f5f488'
          }
        },
        {
          value: 90,
          name: '自定义',
          itemStyle: {
            color: '#c21fff'
          }
        }
      ],
      chart2: {
        backgroundColor: '#0f375f',
        grid: {
          top: 0,
          right: '5%'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: '#011a44',
          borderColor: '#169ef6',
          borderWidth: 1,
          textStyle: {
            color: '#b2e1ff',
            fontSize: '14px'
          },
          padding: 10,
          formatter: '{b} <br>共计： {c} 起<br>占比：{d}%'
        },
        series: [
          {
            type: 'pie',
            radius: [40, 90],
            center: ['50%', '50%'],
            selectedMode: 'single',
            roseType: 'radius',
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            animationType: 'scale',
            animationEasing: 'elastiocOut',
            animationDelay: function(idx) {
              return Math.random() * 200
            },
            data: [
              {
                value: 154,
                name: '刑事',
                itemStyle: {
                  color: '#ea9300'
                }
              },
              {
                value: 321,
                name: '治安',
                itemStyle: {
                  color: '#0c77df'
                }
              },
              {
                value: 231,
                name: '122警情',
                itemStyle: {
                  color: '#749f83'
                }
              },
              {
                value: 562,
                name: '交通事故',
                itemStyle: {
                  color: '#c23531'
                }
              },
              {
                value: 442,
                name: '纠纷',
                itemStyle: {
                  color: '#61a0a8'
                }
              },
              {
                value: 123,
                name: '群众求助',
                itemStyle: {
                  color: '#00ffff'
                }
              },
              {
                value: 386,
                name: '举报违法',
                itemStyle: {
                  color: '#f5f488'
                }
              },
              {
                value: 90,
                name: '自定义',
                itemStyle: {
                  color: '#c21fff'
                }
              }
            ]
          }
        ],
        textStyle: {
          color: '#98d7ff'
        }
      },
      chart3: {
        backgroundColor: '#0f375f',
        grid: {
          left: '11%',
          top: '12%',
          right: '5%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [
          {
            show: false
          }
        ],
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
            data: [
              '南昌转运中心',
              '广州转运中心',
              '杭州转运中心',
              '宁夏转运中心',
              '兰州转运中心',
              '南宁转运中心',
              '长沙转运中心',
              '武汉转运中心',
              '合肥转运中心',
              '贵州转运中心'
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
                  const num = myColor.length
                  return myColor[params.dataIndex % num]
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
      chart5: {
        backgroundColor: '#0f375f',
        grid: {
          top: 20,
          left: 60
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#169ef6'
            },
            label: {
              backgroundColor: '#6a7985', // 水平线上提示框颜色
              formatter: '{value}'
            }
          },
          backgroundColor: '#011a44',
          borderColor: '#169ef6',
          borderWidth: 1,
          textStyle: {
            color: '#b2e1ff',
            fontSize: '14px'
          },
          padding: 10
        },
        toolbox: {}, // 工具栏
        xAxis: [
          {
            // X轴
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#169ef6'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                show: true,
                color: '#169ef6',
                type: 'dashed'
              }
            },
            data: ['4/1', '4/5', '4/10', '4/15', '4/20', '4/25', '4/30']
          }
        ],
        yAxis: [
          {
            // Y轴
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#003280'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#169ef6',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            type: 'line',
            smooth: true, // 圆滑效果
            data: [50, 75, 60, 100, 75, 55, 75],
            itemStyle: {
              color: '#ff964b'
            },
            lineStyle: {
              width: 4,
              color: {
                type: 'linear',

                colorStops: [
                  {
                    offset: 0,
                    color: '#003BC9' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#02C5C8' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#7fbbf1' // 0%处的颜色
                  },
                  {
                    offset: 1,
                    color: '#05204c' // 100%处的颜色
                  }
                ],
                globalCoord: false
              }
            }
          }
        ],
        textStyle: {
          color: '#98d7ff'
        }
      },
      chart6: {
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top: '16%',
          containLabel: true
        },
        legend: {
          data: ['1', '2', '3'],
          right: 10,
          top: 12,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 10
          // itemGap: 35
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
            // interval: 0,
            // rotate: 40,
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
        series: [
          {
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
          }
        ]
      },
      chart7: {
        backgroundColor: '#0f375f',
        title: {
          text: '图标title',
          top: '5%',
          left: 'center',
          textStyle: {
            color: '#FFF',
            align: 'center'
          }
        },
        grid: {
          left: '9%',
          right: '10%',
          top: '20%',
          bottom: '15%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
        legend: {
          show: false,
          x: 'center',
          top: '12%',
          y: '35',
          icon: 'stack',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#1bb4f6'
          },
          data: ['大户', '市中', '历下', '天桥']
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
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#195384'
            }
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
          type: 'value',
          name: '立方米',
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
            show: false
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
          name: '占比',
          min: 0,
          max: 1000,
          axisLabel: {
            formatter: '{value} %',
            textStyle: {
              color: '#2ad1d2'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#2ad1d2'
            }
          },
          axisTick: {
            show: false
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
          name: '大户',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#0092f6',
              lineStyle: {
                color: '#0092f6',
                width: 1
              },
              areaStyle: {
                // color: '#94C9EC'
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
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 260, 280]
        },
        {
          name: '市中',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#00d4c7',
              lineStyle: {
                color: '#00d4c7',
                width: 1
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,44,90,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(0,212,199,0.9)'
                }])
              }
            }
          },
          data: [220, 182, 191, 210, 230, 270, 270, 201, 154, 140, 240, 250]
        },
        {
          name: '历下',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#aecb56',
              lineStyle: {
                color: '#aecb56',
                width: 1
              },
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,44,90,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(114,144,89,0.9)'
                }])
              }
            }
          },
          data: [150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        },
        {
          name: '天桥',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#3A44FB',
              lineStyle: {
                color: '#3A44FB',
                width: 1
              },
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,46,101,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(0,166,246,0.9)'
                }])
              }
            }
          },
          data: [150, 232, 201, 154, 190, 180, 210, 150, 182, 201, 154, 190]
        }
        ]
      }
    }
  },
  mounted() {
    this.pieAnimate()
  },
  methods: {
    /* 饼图的动态效果 */
    pieAnimate() {
      const that = this
      let currentIndex = -1
      const myPie = that.$refs.myPie
      this.setInterval = setInterval(function() {
        setTimeout(function() {
          const dataLen = that.pieData.length
          // 取消之前高亮的图形
          myPie.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: currentIndex
          })
          currentIndex = (currentIndex + 1) % dataLen
          // 高亮当前图形
          myPie.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
          })
          // // 显示 tooltip
          myPie.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex
          })
          if (that.$refs['pie-legend']) {
            that.$refs['pie-legend'][currentIndex].focus()
          }
        }, 200)
      }, 2000)

      const app = {
        currentIndex: -1
      }

      const myChartLine6 = that.$refs.myChartLine6
      setInterval(function() {
        const dataLen = that.chart6.series[0].data.length
        // 取消之前高亮的图形
        myChartLine6.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        app.currentIndex = (app.currentIndex + 1) % dataLen
        // console.log(app.currentIndex);
        // 高亮当前图形
        myChartLine6.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        // 显示 tooltip
        myChartLine6.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
      }, 2000)
    },
    connectPie(index) {
      this.$refs.myPie.dispatchAction({
        // 高亮当前图形
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index
      })
      this.$refs.myPie.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: index
      })

      if (this.setInterval) {
        clearInterval(this.setInterval)
      }
    },
    loseConnect(index) {
      this.$refs.myPie.dispatchAction({
        // 取消之前高亮的图形
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: index
      })
      this.$refs.myPie.dispatchAction({
        type: 'hideTip',
        seriesIndex: 0,
        dataIndex: index
      })

      this.pieAnimate()
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-setting {
  margin: 6px 0;
}
.flex-box {
  display: flex;
}
.el-tag {
  cursor: pointer;
  margin: 0 4px;
}
.el-card {
  display: inline-block;
  margin:  0 4px;
}

.WCubeChartList {
  ::v-deep {
    .el-card__header {
      padding: 10px;
    }
    .el-card__body {
      padding: 10px;
      // .echarts {
      //   width: 100%;
      //   height: 220px;
      // }
    }
  }
}

.pie-legend {
  margin-bottom: 10px;
  height: 34px;
  line-height: 34px;
  border: 1px solid #153b7c;
  color: #b2e1ff;
  text-indent: 5px;
  background-size: 100% 100%;
  cursor: pointer;
  text-align: left;
}

.pie-legend:hover {
  background: rgba(33, 100, 175, 0.8);
}

.pie-legend i {
  display: inline-block;
  width: 6px;
  height: 12px;
  margin-right: 10px;
}

.pie-legend span:last-child {
  display: inline-block;
  font-size: 20px;
  color: #2cffe4;
  font-weight: bold;
  margin-right: 10px;
}

</style>
