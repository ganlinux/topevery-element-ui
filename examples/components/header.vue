
<template>
  <div class="headerWrapper">
    <header
      class="header"
      ref="header"
    >
      <div class="container">
        <h1>
          <!-- logo -->
          <img
            @click="openDialog"
            :src="logo"
            alt="logo"
          >
          topevery-element
        </h1>

        <!-- nav -->
        <ul
          class="nav"
          v-if="false"
        >
          <li
            class="nav-item nav-algolia-search"
            v-show="isComponentPage"
          >
            <algolia-search></algolia-search>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/${ lang }/component`"
            >{{ langConfig.components }}
            </router-link>
          </li>
        </ul>
      </div>
    </header>

    <cube-dialog
      title="cookie配置调试"
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
      >
        <el-form-item
          label="key"
          prop="key"
          :rules="[{ required: true, message: '请输入', trigger: 'change' }]"
        >
          <el-input v-model="form.key"></el-input>
        </el-form-item>
        <el-form-item
          label="value"
          prop="value"
          :rules="[{ required: true, message: '请输入', trigger: 'change' }]"
        >
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item
          label="baseURL"
          prop="baseURL"
          :rules="[{ required: true, message: '请输入', trigger: 'change' }]"
        >
          <el-input v-model="form.baseURL"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('form')"
        >确 定</el-button>
      </span>
    </cube-dialog>

  </div>
</template>

<script>

import Cookies from 'js-cookie';
// import { getTestEle } from './theme/loader/api.js';
import AlgoliaSearch from './search.vue';
import compoLang from '../i18n/component.json';
import Element from 'main/index.js';
import themeLoader from './theme/loader';
// import bus from '../bus';
// import { ACTION_USER_CONFIG_UPDATE } from './theme/constant.js';
import logo from '../assets/topImgs/logo.png';

const { version } = Element;

export default {
  data() {
    return {
      logo,
      active: '',
      versions: [],
      version,
      dialogVisible: false,
      verDropdownVisible: true,
      langDropdownVisible: true,
      form: {
        key: 'Ty-Admin-Token',
        baseURL: 'http://221.10.126.230:5002',
        value: ''
      },
      langs: {
        'zh-CN': '中文',
        'en-US': 'English',
        'es': 'Español',
        'fr-FR': 'Français'
      }
    };
  },

  mixins: [themeLoader],

  components: {
    AlgoliaSearch
  },

  computed: {
    lang() {
      return this.$route.path.split('/')[1] || 'zh-CN';
    },
    displayedLang() {
      return this.langs[this.lang] || '中文';
    },
    langConfig() {
      return compoLang.filter(config => config.lang === this.lang)[0]['header'];
    },
    isComponentPage() {
      return /^component/.test(this.$route.name);
    }
  },
  mounted() {
    // getTestEle().then(() => {
    //   this.$isEle = true;
    //   ga('send', 'event', 'DocView', 'Ele', 'Inner');
    // }).catch((err) => {
    //   ga('send', 'event', 'DocView', 'Ele', 'Outer');
    //   console.error(err);
    // });

    // const testInnerImg = new Image();
    // testInnerImg.onload = () => {
    //   this.$isEle = true;
    //   ga('send', 'event', 'DocView', 'Ali', 'Inner');
    // };
    // testInnerImg.onerror = (err) => {
    //   ga('send', 'event', 'DocView', 'Ali', 'Outer');
    //   console.error(err);
    // };
    // testInnerImg.src = `https://private-alipayobjects.alipay.com/alipay-rmsdeploy-image/rmsportal/VmvVUItLdPNqKlNGuRHi.png?t=${Date.now()}`;
  },
  methods: {
    openDialog() {
      const { key } = this.form;
      this.form.value = Cookies.set(key);
      this.form.baseURL = localStorage.getItem('$baseURL') ? JSON.parse(localStorage.getItem('$baseURL')) : 'http://221.10.126.230:5002' ;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { key, value, baseURL } = this.form;
          Cookies.set(key, value);
          this.dialogVisible = false;
          localStorage.setItem('$baseURL', JSON.stringify(baseURL));
          this.$message({ message: '配置成功，正在重新载入...', type: 'success'});
          setTimeout(_=>{
            location.reload();
          }, 2000);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    switchVersion(version) {
      if (version === this.version) return;
      location.href = `${location.origin}/${this.versions[version]}/${location.hash} `;
    },

    switchLang(targetLang) {
      if (this.lang === targetLang) return;
      localStorage.setItem('ELEMENT_LANGUAGE', targetLang);
      this.$router.push(this.$route.path.replace(this.lang, targetLang));
    },

    handleVerDropdownToggle(visible) {
      this.verDropdownVisible = visible;
    },

    handleLangDropdownToggle(visible) {
      this.langDropdownVisible = visible;
    }
  },

  created() {
    // const xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = _ => {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     const versions = JSON.parse(xhr.responseText);
    //     this.versions = Object.keys(versions).reduce((prev, next) => {
    //       prev[next] = versions[next];
    //       return prev;
    //     }, {});
    //   }
    // };
    // xhr.open('GET', '/versions.json');
    // xhr.send();
    // let primaryLast = '#409EFF';
    // bus.$on(ACTION_USER_CONFIG_UPDATE, (val) => {
    //   let primaryColor = val.global['$--color-primary'];
    //   if (!primaryColor) primaryColor = '#409EFF';
    //   const base64svg = 'data:image/svg+xml;base64,';
    //   const imgSet = document.querySelectorAll('h1 img');
    //   imgSet.forEach((img) => {
    //     img.src = `${base64svg}${window.btoa(window.atob(img.src.replace(base64svg, '')).replace(primaryLast, primaryColor))}`;
    //   });
    //   primaryLast = primaryColor;
    // });
  }
};
</script>


