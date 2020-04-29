<template>
  <div class="demo-split">
    <cubeSplit v-model="split3">
      <div slot="left" class="demo-split-pane">
        <cubeSplit v-model="split4" mode="vertical">
          <div slot="top" class="demo-split-pane">
            <div class="p10">
              <div
                v-for="item in 100"
                :key="item"
              >
                {{ item }} 上面
              </div>
            </div>
          </div>
          <div
            slot="bottom"
            class="demo-split-pane"
          >
            <div class="p10">
              <div
                v-for="item in 100"
                :key="item"
              >
                {{ item }} 下面
              </div>
            </div>
          </div>
        </cubeSplit>
      </div>
      <div
        slot="right"
        class="demo-split-pane"
      >
        <div class="p10">
          <div
            v-for="item in 100"
            :key="item"
          >
            {{ item }} 左边
          </div>
        </div>
      </div>
    </cubeSplit>
  </div>
</template>

<script>
export default {
  name: 'CubeSplitX',
  title: 'CubeSplit分割面板',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: 'CubeSplit分割面板',
    pageName: 'CubeSplit',
    sort: '1'
  },
  data() {
    return {
      split3: 0.5,
      split4: 0.5
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-split {
  height: 100%;
  border: 1px solid #dcdee2;
  box-sizing: border-box;
}
.demo-split-pane {
  padding: 0;
  height: 100%;
  overflow: auto;
}
.p10{
  padding: 10px;
}
</style>

