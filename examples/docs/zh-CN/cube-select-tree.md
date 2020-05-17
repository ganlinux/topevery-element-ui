## cube-select-tree 树形下拉选择器

:::tip
- 树形下拉选择器，用清晰的层级结构展示信息。
- 根据数据结构可配置返回数据对象
- 选项数据多样化，后台返回+静态数据作为选择项
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
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
        <cube-select-tree v-model="cubeSelect" :config="config" /> 
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect:'',
            config:{
                keyName: 'label',
                keyCode: 'id',
                method: 'GET',
                url: '/static/tree.json',
                placeholder: '标段选择',
                treeDefaultProps: {
                    children: 'children',
                    label: 'label'
                }
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
        <div>  {{ cubeSelect }} 选择返回值  </div>
        <cube-select-tree v-model="cubeSelect" :config="config" :extraParam="extraParam" /> 
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
                keyName: 'label',
                keyCode: 'id',
                method: 'GET',
                url: '/static/tree.json',
                placeholder: '标段选择',
                treeDefaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
          }
      },
  }

</script>  

```
:::

### 前端传入-静态数据。

- 静态数据,一般不推荐选择数据项过多的情况。
- 常规业务中的数据选择配置静态数据作为选项使用配置。必须传属性
- 静态属性选项为true，静态数据为不分页数据。所以必须做如下配置

:::warning
- isStaticOptions: true
- options: []
:::

:::demo
```html
<template>
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
        <cube-select-tree v-model="cubeSelect" :config="config" /> 
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
                placeholder: '标段选择-不分页',
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
        <cube-select-tree v-model="cubeSelect" :config="config" :extraParam="extraParam" :disabled="disabled" /> <el-button type="primary" @click="disabled=!disabled" >{{disabled?'启用':'禁用'}}</el-button>
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect:'',
            disabled:false,
            extraParam:{
                type:1
            },
            config:{
                keyName: 'label',
                keyCode: 'id',
                method: 'GET',
                url: '/static/tree.json',
                placeholder: '标段选择',
                treeDefaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
          }
      },
  }

</script>  

```
:::


### 更多信息的选择返回对象-以静态数据选项为例。

通过`otherProps`设置选择返回更多有效信息。

:::demo
```html
<template>
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
        <cube-select-tree v-model="cubeSelect" :config="config" /> 
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect:'',
            config:{
                keyName: 'label',
                keyCode: 'id',
                isStaticOptions: true, // 设置为静态属性使用,
                options: [], // 外部传入的 options
                otherProps:['dataType'],
                isStaticOptions: true, // 设置为静态属性使用,
                options: [], // 外部传入的 options
                treeDefaultProps: {
                    children: 'children',
                    label: 'label'
                }
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
        <div>  {{ cubeSelect }} 选择返回值  </div>
        <cube-select-tree v-model="cubeSelect" :config="config" /> 
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect: { "id": "80DDEC81-5641-472F-8C6E-8A5DAE3D58E9", "label": "翠屏区环卫一所" } ,
            config:{
                keyName: 'label',
                keyCode: 'id',
                isStaticOptions: true, // 设置为静态属性使用,
                options: [], // 外部传入的 options
                isStaticOptions: true, // 设置为静态属性使用,
                options: [], // 外部传入的 options
                treeDefaultProps: {
                    children: 'children',
                    label: 'label'
                }
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
        keyName: 'label', // 显示选择名称
        keyCode: 'value', // 选择关键key
        placeholder: '请选择', // 占位符号
        clearable: true, // 选择是否可以清除
        popoverWidth: 320, // 弹层宽度
        inputWidth: '220px', // 输入框宽度
        size: 'small', // 输入框大小
        selectAny: false, // 是否选择任意项
        treeDefaultProps: { // 树状结构配置
            children: 'children',
            label: 'label'
        },
        method: 'POST', // 数据请求方法
        url: '', // 数据请求方法
        focusOnload: true, //是否获取焦点就加载
        otherProps: [] // 设置其他选择返回key
    }
```


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| extraParam | 额外拓展参数  |  Object |  --  |
