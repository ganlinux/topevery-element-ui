<template>
  <div class="home">
    home

    <Progress
      color="#1fa0ff"
      :width="100"
      :stroke-width="10"
      type="circle"
      :percentage="12"
    >
      <div
        slot="customInSider"
        class="customInSider"
      >
        <div> <span class="font-size-Bold-20">12</span> % </div>
        <div>机扫完成率</div>
      </div>
    </Progress>

    <MaxHeight />
  </div>
</template>

<script>
import { Progress, MaxHeight } from '~'
export default {
  name: 'Home',
  components: {
    Progress,
    MaxHeight
  }
}
</script>
