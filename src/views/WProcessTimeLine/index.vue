<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
        placement="top"
      >
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          {{ activity.content }}
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'WProcessTimeLineX',
  title: 'ProcessTimeLine时间线',
  data() {
    return {
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        size: 'large',
        type: 'primary',
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        size: 'large',
        type: 'primary',
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
