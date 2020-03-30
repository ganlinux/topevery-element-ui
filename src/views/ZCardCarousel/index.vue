<template>
  <div>
    name: 'CardCarouselX',
    title: '测试',

    <cube-Table
      :data="tableData"
      :columns="columns"
    />

  </div>
</template>

<script>
export default {
  name: 'CardCarouselX',
  title: '测试',
  data() {
    return {
      tableData: [
        { date: '2016-05-02', name: '王富贵', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-02', name: '翠花', address: '上海市普陀区金沙江路 1518 弄' }
      ],
      columns: [
        { label: '姓名', key: 'name' },
        { label: '姓名', key: 'name' },
        { label: '姓名', key: 'name' },
        { label: '姓名', key: 'name' },
        { label: '姓名', key: 'name' },
        { label: '姓名', key: 'name' },
        { label: '姓名', key: 'name' },
        { label: '地址', key: 'address', fixed: 'right' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
