<!-- 选择组件 提供分页检索选择应数据量大列表卡顿以及分页接口数据选择 -->
<template>
  <div
    v-clickOutside="miss"
    class="cube-select"
  >
    <el-input
      v-model.trim="selectValue"
      :style="{width: defaultConfig.inputWidth? defaultConfig.inputWidth : '' }"
      :placeholder="placeholder2"
      :size="defaultConfig.size"
      :disabled="disabled"
      :filterable="defaultConfig.filterable"
      :clearable="defaultConfig.clearable"
      @focus="focus"
      @blur="blur"
      @clear="clear"
      @input="input"
    />

    <el-popover
      v-model="visible"
      class="popover"
      placement="bottom"
      :width="defaultConfig.popoverWidth"
      @hide="hidePopover"
    >
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(242, 248, 254, 0.9)"
        style="text-align: right; margin: 0"
      >
        <el-table
          ref="tablePage"
          :data="tableData"
          style="width: 100%"
          size="mini"
          :height="defaultConfig.tableHeight"
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
            v-for="(item,index) in defaultConfig.column"
            :key="index"
            show-overflow-tooltip
            :width="item.width ? item.width : null "
            :header-align="defaultConfig.headerAlign"
            :align="item.align ? item.align : 'center' "
            :prop="item.prop"
            :label="item.label"
          >
            <template slot-scope="scope">
              <template v-if="!item.render">
                <template>
                  <span :title="scope.row[item.key]">{{ scope.row[item.key] }}</span>
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
          v-if="!defaultConfig.isNoPage"
          small
          :pager-count="5"
          class="pagination"
          layout="total,prev, pager, next"
          :current-page="defaultConfig.pagination.currentPage"
          :page-size="defaultConfig.pagination.size"
          :total="defaultConfig.pagination.total"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-popover>
  </div>

</template>

<script>

import debounce from 'throttle-debounce/debounce';
import request from 'utils/request';
import { deepMerge } from 'utils/index.new';
import { isObject } from 'utils/types';
import emitter from 'mixins/emitter';

