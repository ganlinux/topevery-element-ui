<template>
  <div>
    <div class="body">

      <div class="reveal-warp">
        <transition name="el-zoom-in-center">
          <div
            v-if="letters.length"
            ref="reveal"
            class="reveal"
          >
            <span
              v-for="(item,index) in letters"
              :key="index"
              :style="{animationDelay:`${delay + Math.abs(index - middle) * 0.1}s`}"
            > {{ item }} </span>
          </div>
        </transition>
      </div>

      <ul>
        <li class="circle-gauge"><a style="--gauge-max-value: 1000; --gauge-value:665;" /><span>design</span></li>
        <li class="circle-gauge"><a style="--gauge-max-value: 1000; --gauge-value:744" /><span>creativity</span></li>
        <li class="circle-gauge"><a style="--gauge-max-value: 1000; --gauge-value:666" /><span>accessbility</span></li>
        <li class="circle-gauge"><a style="--gauge-max-value: 1000; --gauge-value:800" /><span>content</span></li>
        <li class="circle-gauge text"><a style="--gauge-max-value: 1000; --gauge-value:980" /><span>contentText</span></li>
      </ul>
    </div>
    <md />
  </div>
</template>

<script>

import { initHighlightBlock } from '@/utils'
import md from './index.md'
export default {
  pageConfig: {
    groupsKey: 'Dashboard',
    groupsName: 'Dashboard',
    pageTitle: 'Dashboard',
    pageName: 'Dashboard',
    sort: '1'
  },
  components: {
    md
  },
  data() {
    return {
      delay: 0.3,
      duration: 0.8,
      revealText: '图元科技环卫事业部前端开发小组',
      letters: []
    }
  },
  mounted() {
    setInterval(() => {
      if (this.revealText) {
        this.initText()
      } else {
        this.revealText = '图元科技环卫事业部前端开发小组'
      }
    }, 3800)
    initHighlightBlock(this)
  },
  methods: {
    initText() {
      this.$nextTick().then(_ => {
        this.letters = this.revealText.split('') || []
        this.middle = this.letters.filter(e => e !== ' ').length / 2
        setTimeout(_ => {
          this.letters = []
          this.revealText = ''
        }, 16700)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #222;
}

.reveal-warp {
  height: 40px;
}

.reveal {
  position: relative;
  display: flex;
  color: #6ee1f5;
  font-size: 2em;
  font-family: Raleway, sans-serif;
  letter-spacing: 3px;
  text-transform: uppercase;
  white-space: pre;

  span {
    opacity: 0;
    transform: scale(0);
    animation: fadeIn 2.4s forwards;
  }

  &::before,
  &::after {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    width: 2px;
    height: 100%;
    background: #6ee1f5;
    opacity: 0;
    transform: scale(0);
  }

  &::before {
    left: 50%;
    animation: slideLeft 1.5s cubic-bezier(0.7, -0.6, 0.3, 1.5) forwards;
  }

  &::after {
    right: 50%;
    animation: slideRight 1.5s cubic-bezier(0.7, -0.6, 0.3, 1.5) forwards;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideLeft {
  to {
    left: -6%;
    opacity: 1;
    transform: scale(0.9);
  }
}

@keyframes slideRight {
  to {
    right: -6%;
    opacity: 1;
    transform: scale(0.9);
  }
}

ul {
  display: flex;
  list-style-type: none;
  .circle-gauge {
    $gauge-colors: #e74c3c, #3498db, #2ecc71, #f1c40f;
    // --gauge-max-value: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em;
    @for $i from 1 through 4 {
      &:nth-child(#{$i}) a {
        --percentage: calc(var(--gauge-value) / var(--gauge-max-value) * 100%);
        background: conic-gradient(
          nth($gauge-colors, $i) var(--percentage),
          transparentize(nth($gauge-colors, $i), 0.7) 0
        );
      }
    }

    a {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5em;
      height: 5em;
      font-family: Lato, sans-serif;
      text-decoration: none;
      color: white;
      background: transparent;
      border-radius: 50%;
      counter-reset: value var(--gauge-value);

      &::before {
        position: absolute;
        content: counter(value);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        height: 90%;
        background: #1a1e23;
        border-radius: inherit;
      }
    }
  }

  .text {
    a {
      --percentage2: calc(var(--gauge-value) / var(--gauge-max-value) * 100%);
      background: conic-gradient(
        nth(#14ee6f, 1) var(--percentage2),
        transparentize(nth(#14ee6f, 1), 0.7) 0
      );
    }
  }
  span {
    padding-top: 10px;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
  }
}

</style>
