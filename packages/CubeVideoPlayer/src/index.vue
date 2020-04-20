<template>
  <div class="cubeCarPlayer-box">
    <!-- <el-button size="mini" type="primary" @click="createPlayer">建立连接</el-button>
    <el-button size="mini" type="danger" plain @click="destroyPlayer">断开</el-button> -->
    <div
      v-if="showTool && showTool"
      class="handler-bar"
    >
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
    </div>

    <div
      v-if="true"
      class="playerTools"
    >
      <div class="playerTool-item flex-box">
        <div class="text">
          请选放模式
        </div>
        <el-select
          v-model="playModel"
          placeholder="选择播放模式"
          size="mini"
        >
          <el-option
            label="实时视频"
            :value="1"
          />
          <el-option
            label="回放视频"
            :value="0"
          />
        </el-select>
      </div>

      <div class="playerTool-item flex-box">
        <el-button
          type="primary"
          size="mini"
        >
          创建连接
        </el-button>
        <el-button
          type="primary"
          size="mini"
        >
          播放实时
        </el-button>
        <el-button
          type="primary"
          size="mini"
        >
          断开连接（销毁）
        </el-button>
      </div>

      <div class="playerTool-item flex-box">
        <el-button
          size="mini"
          type="primary"
          @click="openSpeak"
        >
          开启对讲机
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="closeSpeak"
        >
          关闭对讲机
        </el-button>
      </div>

      <div>
        <div class="playerTool-item flex-box">
          <el-date-picker
            v-model="beginTime2endTime"
            size="mini"
            :clearable="false"
            type="datetimerange"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          />

          <el-button
            type="primary"
            size="mini"
            @click="recordQuery"
          >
            回放视频查询
          </el-button>
        </div>
        <div class="playerTool-item flex-box">
          <div class="text">
            回放列表
          </div>
          <el-select
            v-model="recordPlaySelect"
            style="width:260px"
            placeholder="请选择"
            value-key="keyId"
            size="mini"
          >
            <el-option
              v-for="(item,index) in recordQueryList"
              :key="index"
              :label="item.label"
              :value="item"
            />
          </el-select>
          <el-button
            type="primary"
            size="mini"
            @click="recordOpenPlay"
          >
            回放视频播放
          </el-button>
        </div>
      </div>
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
  name: 'CubeVideoPlayer',
  props: {
    showTool: {
      type: Boolean,
      default: () => true
    },
    carNo: {
      type: String,
      default: () => ''
    },
    device: {
      type: Number,
      default: () => 13302232011
    }
  },
  data() {
    return {
      player: null,
      playModel: 1,
      beginTime2endTime: '',
      playModeOptions: [
        { value: 1, label: '实时播放' },
        { value: 0, label: '历史视频' }
      ],
      playList: [],
      recordPlaySelect: [],
      recordQueryList: [],
      config: {
        baseURL: 'wss://videostream.car900.com/',
        userkey: '2161e23a-4d3b-4d1a-bf0a-cafd56f9c6f8',
        realChannel: '1,2,3,4' // 通道号
      }
    }
  },
  mounted() {
    this.$nextTick().then(_ => {
      this.createPlayer()
    })
  },
  beforeDestroy() {
    const { player } = this
    if (player) this.destroyPlayer()
  },
  methods: {
    guid() {
      function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    },
    createPlayer() {
      const { player, playMode } = this
      const { userkey, baseURL } = this.config
      if (player) this.destroyPlayer()
      const type = !!playMode
      const Byskplayer = window.byskplayer
      if (!Byskplayer) return
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
      // {"device":13302603328,"channel":1,"protocolType":1,"plate":""}
      // const param = { ...params, channel: channelArr[i] }
      // this.player.real.open(tid, param, res => {
      //   console.log(res, '实时视频回调')
      // })
      // this.playList.push({ ...param })
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
      console.log('开启')
      const { device, carNo } = this
      const { realChannel } = this.config
      const channel = realChannel
      const protocolType = 1
      const obj = this.playList.find(p => p.device === device && p.channel === channel)
      if (obj) return // 已经在播放的则不能再播放
      if (this.playList.length) {
        console.log('xx')
      } else {
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
              const param = { ...params, channel: channelArr[i], guid: this.guid(), tid: tid }
              this.player.real.open(tid, param, res => {
                console.log(res, '实时视频回调')
              })
              this.playList.push({ ...param })
            }
          } else if (protocolType === 2) {
            // GA
            this.player.real.open(tidObj.ids, params, res => {
              console.log(res, '实时视频回调')
            })
            this.playList.push(
              ...tidObj.ids.map((p, i) => {
                return { ...params, channel: channelArr[i] }
              })
            )
          }
        } else {
          // 申请失败
          this.$message({ message: tidObj.msg || '视频播放视频', type: 'error' })
        }
      }
    },
    realClose() {
      console.log('关闭')
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
        // this.playList.splice(index, 1)
      }
    },
    openSpeak(e) {
      console.log(e)
    },
    closeSpeak(e) {
      console.log(e)
    },
    recordQuery(e) {
      console.log(e)
    },
    recordOpenPlay(e) {
      console.log(e)
    },
    recordOpenStop(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.cubeCarPlayer-box {
  height: 450px;
  .handler-bar {
    text-align: right;
    margin-bottom: 4px;
  }
}
.main-box {
  width: calc(100% -10px);
  height: 400px;
  padding: 3px;
  border: 1px solid #cccccc;
  background: #47647f;
  #container {
    width: 100%;
    height: calc(100% - 6px);
    display: block;
  }
}
.el-tag {
  cursor: pointer;
  margin: 0 4px;
}

.flex-box {
  display: flex;
  align-items: center;
}
.playerTool-item{
  margin: 10px;
}
</style>
