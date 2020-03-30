## 表单验证相关

基于verify插件支持的校验 + 饿了么原生校验。引入使用

### 基本用法

::: warning 
表单校验必须内容提醒，表单 `el-form` + `el-form-item` + `prop` + `verify` 
:::

:::demo 表单 `el-form` + `el-form-item` + `prop` + `verify` 

``` html
<el-form ref="form" :model="form" size="mini" label-width="140px">
    <div class="tip"> 关联校验 </div>
    <el-form-item label="密码" prop="key1" verify>
        <Cube-Input v-model.trim="form.key1" />
    </el-form-item>
    <el-form-item label="确认密码" prop="key2" :verify="verifyPassword" :watch="form.key1">
        <Cube-Input v-model.trim="form.key2" />
    </el-form-item>

    <div class="tip">  添加必填校验 设置 verify 属性即可 </div>
    <el-form-item label="食品" prop="age1" verify>
        <Select-Bar v-model="form.age1" :options="options" />
    </el-form-item>

    <div class="tip"> 简单数字校验 大于0的正整数 可以为空</div>
    <el-form-item label="年龄" prop="age2" verify int can-be-empty>
        <Cube-Input v-model="form.age2" />
    </el-form-item>

    <div class="tip"> 使用自定义校验、金额数字为为两位小数 </div>
    <el-form-item label="金额" prop="age3" verify valid-number-r2>
        <cube-input v-model="form.age3" />
    </el-form-item>

    <div class="footer">
        <el-button type="primary" @click="submitHandler('form')">
            提交
        </el-button>
        <el-button @click="resetForm('form')"> 取消 </el-button>
    </div>
</el-form>

<script>
    export default {
        name: 'FormValidation',
        title: '表单验证',
        data() {
            return {
                form: {
                    key1: '',
                    key2: '',
                    age1: '',
                    age2: '',
                    age3: '',
                },
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
            }
        },
        mounted() {
            console.log(this)
        },
        methods: {
            verifyPassword(rule, val, callback) {
                if (val !== this.form.key1) callback(Error('两次输入密码不一致!'))
                else callback()
            },
            submitHandler(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$message({
                            message: '表单校验通过。可以提交数据',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: '请核实表单',
                            type: 'warning'
                        })
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
                setTimeout(_ => {
                    this.$refs[formName].clearValidate()
                }, 0)
            }
        }
    }
</script>
```
:::


:::demo 表单 `el-form` + `el-form-item` + `prop` + `verify` 

``` html
<el-form ref="form" :model="form" size="mini" label-width="140px">
    <div class="tip"> 关联校验 </div>
    <el-form-item label="密码" prop="key1" verify>
        <Cube-Input v-model.trim="form.key1" />
    </el-form-item>
    <el-form-item label="确认密码" prop="key2" :verify="verifyPassword" :watch="form.key1">
        <Cube-Input v-model.trim="form.key2" />
    </el-form-item>

    <div class="tip">  添加必填校验 设置 verify 属性即可 </div>
    <el-form-item label="食品" prop="age1" verify>
        <Select-Bar v-model="form.age1" :options="options" />
    </el-form-item>

    <div class="tip"> 简单数字校验 大于0的正整数 可以为空</div>
    <el-form-item label="年龄" prop="age2" verify int can-be-empty>
        <Cube-Input v-model="form.age2" />
    </el-form-item>

    <div class="tip"> 使用自定义校验、金额数字为为两位小数 </div>
    <el-form-item label="金额" prop="age3" verify valid-number-r2>
        <cube-input v-model="form.age3" />
    </el-form-item>

    <div class="footer">
        <el-button type="primary" @click="submitHandler('form')">
            提交
        </el-button>
        <el-button @click="resetForm('form')"> 取消 </el-button>
    </div>
</el-form>

<script>
    export default {
        name: 'FormValidation',
        title: '表单验证',
        data() {
            return {
                form: {
                    key1: '',
                    key2: '',
                    age1: '',
                    age2: '',
                    age3: '',
                },
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
            }
        },
        mounted() {
            console.log(this)
        },
        methods: {
            verifyPassword(rule, val, callback) {
                if (val !== this.form.key1) callback(Error('两次输入密码不一致!'))
                else callback()
            },
            submitHandler(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$message({
                            message: '表单校验通过。可以提交数据',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: '请核实表单',
                            type: 'warning'
                        })
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
                setTimeout(_ => {
                    this.$refs[formName].clearValidate()
                }, 0)
            }
        }
    }
</script>
```
:::

