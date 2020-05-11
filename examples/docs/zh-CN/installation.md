## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i topevery-element-ui -S
```

:::tip
我们建议使用 CDN 引入 Element 的用户在链接地址上锁定版本，以免将来 Element 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::

### 使用

```js
import 'topevery-element-ui/lib/theme-chalk/index.css';
import ElementUI from 'topevery-element-ui/lib';

Vue.use(ElementUI);
```