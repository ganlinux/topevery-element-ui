## SelectBar 选择器

当选项过多时，使用下拉菜单展示并选择内容。基于`el-select`封装一层。能少写一些代码、便于做统一的维护和设计。更好的应对后后台不一样的数据接口结构。少一些数据的处理工作。

:::tip 
  options的值为后台返回数据时,推荐传入`theOnlyKey` 唯一值、比如id等。有利于组件的渲染(尤其是数量大的时候)。设置`valueKey`值即可返回对象,`valueKey`必须是唯一的。组件默认开启可清空、可以检索、其他不需要的场景可以自行关闭
:::

### 常规基础用法

适用广泛的基础单选,默认开启可清除、可搜索。期待数据中有`value`。`label`。

:::demo `v-model`的值为当前被选中的`el-option`的 value 属性值。期待默认数据中有`value` `label`
```html
<template>

  <el-row>
    <el-col :span="12"> 
        <p> 常规选择返回value值 {{ value1 }} </p>
        <Select-Bar v-model="value1" :options="options" placeholder="请选择" />
    </el-col>
    <el-col :span="12"> 
        <p> 设置选择返回选择对象 {{ value2 }} </p>
        <Select-Bar v-model="value2" valueKey="value" :options="options" placeholder="请选择" />
    </el-col>
  </el-row>

</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '42F84BFD-2ED6-4D76-82ED-9A0566CFE022',
          label: '黄金糕'
        }, {
          value: '42F84BFD-2ED6-4D76-82ED-9A0566CFE023',
          label: '双皮奶'
        }, {
          value: '42F84BFD-2ED6-4D76-82ED-9A0566CFE024',
          label: '蚵仔煎'
        }, {
          value: '42F84BFD-2ED6-4D76-82ED-9A0566CFE027',
          label: '龙须面'
        }, {
          value: '42F84BFD-2ED6-4D76-82ED-9A0566CFE028',
          label: '北京烤鸭'
        }],
        value1: '',
        value2: '',
      }
    }
  }
</script>
```
:::


### 配置不同返回数据结构用法

通常会有一些后台数据返回不带`value` `label`属性。这个时候我们可以简单的配置一下对应的`optionName` `optionValue`。 设置`valueKey`值即可返回对象,`valueKey`必须是唯一的

:::demo `v-model`的值为当前被选中的`optionValue`的对应值值。`optionName`为显示给用户展示数据。
```html
<template>

  <el-row>
    <el-col :span="12"> 
        <p> 常规选择返回value值 {{ value1 }} </p>
        <Select-Bar v-model="value1" :options="options" optionName="companyName" optionValue="companyId" placeholder="请选择" />
    </el-col>
    <el-col :span="12"> 
        <p> 设置选择返回选择对象 {{ value2 }} </p>
        <Select-Bar v-model="value2" valueKey="companyId" :options="options" optionName="companyName" optionValue="companyId" placeholder="请选择" />
    </el-col>
  </el-row>
  
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            'companyId': '42F84BFD-2ED6-4D76-82ED-9A0566CFE022',
            'companyName': '深圳市宝政通环境有限公司'
          },
          {
            'companyId': 'EF28FF35-9C66-4250-A5DB-B8C711D0E5F8',
            'companyName': '深圳市保洁恒清洁服务有限公司'
          },
          {
            'companyId': '7C13F071-F63C-499C-A528-F441DEA3A4CF',
            'companyName': '深圳市绿佳智慧环境发展有限公司'
          },
          {
            'companyId': 'CA95E0AF-BE0F-42F8-AF1E-094D39CADF55',
            'companyName': '深圳市华富市政服务有限公司'
          }
        ],
        value1: '',
        value2: '',
      }
    }
  }
</script>
```
:::


### 业务应用场景 (适配不同返回数据结构用法、并且选择返回对象)。

业务需求: 选择企业带出其负责街道。选择返回对象,更有利于在返回对象中取任意数据。

