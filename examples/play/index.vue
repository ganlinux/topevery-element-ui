<template>
  <div>
      <!-- v-if="false" -->
    <CubeTableList
      :config="config"
      :extra-param="extraParam"
    />

    <CubeChart
      autoresize
      theme="cube-blue"
      :options="chartConfig"
    />

  </div>
</template>

<script>

export default {
  name: 'CubeTableListPage',
  data() {
    return {
      dialogVisible: false,
      extraParam: {
        objType: 2, fenceType: 1, searchType: 2
      },
      config: {
        url: 'http://hw-topevery-dev-ui:49526/fenceAlarmSetting/getFenceAlarmRecordSearch',
        search: {
          data: [
            [
              {
                type: 'cubeSelectTree',
                value: null,
                key: 'sectionId',
                config: {
                  keyName: 'label',
                  keyCode: 'value',
                  url: '/map/getSectionTree',
                  focusOnload: false, // 仅仅加载一次
                  placeholder: '请选择标段-树形选择',
                  treeDefaultProps: {
                    children: 'children',
                    label: 'label'
                  }
                }
              },
              {
                type: 'cubeSelect',
                value: null,
                key: 'sectionId',
                config: {
                  keyName: 'name',
                  keyCode: 'sectionId',
                  url: '/section/search',
                  searchName: 'sectionName',
                  focusOnload: false, // 仅仅加载一次
                  placeholder: '请选择公司-页分',
                  column: [
                    { key: 'name', label: '名称' },
                    { key: 'code', label: '编码' }
                  ]
                }
              },
              {
                type: 'cubeSelect',
                value: null,
                key: 'sectionId',
                config: {
                  keyName: 'name',
                  keyCode: 'companyId',
                  method: 'GET',
                  url: '/contract/getCompanyList',
                  searchName: 'sectionName',
                  focusOnload: true, // 仅仅加载一次
                  isNoPage: true, // 是否是列表无分页数据
                  placeholder: '请选择公司-无分页分',
                  column: [
                    { key: 'name', label: '名称', align: 'left' }
                  ]
                }
              },
              {
                type: 'cubeCascader',
                value: null,
                key: 'companyId',
                extraParam: {
                  treeId: 'aed26b5a-00e8-4c87-99a5-3345582239f9'
                },
                config: {
                  keyCode: 'value', // 指定选项的值为选项对象的某个属性值
                  keyName: 'label', // 指定选项标签为选项对象的某个属性值
                  children: 'children', // 指定选项的子选项为选项对象的某个属性
                  method: 'GET',
                  url: '/customDept/tree',
                  placeholder: '公司名称-级联选择'
                }
              },
              {
                type: 'multiple-date',
                value: [],
                key1: 'alarmBeginTime',
                key2: 'alarmEndTime',
                placeholder1: '开始日期',
                placeholder2: '结束日期',
                initValue: []
              },
              {
                type: 'option', value: null, key: 'alarmType', placeholder: '报警类型', class: 'w130', options: []
              },
              {
                type: 'option', value: null, key: 'alarmResult', placeholder: '报警结果', class: 'w130', options: [
                  { label: '已取消', value: 1 },
                  { label: '已确认', value: 2 }]
              },
              {
                type: 'input',
                value: null,
                key: 'objName',
                placeholder: '车牌号码',
                class: 'w130'
              },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'add', name: '新增', action: () => this.add() },
              { type: 'button', btType: 'danger', icon: 'el-icon-delete', name: '作废' },
              {
                type: 'more', options: [
                  { icon: 'el-icon-paperclip', label: '批量禁用' },
                  { icon: 'el-icon-document-remove', label: '批量启用' }
                ]
              }
            ]
          ]
        },
        table: {
          tableHeight: 250,
          calcTableHeight: true, // 是否开启表格自动高度计算
          columns: [
            {
              label: '选择',
              type: 'selection'
            },
            {
              label: '序号',
              type: 'index'
            },
            {
              label: '围栏',
              key: 'fenceName'
            },
            {
              label: '标段',
              key: 'sectionName'
            },
            {
              label: '公司',
              key: 'companyName'
            },
            {
              label: '车牌号码',
              key: 'objName'
            },
            {
              label: '报警类型',
              key: 'fenceAlarmTypeName'
            },
            {
              label: '报警开始时间',
              key: 'alarmBeginTime'
            },
            {
              label: '报警结束时间',
              key: 'alarmEndTime'
            },
            {
              label: '持续时间',
              key: 'alarmTimeStr'
            },
            {
              label: '状态',
              key: 'alarmResult'
            },
            {
              label: '操作',
              key: 'drawNum',
              render: (h, parmas) => {
                const { row } = parmas;
                return (
                  <div class='flex-table-cell'>
                    <div class='btn-text' onClick={() => this.handlerType(0, row)}>轨迹</div>
                    <div class='btn-text' onClick={() => this.handlerType(1, row)}>通讯</div>
                    {!row.isAppeal ? <div class='btn-text' onClick={() => this.checkProcess(row)}>流程</div> : null}
                  </div>
                );
              }
            }
          ]
        }
      },
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
  },
  mounted() {
    setTimeout(() => {
      this.extraParam.fenceType = 2;
    }, 4000);
  },
  methods: {
    add() {
      this.dialogVisible = true;
    }
  }
};
</script>
