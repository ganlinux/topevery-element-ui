<template>
  <div class="container">

    <div class="search-bar">

      <el-button
        size="mini"
        :type="theme===0? 'primary':'' "
        @click="theme=0"
      >Font class 无颜色</el-button>
      <el-button
        size="mini"
        :type="theme===1? 'primary':''"
        @click="theme=1"
      > Symbol 有颜色</el-button>

      <Cube-Input
        v-model="searchText"
        class="w180"
        @change="searchData"
      />
    </div>

    <div class="list-warp">

      <transition-group
        key="class"
        name="el-zoom-in-center"
      >
        <template v-if="!theme">
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
        </template>

        <transition-group
          v-else
          key="symbol"
        >
          <el-card
            v-for="(item) in iconfontList"
            :key="item.icon_id"
            class="box-card"
            :body-style="{padding: '10px'}"
            @click.native="doCopy(item)"
          >
            <div class="card-inner">
              <!-- <i :class="'iconfont icon' + item.font_class" /> -->
              <svg
                class="icon"
                aria-hidden="true"
              >
                <use :xlink:href=" `#icon${item.font_class}` " />
              </svg>
              <div class="name">{{ item.name }}</div>
            </div>
          </el-card>
        </transition-group>
      </transition-group>

    </div>
  </div>
</template>

<script>

import iconfont from './iconfont'
export default {
  name: 'CubeIconX',
  title: '图标库',
  pageConfig: {
    groupsKey: 'other',
    groupsName: '其他',
    pageTitle: '字体图标库',
    pageName: 'CubeIcon',
    sort: '1'
  },
  data() {
    return {
      theme: 0,
      searchText: '',
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
    },
    searchData(searchText) {
      console.log(searchText, 'xx')
      const { iconfontList } = this
      if (searchText) {
        return iconfontList.filter(function(product) {
          return Object.keys(product.name).some(function(key) {
            return String(product[key]).toLowerCase().indexOf(searchText) > -1
          })
        })
      } else {
        return iconfontList
      }
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
  .iconfont {
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

.container {
  display: flex;
  flex-direction: column;

  .search-bar {
    padding: 6px 0;
    background: #ffffff;
    box-shadow: 0 0 6px 0 rgba(29, 38, 41, 0.07);
  }

  .list-warp {
    margin-top: 10px;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.el-button {
  display: inline-block;
  cursor: pointer;
  user-select: none;
  margin-left: 4px;
}

.w180{
  margin: 0 4px;
}
.icon {
  width: 40px;
  height: 40px;
  fill: currentColor;
  overflow: hidden;
}

/deep/.card-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
