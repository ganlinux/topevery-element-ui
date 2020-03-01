```html
<template>
  <div class="CubeTableRender">

    <SearchBar
      v-if="initConfig.search.data.length"
      ref="SearchBar"
      :data="initConfig.search.data"
      @search="fetchTableData"
      @reset="fetchTableData"
      @add="add"
      @del="del"
      @clickBtn="clickBtn"
      @command="command"
    />

    <table-contain
      v-loading="loading"
      :height.sync="maxHeight"
    >
      <el-table
        slot="table"
        :ref="name"
        v-tbaleLoadMore="tbaleLoadMore"
        border
        style="width: 100%;"
        :data="tableData"
        :height="initConfig.table.calcTableHeight ? maxHeight - 22 : initConfig.table.tableHeight "
        highlight-current-row
        element-loading-text="数据加载中..."
        @row-click="clickTableRow"
        @select="selectRow"
        @select-all="selectRow"
        @expand-change="expandChange"
      >
        <template v-for="(column, index) in initConfig.table.columns">
          <!-- 复选框 + 序号 xx -->
          <!-- 处理 selection 、 index  、 expand 特殊项 -->
          <template v-if="column.type">
            <template v-if="column.type==='expand'">
              <el-table-column
                v-if="column.type"
                :key="index"
                :align="column.align ? column.align : 'center' "
                :label="column.type === 'index' ? column.label : '' "
                :type="column.type"
                :fixed="column.fixed"
                :width="column.width ? column.width : null "
              >
                <template v-if="column.type==='expand'" slot-scope="props">
                  <template v-if="column.type==='expand'">
                    <slot :item="props.row" name="expand" />
                  </template>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="column.type==='index'">
              <el-table-column
                v-if="column.type"
                :key="index"
                :align="column.align ? column.align : 'center' "
                :label="column.type === 'index' ? column.label : '' "
                :type="column.type"
                :fixed="column.fixed"
                :width="column.width ? column.width : null "
              >
                <template v-if="column.type==='index'" slot-scope="scope">
                  <template v-if="column.type==='index'">
                    <span>{{ scope.$index+(pagination.currentPage-1) *pagination.size + 1 }}</span>
                  </template>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                v-if="column.type"
                :key="index"
                :align="column.align ? column.align : 'center' "
                :label="column.type === 'index' ? column.label : '' "
                :type="column.type"
                :fixed="column.fixed"
                :width="column.width ? column.width : null "
                :selectable="selectable"
              />

            </template>
          </template>

          <template v-else>
            <el-table-column
              :key="index"
              :align="column.align ? column.align : 'center' "
              :label="column.label"
              :prop="column.key"
              :width="column.width"
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

      <!-- 分页部分 -->
      <el-pagination
        slot="footer"
        :current-page="pagination.page"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!-- <div v-else slot="footer" style="height: 20px;" /> -->
    </table-contain>
  </div>
</template>

<script>

import request from '../../utils/request'
import { SearchBar, TableContain } from '../../components'
import { deepMerge, deepClone } from '../../utils'

export default {
  name: 'CubeTableRender',
  components: {
    SearchBar,
    TableContain,
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
    extraParam: {
      type: Object,
      default: () => { }
    },
    url: {
      type: String,
      required: true,
      default: () => ''
    },
    method: {
      type: String,
      default: () => 'POST'
    },
    config: {
      type: Object,
      default: () => {}
    },
    // 是否创建完成就自动加载
    // 有些场景是需要extraParam变换的时候才请求的
    // 故需要设置该参数为false，让拓展参数变化的时候才请求
    immediateLoad: {
      type: Boolean,
      default: () => true
    },
    // eslint-disable-next-line vue/require-default-prop
    selectable: {
      type: Function
    }
  },
  data () {
    return {
      name: 'CubeTable',
      // 默认QWER列表配置
      initConfig: {
        search: {
          data: []
        },
        table: {
          tableHeight: 250,
          calcTableHeight: true, // 是否开启表格自动高度计算
          attributes: {}, // 传递到表格的属性
          data: [],
          columns: []
        }
      },
      maxHeight: 0, // calcTableHeight 开启会自动计算
      loading: false,
      pagination: {
        pageSizes: [10, 20, 50, 100], // 默认分页可选择的每页显示的页数
        size: 10, // 分页每页默认显示10条
        currentPage: 1, // 当前默认第一页
        total: 0 // 总条数
      },
      tableData: [],
      multipleSelection: []
    }
  },
  watch: {
    config: {
      // 属性传入改变的时候合并
      immediate: true,
      deep: true,
      handler (val) {
        const { config, initConfig } = this
        this.initConfig = deepMerge(initConfig, config || {})
        // 配置合并后做请求
        this.$nextTick(() => {
          setTimeout(() => {
            if (!this.immediateLoad) return
            this.fetchList()
          }, 20)
        })
      }
    },
    extraParam: {
      deep: true,
      handler (val) {
        this.$nextTick(() => {
          setTimeout(() => {
            console.log(val, 'extraParam')
            this.fetchList()
          }, 20)
        })
      }
    }
  },
  methods: {
    clickTableRow (item) {
      this.$emit('clickTableRow', item)
    },
    add () {
      this.$emit('add')
    },
    del () {
      this.$emit('del')
    },
    reset () {
      this.$emit('reset')
    },
    clickBtn (item) {
      this.$emit('clickBtn', item)
    },
    command (command) {
      this.$emit('command', command)
    },
    expandChange (row, expandedRows) {
      this.$emit('expandChange', row)
    },
    fetchList () {
      if (this.$refs.SearchBar) {
        this.$refs.SearchBar.search()
      } else {
        this.fetchTableData()
      }
    },
    fetchTableData (searchParams = {}) {
      const { url } = this
      const { currentPage, size } = this.pagination
      const params = { pageIndex: currentPage, pageSize: size, ...searchParams, ...this.extraParam }
      this.tableData = []
      this.loading = true
      const paramsKey = this.method.toUpperCase() !== 'POST' ? 'params' : 'data'
      request({ url, method: this.method, [paramsKey]: params }).then(({ data }) => {
        this.loading = false
        if (data.success) {
          const result = data.data
          if (Array.isArray(result.records)) {
            console.log(result.total)
            this.tableData = result.records || []
            this.pagination.total = result.total || 0
          }
        }
      }).catch(e => {
        this.loading = false
        console.log(e)
      })
    },
    // 分页操作区域
    handleSizeChange (value) {
      this.pagination.size = value
      this.fetchList()
    },
    handleCurrentChange (value) {
      this.pagination.currentPage = value
      this.fetchList()
    },
    getCubeTable () {
      return this.$refs[this.name]
    },
    getTableSelection () {
      // 获取表格勾选项目
      const TableSelection = this.$refs[this.name] && this.$refs[this.name].selection || []
      return deepClone(TableSelection)
    },
    // 选中行
    selectRow (selection) {
      this.$emit('selectRow', selection)
      console.log(selection, '选中行')
    },
    tbaleLoadMore () {
      console.log('加载更多')
    }
  }
}
</script>

<style scoped>
.bax{
  background: #cccccc;
}
</style>

```