<style lang="scss" scoped>
.headerWrapper {
  height: 80px;
}

.header {
  height: 80px;
  background-color: #297efb;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 80px;
  z-index: 100;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(29, 38, 41, 0.07);

  .container {
    height: 100%;
    box-sizing: border-box;

    h1 {
      color: #fff;
      img {
        cursor: pointer;
        position: relative;
        top: 10px;
        margin-left: -60px;
      }
    }
  }

  .nav-lang-spe {
    color: #888;
  }

  h1 {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: normal;

    a {
      color: #333;
      text-decoration: none;
      display: block;
    }

    span {
      font-size: 12px;
      display: inline-block;
      width: 34px;
      height: 18px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      text-align: center;
      line-height: 18px;
      vertical-align: middle;
      margin-left: 10px;
      border-radius: 3px;
    }
  }

  .nav {
    float: right;
    height: 100%;
    line-height: 80px;
    background: transparent;
    padding: 0;
    margin: 0;
    &::before,
    &::after {
      display: table;
      content: "";
    }
    &::after {
      clear: both;
    }
  }

  .nav-gap {
    position: relative;
    width: 1px;
    height: 80px;
    padding: 0 20px;

    &::before {
      content: "";
      position: absolute;
      top: calc(50% - 8px);
      width: 1px;
      height: 16px;
      background: #ebebeb;
    }
  }

  .nav-logo,
  .nav-logo-small {
    vertical-align: sub;
  }

  .nav-logo-small {
    display: none;
  }

  .nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;

    &.nav-algolia-search {
      cursor: default;
    }

    &.lang-item,
    &:last-child {
      cursor: default;
      .nav-lang {
        cursor: pointer;
        display: inline-block;
        height: 100%;
        color: #888;
        &:hover {
          color: #409eff;
        }
        &.active {
          font-weight: bold;
          color: #409eff;
        }
      }
    }

    a {
      text-decoration: none;
      color: #ffffff;
      display: block;
      padding: 0 22px;
      &.active,
      &:hover {
        opacity: 1;
      }
      &.active::after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: calc(50% - 15px);
        width: 30px;
        height: 2px;
        background: #409eff;
      }
    }
  }
}

.nav-dropdown {
  margin-bottom: 6px;
  padding-left: 18px;
  width: 100%;
  span {
    display: block;
    width: 100%;
    font-size: 16px;
    color: #888;
    line-height: 40px;
    transition: 0.2s;
    padding-bottom: 6px;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    transition: 0.2s;
    font-size: 12px;
    color: #979797;
    transform: translateY(-2px);
  }

  .is-active {
    span,
    i {
      color: #409eff;
    }
    i {
      transform: rotateZ(180deg) translateY(3px);
    }
  }

  &:hover {
    span,
    i {
      color: #409eff;
    }
  }
}

.nav-dropdown-list {
  width: auto;
}

@media (max-width: 850px) {
  .header {
    .nav-logo {
      display: none;
    }
    .nav-logo-small {
      display: inline-block;
    }
    .nav-item {
      margin-left: 6px;

      &.lang-item,
      &:last-child {
        margin-left: 10px;
      }

      a {
        padding: 0 5px;
      }
    }
    .nav-theme-switch,
    .nav-algolia-search {
      display: none;
    }
  }
}

@media (max-width: 700px) {
  .header {
    .container {
      padding: 0 12px;
    }
    .nav-item {
      a {
        font-size: 12px;
        vertical-align: top;
      }

      &.lang-item {
        height: 100%;

        .nav-lang {
          display: flex;
          align-items: center;

          span {
            padding-bottom: 0;
          }
        }
      }
    }
    .nav-dropdown {
      padding: 0;
      span {
        font-size: 12px;
      }
    }
    .nav-gap {
      padding: 0 8px;
    }
    .nav-versions {
      display: none;
    }
  }
}
</style>
