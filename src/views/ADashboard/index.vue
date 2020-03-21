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
        <li class="circle-gauge"><a style="--gauge-max-value: 1000; --gauge-value:10;" /><span>design</span></li>
        <li class="circle-gauge"><a style="--gauge-max-value: 1000; --gauge-value:744" /><span>creativity</span></li>
        <li class="circle-gauge"><a style="--gauge-max-value: 1000; --gauge-value:666" /><span>accessbility</span></li>
        <li class="circle-gauge"><a style="--gauge-max-value: 1000; --gauge-value:800" /><span>content</span></li>
        <li class="circle-gauge text"><a style="--gauge-max-value: 1000; --gauge-value:980" /><span>contentText</span></li>
      </ul>

      <div class="map-tools">
        <div class="btn-list">
          <div class="btn"> 停止绘制 </div>
          <div class="btn"> 标点 </div>
          <div class="btn"> 画线 </div>
          <div class="btn"> 画面 </div>
          <div class="btn"> 清空所有绘制 </div>
        </div>
        <div class="map-tip"> tip </div>
      </div>
    </div>
    <md />
  </div>
</template>

<script>
import hljs from 'highlight.js'
import md from './index.md'
export default {
  name: 'Dashboard',
  title: 'Dashboard',
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
    this.$nextTick().then(_ => {
      const blocks = document.querySelectorAll('pre code:not(.hljs)')
      Array.prototype.forEach.call(blocks, hljs.highlightBlock)
    })
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

.map-tools {
  height: 44px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  user-select: none;

  .btn-list {
    height: 100%;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px rgba(10, 41, 59, 0.1);
    padding-right: 16px;

    .btn {
      padding-left: 16px;
      font-size: 16px;
      font-weight: 400;
      cursor: pointer;
      :active {
        background: transparent;
        color: transparent;
      }
    }
  }
  .map-tip {
    height: 100%;
    cursor: pointer;
    width: 50px;
    margin-left: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    :active {
      background: transparent;
      color: transparent;
    }
  }
}
</style>
