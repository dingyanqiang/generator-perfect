const path = require('path');
const webpack = require('webpack');
const vendors = [
  //'antd',
  //'isomorphic-fetch',
  'react',
  'react-dom',
  // 'react-redux',
  // 'react-router',
  // 'redux',
  // 'redux-promise-middleware',
  // 'redux-thunk',
  // 'superagent',
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
      //path: 'manifest.json',
      path:path.join(__dirname,'dist','dll','manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname),
    })
  ],
};