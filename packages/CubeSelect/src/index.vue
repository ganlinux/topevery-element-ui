<!-- 选择组件 提供分页检索选择应数据量大列表卡顿以及分页接口数据选择 -->
<template>
  <div
    v-clickOutside="miss"
    class="CubeSelect"
  >
    <el-input
      v-model.trim="selectValue"
      :style="{width: width? width + 'px' : '' }"
      :placeholder="placeholder2"
      :filterable="filterable"
      :disabled="disabled"
      :clearable="clearable"
      @focus="focus"
      @blur="blur"
      @keyup.enter.native="inputChangeText"
      @clear="clear"
      @input="input"
    >
      <div
        v-if="showAppendBtn"
        slot="append"
        @click.stop="focus"
      > {{ appendBtnText }} </div>
    </el-input>

    <el-popover
      v-model="visible"
      class="popover"
      placement="bottom"
      :width="popoverWidth"
      @hide="hidePopover"
    >
      <div v-loading="loading" style="text-align: right; margin: 0">
        <el-table
          :data="tableData"
          style="width: 100%"
          size="mini"
          :height="tableHeight"
          highlight-current-row
          :row-style="rowStyle"
          element-loading-text="数据加载中..."
          @row-click="rowClick"
        >
          <el-table-column
            label="序号"
            type="index"
            :index="indexMethod"
          />
          <el-table-column
            v-for="(item,index) in column2"
            :key="tableRowKey ? item[tableRowKey] : index"
            show-overflow-tooltip
            :width="item.width ? item.width : null "
            :align="item.align ? item.align : 'center' "
            :prop="item.prop"
            :label="item.label"
          >
            <template slot-scope="scope">
              <template v-if="!item.render">
                <template>
                  <span>{{ scope.row[item.key] }}</span>
                </template>
              </template>
              <template v-else>
                <render
                  :column="item"
                  :index="index"
                  :render="item.render"
                  :row="scope.row"
                />
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          :pager-count="5"
          class="pagination"
          layout="total,prev, pager, next"
          :current-page="pagination.currentPage"
          :page-size="pagination.size"
          :total="pagination.total"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-popover>
  </div>

</template>

<script>

export function deepMerge(target, merged) {
  for (var key in merged) {
    target[key] = target[key] && target[key].toString() === '[object Object]' ? deepMerge(target[key], merged[key]) : target[key] = merged[key]
  }
  return target
}

export function debounce(callback, delay) {
  let lastTime
  return function() {
    clearTimeout(lastTime)
    const [that, args] = [this, arguments]
    lastTime = setTimeout(() => {
      callback.apply(that, args)
    }, delay)
  }
}

import request from '../../uitls/request'

