<template>
  <div :class="wrapClasses">
    <div :class="outerClasses">
      <div :class="innerClasses">
        <div
          :class="bgClasses"
          :style="bgStyle"
        >
          <div
            v-if="textInside"
            class="cube-progress-inner-text"
          >{{ percent }}%</div>
        </div>
        <div
          :class="successBgClasses"
          :style="successBgStyle"
        />
      </div>
    </div>
    <span
      v-if="!hideInfo && !textInside"
      :class="textClasses"
    >
      <slot>
        <span
          v-if="isStatus"
          :class="textInnerClasses"
        >
          <i :class="statusIcon" />
        </span>
        <span
          v-else
          :class="textInnerClasses"
        >
          {{ percent }}%
        </span>
      </slot>
    </span>
  </div>
</template>

<script>

import { oneOf } from '../../uitls/assist'

const prefixCls = 'cube-progress'

export default {
  name: 'ProgressLine',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    successPercent: {
      type: Number,
      default: 0
    },
    status: {
      validator(value) {
        return oneOf(value, ['normal', 'active', 'wrong', 'success'])
      },
      default: 'normal'
    },
    hideInfo: {
      type: Boolean,
      default: false
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    vertical: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    strokeColor: {
      type: [String, Array]
    },
    textInside: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentStatus: this.status
    }
  },
  computed: {
    isStatus() {
      return this.currentStatus === 'wrong' || this.currentStatus === 'success'
    },
    statusIcon() {
      let type = ''
      switch (this.currentStatus) {
        case 'wrong':
          type = 'el-icon-close'
          break
        case 'success':
          type = 'el-icon-check'
          break
      }
      return type
    },
    bgStyle() {
      const style = this.vertical ? {
        height: `${this.percent}%`,
        width: `${this.strokeWidth}px`
      } : {
        width: `${this.percent}%`,
        height: `${this.strokeWidth}px`
      }

      if (this.strokeColor) {
        if (typeof this.strokeColor === 'string') {
          style['background-color'] = this.strokeColor
        } else {
          style['background-image'] = `linear-gradient(to right, ${this.strokeColor[0]} 0%, ${this.strokeColor[1]} 100%)`
        }
      }

      return style
    },
    successBgStyle() {
      return this.vertical ? {
        height: `${this.successPercent}%`,
        width: `${this.strokeWidth}px`
      } : {
        width: `${this.successPercent}%`,
        height: `${this.strokeWidth}px`
      }
    },
    wrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.currentStatus}`,
        {
          [`${prefixCls}-show-info`]: !this.hideInfo && !this.textInside,
          [`${prefixCls}-vertical`]: this.vertical

        }
      ]
    },
    textClasses() {
      return `${prefixCls}-text`
    },
    textInnerClasses() {
      return `${prefixCls}-text-inner`
    },
    outerClasses() {
      return `${prefixCls}-outer`
    },
    innerClasses() {
      return `${prefixCls}-inner`
    },
    bgClasses() {
      return `${prefixCls}-bg`
    },
    successBgClasses() {
      return `${prefixCls}-success-bg`
    }
  },
  watch: {
    percent(val, oldVal) {
      if (val < oldVal) {
        this.handleStatus(true)
      } else {
        this.handleStatus()
      }
    },
    status(val) {
      this.currentStatus = val
    }
  },
  created() {
    this.handleStatus()
  },
  methods: {
    handleStatus(isDown) {
      if (isDown) {
        this.currentStatus = 'normal'
        this.$emit('on-status-change', 'normal')
      } else {
        if (parseInt(this.percent, 10) === 100) {
          this.currentStatus = 'success'
          this.$emit('on-status-change', 'success')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

@css-prefix: cube-;
@font-size-small: 12px;
@progress-prefix-cls: ~"@{css-prefix}progress";

// Color
@primary-color          : #2d8cf0;
@info-color             : #2db7f5;
@success-color          : #19be6b;
@processing-color       : @primary-color;
@warning-color          : #ff9900;
@error-color            : #ed4014;
@normal-color           : #e6ebf1;
@link-color             : #2D8cF0;
@link-hover-color       : tint(@link-color, 20%);
@link-active-color      : shade(@link-color, 5%);
@selected-color         : fade(@primary-color, 90%);
@tooltip-color          : #fff;
@subsidiary-color       : #808695;
@rate-star-color        : #f5a623;

// Animation
@animation-time         : .3s;
@animation-time-quick   : .15s;
@transition-time        : .2s;
@ease-in-out            : ease-in-out;

.@{progress-prefix-cls} {
  display: inline-block;

  width: 100%;
  &-vertical {
    height: 100%;
    width: auto;
  }

  font-size: @font-size-small;
  position: relative;

  &-outer {
    display: inline-block;
    width: 100%;
    margin-right: 0;
    padding-right: 0;
    .@{progress-prefix-cls}-show-info & {
      padding-right: 55px;
      margin-right: -55px;
    }
  }
  &-vertical &-outer {
    height: 100%;
    width: auto;
  }

  &-inner {
    display: inline-block;
    width: 100%;
    background-color: #f3f3f3;
    border-radius: 100px;
    vertical-align: middle;
    position: relative;
    &-text {
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      font-size: 12px;
      margin: 0 6px;
    }
  }
  &-vertical &-inner {
    height: 100%;
    width: auto;
    & > *,
    &:after {
      display: inline-block;
      vertical-align: bottom;
    }

    &:after {
      content: "";
      height: 100%;
    }
  }

  &-bg {
    text-align: right;
    border-radius: 100px;
    background-color: @primary-color;
    transition: all @transition-time linear;
    position: relative;
    &:after {
      content: "";
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }
  &-success-bg {
    border-radius: 100px;
    background-color: @success-color;
    transition: all @transition-time linear;
    position: absolute;
    top: 0;
    left: 0;
  }

  &-text {
    display: inline-block;
    margin-left: 5px;
    text-align: left;
    font-size: 1em;
    vertical-align: middle;
    color: @subsidiary-color;
  }

  &-active {
    .@{progress-prefix-cls}-bg:before {
      content: "";
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      border-radius: 10px;
      animation: ivu-progress-active 2s @ease-in-out infinite;
    }
  }

  &-vertical&-active {
    .@{progress-prefix-cls}-bg:before {
      top: auto;
      animation: ivu-progress-active-vertical 2s @ease-in-out infinite;
    }
  }

  &-wrong {
    .@{progress-prefix-cls}-bg {
      background-color: @error-color;
    }
    .@{progress-prefix-cls}-text {
      color: @error-color;
    }
  }

  &-success {
    .@{progress-prefix-cls}-bg {
      background-color: @success-color;
    }
    .@{progress-prefix-cls}-text {
      color: @success-color;
    }
  }
}

@keyframes ivu-progress-active {
  0% {
    opacity: 0.3;
    width: 0;
  }
  100% {
    opacity: 0;
    width: 100%;
  }
}

@keyframes ivu-progress-active-vertical {
  0% {
    opacity: 0.3;
    height: 0;
  }
  100% {
    opacity: 0;
    height: 100%;
  }
}
</style>
