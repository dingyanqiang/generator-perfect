const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const pkg = require('./package.json');

const time = (new Date).toLocaleString();
const bannerTpl = `
@author:${pkg.author}
@email:${pkg.email}
@time:${time}
`;

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
  		'process.env': {
  			'NODE_ENV': JSON.stringify('production')
  		}
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin({
      banner: bannerTpl
    })
  ]
});