### webpack脚手架

* for mac
* todo list
  * [] !hmr-开发环境
  * [x] 每次build之前清空之前build文件。先通过`rm -rf`命令删除build文件夹，再执行build
  * [x] 输出html文件
  * [x] babel - 兼容问题
  * [] autoprefixer
  * [] 支持less / scss / css
  * [] 支持gif / png / jpg
    * url-loader 生成dataurl
  * [] source-map
  * [x] !压缩js
    * uglifyJsPlugin
  * [x] !压缩css
    * options:{minimize:true //css压缩}
    * optimize-css-assets-webpack-plugin
  * [x] !压缩html
    * https://github.com/kangax/html-minifier#options-quick-reference
    ```
    new HtmlWebpackPlugin({
      filename: 'index.html', // 输出文件名
      template: path.resolve('./app/template/index.html'), // 模版
      minify: {
          collapseWhitespace: true // 属性参见html-minifier
      },
    }),
    ```
  * [] jsx / ttf loaders
  * [] 批量替换images路径再打包
  * [x] 单独打包css
  * [x] 配置文件单独归类
  * [] 配置文件分 开发 / 生产
  * [] !gzip 服务端
  * [] stage-vue
  * [] stage-react

* v1.0 本地环境
* v1.1 [活动页] 支持单页面的打包，包括js,css（css3）,image（png,gif,jpg），支持es6，输出一个js的页面，和相应的html，对html,js进行压缩
* v2.0 支持模版
* v2.1 支持按需加载

* v1.1 活动页面
  * 生产模式 pro
    * 单页html，资源有js/css/images，各自打包成独立文件，并压缩
    * 资源有cdn路径
    * 公用代码：微信分享、统计（page,action）、拉新拉活、防盗链
  * 开发模式 dev
    * dev-server
    * hot-module
    * source-map !!!!!!!!!
