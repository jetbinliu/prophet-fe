# prophet-fe

> prophet系统的前端代码，采用VUE.js + iview UI框架编写

## 如何编译

``` bash
# 安装依赖
npm install

# 安装vue-jsx插件
npm install babel-plugin-transform-vue-jsx  -DS
npm install babel-plugin-syntax-jsx -DS

# 开发：以dev服务器模式启动，监听localhost:8080
npm run dev

# 生产：会生成静态文件，放在后端项目的webroot即可
npm run build

# 生产：顺便查看bundle analyzer report
npm run build --report
```

## 如何增加新的页面

> 在prophet-fe根目录下增加新的页面new1.html

> 在src目录下参照login.js增加新的new1.js，在src/module目录下参照login增加新的模块new1

> 在build/webpack.dev.conf.js里参照login.html增加新的 new HtmlWebpackPlugin块
