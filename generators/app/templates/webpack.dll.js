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
  <% if (projectType == "vue") { %>
    'vue',
    // 'vue-router',
    // 'vue-x',
  <% } %>
  <% if (projectType == "react") { %>
  'react',
  'react-dom',
  // 'react-redux',
  // 'react-router',
  // 'redux',
  // 'redux-promise-middleware',
  // 'redux-thunk',
  // 'superagent',
  <% } %>
];

module.exports = {
  entry: {
    dll: vendors,
  },
  output: {
    path: path.join(__dirname, 'dist','dll'),
    filename: '[name].js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      path:path.join(__dirname,'dist','dll','manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname),
    }),
    <% if (isProduction) { %>
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin({
      banner: bannerTpl
    }),
    <% } %>
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
};