<template>
  <div>
    <cube-split
      :min-percent='20'
      :default-percent='30'
      split="vertical"
      style="border: 1px solid #cccccc;height: 400px;"
    >
      <template slot="paneL">
        <cube-split
          :min-percent='20'
          :default-percent='30'
          split="horizontal"
        >
          <template slot="paneL">
            <div>
              <div
                v-for="k in 100"
                :key="k"
              > sss </div>
            </div>
          </template>
          <template slot="paneR">
            <div>
              <div
                v-for="k in 100"
                :key="k"
              > xxxx </div>
            </div>
          </template>
        </cube-split>
      </template>
      <template slot="paneR">
        <div>
          <div
            v-for="k in 100"
            :key="k"
          > xxxx </div>
        </div>
      </template>
    </cube-split>

    <cube-split
      v-if="false"
      :min-percent='20'
      :default-percent='30'
      split="horizontal"
      style="border: 1px solid #cccccc;height: 400px;"
    >
      <template slot="paneL">
        <div>
          <div
            v-for="k in 100"
            :key="k"
          > sss </div>
        </div>
      </template>
      <template slot="paneR">
        <div>
          <div
            v-for="k in 100"
            :key="k"
          > xxxx </div>
        </div>
      </template>
    </cube-split>

  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
</style>