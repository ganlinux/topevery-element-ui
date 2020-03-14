<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">点击打开地图。加载鼠标绘制工具。视图最佳视角移动</el-button>

    <SearchBar :data="searchData" />

    <uploader :options="options" class="uploader-example">
      <uploader-unsupport />
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :attrs="attrs">select images</uploader-btn>
        <uploader-btn :directory="true">select folder</uploader-btn>
      </uploader-drop>
      <uploader-list />
    </uploader>

    <Cube-Dialog
      fullscreen
      title="提示"
      :destroy-on-close="false"
      :visible.sync="dialogVisible"
    >
      <Add v-if="dialogVisible" />
    </Cube-Dialog>
  </div>
</template>

<script>

import Add from './Add'
export default {
  components: {
    Add
  },
  data() {
    return {
      options: {
        target: '//localhost:3000/upload',
        testChunks: false
      },
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
  }
}
</script>

<style lang="scss" scoped>

</style>
