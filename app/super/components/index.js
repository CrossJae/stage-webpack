// require('http://p1.ifengimg.com/3af6807ab94632d0/2018/2/swiper.min.js');
import { sta } from './tongji';

// pv
sta('page', 'h5', {
  id: 'xxx_0',
  url: encodeURIComponent(location.href),
});
// swiper
var swiper = new Swiper('.swiper-container',{
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay:{
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
});
// btn
document.getElementById('gotoapp').addEventListener('click', function(){
  // tongji
  sta('action', 'h5download', {
    plat: 'napp',
    url: encodeURIComponent(location.href),
  });
  // call
  callNewsAPP({
    download: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1381778988679',
    downloadAd: 'https://statistics.appstore.ifeng.com/index.php/api/godownload?app_id=4&d_ch=7742'
  },{
    type: 'video',
    kind: 'brand_qsm',
    ref: encodeURIComponent(location.href),
    id: 'https://api.iclient.ifeng.com/api_phoenixtv_details?guid=0355a15b-2291-44f8-bd78-c082495cd14e'
  })
})
