##针对context字段出现多次定向的问题

> 需要在每一次请求响应的时候，初始化为context对象

> context对象StaticRouter传递中，由于接收到redirect组件的重定向

> 而发生变化，记录重定向的信息

> 服务器端捕获到context对象的变化,坐出渲染还是重定向

> 因而保持跟客户端地一致