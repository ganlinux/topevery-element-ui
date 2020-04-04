
<template>
  <div class="ndoc-nav">
    <div class="item">
      <div
        v-for="(item, groupindex) in menulist"
        :key="groupindex"
      >
        <div class="group-title">
          {{ item.groupsName }}
        </div>
        <div>
          <div
            v-for="(itemKey, navItemIndex) in item.children"
            :key="navItemIndex"
            class="subitem"
          >
            <router-link
              v-if="item.path ==='/'"
              active-class="active"
              :to="`/${itemKey.path}`"
              v-text="itemKey.title"
            >
              <div v-text="itemKey.title" />
            </router-link>
            <router-link
              v-else
              active-class="active"
              :to="`${item.path}/${itemKey.path}`"
              v-text="itemKey.title"
            >
              <div v-text="itemKey.title" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import { menu } from '@/router'

export default {
  data() {
    return {
      menulist: menu
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  }
}

</script>

<style lang="scss" scoped>
.ndoc-nav {
  left: 0;
  top: 40px;
  bottom: 0;
  z-index: 1;
  position: fixed;
  overflow-y: scroll;
  padding: 25px 0 75px;
  background-color: #fff;
  min-width: 210px;
  max-width: 210px;
  box-shadow: 0 8px 12px #ebedf0;
  border-right: 1px solid #f1f4f8;
  &::-webkit-scrollbar {
    height: 6px;
    width: 6px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(69, 90, 100, .2)
  }
  .item,.subitem {
    a {
      margin: 0;
      display: block;
      color: #455a64;
      padding-left: 30px;
      padding-top: 4px;
      padding-bottom: 4px;
      line-height: 24px;
      transition: all .3s;
      text-decoration:none;
      &.active {
        color: #1989fa;
      }
    }
  }
  .subitem {
    a {
      font-size: 14px;
      &:hover {
        color: #1989fa;
      }
    }
    span {
      font-size: 14px;
    }
  }
  .group-title {
    font-size: 16px;
    line-height: 40px;
    padding-left: 20px;
    color: rgba(69, 90, 100, .6);
  }
  @media (max-width: 1300px) {
    min-width: 220px;
    max-width: 220px;
    .item,
    .subitem {
      a {
        line-height: 22px;
      }
    }
    .subitem {
      a {
        font-size: 13px;
      }
    }
  }
}
</style>
