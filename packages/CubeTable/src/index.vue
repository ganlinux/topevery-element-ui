<!-- CubeTable  组件 - 表格 -->
<template>
  <el-table
    slot="table"
    :ref="name"
    v-loadMore="loadMore"
    v-loading="loading"
    class="cube-table"
    :border="border"
    style="width: 100%;"
    :data="rebuildData"
    :height="height"
    :stripe="stripe"
    :size="size"
    :max-height="maxHeight"
    :highlight-current-row="highlightCurrentRow"
    element-loading-text="数据加载中..."
    :row-style="rowStyle"
    :header-cell-style="headerCellStyle"
    :row-class-name="rowClassName"
    :cell-class-name="cellClassName"
    @row-click="tableRowClick"
    @expand-change="expandChange"
  >
    <template v-for="(column, index) in columns">
      <!-- 处理 selection 、 index  、 expand 特殊项 -->
      <template v-if="column.type">
        <!-- expand -->
        <template v-if="column.type==='expand'">
          <el-table-column
            v-if="column.type"
            :key="column._rowKey ? column._rowKey : index"
            :align="column.align ? column.align : 'center' "
            :label="column.type === 'index' ? column.label : '' "
            :type="column.type"
            :fixed="column.fixed"
            :width="column.width ? column.width : null "
          >
            <template
              v-if="column.type==='expand'"
              slot-scope="props"
            >
              <template v-if="column.type==='expand'">
                <slot
                  :item="props.row"
                  name="expand"
                />
              </template>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="column.type==='index'">
          <!-- index -->
          <el-table-column
            v-if="column.type"
            :key="column._rowKey ? column._rowKey : index"
            :align="column.align ? column.align : 'center' "
            :label="column.type === 'index' ? column.label : '' "
            :type="column.type"
            :fixed="column.fixed"
            :width="column.width ? column.width : 50 "
            :index="indexMethod"
          />
        </template>
        <template v-else>
          <!-- selection -->
          <el-table-column
            v-if="column.type"
            :key="column._rowKey ? column._rowKey : index"
            :align="column.align ? column.align : 'center' "
            :label="column.type === 'index' ? column.label : '' "
            :type="column.type"
            :fixed="column.fixed"
            :width="column.width ? column.width : 50 "
          />

        </template>
      </template>
      <!-- 常规 -->
      <template v-else>
        <el-table-column
          :key="column._rowKey ? column._rowKey : index"
          :align="column.align ? column.align : 'center' "
          :label="column.label"
          :prop="column.key"
          :width="column.label ==='操作' ? column.width ? column.width : 140: 'auto'"
          :fixed="column.fixed"
          tooltip-effec="light"
          :show-overflow-tooltip="!column.tooltip"
          v-bind="column.attributes"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template>
                <span>{{ scope.row[column.key] }}</span>
              </template>
            </template>
            <template v-else>
              <render
                :column="column"
                :index="index"
                :render="column.render"
                :row="scope.row"
              />
            </template>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>

<script>

import { deepClone } from '../../uitls'
import { Table, TableColumn } from 'element-ui'

export default {
  name: 'CubeTable',
  directives: {
    loadMore: {
      bind(el, binding) {
        const selectWrap = el.querySelector('.el-table__body-wrapper')
        selectWrap.addEventListener('scroll', function() {
          const sign = 0
          const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
          if (scrollDistance <= sign) {
            binding.value()
          }
        })
      },
      update() { },
      unbind(el, binding) {
        // 解除事件监听
        // const selectWrap = el.querySelector('.el-table__body-wrapper')
        // selectWrap.removeEventListener('scroll', function() {})
      }
    }
  },
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    render: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, opt) => {
        const params = {
          row: opt.props.row,
          index: opt.props.index
        }
        if (opt.props.column) params.column = opt.props.column
        return opt.props.render(h, params)
      }
    }
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    rowKey: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => [
        {
          align: '',
          label: '',
          type: '',
          fixed: '',
          width: ''
        }
      ]
    },
    // eslint-disable-next-line vue/require-default-prop
    height: {
      type: [Number, String]
    },
    rowStyle: {
      type: Function,
      default: () => {
        return { cursor: 'pointer' }
      }
    },
    loadMore: {
      type: Function,
      default: () => {}
    },
    // eslint-disable-next-line vue/require-default-prop
    rowClassName: {
      type: Function
    },
    // eslint-disable-next-line vue/require-default-prop
    cellClassName: {
      type: Function
    },
    indexMethod: {
      type: Function,
      default: (index) => {
        return index + 1
      }
    },
    headerCellStyle: {
      type: Function,
      default: () => {
        return { background: '#EDF5FF' }
      }
    },

    // eslint-disable-next-line vue/require-default-prop
    size: {
      type: String,
      default: () => 'small'
    },

    // eslint-disable-next-line vue/require-default-prop
    width: [String, Number],

    // eslint-disable-next-line vue/require-default-prop
    maxHeight: [String, Number],

    // eslint-disable-next-line vue/require-default-prop
    stripe: Boolean,

    showHeader: {
      type: Boolean,
      default: () => true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: () => true
    },

    // eslint-disable-next-line vue/require-default-prop
    showSummary: Boolean,

    // eslint-disable-next-line vue/require-default-prop
    sumText: String,

    // eslint-disable-next-line vue/require-default-prop
    summaryMethod: Function,

    // eslint-disable-next-line vue/require-default-prop
    cellStyle: [Object, Function],

    // eslint-disable-next-line vue/require-default-prop
    headerRowClassName: [String, Function],

    // eslint-disable-next-line vue/require-default-prop
    headerRowStyle: [Object, Function],

    // eslint-disable-next-line vue/require-default-prop
    headerCellClassName: [String, Function],

    // eslint-disable-next-line vue/require-default-prop
    currentRowKey: [String, Number],

    // eslint-disable-next-line vue/require-default-prop
    emptyText: String,

    // eslint-disable-next-line vue/require-default-prop
    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    // eslint-disable-next-line vue/require-default-prop
    defaultSort: Object,

    // eslint-disable-next-line vue/require-default-prop
    tooltipEffect: String,

    // eslint-disable-next-line vue/require-default-prop
    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: () => true
    }

  },
  data() {
    return {
      name: 'CubeTable',
      rebuildData: []
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler() {
        setTimeout(() => {
          const { data } = this
          this.rebuildData = data.map(item => {
            // item._rowKey = this.getRandomID()
            return item
          })
        }, 0)
      }
    }
  },
  methods: {
    getTableSelection() {
      // 获取表格勾选项目
      const TableSelection = this.$refs[this.name] && this.$refs[this.name].selection || []
      return deepClone(TableSelection)
    },
    expandChange(row, expandedRows) {
      this.$emit('expandChange', row, expandedRows)
    },
    tableRowClick(row) {
      this.$emit('tableRowClick', row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
