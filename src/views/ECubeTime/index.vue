<template>
  <div>
    {{ time }}

    addItem - {{ AddItemText }}

    <cube-button type="primary" @click="changeStatus">改变配置</cube-button>
    <CubeTime v-model="time" :config="config" />
    <CubeTime v-model="time" :config="config" />

    <add />
    <Md v-if="false" />
  </div>
</template>

<script>

import { addResizeListener } from '@/utils/resize-event'
import debounce from 'throttle-debounce/debounce'

import Md from '~packages/CubeTime/index.md'

import add from './add'

export default {
  name: 'CubeTimeShiliangL',
  componentName: 'CubeTimeShiliangL',
  title: '输入框',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: '日期时间',
    pageName: 'CubeTimeX',
    sort: '1'
  },
  components: {
    Md,
    add
  },
  data() {
    return {
      time: '',
      AddItemText: 'AddItemText',
      config: {
        disabled: false
      }
    }
  },
  created() {
    this.$on('change', this.change)
    console.log(this)
  },
  mounted() {
    this.handleResize = debounce(500, (e) => this.handleResizeLog(e))
    addResizeListener(this.$el, this.handleResize)
  },
  methods: {
    changeStatus() {
      this.config.disabled = !this.config.disabled
    },
    handleResizeLog(e) {
      console.log(e, 'handleResizeLog')
    },
    change(e) {
      console.log('haha shiliangl change')
      console.log(e)
      this.AddItemText = 'change'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
