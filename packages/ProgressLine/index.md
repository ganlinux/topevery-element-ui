## ProgressLine 条形进度显示

 展示操作或任务的当前进度

### 基础用法

:::demo 处在不同状态下的进度条，当 percent 为 100 时，自动将状态置为 success。

``` html
 <template>
     <Progress-Line :percent="25" />
     <Progress-Line :percent="45" status="active" />
     <Progress-Line :percent="65" status="wrong" />
     <Progress-Line :percent="100" />
     <Progress-Line :percent="25" hide-info />
 </template>
```

:::

### 显示进百分比

:::demo 通过 `disabled` 属性指定是否禁用 input 组件

``` html
<template>
    <Progress-Line :percent="25" :stroke-width="16" text-inside />
    <Progress-Line :percent="45" :stroke-width="16" status="active" text-inside />
    <Progress-Line :percent="65" :stroke-width="16" status="wrong" text-inside />
    <Progress-Line :percent="100" :stroke-width="16" text-inside />
</template>
```

:::

### 渐变颜色

:::demo 设置属性 stroke-color 为数组时，可以显示为渐变色。数组只能设置为两项。

``` html
 <template>
     <Progress-Line :stroke-color="['#0096f3', '#00e9db']" :percent="90" :stroke-width="12" status="active" />
     <Progress-Line :stroke-color="['#0096f3', '#00e9db']" :percent="10" :stroke-width="12" status="active" />
     <Progress-Line :stroke-color="['#0096f3', '#00e9db']" :percent="45" :stroke-width="12" status="active" />
     <Progress-Line :stroke-color="['#0096f3', '#00e9db']" :percent="25" :stroke-width="12" status="active" />
 </template>
```

:::
 

### 垂直方向设置

:::demo 设置属性 stroke-color 为数组时，可以显示为渐变色。数组只能设置为两项。

``` html
 <template>
     <div class="vertical" style="height:200px">
         <Progress-Line vertical :stroke-color="['#0096f3', '#00e9db']" :percent="90" :stroke-width="12" status="active" />
         <Progress-Line vertical :stroke-color="['#0096f3', '#00e9db']" :percent="10" :stroke-width="12" status="active" />
         <Progress-Line vertical :stroke-color="['#0096f3', '#00e9db']" :percent="45" :stroke-width="12" status="active" />
         <Progress-Line vertical :stroke-color="['#0096f3', '#00e9db']" :percent="25" :stroke-width="12" status="active" />
     </div>
 </template>
```

:::

### 自定义填充内容

:::demo 通过自定义slot和属性stroke-width改变进度条效果。

``` html
 <template>
     <Progress-Line :percent="25" :stroke-width="16" />
     <Progress-Line :percent="100" :stroke-width="16">
         <span>完成预期</span>
     </Progress-Line>
 </template>
```

:::
 

### ProgressLine Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
|  percent      | 百分比          | Number           |      —              |   0     |
|  status      | 状态，可选值为normal、active、wrong、success    | String           |      —      |   normal     |
|  stroke-width      | 进度条的线宽，单位 px          | Number           |      —              |   10px     |
|  stroke-color      | 进度条的颜色，传入数组，显示为渐变色        | String | Array           |      —              |   -     |
|  hide-info      | 隐藏数值或状态图标     |  Boolean       |      —              |    false     |
|  vertical      | 是否在垂直方向显示     |  Boolean       |      —              |    false     |
|  success-percent      | 已完成的分段百分比     |  Number       |      —              |    0     |
|  text-inside     | 百分比是否置于进度条内     |  Boolean       |      —              |    0     |

### ProgressLine Slots

| 名称 | 说明 | 备注 |
|------|--------|--------|
| - |  自定义显示状态内容 | -  |

 
 
