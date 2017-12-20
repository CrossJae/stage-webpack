// node testnode
// 启用node方式打开

var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
var entryNew = "webpack-dev-server/client?http://localhost:8080/" + config.entry.main;
console.log(entryNew);

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase:'build/',
  // publicPath: "/assets/"
});
server.listen(8089);
