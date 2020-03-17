<template>
  <el-select
    class="CubeSelectTree"
    :value="valueTitle"
    :clearable="clearable"
    :filterable="filterable"
    @clear="clearHandle"
  >
    <el-option
      :value="valueTitle"
      :label="valueTitle"
      class="options"
    >
      <el-tree
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="defaultProps"
        :default-expand-all="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'CubeSelectTree',
  props: {
    // 树形结构配置
    defaultProps: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    // 选项列表数据(树形结构的对象数组)
    options: {
      type: Array,
      default: () => []
    },
    // 初始值
    value: {
      type: String,
      default: () => null
    },
    // 可清空选项
    clearable: {
      type: Boolean,
      default: () => true
    },
    filterable: { type: Boolean,
      default: () => true
    },
    accordion: { type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      valueId: null,
      valueTitle: '',
      defaultExpandedKey: []
    }
  },
  mounted() {
    this.initHandle()
  },
  methods: {
    // 初始化值
    initHandle() {
      // console.log(this.valueId)
      if (this.valueId) {
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label] // 初始化显示
        // console.log(this.valueTitle)
        this.$refs.selectTree.setCurrentKey(this.valueId) // 设置默认选中
        this.defaultExpandedKey = [] // 设置默认展开
      }
      // this.initScroll()
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        const scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => {
          ele.style.width = 0
        })
      })
    },

    // 点击切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.defaultProps.label]
      this.valueId = node[this.defaultProps.value]
      this.$emit('getValue', this.valueId)
      this.defaultExpandedKey = []
    },

    // 清除选中
    clearHandle() {
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue', null)
    },

    // 清空选中样式
    clearSelected() {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    }

  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 10px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
