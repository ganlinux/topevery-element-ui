## cube-cascader 级联选择器

:::tip
- 公用树形结构数据，用清晰的层级结构展示信息。
- 选项数据多样化，后台返回+静态数据作为选择项
- 更少的代码量，完成业务数据的绑定和选择
:::

### 使用后台数据接口。

常规业务中的数据选择配置使用，最简单的配置

:::warning
 - 真实的开发中url需要填写完整路径 url:'http://xxx.xxx.xx/api/xxxx'
 - 由于接口请求方法封装在组件中所以，后台数据结构返回必须遵循一定的数据返回规范。
 - 如果使用后台接口加载数据。则会在组件创建的的时候去请求数据
 - 组件选择返回类似id的唯一值。
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


### 使用后台数据接口-设置接口额外请求参数。

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


### 前端传入-静态数据。

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


### 设置可以选择任意一级-静态数据。

- 组件默认只能选择最后一级。可以通过设置`selectAny:true`来开启可以选择任意级别。
- 常规业务中的数据选择配置静态数据作为选项使用配置。必须传属性

:::warning
- isStaticOptions: true
- options: []
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
                selectAny: true,
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


### 通过disabled设置组件的启用禁用。

:::demo
```html
<template>
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
        <cube-cascader v-model="cubeSelect" :config="config" :disabled="disabled" /> <el-button type="primary" @click="disabled=!disabled" >{{disabled?'启用':'禁用'}}</el-button>
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect:'',
            disabled: false,
            config:{
                keyName: 'code',
                keyCode: 'sectionId',
                children: 'children', 
                selectAny: true,
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

### 组件作为表单内部使用。数据编辑的时候显示设置

组件显示默认内容，遵循的原则是选择设置的是什么样的。编辑的时候就把数据设置为对应的即可。

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
            cubeSelect:'E00F790F-879C-438B-B66A-D442CDA42229',
            config:{
                keyName: 'code',
                keyCode: 'sectionId',
                children: 'children', 
                selectAny: true,
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
