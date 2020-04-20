<template>
  <div class="PlayerVideoBox">
    <div class="flex-box-warp">
      <div ref="box" v-loading="fetchMapLoading" class="box">
        <div id="PlayerBox" />
      </div>
      <div v-if="false" class="playerTools">
        <div class="playerTool-item flex-box">
          <div class="text">
            请选放模式
          </div>
          <el-select v-model="playModel" placeholder="选择播放模式" value-key="begintime">
            <el-option label="实时视频" :value="true" />
            <el-option label="回放视频" :value="false" />
          </el-select>
        </div>

        <div class="playerTool-item flex-box">
          <el-button type="primary" @click="createPlayer">
            创建连接
          </el-button>
          <el-button type="primary" @click="openLive">
            播放实时
          </el-button>
          <el-button type="primary" @click="destroy">
            断开连接（销毁）
          </el-button>
        </div>

        <div class="playerTool-item flex-box">
          <el-button type="primary" @click="openSpeak">
            开启对讲机
          </el-button>
          <el-button type="primary" @click="closeSpeak">
            关闭对讲机
          </el-button>
        </div>

        <div>
          <div class="playerTool-item">
            <el-date-picker
              v-model="beginTime2endTime"
              :clearable="false"
              type="datetimerange"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            />

            <el-button type="primary" @click="recordQuery">
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
            >
              <el-option
                v-for="(item,index) in recordQueryList"
                :key="index"
                :label="item.label"
                :value="item"
              />
            </el-select>
            <el-button type="primary" @click="recordOpenPlay">
              回放视频播放
            </el-button>
            <el-button type="primary" @click="recordOpenStop">
              回放视频播放
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomID } from '@/utils'
import dayjs from 'dayjs'

