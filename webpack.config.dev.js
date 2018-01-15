const path = require('path'),
      webpack = require('webpack'),
      autoprefixer = require('autoprefixer'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

const PROJECTDIR = process.env.npm_config_dir + '/' || 'super';
console.log('PROJECTDIR: ', PROJECTDIR);

module.exports = {
  entry: { // entry最好写成对象
    main: './app/' + PROJECTDIR + 'entry.js', // app入口
  },
  output: { // output相当于一套规则，所有入口都必须遵守
    path: path.resolve('./build/' + PROJECTDIR ), // 必须传绝对路径 resolve转换成绝对路径
    publicPath: '/', // 打包生成的cdn地址
    filename: '[name].js' // 输出文件名
  },
  // resolve: {
  //   extensions: ['.jsx', '.js'] // <-- Had to add the .js one
  // },
  devtool: 'source-map', // 调试bug
  devServer:{
    contentBase: './build/' + PROJECTDIR, // 以build为根目录提供文件
    hot: true, // 热模块替换
    inline: true, // 实时刷新
    stats: { colors: true },
    port: 9010,
    host : '0.0.0.0',
  },
  module: { // webpack默认只能对Js打包，其他类型文件需要loader处理
    // loaders
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader', // 转换引用等
          {
            loader: 'postcss-loader', // 平台
            options: { // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: (loader) => [
                autoprefixer(), //CSS浏览器兼容
              ]
            }
          }
        ]
      },
      {
        // babel 兼容es6
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // exclude排除，优化，减少loader遍历的范围，加快wp编译速度
        use: {
          loader: 'babel-loader?cacheDirectory',// 优化，开启cache选项，提高构建性能
          options: {
            presets: ['@babel/preset-env']
          },
          // include: path.resolve('node_modules/webpack-dev-server/client')
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
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
      template: path.resolve('./app/' + PROJECTDIR + 'template/index.html'), // 模版
      minify: {
        // collapseWhitespace: true,
        // removeComments: true, //移除HTML中的注释
      },
      projectPath: './assets/', // 替换模版里的项目路径，可以自定义key
    }),
    // new webpack.NamedModulesPlugin(),// 查看要修补(patch)的依赖
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([ // 拷贝资源 到编译目录
 			{
        from: './app/' + PROJECTDIR + 'assets',
        to: './assets'
      }
 		])
  ]
}
