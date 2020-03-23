<!-- CubeTable  文档页面 -->
<template>
  <div>
    <Md />
    <cube-Table v-if="false" cell-class-name :height="400" :data="tableData" :columns="columns" />
  </div>
</template>

<script>

import Md from '~packages/CubeTable/index.md'
import { getData } from '~packages/uitls/mockData.js'

export default {
  name: 'CubeTableX',
  title: 'CubeTable表格',
  components: {
    Md
  },
  data() {
    return {
      tableData: [],
      columns: [
        { label: '选项', type: 'selection' },
        { label: '序号', type: 'index' },
        { label: '姓名', key: 'name' },
        {
          label: 'email',
          key: 'email',
          render: (h, parmas) => {
            const { row } = parmas
            return <span> { row.email } </span>
          }
        },
        {
          label: '公司',
          key: 'email',
          render: (h, parmas) => {
            const { row } = parmas
            return <span> { row.company.name } </span>
          }
        }
      ]
    }
  },
  mounted() {
    setTimeout(_ => {
      this.tableData = getData(10)
    }, 400)
  },
  methods: {
    rowClassName() {},
    cellClassName() {}
  }
}
</script>

