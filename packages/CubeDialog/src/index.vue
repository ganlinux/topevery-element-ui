<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-show="visible"
      class="el-dialog__wrapper"
      :class="fullscreen ? 'fullscreen_wrapper':'' "
      @click.self="handleWrapperClick"
    >
      <div
        :key="key"
        ref="dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        :style="style"
      >
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            v-if="showClose"
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            @click="handleClose"
          >
            <i class="el-dialog__close el-icon el-icon-close" />
          </button>
        </div>
        <div
          v-if="rendered"
          class="el-dialog__body"
          :style="dialogBodyStyle"
        >
          <div class="el-dialog__body__main">
            <div ref="scroll-bar" class="scroll-bar">
              <slot />
            </div>
          </div>
          <div
            v-if="$slots.footer"
            class="el-dialog__footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'element-ui/src/utils/popup'
import Migrating from 'element-ui/src/mixins/migrating'
import emitter from 'element-ui/src/mixins/emitter'
import { debounce } from '@/utils'

export default {
  name: 'CubeDialog',

  mixins: [Popup, emitter, Migrating],

  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '0vh'
    },

    beforeClose: Function,

    center: {
      type: Boolean,
      default: false
    },

    destroyOnClose: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      closed: false,
      key: 0,
      // 高度占屏幕的百分比
      percentage: 0.84,
      maxHeight: 'auto'
    }
  },

  computed: {
    style() {
      const style = {}
      if (!this.fullscreen) {
        style.marginTop = this.top
        if (this.width) {
          style.width = this.width
        }
      }
      return style
    },
    dialogBodyStyle() {
      const { fullscreen, maxHeight } = this
      return fullscreen ? { } : { height: `${maxHeight}` }
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
        if (!this.fullscreen) {
          if (this.resizeHeight) {
            setTimeout(_ => {
              this.computedHeight()
            }, 200)
          } else {
            this.resizeHeight = debounce(() => {
              this.computedHeight()
            }, 200)
            window.addEventListener('resize', this.resizeHeight)
            this.resizeHeight()
          }
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++
          })
        }
      }
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },

  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHeight)
  },
  methods: {
    computedHeight() {
      if (!this.visible) return
      // p判断容器高度是否大于可视区高度
      const { fullscreen } = this
      const innerHieght = window.innerHeight || 400
      const divHieght = this.$refs['scroll-bar'] && this.$refs['scroll-bar'].offsetHeight + 200 || 410
      if (divHieght > innerHieght && !fullscreen) {
        this.maxHeight = (Math.abs(innerHieght) * this.percentage).toFixed(0) + 'px'
      } else {
        // this.maxHeight = `350px`
        this.maxHeight = `auto`
      }
    },

    getMigratingConfig() {
      return {
        props: {
          'size': 'size is removed.'
        }
      }
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) return
      this.handleClose()
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    afterEnter() {
      this.$emit('opened')
    },
    afterLeave() {
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
  .fullscreen_wrapper {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    padding: 18px;
    overflow: auto;
    background: rgba(0, 0, 0, 0.1);
  }
  .el-dialog__body {
    padding: 10px;
    display: flex;
    flex-direction: column;
    .el-dialog__body__main {
      flex: 1;
      overflow: auto;
    }
    .el-dialog__footer {
      padding: 10px;
    }
    .scroll-bar{
      height: 100%;
    }
  }
</style>
