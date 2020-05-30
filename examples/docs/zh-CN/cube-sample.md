<!--
 * @Author: shiliangL
 * @Date: 2020-05-22 15:46:00
 * @LastEditTime: 2020-05-23 09:54:42
 * @LastEditors: Do not edit
 * @Description: 
 * @FilePath: /topevery-element-ui-v2/examples/docs/zh-CN/cube-sample.md
--> 

## 开发重难点样例


### 1.表格多行校验

:::warning
- 表单校验顾名思义。就是校验form模型中的属性。
- 关键点prop唯一性
- 需要唯一的key
- vue有相同父元素的子元素必须有独特的key。重复的key会造成渲染错误。
:::

#### 表格内动态增减表单校验 + 简单版 + 只是简单校验必填

在表格内部校验动态新增数据，行内数据输入校验。

:::warning

- 不推荐代码 ！！！！。不要用

 下面故意写一个错误的样例。因为这个错误，并不会导致代码或者业务不能使用。只是一个常常被被忽略的。
 添加2行以上。在其中一个行中输入，如果输入当前行（这一行往下还有一行）。然后在删除当前。你会发现会‘无端端的’‘往下掉一般’触发下一行的校验，
 而已不是真正意义的删除你需要删除的行。
:::

:::demo
```html
<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="0">
    <el-button type="primary" size="mini" @click="addList" style="float: right;">车辆调入</el-button>
    <el-table
      :data="dynamicValidateForm.tableData"
      border
      style="width: 100%">
      <el-table-column prop="number" label="收运车次" align="center">
          <template slot-scope="scope">
            <el-form-item
                label=""
                :prop="'tableData.' + scope.$index+'.number'"
                :rules="{ required: true, message: '请输入', trigger: 'change' }">
                <el-input v-model="scope.row.number"></el-input>
            </el-form-item>
          </template>
      </el-table-column>
      
      <el-table-column prop="time" label="收运时间" align="center">
          <template slot-scope="scope">
            <el-form-item
                label=""
                :prop="'tableData.' + scope.$index+'.time' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}">
                <el-input v-model="scope.row.time"></el-input>
            </el-form-item>
            </template>
      </el-table-column>

      <el-table-column prop="time" label="去向" align="center">
          <template slot-scope="scope">
            <el-form-item
                label=""
                :prop="'tableData.' + scope.$index+'.go' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}">
                <el-select v-model="scope.row.go" placeholder="请选择">
                    <el-option 
                        v-for="item in options" 
                        :key="item.value" :label="item.label" 
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            </template>
      </el-table-column>

      <el-table-column prop="time" label="操作" align="center" width="90">
          <template slot-scope="scope">
            <el-button style="margin-bottom: 18px;" type="danger" @click="removeList(scope.$index,scope.row)">删除</el-button>
          </template>
      </el-table-column>
      
    </el-table>
 
    <el-form-item style="text-align: center;margin-top: 10px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>

</el-form>

<script>
  export default {
    data() {
      return {
        options: [
            { value: 'ksfaskweqwe', label: '处理厂A' }, 
            { value: 'ksfaskweqws', label: '处理厂B'}
        ],
        dynamicValidateForm: {
          tableData:[ ],
        }
      };
    },
    mounted() {
        // 默认一条数据
        this.addList()
    },
    methods: {
        // 前端模拟一个 唯一的指 提交数据的时候建议删掉
        guid() {
            function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
        },
        addList(){
            this.dynamicValidateForm.tableData.push({number: '' , time: '', webid: this.guid() })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({ message: '表单校验通过~',type: 'success'})
                } else {
                    this.$message({ message: '请核实表单',type: 'warning'})
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeList(index,row) {
            if (this.dynamicValidateForm.tableData.length===1) return
            this.dynamicValidateForm.tableData.splice(index,1)
        },
    }
  }
</script>
```
:::


:::tip
- 推荐用法~

 修复上面的错误。正确推荐写法。
 key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。
 如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
 而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
 <a href="https://www.zhihu.com/question/61064119" target="_blank">更多关于上面错误的描述。以及相关知识点</a>
:::

