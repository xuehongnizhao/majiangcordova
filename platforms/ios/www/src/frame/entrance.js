/**
 * ...
 * @author 轻飘时刻
 */
function getHttpParams(value){
	var r = new RegExp("(\\?|#|&)"+value+"=([^&#]*)(&|#|$)");
	var m = location.href.match(r);
	return decodeURIComponent(!m?"":m[2]);
}

function loadScript(urls, complete, progress) {
	var loadedCount = 0,loadLength = urls.length
	function loadNextJS(url_){
		var script = document.createElement("script");
		script.type = "text/javascript";
		if (script.readyState) {//IE
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;loadAScriptComplete(url_);
				}
			}
		} else {script.onload = function() {loadAScriptComplete(url_);}}//非IE
		script.src = url_;
		document.body.appendChild(script);
	}
	function loadAScriptComplete(value){
		// trace("js文件加载完成", value);
		// alert(value);
		loadedCount++
		progress&&progress(loadedCount/loadLength)
		if(!urls.length)complete&&complete()
		else loadNextJS(urls.shift())
	}
	loadNextJS(urls.shift())
}
window.onload = function(){
	loadScript(["src/frame/config.js?v=" + Date.now().toString()], function(){config.init()})
}