<template>
  <div class="CubeTableList">
    <SearchBar
      ref="SearchBar"
      :data="initConfig.search.data"
      @search="fetchTableData"
      @reset="fetchTableData"
      @add="add"
      @del="del"
      @clickBtn="clickBtn"
      @command="command"
    />
    <!-- 插入表头插槽-->
    <div>
      <slot
        name="topBar"
      />
    </div>
    <MaxHeight
      v-model="height"
      v-loading="loading"
      :prefix="0"
      :element-loading-text="loadingText"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(242, 248, 254, 0.9)"
      :calc-height="initConfig.table.calcTableHeight"
    >
      <CubeTable
        :ref="name"
        class="CubeTable"
        :config="initConfig.table"
        :height="initConfig.table.calcTableHeight ? height-prefixHeight : initConfig.table.tableHeight"
        :load-more="loadMore"
        @tableRowClick="tableRowClick"
      />
    </MaxHeight>

  </div>
</template>

<script>

import SearchBar from '../../SearchBar/src'
import CubeTable from '../../CubeTable/src'
import MaxHeight from '../../MaxHeight/src'

import request from '../../uitls/request'
import { deepClone, deepMerge } from '../../uitls'

export default {
  name: 'TableLoadMore',
  components: {
    SearchBar,
    CubeTable,
    MaxHeight
  },
  props: {
    // 是否创建完成就自动加载
    // 有些场景是需要extraParam变换的时候才请求的
    // 故需要设置该参数为false，让拓展参数变化的时候才请求
    immediateLoad: {
      type: Boolean,
      default: () => true
    },
    prefixHeight: {
      type: Number,
      default: 44
    },
    extraParam: {
      type: Object,
      default: () => {}
    },
    loadingText: {
      type: String,
      default: '数据加载中...'
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      name: 'TableLoadMore',
      height: 0,
      loading: false,
      pageIndex: 1,
      initConfig: {
        method: 'POST',
        url: '',
        search: {
          data: []
        },
        table: {
          tableHeight: 400, // 如果关闭自动开启计算高度 - 这个字段建议传入。
          calcTableHeight: true, // 是否开启表格自动高度计算 - 开启则忽略tableHeight设置的高度
          columns: [
            { label: '选项', type: 'selection' },
            { label: '序号', type: 'index' },
            { label: '名称', key: 'name' },
            { label: '编码', key: 'code' }
          ],
          data: [
            { name: 'shiliangl', code: 1212 },
            { name: 'shiliangl', code: 1212 },
            { name: 'shiliangl', code: 1212 },
            { name: 'shiliangl', code: 1212 },
            { name: 'shiliangl', code: 1212 },
            { name: 'shiliangl', code: 1212 },
            { name: 'shiliangl', code: 1212 },
            { name: 'shiliangl', code: 1212 },
            { name: 'shiliangl', code: 1212 },
            { name: 'shiliangl', code: 1212 }
          ]
        }
      }
    }
  },
  watch: {
    config: {
      // 属性传入改变的时候合并
      // immediate: true,
      handler(val) {
        const { config, initConfig } = this
        this.initConfig = deepMerge(initConfig, config || {})
        // 配置合并后做请求
        this.$nextTick(() => {
          setTimeout(() => {
            this.fetchList()
          }, 200)
        })
      }
    },
    extraParam: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.fetchList()
          }, 200)
        })
      }
    }
  },
  methods: {
    add() {
      this.$emit('add')
    },
    del() {
      this.$emit('del')
    },
    reset() {
      this.$emit('reset')
    },
    clickBtn() {
      this.$emit('clickBtn')
    },
    clickTableRow(item) {
      this.$emit('clickTableRow', item)
    },
    command(command) {
      this.$emit('command', command)
    },
    fetchList() {
      if (this.$refs['SearchBar']) {
        this.$refs['SearchBar'].search()
      } else {
        this.fetchTableData()
      }
    },
    fetchTableData(searchParams = {}, page = 0) {
      const { url, method } = this.initConfig
      if (!url) return
      page ? this.pageIndex = page : this.pageIndex = 1
      const params = { pageIndex: this.pageIndex, ...searchParams, ...this.extraParam }
      this.tableData = []
      this.loading = true
      const paramsKey = method.toUpperCase() !== 'POST' ? 'params' : 'data'
      request({ url, method: method, [paramsKey]: params }).then((data) => {
        this.loading = false
        if (data.success) {
          const result = data.data
          if (Array.isArray(result.records)) {
            this.tableData = result.records || []
          }
        }
      }).catch(e => {
        this.loading = false
      })
    },
    loadMore() {
      this.loading = true
      setTimeout(() => {
        this.pageIndex++
        this.initConfig.table.data.push({ name: 'shiliangl_load_more' + this.pageIndex, code: 33 })
        this.loading = false
      }, 2000)
    },
    getCubeTable() {
      return this.$refs[this.name]
    },
    getTableSelection() {
      // 获取表格勾选项目
      const TableSelection = this.$refs[this.name] && this.$refs[this.name].getTableSelection() || []
      return deepClone(TableSelection)
    },
    getSearchParams() {
      // 获取搜索栏参数
      const params = this.$refs['SearchBar'] && this.$refs['SearchBar'].getSearchParams() || null
      return deepClone(params)
    },
    // 选中行
    selectRow(selection) {
      this.$emit('selectRow', selection)
    },
    tableRowClick(row) {
      this.$emit('tableRowClick', row)
    },
    expandChange(row) {
      this.$emit('expandChange', row)
    },
    handler() {

    }
  }
}
</script>

<style lang="scss">

</style>
