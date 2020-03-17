<template>
  <div
    v-clickOutside="miss"
    class="CubeSelect"
  >
    <el-input
      v-model.trim="selectValue"
      placeholder="请输选择"
      @focus="focus"
      @blur="blur"
      @keyup.enter.native="inputChangeText"
    >
      <div
        v-if="appendVisible"
        slot="append"
        @click.stop="visible=!visible"
      > 选择 </div>
    </el-input>

    <el-popover
      v-model="visible"
      class="popover"
      placement="bottom"
    >
      <div style="text-align: right; margin: 0">
        <el-tree :data="tableData" :props="defaultProps" @node-click="handleNodeClick" />
      </div>
    </el-popover>
  </div>

</template>

<script>

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
    data: {
      type: Array,
      default: () => []
    },
    appendVisible: { // 是否显示 选 字
      type: Boolean,
      default: () => true
    },
    tableHeight: { // 选择区域高度
      type: Number,
      default: () => 250
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      visible: false,
      loading: false,
      selectValue: '',
      tableData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }]
    }
  },
  mounted() {
    const { data } = this
    this.tableData = data
  },
  methods: {
    focus() {
      this.visible = true
    },
    blur() {
      // this.visible = false
    },
    miss() {
      this.visible = false
    },
    handleNodeClick(row) {
      console.log(row)
      this.selectValue = row.name
      this.$emit('input', row)
    },
    inputChangeText(item) {
      console.log(item, 'inputChangeText')
    }
  }
}
</script>

<style lang="scss" scoped>
.CubeSelect {
  position: relative;
  width: 320px;
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
    max-height: 320px;
    overflow-y: auto;
  }
  .pagination {
    margin-top: 4px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
