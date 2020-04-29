
<template>
  <div>
    {{ config.form }}
    <CubeForm :config="config">

      <div slot="other">
        <el-form-item label="审批人">
          <el-input v-model="config.form.user" placeholder="审批人" />
        </el-form-item>
        <el-form-item label="数量">
          <CubeInputNumber v-model="config.form.number" />
        </el-form-item>
      </div>
    </CubeForm>
  </div>
</template>

<script>

import { initHighlightBlock } from '@/utils'
export default {
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: 'CubeForm表单组件',
    pageName: 'CubeForm',
    sort: '1'
  },
  data() {
    return {
      config: {
        form: {
          user: '',
          name: '张文静',
          age: null,
          food: { 'value': '选项5', 'label': '北京烤鸭' },
          date: '',
          money: '',
          number: '',
          time: '',
          textarea: '',
          dateTime: '',
          love: 112211,
          city: []
        },
        formOption: [
          { type: 'input', label: '姓名', prop: 'name', width: '220px', placeholder: '请输入姓名',
            rules: [{ trigger: 'change', required: true, validator: (rule, value, callback) => this.validatorName(rule, value, callback) }]
          },
          { type: 'inputNumber', label: '金额', prop: 'money', width: '220px', placeholder: '请输入' },
          { type: 'textarea', label: '备注描述', prop: 'textarea', width: '220px', placeholder: '请输入' },
          { type: 'input', label: '年龄', prop: 'age', width: '220px', placeholder: '请输入年龄' },
          { type: 'date', label: '日期', prop: 'date', width: '220px', placeholder: '请选择日期' },
          { type: 'time', label: '时间', prop: 'time', width: '220px', placeholder: '请选择时间' },
          { type: 'dateTime', label: '日期时间', prop: 'dateTime', width: '220px', placeholder: '请选择日期时间' },
          { type: 'daterange', label: '日期范围', prop: 'daterange', width: '220px' },
          // { type: 'datetimerange', label: '时间范围', prop: 'datetimerange', width: '220px' },
          { type: 'select', label: '食物', prop: 'food', width: '220px', placeholder: '请选择', valueKey: 'value',
            options: [{ value: '选项3', label: '蚵仔煎' }, { value: '选项4', label: '龙须面' }, { value: '选项5', label: '北京烤鸭' }] },
          { type: 'checkbox', label: '爱好', prop: 'city', width: '320px', options: [
            { value: 112211, label: '黄金糕' },
            { value: 112222, label: '双皮奶' },
            { value: 112233, label: '蚵仔煎' }
          ] },
          { type: 'radio', label: '爱好食物', prop: 'love', width: '320px', options: [
            { value: 112211, label: '黄金糕' },
            { value: 112222, label: '双皮奶' },
            { value: 112233, label: '蚵仔煎' }
          ] }
        ]
      }
    }
  },
  mounted() {
    initHighlightBlock(this)
  },
  methods: {
    validatorName(rule, value, callback) {
      console.log(this.config.form)
      value ? callback() : callback(new Error('请输入'))
    }
  }
}
</script>
