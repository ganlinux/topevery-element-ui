<template>
  <div class="CubeTableList">
    <cubeSearchBar
      ref="SearchBar"
      v-if="initConfig.search && initConfig.search.data"
      :data="initConfig.search.data"
      @search="fetchTableData"
      @reset="handlerReset"
    />
    <!-- 插入表头插槽-->
    <div>
      <slot name="topBar" />
    </div>
    <CubeMaxHeight
      :height.sync="height"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(242, 248, 254, 0.9)"
    >
      <CubeTable
        slot="main"
        :ref="name"
        class="CubeTable"
        :config="initConfig.table"
        :rowKey="initConfig.table.rowKey"
        :expandOnly="initConfig.table.expandOnly"
        :height="initConfig.table.calcTableHeight ? height-(initConfig.table.prefixHeight) : initConfig.table.tableHeight || 'auto'"
        :load-more="initConfig.table.loadType ==='list' ? debounceLoadMoreFn : ()=>{} "
        @tableRowClick="tableRowClick"
        @expandChange="expandChange"
      >
        <template
          slot="expand"
          slot-scope="scope"
        >
          <slot
            name="expand"
            :row="scope.row"
          />
        </template>
      </CubeTable>

      <!-- 选择分页 还是滚动到底部加载 -->
      <el-pagination
        slot="foot"
        v-if="initConfig.table.loadType ==='page'"
        style="text-align: center;margin-top: 4px;"
        background
        :current-page="initConfig.pagination.currentPage"
        :page-sizes="initConfig.pagination.pageSizes"
        :page-size="initConfig.pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="initConfig.pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!--  -->
      <div
        slot="foot"
        v-else
      />
    </CubeMaxHeight>

  </div>
</template>

<script>

import debounce from 'throttle-debounce/debounce';
import request from 'utils/request';
import { deepMerge } from 'utils/index.new';
import emitter from 'mixins/emitter';

import CubeSearchBar from 'packages/cube-search-bar';
import CubeTable from 'packages/cube-table';
import CubeMaxHeight from 'packages/cube-max-height';
import ElPagination from 'packages/pagination';
import Loading from 'packages/loading';

// import { isObject } from '../../utils/types'

