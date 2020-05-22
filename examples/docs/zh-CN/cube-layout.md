## 界面&弹窗&布局


### 标题区分内容

``` CSS
.title-tag-item{
    .title-tage{
        font-size: 14px;
        padding-left: 10px;
        position: relative;
        margin: 5px 0;
        &:after {
            content: "";
            position: absolute;
            left: 0;
            top: 25%;
            width: 4px;
            height: 50%;
            background: #2f86f6;
        }
    }
    .title-main{
 
    }
}
```


:::demo 
```html
<template>
    <div class="layout">
        <div>
            <div v-for="k in 3" class="title-tag-item">
                <div class="title-tage">基本信息</div>
                <div class="title-main">
                    <div v-for="k in 4">这里是一些常规业务内容信息描述这里是一些常规业务内容信息描述</div>
                </div>
            </div>
        </div>

        <el-button type="text" @click="dialogVisible = true"> 查看详情 </el-button>

        <cube-dialog
        title="提示"
        :visible.sync="dialogVisible">
        <div>
            <div v-for="k in 10" class="title-tag-item">
                <div class="title-tage">基本信息</div>
                <div class="title-main">
                    <div v-for="k in 4"> 这里是一些常规业务内容信息描述这里是一些常规业务内容信息描述</div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </cube-dialog>
    </div>
</template>

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

<style>
 
</style>
```
:::