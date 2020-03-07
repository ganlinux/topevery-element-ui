<template>
  <el-container class="layout">
    <el-container>
      <el-header
        class="layout-header"
        height="56px"
      >
      </el-header>
      <el-aside width="200px">
        <!-- <div @click="isCollapse = !isCollapse"> {{ isCollapse ? '展开' : '收起' }}</div> -->
        <el-menu
          router
          :default-active="$route.name"
          :collapse="isCollapse"
        >
          <el-menu-item
            v-for="(item,index) in routesList"
            :index="item.path"
            :key="index"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <transition
          name="fade-transform"
          mode="out-in"
        >
          <keep-alive>
            <router-view class="page-container" />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>

    <el-backtop
      target=".el-main"
      :bottom="20"
      :right="20"
    >
      <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">
        UP
      </div>
    </el-backtop>
  </el-container>
</template>

<script>

import { routesList } from '@/router'

export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      routesList,
      isCollapse: false,
      tableData: Array(20).fill(item)
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style lang="scss">
.layout {
  height: 100vh;

  .logo {
    height: 56px;
    width: 100%;
  }

  /deep/.el-aside {
    width: 200px;
    position: fixed;
    top: 60px;
    height: 90vh;
    overflow-y: auto;
    .el-menu-item {
      &:after {
        display: none;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: #2f86f6;
      }
      &.is-active:after {
        display: block;
      }
      &.is-active {
        background-color: #ecf5ff;
      }
    }
  }

  /deep/.el-main {
    padding-left: 220px;
  }

  /deep/.el-menu {
    height: 100%;
  }

  /deep/.el-container {
    .el-header {
      z-index: 6;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
      background: #2f86f6;
    }
  }
}

/* mac chrome开启滚动条样式调试 */
::-webkit-scrollbar {
  background: rgba(0, 0, 0, 0);
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: rgba(37, 36, 36, 0.57);
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
</style>
