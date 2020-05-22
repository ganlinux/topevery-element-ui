<!--
 * @Author: shiliangL
 * @Date: 2020-05-22 11:02:08
 * @LastEditTime: 2020-05-22 14:31:47
 * @LastEditors: Do not edit
 * @Description: 
 * @FilePath: /topevery-element-ui-v2/examples/docs/zh-CN/cube-title.md
--> 
## CubeTitle 标题信息

:::tip
 - 主要是区分分隔页面信息过多，分块分区展示
 - 同时可配置展开于收缩。
:::

### 基本展示

:::demo 
```html
<template>
    <div class="layout">
      <template v-for="k in 3">
        <Cube-Title>
            <div slot="title"> 基本信息 </div>
            <div v-for="(item,index) in 2">
                这里是一些常规业务内容信息描述这里是一些常规业务内容信息描述
                这里是一些常规业务内容信息描述这里是一些常规业务内容信息描述
            </div>
        </Cube-Title>
      </template>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        titleList:[
          '基本信息',
          '标段信息',
          '中转站信息',
          '垃圾桶信息',
          '垃圾投放点信息',
        ]
      };
    },
  };
</script>

<style>
 
</style>
```
:::



### 设置展开收缩

:::demo 
```html
<template>
    <div class="layout">
      <template v-for="k in titleList">
        <Cube-Title :canCollapse="true">
            <div slot="title"> {{ k }} </div>
            <div v-for="(item,index) in 2">
                这里是一些常规业务内容信息描述这里是一些常规业务内容信息描述
                这里是一些常规业务内容信息描述这里是一些常规业务内容信息描述
            </div>
        </Cube-Title>
      </template>
    <el-button type="text" @click="dialogVisible = true"> 查看详情 </el-button>

        <cube-dialog
        title="提示"
        :visible.sync="dialogVisible">
        <div v-if="dialogVisible" style="padding: 10px;">
          <Cube-Title :canCollapse="true" v-for="k in titleList">
              <div slot="title"> {{ k }} </div>
              <div v-for="(item,index) in 5">
                  这里是一些常规业务内容信息描述这里是一些常规业务内容信息描述
              </div>
          </Cube-Title>
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
        dialogVisible: false,
        titleList:[
          '基本信息',
          '标段信息',
          '中转站信息',
          '垃圾桶信息',
          '垃圾投放点信息',
        ]
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



### 在业务场景中使用

:::demo 
```html
<template>
    <div class="layout">

      <el-form label-width="80px" :model="form">
        <Cube-Title :canCollapse="true">
            <div slot="title"> 基本信息 </div>
          <el-form-item label="名称">
            <el-input v-model="form.input"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-input v-model="form.input"></el-input>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input v-model="form.input"></el-input>
          </el-form-item>
        </Cube-Title>
        <Cube-Title :canCollapse="true">
            <div slot="title"> 场景信息 </div>
          <el-form-item label="名称">
            <el-input v-model="form.input"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-input v-model="form.input"></el-input>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input v-model="form.input"></el-input>
          </el-form-item>
        </Cube-Title>
      </el-form>

    <el-button type="text" @click="dialogVisible = true"> 查看详情 </el-button>

        <cube-dialog
        title="提示"
        :visible.sync="dialogVisible">
        <div v-if="dialogVisible" style="padding: 10px;">

          <el-form label-width="80px" :model="form">
            <Cube-Title :canCollapse="true"  v-for="k in titleList">
                <div slot="title"> {{ k }} </div>
              <el-form-item label="名称">
                <el-input v-model="form.input"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input v-model="form.input"></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input v-model="form.input"></el-input>
              </el-form-item>
            </Cube-Title>
          </el-form>
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
        dialogVisible: false,
        form:{
          input:'',
        },
        titleList:[
          '基本信息',
          '标段信息',
          '中转站信息',
          '垃圾桶信息',
          '垃圾投放点信息',
        ]
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