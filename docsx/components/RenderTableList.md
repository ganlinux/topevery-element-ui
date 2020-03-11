# 列表组件 RenderTableList

::: tip TIP
搜索 + 表格分页 通过简单的配置参数。可以快速的配置业务系统不同的列表页面
:::

<!-- 相关示例请移步[Charts实例](http://charts.jiaminghi.com/example/)

相关配置项请移步[Charts配置项](http://charts.jiaminghi.com/config/) -->

<div class="demo-container">
  样例效果
  <!-- <dv-charts :option="option" /> -->
</div>

```html
  样例代码
<dv-charts :option="option" />
```
<!-- <click-to-copy :info="html" /> -->

<fold-box title="点击以展示/隐藏代码">
<<< @/docs/guide/codeData/RenderTableList.md
</fold-box>

<script>

export default {
  data () {
    return {
      html: '<dv-charts :option="option" />'
    }
  }
}
</script>

<style lang="scss">
.demo-container {
  width: 100%;
  height: 300px;
  background-color: #282c34;
  border-radius: 6px;
}
</style>