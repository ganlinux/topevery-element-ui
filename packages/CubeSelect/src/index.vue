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
        <el-table
          v-loading="loading"
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
            align="center"
            show-overflow-tooltip
            prop="name"
            label="名称"
          />
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="code"
            label="编码"
          />
        </el-table>
        <el-pagination
          small
          class="pagination"
          layout="prev, pager, next"
          :current-page="pagination.page"
          :page-size="pagination.size"
          :total="pagination.total"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-popover>
  </div>

</template>

<script>

export default {
  name: 'CubeSelect',
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
      visible: false,
      loading: false,
      selectValue: '',
      tableData: [
        {
          code: 'MSKC',
          name: '王小虎',
          id: '232999239222'
        },
        {
          code: 'KFC',
          name: '晓东',
          id: '212312313123'
        }
      ],
      pagination: {
        size: 10, // 分页每页默认显示10条
        currentPage: 1, // 当前默认第一页
        total: 20 // 总条数
      }
    }
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
    handleCurrentChange(value) {
      console.log(value)
      this.pagination.currentPage = value
      // this.fetchList()
    },
    rowStyle() {
      return {
        cursor: 'pointer'
      }
    },
    indexMethod(index) {
      return index + 1
      // <span>{{ scope.$index+(pagination.currentPage-1) *pagination.size + 1 }}</span>
    },
    rowClick(row) {
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
  }
  .pagination {
    margin-top: 4px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
