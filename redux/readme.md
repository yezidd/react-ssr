#### 针对context字段出现多次定向的问题

> 需要在每一次请求响应的时候，初始化为context对象

> context对象StaticRouter传递中，由于接收到redirect组件的重定向

> 而发生变化，记录重定向的信息

> 服务器端捕获到context对象的变化,坐出渲染还是重定向

> 因而保持跟客户端地一致

#### 关于自动刷新的问题

> 设置webpack-hot-middleware客户端正确路径

> webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true

> path改为其他的，浏览器刷新都会自动失效

#### 关于浏览器获取js、css资源都变成请求网页问题

> 想到是因为中间件写在了服务端请求渲染的后面，导致请求资源时，预先响应网页请求

> 由于StaticRouter的存在，使得任何路由都会响应

> 这边要增加一个404和一个500机制

#### 关于webpack-dev-middleware出现的问题

> context.compiler.hooks.invalid.tap('WebpackDevMiddleware', invalid)

> 目前没有解决,切换到低版本2.0.6问题解决

#### 关于服务端渲染在热更新机制下面无法获取到模版文件

> 通过webpack api plugin接口来实现文件加载的监听

> 然后监听到html文件，通过fs模块写入到项目中去

#### 关于redux服务端渲染的机制

> 每次请求都讲重新初始化store

> 那么必须在每次请求之后 需要保存

#### 关于webpack-dev-middleware修改css不能实时刷新问题

> 由于使用了ExtractTextPlugin插件使得css分离

> 修改了css文件ExtractTextPlugin不能实时重新刷新打包

> 查询ExtractTextPlugin issue讨论这个问题

> 可以在开发环境 禁用这个插件，能解决问题

> 也可以

```javascript
if (module.hot) {
  var hotEmitter = require("webpack/hot/emitter");
  hotEmitter.on("webpackHotUpdate", function(currentHash) {
    document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
      const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
      link.href = nextStyleHref
    })
  })
}
```

> 还可以使用这个css-hot-loader搭配使用解决问题

> 鉴于目前的情况，将采用第三种情况

> 完美解决问题

#### 关于服务端缺少window字段,redux-devtool-extension无法使用

```
    const store = createStore(
       reducer, /* preloadedState, */
    +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     );
```
> 官方给出的答案是:For universal ("isomorphic") apps, prefix it with typeof window !== 'undefined' &&

> 不清楚哪里配置的原因，偶尔可以使用，偶尔服务端会报错

> 具体的错误是：enhancer need to be function

> 想不明白

> 然后只能提到外面 客户端进行增强器的加载

> 可以使用 参数进行传递

#### 关于react中索引问题导致input[checkbox]样式继承问题

> 通过map  index索引加载了一个input[checkbox]列表

> 因为 点击之后 未完成的变成已完成的，但是index已经继承了

> 所以造成数据一致，但是checkbox已经被选中

> 改成唯一索引就可以解决这个问题