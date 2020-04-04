<template>
  <el-container class="layout">
    <el-container>
      <el-header height="56px">
        <logo v-if="false" /> TopEvery Ui <i
          class="refresh el-icon-refresh"
          @click="getCaptcha"
        />
      </el-header>

      <div class="el-aside-bar">
        <siderBar />
      </div>

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
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        UP
      </div>
    </el-backtop>
  </el-container>
</template>

<script>

import siderBar from './sideBar'
import { menu } from '@/router'
import hljs from 'highlight.js'
import logo from './logo'
import { login, getCaptcha } from '@/api'
import dayjs from 'dayjs'
import { setToken } from '@/utils/auth'

export default {
  components: {
    logo,
    siderBar
  },
  data() {
    return {
      routesList: menu,
      isCollapse: false
    }
  },
  create() {
    this.getCaptcha()
  },
  mounted() {
    this.$nextTick(() => {
      const blocks = document.querySelectorAll('pre code:not(.hljs)')
      Array.prototype.forEach.call(blocks, hljs.highlightBlock)
    })
  },
  methods: {
    login(code) {
      login({ loginName: 'admin', password: '123456', captcha: code }).then(({ data }) => {
        const { access_token } = data
        setToken(access_token)
        localStorage.setItem('token', access_token)
      })
    },
    async getCaptcha() {
      getCaptcha({ t: dayjs().valueOf() }).then(({ data }) => {
        const { code } = data
        this.login(code.toString())
      })
    }
  }
}
</script>

<style lang="scss">
.layout {
  height: 100vh;
  .el-aside-bar {
    width: 200px;
    position: fixed;
    top: 60px;
    height: 90vh;
    overflow-y: auto;
    border-right: 1px solid #ebebeb;
    box-shadow: 0 6px 12px -2px rgba(0, 32, 128, 0.1), 0 0 0 1px #f0f2f7;
    ul {
      font-size: 14px;
      padding: 0px;
      margin: 0;
      li {
        cursor: pointer;
        padding-left: 10px;
        position: relative;

        &:after {
          display: none;
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 100%;
          background: #2f86f6;
          transition: transform 0.5s ease;
        }
        &.is-active:after {
          display: block;
        }
        &.is-active {
          color: #2f86f6;
          background-color: #ecf5ff;
          a {
            color: #2f86f6;
          }
        }
      }
      a {
        color: #7d7d7d;
        display: block;
        padding-bottom: 6px;
        &:hover {
          color: #2f86f6;
        }
      }
    }
  }
  .el-header {
    line-height: 56px;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
  .el-main {
    padding-left: 220px;
    overflow-x: hidden;
  }
  .el-menu {
    height: 100%;
  }
  .el-container {
    .el-header {
      z-index: 6;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
      background: #2f86f6;
    }
  }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
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
.refresh {
  margin-left: 10px;
  cursor: pointer;
}
</style>
