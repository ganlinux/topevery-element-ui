## cube-select-tree

树形下拉选择器，用清晰的层级结构展示信息，可展开或折叠。可配置，用配置的方式实现接口到数据视图的渲染。

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
        {{ cubeSelect }} 选择返回值
        <cube-select v-model="cubeSelect" :config="config" /> 
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect:'',
            config:{
                keyName: 'code', //决定数据选择返回 ------|
                keyCode: 'sectionId', //决定数据选择返回--|
                method: 'GET',
                url: '/static/section.json',
                searchName: 'sectionName',
                placeholder: '标段选择-分页',
                column: [ //仅仅作为展示用户使用
                    { key: 'code', label: '名称' },
                    { key: 'statusStr', label: '状态' }
                ]
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
        {{ cubeSelect }} 选择返回值
        <cube-select v-model="cubeSelect" :config="config" :extraParam="extraParam" /> 
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
                keyName: 'code',
                keyCode: 'sectionId',
                method: 'GET',
                url: '/static/section.json',
                searchName: 'sectionName',
                placeholder: '标段选择-分页',
                column: [ //仅仅作为展示用户使用
                    { key: 'code', label: '名称' },
                    { key: 'statusStr', label: '状态' }
                ]
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
isNoPage: true, 
isStaticOptions: true,
options: [],
:::

:::demo
```html
<template>
    <div>
        {{ cubeSelect }} 选择返回值
        <cube-select v-model="cubeSelect" :config="config" /> 
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
                placeholder: '标段选择-分页',
                isNoPage: true, //设置不分页
                isStaticOptions: true, // 设置为静态属性使用,
                options: [], // 外部传入的 options
                column: [ //仅仅作为展示用户使用
                    { key: 'code', label: '名称' },
                    { key: 'statusStr', label: '状态' }
                ]
            }
          }
      },
    mounted() {
        //模拟插入数据
        setTimeout(_=>{
            this.config.options = this.$mockTree
        }, 20);
    },
  }

</script>  

```
:::


全部配置参数

``` js
    config: {
        keyName: 'label', // 显示选择名称
        keyCode: 'value', // 选择关键key
        placeholder: '请选择',
        clearable: true, // 选择是否可以清除
        popoverWidth: 320, // 弹层宽度
        inputWidth: '220px', // 输入框宽度
        size: 'small', // 输入框大小
        // 树区域
        selectAny: false, // 是否选择任意项
        treeDefaultProps: { // 树状结构配置
            children: 'children',
            label: 'label'
        },
        // 请求额外设置参数 -  网络数据加载区域
        method: 'POST',
        url: '',
        focusOnload: true, //是否获取焦点就加载
        selectValuekey: [] // 选择返回值设置
    }
```


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| extraParam | 额外拓展参数  |  Object |  --  |