:::demo
```html
<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="0">
    <el-button type="primary" size="mini" @click="addList" style="float: right;">车辆调入</el-button>
    <el-table
      :data="dynamicValidateForm.tableData"
      border
      style="width: 100%">
      <el-table-column prop="number" label="收运车次" align="center">
          <template slot-scope="scope">
            <el-form-item
                label=""
                :key="'tableData.' + scope.$index+'.number' + scope.row.webid"
                :prop="'tableData.' + scope.$index+'.number'"
                :rules="{ required: true, message: '请输入', trigger: 'change' }">
                <el-input v-model="scope.row.number"></el-input>
            </el-form-item>
          </template>
      </el-table-column>
      
      <el-table-column prop="time" label="收运时间" align="center">
          <template slot-scope="scope">
            <el-form-item
                label=""
                :key="'tableData.' + scope.$index+'.time' + scope.row.webid"
                :prop="'tableData.' + scope.$index+'.time' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}">
                <el-input v-model="scope.row.time"></el-input>
            </el-form-item>
            </template>
      </el-table-column>

      <el-table-column prop="time" label="去向" align="center">
          <template slot-scope="scope">
            <el-form-item
                label=""
                :key="'tableData.' + scope.$index+'.go' + scope.row.webid"
                :prop="'tableData.' + scope.$index+'.go' "
                :rules="{ required: true, message: '请输入', trigger: 'change'}">
                <el-select v-model="scope.row.go" placeholder="请选择">
                    <el-option 
                        v-for="item in options" 
                        :key="item.value" :label="item.label" 
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            </template>
      </el-table-column>

      <el-table-column prop="time" label="操作" align="center" width="90">
          <template slot-scope="scope">
            <el-button style="margin-bottom: 18px;" type="danger" @click="removeList(scope.$index,scope.row)">删除</el-button>
          </template>
      </el-table-column>
      
    </el-table>
 
    <el-form-item style="text-align: center;margin-top: 10px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>

</el-form>

<script>
  export default {
    data() {
      return {
        options: [
            { value: 'ksfaskweqwe', label: '处理厂A' }, 
            { value: 'ksfaskweqws', label: '处理厂B'}
        ],
        dynamicValidateForm: {
          tableData:[ ],
        }
      };
    },
    mounted() {
        // 默认一条数据
        this.addList()
    },
    methods: {
        // 前端模拟一个 唯一的指 提交数据的时候建议删掉
        guid() {
            function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
        },
        addList(){
            this.dynamicValidateForm.tableData.push({number: '' , time: '', webid: this.guid() })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({ message: '表单校验通过~',type: 'success'})
                } else {
                    this.$message({ message: '请核实表单',type: 'warning'})
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeList(index,row) {
            const { dynamicValidateForm } = this
            if (dynamicValidateForm.tableData.length===1) return
            this.dynamicValidateForm.tableData.splice(index, 1)
        },
    }
  }
</script>
```
:::



#### 表格内动态增减表单校验 + 加强版 + 校验重复选择 - 饿了么表格版

在表格内部校验动态新增数据，行内数据输入校验。

