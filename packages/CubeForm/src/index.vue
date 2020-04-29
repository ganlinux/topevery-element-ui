<template>
  <el-form
    ref="form"
    :model="defaultConfig.form"
    :rules="defaultConfig.rules"
    :label-width="defaultConfig.labelWidth"
  >
    <!-- <el-row :gutter="10"> -->
    <template v-for="(item, index) in defaultConfig.formOption">
      <el-form-item
        :key="index"
        :label="item.label?item.label:'选项'"
        :prop="item.prop"
        :verify="item.verify"
        :rules="item.rules ? item.rules : null "
        v-bind="item.attributes"
        :label-width="item.labelWidth"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type==='input'"
          v-model="defaultConfig.form[item.prop]"
          clearable
          :placeholder="item.placeholder?item.placeholder:'请输入'"
          :style="{width: item.width}"
          @change="item.change ?item.change($event) : null "
        />
        <!-- 输入框文本域 -->
        <el-input
          v-if="item.type==='textarea'"
          v-model="defaultConfig.form[item.prop]"
          type="textarea"
          clearable
          :rows="1"
          :placeholder="item.placeholder?item.placeholder:'请输入'"
          :style="{width: item.width}"
          @change="item.change ?item.change($event) : null "
        />
        <!-- 输入框数字 -->
        <el-input-number
          v-if="item.type==='inputNumber'"
          v-model="defaultConfig.form[item.prop]"
          controls-position="right"
          :placeholder="item.placeholder?item.placeholder:'请输入'"
          :style="{width: item.width}"
          :min="1"
          :max="10"
          @change="item.change ?item.change($event) : null "
        />
        <!-- 下拉框 -->
        <el-select
          v-if="item.type==='select'"
          v-model="defaultConfig.form[item.prop]"
          clearable
          filterable
          :loading="true"
          :value-key="item.valueKey ?item.valueKey: 'value' "
          :placeholder="item.placeholder?item.placeholder:'请选择'"
          :style="{width: item.width}"
          @change="item.change ?item.change($event) : null "
        >
          <el-option
            v-for="op in item.options"
            :key="op.value"
            :label="op.label"
            :value="item.valueKey ? op: op.value"
          />
        </el-select>
        <!-- 级联 -->
        <el-cascader
          v-if="item.type==='cascader'"
          v-model="defaultConfig.form[item.prop]"
          :options="item.options||[]"
          :placeholder="item.placeholder?item.placeholder:'请选择'"
          :style="{width: item.width}"
          @change="item.change ?item.change($event) : null "
        />
        <!-- 单选 -->
        <el-radio-group
          v-if="item.type==='radio'"
          v-model="defaultConfig.form[item.prop]"
          :style="{width: item.width}"
          @change="item.change ?item.change($event) : null "
        >
          <el-radio
            v-for="ra in item.options"
            :key="ra.value"
            :label="ra.value"
          >{{ ra.label }}</el-radio>
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type==='checkbox'"
          v-model="defaultConfig.form[item.prop]"
          :style="{width: item.width}"
          @change="item.change ?item.change($event) : null "
        >
          <el-checkbox
            v-for="(ch,checkboxIndex) in item.options"
            :key="checkboxIndex"
            :label="ch.value"
          >{{ ch.label }}</el-checkbox>
        </el-checkbox-group>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type==='date'"
          v-model="defaultConfig.form[item.prop]"
          :style="{width: item.width}"
          :placeholder="item.placeholder?item.placeholder:'请选择'"
          value-format="yyyy-MM-dd"
          @change="item.change ?item.change($event) : null "
        />
        <!-- 时间 -->
        <el-time-select
          v-if="item.type==='time'"
          v-model="defaultConfig.form[item.prop]"
          :style="{width: item.width}"
          type="datetime"
          :placeholder="item.placeholder?item.placeholder:'请选择'"
          value-format="HH:mm:ss"
          @change="item.change ?item.change($event) : null "
        />
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type==='dateTime'"
          v-model="defaultConfig.form[item.prop]"
          :style="{width: item.width}"
          type="datetime"
          :placeholder="item.placeholder?item.placeholder:'请选择'"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="item.change ?item.change($event) : null "
        />
        <!-- 日期范围 -->
        <el-date-picker
          v-if="item.type==='daterange'"
          v-model="defaultConfig.form[item.prop]"
          :style="{width: item.width}"
          type="daterange"
          value-format="yyyy-MM-dd"
          :start-placeholder="item.placeholder1 ? item.placeholder1 :'开始日期'"
          :end-placeholder="item.placeholder2 ? item.placeholder2 :'结束日期'"
          @change="item.change ?item.change($event) : null "
        />
        <!-- 日期时间范围 -->

        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          :content="defaultConfig.form[item.prop] && defaultConfig.form[item.prop].toString() || '选择时间范围'"
        >
          <el-date-picker
            v-if="item.type==='datetimerange'"
            slot="reference"
            v-model="defaultConfig.form[item.prop]"
            :style="{width: item.width}"
            type="datetimerange"
            :placeholder="item.placeholder"
            value-format="yyyy-MM-dd HH:mm:ss"
            :start-placeholder="item.placeholder1 ? item.placeholder1 :'开始时间'"
            :end-placeholder="item.placeholder2 ? item.placeholder2 :'结束时间'"
            @change="item.change ?item.change($event) : null "
          />
        </el-popover>
      </el-form-item>
      <!-- </el-col> -->
    </template>

    <slot name="other" :formConfig="defaultConfig" />
    <!-- </el-row> -->
    <div class="footer">
      <el-button
        type="primary"
        @click="onSubmit('form')"
      >立即创建</el-button>
      <el-button @click="cancel('form')">取消</el-button>
    </div>
  </el-form>
</template>

<script>

// import { deepMerge, deepClone } from '../../uitls'

export default {
  name: 'CubeForm',
  props: {
    config: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      defaultConfig: {
        labelWidth: '110px',
        form: {

        },
        formOption: []
      }
    }
  },
  watch: {
    config: {
      immediate: true,
      handler(configData) {
        if (configData.form) {
          for (const key in configData.form) {
            // 初始化
            // eslint-disable-next-line no-prototype-builtins
            if (configData.hasOwnProperty(key)) {
              const element = configData[key]
              this.$set(this.defaultConfig.form, key, element)
            }
          }
          // 浅合合并-修改可以直接反馈到传下来的cofig中
          this.defaultConfig = Object.assign(this.defaultConfig, configData)
        }
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({ message: '表单校验通过。可以提交数据', type: 'success' })
        } else {
          this.$message({ message: '请核实表单', type: 'warning' })
        }
      })
    },
    cancel(formName) {
      this.$refs[formName].resetFields()
      setTimeout(_ => { this.$refs[formName].clearValidate() }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  display: inline-block;
}
.el-select,
.el-input {
  width: 100%;
}
.footer{
  text-align: center;
}
</style>
