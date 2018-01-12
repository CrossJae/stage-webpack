### webpack脚手架

* for mac
* todo list
  * [x] !hmr-开发环境
  * [x] 每次build之前清空之前build文件。先通过`rm -rf`命令删除build文件夹，再执行build
  * [x] 输出html文件
  * [x] babel - 兼容问题
  * [x] autoprefixer
    * 在postcss中配置，还不知道兼容浏览器的方式
  * [x] 支持less / scss / css
  * [x] 支持gif / png / jpg
    * url-loader 生成dataurl
  * [x] source-map
    * 调试打包时报错的具体位置
  * [x] !压缩js
    * uglifyJsPlugin
  * [] 压缩的js插入html中
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
  * [x] 配置文件分 开发 / 生产
  * [] DllReferencePlugin 优化手段 提取第三方库
  * [] copy-webpack-plugin 拷贝资源到编译目录
  * [] !gzip 服务端
  * [] 根据不同项目都在一个文件中打包，分不同的子文件夹
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
    * source-map
* v1.2 活动页面，多页
  * 根据项目分文件夹进行编译
    * cli中输入诸如`npm run dev/build demo`文件夹
      * `npm run dev --dir=demo`
    * 在build下生成 `build/demo` 路径

* example
```
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';
```