export default {
  name: 'CubeSelect',
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
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        function clickHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e)
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler
        document.addEventListener('click', clickHandler)
      },
      update() { },
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  },
  props: {
    // 设置选择返回的值 默认为空
    // 如果设置则返回该设置 key-value 的value值
    // 不返回  { [this.keyCode]: row[this.keyCode], [this.keyName]: row[this.keyName] }
    backValue: {
      type: String,
      default: () => ''
    },
    // 额外需要返回字段会包含{ [this.keyCode]: row[this.keyCode], [this.keyName]: row[this.keyName], ...额外属性 }
    backList: {
      type: Array,
      default: () => []
    },
    popoverWidth: { // 搜索弹层宽度
      type: Number,
      default: () => 320
    },
    width: { // 输入框宽度
      type: Number,
      default: () => 0
    },
    keyName: { // 主要用户编辑显示组合对象
      type: String,
      default: () => 'label'
    },
    keyCode: { // 主要用户编辑显示组合对象
      type: String,
      default: () => 'value'
    },
    tableRowKey: { // 唯一标识值 例如id
      type: String,
      default: () => ''
    },
    value: { // 编辑显示传入对象
      type: [Object, String, Array, Number],
      default: () => { }
    },
    showAppendBtn: { // 是否显示 选 字
      type: Boolean,
      default: () => false
    },
    appendBtnText: {
      type: String,
      default: () => '选择'
    },
    filterable: { // 是否开启过滤
      type: Boolean,
      default: () => true
    },
    clearable: { // 是否可以清除
      type: Boolean,
      default: () => true
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: () => false
    },
    tableHeight: { // 选择区域高度
      type: Number,
      default: () => 250
    },
    extraParam: { // 关联拓展参数
      type: Object,
      default: () => {
      }
    },
    placeholder: { // 提示占位符号
      type: String,
      default: () => ''
    },
    column: { // 表格显示字段绑定
      type: Array,
      default: () => [
        // { key: 'name', label: '名称' },
        // { key: 'code', label: '编码' }
      ]
    },
    focusOnload: { // 是否获取焦点就加载 如果设置 false 则只加载一次
      type: Boolean,
      default: () => true
    },
    method: { // 请求方法 默认 POST
      type: String,
      default: () => 'POST'
    },
    url: { // 数据请求接口 毕传
      type: String,
      default: () => ''
    },
    searchName: { // 后台查询字段
      type: String,
      default: () => 'name'
    }
  },
  data() {
    return {
      placeholder2: '请选择',
      column2: [
        { prop: 'name', label: '名称' },
        { prop: 'code', label: '编码' }
      ],
      recordSelect: null,
      firstTime: true,
      visible: false,
      loading: false,
      selectValue: '',
      tableData: [],
      pagination: {
        size: 50, // 分页每页默认显示10条
        currentPage: 1, // 当前默认第一页
        total: 0 // 总条数
      }
    }
  },
  beforeDestroy() {
    this.firstTime = true
    this.recordSelect = null
  },
  mounted() {
    // 初始化
    const { placeholder, column, value } = this
    if (placeholder) this.placeholder2 = placeholder
    if (column.length) {
      this.column2 = deepMerge(this.column2, column)
    }
    if (value) {
      this.recordSelect = value
      this.selectValue = value[this.keyName]
    }
  },
  methods: {
    focus() {
      this.visible = true
      this.$emit('visibleChange', true)
      // 获取焦点的时候 如果已经选择的东西 隐藏
      const { recordSelect } = this
      if (recordSelect) {
        this.selectValue = ''
        this.placeholder2 = recordSelect[this.keyName]
      }
      // 获取焦点就加载如果关闭则只会加载请求一次
      if (this.focusOnload) {
        this.fetchTableData()
      } else {
        if (this.firstTime) {
          this.fetchTableData()
        }
      }
      this.$emit('focus')
    },
    blur() {
      // 失去焦点 如果 已经选择的东西 显示
      // const { recordSelect } = this
      // if (recordSelect) {
      //   this.selectValue = recordSelect[this.keyName]
      //   this.placeholder2 = '请选择'
      // }
      this.$emit('blur')
    },
    clear() {
      this.placeholder2 = '请选择'
      this.selectValue = null
      this.recordSelect = null
      this.$emit('input', null)
      this.$emit('change', null)
      this.$emit('clear')
    },
    miss() {
      this.visible = false
      const { recordSelect } = this
      if (recordSelect) {
        this.selectValue = recordSelect[this.keyName]
        this.placeholder2 = '请选择'
      }
    },
    handleCurrentChange(value) {
      this.pagination.currentPage = value
      this.fetchTableData()
    },
    rowStyle() {
      return { cursor: 'pointer' }
    },
    indexMethod(index) {
      return (index + 1) + (this.pagination.currentPage - 1) * (this.pagination.size)
    },
    hidePopover() {
      this.$emit('visibleChange', false)
    },
    rowClick(row) {
      this.selectValue = row[this.keyName]
      this.recordSelect = row
      const { backValue, backList } = this
      const backListParams = {}
      if (Array.isArray(backList) && backList.length) {
        for (const item of backList) {
          backListParams[item] = row[item]
        }
      }
      const params = { [this.keyCode]: row[this.keyCode], [this.keyName]: row[this.keyName], ...backListParams }
      if (backValue) {
        this.$emit('input', row[backValue])
      } else {
        this.$emit('input', params)
      }
      this.$emit('change', row)
      setTimeout(() => {
        this.visible = false
      }, 200)
    },
    inputChangeText(item) {
      this.fetchTableData({ [this.searchName]: this.selectValue })
      this.$emit('enter', item)
    },
    input: debounce(function() {
      this.pagination.currentPage = 1
      this.fetchTableData()
    }, 800),
    fetchTableData() {
      this.firstTime = false
      const { url } = this
      if (!url) false
      const { currentPage, size } = this.pagination
      const searchParams = { [this.searchName]: this.selectValue }
      const params = { pageIndex: currentPage, pageSize: size, ...searchParams, ...this.extraParam }
      this.tableData = []
      this.loading = true
      const paramsKey = this.method.toUpperCase() !== 'POST' ? 'params' : 'data'
      request({ url, method: this.method, [paramsKey]: params }).then((data) => {
        this.loading = false
        if (data.success) {
          const result = data.data
          if (Array.isArray(result.records)) {
            this.tableData = result.records || []
            this.pagination.total = result.total || 0
          }
        }
      }).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.CubeSelect {
  position: relative;
  min-width: 220px;
  // max-width: 420px;

  /deep/.el-input-group__append {
    background: #2f86f6;
    color: #ffffff;
    border: 1px solid #2f86f6;
    cursor: pointer;
    user-select: none;
    &:active {
      opacity: 0.9;
    }
  }
  /deep/.el-popper {
    margin-top: 4px;
    width: 100%;
    z-index: 9;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 36px;
    padding: 4px;
  }
  .pagination {
    margin-top: 4px;
    text-align: center;
    cursor: pointer;
    /deep/.el-pagination__total {
      font-size: 12px;
    }
  }
}
</style>