export default {
  name: 'CubeVideoPlayer',
  props: {
    playModel: {
      type: Boolean,
      default: () => true // true 实时  false 回放
    },
    immediateLoad: { // 是否初始化完毕自动播放
      type: Boolean,
      default: () => false
    },
    // 必传设备号
    device: {
      type: [Number, String],
      // required: true,
      default: () => 13302232011
    }
  },
  data() {
    return {
      beginTime2endTime: [
        dayjs().format('YYYY-MM-DD') + ' 00:00:00',
        dayjs().format('YYYY-MM-DD hh:mm:ss')
      ],
      recordPlaySelect: null,
      fetchMapLoading: false,
      realChannel: '1,2,3,4', // 通道号
      realProtocol: 1, // 协议类型
      begintime: '',
      endtime: '',
      config: {
        id: 'PlayerBox',
        isReal: this.playModel,
        isRecord: !this.playModel,
        userId: 'apidemo',
        baseURL: 'wss://videostream.car900.com/',
        userkey: '2161e23a-4d3b-4d1a-bf0a-cafd56f9c6f8'
        // userLevel: 1
      },
      playList: [], // 正在播放列表
      recordQueryList: [], // 正在播放列表
      valueOne: null
    }
  },
  watch: {
    playModel: {
      immediate: true,
      handler(value) {
        this.createPlayer()
        console.log(this.playModel, 'playModel-playModel')
      }
    }
  },
  beforeDestroy() {
    console.log('beforeDestroy', '视频播放销毁之前')
    this.destroy()
  },
  methods: {
    destroy() {
      if (this.player) this.player.destroy()
      this.$refs['box'].innerHTML = '<div id="PlayerBox" />'
      this.playList = []
    },
    createPlayer() {
      if (this.player) this.destroy()
      setTimeout(() => {
        const Byskplayer = window.byskplayer
        this.config.isReal = !!this.playModel
        this.config.isRecord = !this.playModel
        this.player = new Byskplayer(this.config)
        // 设置自动关闭视频时间 0 不会主动关闭
        this.player.onCloseTimeChange = 0
        this.player.setPlayerNum(4) // 测试发现没有这个语言功能无效
        // const img = require('@/assets/overview/waitting.png')
        // this.player.poster = img // 设置预览图片
        if (this.immediateLoad) {
          setTimeout(() => {
            this.playModel && this.openLive()
          }, 1000)
        }
      }, 200)
    },
    // 实时播放
    openLive() {
      if (!this.player) return
      if (!this.player.allocate) return
      const device = this.device * 1
      const channel = this.realChannel // '1,2,3,4', // 通道号
      const protocolType = Number(this.realProtocol)
      const obj = this.playList.find(
        p => p.device === device && p.channel === channel
      )
      if (obj) return // 已经在播放的则不能再播放
      const channelArr = channel.split(',').map(p => p * 1) // 几个格子视频窗口
      const tidObj = this.player.allocate(channelArr.length) // 根据通道数申请
      // let tidObj = player.allocate(1); //申请一个视频播放器
      if (tidObj.flag === 1) {
        // 申请成功
        const params = {
          device: device, // 终端号
          channel: channel, // 通道号 （1~8） '1,2,3,4', // 通道号
          protocolType: protocolType, // 协议类型，1：GF-1078，2：GA系列
          plate: 'carNo', // 车牌号（可选）
          vehicleId: '4321', // 车辆Id（可选）
          groupId: '1' // 车辆所属车组ID（可选）
        }
        if (protocolType === 1) {
          // 1078
          for (let i = 0; i < channelArr.length; i++) {
            const tid = tidObj.ids[i]
            const param = { ...params, channel: channelArr[i] }
            this.player.real.open(tid, param, res => {
              console.log(res, 'this.player.real.open cb')
            })
            this.playList.push({ ...param })
          }
        } else if (protocolType === 2) {
          // GA
          this.player.real.open(tidObj.ids, params, res => {
            console.log(res, 'this.player.real.open cb')
          })
          this.playList.push(
            ...tidObj.ids.map((p, i) => {
              return { ...params, channel: channelArr[i] }
            })
          )
        }
      } else {
        // 申请失败
        this.$message({ message: obj.msg, type: 'warning' })
      }
    },
    // 回放视频查询
    recordQuery() {
      if (
        Array.isArray(this.beginTime2endTime) &&
        this.beginTime2endTime.length
      ) {
        const begintime = new Date(this.beginTime2endTime[0]).getTime() / 1000
        const endtime = new Date(this.beginTime2endTime[1]).getTime() / 1000
        const channel = 1
        const protocolType = Number(this.realProtocol)
        const params = {
          device: this.device * 1, // 终端号
          channel: channel, // 通道号
          protocolType: protocolType, // 协议类型，1：GF-1078，2：GA系列
          begintime: begintime, // 开始时间（时间戳，精确至秒）
          endtime: endtime, // 结束时间（时间戳，精确至秒）
          alarmSign: 0 // 报警类型（目前只支持：0）
        }
        console.log(params, '查询参数')
        this.fetchMapLoading = true
        this.player.record.query(params, res => {
          console.log(res, 'sssmsmsmsm')

          this.fetchMapLoading = '视频完毕'
          if (res.status === 1) {
            this.loadfile(res.recordfiles)
            this.fetchMapLoading = false
          } else {
            this.fetchMapLoading = false
            this.$message({ message: res.info, type: 'warning' })
          }
        })
      }
    },
    // 加载回放视频
    loadfile(files) {
      if (Array.isArray(files) && files.length) {
        for (const item of files) {
          item.label =
            dayjs(item.begintime).format('YYYY-MM-DD hh:mm') +
            '至' +
            dayjs(item.endtime).format('YYYY-MM-DD hh:mm')
          item.keyId = getRandomID()
        }
        this.recordQueryList = files
      }
    },
    // 回放视频播放
    recordOpenPlay() {
      console.log(this.recordPlaySelect)
      const protocolType = Number(this.realProtocol)
      const params = {
        device: this.device * 1,
        channel: this.recordPlaySelect.channel,
        protocolType: protocolType,
        begintime: Math.round(this.recordPlaySelect.begintime / 1000),
        endtime: Math.round(this.recordPlaySelect.endtime / 1000),
        fileName: this.recordPlaySelect.fileName,
        plate: '车辆视频回放',
        vehicleId: '4321',
        groupId: '1'
      }
      const obj = this.playList.find(
        p =>
          p.device === this.device &&
          p.channel === this.recordPlaySelect.channel
      )
      if (obj) return
      const tidObj = this.player.allocate(4)
      if (tidObj.flag === 1) {
        const tid = tidObj.ids[0]
        this.player.record.open(tid, params, res => {
          console.log(res, '车辆视频回放')
        })
        this.playList.push({ ...params })
      } else {
        this.$message({ message: tidObj.msg, type: 'warning' })
      }
    },
    // 回放视频停止
    recordOpenStop() {
      const device = this.device * 1
      const channel = this.realChannel * 1
      const index = this.playList.findIndex(
        p => p.device === device && p.channel === channel
      )
      const obj = this.playList[index]
      if (obj) {
        this.player.record.close(
          obj.tid,
          {
            device: obj.device,
            channel: obj.channel,
            protocolType: obj.protocolType
          },
          res => {
            console.log(res)
          }
        )
      }
      this.playList.splice(index, 1)
    },
    // 开启对讲机
    openSpeak(callback = false) {
      const params = {
        device: this.device * 1, // 终端号
        protocolType: 1 // 协议类型，1：GF-1078，2：GA系列，目前支持GF-1078
      }
      this.player &&
        this.player.real.openSpeak(params, res => {
          console.log(res, '开启讲机xxx')
          if (res.status === 1) {
            console.log(res, '开启对讲机')
            if (typeof callback === 'function') {
              callback({ status: 1, msg: '连接成功' })
            }
          } else {
            console.log(res, '开启失败')
            if (typeof callback === 'function') {
              callback({ status: 0, msg: res.info })
            }
          }
        })
    },
    // 开启关闭
    closeSpeak(callback = false) {
      const params = {
        device: this.device * 1,
        protocolType: 1
      }
      this.player &&
        this.player.real.closeSpeak(params, res => {
          if (res.status === 1) {
            console.log('关闭通话成功')
            if (typeof callback === 'function') {
              callback({ status: 1, msg: '连接成功' })
            }
          } else {
            if (typeof callback === 'function') {
              callback({ status: 0, msg: res.info })
            }
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.PlayerVideoBox {
  // width: 400px;
  // height: 400px;
  .box {
    width: 400px;
    height: 400px;
    background: #cccccc;
  }
  #PlayerBox {
    width: 400px;
    height: 400px;
    background: #cccccc;
  }

  .playerTools {
    // width: 840px;
  }

  .flex-box {
    display: flex;
  }

  .playerTool-item {
    margin-bottom: 22px;
  }
}
</style>

