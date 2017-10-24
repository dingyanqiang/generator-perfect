const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const morgan = require('morgan');
const chalk = require('chalk');

const log = console.log;
const config = require('./webpack.dev.js');
const compiler = webpack(config);
const webpackConfig = require('./package.json').webpackConfig || {};
const port = webpackConfig.port || 8080;
const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
	noInfo: true,
	stats: {
		colors: true
	},
	publicPath: config.output.publicPath
});

const app = express();
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');
app.use(morgan(function (tokens, req, res) {
	let str = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
  return chalk.gray(str);
}));
app.use(webpackDevMiddlewareInstance);
webpackDevMiddlewareInstance.waitUntilValid(function(){
  log(chalk.green('server is success! please visit it!'));
});
app.use(webpackHotMiddleware(compiler, {
	log: function(text){ log(chalk.cyan(text)) },
	path:'/__webpack_hmr',
	heartbeat: 10 * 1000
}));
app.use(express.static('dist'));
app.listen(port, 'localhost', function(err, result){
	if(err){
		return log(chalk.red(err));
	}
	log(chalk.green(`Listening at ${chalk.cyan(`http://localhost:${port}/`)} \n`));
});
app.get("/", function(req, res) {
	res.render('index-html',{
		title:'列表页',
		message:'请选择你需要进入的页面',
		listUrl: getListUrl()
	})
  //res.sendFile(__dirname + '/index.html');
});

function getListUrl(){
	let keys = Object.keys(config.entry);
	return keys.map((key) => {
		key = key.split('/')[1];
		console.log('key',key);
		return `http://localhost:${port}/${key}.html`;
	});
}

// if (require.main === module) {
// 	const http = require('http');
//   const server = http.createServer(app);
//   server.listen(process.env.PORT || 3000, function() {
//     log(chalk.cyan('Http Server Listening on %j'), server.address());
//   });
// }