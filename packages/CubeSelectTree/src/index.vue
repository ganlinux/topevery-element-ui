<!-- 选择组件 提供分页检索选择应数据量大列表卡顿以及分页接口数据选择 -->
<template>
  <div
    v-clickOutside="miss"
    class="CubeSelect"
  >
    <el-input
      v-model.trim="selectValue"
      filterable
      :style="{width: defaultConfig.inputWidth? defaultConfig.inputWidth + 'px' : 'auto' }"
      :placeholder="placeholder2"
      :clearable="defaultConfig.clearable"
      @focus="focus"
      @blur="blur"
      @clear="clear"
      @input="input"
    >
      <div
        v-if="defaultConfig.tipButtonVisible"
        slot="append"
        @click.stop="focus"
        v-text="defaultConfig.tipButtonText"
      />
    </el-input>
    <transition name="el-zoom-in-center">
      <el-popover
        v-model="visible"
        class="popover"
        placement="bottom"
        :width="defaultConfig.popoverWidth"
        @hide="hidePopover"
      >
        <div style="text-align: right; margin: 0">
          <el-tree
            ref="tree"
            highlight-current
            :default-expand-all="true"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :data="tableData"
            :node-key="defaultConfig.nodeKey"
            :props="defaultConfig.treeDefaultProps"
            @node-click="handleNodeClick"
          />
        </div>
        <div
          v-if="loading"
          v-loading="loading"
          class="loadingMark"
        />
      </el-popover>
    </transition>
  </div>

</template>

<script>

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
import { deepMerge, deepClone } from '../../uitls'

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
    config: {
      type: Object,
      default: () => { }
    },
    value: { // 编辑显示传入对象
      type: [Object, String],
      // { label: '显示名称',value: '选择value'}
      default: () => { }
    }
  },
  data() {
    return {
      placeholder2: '请选择',
      recordSelect: null,
      visible: false,
      loading: false,
      selectValue: '',
      tableData: [],
      // 默认参数
      defaultConfig: {
        // 显示输入区域
        keyName: 'label', // 显示选择名称
        keyCode: 'value', // 选择关键key
        placeholder: '请选择',
        clearable: true,
        tipButtonVisible: true,
        tipButtonText: '选择',
        popoverWidth: 320, // 弹层宽度
        inputWidth: 330, // 输入框宽度
        // 树区域
        nodeKey: 'id',
        selectAny: false,
        treeDefaultProps: {
          children: 'children',
          label: 'label'
        },
        // 请求额外设置参数 -  网络数据加载区域
        needLoad: true,
        method: 'POST',
        url: '',
        extraParam: {},
        focusOnload: true,
        // 选择返回值设置
        selectValuekey: []
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        // 存在
        if (value) {
          const { keyName } = this.defaultConfig
          this.recordSelect = value
          this.selectValue = value[keyName]
        } else {
          this.selectValue = ''
          this.recordSelect = null
          this.placeholder2 = '请选择'
        }
      }
    },
    config: {
      immediate: true,
      handler(configData) {
        const { defaultConfig } = this
        this.defaultConfig = deepMerge(deepClone(defaultConfig), configData || {})
        this.placeholder2 = this.defaultConfig.placeholder
      }
    }
  },
  beforeDestroy() {
    this.firstTime = true
    this.recordSelect = null
  },
  methods: {
    focus() {
      const { recordSelect } = this
      const { focusOnload, keyName } = this.defaultConfig
      this.visible = true
      // 获取焦点的时候 如果已经选择的东西 隐藏
      if (recordSelect) {
        this.selectValue = ''
        this.placeholder2 = recordSelect[keyName]
      }
      // 获取焦点就加载如果关闭则只会加载请求一次
      if (focusOnload) {
        this.fetchTableData()
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
      const { keyName } = this.defaultConfig
      if (recordSelect) {
        this.selectValue = recordSelect[keyName]
        this.placeholder2 = '请选择'
      }
    },
    hidePopover() {
      this.$emit('hidePopover')
    },
    handleNodeClick(row) {
      const { selectAny, keyName, keyCode, selectValuekey } = this.defaultConfig
      // 可设置返回对象内容
      const selectValuekeyParams = {}
      if (Array.isArray(selectValuekey) && selectValuekey.length) {
        for (const item of selectValuekey) {
          selectValuekeyParams[item] = row[item]
        }
      }
      const params = { [keyCode]: row[keyCode], [keyName]: row[keyName], ...selectValuekeyParams }
      if (selectAny) {
        // 选择最后任意
        this.visible = false
        this.selectValue = row[keyName]
        this.recordSelect = row
        this.$emit('input', params)
        this.$emit('change', row)
      } else {
        // 选择最后一级-没有children、或者 !children.length
        if (!row.children || !row.children.length) {
          this.visible = false
          this.selectValue = row[keyName]
          this.recordSelect = row
          this.$emit('input', params)
          this.$emit('change', row)
        }
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    input: debounce(function(item) {
      this.$refs.tree.filter(item)
    }, 800),
    fetchTableData() {
      const { url, extraParam, method } = this.defaultConfig
      if (!url) false
      this.loading = true
      this.tableData = []
      // const params = Object.keys(extraParam).length ? { ...extraParam } : null
      const params = { ...extraParam }
      const paramsKey = method.toUpperCase() !== 'POST' ? 'params' : 'data'
      request({ url, method: method, [paramsKey]: params }).then((data) => {
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

    .loadingMark {
      position: absolute !important;
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
