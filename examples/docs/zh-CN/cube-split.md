
## cube-split 布局分割拖拽面板


:::tip
 - 支持分页检索,可复用现有业务接口。
 - 更少的代码量，完成业务数据的绑定和选择
:::


### 水平左右分割

:::warning
 分割面板期待一个高度，如果失效请检查高度是否设置。 
:::

:::demo
```html
<cube-split split="vertical" style="border: 1px solid #cccccc;height: 200px;">
  <template slot="paneL">
    <div>
      <div v-for="k in 100"> B - B </div>
    </div>
  </template>
  <template slot="paneR">
    <div>
      <div v-for="k in 100"> B - B </div>
    </div>
  </template>
</cube-split>
```
:::

### 垂直上下分割

如下可能在文档中因为文档的问题可能不生效。真实环境可以放心使用。指数文档没有该预览效果。

:::demo
```html
<cube-split split="horizontal" style="border: 1px solid #cccccc;height: 200px;">
  <template slot="paneL">
   <div>
      <div v-for="k in 100"> sss  </div>
    </div>
  </template>
  <template slot="paneR">
    <div>
      <div v-for="k in 100"> xxxx </div>
    </div>
  </template>
</cube-split>
```
:::


### 组合使用

:::demo
```html
<cube-split style="border: 1px solid #cccccc;height: 400px;">
  <template slot="paneL">
    <cube-split split="horizontal">
      <template slot="paneL">
        <div>
          <div v-for="k in 100"> sss  </div>
        </div>
      </template>
      <template slot="paneR">
        <div>
          <div v-for="k in 100"> xxxx </div>
        </div>
      </template>
    </cube-split>
  </template>
  <template slot="paneR">
    <div>
      <div v-for="k in 100"> xxxx </div>
    </div>
  </template>
</cube-split>
```
:::


### 在非全屏弹窗中的使用组合使用

:::demo
```html
<el-button type="text" @click="dialogVisible = true"> 在非全屏弹窗中的使用分割面板 </el-button>

<cube-dialog
  title="在非全屏弹窗中的使用组合使用"
  :visible.sync="dialogVisible">
    <!-- 期待一个高度 -->
    <cube-split style="border: 1px solid #cccccc;height: 400px;">
      <template slot="paneL">
        <cube-split split="horizontal">
          <template slot="paneL">
            <div>
              <div v-for="k in 100"> sss  </div>
            </div>
          </template>
          <template slot="paneR">
            <div>
              <div v-for="k in 100"> xxxx </div>
            </div>
          </template>
        </cube-split>
      </template>
      <template slot="paneR">
        <div>
          <div v-for="k in 100"> xxxx </div>
        </div>
      </template>
    </cube-split>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</cube-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
     
    }
  };
</script>
```
:::


### 在全屏弹窗中的使用组合使用

:::demo
```html
<el-button type="text" @click="dialogVisible = true"> 在全屏弹窗中的使用分割面板 </el-button>

<cube-dialog
  title="在全屏弹窗中的使用组合使用"
  fullscreen
  :visible.sync="dialogVisible">
    <cube-split style="border: 1px solid #cccccc;height: 100%;box-sizing: content-box;">
      <template slot="paneL">
        <cube-split split="horizontal">
          <template slot="paneL">
            <div>
              <div v-for="k in 100"> sss  </div>
          </div>
        </template>
        <template slot="paneR">
          <div>
            <div v-for="k in 100"> xxxx </div>
          </div>
        </template>
      </cube-split>
    </template>
    <template slot="paneR">
      <div class="map" style="width: 100%;height: 100%;background:#59B7FC;overflow: hidden;">
         <h1> 假装我是地图 </h1>
      </div>
    </template>
  </cube-split>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</cube-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
 
    }
  };
</script>
```
:::

### Options
| 参数         | 说明             |    类型    |   默认      |
| ----------- | ---------------- | :--------: | :----------: |
| split       |   string         | `horizontal,vertica` | vertical |
| min-percent | paneL max-min-percent  |Number | 10 |
| max-percent | paneL max-percent  |Number | 10 |