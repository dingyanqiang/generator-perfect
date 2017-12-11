# generator-perfect [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

## Generator-Perfect(前端脚手架)

> Perfect主要目的是快速开启新项目，并加强前端项目的规范性，统一性。一个入口可以选择不同的开发框架；但是项目目录统一，规范统一，功能统一。项目依赖于Yeoman+Webpack+Bable+Express,能够很好的推进技术升级，避免了手动Copy、繁琐的配置环境. 另外，Perfect还有很好的可配置性，既规范了项目又不缺失灵活性.


![image](./screenshot.jpg)

## 安装

```bash
npm install -g yo
npm install -g generator-perfect
```

创建Project:
```bash
yo perfect
```
创建Page:
```bash
yo perfect:page
```
创建Component:
```bash
yo perfect:component
```
创建Util:
```bash
yo perfect:util
```

## 支持项目类型
 * [X] React
 * [X] Vue
 * [X] PC
 * [X] H5

## 功能特性

* [X] 可选择Less Lass Css
* [X] Dll库开关
* [X] 公共文件开关(Common.js/.css)
* [X] 生成环境文件Banner(author,emaill,date)
* [X] 默认开启 CSS moduel
* [X] 热替换(Hot Replace)
* [X] 样式前缀(AutoPrefixer)
* [X] 支持浏览器版本可配置(Browsers Config)
* [ ] Mock接口(TODO)
* [ ] TypeScript(TODO)
* [ ] 测试用例(TODO)


## License

MIT © [dingyanqiang](https://github.com/dingyanqiang)


[npm-image]: https://badge.fury.io/js/generator-perfect.svg
[npm-url]: https://npmjs.org/package/generator-perfect
[travis-image]: https://travis-ci.org/dingyanqiang/generator-perfect.svg?branch=master
[travis-url]: https://travis-ci.org/dingyanqiang/generator-perfect
[daviddm-image]: https://david-dm.org/dingyanqiang/generator-perfect.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/dingyanqiang/generator-perfect
[coveralls-image]: https://coveralls.io/repos/dingyanqiang/generator-perfect/badge.svg
[coveralls-url]: https://coveralls.io/r/dingyanqiang/generator-perfect