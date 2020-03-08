<!-- CubeTable  文档页面 -->
<template>
  <div>
    <!-- <Md /> -->
    <Cube-Table :height="200" :data="tableData" :columns="columns" />
  </div>
</template>

<script>

// import Md from '~packages/CubeTable/index.md'
export default {
  name: 'CubeTableX',
  components: {
    // Md
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      columns: [
        {
          label: '选项',
          type: 'selection'
        },
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '姓名',
          key: 'name'
        },
        {
          label: '地址',
          key: 'address'
        }
      ]
    }
  }
}
</script>

