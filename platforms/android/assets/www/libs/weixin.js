var apiready_bool=false;
var apipayready_bool=false;
var rong_bool=false;
var rong_voice;
var isFrontStage = true
var phoneBattery = { battery:100, isPlug:false };
apiready = function(){
	apiready_bool=true;
	api.addEventListener({
		   name:'pause'
	}, function(ret, err){
	    console.log("应用进入后台")
	    try{
	    	isFrontStage = false
			__sound　&& __sound.backStage()
	    	backStage_cancel_play_voice()
	    }catch(e){
	    	
	    }
	});
	api.addEventListener({
	    name:'resume'
	}, function(ret, err){        
	    console.log("应用回到前台")
	    try{
	    	isFrontStage = true
	    	voice_queue.length && play_next_voice(voice_queue.shift())
			__sound　&& __sound.frontStage()
	    }catch(e){
	    	
	    }
	});

	api.addEventListener({
		name: 'batterystatus'
	}, function(ret, err) {
		if (ret) {
			phoneBattery = { battery:ret.level, isPlug:ret.isPlugged }
			try{
				game.cb.dispatchEvent("update_DeskBattery", [ { battery:ret.level, isPlug:ret.isPlugged } ]);
			}catch(e){  }
		} else { }
	});
	// var wxPay = api.require('wxPay');
	// wxPay.config({
	// 	mchId: '1435862802',
	// 	partnerKey: 'sykjsykjsykjsykjsykjsykjsykj0451',
	// 	notifyUrl: 'http://123.206.80.46:8080/sdy/pay/payinfo'
	// }, function(ret, err) {
	//     if (ret.status) {
	//         apipayready_bool=true;
	//     } else {
	//         alert("支付配置失败："+err.code);
	//     }
	// });

	// api.addEventListener({
	//     name:'appintent'
	// },function(ret,err){
	//     var appParam = ret.appParam;
	//     if(api.systemType == 'ios'){
	//         var iosUrl = ret.iosUrl;
	//         //alert(iosUrl);
	//     } else {
	//         var sourceAppId = ret.sourceAppId;
	//         //alert(JSON.stringify(ret.appParam));
	//     }
	// });

	rong_voice = rong_voice || api.require('rongCloud2');
	rong_voice.init(function(ret, err) {
		if(ret.status=="success"){
			rong_bool=true;
		}else if (ret.status == 'error'){
			console.log(err.code);
		}
	});
//	rong.setConnectionStatusListener(function(ret, err) {
//	    api.toast({ msg: ret.result.connectionStatus });
//	});

	rong_voice.setOnReceiveMessageListener(function(ret, err) {
	   	play_voice(ret.result.message.targetId, ret.result.message.content.voicePath, ret.result.message.content.duration)
	});

	rong_voice.disableLocalNotification(function(ret, err) {
	    // api.toast({ msg: ret.status });
	})

	// rong_voice.setNotificationQuietHours({
	//     startTime: '22:00:00',
	//     spanMinutes: 6
	// }, function(ret, err) {
	//     api.toast({ msg: ret.status });
	// })

	var voiceMag = api.require('voiceMag');
	voiceMag.onNormal();
}
var lianggebushiren = 0
function wx_login(){
//	alert(apiready_bool)
	if(apiready_bool==false){
		return;
	}
	var wx = api.require('wx');
	wx.auth({
	}, function(ret, err) {
		if(lianggebushiren)return
		lianggebushiren = 1
//				alert(JSON.stringify(ret))

		if (ret.status) {
			var code=ret.code;
			wx.getToken({
		    code: code
			}, function(ret, err) {
//						alert(JSON.stringify(ret))

			    if (ret.status) {
			    	var accessToken=ret.accessToken;
			    	var openId=ret.openId;
			        wx.getUserInfo({
					    accessToken: accessToken,
					    openId: openId
					}, function(ret, err) {
//								alert(JSON.stringify(ret))

					    if (ret.status) {
					        var openid=ret.unionid;
					        var nickname=ret.nickname;
					        var sex=ret.sex;
					        var headimgurl=ret.headimgurl;
					        game.server.send(1001,openid,nickname,headimgurl,sex);
					    } else {
					        alert("登录失败!!!");
					        try{
					        	var l = game.scene.get(Login)
					        	l.addEvent()
					        }catch(e){

					        }
					    }
					});
			    } else {
			    	alert("登录失败!!");
			    	try{
			        	var l = game.scene.get(Login)
			        	l.addEvent()
			        }catch(e){

			        }
			    }
			});
	    } else {
	        alert("登录失败!");
	        try{
	        	var l = game.scene.get(Login)
	        	l.addEvent()
	        }catch(e){

	        }
	    }
	});
}
function wx_share_pengyou(roomid, quan){
	var wx = api.require('wx');
	wx.shareWebpage({
	    scene: 'session',
	    title: "天和上海麻将 房号【"+roomid+"】",
	    description: "我在【天和上海麻将】开了"+quan+"，快来一战吧！",
	    thumb: 'widget://widget/wxshare.png',
	    contentUrl: "https://fir.im/mf4y"
	}, function(ret, err){
		if(ret.status){
	    }else{
	    }
	});
}
function wx_share_game(){
	var wx = api.require('wx');
	wx.shareWebpage({
	    scene: 'session',
	    title: '天和上海麻将——纯上海敲麻、百搭',
	    description: '快捷方便的手机麻将馆，简单好玩，随时随地组局，赶紧试试吧！',
	    thumb: 'widget://widget/wxshare.png',
	    contentUrl: 'https://fir.im/mf4y'
	}, function(ret, err){
		if(ret.status){
	    }else{
	    }
	});
}
var wx_realy_value;
function wx_pay(wx_money,wx_value){
	trace("apipayready_bool", apipayready_bool)
	if(apipayready_bool){
		var uuid=getUuid();
		var wxPay = api.require('wxPay');
		wx_realy_value=wx_value;
		wxPay.pay({
		    description: '金币',
		    totalFee: wx_money+"",
		    tradeNo: uuid,
		    feeType: 'CNY'
		}, payCallBack);
	}
}
function payCallBack(ret, err){
//	trace("充值失败0：");
//  if (ret.status) {
//  	trace("充值失败1：");
//      game.server.send(4001,wx_realy_value);
//  } else {
//      trace("充值失败："+err.code);
//      MallItem.buying=false;
//  }
}
function getUuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    var uuid = s.join("");
    return uuid;
}











