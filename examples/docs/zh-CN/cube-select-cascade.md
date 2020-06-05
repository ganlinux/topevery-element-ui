## cube-select-cascad 业务数据级联选择

:::tip
 - 支持分页检索,可复用现有业务接口。
 - 根据数据结构可配置显示内容
 - 根据数据结构可配置返回数据对象
 - 选项数据多样化，后台返回+静态数据作为选择项
 - 多场景配合使用，分页与不分页可配切换。
 - 优化请求数量,只在数据选择的时候加载数据接口
 - 更少的代码量，完成业务数据的绑定和选择
 - 二级关联检索
:::

### 常规使用

常规业务中的数据选择配置使用，最简单的配置

:::warning
 - 真实的开发中url需要填写完整路径 url:'http://xxx.xxx.xx/api/xxxx'
 - 由于接口请求方法封装在组件中所以，后台数据结构返回必须遵循一定的数据返回规范。
 - 如果使用后台接口加载数据。则会在组件创建的的时候去请求数据
 - 组件选择返数组
:::

:::demo
```html
 <template>
  <div>
      <cube-select-cascade v-model="selectCascade" @config="config" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectCascade: [],
      config: {
        parentConfig: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '企业选择',
          inputWidth: '180px',
          isNoPage: false, // 设置不分页
          method: 'get', // 请求方法
          url: '/static/section.json',
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'statusStr', label: '状态' }
          ]
        },
        childrenConfig: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '司机选择',
          inputWidth: '180px',
          isNoPage: false, // 设置不分页
          relativeKey: 'companyId', // 关联依赖加载id -关键key 级联关系
          method: 'get', // 请求方法
          url: '/static/section.json',
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'statusStr', label: '状态' }
          ]
        }
      }
    };
  },
  mounted() {
    // 模拟编辑显示 则需要手动处理一下参数
    setTimeout(_=>{
      this.selectCascade = [
        { label: '父级联', value: '132123123' },
        { label: '子级联', value: '132123123' }
      ];
    }, 2000);
  }
};
</script>

```
:::

### 禁用选择


:::demo
```html
 <template>
  <div>
      <cube-select-cascade disabled v-model="selectCascade" @config="config" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectCascade: [],
      config: {
        parentConfig: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '企业选择',
          inputWidth: '180px',
          isNoPage: false, // 设置不分页
          method: 'get', // 请求方法
          url: '/static/section.json',
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'statusStr', label: '状态' }
          ]
        },
        childrenConfig: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '司机选择',
          inputWidth: '180px',
          isNoPage: false, // 设置不分页
          relativeKey: 'companyId', // 关联依赖加载id -关键key 级联关系
          method: 'get', // 请求方法
          url: '/static/section.json',
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'statusStr', label: '状态' }
          ]
        }
      }
    };
  },
  mounted() {
    // 模拟编辑显示 则需要手动处理一下参数
    setTimeout(_=>{
      this.selectCascade = [
        { label: '父级联', value: '132123123' },
        { label: '子级联', value: '132123123' }
      ];
    }, 2000);
  }
};
</script>

```
:::

 
 全部配置参数

``` js
    config: {
        parentConfig: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '企业选择',
          inputWidth: '180px',
          isNoPage: false, // 设置不分页
          method: 'get', // 请求方法
          url: '/static/section.json',
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'statusStr', label: '状态' }
          ]
        },
        childrenConfig: {
          keyName: 'code',
          keyCode: 'sectionId',
          placeholder: '司机选择',
          inputWidth: '180px',
          isNoPage: false, // 设置不分页
          relativeKey: 'companyId', // 关联依赖加载id -关键key 必须
          method: 'get', // 请求方法
          url: '/static/section.json',
          column: [ // 仅仅作为展示用户使用
            { key: 'code', label: '名称' },
            { key: 'statusStr', label: '状态' }
          ]
        }
    }
```

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| extraParam | 额外拓展参数  |  Object |  --  |
