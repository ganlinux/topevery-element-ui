<template>
  <div>
    <Md v-if="true" />
  </div>
</template>

<script>

// SelectBar
import Md from '~packages/CubeInput/index.md'

export default {
  name: 'CubeInputX',
  title: '输入框',
  components: {
    Md
  },
  data() {
    return {
      select: '',
      input1: '小米',
      input2: '小姑娘',
      options: [
        {
          'mainManageDeptName': '沙井街道',
          'companyId': '42F84BFD-2ED6-4D76-82ED-9A0566CFE022',
          'companyName': '深圳市宝政通环境有限公司'
        },
        {
          'mainManageDeptName': '福永街道',
          'companyId': 'EF28FF35-9C66-4250-A5DB-B8C711D0E5F8',
          'companyName': '深圳市保洁恒清洁服务有限公司'
        },
        {
          'mainManageDeptName': '航城街道',
          'companyId': '7C13F071-F63C-499C-A528-F441DEA3A4CF',
          'companyName': '深圳市绿佳智慧环境发展有限公司'
        },
        {
          'mainManageDeptName': '西乡街道',
          'companyId': 'CA95E0AF-BE0F-42F8-AF1E-094D39CADF55',
          'companyName': '深圳市华富市政服务有限公司'
        }
      ]
    }
  },
  methods: {
    enter() {
      console.log('触发回车事件')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
