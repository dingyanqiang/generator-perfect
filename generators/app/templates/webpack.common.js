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

  let hasPageTpl = fs.existsSync(dir+'/index.html');
  let tplHtml = hasPageTpl ? `${dir}/index.html` : './src/templates/webpack-dev-tpl.html';
  let chunkArr = webpackConfig.enableCommon ? [dirKeyStr] : ['vendor', dirKeyStr];

  let htmlStr = dir.split('/')[2];
  htmlWebpackPluginArr.push(
    new HtmlWebpackPlugin({
      filename: `${htmlStr}.html`,
      chunks: chunkArr,
      template: tplHtml
    })
  );
});


function getPluginsConfig() {
  let port = webpackConfig.port || 8080;
  let openUrl = `http://localhost:${port}`;
  const pluginsConfig = [
    new CleanWebpackPlugin(['dist'],{exclude: ['dll']}),
    ...htmlWebpackPluginArr,
    <% if (webpackConfig.enableDll) { %>
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname),
        manifest: require('./dist/dll/manifest.json')
      }),  
    <% } %>
    <% if (webpackConfig.enableCommon) { %>
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'pages/common/vendor.js',
        minChunks: 2
      }),
    <% } %>
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
  const rulesConfig = [
    <% if (projectType == 'vue') { %>
    {
      test: /\.vue$/,
      include: path.resolve(__dirname, "src"),
      loader: 'babel-vue'
    },
    <% } %>
    {
      test: /\.jsx?$/,
      include: path.resolve(__dirname, "src"),
      loader: 'babel-loader'
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [ 'file-loader' ]
    }
  ];
  
  if (isProduction) {
    rulesConfig.push(
      {
        <% if (styleType == 'less') { %>
        test: /\.(css|less)$/,
        <% } %>
        <% else if ( styleType == 'sass' ) { %>
        test: /\.(css|scss)$/,
        <% } %>
        <% else { %>
        test: /\.(css)$/,
        <% } %>
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { modules: webpackConfig.cssModule }
            },
            'postcss-loader', 
            <% if (styleType == 'less') { %>
            'less-loader',
            <% } %>
            <% if (styleType == 'sass') { %>
            'sass-loader'
            <% } %>
          ]
        })
      }
    );
  } else {
    rulesConfig.push(
      {
        <% if (styleType == 'less') { %>
        test: /\.(css|less)$/,
        <% } %>
        <% else if ( styleType == 'sass' ) { %>
        test: /\.(css|scss)$/,
        <% } %>
        <% else { %>
        test: /\.(css)$/,
        <% } %>
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: webpackConfig.cssModule }
          },
          'postcss-loader',
          <% if (styleType == 'less') { %>
          'less-loader',
          <% } %>
          <% if (styleType == 'sass') { %>
          'sass-loader'
          <% } %>
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
  },
  module: {
    rules: getRulesConfig()
  },
  plugins: getPluginsConfig()
}