var ___amr_url = 'fs://amrly.amr'
var ___pcm_url = 'fs://pcmly.pcm'
var ___mp3_url = 'fs://mp3ly.mp3'
//down
function clickDownRecord(){
	try{
		api
	}catch(e){
		return
	}

	api.startRecord({
	    path: ___amr_url
	});

	var audioRecorder = api.require('audioRecorder');
	audioRecorder.startRecord({
		savePath:___pcm_url,
		format:'pcm'
	}, function(ret, err){});
}
//up   终止录音
function clickupRecord(){
	try{
		var voiceMag = api.require('voiceMag');
		voiceMag.onNormal();
		var path, duration
		setTimeout(function(){
			//amr 录音结束   发送给rongcloud
			api.stopRecord(function(ret, err) {

				setTimeout(function(){
					if (ret) {
				        path = ret.path;
				        duration = ret.duration;
				        
				        trace1(duration + "语音时长")
				        if(duration<=0.5){ __proxy.tips("录音过短") } 
				        else if(duration>=9){ __proxy.tips("录音超过10秒") }
				        if(duration<=0.5 || duration>=9)return;
				        // 给别的玩家发送语音
						var idArr = __data.desk.posToPlayervo

						var i = 1
						for(var a in idArr){ 
							setTimeout(function(uid){
								sendAmr(path,duration,uid); 
							}, 50*i, idArr[a].id)
							i++;
						}
						
				        // for(var a = 0; a < idArr.length; a++){ sendAmr(path,duration,idArr[a]); }
				        
				        setTimeout(function(){
				        	trace1("没有超过10秒 发送语音")
							//pcm录音结束   转换MP3
							var audioRecorder = api.require('audioRecorder');
							audioRecorder.stopRecord(function(ret){
								setTimeout(function(){
									if (ret) {
								        var audioRecorder = api.require('audioRecorder');
								        audioRecorder.covertToMp3({
									          originalFilePath: ___pcm_url,
									          mp3FilePath: ___mp3_url
										}, function(ret) {
											if(ret.status == true){ 
												play_voice(__data.ivo.id, ___mp3_url, duration)
											}
										});
									}
								}, 50)
							    
							});
				        }, 50)
				    }
				}, 50)
			    
			});
		}, 50)
		

		
	}catch(e){
		alert("尝试结束录音错误")
	}
}
function sendAmr(path,duration,playerid){
	// console.log("时长："+duration);
	rong_voice = rong_voice || api.require('rongCloud2');
	// console.log( "登录人ID："+__data.ivo.id);
	// 之前调用 init 和 connect 的代码省略
	rong_voice.sendVoiceMessage({
	    conversationType: 'PRIVATE',
	    targetId: playerid+"",
	    voicePath: path,
	    duration: duration,
	    extra: ''
	}, function(ret, err) {
	   	if (ret.status == 'success'){
	    	// alert("发送成功");
	   	}
	    else if (ret.status == 'error'){
	        // alert( err.code + playerid);
	    }
	});
}


