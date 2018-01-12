### webpack脚手架

```
.
├── app 项目目录
│   ├── assets 资源，被html直接调用的
│   ├── components 组件，包括js和css
│   ├── entry.js 入口文件
│   └── template html模版
├── build 打包
│   ├── common.js
│   ├── images
│   ├── index.html
│   ├── main.css
│   └── main.js
├── package-lock.json
├── package.json
├── webpack.config.dev.js 开发配置
└── webpack.config.pro.js 生产配置
```

调用方法 `npm run dev --dir=super`
