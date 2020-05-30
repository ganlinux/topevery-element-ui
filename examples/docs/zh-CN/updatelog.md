<!--
 * @Author: shiliangL
 * @Date: 2020-05-30 12:25:29
 * @LastEditTime: 2020-05-30 13:15:26
 * @LastEditors: Do not edit
 * @Description: 
 * @FilePath: /topevery-element-ui-v2/examples/docs/zh-CN/updatelog.md
--> 
### 版本更新日志

- 2020年05月30日

更新可配置项主要针对可以配置`TokenKey`以及配置请求数据返回结构，适配不同的后台数据结构。

``` JS
import Element from 'topevery-element-ui';
Vue.use(Element, {
    adminToken: 'shiliangl',
    code:'code',
    data:'data',
    success:'success',
    page:'records',
    total:'total'
});
```
