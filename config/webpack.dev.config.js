const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: { // entry最好写成对象
    main: './app/entry.js', // app入口
    other: './app/lib/other.js',
  },
  output: { // output相当于一套规则，所有入口都必须遵守
    path: path.resolve('./build/'),//path.resolve(__dirname, 'build'), // 必须传绝对路径
    filename: '[name].js' // 输出文件名
  },
  devtool: 'source-map', // source-map
  devServer: {
    contentBase: './build'
  },
  module: { // webpack默认只能对Js打包，其他类型文件需要loader处理
    // loaders
    rules: [
      {
        // css
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        // babel 兼容es6
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
    ]
  },
  plugins: [
    // 生成html，有其他可配置参数
    new HtmlWebpackPlugin({
      filename: 'index.html', // 输出文件名
      template: path.resolve('./app/template/index.html'), // 模版
    }),
    // 单独分离css，有其他可配置参数
    new ExtractTextPlugin('[name].css'),
    // ?压缩js？压缩css？
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 避免重复，提取公用js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 指定公共 bundle 的名称。
    })
  ]
}
