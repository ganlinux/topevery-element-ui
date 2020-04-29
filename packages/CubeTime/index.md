## CubeInput 输入框

通过鼠标或键盘输入字符，默认开启`clearable`属性可清空的输入框内容。如需要关闭设置`clearable` 为`fasle`。

### 基础用法一

:::demo
```html
<template>
  <el-row>
    <el-col :span="8"> 
      <p>普通用法-{{input1}}</p>
      <Cube-Input v-model="input1" />
    </el-col>
    <el-col :span="8"> 
      <p>禁用状态-{{input2}}</p>
      <Cube-Input disabled v-model="input2" />
    </el-col>
    <el-col :span="8"> 
      <p>只读-{{input3}}</p>
      <Cube-Input readonly  v-model="input3" />
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      input1: '广东省深圳市南山区',
      input2: '广东省深圳市南山区',
      input3: '宝石路清扫保洁长筑',
    }
  }
}
</script>
```
:::


### 基础用法二

:::demo 通过 `disabled` 属性指定是否禁用 input 组件
```html
<template>
  <el-row>
    <el-col :span="8"> 
      <p>密码框</p>
      <Cube-Input v-model="input1" show-password />
    </el-col>
    <el-col :span="8"> 
      <p>leftIcon -插入左边Icon (UI提供的iconfont )</p>
      <Cube-Input leftIcon="iconfont iconnianjianjilu" v-model="input2" />
    </el-col>
    <el-col :span="8"> 
      <p>rightIcon -插入右边Icon (eleme-ui提供的icon)</p>
      <Cube-Input rightIcon="el-icon-edit-outline" :clearable="false"  v-model="input3" />
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      input1: '123456',
      input2: '广东省深圳市南山区',
      input3: '宝石路清扫保洁长筑',
    }
  }
}
</script>
```
:::


### 输入友好提示和限制

通过设置 `maxlength`，``show-limit` 可以在限制输入的同时提示剩余输入字符。

:::demo
```html
<el-row>
  <el-col :span="12"> 
    <p> 限制输入11字符- {{ input1 }} </p>
    <Cube-Input maxlength="11" show-limit v-model="input1" />
  </el-col>
  <el-col :span="12"> 
    <p> 限制输入6字符- {{ input1 }} </p>
    <Cube-Input maxlength="6" show-limit v-model="input2" />
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
    }
  }
}
</script>
```
:::

### 尺寸

`size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。所有组件默认`size`为`small`

:::demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。
```html
<el-row>
  <el-col :span="8"> 
    <Cube-Input size="medium" v-model="input1"/>
  </el-col>
  <el-col :span="8"> 
    <Cube-Input size="small" v-model="input2"/>
  </el-col>
  <el-col :span="8"> 
    <Cube-Input size="mini" v-model="input3"/>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  }
}
</script>
```
:::

### 使用插槽slot的复合型输入框
使用`slot`插槽声明`after`， `before`标识插入位置。

:::demo 使用`clearable`属性即可得到一个可清空的输入框

```html
<template>
  <div class="demo-input-suffix">
  属性方式：
  <Cube-Input suffix-icon="el-icon-date" v-model="input1" />
  
  <Cube-Input prefix-icon="el-icon-search" v-model="input1"/> 
</div>
<div class="demo-input-suffix">
  slot 方式：
  <Cube-Input
    :clearable='false'
    v-model="input1">
    <i slot="suffix" class="el-input__icon el-icon-date"></i>
  </Cube-Input>

  <Cube-Input
    :clearable='false'
    v-model="input1">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </Cube-Input>

  <Cube-Input
    :clearable='false'
    v-model="input1">
    <i slot="prefix" class="iconfont icon iconrenyuanchuqin el-input__icon"></i>
  </Cube-Input>

<div>
  <Cube-Input placeholder="请输入内容" v-model="input1">
    <template slot="prepend">Http://</template>
  </Cube-Input>
</div>
<div style="margin-top: 15px;">
  <Cube-Input placeholder="请输入内容" v-model="input2">
    <template slot="append">.com</template>
  </Cube-Input>
</div>
<div style="margin-top: 15px;">
  <Cube-Input placeholder="请输入内容" v-model="input3" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 90px;">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </Cube-Input>
</div>

</div>
 
</template>

<script>
export default {
  data() {
    return {
      input1: 'github.com/',
      input2: '100',
      input3: '',
      select: '',
    }
  }
}
</script>
```
:::

### 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。

:::demo 文本域高度可通过 `rows` 属性控制
```html
<el-row>
  <el-col :span="8"> 
    <pre>普通使用</pre>
    <Cube-Input type="textarea" v-model="input1"/>
  </el-col>
  <el-col :span="8"> 
    <pre>显示输入字符 + 限制输入 </pre>
    <Cube-Input type="textarea" maxlength="10" show-limit v-model="input2"/>
  </el-col>
  <el-col :span="8"> 
    <pre>可自适应文本高度</pre>
    <Cube-Input type="textarea" :autosize="{ minRows: 2, maxRows: 3}" v-model="input3"/>
  </el-col>
</el-row>

<script>
export default {
  data() {
    return {
      input1: 'github.com/',
      input2: '100',
      input3: '',
    }
  }
}
</script>
```
:::

### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text，textarea | text |
| value / v-model | 绑定值           | string / number  | — | — |
| maxlength     | 原生属性，最大输入长度      | number          |  —  | — |
| show-limit    | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | boolean    |  —  | false |
| placeholder   | 输入框占位文本    | string          | — | — |
| clearable     | 是否可清空        | boolean         | — | true |
| show-password | 是否显示切换密码图标| boolean         | — | false |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | — |
| prefix-icon   | 输入框头部图标    | string          | — | — |
| suffix-icon   | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| readonly | 原生属性，是否只读 | boolean | — | false |
| hide(`new`) | 控制组件是否显示-表单验证的时候占位使用 | boolean | — | false |

### CubeInput Slots
| name | 说明 | 备注 |
|------|--------|--------|
| leftIcon | 输入框内-左边插入Icon只对 `type="text"` 有效 |  图标  |
| rightIcon | 输入框内-右边插入Icon只对 `type="text"` 有效 |  图标  |
| before | 输入框前置内容，只对 `type="text"` 有效 | html代码  |
| append | 输入框后置内容，只对 `type="text"` 有效 | html代码  |

### CubeInput Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | input 获取焦点触发 | (event: Event) |
| blur | input 失去焦点触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string \| number) |
| clear | 点击清空 `clearable` Icon回调事件 | — |
| enter(`new`) | 输入框回车事件 | — |

 
 
