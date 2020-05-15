<template>
  <div>
    <CubeTableList :config="config" />
  </div>
</template>

<script>

import tree from '../../assets/mock/tree.json';
import company from '../../assets/mock/company.json';

export default {
  name: 'CubeTableListPage',
  data() {
    return {
      config: {
        url: '/alarmPersonAttendanceList/getAlarmSimilarTracePersonGpsList',
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
                  method: 'GET',
                  isStaticOptions: true,
                  options: [],
                  url: '/static/tree.json',
                  focusOnload: false, // 获取焦点就加载
                  placeholder: 'cubeSelectTree',
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
                  keyCode: 'companyId',
                  method: 'GET',
                  url: '/static/page.json',
                  searchName: 'sectionName',
                  isStaticOptions: true,
                  options: company.data || [],
                  isNoPage: true, // 是否是列表无分页数据
                  focusOnload: false, // 获取焦点就加载
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
                  url: '/static/company.json',
                  searchName: 'sectionName',
                  focusOnload: false, // 获取焦点就加载
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
                  options: tree.data,
                  isStaticOptions: false,
                  url: '/static/tree.json',
                  placeholder: '公司名称-级联选择-tree'
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
            ]
          ]
        },
        table: {
          tableExpand: true,
          tableHeight: 400,
          calcTableHeight: true,
          loadType: 'scroll',
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
        }
      }
    };
  },
  mounted() {
    setTimeout(_=>{
      this.config.search.data[0][0].config.options = tree.data;
    }, 2000);
  },
  methods: {

  }
};
</script>
