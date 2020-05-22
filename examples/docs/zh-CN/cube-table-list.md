## CubeTableList 业务列表最佳解决方案 - 文档编写中...

:::tip
 - 通过配置项的方式完成基础列表开发
 - 更少的代码量，完成业务列表功能
:::

### 基本使用方式

:::demo
```html
<template>
    <div>
        <cube-upload />
        <cube-Table-List :config="config" v-if="false" /> 
        <cube-dialog
        title="提示"
        :visible.sync="centerDialogVisible">
            <div v-if="centerDialogVisible">
                <div v-for="k in 100">--- 内容高度已经超过可视区域高度，弹窗高度将自动计算，改变窗口大小你会发现弹窗高度会自动计算---</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </cube-dialog>

    </div>
</template>

<script>
  export default {
    data() {
        return {
            centerDialogVisible:false,
            config: {
                method: 'GET',
                // url: 'https://easy-mock.com/mock/5eba3414a2293e5119c96985/page/list',
                url: 'http://120.79.246.119:5080/myblog/ws/art/api/article/40',
                search: {
                    data: [
                        [
                            { type: 'option', value: null, key: 'alarmResult', placeholder: '状态', class: 'w130', options: [
                                { label: '已取消', value: 1 },
                                { label: '已确认', value: 2 } ]
                            },
                            {  type: 'input', value: null, key: 'objName', placeholder: '名称检索', class: 'w130' },
                            { type: 'search', name: '查询' },
                            { type: 'reset', name: '重置' }
                        ],
                        [
                            { type: 'add', name: '新增', action: () => this.add() },
                        ]
                    ]
                },
                table: {
                    tableHeight: 250,
                    calcTableHeight: false, // 是否开启表格自动高度计算
                    columns: [
                        { label: '选择', type: 'selection' },
                        { label: '序号', type: 'index' },
                        { label: '名称', key: 'sectionName' },
                        { label: '状态', key: 'alarmTimeStr'},
                        {
                            label: '操作',
                            key: 'drawNum',
                            render: (h, parmas) => {
                                const { row } = parmas
                                return (
                                    <div class='flex-table-cell'>
                                        <div class='btn-text' onClick={() => this.handlerType(0, row)}>轨迹</div>
                                        <div class='btn-text' onClick={() => this.handlerType(1, row)}>通讯</div>
                                    </div>
                                )
                            }
                        }
                    ]
                }
            }
        }
    },
    methods: {
        add() {
            this.centerDialogVisible = true
        },
        handlerType(type,row){
            console.log(type,row);
        }
    }
}
</script>  

```
:::


### 表格展开方式

### 表格滚动方式


全部配置参数

``` js
    config: {
        
    }
```

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| extraParam | 额外拓展参数  |  Object |  --  |
