## CubeTableList 业务列表最佳解决方案

:::tip
 - 通过配置项的方式完成基础列表开发
 - 更少的代码量，完成业务列表功能
:::


:::warning
 - 真实的开发中url需要填写完整路径 url:'http://xxx.xxx.xx/api/xxxx'
 - 由于接口请求方法封装在组件中所以，后台数据结构返回必须遵循一定的数据返回规范。
 - 组件选择返回对象
:::

### 基本使用方式

顶部搜索栏的配置请参考查阅`SearchBar`组件。 只需要一个组件就可以快速的配置出一个业务列表页面。

:::demo
```html
<template>
    <div>
        <cube-Table-List :config="config" /> 

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
        // 仅仅文档内使用 开发或者正式环境请填写完整url
        const baseURL = this.$baseURL
        return {
            centerDialogVisible:false,
            config: {
                method: 'POST',
                url: `${baseURL}/section/search`,
                search: {
                    data: [
                        [
                            {
                                type: 'cubeSelectTree',
                                value: null,
                                key: 'sectionId',
                                config: {
                                    keyName: 'label',
                                    keyCode: 'value',
                                    url: `${baseURL}/map/getSectionTree`,
                                    focusOnload: false, // 是否多次加载（是否获取焦点就加载）
                                    placeholder: '请选择标段',
                                    treeDefaultProps: {
                                        children: 'children',
                                        label: 'label'
                                    }
                                }
                            },
                            {  
                                type: 'cubeCascader',
                                value: null,
                                key: 'manageDeptId',
                                extraParam:{ // 其他请求拓展参数
                                    treeId:'aed26b5a-00e8-4c87-99a5-3345582239f9'
                                },
                                config: {
                                    placeholder: '请选择主管单位',
                                    keyCode: 'value',
                                    keyName: 'label', 
                                    children: 'children', 
                                    method: 'GET',
                                    url: `${baseURL}/customDept/tree`,
                                }
                             },
                            { type: 'search', name: '查询' },
                            { type: 'reset', name: '重置' }
                        ],
                        [
                            { type: 'add', name: '新增', action: () => this.add() },
                        ]
                    ]
                },
                table: {
                    prefixHeight: 0,
                    tableHeight: 250,
                    calcTableHeight: false, // 是否开启表格自动高度计算
                    columns: [
                        { label: '选择', type: 'selection' },
                        { label: '序号', type: 'index' },
                        { label: '标段编号', key: 'code'},
                        { label: '主管单位', key: 'manageDeptName' },
                        {
                            label: '操作',
                            key: 'drawNum',
                            render: (h, parmas) => {
                                const { row } = parmas
                                return (
                                    <div class='flex-table-cell'>
                                        <div class='btn-text' onClick={() => this.handlerType(0, row)}>详情</div>
                                        <div class='btn-text' onClick={() => this.handlerType(1, row)}>编辑</div>
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
            this.$message({message: type? '数据编辑':'数据详情',type: 'success'})
        }
    }
}
</script>  

```
:::


### 表格展开方式

如下配置。表格`columns`中设置`type: 'expand'`即可。展开只能展开唯一一项。

:::warning
- 展开表格强烈推荐传入`rowKey`数据唯一标识（默认为`rowKey:'id'`）。组件默认只能展开一项这个需要唯一的`rowKey`指定。
- 如果无法展开请核实是否有传入`rowKey`数据唯一标识。或者设置`expandOnly:false`
- 当然如果实在没有这个唯一的`rowKey`可以设置`expandOnly:false`(非展开唯一，就是可以同时展开多项，一般场景下展开多项会相对显得混乱。根据自己的业务选择)
:::

#### 展开获取展开行静态数据

