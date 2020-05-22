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
    <div
      v-cube-viewer
      class="images clearfix"
      style="height: 200px; cursor: pointer; margin: 10px; display: inline-block;"
    >
      <template v-for="image in images">
        <img
          :src="image"
          class="image"
          :key="image"
        >
      </template>
    </div>
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

 

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |---------- |-------------- |--------------  |-------- |
|   占位   | 占位            |      占位 |   占位         |     占位      |     占位 |
