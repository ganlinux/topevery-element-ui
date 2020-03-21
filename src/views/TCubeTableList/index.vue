<template>
  <div>
    <Notice-Bar class="notice"> 前端必学必会-多媒体-本地存储-浏览器与服务器的交互-通信功能 </Notice-Bar>
    <!-- <cube-Table :data="tableData" :columns="columns" /> -->
    <CubeTableList />
  </div>
</template>
<script>
export default {
  name: 'CubeTableListX',
  title: '业务列表组件',
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
            return <span> {row.name} </span>
          }
        },
        { label: '地址', key: 'address' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.notice {
  margin: 10px 0;
}
>>> .CubeTableList {
  .el-table >>> .flex-table-cell-row {
    font-weight: 500;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
    .btn-text {
      font-size: 12px;
      color: #409eff;
      &:active {
        background-color: transparent;
      }
    }
    .delete-text {
      color: #f56c6c;
      &:active {
        background-color: transparent;
      }
    }
  }
}
</style>
