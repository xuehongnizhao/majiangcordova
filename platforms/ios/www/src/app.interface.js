/*
 * @Author: 轻飘时刻
 * @Date:   2017-06-06 18:27:22
 * @Last Modified by:   轻飘时刻
 * @Last Modified time: 2017-06-06 18:45:42
 */
function app_login(){
    // game.server.send(1004, str);
    // return;
    cordova.exec(function (installed) {
                 if(installed ){
                 var scope = "snsapi_userinfo",
                 state = "_" + (+new Date());
                 alert("你好")
                 cordova.exec(function (response) {
                              if(response.code){
                                  game.server.send(1004, str)
                              alert("成功")
                              }else{
                              alert("登录失败");
                              }
                              }, function (reason) {
                              alert("登录失败: " + reason);
                              }, "Wechat", "sendAuthRequest", [scope, state]);
                 }else{
                 alert("请先安装微信");
                 }
                 }, function (reason) {
                 alert("登录失败: " + reason);
                 }, "Wechat", "isWXAppInstalled", []);
//    game.server.send(1004, str)
}

var __loadImage = __loadImage || {}
__loadImage.urlArr = []
__loadImage.arr = []
__loadImage.loading = false
__loadImage.load = function(url, id, view){
    if(!url){return}
    
    if(__loadImage.urlArr[url]){
        view.skin = __loadImage.urlArr[url]
    }else{
        var vo  = new loadImageVO();
        vo.url  = url;
        vo.id   = id;
        vo.view = view;
        __loadImage.arr.push(vo)
        __loadImage.next()
    }
}
__loadImage.next = function(){
    if(__loadImage.loading)return;
    __loadImage.loading = true
    
    var vo = __loadImage.arr.shift();
    
    if(__loadImage.urlArr[vo.url]){
        vo.view.skin = __loadImage.urlArr[vo.url];
        __loadImage.loading = false
        __loadImage.arr.length && __loadImage.next();
        return;
    }
    var fileTransfer = new FileTransfer();
    var savefilepaht = "/sdcard/cordova/sykj/"+vo.id+".png";
    fileTransfer.download(
                          vo.url,
                          savefilepaht,
                          function(entry) {
                          __loadImage.loading = false;
                          vo.url__ = entry.toURL()
                          vo.view.skin = vo.url__;
                          __loadImage.urlArr[vo.url] = vo.url__;
                          __loadImage.arr.length && __loadImage.next();
                          },
                          function(error) {
                          vo.view.skin = "mainScene/mrtx.png";
                          __loadImage.loading = false
                          __loadImage.arr.length && __loadImage.next();
                          },
                          false,
                          {
                          headers: {
                          "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                          }
                          }
                          );
}
function loadImageVO(){
    this.url
    this.id
    this.view
    this.url__
}
function wx_share_pengyou(roomid, quan){
    navigator.screenshot.save(function(error,res){
                              if(error){
                              alert(error);
                              }else{ alert(res.filePath);
                              var message={
                              message: {
                              title: "天和上海麻将 房号【"+roomid+"】",
                              description: "我在【天和上海麻将】开了"+quan+"，快来一战吧！",
                              mediaTagName: "",
                              thumb: res.filePath,
                              media: {
                              type: 4,   // webpage
                              image: res.filePath
                              }
                              },
                              scene: 0
                              }
                              cordova.exec(function (response) {
                                           cordova.exec(function (response) {
                                                        }, function (reason) {
                                                        }, "Wechat", "delete", [res.filePath]);
                                           }, function (reason) {
                                           }, "Wechat", "share", [message]);
                              }
                              });
    return;
    var message={
    message: {
    title: "天和上海麻将 房号【"+roomid+"】",
    description: "我在【天和上海麻将】开了"+quan+"，快来一战吧！",
    mediaTagName: "",
    thumb: "",
    media: {
    type: 7,   // webpage
    webpageUrl: "https://fir.im/mf4y"
    }
    },
    scene: 0
    }
    cordova.exec(function (response) {
                 }, function (reason) {
                 }, "Wechat", "share", [message]);
}
function wx_share_game(){
    var message={
    message: {
    title: "天和上海麻将——纯上海敲麻、百搭",
    description: "快捷方便的手机麻将馆，简单好玩，随时随地组局，赶紧试试吧！",
    mediaTagName: "",
    thumb: "",
    media: {
    type: 7,   // webpage
    webpageUrl: "https://fir.im/mf4y"
    }
    },
    scene: 0
    }
    cordova.exec(function (response) {
                 }, function (reason) {
                 }, "Wechat", "share", [message]);
}

var __talkUtils
var mediaRec;
var  mediaSrc = "sykj_ly.amr";
function startRecord(){
    __talkUtils = __talkUtils || new __TalkUtils();
    game.scene.iconLayer.addChild(__talkUtils);
    trace("开始录音")
    mediaRec = new Media(mediaSrc,
                         // success callback
                         function() {
                         },
                         // error callback
                         function(err) {
                         alert("录音失败: "+ err.code);
                         },function(status) {
                         });
    // Record audio
    mediaRec.startRecord();
}

/**
 * 停止录音
 */
function stopRecord(){
    game.utils.remove(__talkUtils)
    trace("停止录音")
    if(mediaRec){
        mediaRec.stopRecord();
        var duration=mediaRec.getDuration();
        Laya.SoundManager.setSoundVolume(10);
        Laya.SoundManager.playSound("/sdcard/" + mediaSrc+"?v="+(+new Date()), 1);
        duration=parseInt(duration);
        if(duration<1)
            duration=1;
        sendOthersVoice(duration);
        
    }
}

var rongkey="uwd1c0sxue9f1";
function initrong(){
    cordova.exec(function (response) {
                 cordova.exec(function (response) {
                              var path=response.result;
                              Laya.SoundManager.setSoundVolume(10);
                              Laya.SoundManager.playSound(path+"?v="+(+new Date()), 1);
                              }, function (reason) {
                              }, "RongCloudLibPlugin", "setVoiceListener", [1]);
                 }, function (reason) {
                 }, "RongCloudLibPlugin", "init", [1]);
    //    RongCloudLibPlugin.init({
    //        appKey: rongkey},
    //        function(ret, err){
    //        if (ret.status == 'error')
    //            alert(err.code);
    //    });
    //    noDisturb();
    //    RongCloudLibPlugin.setOnReceiveMessageListener(function (ret, err) {
    //        var path=ret.result.message.content.voicePath;
    //        Laya.SoundManager.setSoundVolume(10);
    //        Laya.SoundManager.playSound(path+"?v="+(+new Date()), 1);
    //    })
    netListener();
    batterListener();
}

function rongconnect(token){
    cordova.exec(function (response) {
                 }, function (reason) {
                 }, "RongCloudLibPlugin", "connect", [token]);
    //    RongCloudLibPlugin.connect({
    //        token: token},
    //        function(ret, err){
    //            if (ret.status == 'success')
    //               trace("rongyun"+ret.result.userId);
    //    });
}
function sendOthersVoice(duration){
    var idArr = __data.desk.idToPlayervo;
    for(var a in idArr){
        if(a == __data.ivo.id){
        }else{
            cordova.exec(function (response) {
                         }, function (reason) {
                         alert("语音发送失败");
                         }, "RongCloudLibPlugin", "sendMessage", [''+a,'/sdcard/' + mediaSrc,duration]);
        }
    }
}
function noDisturb(){
    setInterval(function(){
                var time = ''
                var d = new Date()
                time += d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
                RongCloudLibPlugin.setNotificationQuietHours({
                                                             startTime: time,
                                                             spanMinutes: 60
                                                             
                                                             }, function (ret, err) {
                                                             //alert(ret.status);
                                                             })
                }, 1000*3600)
}

function  netListener(){
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
}
function onOnline() {
    // Handle the online event
    var networkState = navigator.connection.type;
    trace('Connection type: ' + networkState);
}
function onOffline() {
    // Handle the online event
    var networkState = navigator.connection.type;
    trace('Connection type: ' + networkState);
}
function batterListener(){
    window.addEventListener("batterystatus", onBatteryStatus, false);
}
function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
}
function takeKeyboardHandler(value){
    NativeKeyboard.showMessenger({
                                 onSubmit: function(text) {
                                 
                                 NativeKeyboard.hideMessenger({
                                                              animated: true // default false
                                                              });
                                 },text:value
                                 });
}
