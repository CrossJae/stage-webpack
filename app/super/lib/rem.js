(function (doc, win) {
  var _root = doc.documentElement,
      resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
      resizeCallback = function () { console.log('DOMContentLoaded');
          var clientWidth = _root.clientWidth,
                  fontSize = 10*10;
          if (!clientWidth) return;
          if(clientWidth < 1080) {
              fontSize = 100*(clientWidth / 750);
          } else {
              fontSize = 100*(1080 / 750);
          }
          _root.style.fontSize = fontSize + 'px';

          // 设置播放器宽高比 16:9
          if(document.getElementById('js_video')){
              var _video = document.getElementById('js_video'),
              videoHeight = _video.offsetWidth * 9 / 16;
              _video.style.height = videoHeight + 'px';
          }
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvent, resizeCallback, false);
  doc.addEventListener('DOMContentLoaded', resizeCallback, false);
})(document, window);
