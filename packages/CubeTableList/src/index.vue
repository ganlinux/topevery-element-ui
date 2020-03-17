<template>
  <div class="CubeTableList">
    <SearchBar
      ref="SearchBar"
      :data="config.search.data"
    />
    <!-- 插入表头插槽-->
    <div>
      <slot
        name="topBar"
      />
    </div>
    <MaxHeight
      v-if="calcTableHeight"
      v-model="height"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(242, 248, 254, 0.9)"
    >
      <CubeTable
        ref="CubeTable"
        class="CubeTable"
        :data="tableData"
        :columns="config.table.columns"
        :height="initConfig.table.calcTableHeight ? height-prefixHeight : tableHeight"
      />
      <el-pagination
        style="text-align: center;margin-top: 4px;"
        background
        :current-page="pagination.page"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </MaxHeight>

  </div>
</template>

<script>

import SearchBar from '../../SearchBar/src'
import CubeTable from '../../CubeTable/src'
import MaxHeight from '../../MaxHeight/src'

export default {
  name: 'CubeTableList',
  components: {
    SearchBar,
    CubeTable,
    MaxHeight
  },

  props: {
    prefixHeight: {
      type: Number,
      default: 44
    },
    calcTableHeight: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      height: 0,
      loading: false,
      tableData: [
        {
          'name': 'Don Schoen Jr.',
          'email': 'Buck_Aufderhar13@gmail.com',
          'text': 'exercitationem autem omnis',
          'results': 45
        },
        {
          'name': 'Don Schoen Jr.',
          'email': 'Buck_Aufderhar13@gmail.com',
          'text': 'exercitationem autem omnis',
          'results': 45
        },
        {
          'name': 'Don Schoen Jr.',
          'email': 'Buck_Aufderhar13@gmail.com',
          'text': 'exercitationem autem omnis',
          'results': 45
        },
        {
          'name': 'Don Schoen Jr.',
          'email': 'Buck_Aufderhar13@gmail.com',
          'text': 'exercitationem autem omnis',
          'results': 45
        },
        {
          'name': 'Don Schoen Jr.',
          'email': 'Buck_Aufderhar13@gmail.com',
          'text': 'exercitationem autem omnis',
          'results': 45
        },
        {
          'name': 'Don Schoen Jr.',
          'email': 'Buck_Aufderhar13@gmail.com',
          'text': 'exercitationem autem omnis',
          'results': 45
        },
        {
          'name': 'Don Schoen Jr.',
          'email': 'Buck_Aufderhar13@gmail.com',
          'text': 'exercitationem autem omnis',
          'results': 45
        }
      ],
      initConfig: {
        search: {
          data: []
        },
        table: {
          tableHeight: 250, // 设置表格高度
          calcTableHeight: true, // 是否开启表格自动高度计算
          columns: []
        }
      },
      config: {
        search: {
          data: [
            [
              { type: 'input', value: null, key: 'carName', placeholder: '车牌号', class: 'w160' },
              { type: 'cascader', value: null, key: 'carType', placeholder: '车辆类型', options: [] },
              { type: 'option', value: null, key: 'powerType', placeholder: '动力类型', options: [] },
              { type: 'option', value: null, key: 'insuredState', placeholder: '参保状态', options: [
                { value: '1', label: '未到期' },
                { value: '2', label: '已到期' },
                { value: '3', label: '未参保' }
              ]
              },
              { type: 'option', value: null, key: 'annualInspectionState', placeholder: '年检状态', options: [
                { value: '2', label: '已到期' },
                { value: '1', label: '未到期' },
                { value: '3', label: '离年检九十天以上' },
                { value: '4', label: '离年检不足九十天' }
              ]
              },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '添加', keyType: 'success' },
              { type: 'button', name: '删除', keyType: 'danger', icon: 'el-icon-close' },
              { type: 'button', name: '导出', keyType: 'primary', icon: 'el-icon-upload2' },
              { type: 'button', name: '导入', keyType: 'primary', icon: 'el-icon-download' }
            ]
          ]
        },
        table: {
          tableHeight: 250,
          calcTableHeight: true, // 是否开启表格自动高度计算
          columns: [
            {
              label: '序号', // 表格表头名字
              type: 'selection' // type 一般不需要 仅仅  selection 、 index
            },
            {
              label: '序号', // 表格表头名字
              type: 'index' // type 一般不需要 仅仅  selection 、 index
            },
            {
              label: '车牌号',
              key: 'no'
            },
            {
              label: '车载设备号',
              key: 'deviceCode'
            },
            {
              label: '车辆类型',
              key: 'carTypeDesc'
            },
            {
              label: '动力类型',
              key: 'powerTypeDesc'
            },
            {
              label: '权属类型',
              key: 'ownType',
              render: (h, parmas) => {
                const typeMap = {
                  0: '自有',
                  1: '租赁'
                }
                const { row } = parmas
                return <span> {typeMap[row.ownType]} </span>
              }
            },
            {
              label: '所属企业',
              key: 'companyName'
            },
            {
              label: '所属标段',
              key: 'sectionName'
            },
            {
              label: '参保期限',
              key: 'businessExamineDate'
            },
            {
              label: '年检到期时间',
              key: 'yearExamineDate'
            },
            {
              label: '工作状态',
              key: 'state',
              render: (h, parmas) => {
                const typeMap = {
                  0: '正常',
                  1: '报废'
                }
                const { row } = parmas
                return <span> {typeMap[row.state]} </span>
              }
            },
            {
              label: '操作',
              width: 180,
              render: (h, parmas) => {
                // const { row } = parmas
                return (
                  <div class='flex-table-cell-row'>
                    <div class='btn-text' onClick={() => this.handler('编辑')}>
                      <i class='el-icon-edit-outline' /> 编辑
                    </div>
                    <div class='btn-text' onClick={() => this.handler('查看')}>
                      <i class='el-icon-view' /> 查看
                    </div>
                    <div class='btn-text delete-text' onClick={() => this.handler('删除')}>
                      <i class='el-icon-delete' /> 删除
                    </div>
                  </div>
                )
              }
            }
          ]
        }
      },
      pagination: {
        pageSizes: [10, 20, 50, 100], // 默认分页可选择的每页显示的页数
        size: 50, // 分页每页默认显示50条
        currentPage: 1, // 当前默认第一页
        total: 0 // 总条数
      }
    }
  },
  methods: {
    handler() {

    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      // this.fetchList()
    },
    handleCurrentChange(value) {
      this.pagination.currentPage = value
      // this.fetchList()
    }
  }
}
</script>

<style lang="scss">
.CubeTableList {
  .el-table >>> .flex-table-cell-row {
    font-weight: 500;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
    .btn-text {
      font-size: 12px;
      color: #409eff;
      &:active {
        background-color: transparent;
      }
    }
    .delete-text {
      color: #f56c6c;
      &:active {
        background-color: transparent;
      }
    }
  }
}
</style>