import ElInput from 'packages/input';
import Elpopover from 'packages/popover';
import ElTable from 'packages/table';
import ElTableColumn from 'packages/table-column';
import ElPagination from 'packages/pagination';

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
        };
        if (opt.props.column) params.column = opt.props.column;
        return opt.props.render(h, params);
      }
    },
    ElInput,
    Elpopover,
    ElTable,
    ElTableColumn,
    ElPagination
  },
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        function clickHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler;
        document.addEventListener('click', clickHandler);
      },
      update() { },
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },
  mixins: [emitter],
  props: {
    validateEvent: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    extraParam: {
      type: Object,
      default: () => { }
    },
    config: {
      type: Object,
      default: () => { }
    },
    value: { // 编辑显示传入对象
      type: [Object, String],
      // { key: 'name', label: '名称' },
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
        keyName: 'label', // 显示选择名称
        keyCode: 'value', // 选择关键key
        otherProps: [], // 除了需要返回 keyName 、 keyCode 之外的其他数据
        placeholder: '请选择',
        clearable: true,
        popoverWidth: 320, // 弹层宽度
        inputWidth: '220px', // 输入框宽度
        size: 'small',
        // 表格区域
        isNoPage: false, // 是否是分页 默认是分页
        tableHeight: 250,
        headerAlign: 'center',
        column: [
          { key: 'name', label: '名称' },
          { key: 'code', label: '编码' }
        ],
        // 请求额外设置参数 -  网络数据加载区域
        searchName: 'name',
        method: 'POST',
        url: '',
        focusOnload: true,
        // 选择返回值设置
        selectValuekey: [],
        pagination: {
          size: 10, // 分页每页默认显示10条
          currentPage: 1, // 当前默认第一页
          total: 0 // 总条数
        }
      }
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value, valueOld) {
        if (value && isObject(value)) {
          const { keyName } = this.defaultConfig;
          this.recordSelect = value;
          this.selectValue = value[keyName];
          // if (this.validateEvent) {
          //   this.dispatch('ElFormItem', 'el.form.change', [value])
          // }
        } else {
          this.selectValue = '';
          this.recordSelect = null;
          this.placeholder2 = this.defaultConfig.placeholder;
        }
      }
    },
    config: {
      immediate: true,
      handler(configData) {
        this.defaultConfig = deepMerge(this.defaultConfig, configData || {});
        this.placeholder2 = this.defaultConfig.placeholder;
      }
    }
  },
  beforeDestroy() {
    this.recordSelect = null;
  },
  mounted() {
    this.inputChange = debounce(800, (name) => this.fetchTableData());
  },
  methods: {
    focus() {
      const { recordSelect } = this;
      const { focusOnload, keyName } = this.defaultConfig;
      this.visible = true;
      // 获取焦点的时候 如果已经选择的东西 隐藏
      if (recordSelect) {
        this.selectValue = '';
        this.placeholder2 = recordSelect[keyName];
      }
      // 获取焦点就加载如果关闭则只会加载请求一次
      if (focusOnload) {
        this.fetchTableData();
      } else {
        if (!this.tableData.length) {
          this.fetchTableData();
        }
      }

      // if (this.validateEvent) {
      //   this.dispatch('ElFormItem', 'el.form.blur', [this.value])
      // }

      this.$emit('focus');
      this.$emit('visibleChange', true);

      setTimeout(_ => {
        this.setTableCurrentRow();
      }, 0);
    },
    blur() {
      this.selectValue = '';
      this.$emit('blur');
    },
    clear() {
      this.selectValue = null;
      this.recordSelect = null;
      this.placeholder2 = this.defaultConfig.placeholder;
      this.$emit('input', null);
      this.$emit('change', null);
      this.$emit('clear');
    },
    miss() {
      this.visible = false;
      const { recordSelect } = this;
      const { keyName } = this.defaultConfig;
      if (recordSelect) {
        this.selectValue = recordSelect[keyName];
        this.placeholder2 = this.defaultConfig.placeholder;
      }
    },
    handleCurrentChange(value) {
      this.defaultConfig.pagination.currentPage = value;
      this.fetchTableData();
    },
    rowStyle() {
      return { cursor: 'pointer' };
    },
    indexMethod(index) {
      return (index + 1) + (this.defaultConfig.pagination.currentPage - 1) * (this.defaultConfig.pagination.size);
    },
    setTableCurrentRow() {
      const { recordSelect } = this;
      if (!recordSelect) return;
      const { keyCode } = this.defaultConfig;
      const currentRow = this.tableData.find((item) => item[keyCode] === recordSelect[keyCode]) || null;
      this.$refs['tablePage'] && this.$refs['tablePage'].setCurrentRow(currentRow);
    },
    hidePopover() {
      this.$emit('visibleChange', false);
    },
    rowClick(row) {
      const { keyName, keyCode, otherProps } = this.defaultConfig;
      this.selectValue = row[keyName];
      this.recordSelect = row;
      const params = {};
      if (Array.isArray(otherProps) && otherProps.length) {
        for (const item of otherProps) {
          params[item] = row[item];
        }
      }
      const paramsList = { [keyCode]: row[keyCode], [keyName]: row[keyName], ...params };
      this.$emit('input', paramsList);
      this.$emit('change', row);
      this.visible = false;
    },
    input() {
      this.inputChange();
    },
    fetchTableData() {
      const { extraParam, selectValue } = this;
      const { url, method, searchName, isNoPage } = this.defaultConfig;
      const { currentPage, size } = this.defaultConfig.pagination;
      if (!url) false;
      this.tableData = [];
      this.loading = true;
      const searchParams = { [searchName]: selectValue };
      const extraParams = isObject(extraParam) ? Object.keys(extraParam).length ? { ...extraParam } : {} : {};
      const searchParams2extraParams = Object.assign(searchParams, extraParams);
      const pageParams = { pageIndex: currentPage, pageSize: size };
      const params = isNoPage ? { ...searchParams2extraParams } : { ...pageParams, ...searchParams2extraParams };
      const paramsKey = method.toUpperCase() !== 'POST' ? 'params' : 'data';
      request({ url, method: method.toUpperCase(), [paramsKey]: params }).then((res) => {
        this.loading = false;
        const { data, success } = res;
        if (success) {
          const result = data;
          if (isNoPage) {
            this.tableData = result || [];
          } else {
            if (Array.isArray(result.records)) {
              this.tableData = result.records || [];
              this.defaultConfig.pagination.total = result.total || 0;
            }
          }
          setTimeout(_ => {
            this.setTableCurrentRow();
          }, 0);
        }
      }).catch(e => {
        // this.message({ message: '请勾选您需要处理的数据', type: 'error' })
        this.loading = false;
      });
    }
  }
};
</script>
 