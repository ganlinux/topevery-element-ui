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
        :min-percent="20"
        :default-percent="30"
        split="vertical"
      >
        <template slot="paneL">
          <div style="margin: 10px;">
            <div v-for="(item, index) in 100" :key="index"> 数据 </div>
          </div>
        </template>
        <template slot="paneR">
          <SplitPane split="horizontal">
            <template slot="paneL">
              <div style="margin: 10px;">
                <div v-for="(item, index) in 100" :key="index"> 数据 </div>
              </div>
            </template>
            <template slot="paneR">
              <div style="margin: 10px;">
                <div v-for="(item, index) in 100" :key="index"> 数据 </div>
              </div>
            </template>
          </SplitPane>
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
    borderColor: {
      type: String,
      default: () => '#e5e5e5'
    },
    cubeSplitHeight: {
      type: Number,
      default: () => 500
    },
    calcHeight: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      height: 200
    }
  },
  computed: {
    CubeSplitStyle() {
      // 如果输入高度则取消自动计算高度
      const height = !this.cubeSplitHeight ? `${this.height - 16}px` : `${this.cubeSplitHeight}px`
      return {
        height: height,
        border: `1px solid ${this.borderColor}`
      }
    }
  },
  mounted() {
    // 加载完成后显示提示
    this.showInfo()
  },
  methods: {
    // 显示提示
    showInfo() {
      this.$notify({
        title: '提示',
        message: '在横向或者纵向的分割线上拖拽调整分区大小'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
