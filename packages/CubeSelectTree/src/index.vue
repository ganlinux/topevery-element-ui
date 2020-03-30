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
      :clearable="clearable"
      @focus="focus"
      @blur="blur"
      @keyup.enter.native="inputChangeText"
      @clear="clear"
      @input="input"
    >
      <div
        v-if="appendVisible"
        slot="append"
        @click.stop="visible=true"
      > 选择 </div>
    </el-input>

    <el-popover
      v-model="visible"
      class="popover"
      placement="bottom"
      :width="popoverWidth"
      @hide="hidePopover"
    >
      <div style="text-align: right; margin: 0">
        <el-tree
          ref="tree"
          highlight-current
          :default-expand-all="true"
          :expand-on-click-node="false"
          :node-key="nodeKey"
          :filter-node-method="filterNode"
          :data="tableData"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </div>
      <div v-if="loading" v-loading="loading" class="loadingMark" />
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
  name: 'CubeSelectTree',
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
    // 组件默认点击选择返回 keyCode 对应的值 即id、
    // 如果设置则返回现在数据对象
    valuekey: {
      type: String,
      default: () => ''
    },
    nodeKey: {
      type: String,
      default: () => ''
    },
    backValue: {
      type: String,
      default: () => ''
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
    value: { // 编辑显示传入对象
      type: [Object, String],
      default: () => {
        // return {
        //   label: '显示名称',
        //   value: '选择value'
        // }
      }
    },
    appendVisible: { // 是否显示 选 字
      type: Boolean,
      default: () => false
    },
    filterable: { // 是否开启过滤
      type: Boolean,
      default: () => true
    },
    clearable: { // 是否可以清除
      type: Boolean,
      default: () => true
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
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      placeholder2: '请选择',
      recordSelect: null,
      firstTime: true,
      visible: false,
      loading: false,
      selectValue: '',
      tableData: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        // 存在
        if (value) {
          this.recordSelect = value
          this.selectValue = value[this.keyName]
        } else {
          this.selectValue = ''
          this.recordSelect = null
          this.placeholder2 = '请选择'
        }
      }
    }
  },
  beforeDestroy() {
    this.firstTime = true
    this.recordSelect = null
  },
  methods: {
    focus() {
      this.visible = true
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
    },
    blur() {
      this.$emit('blur')
    },
    clear() {
      this.placeholder2 = '请选择'
      this.selectValue = null
      this.recordSelect = null
      this.$emit('input', null)
      this.$emit('change', null)
    },
    miss() {
      this.visible = false
      const { recordSelect } = this
      if (recordSelect) {
        this.selectValue = recordSelect[this.keyName]
        this.placeholder2 = '请选择'
      }
    },
    hidePopover() {
      this.$emit('hidePopover')
    },
    handleNodeClick(row) {
      // 选择最后一级没有 children 的 对外期待暴露的是什么 1、选择id 2、对象
      if (!row.children || !row.children.length) {
        this.selectValue = row[this.keyName]
        this.recordSelect = row
        const { valuekey } = this
        if (!valuekey) {
          //  不设置默认返回
          // { label: '显示名称', value: '选择value' }
          this.$emit('input', { [this.keyCode]: row[this.keyCode], [this.keyName]: row[this.keyName] })
        } else {
          //  设置返回整个数据对象
          this.$emit('input', row)
        }
        this.$emit('change', row)
        setTimeout(() => {
          this.visible = false
        }, 200)
      } else {
      // 选择最后任意
        console.log('选择最后任意')
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    input: debounce(function(item) {
      this.$refs.tree.filter(item)
      // this.fetchTableData()
    }, 800),
    fetchTableData() {
      this.firstTime = false
      const { url } = this
      if (!url) false
      const params = { ...this.extraParam }
      this.tableData = []
      this.loading = true
      const paramsKey = this.method.toUpperCase() !== 'POST' ? 'params' : 'data'
      request({ url, method: this.method, [paramsKey]: params }).then((data) => {
        this.loading = false
        if (data.success) {
          const result = data.data
          if (Array.isArray(result)) {
            this.tableData = result || []
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
    max-height: 320px;
    min-height: 320px;
    overflow-y: auto;

    .loadingMark{
      position: absolute!important;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
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
