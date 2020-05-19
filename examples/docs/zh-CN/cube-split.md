
## cube-select 数据选择最佳方案


:::tip
 - 支持分页检索,可复用现有业务接口。
 - 根据数据结构可配置显示内容
 - 根据数据结构可配置返回数据对象
 - 选项数据多样化，后台返回+静态数据作为选择项
 - 多场景配合使用，分页与不分页可配切换。
 - 优化请求数量,只在数据选择的时候加载数据接口
 - 更少的代码量，完成业务数据的绑定和选择
:::


### 使用后台数据接口。

常规业务中的数据选择配置使用，最简单的配置

:::warning
 - 真实的开发中url需要填写完整路径 url:'http://xxx.xxx.xx/api/xxxx'
 - 由于接口请求方法封装在组件中所以，后台数据结构返回必须遵循一定的数据返回规范。
 - 组件选择返回对象
:::

:::demo
```html
 <template>
  <div class="demo-split" style="height: 200px;border: 1px solid #dcdee2;box-sizing: border-box;">
    <cube-split v-model="split3">
      <div slot="left" class="demo-split-pane">
        <div class="p10">
          <div
            v-for="item in 100"
            :key="item"
          >
            {{ item }} 左边
          </div>
        </div>
      </div>
      <div
        slot="right"
        class="demo-split-pane"
      >
        <div class="p10">
          <div
            v-for="item in 10"
            :key="item"
          >
            {{ item }} 左边
          </div>
        </div>
      </div>
    </cube-split>
  </div>
</template>

<script>
export default {
  data() {
    return {
      split3: 0.5,
      split4: 0.5
    }
  }
}
</script>
```
:::