## SearchBar 表格顶部搜索组件

一般是配合`CubeTable`表格组件组件组合成列表组件。做列表业务的顶部数据检索区域。
左右两个区块，左边做数据过滤检索，右边是功能操作项。

### 基础配置使用 - 输入框(input)、 下拉(option)、 日期(date 、2020-05-18)

传入`data` [ [左边配置], [右边配置]], [左边配置]配置一般指定`type`渲染组件，组件回调接收参数`value`,`key`为定义后台检索需要字段。 日期范围/时间范围具体配置请查看如下代码。

:::demo `Cube-Search-Bar`元素中注入`data`对象数组配置搜索栏类型。以及相关参数配置

```html
  <template>
    <Cube-Search-Bar ref="SearchBar" :data="config"  />
  </template>

  <script>

    export default {
      data() {
        return {
          config:[
            [
              { type: 'input', value: null, key: 'inputKey', placeholder: '输入框' },
              { type: 'option', value: null, key: 'optionKey', placeholder: '下拉框', options: [
                { value: '1', label: '未到期' },
                { value: '2', label: '已到期' },
                { value: '3', label: '未参保' }],
                change: (e)=> this.change(e)
              },
              { type: 'date', value: null, key: 'dateKey', placeholder: '日期' },
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '参数收集', keyType: 'primary', plain: true, icon: 'el-icon-s-order' , action: ()=> this.handlerClick('参数收集') }
            ]
          ]
        }
      },
      methods: {
        change(e){
          this.$message(e,'选择改变触发');
        },
        handlerClick(){
          const params = this.$refs['SearchBar'].getSearchParams()
          this.$alert( params , '收集参数', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }
      },
    }
  </script>
```
:::


### cube组件配置使用 - 树形选择(cubeSelectTree)、 分页列表(cubeSelect)、 级联选择(cubeCascader)

传入`data` [ [左边配置], [右边配置]], [左边配置]配置一般指定`type`渲染组件，组件回调接收参数`value`,`key`为定义后台检索需要字段。 日期范围/时间范围具体配置请查看如下代码。

:::demo `Cube-Search-Bar`元素中注入`data`对象数组配置搜索栏类型。以及相关参数配置

```html
  <template>
    <Cube-Search-Bar ref="SearchBar" :data="config"  />
  </template>

  <script>

    export default {
      data() {
        return {
          config:[
            [
              {
                type: 'cubeSelectTree',
                value: null,
                key: 'cubeSelectTreeKey',
                config: {
                  keyName: 'label',
                  keyCode: 'value',
                  // url: '/static/tree.json',  // 动态
                  // focusOnload: false, // 动态
                  placeholder: '请选择标段',
                  isStaticOptions: true, // 静态,
                  options: this.$mockTree, // 静态
                  treeDefaultProps: {
                    children: 'children',
                    label: 'label'
                  }
                }
              },
              {
                type: 'cubeSelect',
                value: null,
                key: 'cubeSelectKey',
                config: {
                  keyName: 'code',
                  keyCode: 'sectionId',
                  // method: 'GET',
                  // url: '/static/section.json',
                  // searchName: 'sectionName',
                  isNoPage: true, //设置不分页
                  isStaticOptions: true, // 设置为静态属性使用,
                  options: this.$mockSection.records, 
                  placeholder: '标段选择-分页',
                  column: [ 
                    { key: 'code', label: '名称' },
                    { key: 'statusStr', label: '状态' }
                  ]
                }
              },
              {
                type: 'cubeCascader',
                value: null,
                key: 'cubeCascaderKey',
                config: {
                  keyCode: 'value',
                  keyName: 'label', 
                  children: 'children', 
                  // method: 'GET',
                  // url: '/static/tree.json',
                  isStaticOptions: true,
                  options: this.$mockTree,
                }
              },
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '参数收集', keyType: 'primary', plain:true, icon: 'el-icon-s-order' , action: ()=> this.handlerClick('参数收集') }
            ]
          ]
        }
      },
      methods: {
        change(e){
          this.$message(e,'选择改变触发');
        },
        handlerClick(){
          const params = this.$refs['SearchBar'].getSearchParams()
          this.$alert( params , '收集参数', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }
      },
    }
  </script>
```
:::


### 时间范围配置使用 - 日期范围(daterange)；日期时间范围(datetimerange)、

