const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const  glob = require('glob');

const webpackConfig = require('./package.json').webpackConfig || {};

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const isProduction = (process.env.NODE_ENV === 'production') ? true : false;
const entryObj = {};
const htmlWebpackPluginArr = [];
const dirList = glob.sync((webpackConfig.entry || 'src/pages/*'),{});
dirList.forEach((dir, index) => {
  let dirKeyStr = dir.replace(/src\//,'')+'/';
  entryObj[dirKeyStr] = [`./${dir}`];
  /*
   此处把.html文件放到dist跟目录,为了解决webpack-hot-middleware配置路径问题
   path=/__webpack_hmr设置路径问题，还需进一步探索
  */
  let htmlStr = dir.split('/')[2];
  htmlWebpackPluginArr.push(
    new HtmlWebpackPlugin({
      filename: `${htmlStr}.html`,
      chunks: [dirKeyStr],
      template: './src/views/webpack-dev-tpl.html'
    })
  );
});


function getPluginsConfig() {
  let port = webpackConfig.port || 8080;
  let openUrl = `http://localhost:${port}`;
  const pluginsConfig = [
    new CleanWebpackPlugin(['dist'],{exclude: ['dll']}),
    ...htmlWebpackPluginArr,
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./dist/dll/manifest.json')
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),
    new OpenBrowserPlugin({ url: openUrl }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ];
  if (isProduction) {
    pluginsConfig.push(
      new ExtractTextPlugin('[name]index.css')
    );
  } else {
    pluginsConfig.push(
      //热加载插件
      new webpack.HotModuleReplacementPlugin(),
      // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息)
      new webpack.NamedModulesPlugin()
    );
  }
  return pluginsConfig;
}
function getRulesConfig() {
  const rulesConfig = [{
    test: /\.jsx?$/,
    include: path.resolve(__dirname, "src"),
    loader: "babel-loader",
    //options: {presets: ['es2015']}
  }, {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader'
    ]
  }];
  if (isProduction) {
    rulesConfig.push(
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { modules: true }
            },
            'postcss-loader', 
            'less-loader'
          ]
        })
      }
    );
  } else {
    rulesConfig.push(
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    );
  }
  return rulesConfig;
}

module.exports = {
  entry: entryObj,
  output: {
    filename: '[name]index.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    //publicPath: path.resolve(__dirname)
  },
  module: {
    rules: getRulesConfig()
  },
  plugins: getPluginsConfig()
}