<template>
  <main style="text-align: center;">

    <section>
      <figure>
        <chart
          ref="bar"
          :options="bar"
          :init-options="initOptions"
          theme="ovilia-green"
          autoresize
          @zr:click="handleZrClick"
          @click="handleClick"
        />
      </figure>
      <p v-if="seconds <= 0"><small>Loaded.</small></p>
      <p v-else>
        <small>Data coming in <b>{{ seconds }}</b> second{{ seconds > 1 ? 's' : '' }}...</small>
      </p>
      <p><button
        :disabled="seconds > 0"
        @click="refresh"
      >Refresh</button></p>
    </section>

    <section>
      <figure>
        <chart
          ref="pie"
          :options="pie"
          :init-options="initOptions"
          autoresize
        />
      </figure>
    </section>

    <section>
      <figure>
        <chart
          :options="scatter"
          :init-options="initOptions"
          autoresize
        />
      </figure>
    </section>

    <section>
      <figure>
        <chart
          :options="scoreRadar"
          :init-options="initOptions"
          autoresize
        />
      </figure>
      <p>
        <select v-model="metricIndex">
          <option
            v-for="(metric, index) in metrics"
            :key="index"
            :value="index"
          >{{ metric }}
          </option>
        </select>
        <button
          :disabled="isMax"
          @click="increase(1)"
        >Increase</button>
        <button
          :disabled="isMin"
          @click="increase(-1)"
        >Decrease</button>
        <input
          id="async"
          v-model="asyncCount"
          type="checkbox"
        >
        <label for="async">Async</label>
      </p>
    </section>

    <section>
      <figure class="half">
        <chart
          ref="c1"
          :options="c1"
          :init-options="initOptions"
          group="radiance"
          autoresize
        />
      </figure>

      <figure class="half">
        <chart
          ref="c2"
          :options="c2"
          :init-options="initOptions"
          group="radiance"
          autoresize
        />
      </figure>
      <p>
        <label>
          <input
            v-model="connected"
            type="checkbox"
          >
          Connected
        </label>
      </p>
    </section>

    <aside class="renderer">
      <button
        :class="{
          active: initOptions.renderer === 'canvas'
        }"
        @click="initOptions.renderer = 'canvas'"
      >
        Canvas
      </button>
      <button
        :class="{
          active: initOptions.renderer === 'svg'
        }"
        @click="initOptions.renderer = 'svg'"
      >
        SVG
      </button>
    </aside>
  </main>
</template>

<script>
/* eslint-disable no-console */
import qs from 'qs'
import ECharts from './Echarts'
// custom theme
import theme from './theme.json'
// registering custom theme
ECharts.registerTheme('ovilia-green', theme)

/* eslint-disable no-console */
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataset'
import 'zrender/lib/svg/svg'

import getBar from './data/bar'
import pie from './data/pie'
import polar from './data/polar'
import scatter from './data/scatter'
import { c1, c2 } from './data/connect'
import store from './store'

