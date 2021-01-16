
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/test/test","pages/community/detail/detail","pages/community/idea/idea","pages/reader/comment-detail/comment-detail","pages/search/search","pages/index/index","pages/community/community","pages/user/userinfo/userinfo","pages/reader/release/release","pages/reader/book-baseinfo/book-baseinfo","pages/reader/allcomment/allcomment","pages/login/forgetPW","pages/login/register","pages/user/user","pages/reader/reader"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"borderStyle":"black","color":"#000000","selectedColor":"#436EEE","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/tabBar/shouye.png","selectedIconPath":"static/tabBar/shouye1.png"},{"pagePath":"pages/community/community","text":"社区","iconPath":"static/tabBar/shequ.png","selectedIconPath":"static/tabBar/shequ1.png"},{"pagePath":"pages/user/user","text":"我的","iconPath":"static/tabBar/wode.png","selectedIconPath":"static/tabBar/wode1.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"book","compilerVersion":"2.9.8","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom"}},{"path":"/pages/test/test","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom"}},{"path":"/pages/community/detail/detail","meta":{},"window":{"navigationBarTitleText":"评论"}},{"path":"/pages/community/idea/idea","meta":{},"window":{"navigationBarTitleText":"发表心得","titleNView":{"padding-right":"20rpx","buttons":[{"text":"发布","fontSize":"32rpx","color":"#2B85E4"}]}}},{"path":"/pages/reader/comment-detail/comment-detail","meta":{},"window":{"navigationBarTitleText":"评论","navigationStyle":"custom"}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"搜索","navigationStyle":"custom"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"padding-right":"15px","titleNView":{"searchInput":{"backgroundColor":"#fff","borderRadius":"10px","placeholder":"请输入搜索内容","align":"center","disabled":true}}}},{"path":"/pages/community/community","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"社区","navigationStyle":"custom"}},{"path":"/pages/user/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"个人信息"}},{"path":"/pages/reader/release/release","meta":{},"window":{"navigationBarTitleText":"发表评论","titleNView":{"padding-right":"20rpx","buttons":[{"text":"发布","fontSize":"32rpx","color":"#2B85E4"}]}}},{"path":"/pages/reader/book-baseinfo/book-baseinfo","meta":{},"window":{"navigationBarTitleText":"图书信息"}},{"path":"/pages/reader/allcomment/allcomment","meta":{},"window":{"navigationBarTitleText":"全部评论"}},{"path":"/pages/login/forgetPW","meta":{},"window":{"navigationBarTitleText":"忘记密码"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"用户注册"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom"}},{"path":"/pages/reader/reader","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","onReachBottomDistance":100,"titleNView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
