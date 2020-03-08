<template>
  <cube-Table :data="tableData" :columns="columns" />
</template>
<script>
export default {
  name: 'CubeTableListX',
  data() {
    return {
      tableData: [
        { date: '2016-05-02', name: '王富贵', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-02', name: '王富贵', address: '上海市普陀区金沙江路 1518 弄' }
      ],
      columns: [
        { label: '选项', type: 'selection' },
        { label: '序号', type: 'index' },
        { label: '姓名', key: 'name' },
        {
          label: '性别',
          key: 'name',
          render: (h, parmas) => {
            const { row } = parmas
            return <span> { row.name } </span>
          }
        },
        { label: '地址', key: 'address' }
      ]
    }
  }
}
</script>
