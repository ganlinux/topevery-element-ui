
<template>
  <div
    class="side-nav"
    @mouseenter="isFade = false"
    :class="{ 'is-fade': isFade }"
    :style="navStyle"
  >
    <ul>
      <li
        class="nav-item"
        v-for="(item, key) in data"
        :key="key"
      >
        <ul
          class="pure-menu-list sub-nav"
          v-if="item.children"
        >
          <li
            class="nav-item"
            v-for="(navItem, key) in item.children"
            :key="key"
          >
            <router-link
              class=""
              active-class="active"
              :to="base + navItem.path"
              exact
              v-text="navItem.title || navItem.name"
            >
            </router-link>
          </li>
        </ul>
        <template v-if="item.groups">
          <div
            class="nav-group"
            v-for="(group, key) in item.groups"
            :key="key"
          >
            <div
              class="nav-group__title"
              @click="expandMenu"
            >
              <span class="group__title__name">
                {{group.groupName}}
                <span
                  v-if="group.new"
                  class="group__title_new"
                >new</span>
              </span>
            </div>
            <ul class="pure-menu-list">
              <li
                class="nav-item"
                v-for="(navItem, key) in group.list"
                v-show="!navItem.disabled"
                :key="key"
              >
                <router-link
                  active-class="active"
                  :to="base + navItem.path"
                  exact
                  v-text="navItem.title"
                ></router-link>
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
    <!--<div id="code-sponsor-widget"></div>-->
  </div>
</template>
<script>
import bus from '../bus';
import compoLang from '../i18n/component.json';

export default {
  props: {
    data: Array,
    base: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      highlights: [],
      navState: [],
      isSmallScreen: false,
      isFade: false
    };
  },
  watch: {
    '$route.path'() {
      this.handlePathChange();
    },
    isFade(val) {
      bus.$emit('navFade', val);
    }
  },
  computed: {
    navStyle() {
      const style = {};
      if (this.isSmallScreen) {
        style.paddingBottom = '60px';
      }
      return style;
    },
    lang() {
      return this.$route.meta.lang;
    },
    langConfig() {
      return compoLang.filter(config => config.lang === this.lang)[0]['nav'];
    }
  },
  methods: {
    handleResize() {
      this.isSmallScreen = document.documentElement.clientWidth < 768;
      this.handlePathChange();
    },
    handlePathChange() {
      if (!this.isSmallScreen) {
        this.expandAllMenu();
        return;
      }
      this.$nextTick(() => {
        this.hideAllMenu();
        let activeAnchor = this.$el.querySelector('a.active');
        let ul = activeAnchor.parentNode;
        while (ul.tagName !== 'UL') {
          ul = ul.parentNode;
        }
        ul.style.height = 'auto';
      });
    },
    hideAllMenu() {
      [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
        ul.style.height = '0';
      });
    },
    expandAllMenu() {
      [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
        ul.style.height = 'auto';
      });
    },
    expandMenu(event) {
      if (!this.isSmallScreen) return;
      let target = event.currentTarget;
      if (!target.nextElementSibling || target.nextElementSibling.tagName !== 'UL') return;
      this.hideAllMenu();
      event.currentTarget.nextElementSibling.style.height = 'auto';
    }
  },
  created() {
    bus.$on('fadeNav', () => {
      this.isFade = true;
    });
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>


<style lang="scss">
.side-nav {
  width: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  transition: opacity 0.3s;
  &.is-fade {
    transition: opacity 3s;
  }

  li {
    list-style: none;
  }

  ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  > ul > .nav-item > a {
    margin-top: 15px;
  }

  > ul > .nav-item:nth-child(-n + 4) > a {
    margin-top: 0;
  }

  .nav-item {
    a {
      font-size: 16px;
      color: #333;
      line-height: 30px;
      height: 30px;
      margin: 0;
      padding: 0;
      text-decoration: none;
      display: block;
      position: relative;
      transition: 0.15s ease-out;
      font-weight: bold;

      &.active {
        color: #409eff;
      }
    }

    .nav-item {
      a {
        display: block;
        height: 30px;
        color: #444;
        line-height: 30px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: normal;

        &:hover,
        &.active {
          color: #409eff;
        }
      }
    }

    &.sponsors {
      & > .sub-nav {
        margin-top: -10px;
      }

      & > a {
        color: #777;
        font-weight: 300;
        font-size: 14px;
      }

      .nav-item {
        display: inline-block;

        a {
          height: auto;
          display: inline-block;
          vertical-align: middle;
          margin: 8px 12px 12px 0;
          img {
            width: 42px;
          }
        }

        &:first-child a img {
          width: 36px;
        }
      }
    }
  }

  .nav-group__title {
    position: relative;
    font-size: 16px;
    color: #999;
    line-height: 26px;
    margin-top: 15px;
    font-weight: 400;
    .group__title__name {
      display: inline-block;
      position: relative;
    }
    .group__title_new {
      position: absolute;
      right: -36px;
      top: -6px;
      background-color: #ed4444;
      border-radius: 10px;
      color: #fff;
      display: inline-block;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
      padding: 0 6px;
      text-align: center;
      white-space: nowrap;
      border: 1px solid #fff;
    }
  }

  #code-sponsor-widget {
    margin: 0 0 0 -20px;
  }
}
.nav-dropdown-list {
  width: 120px;
  margin-top: -8px;
  li {
    font-size: 14px;
  }
}
</style>