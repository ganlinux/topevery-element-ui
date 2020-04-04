<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">点击打开地图。加载鼠标绘制工具。视图最佳视角移动</el-button>

    <SearchBar :data="searchData" />

    <CubeSelectTree :options="treeData" />

    <Cube-Dialog
      fullscreen
      title="鼠标地图绘制"
      append-to-body
      :visible.sync="dialogVisible"
    >
      <Add v-if="dialogVisible" />
    </Cube-Dialog>
  </div>
</template>

<script>

import Add from './Add'
import { treeData } from './tree'

export default {
  name: 'CubeMapX',
  title: '地图应用',
  pageConfig: {
    groupsKey: 'map',
    groupsName: '地图组件',
    pageTitle: '地图应用',
    pageName: 'CubeMapX',
    sort: '1'
  },
  components: {
    Add
  },
  data() {
    return {
      options: {
        target: '//localhost:3000/upload',
        testChunks: false
      },
      treeData,
      attrs: {
        accept: 'image/*'
      },
      dialogVisible: false,
      searchData: [
        [
          { type: 'input', value: null, key: 'boxCode', placeholder: '输入框', class: 'w160' },
          { type: 'option', value: null, key: 'boxType', placeholder: '选择', options: [
            { label: '分体', value: 1 },
            { label: '连体', value: 2 }]
          },
          { type: 'date', value: null, key: 'boxCode', placeholder: '日期', class: 'w160' },
          // { type: 'datetime', value: null, key: 'boxCode', placeholder: '日期时间', class: 'w160' },
          // { type: 'multiple-date', dateType: 0, value: [], key1: 'startDate', key2: 'endDate', placeholder1: '开始日期', placeholder2: '结束日期' },
          // { type: 'multiple-date', dateType: 1, value: [], key1: 'startDate', key2: 'endDate', placeholder1: '开始时间', placeholder2: '结束时间' },

          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'button', name: '调入', keyType: 'primary', icon: 'el-icon-upload2' },
          { type: 'button', name: '调出', keyType: 'danger', icon: 'el-icon-close' }
          // { type: 'button', name: '导出', keyType: 'primary', icon: 'el-icon-upload2' }
        ]
      ]
    }
  },
  created() {
    console.log(treeData, 'list')
  }
}
</script>

<style lang="scss" scoped>

</style>
