<template>
  <div>
    <CubeTableList :config="config" :extra-param="extraParam" @expandChange="expandChange">
      <template slot="expand">
        <CubeTableList :config="config2" :extra-param="extraParam" @expandChange="expandChange2">
          <template slot="expand">
            <CubeTableList :config="config3" :extra-param="extraParam3" />
          </template>
        </CubeTableList>
      </template>
    </CubeTableList>
  </div>
</template>

<script>

export default {
  name: 'TableLoadMore',
  data() {
    return {
      type: 1,
      extraParam: {
        objType: 2, fenceType: 2, searchType: 2
      },
      extraParam3: {
        sectionId: '', beginDate: '', endDate: ''
      },
      config: {
        url: 'http://221.10.126.230:5002/fenceAlarmSetting/getFenceAlarmRecordSearch',
        search: {
          data: [
            [
              {
                type: 'option', value: null, key: 'sectionId', placeholder: '请选择标段', class: 'w180', options: []
              },
              { type: 'multiple-date', value: [], key1: 'beginDate', key2: 'endDate', placeholder1: '开始日期', placeholder2: '结束日期' },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', icon: 'el-icon-folder-opened', name: '导出' }
            ]
          ]
        },
        table: {
          tableExpand: true,
          tableHeight: 400,
          calcTableHeight: true,
          loadType: 'list',
          listKey: 'fenceAlarmId',
          prefixHeight: 0,
          columns: [
            {
              label: '展开',
              type: 'expand'
            },
            {
              label: '序号',
              type: 'index'
            },
            {
              label: '所属标段',
              key: 'sectionName'
            },
            {
              label: '所属公司',
              key: 'companyName'
            },
            {
              label: '主管单位',
              key: 'manageDeptName'
            },
            {
              label: '报警次数',
              key: 'alarmCount'
            },
            {
              label: '报警总人次',
              key: 'alarmPerson'
            }
          ]
        },
        pagination: {
          pageSizes: [50, 70, 100], // 默认分页可选择的每页显示的页数
          size: 10, // 分页每页默认显示50条
          currentPage: 1, // 当前默认第一页
          total: 0 // 总条数
        }
      },
      config2: {
        url: 'http://221.10.126.230:5002/alarmPersonAttendanceList/getAlarmSimilarTracePersonGpsDayList',
        search: {
          data: []
        },
        table: {
          calcTableHeight: true,
          loadType: 'list',
          columns: [
            {
              label: '展开',
              type: 'expand'
            },

            {
              label: '日期',
              key: 'workDate'
            },
            {
              label: '报警次数',
              key: 'alarmCount'
            },
            {
              label: '报警人员数',
              key: 'alarmPersonCount',
              render: (h, parmas) => {
                const { row } = parmas;
                return (
                  <a class='linkText' onClick={(e) => {
                    e.stopPropagation();
                  }}> {row.alarmPersonCount} </a>);
              }
            },
            {
              label: '报警总人次', // 表格表头名字
              key: 'alarmPerson' // 数据映射key
            }
          ]
        }
      },
      config3: {
        url: 'http://221.10.126.230:5002/alarmPersonAttendanceList/getAlarmSimilarTracePersonGpsDayLsList',
        search: {
          data: []
        },
        table: {
          tableHeight: 150,
          tableExpand: false,
          calcTableHeight: false,
          columns: [
            {
              label: '通轨迹设备数量',
              key: 'similarCount'
            },
            {
              label: '通轨迹人员',
              key: 'similarPerson'
            },
            {
              label: '累计时长',
              key: 'totalTime'
            },
            {
              label: '操作',
              render: (h, parmas) => {
                return (
                  <a class='linkText' onClick={(e) => {
                    e.stopPropagation();
                  }}> 查看详情 </a>);
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    expandChange(row, expandedRows) {
      if (expandedRows.length) {
        this.extraParam.sectionId = row.sectionId;
        this.extraParam.beginDate = row.beginDate;
        this.extraParam.endDate = row.endDate;
      } else {
        this.extraParam.sectionId = '';
        this.extraParam.beginDate = '';
        this.extraParam.endDate = '';
      }
    },
    expandChange2(row, expandedRows) {
      if (expandedRows.length) {
        this.extraParam3.sectionId = row.sectionId;
        this.extraParam3.beginDate = row.workDate;
        this.extraParam3.endDate = row.workDate;
      } else {
        this.extraParam3.sectionId = '';
        this.extraParam3.beginDate = '';
        this.extraParam3.endDate = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