传入`data` [ [左边配置], [右边配置]], [左边配置]配置一般指定`type`渲染组件，组件回调接收参数`value`,`key`为定义后台检索需要字段。 日期范围/时间范围具体配置请查看如下代码。

:::demo `Cube-Search-Bar`元素中注入`data`对象数组配置搜索栏类型。以及相关参数配置

```html
  <template>
    <Cube-Search-Bar ref="SearchBar" :data="config"  />
  </template>

  <script>

    export default {
      data() {
        return {
          config:[
            [
              { type: 'daterange', value: null, key1: 'beginDate1', key2: 'endDate1',
               placeholder1: '开始日期', placeholder2: '结束日期' },
              { type: 'datetimerange', value: null, key1: 'beginDate2', key2: 'endDate2',
               placeholder1: '开始时间', placeholder2: '结束时间' },
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '参数收集', keyType: 'primary', 
              plain:true, icon: 'el-icon-s-order' , action: ()=> this.handlerClick('参数收集') }
            ]
          ]
        }
      },
      methods: {
        change(e){
          this.$message(e,'选择改变触发');
        },
        handlerClick(){
          const params = this.$refs['SearchBar'].getSearchParams()
          this.$alert( params , '收集参数', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }
      },
    }
  </script>
```
:::


### 其他范围配置使用 - 月份范围(monthrange)；日期时间范围(datetimerange)、

传入`data` [ [左边配置], [右边配置]], [左边配置]配置一般指定`type`渲染组件，组件回调接收参数`value`,`key`为定义后台检索需要字段。 日期范围/时间范围具体配置请查看如下代码。

:::demo `Cube-Search-Bar`元素中注入`data`对象数组配置搜索栏类型。以及相关参数配置

```html
  <template>
    <Cube-Search-Bar ref="SearchBar" :data="config"  />
  </template>

  <script>

    export default {
      data() {
        return {
          config:[
            [
              { type: 'monthrange', value: null, key1: 'beginDate1', key2: 'endDate1'},
              { type: 'monthrange', value: null, key1: 'beginDate2', key2: 'endDate2'},
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '参数收集', keyType: 'primary', 
              plain:true, icon: 'el-icon-s-order' , action: ()=> this.handlerClick('参数收集') }
            ]
          ]
        }
      },
      methods: {
        change(e){
          this.$message(e,'选择改变触发');
        },
        handlerClick(){
          const params = this.$refs['SearchBar'].getSearchParams()
          this.$alert( params , '收集参数', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }
      },
    }
  </script>
```
:::


### 左边-组件配置说明

传入`data` [ [左边配置]], [左边配置]常规配置`{ type: '组件类型', value: null, key: '后台接收检索字段', option:'特定组件选项'... }`等几项约定必填。

:::demo `Cube-Search-Bar`元素中注入`data`对象数组配置搜索栏类型。以及相关参数配置

```html
  <template>
    <Cube-Search-Bar :data="config1"  />
    <Cube-Search-Bar :data="config2" style="margin-top: 10px;"  />
  </template>

  <script>
    export default {
      data() {
        return {
          config1:[
            [
              { type: 'input', value: null, key: 'carName', placeholder: '车牌号' },
              { type: 'option', value: null, key: 'insuredState', placeholder: '参保状态', options: [
                { value: '1', label: '未到期' },
                { value: '2', label: '已到期' },
                { value: '3', label: '未参保' }]
              },
              { type: 'date', value: null, key: 'carName', placeholder: '日期' },
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
            ]
          ],
          config2:[
            [
              { type: 'multiple-date', value: null, dateTimeRange: false, key1: 'BeginDate', key2: 'EndDate ', placeholder1: '开始日期', placeholder2: '结束日期' },
              { type: 'multiple-date', value: null, dateTimeRange: true, key1: 'BeginDate', key2: 'EndDate ', placeholder1: '开始时间', placeholder2: '结束时间' },
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '导出', keyType: 'primary', icon: 'el-icon-plus' }
            ]
          ]
        }
      }
    }
  </script>
```
:::


### 右边边-操作项配置说明

::: warning 
操作项都是做事件处理，为了事件的处理请指定 `{ type: button ...}` 
:::

传入`data` [ [右边配置]], [右边配置]常规配置`{ type: 'button', value: null, key: '后台接收检索字段', option:'特定组件选项'... }`等几项约定必填。
`type:command`会渲染下拉菜单。选择下拉菜单回调`command`方法。回调参数为显示的名字、

