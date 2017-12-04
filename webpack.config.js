const path = require('path');

module.exports = {
  entry : {
    main : './app/index.js', // app入口
  },
  output : {
    path : path.resolve(__dirname, 'build'), // 输出路径
    filename : '[name].js?[chunkhash]' // 输出文件名
  },
  module : {
    // loaders
    rules : []
  },
  plugins : []
}
