import $ from 'jquery'; // 多了90+kb

$(function() {
      //params of location.search
      var params = (function() {
       var query = location.search;
       var reg = /([^?=&\s]+)[=\s]*([^?=&\s]*)/g;
       var obj = {};
       while(reg.exec(query)){
         obj[RegExp.$1] = RegExp.$2;
       }
       return obj
      })()

          var appName;
          var sharenews_openPath;//ios唤起路径
          var sharenews_protocol;

      if (params.sf_from == 'ktt') {
      $('.content .logo').html('<img src="https://p1.ifengimg.com/redbag/images/shitulogo2.png"/>')
            appName = '快头条';

            sharenews_openPath = 'wakeupiOS/ifengnewsgold';
            sharenews_protocol = 'comifengnewsclientgold';
      } else {
      $('.content .logo').html('<img src="https://p1.ifengimg.com/redbag/images/shitulogo.png"/>')
            appName = '凤凰新闻';

            sharenews_openPath = 'wakeupiOS/ifengnews';
            sharenews_protocol = 'comifengnewsclient';
      }
      $('.appName').html(appName)

      $.ajax({
      type: 'GET',
      dataType: "jsonp",
      url: "https://user.iclient.ifeng.com/Redpack_Api_GetRecordsForShare/do",
      success: function(data) {
        intervalFn(data.data.withdraw_user_list)
      }
      })


      var GUID = params.guid;
      var COUPON;
          var USERIMG;
          var USERIMG_DEFAULT; //未获取到用户头像的默认图片
      var NICKNAME;
      var URL;

      showLoading()
      var userkey = 'E76HRt362TfN5G7';

      $.ajax({
      type: 'GET',
      dataType: "jsonp",
      url: "https://user.iclient.ifeng.com/pyramid_Wxshare/apiForSharePages?guid="+ GUID + '&userkey='+ userkey +'&from=employee',
      success: function(data) {
        hideLoading()
        COUPON = data.data.coupon;
        USERIMG = data.data.user_info.userimg;
        NICKNAME = data.data.user_info.nickname;
        if (params.sf_from == 'ktt') {
                URL = data.data.shareUrl + '&sf_from=ktt';
                USERIMG_DEFAULT = 'http://p1.ifengimg.com/ktt/v1/share_default.png';
        } else {
                URL = data.data.shareUrl;
                USERIMG_DEFAULT = 'https://p1.ifengimg.com/a80c2beeeff78280/2017/24/s.png';
        }
        // wxShare()
      }
      })

      //微信分享
      //微信分享功能
      // function wxShare () {
      // var name = NICKNAME ? NICKNAME : '好友';
      // var img = USERIMG ? USERIMG : USERIMG_DEFAULT;
      // var title = name + '在'+ appName +'送你1~200元现金，看新闻就能赚钱';
      // var dec = '不是优惠，是真的现金！';
      // sharetitle= title;
      // sharelink=  URL;
      // shareimgUrl=  img;
      // sharedesc= dec;
      // shareTimeline = title;
      // weixinshare()
      // footerShare({
      //   title: title,
      //   thumb: shareimgUrl,
      //   desc: dec,
      //   url: sharelink
      // })
      // }

      function footerShare(options) {
      if (!options) return;
      let node = document.createElement('div');
      let shareBody = document.querySelector('.ifeng_share');
      if (shareBody) {
        node = shareBody;
      }

      let template = '<div id="ifeng_share_thumbnail">'+ options.thumb + '</div>' +
        '<div id="ifeng_share_title">'+ options.title + '</div>' +
        '<div id="ifeng_share_description">'+ options.desc + '</div>' +
        '<div id="ifeng_share_url">'+ options.url + '</div>'
      ;
      node.className = 'ifeng_share';
      node.style.display = 'none';
      node.innerHTML = template;
      document.body.appendChild(node);
     }
    //  setTimeout(function(){wxShare()},500);

      //time format
      function getDateDiff(dateTimeStamp){
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date();
      var nowStr = now.getTime();
      var today=new Date(now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate()+' 00:00:00').getTime();
      var yestoday=today-86400000;
      var befyestoday=yestoday-86400000;
    //    var now=new Date(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate()+' 00:00:00').getTime();

      var diffValue = nowStr - dateTimeStamp*1000;
      var monthC =diffValue/month;
      var weekC =diffValue/(7*day);
      var dayC =diffValue/day;
      var hourC =diffValue/hour;
      var minC =diffValue/minute;
      var result='';
      if(diffValue<0){//time error
        return;
      }
      if(dateTimeStamp*1000>=today){
        //today
        if(hourC>=1){
        result=""+parseInt(hourC)+'小时前'
        }else if(minC>=1){
        result=""+parseInt(minC)+'分钟前'
        }else{
        result="刚刚";
        }
      }else if(dateTimeStamp*1000>=yestoday){
        //昨天
        result="昨天";
      }else if(dateTimeStamp*1000>=befyestoday){
        //前天
        result="前天";
      }else{
        //大于前天
        var time=new Date(dateTimeStamp*1000);
        result=""+(time.getMonth()+1)+"月"+time.getDate()+"日";
      }
      return result;
      }
      //income storage
      var incomes=(function(){
      var hasIncome=params.income;
      if(!hasIncome||!hasIncome.length){
        return [];
      }else{
        var incomeArr=[];
        var titleArr=[{tag:1,title:'集齐凤凰令平分金额'},{tag:2,title:'收徒成功领取'},{tag:3,title:'打开推送获得'},{tag:4,title:'获得私信收益'},{tag:5,title:'领取每日红包'},{tag:6,title:'金币转收益'}];
        hasIncome.split(/\,+/).forEach(function(ele,index){
        var arr=ele.split('_');
        titleArr.forEach(function(item,cindex){
          var obj={};
          if(item.tag==arr[1]){
          obj={tag:item.tag,num:arr[0],title:item.title,time:arr[2]};
          incomeArr.push(obj);
          }
        });
       })
        return incomeArr;
      }
      })();

      //统计,拉起相关代码
      // 默认
     var download = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1367867809902';
     var stopover = 'https://statistics.appstore.ifeng.com/index.php/api/godownload?app_id=4&d_ch=8095';
     var id = 'yhbyhb';
     var type = 'h5';

     if (params.channel_entry == 'sf_share') {
      // 分享
      // code 7744
      download = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1381782752796';

     } else if (params.channel_entry == 'sf_home') {
      // code 7740
      // 手凤首页
      download = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1381772082401';

     } else if (params.channel_entry == 'sf_article') {
      // code 7737
      // 手凤文章
      download = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1381772243002';
     }

     function statistics(param) {
      var time = "2017-12-18+20:53:58";
            var baseUrl = 'https://stadig.ifeng.com/appsta.js?datatype=newsappsns&mos=android&userkey=E76HRt362TfN5G7&ua=&share=unknown&session=';
      if(param.page) {
        var session = time + '#page#type='+ param.page.type +'$id='+ param.page.id +'$url='+ param.page.url
      }
      if (param.action) {
        var session = time + '#action#type='+ param.action.type +'$ref='+ param.action.ref
      }
      var encodeSession = encodeURIComponent(session);
      var url = baseUrl + encodeSession;
      $('body').append('<img style="display:none" src="'+ url +'"/>')
      }


      // 一进来发page统计,需要type,id,和url
      // 手凤 底部
      if (params.sf_from == 'top') {
      download = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1367873683475';
      stopover = 'https://statistics.appstore.ifeng.com/index.php/api/godownload?app_id=4&d_ch=7637';
      } else if (params.sf_from == 'bottom_right') {
      // 手风 右下角 浮层
      download = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1367873492274';
      stopover = 'https://statistics.appstore.ifeng.com/index.php/api/godownload?app_id=4&d_ch=1927';

      } else if (params.sf_from == 'shareswiper') {
      // 分享页面 顶部
      id = 'hbsmy1';
      download = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1350396046318';
      stopover = 'https://statistics.appstore.ifeng.com/index.php/api/godownload?app_id=4&d_ch=7481';
      } else if (params.sf_from == 'sharered') {
      // 分享页面 右下角 浮层
      id = 'hbsmy2';
      download = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1352745692728';
      stopover = 'https://statistics.appstore.ifeng.com/index.php/api/godownload?app_id=4&d_ch=1924';
      } else if (params.sf_from == 'yk') {
      // 优酷
      id = 'stjh_qd';
      download = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ifeng.news2&ckey=CK1368016021749';
      stopover = 'https://statistics.appstore.ifeng.com/index.php/api/godownload?app_id=4&d_ch=8102';
      }

      //下载唤起App
      function upApp () {
      var loadOpen = {
        download_new: download, //应用宝地址
        stopover: stopover, //下载中转页
        uc_stopover: 'https://p2.ifengimg.com/a/2017/0425/uc_down.html?', //uc 下载中转页

        kind: 'inter_yhbyxz',
        type: 'list',
        callPro: function () { // 协议comifengnewsclientgold
        return sharenews_protocol+'://call?type=' + this.type + '&kind=' + this.kind
        },
              callProIos: function () { // ios 协议
        return 'https://api.iclient.ifeng.com/' + sharenews_openPath + '/call?toExpolre=1&fromtype=sfweb&type=' + this.type + '&kind=' + this.kind
        },

        ua: navigator.userAgent,
        weixin: navigator.userAgent.match(/MicroMessenger/ig),
        QQ: navigator.userAgent.match(/QQ\//),
        PC: !/iphone|ipod|ipad|android/ig.test(navigator.userAgent),
        isWeibo: navigator.userAgent.match(/WeiBo/i),
        isAndroid: navigator.userAgent.match(/android/ig),
        isIos: navigator.userAgent.match(/iphone|ipod/ig),
        isIpad: navigator.userAgent.match(/ipad/ig),
        wxosEdition: function () { // 判断IOS版本
        var reg = /([1-9]?[0-9])_([0-9])/ig;
        var iosarr = reg.exec(this.ua);
        if (iosarr != null && iosarr.length >= 3) {
          var wxosEdition = iosarr[1];
        } else {
          var wxosEdition = 0;
        }
        return wxosEdition;
        },
        publicClientAuto: function (host) {
        if (this.ua.indexOf("UCBrowser") > 0) {
          location.href = this.uc_stopover + host; //下载地址
        } else if (this.ua.indexOf("Chrome") > -1 && this.ua.indexOf("MQQBrowser") < 0) { //chrome
          location.href = host;
        } else if (this.isIos || this.isIpad) { //ios
          location.href = host;
        } else if (this.ua.indexOf("MQQBrowser") > 0) { //qq
          location.href = host;
        } else {
          var ifr = document.createElement("iframe");
          ifr.src = host;
          ifr.style.display = "none";
          document.body.appendChild(ifr);
        }
        },
        init: function () {
        var wxosEdition = this.wxosEdition(); //ios系统
        if (this.isIos) { // ios
          if (wxosEdition >= 9) { // ios>=9
          location.href = this.callProIos();
          } else { // ios<9
          if (this.weixin || this.QQ || this.isWeibo) { // ios<9 wx qq weibo
            location.href = this.download_new + '&android_scheme=' + encodeURIComponent(this.download_new);
          } else { // ios<9 browsers
            this.publicClientAuto(this.callPro());
            if (this.ua.indexOf("UCBrowser") < 0) { //除uc以外
            var that = this;
            setTimeout(function () {
              if (document.hasFocus()) {
              location.href = that.stopover; //下载地址
              }
            }, 1000);
            }
          }
          }
        } else { // android
          if (this.weixin || this.QQ || this.isWeibo) { // android wx qq weibo,跳应用宝
          location.href = this.download_new + '&android_scheme=' + encodeURIComponent(this.callPro());
          } else { // browsers other
          this.publicClientAuto(this.callPro());
          if (this.ua.indexOf("UCBrowser") < 0) { //除uc以外
            var that = this;
            setTimeout(function () {
            if (document.hasFocus()) {
              location.href = that.stopover; //下载地址
            }
            }, 1000);
          }
          }
        }
        }
      }
      loadOpen.init()
      }

      // 一进来发page统计,需要type,id,和url
      statistics({
      page: {
        type: type,
        id: id,
        url: 'https://share.iclient.ifeng.com/employee'
      }
      })

      function checkMobile(mobile, callback) {
      //检测手机号存不存在
      $.ajax({
        type: 'GET',
        dataType: "jsonp",
        url: "https://id.ifeng.com/api/checkMobile?u="+ mobile + "&so=7",
        success: callback
      })
      }


      function sendMsg(mobile, auth, cb) {
      //发送信息
      $.ajax({
        type: 'GET',
        dataType: "jsonp",
        url: "https://id.ifeng.com/api/sendmsg?mobile=" + mobile + "&auth=" + auth + "&so=7",
        success: cb
      })
      }

      function closeTip() {
      $('#mask').hide()
      $('#mask .tip').hide()
      }

      function showTip(text, cb) {
      $('#mask').show()
      $('#mask .container').hide()
      $('#mask .tip').show().find('.tipText').text(text)
      $('#know').on('click', function() {
        closeTip();
        cb && cb()
      })
      }

      function showContainer() {
      clickToNext()
      }

      function closeContainer() {
      $('#mask').hide()
      $('#mask .container').hide()
      }

     function showLoading() {
       $('.loadingMask').show()
     }

     function hideLoading() {
       $('.loadingMask').hide()
     }

      function registerNum(mobile, codeNum, password, cb) {
      //注册手机
      $.ajax({
        type: 'GET',
        dataType: "jsonp",
        url: "https://id.ifeng.com/api/mobileregister?&u="+ mobile + "&k="+ password +"&cert="+ codeNum +"&so=7",
        success: cb
      })
      }

      function checkIsGet(cb) {
      var mobile = $('#mobile').val()
      $.ajax({
        type: 'GET',
        dataType: "jsonp",
        url: "https://user.iclient.ifeng.com/Pyramid_Api_Sharesignin/setPhoneByCoupon?phone="+ mobile + "&coupon=" + COUPON,
        success: cb
      })
      }

      function clickToNext() {
      var mobile = $('#mobile').val()
      if($.trim(mobile) == '') {
        showTip('请填写手机号')
        return
      }
      if(!(/^1[34578]\d{9}$/.test(mobile))) {
       showTip('手机号格式有误, 请重新输入')
       $('#mobile').val('').focus();
       return
       }
       showLoading()
       checkMobile(mobile, function(data) {
       if(data.code) {
         checkIsGet(function(data) {
         hideLoading()
         if(data.code == '200') {
           showTip('您已经注册过'+ appName +'账号，赶快前往客户端领取奖励！', upApp)
         } else {
           showTip('您已领取过新手奖励啦~现在'+ appName +'还有好多红包奖励，快去抢！', upApp)
         }
         return
         })
       } else {
         hideLoading()
         changeImg()
         $('#mask').show()
         $('#mask .tip').hide()
         $('#mask .container').show()
       }
       })
      }


      //设置定时器
      let TIME;
      function startInterval() {
      clearInterval(TIME)
      $('#reSendCode').hide()
      $('#waitResend').show().find('#time').text(60)
      TIME = setInterval(function() {
        $('#time').text(parseInt($('#time').text()) - 1)
        if (parseInt($('#time').text()) == 0) {
        clearInterval(TIME)
        $('#reSendCode').show()
        $('#waitResend').hide().find('#time').text(60)
        }
      }, 1000)
      }

      function clickToRegister() {
      statistics({
        action: {
        type: 'signin',
        ref: 'https://share.iclient.ifeng.com/employee2'
        }
      });
      var mobile = $('#mobile').val()
      var codeNum = $('#codeNum').val()
      var password = $('#password').val()
      showLoading()
      registerNum(mobile, codeNum, password, function(data) {
        if(data.code) {
        checkIsGet(function() {
          hideLoading()
          showRegisterSuccess()
        })
        } else {
        hideLoading()
        showTip(data.message)
        }
      })
      }

      //showRegisterSuccess()
      function showRegisterSuccess() {
      $('.i-luck').show()
      $('.i-mask').on('click', function() {
        $('.i-luck').hide()
        location.reload()
      })
      $('.i-reward').on('click', function(e) {
        e.stopPropagation()
        e.preventDefault()
      })
      $('.i-reward-close').on('click', function(e) {
        $('.i-luck').hide()
        location.reload()
      })
      $('.i-reward-btn').on('click', function() {
           // 并发action统计，需要type和ref
      statistics({
        action: {
        type: 'yhbyxz',
        ref: 'https://share.iclient.ifeng.com/employee2'
        }
      });
        // 拉起客户端下载
        upApp();
        // 并发action统计，需要type和ref
      })
      }

      function clickToSendMsg() {
      var mobile = $('#mobile').val()
      var auth = $('#auth').val()
      showLoading()
      sendMsg(mobile, auth, function(data) {
        hideLoading()
        if (data.code) {
        closeContainer()
        //toNext()
        startInterval()
        } else {
        //图形验证码错误啥的
        alert(data.message)
        changeImg()
        //showContainer()
        }
      })
      }

      function toNext() {
      $('#display').show()
      $('#next').hide()
      $('#register').show()
      $('.register .input.num').hide()
      }

      function changeImg() {
      $('#authImg').html('<img src="https://id.ifeng.com/index.php/public/authcode?so=7"/>')
      $('#auth').val('').focus()
      }

      $('#mask').on('click', closeContainer)
      $('#mask .container').on('click', function(e) {
      e.stopPropagation()
      e.preventDefault()
      })

      //点击图片更换图片
      $('#authImg').on('click', function() {
      $(this).find('img').attr('src', 'https://id.ifeng.com/index.php/public/authcode?so=7')
      })

      //点击发送验证手机是否存在
      //$('#next').on('click', clickToNext)

      $('#sure').on('click', clickToSendMsg)

      $('#register').on('click', clickToRegister)

      //再次发送
      $('#reSendCode').on('click', showContainer)



     //income list
     function intervalFn(incomes){
      var timer;
      var incomeTail=[];
      incomes.forEach(function(ele,index){
        if(!ele.fee){
        return;
        }
        var nickname = ele.user_nickname.split('_')[0]
        var userImg = ele.user_img == "null" ? 'https://p1.ifengimg.com/redbag/images/user-default.png' : ele.user_img
        var content =
                '<li>' +
                    '<div class="user-wrap" >' +
                        '<div class="imgContainer">' +
                            '<img src="'+ userImg +'"/>' +
                        '</div>' +
                        '<div class="txt-wrap">'+
                            '<h3 class="name">'+ nickname +'</h3>' +
                            '<span class="time">'+ getDateDiff(ele.ctime) +'</span>' +
                        '</div>' +
                    '</div>'+
                    '<div class="money">'+'提现'+'<strong>'+ parseFloat(ele.fee/100)+'</strong>元</div>' +
                '</li>';
        if(index<5){
        $('#account').prepend(content);
        //$content.fadeIn()
        }else{
        incomeTail.push(content);
        }
      });
      if(incomeTail.length){
        incomeTail=incomeTail.reverse();
        timer=setInterval(function(){
        if(incomeTail.length==0){clearInterval(timer);}
        var item=incomeTail.pop();
        $('#account').prepend(item);
        //$(item).fadeIn();
        },2000);
      }
       }
    })
