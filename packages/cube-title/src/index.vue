<!--
 * @Author: shiliangL
 * @Date: 2020-05-22 11:51:38
 * @LastEditTime: 2020-06-09 20:54:28
 * @LastEditors: Do not edit
 * @Description: 
 * @FilePath: /topevery-element-ui-v2/packages/cube-title/src/index.vue
--> 
<template>
  <div class="cube-title">
    <div
      class="cube-title-top"
      v-if="$slots.title"
    >
      <div class="title tag">
        <slot
          name="title"
          class="title-name"
        />
      </div>
      <div class="title-right">
        <slot name="right" />
        <div
          @click="visible=!visible"
          class="canCollapse"
          v-if="canCollapse"
        >
          <span class="collapse-text"> {{ visible ? '收起' :'展开'}} </span>
          <i
            :class="visible?'is-active':''"
            class="el-collapse-item__arrow el-icon-arrow-right"
          ></i>
        </div>
      </div>
    </div>

    <transition name="el-zoom-in-top">
      <div
        v-show="visible"
        class="cube-title-content"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'CubeTitle',
  props: {
    canCollapse: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      visible: true
    };
  }
};
</script>
 