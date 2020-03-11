(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33735f84"],{"128e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Md"),n("MaxHeight",{model:{value:t.height,callback:function(e){t.height=e},expression:"height"}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,height:t.height-40}},[n("el-table-column",{attrs:{prop:"date",label:"日期",width:"180"}}),n("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),n("el-table-column",{attrs:{prop:"address",label:"地址"}})],1),n("el-pagination",{staticStyle:{"text-align":"center","margin-top":"4px"},attrs:{background:"",layout:"total,prev, pager, next",total:1e3}})],1)],1)},r=[],s=(n("cb29"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"content element-doc"},[t._m(0),n("p",[t._v("将信息聚合在卡片容器中展示。")]),t._m(1),n("p",[t._v("包含标题，内容和操作。")]),n("demo-block",[n("div",[n("p",[t._v("Card 组件包括"),n("code",[t._v("header")]),t._v("和"),n("code",[t._v("body")]),t._v("部分，"),n("code",[t._v("header")]),t._v("部分需要有显式具名 slot 分发，同时也是可选的。")])]),n("template",{slot:"source"},[n("element-demo0")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[t._v('<el-card class="box-card">\n  <div slot="header" class="clearfix">\n    <span>卡片名称</span>\n    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>\n  </div>\n  <div v-for="o in 4" :key="o" class="text item">\n    {{\'列表内容 \' + o }}\n  </div>\n</el-card>\n\n<style>\n  .text {\n    font-size: 14px;\n  }\n\n  .item {\n    margin-bottom: 18px;\n  }\n\n  .clearfix:before,\n  .clearfix:after {\n    display: table;\n    content: "";\n  }\n  .clearfix:after {\n    clear: both\n  }\n\n  .box-card {\n    width: 480px;\n  }\n</style>\n')])])])],2),t._m(2),n("p",[t._v("卡片可以只有内容区域。")]),n("demo-block",[n("template",{slot:"source"},[n("element-demo1")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[t._v('<el-card class="box-card">\n  <div v-for="o in 4" :key="o" class="text item">\n    {{\'列表内容 \' + o }}\n  </div>\n</el-card>\n\n<style>\n  .text {\n    font-size: 14px;\n  }\n\n  .item {\n    padding: 18px 0;\n  }\n\n  .box-card {\n    width: 480px;\n  }\n</style>\n')])])])],2),t._m(3),n("p",[t._v("可配置定义更丰富的内容展示。")]),n("demo-block",[n("div",[n("p",[t._v("配置"),n("code",[t._v("body-style")]),t._v("属性来自定义"),n("code",[t._v("body")]),t._v("部分的"),n("code",[t._v("style")]),t._v("，我们还使用了布局组件。")])]),n("template",{slot:"source"},[n("element-demo2")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[t._v('<el-row>\n  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">\n    <el-card :body-style="{ padding: \'0px\' }">\n      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">\n      <div style="padding: 14px;">\n        <span>好吃的汉堡</span>\n        <div class="bottom clearfix">\n          <time class="time">{{ currentDate }}</time>\n          <el-button type="text" class="button">操作按钮</el-button>\n        </div>\n      </div>\n    </el-card>\n  </el-col>\n</el-row>\n\n<style>\n  .time {\n    font-size: 13px;\n    color: #999;\n  }\n  \n  .bottom {\n    margin-top: 13px;\n    line-height: 12px;\n  }\n\n  .button {\n    padding: 0;\n    float: right;\n  }\n\n  .image {\n    width: 100%;\n    display: block;\n  }\n\n  .clearfix:before,\n  .clearfix:after {\n      display: table;\n      content: "";\n  }\n  \n  .clearfix:after {\n      clear: both\n  }\n</style>\n\n<script>\nexport default {\n  data() {\n    return {\n      currentDate: new Date()\n    };\n  }\n}\n<\/script>\n')])])])],2),t._m(4),n("p",[t._v("可对阴影的显示进行配置。")]),n("demo-block",[n("div",[n("p",[t._v("通过"),n("code",[t._v("shadow")]),t._v("属性设置卡片阴影出现的时机："),n("code",[t._v("always")]),t._v("、"),n("code",[t._v("hover")]),t._v("或"),n("code",[t._v("never")]),t._v("。")])]),n("template",{slot:"source"},[n("element-demo3")],1),n("template",{slot:"highlight"},[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{class:"html"}},[t._v('<el-row :gutter="12">\n  <el-col :span="8">\n    <el-card shadow="always">\n      总是显示\n    </el-card>\n  </el-col>\n  <el-col :span="8">\n    <el-card shadow="hover">\n      鼠标悬浮时显示\n    </el-card>\n  </el-col>\n  <el-col :span="8">\n    <el-card shadow="never">\n      从不显示\n    </el-card>\n  </el-col>\n</el-row>\n')])])])],2),t._m(5),t._m(6)],1)}),l=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h2",{attrs:{id:"maxheight-ke-shi-qu-yu-zui-da-gao-du-nei-rong-ji-suan-zu-jian"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#maxheight-ke-shi-qu-yu-zui-da-gao-du-nei-rong-ji-suan-zu-jian"}},[t._v("¶")]),t._v(" MaxHeight 可视区域最大高度内容计算组件")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h3",{attrs:{id:"ji-chu-yong-fa"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ji-chu-yong-fa"}},[t._v("¶")]),t._v(" 基础用法")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h3",{attrs:{id:"jian-dan-qia-pian"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#jian-dan-qia-pian"}},[t._v("¶")]),t._v(" 简单卡片")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h3",{attrs:{id:"dai-tu-pian"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#dai-tu-pian"}},[t._v("¶")]),t._v(" 带图片")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h3",{attrs:{id:"qia-pian-yin-ying"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#qia-pian-yin-ying"}},[t._v("¶")]),t._v(" 卡片阴影")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h3",{attrs:{id:"attributes"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#attributes"}},[t._v("¶")]),t._v(" Attributes")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",[t._v("参数")]),n("th",[t._v("说明")]),n("th",[t._v("类型")]),n("th",[t._v("可选值")]),n("th",[t._v("默认值")])])]),n("tbody",[n("tr",[n("td",[t._v("header")]),n("td",[t._v("设置 header，也可以通过 "),n("code",[t._v("slot#header")]),t._v(" 传入 DOM")]),n("td",[t._v("string")]),n("td",[t._v("—")]),n("td",[t._v("—")])]),n("tr",[n("td",[t._v("body-style")]),n("td",[t._v("设置 body 的样式")]),n("td",[t._v("object")]),n("td",[t._v("—")]),n("td",[t._v("{ padding: '20px' }")])]),n("tr",[n("td",[t._v("shadow")]),n("td",[t._v("设置阴影显示时机")]),n("td",[t._v("string")]),n("td",[t._v("always / hover / never")]),n("td",[t._v("always")])])])])}],i=n("5530"),c={name:"component-doc",components:{"element-demo0":function(){var t=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v("卡片名称")]),t._v(" "),n("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"}},[t._v("操作按钮")])],1),t._v(" "),t._l(4,(function(e){return n("div",{key:e,staticClass:"text item"},[t._v("\n    "+t._s("列表内容 "+e)+"\n  ")])}))],2)],1)},e=[],n={};return Object(i["a"])({render:t,staticRenderFns:e},n)}(),"element-demo1":function(){var t=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-card",{staticClass:"box-card"},t._l(4,(function(e){return n("div",{key:e,staticClass:"text item"},[t._v("\n    "+t._s("列表内容 "+e)+"\n  ")])})),0)],1)},e=[],n={};return Object(i["a"])({render:t,staticRenderFns:e},n)}(),"element-demo2":function(){var t=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",t._l(2,(function(e,a){return n("el-col",{key:e,attrs:{span:8,offset:a>0?2:0}},[n("el-card",{attrs:{"body-style":{padding:"0px"}}},[n("img",{staticClass:"image",attrs:{src:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"}}),t._v(" "),n("div",{staticStyle:{padding:"14px"}},[n("span",[t._v("好吃的汉堡")]),t._v(" "),n("div",{staticClass:"bottom clearfix"},[n("time",{staticClass:"time"},[t._v(t._s(t.currentDate))]),t._v(" "),n("el-button",{staticClass:"button",attrs:{type:"text"}},[t._v("操作按钮")])],1)])])],1)})),1)],1)},e=[],n={data:function(){return{currentDate:new Date}}};return Object(i["a"])({render:t,staticRenderFns:e},n)}(),"element-demo3":function(){var t=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",{attrs:{gutter:12}},[n("el-col",{attrs:{span:8}},[n("el-card",{attrs:{shadow:"always"}},[t._v("\n      总是显示\n    ")])],1),t._v(" "),n("el-col",{attrs:{span:8}},[n("el-card",{attrs:{shadow:"hover"}},[t._v("\n      鼠标悬浮时显示\n    ")])],1),t._v(" "),n("el-col",{attrs:{span:8}},[n("el-card",{attrs:{shadow:"never"}},[t._v("\n      从不显示\n    ")])],1)],1)],1)},e=[],n={};return Object(i["a"])({render:t,staticRenderFns:e},n)}()}},o=c,d=n("2877"),v=Object(d["a"])(o,s,l,!1,null,null,null),h=v.exports,_={date:"2016-05-02",name:"王富贵",address:"上海市普陀区金沙江路 1518 弄"},p={name:"MaxHeighX",components:{Md:h},data:function(){return{height:0,tableData:Array(20).fill(_)}}},u=p,m=(n("a1fb"),Object(d["a"])(u,a,r,!1,null,"3a121fff",null));e["default"]=m.exports},"9e3f":function(t,e,n){},a1fb:function(t,e,n){"use strict";var a=n("9e3f"),r=n.n(a);r.a}}]);