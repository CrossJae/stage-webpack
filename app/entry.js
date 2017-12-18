// 引入css
import './components/style.css';
// 引入js
import './lib/index';

import $ from 'jquery'; // 多了90+kb

var img1 = document.createElement("img");
img1.src = require("./assets/small.png");
document.body.appendChild(img1);

console.log('abc')