export default {
  name: 'WCubeChartX',
  title: 'Chart图表相关',
  components: {
    chart: ECharts
  },
  store,
  data() {
    const options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      options,
      bar: getBar(),
      pie,
      polar,
      scatter,
      c1,
      c2,
      expand: {
        bar: true,
        pie: true,
        polar: true,
        scatter: true,
        map: true,
        radar: true,
        connect: true,
        flight: true
      },
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
      polarTheme: 'dark',
      seconds: -1,
      asyncCount: false,
      connected: true,
      metricIndex: 0,
      open: false,
      img: {},
      flightLoaded: false,
      flightOptions: null
    }
  },
  computed: {
    scoreRadar() {
      return this.$store.getters.scoreRadar
    },
    metrics() {
      return this.$store.state.scores.map(({ name }) => name)
    },
    isMax() {
      const { value, max } = this.$store.state.scores[this.metricIndex]
      return value === max
    },
    isMin() {
      return this.$store.state.scores[this.metricIndex].value === 0
    }
  },
  watch: {
    connected: {
      handler(value) {
        ECharts[value ? 'connect' : 'disconnect']('radiance')
      },
      immediate: true
    },
    'initOptions.renderer'(value) {
      this.options.renderer = value === 'svg' ? value : undefined
      let query = qs.stringify(this.options)
      query = query ? '?' + query : ''
      history.pushState(
        {},
        document.title,
        `${location.origin}${location.pathname}${query}${location.hash}`
      )
    }
  },
  mounted() {
    this.$nextTick().then(_ => {
      let dataIndex = -1
      const pie = this.$refs.pie
      const dataLen = pie.options.series[0].data.length
      setInterval(() => {
        pie.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex
        })
        dataIndex = (dataIndex + 1) % dataLen
        pie.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex
        })
        // 显示 tooltip
        pie.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex
        })
      }, 4000)
    })
  },
  methods: {
    handleClick() {
      console.log('click from echarts')
    },
    handleZrClick() {
      console.log('click from zrender')
    },
    refresh() {
      // simulating async data from server
      this.seconds = 3
      const bar = this.$refs.bar
      bar.showLoading({
        text: 'Loading…',
        color: '#4ea397',
        maskColor: 'rgba(255, 255, 255, 0.4)'
      })
      const timer = setInterval(() => {
        this.seconds--
        if (this.seconds === 0) {
          clearTimeout(timer)
          bar.hideLoading()
          this.bar = getBar()
        }
      }, 1000)
    },
    toggleRenderer() {
      if (this.initOptions.renderer === 'canvas') {
        this.initOptions.renderer = 'svg'
      } else {
        this.initOptions.renderer = 'canvas'
      }
    },
    convert() {
      const map = this.$refs.map
      const { width, height } = map
      this.img = {
        src: map.getDataURL({
          pixelRatio: window.devicePixelRatio || 1
        }),
        width,
        height
      }
      this.open = true
    },
    increase(amount) {
      if (!this.asyncCount) {
        this.$store.commit('increment', { amount, index: this.metricIndex })
      } else {
        this.$store.dispatch('asyncIncrement', {
          amount,
          index: this.metricIndex,
          delay: 500
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.desc {
  margin-bottom: 3em;
  color: #7f8c8d;
}

.attr {
  color: #e96900;
}

.val {
  color: #42b983;
}

footer {
  margin: 5em 0 3em;
  font-size: 0.5em;
  vertical-align: middle;

  a {
    display: inline-block;
    margin: 0 5px;
    padding: 3px 0 6px;
    color: #7f8c8d;
    font-size: 2em;
    text-decoration: none;
  }

  a:hover {
    padding-bottom: 3px;
    border-bottom: 3px solid #42b983;
  }
}

button {
  border: 1px solid #4fc08d;
  border-radius: 2em;
  background-color: #fff;
  color: #42b983;
  cursor: pointer;
  font: inherit;
  transition: opacity 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 1px #4fc08d;
  }

  &:active {
    background: rgba(79, 192, 141, 0.2);
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.round {
    width: 1.6em;
    height: 1.6em;
    position: relative;

    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 9px;
      height: 1px;
      background-color: #42b983;
    }

    &::after {
      width: 1px;
      height: 9px;
    }

    &.expand::after {
      display: none;
    }
  }
}

button, label {
  font-size: 0.75em;
}

figure {
  display: inline-block;
  position: relative;
  margin: 2em auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.2);
  padding: 1.5em 2em;
  min-width: calc(40vw + 4em);

  .echarts {
    width: 100%;
    min-width: 400px;
    height: 300px;
  }
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;

  &.open {
    display: block;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #404a59;
    max-width: 80vw;
    border: 2px solid #fff;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  }
}

@media (min-width: 980px) {
  figure.half {
    padding: 1em 1.5em;
    min-width: calc(240px + 3em);

    .echarts {
      width: 28vw;
      min-width: 240px;
      height: 180px;
    }

    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}

@media (max-width: 980px) {
  p {
    display: flex;
    justify-content: center;

    select {
      text-indent: calc(50% - 1em);
    }

    select, label {
      border: 1px solid #4fc08d;
      border-radius: 2em;
      background-color: #fff;
      color: #42b983;
      cursor: pointer;
      transition: opacity 0.3s;
    }

    button, input, select, label {
      flex: 1 0;
      margin: 0 0.5em;
      padding: 0;
      line-height: 2.4em;
      max-width: 40vw;
      border-radius: 2px;
      font-size: 0.8em;
    }

    select {
      -webkit-appearance: none;
    }

    input[type='checkbox'] {
      display: none;

      &:checked + label {
        background: #42b983;
        color: #fff;
      }
    }
  }

  figure {
    width: 100vw;
    margin: 1em auto;
    padding: 0 1em;
    border: none;
    border-radius: 0;
    box-shadow: none;

    .echarts {
      width: 100%;
      min-width: 0;
      height: 75vw;
    }
  }
}

.renderer {
  position: fixed;
  top: 70px;
  left: 230px;
  font-size: 12px;
  text-align: center;

  button {
    float: left;
    position: relative;
    width: 48px;
    border-radius: 4px;

    &.active {
      z-index: 1;
      background-color: #4fc08d;
      color: #fff;
    }

    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child {
      left: -1px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
