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
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
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

### 使用后台数据接口-设置接口额外请求参数。

业务中请求有时候需要关联其他请求参数。可以通过设置`extraParam`来做关联加载。

:::demo
```html
<template>
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
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


### 通过disabled设置组件的启用禁用。

:::demo
```html
<template>
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
        <cube-select v-model="cubeSelect" :config="config" :extraParam="extraParam" :disabled="disabled" /> <el-button type="primary" @click="disabled=!disabled" >{{disabled?'启用':'禁用'}}</el-button>
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

### 前端传入-静态数据。

- 静态数据,一般不推荐选择数据项过多的情况。
- 常规业务中的数据选择配置静态数据作为选项使用配置。必须传属性
- 静态属性选项为true，静态数据为不分页数据。所以必须做如下配置

:::warning
- isNoPage: true
- isStaticOptions: true
- options: []
:::

:::demo
```html
<template>
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
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
                placeholder: '标段选择-不分页',
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
        //模拟插入数据 静态 options 同步或者异步都可以 如下模拟异步
        setTimeout(_=>{
            this.config.options = this.$mockSection.records
        }, 2000);
    },
  }

</script>  

```
:::


### 拓展显示配置-以静态数据选项为例。

更友好的显示用户界面，配置显示更多有效信息

:::demo
```html
<template>
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
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
                placeholder: '标段选择-不分页',
                isNoPage: true, //设置不分页
                isStaticOptions: true, // 设置为静态属性使用,
                options: [], // 外部传入的 options
                popoverWidth: 400, // 弹层宽度
                column: [ //仅仅作为展示用户使用
                    { key: 'code', label: '名称' },
                    { key: 'companyName', label: '责任单位' },
                    { key: 'statusStr', label: '状态' }
                ]
            }
          }
      },
    mounted() {
        //模拟插入数据 静态 options 同步或者异步都可以 如下模拟异步
        setTimeout(_=>{
            this.config.options = this.$mockSection.records
        }, 2000);
    },
  }

</script>  

```
:::


### 更多信息的选择返回对象-以静态数据选项为例。

一般业务选择会有所关联。好比选择后需要返回其他有效字段。
场景如下选择标段的时候需要关联公司。

:::demo
```html
<template>
    <div>
        <div>  {{ cubeSelect }} 选择返回值  </div>
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
                otherProps:['companyId', 'companyName'],
                placeholder: '标段选择-不分页',
                isNoPage: true, //设置不分页
                isStaticOptions: true, // 设置为静态属性使用,
                options: [], // 外部传入的 options
                column: [ //仅仅作为展示用户使用
                    { key: 'code', label: '名称' },
                    { key: 'companyName', label: '责任单位' },
                ]
            }
          }
      },
    mounted() {
        //模拟插入数据 静态 options 同步或者异步都可以 如下模拟异步
        setTimeout(_=>{
            this.config.options = this.$mockSection.records
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
        <cube-select v-model="cubeSelect" :config="config" /> 
    </div>
</template>

<script>
  export default {
      data() {
          return {
            cubeSelect: { "sectionId": "80DDEC81-5641-472F-8C6E-8A5DAE3D58E9", "code": "翠屏区环卫一所" } ,
            config:{
                keyName: 'code',
                keyCode: 'sectionId',
                placeholder: '标段选择-不分页',
                isNoPage: true, //设置不分页
                isStaticOptions: true, // 设置为静态属性使用,
                options: [], // 外部传入的 options
                column: [ //仅仅作为展示用户使用
                    { key: 'code', label: '名称' },
                    { key: 'companyName', label: '责任单位' },
                ]
            }
          }
      },
    mounted() {
        //模拟插入数据 静态 options 同步或者异步都可以 如下模拟异步
        setTimeout(_=>{
            this.config.options = this.$mockSection.records
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
        otherProps: [], // 设置其他选择返回key
        placeholder: '请选择', // 输入框占位符
        clearable: true, // 是否可以清除
        popoverWidth: 320, // 弹层宽度
        inputWidth: '220px', // 输入框宽度
        size: 'small', // 输入框 size medium / small / mini 
        isNoPage: false, // 是否是分页 默认是分页
        tableHeight: 250, // 弹窗选择表格高度
        headerAlign: 'center', // 表头对齐方式
        column: [ // 自定义表格显示内容
          { key: 'name', label: '名称' },
          { key: 'code', label: '编码' }
        ],
         // 传入 options 选项是否作为静态使用(配和options)设置该属性后请求会被拦截 
         // 数据选择以options传入为主
        isStaticOptions: false,
        options: [], // 外部传入options(配和isStaticOptions:true使用)
        searchName: 'name', //后台检索字段
        method: 'POST', //请求方法
        url: '',//请求url
        focusOnload: true, //是否获取焦点就加载。如果设置fasle则请求只加载一次
        pagination: { //分页配置设置
          size: 10, // 分页每页默认显示10条
          currentPage: 1, // 当前默认第一页
          total: 0 // 总条数
        }
    }
```

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| extraParam | 额外拓展参数  |  Object |  --  |