:::demo `v-model`的值为当前被选中的`optionValue`的对应值值。`optionName`为显示给用户展示数据。
```html
<template>

  <el-row>
    <el-col :span="24"> 
        <p> 企业负责街道为: {{ value1 ? value1.mainManageDeptName : '请先选择企业' }} </p>
        <p> 选择返回数据对象: {{ value1 }} </p>
        <Select-Bar v-model="value1" valueKey="companyId" :options="options" optionName="companyName" optionValue="companyId" placeholder="请选择" />
    </el-col>
  </el-row>
  
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            "mainManageDeptName": "沙井街道",
            'companyId': '42F84BFD-2ED6-4D76-82ED-9A0566CFE022',
            'companyName': '深圳市宝政通环境有限公司'
          },
          {
            "mainManageDeptName": "福永街道",
            'companyId': 'EF28FF35-9C66-4250-A5DB-B8C711D0E5F8',
            'companyName': '深圳市保洁恒清洁服务有限公司'
          },
          {
            "mainManageDeptName": "航城街道",
            'companyId': '7C13F071-F63C-499C-A528-F441DEA3A4CF',
            'companyName': '深圳市绿佳智慧环境发展有限公司'
          },
          {
            "mainManageDeptName": "西乡街道",
            'companyId': 'CA95E0AF-BE0F-42F8-AF1E-094D39CADF55',
            'companyName': '深圳市华富市政服务有限公司'
          }
        ],
        value1: '',
      }
    }
  }
</script>
```
:::

### 禁用选项 - 禁用组件状态

:::demo 在`options`中，设定`disabled`值为 true，即可禁用该选项。同时给组件设定`disabled`即可禁用组件。
```html
<template>

  <el-row>
    <el-col :span="12"> 
      <Select-Bar v-model="value" :options="options" placeholder="请选择" /> 
    </el-col>
    <el-col :span="12"> 
      <Select-Bar v-model="value" :options="options" disabled placeholder="请选择" /> 
    </el-col>
  </el-row>

</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>
```
:::

### 基础多选 - 多选合并

适用性较广的基础多选，用 Tag 展示已选项

:::demo 设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置`collapse-tags`属性将它们合并为一段文字。
```html
<template>

  <el-row>
    <el-col :span="12"> 
        <p> 已经选择 {{ value1 }} </p>
        <Select-Bar v-model="value1" multiple :options="options" placeholder="请选择" /> 
    </el-col>
    <el-col :span="12"> 
        <p> 已经选择 {{ value2 }} </p>
        <Select-Bar v-model="value2" multiple collapse-tags :options="options" placeholder="请选择" /> 
    </el-col>
  </el-row>
 
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: [],
        value2: []
      }
    }
  }
</script>
```
:::

### 自定义模板

可以自定义备选项

:::demo 将自定义的 HTML 模板插入通过如下
```html
<template>
  <el-row>
    <el-col :span="12"> 
        <p> 选择返回value : {{ value1 }} </p>
        <Select-Bar v-model="value1" multiple collapse-tags :options="options" placeholder="请选择"> 
          <template slot-scope="{row}" >
            <!-- <div> 只能用 template 接收 拓展数据 {{ row }} item 为回调出来的row 数据对象</div> -->
            <span style="float: left">{{ row.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ row.value }}</span>
          </template>
        </Select-Bar>
    </el-col>
    <el-col :span="12"> 
       <p> 选择返回对象 : {{ value2 }} </p>
        <Select-Bar v-model="value2" multiple collapse-tags valueKey="value" :options="options" placeholder="请选择"> 
          <template slot-scope="{row}" >
            <!-- <div> 只能用 template 接收 拓展数据 {{ row }} item 为回调出来的row 数据对象</div> -->
            <span style="float: left">{{ row.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ row.value }}</span>
          </template>
        </Select-Bar>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        value1:'',
        value2:'',
      }
    }
  }
</script>
```
:::


:::tip
如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。
:::

### Select Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | boolean / string / number | — | — |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| size | 输入框尺寸 | string | medium/small/mini | — |
| clearable | 是否可以清空选项 | boolean | — | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | select input 的 name 属性 | string | — | — |
| autocomplete | select input 的 autocomplete 属性 | string | — | off |
| auto-complete | 下个主版本弃用 | string | — | off |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| allow-create | 是否允许用户创建新条目，需配合 `filterable` 使用 | boolean | — | false |
| filter-method | 自定义搜索方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remote-method | 远程搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | 加载中 |
| no-match-text | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置 | string | — | 无匹配数据 |
| no-data-text | 选项为空时显示的文字，也可以使用`slot="empty"`设置 | string | — | 无数据 |
| popper-class | Select 下拉框的类名 | string | — | — |
| reserve-keyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | — | false |
| default-first-option | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用 | boolean | - | false |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean | - | true |
| automatic-dropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | boolean | - | false |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

### Select Slots
|   name  | 说明     |
|---------|---------|
|    —    | Option 组件列表 |
| prefix  | Select 组件头部内容 |
| empty | 无选项时的列表 |

### Option Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 分组的组名 | string | — | — |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | — | false |

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 选项的值 | string/number/object | — | — |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string/number | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点，并隐藏下拉框 | - |
