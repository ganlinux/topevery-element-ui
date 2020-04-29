<template>
  <MaxHeight
    v-model="height"
    :calc-height="calcHeight"
    class="CubeSplit"
  >
    <div
      class="maxHeight-inner"
      :style="CubeSplitStyle"
    >
      <SplitPane
        :min-percent="minPercent"
        :default-percent="maxPercent"
        :split="type"
      >
        <template slot="paneL">
          <slot name="left">
            <div v-for="(item, index) in 100" :key="index"> 数据 </div>
          </slot>
        </template>
        <template slot="paneR">
          <slot name="right">
            <div v-for="(item, index) in 100" :key="index"> 数据 </div>
          </slot>
        </template>
      </SplitPane>
    </div>
  </MaxHeight>
</template>

<script>

import SplitPane from 'vue-splitpane'
import MaxHeight from '../../MaxHeight/src'

export default {
  name: 'CubeSplit',
  components: {
    SplitPane,
    MaxHeight
  },
  props: {
    type: {
      type: String,
      default: () => 'vertical' // vertical 水平 horizontal 纵向
    },
    // eslint-disable-next-line vue/require-default-prop
    minPercent: {
      type: Number
      // default: () => 20
    },
    // eslint-disable-next-line vue/require-default-prop
    maxPercent: {
      type: Number
      // default: () => 30
    },
    borderColor: {
      type: String,
      default: () => '#e5e5e5'
    },
    cubeSplitHeight: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      height: 200
    }
  },
  computed: {
    // 如果输入高度则取消自动计算高度
    calcHeight() {
      return !this.cubeSplitHeight
    },
    CubeSplitStyle() {
      // 如果输入高度则取消自动计算高度
      const height = !this.cubeSplitHeight ? `${this.height - 16}px` : `${this.cubeSplitHeight}px`
      return {
        height: height,
        border: `1px solid ${this.borderColor}`
      }
    }
  }
}
</script>

<style lang="scss">
.CubeSplit {
  /deep/.splitter-pane{
    overflow-y: auto;
    overflow-x: hidden;
  }
  /deep/.splitter-pane-resizer {
    background-color: #9b9da0;
  }
  /deep/.splitter-pane-resizer {
    &.vertical {
      width: 8px;
      height: 100%;
      margin-left: -2px;
      border-left: 2px solid hsla(0, 0%, 100%, 0);
      border-right: 2px solid hsla(0, 0%, 100%, 0);
      cursor: col-resize;
    }
    &.horizontal {
      height: 8px;
      margin: -5px 0;
      border-top: 2px solid hsla(0, 0%, 100%, 0);
      border-bottom: 2px solid hsla(0, 0%, 100%, 0);
      cursor: row-resize;
      width: 100%;
    }
  }
}
</style>
