
<template>
  <div
    class="cube-panel-container"
    :class="blockClass"
  >
    <div
      v-if="showTitle"
      class="cube-panel-title"
      :style="titleStyle"
    >
      <div class="left-title-container">
        <slot name="title">
          <span class="cube-panel-title-left" />
          <span>{{ title }}</span>
        </slot>
      </div>
      <div class="right-tool-container">
        <slot name="rightTool">
          <span>
            <i
              v-show="showMinimum&&(!isMaximum)&&(!isMinimum)"
              class="el-icon-minus toolbar"
              @click="toMinimum"
            />
            <i
              v-show="showMaximum&&(!isMaximum)&&(!isMinimum)"
              class="el-icon-full-screen toolbar"
              @click="toMaximum"
            />
            <i
              v-show="isMaximum||isMinimum"
              class="el-icon-crop toolbar"
              @click="toResizBox"
            />
          </span>
        </slot>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <div
        v-show="!isMinimum"
        ref="tcBloclContent"
        class="cube-panel-content"
        :style="contentStyle"
        :class="contentClass"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CubePanel',
  props: {
    title: {
      type: String,
      default: () => ''
    },
    contentStyle: {
      type: String,
      default: () => ''
    },
    contentClass: {
      type: String,
      default: () => ''
    },
    showMinimum: {
      type: Boolean,
      default: () => false
    },
    showMaximum: {
      type: Boolean,
      default: () => false
    },
    fullMode: {
      type: String,
      default: () => 'window',
      validator: (value) => {
        return ['window', 'document'].indexOf(value) !== -1
      }
    },
    shadow: {
      type: String,
      default: () => 'always',
      validator: (value) => {
        return ['always', 'hover', 'never'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      defaultStyleHeight: null,
      titleHeight: 25,
      isMinimum: false,
      isMaximum: false
    }
  },
  computed: {
    titleStyle() {
      return {
        height: this.titleHeight + 'px',
        lineHeight: this.titleHeight + 'px'
      }
    },
    showTitle() {
      if (this.$slots.title !== undefined && this.$slots.title !== null) {
        return true
      }
      return this.title !== '' && this.title !== null && this.title !== undefined
    },
    blockClass() {
      return this.boxShadow + ' ' + this.fullBody
    },
    boxShadow() {
      return this.shadow === 'always' ? 'cube-box-shadow' : 'cube-box-shadow-hover'
    },
    fullBody() {
      const cssNames = []
      if (this.isMaximum) {
        cssNames.push('cube-panel-full')
      }
      if (this.fullMode === 'document' && this.isMaximum) {
        cssNames.push('cube-panel-full-body')
      }
      if (this.fullMode === 'window' && this.isMaximum) {
        cssNames.push('cube-panel-full-window')
      }
      return cssNames.join(' ')
    }
  },
  mounted() {
    this.defaultStyleHeight = this.$el.style.height
  },
  methods: {
    toMinimum() {
      this.isMinimum = true
      this.$el.style.height = '33px'
    },
    toMaximum() {
      this.isMaximum = true
      if (this.fullMode === 'window') {
        const element = this.$el
        const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen
        if (requestMethod) {
          requestMethod.call(element)
        }
      } else if (this.fullMode === 'document') {
        this.$el.style.height = ''
      }
    },
    toResizBox() {
      this.$el.style.height = this.defaultStyleHeight
      if (this.isMaximum && this.fullMode === 'window') {
        const requestMethod = document.exitFullScreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen
        if (requestMethod) {
          requestMethod.call(document)
        }
      }
      this.isMaximum = false
      this.isMinimum = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cube-panel-container {
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  .cube-panel-title {
    zoom: 1;
    padding: 4px;
    font-size: 16px;
    padding-left: 10px;
    border-bottom: 1px solid #ebeef5;
    vertical-align: middle;
    .left-title-container {
      float: left;
    }
    .cube-panel-title-left {
      width: 3px;
      height: 15px;
      margin-top: -2px;
      background: #1379d2;
      border-radius: 25%;
      display: inline-block;
      margin-right: 5px;
      vertical-align: middle;
    }
    .right-tool-container {
      float: right;
      margin-right: 0px;
      .toolbar {
        font-size: 18px;
        cursor: pointer;
        margin-right: 10px;
      }
    }
    &:after {
      content: ".";
      clear: both;
      display: block;
      overflow: hidden;
      font-size: 0;
      height: 0;
    }
  }
  .cube-panel-content {
    padding: 10px;
  }
}
.cube-panel-container:-webkit-full-screen {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
}
.cube-panel-full-body {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  left: 0px;
  z-index: 3001;
}
.cube-panel-full-window {
  overflow: auto;
}
.cube-box-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.cube-box-shadow-hover:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
