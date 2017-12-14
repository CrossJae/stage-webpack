const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: { // entry最好写成对象
    main: './app/entry.js', // app入口
  },
  output: { // output相当于一套规则，所有入口都必须遵守
    path: path.resolve(__dirname, 'build'), // 必须传绝对路径
    filename: '[name].js' // 输出文件名
  },
  module: { // webpack默认只能对Js打包，其他类型文件需要loader处理
    // loaders
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    // 生成html
    new HtmlWebpackPlugin({
      filename: 'index.html', // 输出文件名
      template: path.resolve(__dirname, './app/template/index.html'), // 模版
    }),
    // 单独分离css
    new ExtractTextPlugin('[name].css'),
    // new ExtractTextPlugin(cdn + '[name].css', { allChunks: true }),
  ]
}
