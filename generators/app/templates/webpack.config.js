const path = require('path');
const webpack = require('webpack');

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpackConfig = require('./package.json').webpackConfig || {};

const entryObjKeys = Object.keys(common.entry);
const entryObj = {};
entryObjKeys.forEach((value,index) => {
  let arr = common.entry[value];
  arr.unshift('react-hot-loader/patch')
  entryObj[value] = arr;
});

//清除 entry重新赋值
delete common.entry;

const mergeConfig = merge(common, {
  entry: entryObj,
  devServer: {
    port: webpackConfig.port || 8080,
    historyApiFallback: true,
    hot: true,
    quiet: true,
    contentBase: path.join(__dirname, "dist")
  },
  devtool: webpackConfig.devtool || 'eval-source-map',
  plugins: [
    new DashboardPlugin(dashboard.setData)
  ]
});
//console.log('mergeConfig=',mergeConfig);
module.exports = mergeConfig;