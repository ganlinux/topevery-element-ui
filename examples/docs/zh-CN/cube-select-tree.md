## cube-select-tree

树形下拉选择器，用清晰的层级结构展示信息，可展开或折叠。可配置，用配置的方式实现接口到数据视图的渲染。

:::tip
 温馨提示
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

### 基础用法

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<template>
    <el-row>
        <Cube-Select-Tree v-model="treeValue" :extra-param="extraParam" :config="config" />
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                treeValue: '',
                extraParam: {
                    // 请求拓展参数
                },
                config: {
                    keyName: 'label',
                    keyCode: 'value',
                    method: 'GET',
                    url: '/static/tree.json',
                    focusOnload: false, // 获取焦点就加载
                    placeholder: 'cubeSelectTree',
                    treeDefaultProps: {
                        children: 'children',
                        label: 'label'
                    }
                }
            }
        }
    }
</script>

```
:::
