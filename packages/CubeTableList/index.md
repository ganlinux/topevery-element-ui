## CubeTableList 列表组件

配置方式完成业务列表的开发

### 基本用法

顶部搜索组件 + 表格组件组合、配置方式完成业务列表的开发,请查询代码说明。

:::demo 配置方式完成业务列表的开发
```html
  <template>
    <Cube-TableList ref="CubeTableList" :config="config" />
  </template>

  <script>
    export default {
        data() {
            return {
                config:{
                method: 'POST',
                url: 'person/getPersonListPage',
                search:{ 
                    data: [
                        [
                            { type: 'input', value: null, key: 'personName', placeholder: '人员名称' },
                            { type: 'cascader', value: null, key: 'carType', placeholder: '车辆类型', options: [] },
                            { type: 'option', value: null, key: 'powerType', placeholder: '动力类型', options: [] },
                            { type: 'option', value: null, key: 'insuredState', placeholder: '参保状态', options: [
                                { value: '1', label: '未到期' },
                                { value: '2', label: '已到期' }, 
                                { value: '3', label: '未参保'}
                                ]
                            },
                            { type: 'option', value: null, key: 'annualInspectionState', placeholder: '年检状态', options: [
                                { value: '2', label: '已到期' }, 
                                { value: '1', label: '未到期' }, 
                                { value: '3', label: '离年检九十天以上'}, 
                                {value: '4', label: '离年检不足九十天' }]
                            },
                            { type: 'search', name: '查询', icon: 'el-icon-search' },
                            { type: 'reset', name: '重置' }
                        ],
                        [
                            { type: 'button', name: '添加', keyType: 'success', icon: 'el-icon-plus', action: () => this.handlerClick('新增数据') },
                            { type: 'button', name: '删除', keyType: 'danger', icon: 'el-icon-close', action: () => this.handlerClick('删除数据')},
                            { type: 'button', name: '导出', keyType: 'primary', icon: 'el-icon-upload2', action: () => this.handlerClick('导出数据')}
                        ]
                    ]
                },
                table:{
                    tableHeight: 200, // 如果关闭自动开启计算高度 - 这个字段建议传入。
                    calcTableHeight: false, // 是否开启表格自动高度计算 - 开启则忽略
                    columns:[
                        { label: '选择', type: 'selection' },
                        { label: '序号', type: 'index' },
                        { label: '姓名', key: 'personName' },
                        { key: 'personTypeDesc',label: '人员类型'},
                        { 
                            label: '操作',
                            render: (h, parmas) => {
                                const { row } = parmas
                                return (
                                    <div class='flex-box-table-row'>
                                    <div class='btn-text' onClick={(e) => {
                                        e.stopPropagation()
                                        return this.handlerType(row, 1)
                                    }}>
                                        <i class='el-icon-edit-outline ac'> </i>
                                        编辑
                                    </div>
                                    <div class='delete-text ac' onClick={(e) => {
                                        e.stopPropagation()
                                        return this.handlerType(row, 0)
                                    }}>
                                        <i class='el-icon-document-delete ac'> </i>
                                        删除
                                    </div>
                                    </div>
                                )
                            }
                        }
                    ]
                }
            },
        }
      },
      methods: {
        handlerType(row,type) {
        const types = type ? 'success' : 'warning'
        const mes = type ? '编辑' : '删除'
         this.$message({message: mes, type: types })
       },
        handlerClick(mes) {
          this.$message({ message: mes, type: 'success' })
       }
     }
    }
  </script>
```
:::
