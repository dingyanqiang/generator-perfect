const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const isProduction = (process.env.NODE_ENV === 'production') ? true : false;
const bannerTpl = `
@author:${pkg.author}
@email:${pkg.email}
@email:${time}
`;
const vendors = [
  'isomorphic-fetch',
  'moment',
  
  'vue',
  // 'vue-router',
  // 'vue-x',
  
  
];

const pluginsArr = [
  new webpack.DllPlugin({
    path:path.join(__dirname,'dist','dll','manifest.json'),
    name: '[name]',
    context: path.resolve(__dirname),
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];
if(isProduction){
  pluginsArr.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin({
      banner: bannerTpl
    })
  );
}

module.exports = {
  entry: {
    dll: vendors,
  },
  output: {
    path: path.join(__dirname, 'dist','dll'),
    filename: '[name].js',
    library: '[name]',
  },
  plugins: pluginsArr,
};