:::demo
```html
<template>
    <div>
        <cube-table-list :config="config"  @expandChange="expandChange"> 
            <template slot="expand" slot-scope="{row}">
            <!-- 获取当前展开行数据 -->
            获取当前展开行数据  {{ row.code }}
            </template>
        </cube-table-list>
    </div>
</template>

<script>
  export default {
    data() {
        // 仅仅文档内使用 开发或者正式环境请填写完整url
        const baseURL = this.$baseURL
        return {
            config: {
                method: 'POST',
                url: `${baseURL}/section/search`,
                search: {
                    data: [
                        [
                            {
                                type: 'cubeSelectTree',
                                value: null,
                                key: 'sectionId',
                                config: {
                                    keyName: 'label',
                                    keyCode: 'value',
                                    url: `${baseURL}/map/getSectionTree`,
                                    focusOnload: false, // 是否多次加载
                                    placeholder: '请选择标段',
                                    treeDefaultProps: {
                                        children: 'children',
                                        label: 'label'
                                    }
                                }
                            },
                            {  
                                type: 'cubeCascader',
                                value: null,
                                key: 'manageDeptId',
                                extraParam:{ // 其他请求拓展参数
                                    treeId:'aed26b5a-00e8-4c87-99a5-3345582239f9'
                                },
                                config: {
                                    placeholder: '请选择主管单位',
                                    keyCode: 'value',
                                    keyName: 'label', 
                                    children: 'children', 
                                    method: 'GET',
                                    url: `${baseURL}/customDept/tree`,
                                }
                             },
                            { type: 'search', name: '查询' },
                            { type: 'reset', name: '重置' }
                        ],
                        [
                            { type: 'add', name: '新增', action: () => this.add() },
                        ]
                    ]
                },
                table: {
                    prefixHeight: 0,
                    tableHeight: 250,
                    loadType: 'page',
                    calcTableHeight: false, // 是否开启表格自动高度计算
                    columns: [
                        { label: '展开', type: 'expand' },
                        { label: '序号', type: 'index' },
                        { label: '标段编号', key: 'code'},
                        { label: '主管单位', key: 'manageDeptName' },
                        {
                            label: '操作',
                            key: 'drawNum',
                            render: (h, parmas) => {
                                const { row } = parmas
                                return (
                                    <div class='flex-table-cell'>
                                        <div class='btn-text' onClick={() => this.handlerType(0, row)}>详情</div>
                                        <div class='btn-text' onClick={() => this.handlerType(1, row)}>编辑</div>
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
        expandChange(row, expandedRows){
            console.log(row, expandedRows);
            this.$message({message: expandedRows.length ? '展开':'关闭',type: 'success'})
        },
        add() {
            this.$message({message: '点击了新增',type: 'success'})
        },
        handlerType(type,row){
            console.log(type,row);
            this.$message({message: type? '数据编辑':'数据详情',type: 'success'})
        }
    }
}
</script>  

```
:::

#### 表格内嵌表格配置-（可以是嵌套分页数据表格、和非分页数据表格）

:::warning
- 注意这个例子展开的表格是不分页的数据结构
- 注意相关配置
:::

:::demo
```html
<template>
    <div>
        <cube-table-list :config="config1" :extraParam="extraParam1" @expandChange="expandChange1"> 
            <template slot="expand">
                <cube-table-list :config="config2" :extraParam="extraParam2">
                    <template slot="expand">
                        继续以此展开
                    </template>
                </cube-table-list>
            </template>
        </cube-table-list>
    </div>
</template>

<script>
  export default {
    data() {
        // 仅仅文档内使用 开发或者正式环境请填写完整url
        const baseURL = this.$baseURL
        return {
            extraParam1:{
                workType:2,
            },
            extraParam2:{
                workType:2,
                roadId:''
            },
            config1: {
                method: 'POST',
                url: `${baseURL}/report/work/statRoadWorkInfo/sumToRoad`,
                search: {
                    data: [
                        [
                            {
                                type: 'daterange',
                                value: ['2020-05-24','2020-05-24'],
                                key1: 'beginDate',
                                key2: 'endDate',
                            },
                            { type: 'search', name: '查询' },
                            { type: 'reset', name: '重置' }
                        ],
                        [
                            { type: 'add', name: '新增', action: () => this.add() },
                        ]
                    ]
                },
                table: {
                    rowKey:'roadId',  //展开表格唯一标识
                    expandOnly: true, //是否展开唯一
                    prefixHeight: 0, //修复计算高度差值
                    tableHeight: 250, //设置表格高度。关闭自动计算高度时。会取这个高度
                    loadType: 'page', // 数据展现方式 page（分页）list（列表滚动到底部加载下一页）
                    calcTableHeight: false, // 是否开启表格自动高度计算
                    columns: [
                        { label: '展开', type: 'expand' },
                        { label: '序号', type: 'index' },
                        { label: '道路名称', key: 'roadName'},
                        { label: '所属区域', key: 'districtName' }
                    ]
                }
            },
            config2: {
                method: 'POST',
                url: `${baseURL}/report/work/statRoadWorkInfo/sumToWorkLine`,
                table: {
                    rowKey:'workLineId',  //展开表格唯一标识
                    expandOnly: true, //是否展开唯一
                    prefixHeight: 0,
                    tableHeight: 250,
                    loadType: 'list', //设置不显示分页
                    tableDataType: 'list', //表格数据结构按照不分页展示
                    calcTableHeight: false, // 是否开启表格自动高度计算
                    columns: [
                        { label: '展开', type: 'expand' },
                        { label: '序号', type: 'index' },
                        { label: '道路名称', key: 'roadName'},
                        { label: '所属标段', key: 'sectionName' }
                    ]
                }
            }
        }
    },
    methods: {
        expandChange1(row, expandedRows){
            // row 当前展开数据
            // expandedRows 存放展开数据对象
            // 配置了唯一展开之后expandOnly:true 这里如果有数据就标识是展开的 以此判断
            expandedRows.length ? this.extraParam2.roadId = row.roadId : this.extraParam2.roadId = ''
            expandedRows.length ? this.extraParam2.beginDate = row.date : this.extraParam2.beginDate = ''
            expandedRows.length ? this.extraParam2.endDate = row.date : this.extraParam2.endDate = ''
            this.$message({message: expandedRows.length ? '展开':'关闭',type: 'success'})
        },
        add() {
            this.$message({message: '点击了新增',type: 'success'})
        },
    }
}
</script>  

```
:::






