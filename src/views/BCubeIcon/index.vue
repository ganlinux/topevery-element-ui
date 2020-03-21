<template>
  <div class="container">
    <el-card
      v-for="(item) in iconfontList"
      :key="item.icon_id"
      class="box-card"
      :body-style="{padding: '10px'}"
      @click.native="doCopy(item)"
    >
      <div class="card-inner">
        <i :class="'iconfont icon' + item.font_class" />
        <div class="name">{{ item.name }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>

import iconfont from './iconfont'
export default {
  name: 'CubeIconX',
  title: '图标库',
  data() {
    return {
      iconfontList: iconfont.glyphs
    }
  },
  methods: {
    doCopy(item) {
      const text = 'icon' + item.font_class
      this.$copyText(text).then((e) => {
        this.$message({
          duration: 3500,
          message: '图标代码已复制到剪切板,Ctrl+v即可输入复制图标代码',
          type: 'success'
        })
      }, (e) => {
        console.log(e)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.iconfont {
  color: #297bf5;
}

.el-card {
  cursor: pointer;
  width: 140px;
  display: inline-block;
  margin-left: 20px;
  margin-bottom: 20px;
  .card-inner {
    text-align: center;
    min-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /deep/.name {
      font-size: 12px;
      padding-top: 4px;
    }
    /deep/.iconfont {
      text-align: center;
      font-size: 32px;
      transition: all 0.25s linear, all 0.25s linear;
    }
  }
}

.el-card {
  z-index: 1;
  font-size: inherit;
  font-family: inherit;
  outline: none;
  border: none;
  transition: all 0.25s linear, all 0.25s linear;
}

.el-card:hover {
  // animation: jelly 0.5s;
  // border: 1px solid #297bf5;
  color: #ffffff;
  background: #297bf5;
  .iconfont{
    color: #ffffff;
  }
}

@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}

</style>
