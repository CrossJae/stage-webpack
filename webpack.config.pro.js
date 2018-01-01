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
  module: { // webpack默认只能对Js打包，其他类型文件需要loader处理
    // loaders
    rules: [
      {
        // css
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({ // use，需要多个loader时，如果只有一个loader可以直接使用loader: 'xxx-loader'
          fallback: 'style-loader',
          use:[{
            loader: 'css-loader',
            options: {
              // minimize: true, //css压缩
              importLoaders: 1,
              // modules: true, // ???对应的html没有变化
            }
          }, {
            loader: 'postcss-loader',
            options: { // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: (loader) => [
                autoprefixer(), //CSS浏览器兼容
              ]
            }
          }]
        }),
      },
      {
        // babel 兼容es6
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // exclude排除，优化，减少loader遍历的范围，加快wp编译速度
        use: {
          loader: 'babel-loader?cacheDirectory',// 优化，开启cache选项，提高构建性能
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
    // 生成html，有其他可配置参数
    new HtmlWebpackPlugin({
      filename: 'index.html', // 输出文件名
      template: path.resolve('./app/template/index.html'), // 模版
      minify: {
          // collapseWhitespace: true
      },
    }),
    // 单独分离css，有其他可配置参数
    new ExtractTextPlugin('[name].css'),
    // 压缩js
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 避免重复，提取公用js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 指定公共 bundle 的名称。
    }),
    // new webpack.NamedModulesPlugin(),// 查看要修补(patch)的依赖
  ]
}
