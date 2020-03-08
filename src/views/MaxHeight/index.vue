<template>
  <div>
    <Md />
    <!-- MaxHeight -->
    <MaxHeight v-model="height">
      <el-table
        :data="tableData"
        style="width: 100%"
        :height="height-40"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
      <el-pagination
        style="text-align: center;margin-top: 4px;"
        background
        layout="total,prev, pager, next"
        :total="1000"
      />
    </MaxHeight>
  </div>
</template>

<script>
const item = {
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}

import Md from '~packages/MaxHeight/index.md'
export default {
  name: 'MaxHeighX',
  components: {
    Md
  },
  data() {
    return {
      height: 0,
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  height: 300px;
}
</style>