::: tip 
V1 版本中的事件响应的通过子组件向外`$emit`触发的，所有`type: 'button'` 被点击之后会触发统一的`clickBtn`再通过回调出来的参数判断是什么具体的操作项触发。例子如下。如果是操作项太多或者有下拉选择的时候。需要做的事件判断就会相对的麻烦
:::

:::demo `Cube-Search-Bar`元素中注入`data`对象数组配置搜索栏类型。以及相关参数配置

```html
  <template>
    <Cube-Search-Bar :data="config1" @clickBtn="clickBtn" @command="command"  />
  </template>

  <script>
    export default {
      data() {
        return {
          config1:[
            [
              { type: 'input', value: null, key: 'carName', placeholder: '车牌号' },
              { type: 'option', value: null, key: 'insuredState', placeholder: '参保状态', options: [
                { value: '1', label: '未到期' },
                { value: '2', label: '已到期' },
                { value: '3', label: '未参保' }]
              },
              { type: 'date', value: null, key: 'carName', placeholder: '日期' },
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '添加', keyType: 'success', icon: 'el-icon-plus' },
              { type: 'button', name: '导出', keyType: 'primary', icon: 'el-icon-s-order' },
              { type: 'button', name: '提交审核', keyType: 'primary', icon: 'el-icon-s-order' },
              {
                type: 'more', options: [
                  { icon: 'el-icon-paperclip', label: '批量禁用' },
                  { icon: 'el-icon-document-remove', label: '批量启用' }
                ]
              }
            ]
          ]
        }
      },
      methods: {
        clickBtn(item) {
          switch (item.name) {
            case '添加':
            {
              this.$message({ message: '添加', type: 'info' })
              return
            }
            case '导出':
            {
              this.$message({ message: '导出', type: 'info' })
              return
            }
            case '提交审核':
            {
              this.$message({ message: '提交审核', type: 'info' })
              return
            }
            default:
              break
          }
        },
        command(name){
          switch (name) {
            case '批量禁用':
            {
              this.$message({ message: '批量禁用', type: 'info' })
              return
            }
            case '批量启用':
            {
              this.$message({ message: '批量启用', type: 'info' })
              return
            }
            default:
              break
          }
        }
      }
    }
  </script>
```
:::

::: tip 
V2 版本中的事件响应新写法。`type: 'button' ` 中直接传递 `action`事件响应。这样写法就比较简单了。具体如下.(新版本中做了兼容v1写法也是可以支持)
:::

:::demo `Cube-Search-Bar`元素中注入`data`对象数组配置搜索栏类型。以及相关参数配置

```html
  <template>
    <Cube-Search-Bar :data="config1" />
  </template>

  <script>
    export default {
      data() {
        return {
          config1:[
            [
              { type: 'input', value: null, key: 'carName', placeholder: '车牌号' },
              { type: 'option', value: null, key: 'insuredState', placeholder: '参保状态', options: [
                { value: '1', label: '未到期' },
                { value: '2', label: '已到期' },
                { value: '3', label: '未参保' }]
              },
              { type: 'date', value: null, key: 'carName', placeholder: '日期' },
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '添加', keyType: 'success', icon: 'el-icon-plus' , action: ()=> this.handlerClick('添加') },
              { type: 'button', name: '导出', keyType: 'primary', icon: 'el-icon-s-order' , action: ()=> this.handlerClick('导出') },
              { type: 'button', name: '提交审核', keyType: 'primary', icon: 'el-icon-s-order' , action: ()=> this.handlerClick('提交审核') },
              {
                type: 'more', options: [
                  { icon: 'el-icon-paperclip', label: '批量禁用',action: ()=> this.handlerClick('批量启用') },
                  { icon: 'el-icon-document-remove', label: '批量启用',action: ()=> this.handlerClick('批量启用') }
                ]
              }
            ]
          ]
        }
      },
      methods: {
        handlerClick(mes) {
          this.$message({ message: mes, type: 'info' })
        }
      }
    }
  </script>
```
:::

### `Cube-Search-Bar` 业务-组件参数搜集

组件会收集配置项中传入的`key`集合

:::demo `Cube-Search-Bar`元素中注入`data`对象数组配置搜索栏类型。以及相关参数配置

