    <!-- CubeTable  组件 - 表格 -->
<template>
  <el-table
    slot="table"
    :ref="name"
    v-loadMore="loadMore"
    border
    style="width: 100%;"
    :data="rebuildData"
    :height="height?height:'auto'"
    highlight-current-row
    element-loading-text="数据加载中..."
    :row-style="rowStyle"
    :header-cell-style="headerCellStyle"
    @row-click="rowClick"
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
          >
            <template
              v-if="column.type==='index'"
              slot-scope="scope"
            >
              <template v-if="column.type==='index'">
                {{ scope.$index+1 }}
                <!-- <span>{{ scope.$index+(pagination.currentPage-1) *pagination.size + 1 }}</span> -->
              </template>
            </template>
          </el-table-column>
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

      <template v-else>
        <el-table-column
          :key="column._rowKey ? column._rowKey : index"
          :align="column.align ? column.align : 'center' "
          :label="column.label"
          :prop="column.key"
          :width="column.label ==='操作' ? 140: column.width"
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
    height: {
      type: [Number, String],
      default: () => 0
    },
    rowStyle: {
      type: Function,
      default: () => {
        return { cursor: 'pointer' }
      }
    },
    headerCellStyle: {
      type: Function,
      default: () => {
        // return { background: 'gainsboro' }
      }
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
      handler() {
        setTimeout(() => {
          const { data } = this
          this.rebuildData = data.map(item => {
            // item._rowKey = this.getRandomID()
            return item
          })
        }, 0)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getRandomID(length = 36) {
      return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
    },
    loadMore() {
      console.log('滚动到底部')
    },
    rowClick() {
      this.$emit('rowClick')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
