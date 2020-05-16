## cube-cascader 级联选择器

:::tip
 温馨提示
:::

### 数据选项使用-接口返回数据。

常规业务中的数据选择配置使用，最简单的配置

:::warning
 真是的开发中url需要填写完整路径 url:'http://xxx.xxx.xx/api/xxxx'
:::

:::demo
```html
<template>
    <div>
        <div> {{ cubeSelect }} 选择返回值 </div>
        <cube-cascader v-model="cubeSelect" :config="config" /> 
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect:'',
            config:{
                keyCode: 'value',
                keyName: 'label', 
                children: 'children', 
                method: 'GET',
                url: '/static/tree.json',
            }
          }
      },
  }

</script>  

```
:::


### 数据选项使用-接口返回数据-设置接口额外请求参数。

业务中请求有时候需要关联其他请求参数。可以通过设置`extraParam`来做关联加载。
 
:::demo
```html
<template>
    <div>
        <div> {{ cubeSelect }} 选择返回值 </div>
        <cube-cascader v-model="cubeSelect" :extraParam="extraParam" :config="config" /> 
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect:'',
            extraParam:{
                type:1
            },
            config:{
                keyCode: 'value',
                keyName: 'label', 
                children: 'children', 
                method: 'GET',
                url: '/static/tree.json',
            }
          }
      },
  }

</script>  

```
:::


### 数据选项使用-静态数据。

常规业务中的数据选择配置静态数据作为选项使用配置。必须传属性

:::warning
isStaticOptions: true,
options: [],
:::

:::demo
```html
<template>
    <div>
        <div> {{ cubeSelect }} 选择返回值 </div>
        <cube-cascader v-model="cubeSelect" :config="config" /> 
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect:'',
            config:{
                keyName: 'code',
                keyCode: 'sectionId',
                children: 'children', 
                options: [],
                isStaticOptions: true,
            }
          }
      },
    mounted() {
        //模拟插入数据 静态 options 同步或者异步都可以 如下模拟异步
        setTimeout(_=>{
            this.config.options = this.$mockTree
        }, 2000);
    },
  }

</script>  

```
:::

 
 全部配置参数

``` js
    config: {
        placeholder: '请选择', //占位符
        filterable: true, // 是否支持检索
        size: 'small', //输入框 size
        selectAny: false, // 是否可选任意一级
        isStaticOptions: false, // options 选项是否作为 静态使用
        options: [],
        keyCode: 'value', // 指定选项的值为选项对象的某个属性值
        keyName: 'label', // 指定选项标签为选项对象的某个属性值
        children: 'children', // 指定选项的子选项为选项对象的某个属性
        url: '',
        method: 'GET'
    }
```

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| extraParam | 额外拓展参数  |  Object |  --  |
