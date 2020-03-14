<template>
  <el-form :model="model">
    <el-form-item label="密码" prop="pass1" verify>
      <el-input v-model="model.pass1" />
    </el-form-item>
    <el-form-item
      label="确认密码"
      prop="pass2"
      :verify="verifyPassword"
      :watch="model.pass1"
    >
      <el-input v-model="model.pass2" />
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      model: {
        pass1: '',
        pass2: ''
      }
    }
  },
  methods: {
    verifyPassword(rule, val, callback) {
      if (val !== this.model.pass1) callback(Error('两次输入密码不一致!'))
      else callback()
    }
  }
}
</script>