```html
  <template>
    <Cube-Search-Bar ref="SearchBar" :data="config1" />
  </template>

  <script>
    export default {
      data() {
        return {
          config1:[
            [
              { type: 'input', value: null, key: 'carNumber', placeholder: '车牌号' },
              { type: 'option', value: null, multiple:true,key: 'insuredState', placeholder: '参保状态', options: [
                { value: '1', label: '未到期' },
                { value: '2', label: '已到期' },
                { value: '3', label: '未参保' }]
              },
              { type: 'date', value: null, key: 'date', placeholder: '日期' },
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '参数收集', keyType: 'primary', plain:true, icon: 'el-icon-s-order' , action: ()=> this.handlerClick('参数收集') }
            ]
          ]
        }
      },
      methods: {
        handlerClick(mes) {
          const params = this.$refs['SearchBar'].getSearchParams()
          this.$alert( params , '收集参数', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        }
      }
    }
  </script>
```
:::


### `Cube-Search-Bar` 业务-关联检索与基础多选

组件会收集配置项中传入的`key`集合 `type:option`设置为下拉框选项是业务中最常见的组件。
multiple:false 或者不设置默认为单选,multiple:true 设置为多选。多选返回可以选择 value的集合。类似'id1,id2,id3...'

:::demo `Cube-Search-Bar`元素中注入`data`对象数组配置搜索栏类型。以及相关参数配置， `Cube-Search-Bar`选择完成会触发`change`事件回调选中数据，可以利用这个事件做搜索数据的联动检索。如下。食物类型的选择决定食物的选择。
```html
  <template>
    <Cube-Search-Bar ref="SearchBar" :data="config1" />
  </template>

  <script>
    export default {
      data() {
        return {
          config1:[
            [
              //  multiple:true 设置为多选。多选返回可以选择 value的集合。类似'id1,id2,id3...'
              { type: 'option', value: null, multiple:true,key: 'insuredState', placeholder: '参保状态-设置为多选', options: [
                { value: '1', label: '未到期' },
                { value: '2', label: '已到期' },
                { value: '3', label: '未参保' }]
              },
               { type: 'option', value: null, multiple:false, key: 'foodType', placeholder: '食物类型', options: [
                { value: '1', label: '水果' },
                { value: '2', label: '蔬菜' },
                { value: '3', label: '肉类' },
                ],
                change: (selectValue) => this.footTypeChange(selectValue)
              },
              //  multiple:false 或者不设置默认为单选
              { type: 'option', value: null,key: 'food', placeholder: '食物选择', options: []},
              { type: 'search', name: '查询', icon: 'el-icon-search' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '参数收集', keyType: 'primary', icon: 'el-icon-s-order' , action: ()=> this.handlerClick('参数收集') }
            ]
          ]
        }
      },
      methods: {
        handlerClick(mes) {
          const params = this.$refs['SearchBar'].getSearchParams()
          this.$alert( params , '收集参数', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        },
        //找到key对应的数据对象
        findeKeyItem(key){
          return this.config1[0].find(item=> item.key ===key) 
        },
        footTypeChange(value){
          // 关联项目改变的时候
          // 1 情况以有选项options
          // 2 切换该类型下options
          // 清空食物已有选项
          this.findeKeyItem('food').options = []
          this.findeKeyItem('food').value = null
          //这里模拟一下假数据。真实场景替换这里是根据选择值加载对应数据接口请求
          switch (value) {
            case '1':
              // 模拟数据加载
              setTimeout(() => {
                this.findeKeyItem('food').options = [
                  { value: '1', label: '香蕉' },
                  { value: '2', label: '苹果' },
                  { value: '3', label: '雪梨' },
                ]
              }, 1000);
              break;
            case '2':
              // 模拟数据加载
              setTimeout(() => {
                this.findeKeyItem('food').options = [
                  { value: '1', label: '白菜' },
                  { value: '2', label: '豆芽' },
                  { value: '3', label: '地瓜' },
                ]
              }, 1000);
              break;
            case '3':
              // 模拟数据加载
              setTimeout(() => {
                this.findeKeyItem('food').options = [
                  { value: '1', label: '猪肉' },
                  { value: '2', label: '牛肉' },
                  { value: '3', label: '龙肉' },
                ]
              }, 1000);
              break;
          
            default:
              break;
          }
        }
      }
    }
  </script>
```
:::


### SearchBar Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | 显示的数据 | array | — | — |

### SearchBar Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| clearSelection | 用于多选表格，清空用户的选择 | — |
| doLayout | 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法 | — |

 