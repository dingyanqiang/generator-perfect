const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const entryObjKeys = Object.keys(common.entry);
const entryObj = {};
entryObjKeys.forEach((value,index) => {
  let arr = common.entry[value];
  arr.unshift(hotMiddlewareScript)
  entryObj[value] = arr;
});

//清除 entry重新赋值
delete common.entry;
//console.log(merge(common,{entry: entryObj}))
module.exports = merge(common, {
	entry: entryObj
});