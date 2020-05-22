## topevery-icon 图标库

### 使用方法

直接通过设置类名为 `iconfont icon+图标名称` 来使用即可。例如：

:::demo
```html
<i class="iconfont iconhuanweirenyuanyichangzaigang1"></i>
<i class="iconfont icongaoyaqingxichelixian"></i>
<i class="iconfont icongaoyaqingxicheyouxiaozuoye"></i>
<el-button type="primary" icon="iconfont iconsheshi">搜索</el-button>

```
:::

### 图标集合

点击图标即可复制className到粘贴板

<ul class="icon-list">
  <li v-for="name in $topicon" :key="name.icon_id" v-clipboard="`icon${name.font_class}`">
    <span>
      <i :class="'iconfont icon' + name.font_class" />
      <span class="icon-name">{{name.name}}</span>
    </span>
  </li>
</ul>