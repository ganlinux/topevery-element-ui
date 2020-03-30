## 表单验证相关

基于verify插件支持的校验 + 饿了么原生校验。

::: warning 
表单校验必须包含表单校验元素， `el-form` + `el-form-item` + `prop` + `verify` 
:::

### 基础用法一


::: tip 
关联校验
:::

:::demo
```html
<template>
 <el-form ref="form" :model="form" size="mini" label-width="90px">
    <el-form-item label="密码" prop="key1" verify>
        <Cube-Input v-model.trim="form.key1" />
    </el-form-item>
    <el-form-item label="确认密码" prop="key2" :verify="verifyPassword" :watch="form.key1">
        <Cube-Input v-model.trim="form.key2" />
    </el-form-item>
    <div class="footer">
        <el-button type="primary" @click="submitHandler('form')">提交</el-button>
        <el-button @click="resetForm('form')"> 取消 </el-button>
    </div>
</el-form >
</template>

<script>
export default {
  data() {
    return {
      form: {
        key1: '',
        key2: ''
      },
    }
  },
  methods: {
    verifyPassword(rule, val, callback) {
      if (val !== this.form.key1) callback(Error('两次输入密码不一致!'))
       else callback()
    },
     submitHandler(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.$message({message: '表单校验通过。可以提交数据',type: 'success'})
            } else {
                this.$message({message: '请核实表单',type: 'warning'})
            }
        })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields()
        setTimeout(_ => { this.$refs[formName].clearValidate()}, 0)
    }
 }    
}
</script>
```
:::


::: tip 
添加必填校验 设置 verify 属性即可
:::

:::demo
```html
<template>
 <el-form ref="form" :model="form" size="mini" label-width="90px">

    <el-form-item label="姓名" prop="name" verify>
        <cube-input v-model="form.name" />
    </el-form-item>

     <el-form-item label="食品" prop="food" verify>
        <Select-Bar v-model="form.food" :options="options" />
    </el-form-item>


    <div class="footer">
        <el-button type="primary" @click="submitHandler('form')">提交</el-button>
        <el-button @click="resetForm('form')"> 取消 </el-button>
    </div>
</el-form >
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        food: ''
      },
        options: [
            { value: '9A0566CFE022',label: '黄金糕'}, 
            { value: '9A0566CFE023',label: '双皮奶'},
            { value: '9A0566CFE024', label: '蚵仔煎'},
            { value: '9A0566CFE027', label: '龙须面'}, 
            { value: '9A0566CFE028', label: '北京烤鸭'}
        ],
    }
  },
  methods: {
    verifyPassword(rule, val, callback) {
      if (val !== this.form.key1) callback(Error('两次输入密码不一致!'))
       else callback()
    },
     submitHandler(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.$message({message: '表单校验通过。可以提交数据',type: 'success'})
            } else {
                this.$message({message: '请核实表单',type: 'warning'})
            }
        })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields()
        setTimeout(_ => { this.$refs[formName].clearValidate()}, 0)
    }
 }    
}
</script>
```
:::

::: tip 
使用自定义校验、金额数字为为两位小数、设置校验。可以为空输入
:::

:::demo
```html
<template>
 <el-form ref="form" :model="form" size="mini" label-width="90px">

    <el-form-item label="姓名" prop="name" verify can-be-empty>
        <cube-input v-model="form.name" />
    </el-form-item>

     <el-form-item label="食品" prop="food" verify>
        <Select-Bar v-model="form.food" :options="options" />
    </el-form-item>

    <el-form-item label="价格" prop="price" verify valid-number-r2 can-be-empty>
        <Cube-Input v-model="form.price" />
    </el-form-item>

    <div class="footer">
        <el-button type="primary" @click="submitHandler('form')">提交</el-button>
        <el-button @click="resetForm('form')"> 取消 </el-button>
    </div>
</el-form >
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        food: '',
        price: '',
      },
        options: [
            { value: '9A0566CFE022',label: '黄金糕'}, 
            { value: '9A0566CFE023',label: '双皮奶'},
            { value: '9A0566CFE024', label: '蚵仔煎'},
            { value: '9A0566CFE027', label: '龙须面'}, 
            { value: '9A0566CFE028', label: '北京烤鸭'}
        ],
    }
  },
  methods: {
    verifyPassword(rule, val, callback) {
      if (val !== this.form.key1) callback(Error('两次输入密码不一致!'))
       else callback()
    },
     submitHandler(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.$message({message: '表单校验通过。可以提交数据',type: 'success'})
            } else {
                this.$message({message: '请核实表单',type: 'warning'})
            }
        })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields()
        setTimeout(_ => { this.$refs[formName].clearValidate()}, 0)
    }
 }    
}
</script>
```
:::