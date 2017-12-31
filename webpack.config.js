const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: { // entry最好写成对象
    main: './app/entry.js', // app入口
  },
  output: { // output相当于一套规则，所有入口都必须遵守
    path: path.resolve('./build/'), // 必须传绝对路径 resolve转换成绝对路径
    // publicPath: 'http://', // 打包生成的cdn地址
    filename: '[name].js' // 输出文件名
  },
  devtool: 'source-map',
  devServer:{
    contentBase: './build', // 以build为根目录提供文件
    hot: true, // 热模块替换
    inline: true,
    stats: { colors: true },
  },
  module: { // webpack默认只能对Js打包，其他类型文件需要loader处理
    // loaders
    rules: [
      {
        // css
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        // babel 兼容es6
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // exclude排除
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
            // presets: ['es2015']
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query : {
          limit: 8192,
        }, // 处理图像，会将引入的图片编码，生成dataURl。url-loader提供了一个limit参数，小于limit字节的文件会被转为dataURl，大于limit的还会使用file-loader进行copy。还可以通过 name 字段来指定图片打包的目录与文件名&name=images/[hash:8].[name].[ext]。&publicPath=http://.
      },
    ]
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),// 查看要修补(patch)的依赖
    new webpack.HotModuleReplacementPlugin(),

  ]
}
