## cube-viewer  图片预览

:::tip
- 简便的图片参看。大图预览组件
:::

### 基本用法 - 组件调用

:::demo  

```html
<template>
  <div>
    <cube-viewer
      :images="images"
      style="height: 200px; cursor: pointer; margin: 5px; display: inline-block;"
      class="images clearfix"
    >
      <template slot-scope="scope">
        <img
          v-for="src in scope.images"
          :src="src"
          :key="src"
          class="image"
        >
      </template>
    </cube-viewer>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        images: [
          'https://picsum.photos/200/200',
          'https://picsum.photos/300/200',
          'https://picsum.photos/250/200'
        ]
      };
    },
    methods: {
  
    }
  };
</script>
```
:::

### 基本用法 - 指令调用

:::demo  

```html
<template>
  <div>
    <cube-viewer
      :images="images"
      style="height: 200px; cursor: pointer; margin: 10px; display: inline-block;"
      class="images clearfix"
    >
      <template slot-scope="scope">
        <img
          v-for="src in scope.images"
          :src="src"
          :key="src"
          class="image"
        >
      </template>
    </cube-viewer>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        images: [
          'https://picsum.photos/200/200',
          'https://picsum.photos/300/200',
          'https://picsum.photos/250/200'
        ]
      };
    },
    methods: {
  
    }
  };
</script>
```
:::

 

:::tip
Dialog 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。
:::

:::tip
如果 `visible` 属性绑定的变量位于 Vuex 的 store 内，那么 `.sync` 不会正常工作。此时需要去除 `.sync` 修饰符，同时监听 Dialog 的 `open` 和 `close` 事件，在事件回调中执行 Vuex 中对应的 mutation 更新 `visible` 属性绑定的变量的值。
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| visible   | 是否显示 Dialog，支持 .sync 修饰符 | boolean | — | false |
| title     | Dialog 的标题，也可通过具名 slot （见下表）传入 | string    | — | — |

### Slot
| name | 说明 |
|------|--------|
| — | Dialog 的内容 |
| title | Dialog 标题区的内容 |
| footer | Dialog 按钮操作区的内容 |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| open  | Dialog 打开的回调 | — |
| closed | Dialog 关闭动画结束时的回调 | — |
