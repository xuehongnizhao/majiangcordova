/* 
* @Author: 轻飘时刻
* @Date:   2017-01-05 09:49:03
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-06 15:48:21
*/
var config = config || {};
config.verson_src = "?v=" + Date.now().toString()
config.verson_res = "?v=" + Date.now().toString()
// config.verson_src = "?v=20161221-1804"
config.verson_res = "?v=2017-05-22 10:38:77"
config.gameW = 1280
config.gameH = 720
config.isLog = true
config.ip = "123.206.80.46";
//config.ip = "192.168.3.141";
// config.ip = "192.168.3.68";
config.host = 13003
config.urlHead = ""
config.isReverse = false
config.cacheModel = "none"//bitmap none
//"none" ：不更改屏幕
//"horizontal" ：自动横屏
//"vertical" ：自动竖屏
//pc端没有处理
config.screenMode = "none"
config.init = function(){
	config.loadJS()
}
config.loadJS = function(){
	loadScript([
		 
		 config.urlHead+"src/frame/jquery.min.js" + config.verson_src
		,config.urlHead+"src/frame/tween.max.min.js" + config.verson_src
		,config.urlHead+"src/frame/sky.frame.js" + config.verson_src
    	,config.urlHead+"src/frame/net.js" + config.verson_src
    	,config.urlHead+"src/main.js" + config.verson_src
		,config.urlHead+"src/ui/laya.ui.max.all.js" + config.verson_src
    
		], function(){
		game.init();
		_game_init_();
	})
}

function trace(){
       // return
	if(!config || !config.isLog)return
            
	try{
		console.log.apply(null, arguments)
	}catch(e){
		var str="";
		for (var i=0,i_l=arguments.length;i < i_l;i++){
			var s = String(arguments[i])
			str+=s;
			str+=" ";
		}
		console.log(str)
	};
};

function trace1(){
       // return
	try{
		var str="";
		for (var i=0,i_l=arguments.length;i < i_l;i++){
			str+=String(arguments[i]);
			str+=" ";
		}
		tips___(str)
	}catch(e){

	}
};