export default {
  data() {
    return {
      rules: {
        input: [
          {
            required: true,
            message: '请输入',
            trigger: 'change'
          }
        ],
        select: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        // 两位小数 不可0
        validNumberR2: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        // 两位小数 可0
        validNumberR20: (rule, value, callback) => {
          if (isNaN(value)) {
            return callback(new Error('请输入有效数字'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        validNumberR3: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,5})(\.[\d]{1,3})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        },
        validPhone: (rule, value, callback) => {
          if (!value) {
            return callback(new Error('请输入'))
          }
          var reg = /^[1][3,4,5,7,8][0-9]{9}$/
          if (!reg.test(value)) {
            return callback(new Error('请输入正确的手机号'))
          }
          callback()
        },
        // 座机
        validTelphone: (rule, value, callback) => {
          if (!value) {
            callback()
          }
          var reg = /0\d{2,3}-\d{7,8}/
          if (!reg.test(value)) {
            return callback(new Error('请输入正确的座机'))
          }
          callback()
        },
        validNumberR8: (rule, value, callback) => {
          if (!value && value !== 0) {
            return callback(new Error('请输入'))
          }
          var reg = /^([0-9][\d]{0,8})(\.[\d]{1,2})?$/
          if (!reg.test(value)) {
            return callback(new Error('请输入有效数字'))
          }
          callback()
        }
      }
    }
  }
}
