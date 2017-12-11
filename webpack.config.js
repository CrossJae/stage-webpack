const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry : { // entry最好写成对象
    main : './app/index.js', // app入口
  },
  output : { // output相当于一套规则，所有入口都必须遵守
    path : path.resolve(__dirname, 'build'), // 必须传绝对路径
    filename : '[name].js' // 输出文件名
  },
  module : { // webpack默认只能对Js打包，其他类型文件需要loader处理
    // loaders
    rules : [
      {
        test : /\.css$/,
        use : [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins : [
    // 生成html
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: path.resolve(__dirname, './app/index.html')
    })
  ]
}
