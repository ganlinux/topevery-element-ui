<!--
 * @Author: shiliangL
 * @Date: 2020-06-05 09:48:22
 * @LastEditTime: 2020-09-23 09:13:58
 * @LastEditors: Do not edit
 * @Description: 
 * @FilePath: /topevery-element-ui-v2/examples/play/views/CubeCascade.vue
--> 
<template>
  <div>
    <!-- <cube-select-cascade v-model="selectCascade" @config="config" /> -->
    <cube-Table-List
      ref="CubeTableList"
      class="page"
      :config="config2"
    />
  </div>
</template>

<script>
const baseURL = '';
export default {
  data() {
    return {
      config2: {
        method: 'POST',
        url: baseURL + '/car/getList',
        search: {
          data: [
            [
              {
                value: null,
                type: 'input',
                key: 'carNo',
                placeholder: '车牌号'
              },
              {
                type: 'daterange',
                value: null,
                initValue: [
                  '2020-09-23',
                  '2020-09-23'
                ],
                key1: 'beginDate',
                key2: 'endDate',
                placeholder1: '开始日期',
                placeholder2: '结束日期'
              },
              {
                value: null,
                type: 'date',
                key: 'carNo',
                placeholder: '时间',
                pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() + (1000 * 60 * 60 * 24) > Date.now() ;
                  }
                }
              },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
            ],
            [
              // todo ②只有项目组账号有新增数据的权限所以默认没有新增操作
              // { type: 'add', name: '新增', action: () => this.add() },
              { type: 'del', name: '删除', action: () => this.del() },
              {
                type: 'more', options: [
                  { icon: 'el-icon-folder-opened', label: '导出', action: () => this.export() },
                  // { icon: 'el-icon-folder', label: '导入', action: () => this.importExcel() },
                  { icon: 'el-icon-minus', label: '停用', action: () => this.deactivate() }
                ]
              }

            ]
          ]
        },
        table: {
          calcTableHeight: true, // 是否开启表格自动高度计算
          columns: [
            {
              label: '选择', // 表格表头名字
              type: 'selection' // type 一般不需要 仅仅  selection 、 index
            },
            { label: '序号', type: 'index' },
            {
              label: '车牌号',
              key: 'no',
              render: (h, parmas) => {
                const { row } = parmas;
                return (
                  <a class='linkText' onClick={(e) => {
                    e.stopPropagation();
                    return this.getCarInfo(row.carId);
                  }}> {row.no} </a>);
              }
            },
            {
              key: 'deviceCode',
              label: '车载设备编号'
            },
            {
              key: 'carTypeDesc',
              label: '车辆类型'
            },
            {
              key: 'powerTypeDesc',
              label: '动力类型'
            },
            {
              key: 'brand',
              label: '车辆品牌'
            },
            {
              key: 'drivingLicenseRegisterDate',
              label: '行驶证注册日期'
            },
            {
              key: 'vehicleTare',
              label: '核定总质量（kg）',
              width: 125
            },
            {
              key: 'streetName',
              label: '街道'
            },
            { key: 'districtName', label: '辖区' },
            {
              key: 'ownerType',
              label: '权属类型',
              render: (h, parmas) => {
                const { row } = parmas;
                return <span> {row.ownerType === 0 ? '自有' : '租赁'} </span>;
              }
            },
            {
              key: 'workState',
              label: '工作状态',
              render: (h, parmas) => {
                const { row } = parmas;
                return <span> {row.workState === 0 ? '正常' : '停用'} </span>;
              }
            },
            {
              label: '操作',
              width: 80,
              render: (h, parmas) => {
                const { row } = parmas;
                return (
                  <div class='flex-table-cell'>
                    <div class='btn-text' onClick={() => this.editCar(row.carId)}>
                      <i class='el-icon-edit-outline' /> 编辑
                    </div>
                  </div>);
              }
            }
          ]
        }
      },
      selectCascade: [],
      config: {
        parentConfig: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '企业选择',
          inputWidth: '180px',
          isNoPage: false, // 设置不分页
          method: 'get', // 请求方法
          url: '/static/section.json',
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'statusStr', label: '状态' }
          ]
        },
        childrenConfig: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '司机选择',
          inputWidth: '180px',
          isNoPage: false, // 设置不分页
          relativeKey: 'companyId', // 关联依赖加载id -关键key 级联关系
          method: 'get', // 请求方法
          url: '/static/section.json',
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'statusStr', label: '状态' }
          ]
        }
      }
    };
  },
  mounted() {
    // 假如是编辑 则需要手动处理一下参数
    setTimeout(_ => {
      this.selectCascade = [
        { label: '父级联', value: '132123123' },
        { label: '子级联', value: '132123123' }
      ];
    }, 2000);
  }
};
</script>

<style lang="scss" scoped>
</style>