### 表格配置滚动到底部加载下一页

:::warning
- 必须设置`rowKey`数据唯一标识（默认为`rowKey:'id'`）。
- `loadType: 'list'`加载方式按照列表滚动加载
:::


:::demo
```html
<template>
    <div>
        <cube-Table-List :config="config" /> 
    </div>
</template>

<script>
  export default {
    data() {
        // 仅仅文档内使用 开发或者正式环境请填写完整url
        const baseURL = this.$baseURL
        return {
            centerDialogVisible:false,
            config: {
                method: 'POST',
                url: `${baseURL}/section/search`,
                search: {
                    data: [
                        [
                            {
                                type: 'cubeSelectTree',
                                value: null,
                                key: 'sectionId',
                                config: {
                                    keyName: 'label',
                                    keyCode: 'value',
                                    url: `${baseURL}/map/getSectionTree`,
                                    focusOnload: false, // 是否多次加载（是否获取焦点就加载）
                                    placeholder: '请选择标段',
                                    treeDefaultProps: {
                                        children: 'children',
                                        label: 'label'
                                    }
                                }
                            },
                            {  
                                type: 'cubeCascader',
                                value: null,
                                key: 'manageDeptId',
                                extraParam:{ // 其他请求拓展参数
                                    treeId:'aed26b5a-00e8-4c87-99a5-3345582239f9'
                                },
                                config: {
                                    placeholder: '请选择主管单位',
                                    keyCode: 'value',
                                    keyName: 'label', 
                                    children: 'children', 
                                    method: 'GET',
                                    url: `${baseURL}/customDept/tree`,
                                }
                             },
                            { type: 'search', name: '查询' },
                            { type: 'reset', name: '重置' }
                        ],
                        [
                            { type: 'add', name: '新增', action: () => this.add() },
                        ]
                    ]
                },
                table: {
                    rowKey:'sectionId',
                    loadType: 'list',
                    prefixHeight: 0,
                    tableHeight: 250,
                    calcTableHeight: false, // 是否开启表格自动高度计算
                    columns: [
                        { label: '选择', type: 'selection' },
                        { label: '序号', type: 'index' },
                        { label: '标段编号', key: 'code'},
                        { label: '主管单位', key: 'manageDeptName' },
                        {
                            label: '操作',
                            key: 'drawNum',
                            render: (h, parmas) => {
                                const { row } = parmas
                                return (
                                    <div class='flex-table-cell'>
                                        <div class='btn-text' onClick={() => this.handlerType(0, row)}>详情</div>
                                        <div class='btn-text' onClick={() => this.handlerType(1, row)}>编辑</div>
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
            this.$message({message: type? '数据编辑':'数据详情',type: 'success'})
        }
    }
}
</script>  

```
:::

全部配置参数

``` js
    config: {
        method: 'POST',
        url: '',
        search: {
          data: []
        },
        table: {
          rowKey: 'id', // 展开表格唯一标识（展开唯一 + 滚动加载判断是否重复 - 很重要）
          expandOnly: true, // 是否展开唯一
          tableHeight: 400, // 如果关闭自动开启计算高度 - 这个字段建议传入。
          calcTableHeight: true, // 是否开启表格自动高度计算 - 开启则忽略tableHeight设置的高度
          loadType: 'page', // 加载方式 page选择分页, list滚动到底部加载（list 不显示分页）
          tableDataType: 'page', // 后台返回数据结构 默认是分页 list 不分页列表数据结构
          prefixHeight: 10, // 自动计算高度修复余量
        },
        loading: {
          loadingText: '拼命加载中',
          loadingIcon: 'el-icon-loading',
          loadingBackGround: 'rgba(242, 248, 254, 0.9)'
        },
        pagination: {
          pageSizes: [10, 30, 50, 70, 100], // 默认分页可选择的每页显示的页数
          size: 10, // 分页每页默认显示50条
          currentPage: 1, // 当前默认第一页
          total: 0 // 总条数
        }
    }
```

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| extraParam | 额外拓展参数  |  Object |  --  |
