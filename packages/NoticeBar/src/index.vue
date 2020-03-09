<template>
  <div
    v-if="isShow"
    class="notice-bar"
    :class="[
      round && 'notice-bar-round',
      type
    ]"
  >
    <div class="notice-bar-left" :class="[(!customLeft) && 'notice-bar-empty']">
      <!-- custom first -->
      <template v-if="customLeft">
        <slot name="left" />
      </template>
    </div>
    <div
      ref="wrap"
      class="notice-bar-content"
      :class="[
        multiRows && 'notice-bar-multi-content'
      ]"
    >
      <!-- <div ref="content" :class="[(overflow && scrollable) && 'notice-bar-content-animate']"> -->
      <div ref="content" :class="[(scrollable) && 'notice-bar-content-animate']">
        <slot />
      </div>
    </div>
    <div class="notice-bar-right">
      <!-- custom first -->
      <template v-if="customRight">
        <slot name="right" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticeBar',
  props: {
    mode: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default' // default/activity/warning
    },
    time: {
      type: Number,
      default: 0
    },
    round: {
      type: Boolean,
      default: false
    },
    multiRows: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    // will be delete in future
    closable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isShow: true,
      overflow: false
    }
  },

  computed: {
    customLeft() {
      return !!this.$slots.left
    },
    customRight() {
      return !!this.$slots.right
    },
    rightIcon() {
      return this.mode === 'link' ? 'arrow-right' : 'close'
    }
  },
  updated() {
    this.checkOverflow()
  },
  mounted() {
    if (this.time) {
      this.hide(this.time)
    }
    this.checkOverflow()
  },
  methods: {
    // MARK: private methods
    hide(time) {
      setTimeout(() => {
        this.isShow = false
      }, time)
    },
    close() {
      if (this.mode === 'closable' || this.closable) {
        this.isShow = false
      }
      this.$emit('close')
    },
    checkOverflow() {
      if (!this.scrollable) {
        return
      }
      const { wrap, content } = this.$refs
      /* istanbul ignore if */
      if (!wrap || !content) {
        return
      }
      /**
       * 计算 padding-left 对宽度的影响
       * 替换 clientWidth 为 getBoundingClientRect
       */
      const paddingLeft =
        window
          .getComputedStyle(content, null)
          .getPropertyValue('padding')
          .split(' ')[3] || '0px'
      const left = +paddingLeft.match(/\d+/g)[0]
      this.overflow = content.scrollWidth - left > Math.ceil(wrap.getBoundingClientRect().width)
    }
  }
}

</script>

<style lang="stylus">
/// notice-bar
notice-bar-fill = rgba(89, 158, 248, .08)
notice-bar-font-size = font-body-normal
notice-bar-color = color-primary
notice-bar-border-radius = 32px
notice-bar-fill-warning = #FFEEEF
notice-bar-color-warning = #FF5B60
notice-bar-fill-activity = #FFEDDE
notice-bar-color-activity = #FF843D
notice-bar-zindex = 999

.notice-bar
  display flex
  z-index notice-bar-zindex
  font-size notice-bar-font-size
  min-height 64px
  background-color notice-bar-fill
  color notice-bar-color
  position relative
  padding-left 32px
  box-sizing border-box
  &.notice-bar-round
    border-radius notice-bar-border-radius
  &.activity
    background-color notice-bar-fill-activity
    color notice-bar-color-activity
  &.warning
    background-color notice-bar-fill-warning
    color notice-bar-color-warning

.notice-bar-left,
.notice-bar-right
  display flex
  align-items center

.notice-bar-left
  padding-right 12px
.notice-bar-right
  padding-right 32px
.notice-bar-empty
  padding-right 0

.notice-bar-content
  flex 1
  margin auto
  width auto
  line-height 64px
  white-space nowrap
  overflow hidden
  &.notice-bar-multi-content
    padding h-gap-md 0
    line-height font-caption-large
    white-space normal
  .notice-bar-content-animate
    padding-left 100%
    display inline-block
    animation notice-bar-animation linear 20s infinite both

@keyframes notice-bar-animation {
  0% {
    transform translate3d(0, 0, 0)
  }
  100% {
    transform translate3d(-100%, 0, 0)
  }
}
</style>
