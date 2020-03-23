
<template>
  <div>
    <Md />
  </div>
</template>

<script>

import Md from '~packages/FormValidation/index.md'
import { initHighlightBlock } from '@/utils'

export default {
  name: 'FormValidationX',
  title: '表单验证',
  components: {
    Md
  },
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
    initHighlightBlock(this)
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
