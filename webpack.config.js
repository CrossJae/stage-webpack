const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry : {
    main : './app/index.js', // app入口
  },
  output : {
    path : path.resolve(__dirname, 'build'), // 输出路径
    filename : '[name].js' // 输出文件名
  },
  module : {
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
    // 出问题？
    // new HtmlWebpackPlugin({
    //   filename: 'test.html',
    //   template: path.resolve(__dirname, './app/index.html')
    // })
  ]
}