/**
 * 播放我的录音文件
 */
function play_my_voice(){
	var audioPlayer = api.require('audioPlayer');
	audioPlayer.initPlayer({
		path: ___mp3_url,
		cache: false
	}, function(ret) {
		if (ret.status) {
			trace("播放完成删除本地录音文件")


			deleteLyFile();
		}
	});
}

/**
 * 删除本地录音	amr  pcm   mp3 等文件
 */
function deleteLyFile(){
	var fs = api.require('fs');
	fs.remove({
		path: ___amr_url
	}, function(ret, err) {
		if (ret.status) {
			
		} else {
			
		}
	});

	fs.remove({
		path: ___pcm_url
	}, function(ret, err) {
		if (ret.status) {
			
		} else {
			
		}
	});

	fs.remove({
		path: ___mp3_url
	}, function(ret, err) {
		if (ret.status) {
			
		} else {
			
		}
	});
}



var voice_queue = [];
var play_voice_ing = false
function play_voice(id, path, time){
	try{
		
		var desk = game.scene.get(Desk)
		
		if(desk.parent && isFrontStage){
		
			voice_queue.push({id:id, path:path, time:time})
			if(!play_voice_ing){
			
				play_next_voice(voice_queue.shift())
			}else{
				trace("储存声音")
			}
		}
	}catch(e){

	}
}
var __cur_play_voice_ob;
var __play_voice_complete_id;
var __play_next_voice_id
function play_next_voice(ob){
	__cur_play_voice_ob = ob
	trace("播放语音", ob.time*1000)
	play_voice_ing = true;
	game.cb.dispatchEvent("play_voice_start", [ob.id])

	var voiceMag = api.require('voiceMag');
	voiceMag.onNormal();

	if(ob.id == __data.ivo.id && Laya.Browser.onIOS){
		play_my_voice()
	}else if(ob.id == __data.ivo.id && Laya.Browser.onAndriod){
		api.startPlay({
			path: ___amr_url
		}, function(ret, err) {
			if (ret) { deleteLyFile() } else { }
		});
	}else{
		voiceMag.startPlay({
			path : ob.path
		})
	}

	__play_voice_complete_id = setTimeout(function(){
		trace("播放结束")
		voiceMag.stopPlay()
		play_voice_ing = false
		game.cb.dispatchEvent("play_voice_complete", [ob.id]);
		__play_next_voice_id = setTimeout(function(){
			voice_queue.length && play_next_voice(voice_queue.shift())
		},500)
	}, ob.time*1000)
}
function backStage_cancel_play_voice(){
	var voiceMag = api.require('voiceMag');
	voiceMag.stopPlay()
	play_voice_ing = false
	game.cb.dispatchEvent("play_voice_complete", [__cur_play_voice_ob.id]);
	clearTimeout(__play_voice_complete_id)
	clearTimeout(__play_next_voice_id)
}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

var _saveImgurl = 'fs://printscreen/'
var _saveImgName = 'wxShare.png'
function shareImageToPy(){
	if(Laya.Browser.onIPhone){
		var screenClip = api.require('screenClip');
		screenClip.screenShot({
			imgPath:_saveImgurl,
		    imgName:_saveImgName
		}, function(ret, err) {
		    if (ret.status) {
		        var wx = api.require('wx');
				wx.shareImage({
				    scene: 'session',
				    thumb: _saveImgurl + _saveImgName,
				    contentUrl: _saveImgurl + _saveImgName
				}, function(ret, err) {
				    if (ret.status) {
				    } else {}
				});
		    } else {}
		});
	}else{
		var layaCanvas=document.getElementById("layaCanvas");
		var __image = layaCanvas.toDataURL("image/png",1);
		__image=__image.substring(22,__image.length);
		var trans = api.require('trans');
		trans.saveImage({
		    base64Str: __image,
		    album:true,
		    imgPath:_saveImgurl,
		    imgName:_saveImgName
		}, function(ret, err) {
		    if (ret.status) {
		        var wx = api.require('wx');
				wx.shareImage({
				    scene: 'session',
				    thumb: _saveImgurl + _saveImgName,
				    contentUrl: _saveImgurl + _saveImgName
				}, function(ret, err) {
				    if (ret.status) {
				    } else {}
				});
		    } else {}
		});
	}
}

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------

