<template>
  <div>
    构建开发中
    顶部操作工具栏
    <Select-Bar
      v-model="playMode"
      style="width:120px"
      :options="playModeOptions"
      placeholder="请选择"
    />
    <el-button
      size="mini"
      type="primary"
      @click="createPlayer"
    >建立连接</el-button>
    <el-button
      size="mini"
      type="danger"
      plain
      @click="destroyPlayer"
    >断开</el-button>
    <div>
      实时视频操作区域
      <el-button
        size="mini"
        type="primary"
        @click="realHandlerPlay(1)"
      >播放</el-button>
      <el-button
        size="mini"
        type="danger"
        plain
        @click="realHandlerPlay(0)"
      >停止</el-button>

      <el-button
        size="mini"
        type="primary"
        @click="realHandlerMai(1)"
      >开启对讲</el-button>
      <el-button
        size="mini"
        type="danger"
        plain
        @click="realHandlerMai(2)"
      >关闭对讲</el-button>

    </div>
    <div>
      历史视频操作区域
    </div>
    <div v-if="player">
      <el-tag v-for="(item) in 9" :key="item" size="mini" @click="setPlayerNum(item)"> {{ item }}</el-tag>
    </div>
    <div
      ref="container"
      class="main-box"
    >
      <div id="container" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WChartBar',
  title: '图表相关组件',
  props: {
    carNo: {
      type: String,
      default: () => 'AE86'
    },
    device: {
      type: Number,
      default: () => 13302603328
    }
  },
  data() {
    return {
      player: null,
      playMode: 1,
      playModeOptions: [
        { value: 1, label: '实时播放' },
        { value: 0, label: '历史视频' }
      ],
      playList: [],
      config: {
        baseURL: 'wss://videostream.car900.com/', // 视频服务 websocket 地址
        userkey: 'a2c051ae-a311-49f9-93a4-4f5f2fd2ebbe', // 用户key
        realChannel: '1,2,3,4' // 通道号
      }
    }
  },
  mounted() {
    // this.createPlayer()
  },
  methods: {
    createPlayer() {
      const { player, playMode } = this
      const { userkey, baseURL } = this.config

      console.log(player)
      if (player) this.destroyPlayer()

      console.log(player, 'xxx-----player')
      const type = !!playMode
      this.player = new Byskplayer({
        id: 'container',
        isReal: type,
        isRecord: !type,
        userId: 'apidemo',
        userkey,
        baseURL,
        click: this.onPlayClick,
        playstart: this.onPlayStart,
        playend: this.onPlayEnd,
        snapshot: this.onSnapshot,
        message: this.onMessage
      })
      console.log('byskplayer.js version: ' + this.player.version)
      // player.poster = '/poster.png' // 设置预览图片
      this.player.setPlayerNum(4) // 设置视频画面
    },
    destroyPlayer() {
      if (this.$refs['container']) this.$refs['container'].innerHTML = '<div id="container" />'
      const { player } = this
      if (player) player.destroy()
      this.player = null
    },
    setPlayerNum(item) {
      const { player } = this
      if (player) this.player.setPlayerNum(item)
    },
    onPlayClick(e) {
      console.log(e, 'onPlayClick')
    },
    playstart(e) {
      console.log(e, 'playstart')
    },
    playend(e) {
      console.log(e, 'playend')
    },
    snapshot(e) {
      console.log(e, 'snapshot')
    },
    message(e) {
      console.log(e, 'message')
    },
    realHandlerMai(e) {
      console.log(e, 'realHandlerMai')
    },
    realHandlerPlay(e) {
      e ? this.realOpen() : this.realClose()
    },
    // 实时播放视频
    realOpen() {
      const { device, carNo } = this
      const { realChannel } = this.config
      const channel = realChannel
      const protocolType = 1
      const obj = this.playList.find(p => p.device === device && p.channel === channel)
      if (obj) return // 已经在播放的则不能再播放
      const channelArr = channel.split(',').map(p => p * 1)
      // 根据通道数申请播放窗口
      const tidObj = this.player.allocate(channelArr.length)
      // let tidObj = player.allocate(1); //申请一个视频播放器
      if (!tidObj) return
      if (tidObj.flag === 1) {
        // 申请成功
        const params = {
          device: device, // 终端号
          channel: channel, // 通道号 （1~8）
          protocolType: protocolType, // 协议类型，1：GF-1078，2：GA系列
          plate: carNo // 车牌号（可选）
        }
        if (protocolType === 1) {
          // 1078
          for (let i = 0; i < channelArr.length; i++) {
            const tid = tidObj.ids[i]
            const param = { ...params, channel: channelArr[i] }
            this.player.real.open(tid, param, res => {
              console.log(res, '实时视频回调')
            })
            this.playList.push({ ...param })
          }
        } else if (protocolType === 2) {
          // GA
          this.player.real.open(tidObj.ids, params, res => {
            console.log(res)
          })
          this.playList.push(
            ...tidObj.ids.map((p, i) => {
              return {
                ...params,
                channel: channelArr[i]
              }
            })
          )
        }
      } else {
        // 申请失败
        alert(obj.msg)
      }
    },
    realClose() {
      const { device } = this
      const { realChannel } = this.config
      const channel = realChannel
      const channelArr = channel.split(',').map(p => p * 1)
      for (let i = 0; i < channelArr.length; i++) {
        const index = this.playList.findIndex(p => p.device === device && p.channel === channelArr[i])
        const obj = this.playList[index]
        if (obj) {
          this.player.real.close(
            obj.tid, { device: obj.device, channel: obj.channel, protocolType: obj.protocolType },
            res => { console.log(res) }
          )
        }
        this.playList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-box {
  width: calc(100% - 300px);
  height: 500px;
  padding: 3px;
  border: 1px solid #cccccc;
  background: #47647F;
  #container {
    width: 100%;
    height: calc(100% - 6px);
    display: block;
  }
}
.el-tag{
  cursor: pointer;
  margin: 0 4px;
}
</style>
