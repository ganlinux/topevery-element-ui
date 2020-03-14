
// 这个文件维护自定义校验方法 + 这种方式不影响使用 ele 原生的校验

export const elementUIVerifyAddRule = (elementUIVerify) => {
  // 通过getRule方法复用已有的int规则
  const intRuleGetter = elementUIVerify.getRule('int')
  // 非零开头的最多带两位小数的数字
  elementUIVerify.addRule('validNumberR2', () => [
    // 首先校验是否为整数
    intRuleGetter(),
    // 再校验是否为10位
    {
      validator(rule, value, callback) {
        const reg = /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/
        if (!reg.test(value)) {
          return callback(new Error('输入有效数字,小数位不能大于两位'))
        }
        callback()
      }
    }
  ])

  // 验证身份证
  elementUIVerify.addRule('validIdCard', () => [
    {
      validator(rule, value, callback) {
        const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
        if (!reg.test(value)) {
          return callback(new Error('输入有效身份证'))
        }
        callback()
      }
    }
  ])
}

