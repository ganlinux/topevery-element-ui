
<template>
  <el-form
    ref="form"
    :model="form"
    size="mini"
    element-loading-text="数据加载中,请耐心等待..."
    label-width="140px"
    label-position="right"
  >
    <div class="tip"> 表单验证相关</div>
    <p> 基于verify插件支持的校验 + 饿了么原生校验 </p>

    <div class="tip"> 关联校验 监听其他变量，触发自身校验 密码 - 确认密码 </div>
    <el-form-item label="密码" prop="key1" verify>
      <el-input v-model.trim="form.key1" clearable />
    </el-form-item>
    <el-form-item
      label="确认密码"
      prop="key2"
      :verify="verifyPassword"
      :watch="form.key1"
    >
      <el-input v-model.trim="form.key2" clearable />
    </el-form-item>

    <div class="tip"> 简单数字校验 大于0的正整数 不能为空</div>
    <el-form-item label="年龄" prop="age1" verify int :gt="0">
      <el-input v-model="form.age1" />
    </el-form-item>

    <div class="tip"> 简单数字校验 大于0的正整数 可以为空</div>
    <el-form-item
      label="年龄"
      prop="age2"
      verify
      int
      can-be-empty
    >
      <el-input v-model="form.age2" />
    </el-form-item>

    <div class="tip">  自定义添加校验 </div>
    <el-form-item
      label="年龄"
      prop="age2"
      verify
      valid-number-r2
    >
      <el-input v-model="form.age2" />
    </el-form-item>

    <div class="footer">
      <el-button
        type="primary"
        @click="submitHandler('form')"
      >
        提交
      </el-button>
      <el-button @click="resetForm('form')"> 取消 </el-button>
    </div>
  </el-form>
</template>
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
        age2: ''
      }
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
