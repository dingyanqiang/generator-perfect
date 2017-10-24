 >为了解决多个React页面，在同一个项目的管理问题

#### 安装依赖
```
npm install
```

#### 特点
* 支持热替换
* 多页面入口
* 同时支持，非React项目开发（ES6+Less+HTML)
* 日志详细

#### 生成Dll(`启动服务或打包前，确保先生成Dll`)
```
npm run dll
```

#### 启动开发环境
* npm run server
	* 推荐的方式，日志信息更详细
* npm run dev
	* 利用 webpack-dev-serve服务
	* 添加webpack-dashboard优化界面
	`Notice`:要求MacOS or Windows10

#### 打包压缩
```
npm run build
```
