(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-bookshop-bookshop"],{"2d58":function(t,e,n){"use strict";var i=n("45d8"),o=n.n(i);o.a},"32aa":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("v-uni-view",{staticClass:"u-badge",class:[t.isDot?"u-badge-dot":"","mini"==t.size?"u-badge-mini":"",t.type?"u-badge--bg--"+t.type:""],style:[{top:t.offset[0]+"rpx",right:t.offset[1]+"rpx",fontSize:t.fontSize+"rpx",position:t.absolute?"absolute":"static",color:t.color,backgroundColor:t.bgColor},t.boxStyle]},[t._v(t._s(t.showText))]):t._e()},r=[]},"32ec":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-2f0ee69a],\r\nuni-scroll-view[data-v-2f0ee69a]{-webkit-box-sizing:border-box;box-sizing:border-box}.u-tabs[data-v-2f0ee69a]{width:100%;-webkit-transition-property:background-color,color;transition-property:background-color,color}[data-v-2f0ee69a]::-webkit-scrollbar,[data-v-2f0ee69a]::-webkit-scrollbar,[data-v-2f0ee69a]::-webkit-scrollbar{display:none;width:0!important;height:0!important;-webkit-appearance:none;background:transparent}uni-scroll-view[data-v-2f0ee69a]  ::-webkit-scrollbar{display:none;width:0!important;height:0!important;-webkit-appearance:none;background:transparent}.u-scroll-view[data-v-2f0ee69a]{width:100%;white-space:nowrap;position:relative}.u-tabs-scroll-box[data-v-2f0ee69a]{position:relative}.u-tabs-scorll-flex[data-v-2f0ee69a]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.u-tabs-scorll-flex .u-tabs-item[data-v-2f0ee69a]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-tabs-item[data-v-2f0ee69a]{position:relative;display:inline-block;text-align:center;-webkit-transition-property:background-color,color,font-weight;transition-property:background-color,color,font-weight}.content[data-v-2f0ee69a]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.boxStyle[data-v-2f0ee69a]{pointer-events:none;position:absolute;-webkit-transition-property:all;transition-property:all}.boxStyle2[data-v-2f0ee69a]{pointer-events:none;position:absolute;bottom:0;-webkit-transition-property:all;transition-property:all;-webkit-transform:translateY(-100%);transform:translateY(-100%)}.itemBackgroundBox[data-v-2f0ee69a]{pointer-events:none;position:absolute;top:0;-webkit-transition-property:left,background-color;transition-property:left,background-color;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\nflex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.itemBackground[data-v-2f0ee69a]{height:100%;width:100%;-webkit-transition-property:all;transition-property:all}.u-scroll-bar[data-v-2f0ee69a]{position:absolute;bottom:%?4?%}',""]),t.exports=e},"365d":function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{list:[{name:"全部"},{name:"末世危机"},{name:"玄幻小说"},{name:"悬疑/推理小说"},{name:"科幻小说"},{name:"都市小说"}],books:[],tabIndex:0}},onNavigationBarSearchInputClicked:function(){uni.navigateTo({url:"/pages/search/search"})},created:function(){this.tabIndex=0,this.getTypeBook(this.list[0].name)},methods:{changeType:function(t){this.tabIndex=t,this.getTypeBook(this.list[t].name)},tobookInfo:function(t){uni.navigateTo({url:"/pages/reader/book-baseinfo/book-baseinfo?id="+t})},getTypeBook:function(e){var i=this,o=t.database();this.books=[],"全部"==e?o.collection("book").get().then((function(t){i.books=t.result.data,n("log",t," at pages/bookshop/bookshop.vue:64")})):o.collection("book").where({type:e}).get().then((function(t){i.books=t.result.data,n("log",t," at pages/bookshop/bookshop.vue:71")}))}}};e.default=i}).call(this,n("a9ff")["default"],n("0de9")["log"])},"45d8":function(t,e,n){var i=n("c3da");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("668ed84c",i,!0,{sourceMap:!1,shadowMode:!1})},"53bd":function(t,e,n){"use strict";n.r(e);var i=n("5f07"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"5f07":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"u-badge",props:{type:{type:String,default:"error"},size:{type:String,default:"default"},isDot:{type:Boolean,default:!1},count:{type:[Number,String]},overflowCount:{type:Number,default:99},showZero:{type:Boolean,default:!1},offset:{type:Array,default:function(){return[20,20]}},absolute:{type:Boolean,default:!0},fontSize:{type:[String,Number],default:"24"},color:{type:String,default:"#ffffff"},bgColor:{type:String,default:""},isCenter:{type:Boolean,default:!1}},computed:{boxStyle:function(){var t={};return this.isCenter?(t.top=0,t.right=0,t.transform="translateY(-50%) translateX(50%)"):(t.top=this.offset[0]+"rpx",t.right=this.offset[1]+"rpx",t.transform="translateY(0) translateX(0)"),"mini"==this.size&&(t.transform=t.transform+" scale(0.8)"),t},showText:function(){return this.isDot?"":this.count>this.overflowCount?"".concat(this.overflowCount,"+"):this.count},show:function(){return 0!=this.count||0!=this.showZero}}};e.default=i},6772:function(t,e,n){"use strict";n.r(e);var i=n("365d"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"6f85":function(t,e,n){"use strict";n.r(e);var i=n("32aa"),o=n("53bd");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("abf4");var a,s=n("f0c5"),l=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"b73b505c",null,!1,i["a"],a);e["default"]=l.exports},"7de9":function(t,e,n){var i=n("b1ba");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("75883b44",i,!0,{sourceMap:!1,shadowMode:!1})},"871d":function(t,e,n){"use strict";n.r(e);var i=n("cab5"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"8d06":function(t,e,n){"use strict";n.r(e);var i=n("b476"),o=n("6772");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("2d58");var a,s=n("f0c5"),l=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"548c6d65",null,!1,i["a"],a);e["default"]=l.exports},"99a9":function(t,e,n){var i=n("32ec");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("664d3e37",i,!0,{sourceMap:!1,shadowMode:!1})},aa44:function(t,e,n){"use strict";n.r(e);var i=n("f0b0"),o=n("871d");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("d93d");var a,s=n("f0c5"),l=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"2f0ee69a",null,!1,i["a"],a);e["default"]=l.exports},abf4:function(t,e,n){"use strict";var i=n("7de9"),o=n.n(i);o.a},b1ba:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-badge[data-v-b73b505c]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;line-height:%?24?%;padding:%?4?% %?8?%;border-radius:%?100?%;z-index:9}.u-badge--bg--primary[data-v-b73b505c]{background-color:#2979ff}.u-badge--bg--error[data-v-b73b505c]{background-color:#fa3534}.u-badge--bg--success[data-v-b73b505c]{background-color:#19be6b}.u-badge--bg--info[data-v-b73b505c]{background-color:#909399}.u-badge--bg--warning[data-v-b73b505c]{background-color:#f90}.u-badge-dot[data-v-b73b505c]{height:%?16?%;width:%?16?%;border-radius:%?100?%;line-height:1}.u-badge-mini[data-v-b73b505c]{-webkit-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:center center;transform-origin:center center}.u-info[data-v-b73b505c]{background-color:#909399;color:#fff}',""]),t.exports=e},b476:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uTabsSwiper:n("aa44").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"bookshop"},[n("u-tabs-swiper",{ref:"tabs",attrs:{current:t.tabIndex,list:t.list},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.changeType.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"book"},[n("v-uni-view",{staticClass:"bookmain"},t._l(t.books,(function(e){return n("v-uni-view",{staticClass:"bookitem",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.tobookInfo(e.bookid)}}},[n("v-uni-view",{staticClass:"left"},[n("v-uni-image",{attrs:{src:e.img}})],1),n("v-uni-view",{staticClass:"right"},[n("v-uni-view",{staticClass:"bookName"},[t._v(t._s(e.bookName))]),n("v-uni-view",{staticClass:"introduction"},[t._v(t._s(e.introduction))]),n("v-uni-view",{staticClass:"author"},[t._v(t._s(e.author))])],1)],1)})),1)],1)],1)},r=[]},c3da:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".book .bookmain .bookitem[data-v-548c6d65]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?5?% %?30?%;background-color:#fff;border-bottom:%?1?% solid #f5f5f5}.book .bookmain .bookitem .left uni-image[data-v-548c6d65]{width:%?120?%;height:%?180?%}.book .bookmain .bookitem .right[data-v-548c6d65]{margin-left:%?20?%}.book .bookmain .bookitem .right .bookName[data-v-548c6d65]{font-size:%?36?%;font-weight:%?500?%}.book .bookmain .bookitem .right .author[data-v-548c6d65]{font-size:%?26?%;margin-top:%?8?%}.book .bookmain .bookitem .right .introduction[data-v-548c6d65]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;word-break:break-all;overflow:hidden;color:#7d7d7d;margin-top:%?10?%}",""]),t.exports=e},cab5:function(t,e,n){"use strict";var i=n("4ea4");n("d81d"),n("a9e3"),n("d3b7"),n("ac1f"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var o=i(n("1da1")),r=i(n("6f2a")),a=r.default,s=uni.getSystemInfoSync(),l=s.windowWidth,c="UEl_",u={name:"u-tabs-swiper",props:{isScroll:{type:Boolean,default:!0},list:{type:Array,default:function(){return[]}},current:{type:[Number,String],default:0},height:{type:[Number,String],default:80},fontSize:{type:[Number,String],default:30},swiperWidth:{type:[String,Number],default:750},activeColor:{type:String,default:"#2979ff"},inactiveColor:{type:String,default:"#303133"},barWidth:{type:[Number,String],default:40},barHeight:{type:[Number,String],default:6},gutter:{type:[Number,String],default:40},zIndex:{type:[Number,String],default:1},bgColor:{type:String,default:"#ffffff"},autoCenterMode:{type:String,default:"window"},name:{type:String,default:"name"},count:{type:String,default:"count"},offset:{type:Array,default:function(){return[5,20]}},bold:{type:Boolean,default:!0},activeItemStyle:{type:Object,default:function(){return{}}},showBar:{type:Boolean,default:!0},barStyle:{type:Object,default:function(){return{}}}},data:function(){return{scrollLeft:0,tabQueryInfo:[],windowWidth:0,animationFinishCurrent:this.current,componentsWidth:0,line3AddDx:0,line3Dx:0,preId:c,sW:0,tabsInfo:[],colorGradientArr:[],colorStep:100}},computed:{getCurrent:function(){var t=Number(this.current);return t>this.getTabs.length-1?this.getTabs.length-1:t<0?0:t},getTabs:function(){return this.list},scrollBarLeft:function(){return Number(this.line3Dx)+Number(this.line3AddDx)},barWidthPx:function(){return uni.upx2px(this.barWidth)},tabItemStyle:function(){var t=this;return function(e){var n={height:t.height+"rpx",lineHeight:t.height+"rpx",padding:"0 ".concat(t.gutter/2,"rpx"),color:t.tabsInfo.length>0?t.tabsInfo[e]?t.tabsInfo[e].color:t.activeColor:t.inactiveColor,fontSize:t.fontSize+"rpx",zIndex:t.zIndex+2,fontWeight:e==t.getCurrent&&t.bold?"bold":"normal"};return e==t.getCurrent&&(n=Object.assign(n,t.activeItemStyle)),n}},tabBarStyle:function(){var t={width:this.barWidthPx+"px",height:this.barHeight+"rpx",borderRadius:"100px",backgroundColor:this.activeColor,left:this.scrollBarLeft+"px"};return Object.assign(t,this.barStyle)}},watch:{current:function(t,e){this.change(t),this.setFinishCurrent(t)},list:function(){var t=this;this.$nextTick((function(){t.init()}))}},mounted:function(){this.init()},methods:{init:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.countPx(),e.next=3,t.getTabsInfo();case 3:t.countLine3Dx(),t.getQuery((function(){t.setScrollViewToCenter()})),t.colorGradientArr=a.colorGradient(t.inactiveColor,t.activeColor,t.colorStep);case 6:case"end":return e.stop()}}),e)})))()},getTabsInfo:function(){var t=this;return new Promise((function(e,n){for(var i=uni.createSelectorQuery().in(t),o=0;o<t.list.length;o++)i.select("."+c+o).boundingClientRect();i.exec((function(n){for(var i=[],o=0;o<n.length;o++)n[o].color=t.inactiveColor,o==t.getCurrent&&(n[o].color=t.activeColor),i.push(n[o]);t.tabsInfo=i,e()}))}))},countLine3Dx:function(){var t=this.tabsInfo[this.animationFinishCurrent];t&&(this.line3Dx=t.left+t.width/2-this.barWidthPx/2-this.tabsInfo[0].left)},countPx:function(){this.sW=uni.upx2px(Number(this.swiperWidth))},emit:function(t){this.$emit("change",t)},change:function(){this.setScrollViewToCenter()},getQuery:function(t){var e=this;try{var n=uni.createSelectorQuery().in(this).select(".u-tabs");n.fields({size:!0},(function(n){n?(e.componentsWidth=n.width,t&&"function"===typeof t&&t(n)):e.getQuery(t)})).exec()}catch(i){this.componentsWidth=l}},setScrollViewToCenter:function(){var t;if(t=this.tabsInfo[this.animationFinishCurrent],t){var e,n=t.left+t.width/2;e="window"===this.autoCenterMode?l:this.componentsWidth,this.scrollLeft=n-e/2}},setDx:function(t){var e=t>0?this.animationFinishCurrent+1:this.animationFinishCurrent-1;e=e<=0?0:e,e=e>=this.list.length?this.list.length-1:e;this.tabsInfo[e];var n=this.tabsInfo[this.animationFinishCurrent],i=n.left+n.width/2,o=this.tabsInfo[e],r=o.left+o.width/2,a=Math.abs(r-i);this.line3AddDx=t/this.sW*a,this.setTabColor(this.animationFinishCurrent,e,t)},setTabColor:function(t,e,n){var i=Math.abs(Math.ceil(n/this.sW*100)),o=this.colorGradientArr.length;i=i>=o?o-1:i<=0?0:i,this.tabsInfo[e].color=this.colorGradientArr[i],this.tabsInfo[t].color=this.colorGradientArr[o-1-i]},setFinishCurrent:function(t){var e=this;this.tabsInfo.map((function(n,i){return n.color=t==i?e.activeColor:e.inactiveColor,n})),this.line3AddDx=0,this.animationFinishCurrent=t,this.countLine3Dx()}}};e.default=u},d93d:function(t,e,n){"use strict";var i=n("99a9"),o=n.n(i);o.a},f0b0:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uBadge:n("6f85").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-tabs",style:{zIndex:t.zIndex,background:t.bgColor}},[n("v-uni-scroll-view",{staticClass:"u-scroll-view",style:{zIndex:t.zIndex+1},attrs:{"scroll-x":!0,"scroll-left":t.scrollLeft,"scroll-with-animation":!0}},[n("v-uni-view",{staticClass:"u-tabs-scroll-box",class:{"u-tabs-scorll-flex":!t.isScroll}},[t._l(t.getTabs,(function(e,i){return n("v-uni-view",{key:i,staticClass:"u-tabs-item",class:[t.preId+i],style:[t.tabItemStyle(i)],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.emit(i)}}},[n("u-badge",{attrs:{count:e[t.count]||e["count"]||0,offset:t.offset,size:"mini"}}),t._v(t._s(e[t.name]||e["name"]))],1)})),t.showBar?n("v-uni-view",{staticClass:"u-scroll-bar",style:[t.tabBarStyle]}):t._e()],2)],1)],1)},r=[]}}]);