var __loadImage = __loadImage || {}
__loadImage.urlArr = []
__loadImage.arr = []
__loadImage.loading = false
__loadImage.load = function(url, id, view){
	if(!url){return}
	try{api}catch(e){return;}

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

    api.imageCache({
        url: vo.url,
//      savePath: "fs://html/" + vo.id + ".png",
//      report: true,
//      cache: false,
//      allowResume: true
    },function( ret, err ){
//  	alert(JSON.stringify(ret))
//  	alert(JSON.stringify(err))
//      if (ret && ret.state == 1) {
        if (ret && ret.status == true) {
//      	alert("ok")
        	__loadImage.loading = false;
		    vo.url__ = ret.url//api.fsDir + "/html/" + vo.id + ".png";
		    vo.view.skin = vo.url__;
		    __loadImage.urlArr[vo.url] = vo.url__;
		    __loadImage.arr.length && __loadImage.next();
        }else if(ret && ret.state == 0){
        	
//      }else if(err && err.msg){
        }else if(ret && ret.status == false){
        	vo.view.skin = "mainScene/mrtx.png";
        	__loadImage.loading = false
        	__loadImage.arr.length && __loadImage.next();
        }
    })
}
function loadImageVO(){
    this.url
    this.id
    this.view
    this.url__
}

//))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
//))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
//))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))

var __talkUtils
function startRecord(){
    __talkUtils = __talkUtils || new __TalkUtils();
    game.scene.iconLayer.addChild(__talkUtils);
    trace("开始录音")
    // startRongRecord();
    clickDownRecord();
}

/**
 * 停止录音
 */
function stopRecord(){
    game.utils.remove(__talkUtils)
    trace("停止录音")
    // stopRongRecord( DeskDc.rVo.getRoomPlayerIDArr() );
    clickupRecord()
}

//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

var _keyboardID = 0
var _inputFrameID = -1
function takeKeyboardHandler(value){

    if(Laya.Browser.onIPhone){
        var width = game.width - 100
        var UIInput = api.require('UIInput');

        UIInput.open({
            rect: {
                x: 10,
                y: 25,
                w: 650,
                h: 46
            },
            styles: {
                bgColor: '#fff',
                size: 24,
                color: '#000',
                placeholder: {
                    color: '#ccc'
                }
            },
            autoFocus: true,
            maxRows: 4,
            placeholder: '请输入聊天文字',
            keyboardType: 'next',
            fixedOn: api.frameName
        }, function(ret, err) {
            if (ret) {
                _inputFrameID = ret.id
            } else {
            }
        });
        
        var value = (value == "" || value == "请输入文字") ? "" : value
        if(value){ 
            UIInput.value({
                msg: value
            });
        }
        
        UIInput.addEventListener({
            name: 'resignFirstResponder'
        }, function() {
            closeKeyboardHandler()
//          UIInput.value(function(ret, err) {
//              if (ret) {
//                  alert(ret.msg + "")
//                  game.cb.dispatchEvent("update_input_handler", [ret.msg])
//                  UIInput.close({
//                      id:_inputFrameID
//                  });             UIInput.closeKeyboard({
//                      id:_inputFrameID + 1
//                  });
//                  _keyboardID ++
//              } else {
//              }
//          });
        });
    }else{
        var UIInput = api.require('UIInput');
        UIInput.open({
            rect: {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            },
            styles: {
                bgColor: '#fff',
                size: 14,
                color: '#000',
                placeholder: {
                    color: '#ccc'
                }
            },
            autoFocus: false,
            maxRows: 4,
            placeholder: '请输入聊天文字',
            keyboardType: 'next',
            fixedOn: api.frameName
        }, function(ret, err) {
            if (ret) {
                UIInput.popupKeyboard({
                    id:_inputFrameID + 1
                });
            } else {
            }
        });
        
        UIInput.value({
            msg: value
        });

        UIInput.addEventListener({
            name: 'resignFirstResponder'
        }, function() {
            UIInput.value(function(ret, err) {
                if (ret) {
                    game.cb.dispatchEvent("update_input_handler", [ret.msg])
                    UIInput.close({
                        id:_inputFrameID
                    });             
                    UIInput.closeKeyboard({
                        id:_inputFrameID + 1
                    });
                    _keyboardID ++
                } else {
                }
            });
        });
    }
    
}


function closeKeyboardHandler(e){

    var UIInput = api.require('UIInput');
    
    UIInput.value(function(ret, err) {
        if (ret) {
            if(ret.msg || ret.msg == ""){ 
                game.cb.dispatchEvent("update_input_handler", [ret.msg])
            }
            
        } else {
        }
    });
    
    UIInput.close({
        id:_inputFrameID
    });             
    UIInput.closeKeyboard({
        id:_inputFrameID + 1
    });
    _keyboardID ++
            
    
}
