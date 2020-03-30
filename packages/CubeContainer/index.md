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
  <el-row>
    <el-col :span="8"> 
      <pre>slot="before"</pre>
      <Cube-Input v-model="input1">
        <div slot="before">Http://</div>
      </Cube-Input>
    </el-col>
    <el-col :span="8"> 
      <pre>slot="after"</pre>
      <Cube-Input v-model="input2">
        <div slot="after">元</div>
      </Cube-Input>
    </el-col>
    <el-col :span="8"> 
      <p>组合使用</p>
      <Cube-Input v-model="input3" style="width:350px;">
        <Select-Bar
          style="width:150px;"
          slot="before"
          v-model="select"
          :options="options"
          value-key="companyId"
          option-name="companyName"
          option-value="companyId"
        />
        <div slot="after"> 年 </div>
      </Cube-Input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      input1: 'github.com/',
      input2: '100',
      input3: '',
      select: '',
      options: [
        {
          'mainManageDeptName': '沙井街道',
          'companyId': '42F84BFD-2ED6-4D76-82ED-9A0566CFE022',
          'companyName': '深圳市宝政'
        },
        {
          'mainManageDeptName': '福永街道',
          'companyId': 'EF28FF35-9C66-4250-A5DB-B8C711D0E5F8',
          'companyName': '深圳市洁雅'
        },
        {
          'mainManageDeptName': '航城街道',
          'companyId': '7C13F071-F63C-499C-A528-F441DEA3A4CF',
          'companyName': '深圳市绿佳'
        },
        {
          'mainManageDeptName': '西乡街道',
          'companyId': 'CA95E0AF-BE0F-42F8-AF1E-094D39CADF55',
          'companyName': '深圳市华富'
        }
      ]
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

 
 