:::demo
```html
<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="0">
    <el-button type="primary" size="mini" @click="addList" style="float: right;">车辆调入</el-button>
    <el-table
      :data="dynamicValidateForm.tableData"
      border
      style="width: 100%">
      <el-table-column prop="number" label="收运车次" align="center">
          <template slot-scope="scope">
            <el-form-item
                label=""
                :key="'tableData.' + scope.$index+'.number' + scope.row.webid"
                :prop="'tableData.' + scope.$index+'.number'"
                :rules="{ trigger: 'change', validator: rules.validatorNumber }">
                <el-input v-model.trim.number="scope.row.number"></el-input>
            </el-form-item>
          </template>
      </el-table-column>
      
      <el-table-column prop="time" label="收运时间" align="center">
          <template slot-scope="scope">
            <el-form-item
                label=""
                :key="'tableData.' + scope.$index+'.time' + scope.row.webid"
                :prop="'tableData.' + scope.$index+'.time' "
                :rules="{ trigger: 'change', type: 'array', validator: rules.validatorTime }">
                 <el-time-picker
                    style="width: 210px;"
                    is-range
                    value-format="HH:mm:ss"
                    v-model="scope.row.time"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item>
            </template>
      </el-table-column>

      <el-table-column prop="time" label="去向" align="center">
          <template slot-scope="scope">
            <el-form-item
                label=""
                :key="'tableData.' + scope.$index+'.go' + scope.row.webid"
                :prop="'tableData.' + scope.$index+'.go' "
                :rules="{ trigger: 'change', validator: rules.validatorGo }">
                <el-select v-model="scope.row.go" placeholder="请选择">
                    <el-option 
                        v-for="item in options" 
                        :key="item.value" :label="item.label" 
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            </template>
      </el-table-column>

      <el-table-column prop="time" label="操作" align="center" width="90">
          <template slot-scope="scope">
            <el-button style="margin-bottom: 18px;" type="danger" @click="removeList(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
      
    </el-table>
 
    <el-form-item style="text-align: center;margin-top: 10px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>

</el-form>

<script>
  export default {
    data() {
      return {
        options: [
            { value: 'ksfaskweqwe', label: '处理厂A' }, 
            { value: 'ksfaskweqws', label: '处理厂B'}
        ],
        dynamicValidateForm: {
          tableData:[ ],
        },
        rules:{
            validatorNumber: (rule, value, callback)=>{
                // 正整数校验
                const reg = /^([1-9]\d{0,5}|0)$/;
                let limit = typeof rule.low !== 'undefined' ? rule.low : 1;
                if(value === undefined || value === '' || value === null) {
                    return callback(new Error('请输入'));
                }
                if(isNaN(value)){
                    return callback(new Error('请输入数字'));
                };
                if (value - 0 < limit) {
                    return callback('不能小于' + limit);
                }
                if(!reg.test(value)){
                    return callback(new Error('请输入正整数'));
                };
                callback();
            },
            validatorTime: (rule, value, callback)=>{
                if(!value) {
                    return callback(new Error('请选择'));
                }
                // 假装去校验不能选择同样的时间段
                const stringStr = value.toString()
                const stringStrList = this.dynamicValidateForm.tableData.filter(item => item.time.toString() === stringStr ) || []
                if (stringStrList.length>=2) {
                    return callback(new Error('不能选择相同时间段'));
                }else{
                    callback();
                }
            },
            validatorGo: (rule, value, callback)=>{
                if(!value) {
                    return callback(new Error('请选择'));
                }
                // 假装去校验不能选择同样的处理厂
                const stringStr = value
                const stringStrList = this.dynamicValidateForm.tableData.filter(item => item.go === stringStr ) || []
                if (stringStrList.length>=2) {
                    return callback(new Error('不能选择相同处理厂'));
                }else{
                    callback();
                }
            }
        }
      };
    },
    mounted() {
        // 默认一条数据
        this.addList()
    },
    methods: {
        // 前端模拟一个 唯一的指 提交数据的时候建议删掉
        guid() {
            function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
        },
        addList(){
            this.dynamicValidateForm.tableData.push({number: '' , time: '', webid: this.guid() })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({ message: '表单校验通过~',type: 'success'})
                } else {
                    this.$message({ message: '请核实表单',type: 'warning'})
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeList(index,row) {
            const { dynamicValidateForm} = this
            if (dynamicValidateForm.tableData.length===1) return
            this.dynamicValidateForm.tableData.splice(index, 1)
        },
    }
  }
</script>
```
:::

#### 表格内动态增减表单校验 + 加强版 + 校验重复选择 - 原生表格版本

在表格内部校验动态新增数据，行内数据输入校验。这里我们之间借用el-eleme的样式

