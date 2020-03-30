<template>
  <div>
    <Md />
    <!-- <Notice-Bar v-if="false" class="notice"> 前端必学必会-多媒体-本地存储-浏览器与服务器的交互-通信功能 </Notice-Bar> -->
    <CubeTableList v-if="false" ref="CubeTableList" :config="config" />
  </div>
</template>

<script>

import Md from '~packages/CubeTableList/index.md'

export default {
  name: 'CubeTableListX',
  title: 'CubeTableList业务列表',
  components: {
    Md
  },
  data() {
    return {
      config: {
        method: 'POST',
        url: 'person/getPersonListPage',
        search: {
          data: [
            [
              { type: 'input', value: null, key: 'carName', placeholder: '车牌号', class: 'w160' },
              { type: 'cascader', value: null, key: 'carType', placeholder: '车辆类型', options: [] },
              { type: 'option', value: null, key: 'powerType', placeholder: '动力类型', options: [] },
              { type: 'option', value: null, key: 'insuredState', placeholder: '参保状态', options: [
                { value: '1', label: '未到期' }, { value: '2', label: '已到期' }, { value: '3', label: '未参保' }
              ]
              },
              { type: 'option', value: null, key: 'annualInspectionState', placeholder: '年检状态', options: [
                { value: '2', label: '已到期' }, { value: '1', label: '未到期' }, { value: '3', label: '离年检九十天以上' }, { value: '4', label: '离年检不足九十天' }
              ]
              },
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '添加', keyType: 'success', icon: 'el-icon-plus', action: () => this.addform('新增数据') },
              { type: 'button', name: '删除', keyType: 'danger', icon: 'el-icon-close', action: () => this.addform('删除数据') },
              { type: 'button', name: '导出', keyType: 'primary', icon: 'el-icon-upload2', action: () => this.addform('导出数据') }
            ]
          ]
        },
        table: {
          tableHeight: 500, // 如果关闭自动开启计算高度 - 这个字段建议传入。
          calcTableHeight: true, // 是否开启表格自动高度计算 - 开启则忽略tableHeight设置的高度
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
              label: '姓名',
              key: 'personName',
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  <a class='linkText' onClick={(e) => {
                    e.stopPropagation()
                  }}> {row.personName}
                  </a>)
              }
            },
            {
              key: 'personTypeDesc',
              label: '人员类型'
            },
            {
              key: 'workState',
              label: '状态',
              render: (h, parmas) => {
                const typeMap = {
                  0: '在职',
                  1: '离职'
                }
                const { row } = parmas
                return <span> {typeMap[row.workState]} </span>
              }
            },
            {
              label: '操作',
              key: '',
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  <div class='flex-box-table-row'>
                    <div class='btn-text' onClick={(e) => {
                      e.stopPropagation()
                      return this.handlerType(row, 0)
                    }}>
                      <i class='el-icon-edit-outline ac'> </i>
                      编辑
                    </div>
                    <div class='delete-text ac' onClick={(e) => {
                      e.stopPropagation()
                      return this.handlerType(row, 1)
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
      }
    }
  },
  methods: {
    handlerType(type) {
      const msg = type ? '删除数据' : '编辑数据'
      this.$message({ message: msg, type: 'info' })
    },
    addform(meg) {
      this.$message({ message: meg, type: 'info' })
      console.log(this.$refs['CubeTableList'].getTableSelection())
    }
  }
}
</script>

<style lang="scss">
.notice {
  margin: 10px 0;
}
</style>