export default {
  name: 'CubeTableList',
  componentName: 'CubeTableList',
  components: {
    CubeSearchBar,
    CubeTable,
    CubeMaxHeight,
    ElPagination
  },
  mixins: [emitter],
  props: {
    extraParam: {
      type: Object,
      default: () => { }
    },
    config: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      name: 'CubeTable',
      height: 0,
      loading: true,
      initConfig: {
        method: 'POST',
        url: '',
        search: {
          data: []
        },
        table: {
          tableDataType: 'page', // 后台返回数据结构 默认是分页 list不分页列表数据结构
          rowKey: 'id', // 展开表格唯一标识（展开唯一 + 滚动加载判断是否重复）
          expandOnly: true, // 是否展开唯一
          tableExpand: false, // 是否是展开表格
          tableHeight: 400, // 如果关闭自动开启计算高度 - 这个字段建议传入。
          calcTableHeight: true, // 是否开启表格自动高度计算 - 开启则忽略tableHeight设置的高度
          loadType: 'page', // 加载方式 page选择分页, list滚动到底部加载
          prefixHeight: 10,
          columns: [],
          data: []
        },
        loading: {
          loadingText: '拼命加载中',
          loadingIcon: 'el-icon-loading',
          loadingBackGround: 'rgba(242, 248, 254, 0.9)'
        },
        pagination: {
          pageSizes: [10, 30, 50, 70, 100], // 默认分页可选择的每页显示的页数
          size: 10, // 分页每页默认显示50条
          currentPage: 1, // 当前默认第一页
          total: 0 // 总条数
        }
      }
    };
  },
  watch: {
    config: {
      // 属性传入改变的时候合并
      immediate: true,
      handler(val) {
        const { config, initConfig } = this;
        this.initConfig = deepMerge(initConfig, config || {});
        // const { tableExpand } = this.initConfig.table
        // // 如果传入额外参数 怎么只是合并 请求放到 extraParam 监听中执行 fix多次请求
        // if (this.extraParam && isObject(this.extraParam)) {
        //   const extraParams = Object.keys(this.extraParam)
        //   // 如果存在拓展参数 是表格拓展 则需要加载
        //   console.log(extraParams, 'extraParams')
        //   console.log(tableExpand, 'tableExpand')
        // }
        this.$nextTick(() => {
          setTimeout(() => {
            this.fetchList();
          }, 200);
        });
      }
    },
    extraParam: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.fetchList();
          }, 200);
        });
      }
    }
  },
  mounted() {
    const { loadType } = this.initConfig.table;
    if (loadType === 'list') {
      this.debounceLoadMore = debounce(1000, () => this.debounceLoadMoreFn());
    }
  },
  methods: {
    fetchList() {
      const searchParams = this.$refs['SearchBar'] ? this.$refs['SearchBar'].getSearchParams() : {};
      this.fetchTableData(searchParams);
    },
    guid() {
      function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    createLoadingFn() {
      const { loadingText, loadingIcon, loadingBackground } = this.initConfig.loading;
      const el = this.$el.querySelector('.cubeMaxHeight');
      this.createLoading = Loading.service({
        target: el,
        fullscreen: false,
        lock: true,
        text: loadingText,
        spinner: loadingIcon,
        background: loadingBackground
      });
    },
    fetchTableData(searchParams = {}, page = 0) {
      const { url, method } = this.initConfig;
      if (!url) return;
      const { loadType, rowKey, tableDataType } = this.initConfig.table;
      page ? this.initConfig.pagination.currentPage = page : this.initConfig.pagination.currentPage = 1;
      const { currentPage, size } = this.initConfig.pagination;
      const params = { pageIndex: currentPage, pageSize: size, ...searchParams, ...this.extraParam };
      this.createLoadingFn();
      if (loadType === 'page') this.initConfig.table.data = [];
      if (!page && loadType === 'list') {
        this.initConfig.table.data = [];
      }
      const paramsKey = method.toUpperCase() !== 'POST' ? 'params' : 'data';
      const { data, success, pageList, totalList } = this.$FETCH;
      request({ url, method: method, [paramsKey]: params }).then((response) => {
        console.log(response, 'data');
        if (this.createLoading) {
          this.createLoading.close();
        }
        if (response[success]) {
          // 判断标识 数据结构是否是分页数据结构
          if (!['list', 'page'].includes(tableDataType)) {
            console.error('表格数据类型传入错误 tableDataType 可选值page、list');
            return;
          }
          if (tableDataType === 'page') {
            const result = response[data];
            if (Array.isArray(result[pageList]) && result[pageList].length) {
              if (loadType === 'page') {
                this.initConfig.table.data = result[pageList] || [];
                this.initConfig.pagination.total = result[totalList] || 0;
              } else {
                // 判断rowKey是否在数据中存在
                if (!result[pageList][0][rowKey]) {
                  console.error('请核实是否传入rowKey唯一值');
                  return;
                }
                const list = this.initConfig.table.data.map((item) => item[rowKey]) || [];
                for (const item of result[pageList]) {
                  if (!list.includes(item[rowKey])) {
                    this.initConfig.table.data.push(item);
                  }
                }
                this.initConfig.pagination.total = result[totalList] || 0;
              }
            }
          } else {
            const result = response[data];
            if (Array.isArray(result) && result.length) {
              this.initConfig.table.data = result || [];
            }
          }
        }
      }).catch(e => {
        if (this.createLoading) {
          this.createLoading.close();
        }
      });
    },
    handlerReset() {
      this.initConfig.table.data = [];
      this.initConfig.pagination.total = 0;
      this.initConfig.pagination.currentPage = 1;
      this.fetchTableData();
    },
    debounceLoadMoreFn() {
      let { currentPage } = this.initConfig.pagination;
      currentPage++;
      const searchParams = this.$refs['SearchBar'] ? this.$refs['SearchBar'].getSearchParams() : {};
      this.fetchTableData(searchParams, currentPage);
    },
    handleSizeChange(value) {
      this.initConfig.pagination.size = value;
      const searchParams = this.$refs['SearchBar'] ? this.$refs['SearchBar'].getSearchParams() : {};
      this.fetchTableData(searchParams);
    },
    handleCurrentChange(value) {
      const searchParams = this.$refs['SearchBar'] ? this.$refs['SearchBar'].getSearchParams() : {};
      this.fetchTableData(searchParams, value);
    },
    getTableSelection() {
      return this.$refs[this.name] && this.$refs[this.name].getTableSelection() || [];
    },
    getSearchParams() {
      return this.$refs['SearchBar'] && this.$refs['SearchBar'].getSearchParams() || null;
    },
    tableRowClick(row) {
      this.$emit('tableRowClick', row);
    },
    expandChange(row, expandedRows) {
      this.$emit('expandChange', row, expandedRows);
    }
  }
};
</script>