:::demo
```html
<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="0">
    <el-button type="primary" size="mini" @click="addList" style="float: right;">车辆调入</el-button>

    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--small">
    	<table class="el-table__body" style="font-size: 12px;width: 100%;">
            <thead>
                <tr>
                    <th class="is-center is-leaf">收运车次</th>
                    <th class="is-center is-leaf">版型名称</th>
                    <th class="is-center is-leaf">版型描述</th>
                    <th class="is-center is-leaf" width="90" style="border-right: none;">操作</th>
                </tr>	
            </thead>

            <tbody>
                <template v-if="dynamicValidateForm.tableData && dynamicValidateForm.tableData.length > 0">
                    <tr v-for="(item, index) in dynamicValidateForm.tableData" :key="item.webid" class="el-table__row">
                        <td class="is-center cell">
                            <el-form-item
                                label=""
                                :key="'tableData.' + index+'.number' + item.webid"
                                :prop="'tableData.' + index+'.number'"
                                :rules="{ trigger: 'change', validator: rules.validatorNumber }">
                                <el-input v-model.trim.number="item.number"></el-input>
                            </el-form-item>
                        </td>
                        <td class="is-center">
                            <el-form-item
                                label=""
                                :key="'tableData.' + index+'.time' + item.webid"
                                :prop="'tableData.' + index+'.time' "
                                :rules="{ trigger: 'change', type: 'array', validator: rules.validatorTime }">
                                <el-time-picker
                                    style="width: 210px;"
                                    is-range
                                    value-format="HH:mm:ss"
                                    v-model="item.time"
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    placeholder="选择时间范围">
                                </el-time-picker>
                            </el-form-item>
                        </td>
                        <td class="is-center cell">
                            <el-form-item
                                label=""
                                :key="'tableData.' + index+'.go' + item.webid"
                                :prop="'tableData.' + index+'.go' "
                                :rules="{ trigger: 'change', validator: rules.validatorGo }">
                                <el-select v-model="item.go" placeholder="请选择">
                                    <el-option 
                                        v-for="item in options" 
                                        :key="item.value" :label="item.label" 
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td width="90" class="is-center cell" style="border-right: none;">
                            <el-button style="margin-bottom: 18px;" type="danger" @click="removeList(index,item)">删除</el-button>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr style="border-right: none;">
                        <td colspan="4" class="empty-block">暂无数据</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>        
    <el-form-item style="text-align: center;margin-top: 10px;">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>

</el-form>

<script>
  export default {
    data() {
      return {
        options: [
            { value: 'ksfaskweqwe', label: '处理厂A' }, 
            { value: 'ksfaskweqws', label: '处理厂B'}
        ],
        dynamicValidateForm: {
          tableData:[ ],
        },
        rules:{
            validatorNumber: (rule, value, callback)=>{
                // 正整数校验
                const reg = /^([1-9]\d{0,5}|0)$/;
                let limit = typeof rule.low !== 'undefined' ? rule.low : 1;
                if(value === undefined || value === '' || value === null) {
                    return callback(new Error('请输入'));
                }
                if(isNaN(value)){
                    return callback(new Error('请输入数字'));
                };
                if (value - 0 < limit) {
                    return callback('不能小于' + limit);
                }
                if(!reg.test(value)){
                    return callback(new Error('请输入正整数'));
                };
                callback();
            },
            validatorTime: (rule, value, callback)=>{
                if(!value) {
                    return callback(new Error('请选择'));
                }
                // 假装去校验不能选择同样的时间段
                const stringStr = value.toString()
                const stringStrList = this.dynamicValidateForm.tableData.filter(item => item.time.toString() === stringStr ) || []
                if (stringStrList.length>=2) {
                    return callback(new Error('不能选择相同时间段'));
                }else{
                    callback();
                }
            },
            validatorGo: (rule, value, callback)=>{
                if(!value) {
                    return callback(new Error('请选择'));
                }
                // 假装去校验不能选择同样的处理厂
                const stringStr = value
                const stringStrList = this.dynamicValidateForm.tableData.filter(item => item.go === stringStr ) || []
                if (stringStrList.length>=2) {
                    return callback(new Error('不能选择相同处理厂'));
                }else{
                    callback();
                }
            }
        }
      };
    },
    mounted() {
        // 默认一条数据
        this.addList()
    },
    methods: {
        // 前端模拟一个 唯一的指 提交数据的时候建议删掉
        guid() {
            function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
        },
        addList(){
            this.dynamicValidateForm.tableData.push({number: '' , time: '', webid: this.guid() })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({ message: '表单校验通过~',type: 'success'})
                } else {
                    this.$message({ message: '请核实表单',type: 'warning'})
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeList(index,row) {
            const { dynamicValidateForm} = this
            if (dynamicValidateForm.tableData.length===1) return
            this.dynamicValidateForm.tableData.splice(index, 1)
        },
    }
  }
</script>
```
:::