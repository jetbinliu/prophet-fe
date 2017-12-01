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
