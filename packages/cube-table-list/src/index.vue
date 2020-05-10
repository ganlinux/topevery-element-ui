<template>
  <div class="CubeTableList">
    <cubeSearchBar
      ref="SearchBar"
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
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(242, 248, 254, 0.9)"
    >
      <CubeTable
        slot="main"
        :ref="name"
        class="CubeTable"
        :config="initConfig.table"
        :height="initConfig.table.calcTableHeight ? height-(initConfig.table.prefixHeight) : initConfig.table.tableHeight || 'auto'"
        :load-more="initConfig.table.loadType ==='scroll' ? debounceLoadMoreFn : ()=>{} "
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
      <div slot="foot" v-else />
    </CubeMaxHeight>

  </div>
</template>

<script>

import debounce from 'throttle-debounce/debounce';

import CubeSearchBar from 'element-ui/packages/cube-search-bar';
import CubeTable from 'element-ui/packages/cube-table';
import CubeMaxHeight from 'element-ui/packages/cube-max-height';

import request from 'element-ui/src/utils/request';
import { deepMerge } from 'element-ui/src/utils/index.new';
import emitter from 'element-ui/src/mixins/emitter';

// import { isObject } from '../../utils/types'

export default {
  name: 'CubeTableList',
  componentName: 'CubeTableList',
  components: {
    CubeSearchBar,
    CubeTable,
    CubeMaxHeight
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
      loading: false,
      initConfig: {
        method: 'POST',
        url: '',
        search: {
          data: []
        },
        table: {
          tableExpand: false, // 是否是展开表格
          tableHeight: 400, // 如果关闭自动开启计算高度 - 这个字段建议传入。
          calcTableHeight: true, // 是否开启表格自动高度计算 - 开启则忽略tableHeight设置的高度
          loadType: 'page', // page 、 scroll 选择分页 还是滚动到底部加载
          prefixHeight: 36,
          columns: [],
          data: []
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
        console.log(this.extraParam, 'extraParam-change');
        this.$nextTick(() => {
          setTimeout(() => {
            this.fetchList();
          }, 200);
        });
      }
    }
  },
  mounted() {
    this.debounceLoadMore = debounce(800, () => this.debounceLoadMoreFn());
  },
  methods: {
    fetchList() {
      const searchParams = this.$refs['SearchBar'] ? this.$refs['SearchBar'].getSearchParams() : {};
      this.fetchTableData(searchParams);
    },
    fetchTableData(searchParams = {}, page = 0) {
      const { url, method } = this.initConfig;
      if (!url) return;
      const { loadType } = this.initConfig.table;
      page ? this.initConfig.pagination.currentPage = page : this.initConfig.pagination.currentPage = 1;
      const { currentPage, size } = this.initConfig.pagination;
      const params = { pageIndex: currentPage, pageSize: size, ...searchParams, ...this.extraParam };
      this.loading = true;
      if (loadType === 'page') this.initConfig.table.data = [];
      const paramsKey = method.toUpperCase() !== 'POST' ? 'params' : 'data';
      request({ url, method: method, [paramsKey]: params }).then((data) => {
        this.loading = false;
        if (data.success) {
          const result = data.data;
          if (Array.isArray(result.records)) {
            if (loadType === 'page') {
              const listMock = result.records.map((item) => {
                return { ...item, id: this.$guid_dev() };
              }) || [];
              this.initConfig.table.data = listMock || result.records || [];
              this.initConfig.pagination.total = result.total || 0;
            } else {
              const list = this.initConfig.table.data.map((item) => item.sectionId);
              for (const item of result.records) {
                const temp = { ...item, id: this.$guid_dev() };
                if (!list.includes(temp.sectionId)) {
                  this.initConfig.table.data.push(temp);
                }
              }
              this.initConfig.pagination.total = result.total || 0;
            }
          }
        }
      }).catch(e => {
        this.loading = false;
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