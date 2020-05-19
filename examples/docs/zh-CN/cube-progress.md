## cube-progress 进度条

用于展示操作进度，告知用户当前状态和预期。

::: tip 
 - 新增激活属性动效化进度状态
 - 环形进度内容支持插入自定义内容。更好的贴合我们的业务。
:::

### 线形进度条

:::demo Progress 组件设置`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。通过 `format` 属性来指定进度条文字内容。

```html
<cube-progress active :percentage="50"></cube-progress>
<cube-progress active :percentage="100" :format="format"></cube-progress>
<cube-progress active :percentage="100" status="success"></cube-progress>
<cube-progress active :percentage="100" status="warning"></cube-progress>
<cube-progress active :percentage="50" status="exception"></cube-progress>

<script>
  export default {
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
  };
</script>
```
:::

### 百分比内显

百分比不占用额外控件，适用于文件上传等场景。

:::demo Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来将进度条描述置于进度条内部。

```html
<cube-progress :text-inside="true" :stroke-width="26" active :percentage="70"></cube-progress>
<cube-progress :text-inside="true" :stroke-width="24" active :percentage="100" status="success"></cube-progress>
<cube-progress :text-inside="true" :stroke-width="22" active :percentage="80" status="warning"></cube-progress>
<cube-progress :text-inside="true" :stroke-width="20" active :percentage="50" status="exception"></cube-progress>
```
:::

### 自定义颜色

可以通过 `color` 设置进度条的颜色，`color` 可以接受颜色字符串，函数和数组。

:::demo

```html
<cube-progress active :percentage="percentage" :color="customColor"></cube-progress>

<cube-progress active :percentage="percentage" :color="customColorMethod"></cube-progress>

<cube-progress active :percentage="percentage" :color="customColors"></cube-progress>
<div>
  <el-button-group>
    <el-button icon="el-icon-minus" @click="decrease"></el-button>
    <el-button icon="el-icon-plus" @click="increase"></el-button>
  </el-button-group>
</div>

<script>
  export default {
    data() {
      return {
        percentage: 20,
        customColor: '#409eff',
        customColors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ]
      };
    },
    methods: {
      customColorMethod(percentage) {
        if (percentage < 30) {
          return '#909399';
        } else if (percentage < 70) {
          return '#e6a23c';
        } else {
          return '#67c23a';
        }
      },
      increase() {
        this.percentage += 10;
        if (this.percentage > 100) {
          this.percentage = 100;
        }
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) {
          this.percentage = 0;
        }
      }
    }
  }
</script>
```
:::

### 环形进度条

Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。
`slot="content"` 完成自定义内容的插入。

:::demo

```html
<cube-progress type="circle" :width="160" :percentage="percentage">
  <div slot="content">
    <div> 清扫完成率 </div>
    <div> {{percentage}}% </div>
  </div>
</cube-progress>
<cube-progress type="circle" :width="160" :percentage="percentage" status="success">
  <div slot="content">
    <div> 机扫完成率 </div>
    <div> {{percentage}}% </div>
  </div>
</cube-progress>
<cube-progress type="circle" :width="160" :percentage="percentage" status="warning">
  <div slot="content">
    <div> 洒水完成率 </div>
    <div> {{percentage}}% </div>
  </div>
</cube-progress>
<cube-progress type="circle" :width="160" :percentage="percentage" status="exception">
  <div slot="content">
    <div> 作业完成率 </div>
    <div> {{percentage}}% </div>
  </div>
</cube-progress>

<div>
  <el-button-group>
    <el-button icon="el-icon-minus" @click="decrease"></el-button>
    <el-button icon="el-icon-plus" @click="increase"></el-button>
  </el-button-group>
</div>

<script>
  export default {
    data() {
      return {
        percentage: 10,
      };
    },
    methods: {
      increase() {
        this.percentage += 10;
        if (this.percentage >= 100) this.percentage = 100;
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) this.percentage = 0;
      }
    }
  }
</script>

```
:::

### 仪表盘形进度条

:::demo 通过 `type` 属性来指定使用仪表盘形进度条。

```html

<cube-progress type="dashboard" :width="160" :percentage="percentage" :color="colors">
   <div slot="content">
    <div> 洒水完成率 </div>
    <div> {{percentage}}% </div>
  </div>
</cube-progress>
<div>
  <el-button-group>
    <el-button icon="el-icon-minus" @click="decrease"></el-button>
    <el-button icon="el-icon-plus" @click="increase"></el-button>
  </el-button-group>
</div>

<script>
  export default {
    data() {
      return {
        percentage: 10,
        colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ]
      };
    },
    methods: {
      increase() {
        this.percentage += 10;
        if (this.percentage > 100) {
          this.percentage = 100;
        }
      },
      decrease() {
        this.percentage -= 10;
        if (this.percentage < 0) {
          this.percentage = 0;
        }
      }
    }
  }
</script>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number         |     0-100          |     0    |
| active | 是否是激活  |    boolean   |    true/false         |     false    |
| type          | 进度条类型           | string         | line/circle/dashboard | line |
| stroke-width  | 进度条的宽度，单位 px | number          | — | 6 |
| text-inside  | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | — | false |
| status  | 进度条当前状态 | string | success/exception/warning | — |
| color  | 进度条背景色（会覆盖 status 状态颜色） | string/function/array | — | '' |
| width  | 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） | number |  | 126 |
| show-text  | 是否显示进度条文字内容 | boolean | — | true |
| stroke-linecap  | circle/dashboard 类型路径两端的形状 | string | butt/round/square | round |