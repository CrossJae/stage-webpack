import './rem.js';
import './callNewsAPP.js';
import { sta } from './tongji.js';

sta('page', 'other', {
  id: 'qd_cjdx',
  url: encodeURIComponent(location.href),
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
    type: 'phvideo',
    kind: 'brand_qsm',
    ref: encodeURIComponent('https://m.ifeng.com/news/sharenews.f?guid=01f35cc2-f6fd-4e17-8ba4-c9a98f901c98'),
    id: '01f35cc2-f6fd-4e17-8ba4-c9a98f901c98'
  })
})
