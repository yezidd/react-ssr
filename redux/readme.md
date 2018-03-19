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