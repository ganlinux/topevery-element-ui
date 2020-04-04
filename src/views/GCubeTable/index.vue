<!-- CubeTable  文档页面 -->
<template>
  <div>
    <Md />
  </div>
</template>

<script>

import Md from '~packages/CubeTable/index.md'

export default {
  name: 'CubeTableX',
  title: 'CubeTable表格组件',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: 'CubeTable表格组件',
    pageName: 'CubeTable',
    sort: '1'
  },
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
  methods: {
    rowClassName() {},
    cellClassName() {}
  }
}
</script>

