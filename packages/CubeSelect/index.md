## CubeSelect 列表选择器

可配置化选择显示，做快速检索选择使用。

:::tip 
  CubeSelect 提供快速检索。实现可复用现有业务列表Api，支持分页。更好的配置数据直观的显示和选择。
  组件设计返回值为对象。
  1、对象好拓展其他关联信息、2、编辑显示数据的时候只需要把现有字段组合成组件期望的数据就可以少一次请求数据为代价显示数据。
:::

### 常规基础用法 - 提供选择

适用广泛的基础单选,默认开启可清除、可搜索。期待数据中有`value`。`label`。其绑定的是返回的对象字段。如果数据返回中没有这可以通过设置指定字段作为关键替换。`keyName` -- 对应  `label` ，`keyCode` -- 对应  `value`。可以简单理解`key`对应的都是关键返回和绑定。需要选择什么则设置返回什么。编辑显示的时候同理。设置填充设置的`keyName` -- 对应  `label` ，`keyCode` -- 对应  `value`值。

:::demo `keyName` -- 对应  `label` ，`keyCode` -- 对应  `value`。如需要做一个车辆的选择，首先绑定请求接口`/car/getCarListPage` 设置选取数据返回的`车牌号` `车牌id`作为返回的key。`searchName`则是对数据检索设置的关键字。 `column` 仅仅做数据展示使用。

```html
<template>
  <el-row>
    <el-col :span="12"> 
      <p> 常规选择返回值 {{ cubeSelectCar }} </p>
      <Cube-Select
        v-model="cubeSelectCar"
        placeholder="请选择车辆"
        style="width:220px"
        :focus-onload="false"
        :popover-width="320"
        key-name="no"
        key-code="carId"
        search-name="no"
        url="/car/getCarListPage"
        :column="[
          { key: 'no', label: '车牌号码' },
          { key: 'carTypeDesc', label: '类型' }
        ]"
      />
    </el-col>
    <el-col :span="12"> 
      <p> 设置选择返回选择对象 {{ cubeSelectPeople }} </p>
      <Cube-Select
          v-model="cubeSelectPeople"
          placeholder="请选择人员"
          style="width:220px"
          showAppendBtn
          :focus-onload="false"
          :popover-width="320"
          key-name="personName"
          key-code="personId"
          search-name="personName"
          url="/person/getPersonListPage"
          :column="[
            { key: 'personName', label: '名称' },
            { key: 'personTypeDesc', label: '类型' }
          ]"
        />
    </el-col>
  </el-row>

</template>

<script>
  export default {
    data() {
      return {
        cubeSelectCar:'',
        cubeSelectPeople:''
      }
    }
  }
</script>
```
:::


### 常规基础用法 - 编辑显示选择

适用广泛的基础单选,默认开启可清除、可搜索。期待数据中有`value`。`label`。通过设置填充设置的`keyName` -- 对应  `label` ，`keyCode` -- 对应  `value`值。来作为显示的选择对象。

:::demo `keyName` -- 对应  `label` ，`keyCode` -- 对应  `value`
```html
<template>

  <el-row>
    <el-col :span="12"> 
      <p> 常规选择返回值 {{ cubeSelectCar }} </p>
      <Cube-Select
        v-model="cubeSelectCar"
        placeholder="请选择车辆"
        style="width:220px"
        :focus-onload="false"
        :popover-width="320"
        key-name="no"
        key-code="carId"
        search-name="no"
        url="/car/getCarListPage"
        :column="[
          { key: 'no', label: '车牌号码' },
          { key: 'carTypeDesc', label: '类型' }
        ]"
      />
    </el-col>
    <el-col :span="12"> 
      <p> 设置选择返回选择对象 {{ cubeSelectPeople }} </p>
      <Cube-Select
          v-model="cubeSelectPeople"
          style="width:220px"
          showAppendBtn
          placeholder="请选择人员"
          :focus-onload="false"
          :popover-width="320"
          key-name="personName"
          key-code="personId"
          search-name="personName"
          url="/person/getPersonListPage"
          :column="[
            { key: 'personName', label: '名称' },
            { key: 'personTypeDesc', label: '类型' }
          ]"
        />
    </el-col>
  </el-row>

</template>

<script>
  export default {
    data() {
      return {
        cubeSelectCar: { "carId": "54467db9-8f3c-47d1-855d-768eabac0901", "no": "测A03231" },
        cubeSelectPeople:{ "personId": "78C02FF6-3C0F-46F2-95A1-17C9A17C15A5", "personName": "陈世珍" }
      }
    }
  }
</script>
```
:::

### 常规基础用法 - 数据关联 - 自定义组件配合校验

选择完成会触发 change 事件回调整个选择的数据对象，方便做数据的联动处理。

:::demo `keyName` -- 对应  `label` ，`keyCode` -- 对应  `value`
```html
<template>
  <el-form ref="form" :model="form" size="mini" label-width="90px">
    <el-row>
      <el-col :span="12"> 
        <p> 常规选择返回值 {{ sectionInfo }} </p>
        <el-form-item label="标段" prop="sectionId" verify>
          <Cube-Select
            v-model="sectionInfo"
            placeholder="请选择标段"
            style="width:220px"
            :focus-onload="false"
            :popover-width="320"
            key-name="name"
            key-code="sectionId"
            search-name="no"
            url="/section/search"
            :column="[
              { key: 'name', label: '名称' },
              { key: 'code', label: '编码' }
            ]"
            @change="sectionInfoChange"
          />
          <!-- 在视图上利用表达式做校验判断使用 -->
          <div v-show="false"> {{ sectionInfo ? form.sectionId = sectionInfo.sectionId : form.sectionId = '' }} </div>
        </el-form-item>
      </el-col>
      <el-col :span="12"> 
        <p> 设置选择返回选择对象 {{ sectionInfo }} </p>
        <el-form-item label="所属公司" prop="companyName" verify>
          <Cube-Input v-model="form.companyName" readonly  placeholder="请选择标段关联" />
        </el-form-item>
      </el-col>
    </el-row>
</el-form >
</template>

<script>
  export default {
    data() {
      return {
        sectionInfo:null,
        form:{
          sectionId:'',
          sectionName:'',
          companyName:''
        },
      }
    },
    methods: {
      sectionInfoChange(item){
        item ? this.form.companyName = item.companyName : this.form.companyName = ''
      }
    },
  }
</script>
```
:::


 
 ### CubeSelect Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | boolean / string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| clearable | 是否可以清空选项 | boolean | — | true |
| filterable | 输入框开启检索 | boolean | — | true |
| placeholder | 输入框用户提示字符 | String | — | - |
| focusOnload | 是否获取焦点就请求数据 | boolean | — | true |
| method | 请求数据方法 | String | — | POST |
| url | 数据请求接口 | String | — | - |
| searchName | 后台接收检字段参数 | String | — | - |
| extraParam | 额外拓展参数 | Object | — | - |
| column | 用户展示表格配置和表格显示一样。仅做用户界面展示使用 | Array | — | - |
| tableHeight | 显示区域表格最大高度 | number | — | 250 |
| popoverWidth | 搜索弹层宽度 | number | — | 320 |
| tableRowKey | 渲染表格row唯一值、建议绑定中的唯一 | string | — | - |
| showAppendBtn | 是否显示右边提示性按钮| boolean | — | false |
| appendBtnText | 右边按钮描述文字 | string | — | 选择 |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |
 
### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| change | 选择完成回调事件，返回当前选择数据对象 | - |
