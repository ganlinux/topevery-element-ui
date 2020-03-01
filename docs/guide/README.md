# 介绍

::: tip TIP
建议使用Chrome浏览器。
:::

## 安装

* npm安装

```sh
npm install tyelui -S
```

* yarn安装
```sh
yarn add tyelui -S
```

## 全局使用

```js
// 将自动注册所有组件为全局组件
import tyelui from 'tyelui'

Vue.use(tyelui)
```

## 按需引入

按需引入仅支持基于**ES module**的**tree shaking**，按需引入示例如下：

```js
import { MaxHeight } from 'tyelui'

Vue.use(MaxHeight)
```

## UMD版

`UMD`版可直接使用`script`标签引入，`UMD`版文件下载请移步[UMD](https://github.com/jiaming743/DataV/tree/master/dist)，引入后将自动把所有组件注册为**Vue全局组件**，引入`DataV`前请确保已引入`Vue`。
