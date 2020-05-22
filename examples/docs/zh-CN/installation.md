## 特别说明

### 写在开始
topevery-element-ui的组件组成分为两部分，一部分是element-ui本身原有的组件，另一部分是日常开发中的一些总结和实践而开发的
cube组件。这些组件是element-ui本身没有的，是为了解决一些比较通用场景下的业务问题，用组件的方式，更快的开发我们的业务。这里
两部分代码是打包编译在一起的。一方面是我们可以对element-ui做对于初始化默认修改，二则是借助element-ui工程项目完成对我们cube
组件的分片打包。实现cube组件的按需加载。再则就是开发文档上着两部分的组件说明写到了一起。就不需要再两个组件文档之间切换了。

### 使用方案
- 使用整个组件库, cube组件+内置element-ui组件
- 按需引用。cube组件+element-ui官方组件

### 感谢 element-ui
- 毫无疑问element-ui是非常优秀的中后台ui框架，可以快速的搭建我们系统。在使用的过程中也积累了很多组件的使用技巧和方法。
- 同时element-ui的开源项目也是一个非常优秀的学习资料。element-ui组件的源码是非常高质量的代码。
- element-ui源码的构建工程项目也是很好的东西，特别是webpack相关的配置对前端架构、前端构建工程化等也有一定的帮助。

### 展望

- 任重道远topevery-element-ui还有很长的路要走。要在项目中实践，不断打磨。
- 提炼业务，抽离成组件，组件不是万能的，一定是具有一定通用性的。同时也不是为了写组件而写组件。
- 组件来源于业务。一定的决绝了某些业务问题的。
- 维护拓展好使用中的一个组件花的时间可能会比开发n+组件的开发时间要长。从开发落地-》业务实践-》bug修复打磨-》完善稳定。

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