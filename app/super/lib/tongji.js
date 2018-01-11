export default function sta( behavior, type, other ){
  var stadigurl = 'http://stadig.ifeng.com/appsta.js?datatype=newsappsns',
        ua = navigator.userAgent;

  // cookie
  var cookieUtil = {
    set : function(name, value, expires, path, domain, secure){
      var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
      if(expires instanceof Date){
        cookieText = cookieText + ';expires=' + expires.toGMTString();
        console.log(cookieText)
      }
      if(path){
        cookieText = cookieText + ';path=' + path;
      }
      if(domain){
        cookieText = cookieText + ';domain' + domain;
      }
      if(secure){
        cookieText = cookieText + ';secure';
      }
      document.cookie = cookieText;
    },
    get : function(name){
      var cookieName = encodeURIComponent(name) + '=',
        cookieStart = document.cookie.indexOf( cookieName ),
        cookieValue = null;
      if(cookieStart > -1){
        var cookieEnd = document.cookie.indexOf(';',cookieStart);
        if(cookieEnd == -1){
          cookieEnd = document.cookie.length; // 如果没有分号，那么结束处就是总长度
        }
        cookieValue = document.cookie.substring(cookieStart + cookieName.length , cookieEnd);
        cookieValue = decodeURIComponent(cookieValue);
      }
      return cookieValue;
    }
  };

  // 手机操作系统
  var mos = () => {
    if( ua.match(/iphone|ipod/ig) || ua.match(/ipad/ig) ){
      return 'iphone';
    }else if( ua.match(/android/ig) ){
      return 'android';
    }else{
      return 'windows';
    }
  }

  var userkeyUtil = {
    get : (l) => {
      var len = l || 32;
      var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var charsLen = chars.length;
      var uid = '';
      for(var i = 0; i< len ; i++){
        uid +=  chars.charAt(Math.floor(Math.random() * charsLen));
      }
      return uid;
    },
    init : () => {
      if( cookieUtil.get('userkey') ){
        return cookieUtil.get('userkey');
      }else{
        var uid = userkeyUtil.get(15);
        var exp = new Date();
        exp.setTime( exp.getTime() + 30 * 24 * 60 * 60 * 1000 )
        cookieUtil.set('userkey', uid, exp);
        return uid;
      }
    }
  }
  // 分享来源
  var sharefrom = () => {
    if( ua.match(/MicroMessenger/ig) ){
      return 'wx';
    }else if( ua.match(/QQ\//) ){
      return 'qq';
    }else if( ua.match(/WeiBo/i) ){
      return 'weibo';
    }else{
      return 'unknown';
    }
  }
  // 时间戳
  var timestamp = () => {
    var now = new Date(),
        year = now.getFullYear(),
        month = format( now.getMonth() + 1 ),
        day = format( now.getDate() ),
        hour = format( now.getHours() ),
        min = format( now.getMinutes() ),
        sec = format( now.getSeconds() );
    function format(n){
      return n > 9 ? n : '0' + n;
    }
    // 输出格式为2016-05-27+09:04:36
    var t = year + '-' + month + '-' + day + '+' + hour + ':' + min + ':' + sec;
    return now ? t : '';
  }
  // session字段,必须encode
  var session = ( behavior, type, other ) => {
    // behavior是必要参数 page 或 action
    // type 是必要参数

    // other 是其他统计字段，类型是对象
    // 遍历对象
    var params = '';
    if( typeof other == 'object' ){
      var o = other;
      for (var n in o){
        params += '$' + n + '=' + o[n];
      }
    }
    var s = timestamp() + '#' + behavior + '#type=' + type + params;
    return s;
  }

  var stastring = stadigurl + '&mos=' + mos() + '&userkey=' + userkeyUtil.init() + '&ua=&share=' + sharefrom() +  '&session=' + encodeURIComponent(session( behavior, type, other));

  var script = document.createElement('script');
  script.src = stastring;
  script.async = 'async';
  document.body.appendChild(script);
}
