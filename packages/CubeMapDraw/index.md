## CubeRadio 单选框

在一组备选项中进行单选

### 基础用法 - 配置用法

业务场景多选择一，如果要初始化有选择效果，需要绑定值为选项中的值。由于选项默认可见，不宜过多，若选项过多，建议使用 SelectBar 选择器。
通常会有一些后台数据返回不带`value` `label`属性。这个时候我们可以简单的配置一下对应的`optionName` `optionValue`。  

:::demo 组件，只需要设置`v-model`绑定变量，可以是`String`、`Number`或`Boolean`。`options`提供选项内容。

```html
<template>
  <el-row>
    <el-col :span="12"> 
        <p> 选择值：{{value1}} </p>
        <Cube-Radio v-model="value1" :options="options1" />
    </el-col>
    <el-col :span="12"> 
        <p> 选择值：{{value2}} </p>
        <Cube-Radio v-model="value2" optionValue="companyId" optionName="companyName" :options="options2" />
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        value1: 1,
        value2: '7C13F071-F63C-499C-A528-F441DEA3A4CF',
        options1: [
          { value: 1, label: '启用'},
          { value: 0, label: '禁用' }
        ],
        options2: [
          {
            'companyId': '7C13F071-F63C-499C-A528-F441DEA3A4CF',
            'companyName': '深圳市绿佳智慧环境发展有限公司'
          },
          {
            'companyId': 'CA95E0AF-BE0F-42F8-AF1E-094D39CADF55',
            'companyName': '深圳市华富市政服务有限公司'
          }
        ],
      };
    }
  }
</script>
```
:::

### 禁用状态

单选框不可用的状态。

:::demo  组件设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。如果想选项禁用可以设置数据对象中属性`disabled:true`
```html
<template>
  <el-row>
    <el-col :span="12"> 
        <p> 整个组件禁用状态 </p>
        <Cube-Radio v-model="value1" disabled :options="options1" />
    </el-col>
    <el-col :span="12"> 
        <p> 选项禁用 </p>
        <Cube-Radio v-model="value2" optionValue="companyId" optionName="companyName" :options="options2" />
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        value1: 1,
        value2: '7C13F071-F63C-499C-A528-F441DEA3A4CF',
        options1: [
          { value: 1, label: '启用'},
          { value: 0, label: '禁用' }
        ],
        options2: [
          {
            'disabled':true,
            'companyId': '7C13F071-F63C-499C-A528-F441DEA3A4CF',
            'companyName': '深圳市绿佳智慧环境发展有限公司'
          },
          {
            'companyId': 'CA95E0AF-BE0F-42F8-AF1E-094D39CADF25',
            'companyName': '深圳市华富市政服务有限公司'
          },
          {
            'companyId': 'CA95E0AF-BE0F-42F8-AF1E-094D39CADF55',
            'companyName': '深圳市富强市政服务有限公司'
          }
        ],
      };
    }
  }
</script>
```
:::


### 按钮样式 - 带有边框样式

按钮样式和边框样式单。

:::demo 组件设置`button`或者 `border` 属性即可，此外还提供了`size`属性。可选值`medium / small / mini`
```html
<template>
  <el-row>
    <el-col :span="12"> 
      <p> 组件设置按钮模式 </p>
      <div style="margin-top: 0px">
        <Cube-Radio v-model="radio2" size="medium" :options="options1" button />
      </div>
      <div style="margin-top: 20px">
        <Cube-Radio v-model="radio3" size="small" :options="options1" button />
      </div>
      <div style="margin-top: 20px">
        <Cube-Radio v-model="radio4" size="mini" :options="options1" button />
      </div>
    </el-col>
    <el-col :span="12"> 
      <p> 组件设置边框模式 </p>
      <div style="margin-top: 0px">
        <Cube-Radio v-model="radio2" border size="medium" :options="options1" />
      </div>
      <div style="margin-top: 20px">
        <Cube-Radio v-model="radio3" border size="small" :options="options1" />
      </div>
      <div style="margin-top: 20px">
        <Cube-Radio v-model="radio4" border size="mini" :options="options1" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        radio1: 1,
        radio2: 2,
        radio3: 3,
        radio4: 4,
        options1: [
          { value: 1, label: '一体化'},
          { value: 2, label: '清扫保洁' },
          { value: 3, label: '垃圾清运' },
          { value: 4, label: '其他' },
        ]
      };
    }
  }
</script>
```
:::

### 设置方式为垂直方式

组件选项默认是水平排列，如果需要垂直排列，设置组件`vertical`即可。(按钮模式和边框模式中一般不设置该属性。这两种模式下界面样式会有点丑)
 
:::demo 设置`border`属性可以渲染为带有边框的单选框。
```html
<template>
  <el-row>
    <el-col :span="12"> 
      <p> 默认水平排列 </p>
      <div style="margin-let: 20px">
        <Cube-Radio v-model="radio1" size="medium" :options="options1" />
      </div>
    </el-col>
    <el-col :span="12"> 
      <p> 设置垂直排列 </p>
      <div style="margin-let: 20px">
        <Cube-Radio v-model="radio2" vertical optionValue="companyId" optionName="companyName" size="small" :options="options2" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        radio1: 1,
        radio2: '7C13F071-F63C-499C-A528-F441DEA3A4CF',
        options1: [
          { value: 1, label: '一体化'},
          { value: 2, label: '清扫保洁' },
          { value: 3, label: '垃圾清运' },
          { value: 4, label: '其他' },
        ],
        options2: [
          {
            'companyId': '7C13F071-F63C-499C-A528-F441DEA3A4CF',
            'companyName': '深圳市绿佳智慧环境发展有限公司'
          },
          {
            'companyId': 'CA95E0AF-BE0F-42F8-AF1E-094D39CADF25',
            'companyName': '深圳市华富市政服务有限公司'
          },
          {
            'companyId': 'CA95E0AF-BE0F-42F8-AF1E-194D39CADF25',
            'companyName': '深圳市宝洁市政服务有限公司'
          },
          {
            'companyId': 'CA95E0AF-BE0F-42F8-AF1E-094D39CADF55',
            'companyName': '深圳市富强市政服务有限公司'
          }
        ],
      };
    }
  }
</script>
```
:::

### CubeRadio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | string / number / boolean | — | — |
| options | 选项绑定值 | Array | 期待[{ value: 1, label: '启用', disabled:false }] | — |
| optionName  | 设置显示值    | string   | — | -  |
| optionValue | 设置选择返回值  | string / number / boolean   | — | -  |
| disabled  | 是否禁用    | boolean   | — | false   |
| border  | 是否是边框模式  | boolean   | — | false   |
| button  | 是否是按钮模式  | boolean   | — | false   |
| vertical  | 是否垂直显示  | boolean   | — | false   |
| size  | Radio 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| text-color  | 按钮形式的 Radio 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色    | string   | — | #409EFF   |

### CubeRadio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |


 
 
