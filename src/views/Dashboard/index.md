## 安装

* npm安装 CI测试

```sh
npm install tyelui -S
```

* yarn安装
```sh
yarn add tyelui -S
```

## 使用

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
 