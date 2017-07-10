/**
 * ...
 * @author 轻飘时刻
 */
var ___frame = ___frame || {};
(function() {
	___frame.init = function(){
		trace("初始化游戏引擎")

		// var u = navigator.userAgent;
		// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		// var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		// alert(isAndroid+" "+isIOS)
		// if(isIOS)Laya.init(config.gameW, config.gameH);//WebGL
		// else Laya.init(config.gameW, config.gameH, Laya.WebGL);//WebGL
		Laya.init(config.gameW, config.gameH)
		
		Laya.stage.bgColor = "#0"
		Laya.stage.frameRate = "slow"
		 // Laya.Log.enable()
		 // Laya.Stat.show(0, 0)
		trace("设置游戏适配")
		___frame.stage=Laya.stage;
		___frame.browserW=config.screenMode=="horizontal" ? Laya.Browser.clientHeight : Laya.Browser.clientWidth;
		___frame.browserH=config.screenMode=="horizontal" ? Laya.Browser.clientWidth : Laya.Browser.clientHeight;
		___frame.ratio_w = ___frame.browserW / Laya.stage.designWidth;
		___frame.ratio_h = ___frame.browserH / Laya.stage.designHeight;
		___frame.ratio_max = Math.max(___frame.ratio_w, ___frame.ratio_h);
		___frame.ratio_min = Math.min(___frame.ratio_w, ___frame.ratio_h);
		___frame.designWidth = Laya.stage.designWidth
		___frame.designHeight = Laya.stage.designHeight
		
		if(Laya.Browser.onAndriod||Laya.Browser.onIOS){
			Laya.stage.scaleMode = "noborder";
			Laya.stage.screenMode = config.screenMode
			___frame.width = ___frame.canvasWidth = ___frame.browserW / ___frame.ratio_max;
			___frame.height = ___frame.canvasHeight = ___frame.browserH / ___frame.ratio_max;
		}else {
			Laya.stage.scaleMode = "showall";//fixedwidth
			Laya.stage.alignH = "center";
			Laya.stage.alignV = "middle";
			___frame.width = ___frame.canvasWidth = Laya.stage.designWidth;
			___frame.height = ___frame.canvasHeight = Laya.stage.designHeight;
		}
		___frame.width = Math.ceil(___frame.width);
		___frame.height = Math.ceil(___frame.height);
		___frame.scale = Math.min(___frame.width / Laya.stage.width, ___frame.height / Laya.stage.height)
		
		trace(___frame.width, Laya.stage.width, Laya.Browser.clientWidth);
		trace(___frame.height, Laya.stage.height, Laya.Browser.clientHeight);
		trace(___frame.scale);
		//初始化显示层
		___frame.scene.init(___frame.stage);

		game.onLine = navigator.onLine
		window.addEventListener("online", function(){
			game.onLine = true
			try{
				game.scene.remove(OffLineTips)
			}catch(e){
				trace(e)
			}
		}, false)
		window.addEventListener("offline", function(){
			game.onLine = false
			try{
				game.scene.add(OffLineTips)
			}catch(e){
				trace(e)
			}
		}, false)
	}
	
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	
	___frame.scene = (function(){
		function Scene(){}
		Scene.elements = [];
		Scene.container = null;
		Scene.bottomLayer// = new Laya.Sprite()
		Scene.middleLayer// = new Laya.Sprite()
		Scene.iconLayer  // = new Laya.Sprite()
		Scene.panel0Layer// = new Laya.Sprite()//有遮挡
		Scene.panel0Layer_mask
		Scene.panel1Layer// = new Laya.Sprite()//没有遮挡
		Scene.tipsLayer// = new Laya.Sprite()//没有遮挡
		Scene.tips0Layer// = new Laya.Sprite()//有遮挡
		Scene.tips0Layer_mask
		Scene.init = function(container_){
			//层级在这里new因为掉用这个方法之前才laya才刚刚init
			Scene.bottomLayer = new Laya.Sprite()
			Scene.middleLayer = new Laya.Sprite()
			Scene.iconLayer   = new Laya.Sprite()
			Scene.panel0Layer = new Laya.Sprite()//有遮挡
			Scene.panel1Layer = new Laya.Sprite()//没有遮挡
			Scene.tipsLayer   = new Laya.Sprite()//没有遮挡
			Scene.tips0Layer  = new Laya.Sprite()//没有遮挡

			var c = new Laya.Sprite();
			c.width = game.width
			c.height = game.height
			___frame.isReverse = false
			if( (Laya.Browser.onAndriod || Laya.Browser.onIOS)&&config.isReverse ){
				c.rotation = 180;
				c.x = game.width;
				c.y = game.height;
				___frame.isReverse = true;
			}

			container_.addChild(c);
			Scene.container = c
			// ___frame.stage = Scene.container
			
			Scene.container.addChild(Scene.bottomLayer)
			Scene.container.addChild(Scene.middleLayer)
			Scene.container.addChild(Scene.iconLayer)
			Scene.container.addChild(Scene.panel0Layer)
			Scene.container.addChild(Scene.panel1Layer)
			Scene.container.addChild(Scene.tipsLayer)
			Scene.container.addChild(Scene.tips0Layer)

			Scene.panel0Layer_mask = new Laya.Sprite()//有遮挡
			Scene.panel0Layer_mask.graphics.drawRect(0,0,___frame.width,___frame.height, "#000000");
			Scene.panel0Layer_mask.size(___frame.width,___frame.height)
			Scene.panel0Layer_mask.alpha = 0.3;
			Scene.panel0Layer_mask.on("click", this, function(e){})
			Scene.panel0Layer_mask.on("mousedown", this, function(e){})
			Scene.panel0Layer_mask.on("mouseup", this, function(e){})

			Scene.tips0Layer_mask = new Laya.Sprite()//有遮挡
			Scene.tips0Layer_mask.graphics.drawRect(0,0,___frame.width,___frame.height, "#000000");
			Scene.tips0Layer_mask.size(___frame.width,___frame.height)
			Scene.tips0Layer_mask.alpha = 0.3;
			Scene.tips0Layer_mask.on("click", this, function(e){})
			Scene.tips0Layer_mask.on("mousedown", this, function(e){})
			Scene.tips0Layer_mask.on("mouseup", this, function(e){})
			Laya.stage.on(Laya.Event.RESIZE, this, Scene.resize)
		}
		
		Scene.resize = function(params) {
			game.cb.dispatchEvent("resize")
		}
		
		Scene.remove = function (Class_) {
			if(!Class_)return;
			if( !Scene.elements[___frame.utils.getClassName(Class_)] )return null
			___frame.utils.remove(Scene.elements[___frame.utils.getClassName(Class_)].target)
			
			if(Scene.elements[___frame.utils.getClassName(Class_)].params.layer == Scene.panel0Layer){
				Scene.panel0Layer.numChildren >= 2 && (Scene.panel0Layer.addChildAt(Scene.panel0Layer_mask, Scene.panel0Layer.numChildren - 2))
				Scene.panel0Layer.numChildren == 1 && Scene.panel0Layer.removeChildAt(0)
			}

			if(Scene.elements[___frame.utils.getClassName(Class_)].params.layer == Scene.tips0Layer){
				Scene.tips0Layer.numChildren >= 2 && (Scene.tips0Layer.addChildAt(Scene.tips0Layer_mask, Scene.tips0Layer.numChildren - 2))
				Scene.tips0Layer.numChildren == 1 && Scene.tips0Layer.removeChildAt(0)
			}
		}
		
		Scene.removeAll = function(){
			while(Scene.bottomLayer.numChildren)Scene.bottomLayer.removeChildAt(0)
			while(Scene.middleLayer.numChildren)Scene.middleLayer.removeChildAt(0)
			while(Scene.iconLayer.numChildren)Scene.iconLayer.removeChildAt(0)
			while(Scene.panel0Layer.numChildren)Scene.panel0Layer.removeChildAt(0)
			while(Scene.panel1Layer.numChildren)Scene.panel1Layer.removeChildAt(0)
			// while(Scene.tipsLayer.numChildren)Scene.tipsLayer.removeChildAt(0)
			// while(Scene.tips0Layer.numChildren)Scene.tips0Layer.removeChildAt(0)
		}
		
		Scene.get = function(Class_) {
			if( !Scene.elements[___frame.utils.getClassName(Class_)] )return null
			return Scene.elements[___frame.utils.getClassName(Class_)].target
		}
		
		Scene.registe = function(Class_){
			if(Scene.elements[___frame.utils.getClassName(Class_)])return
			var e = new SceneElement(new Class_())
			Scene.elements[___frame.utils.getClassName(Class_)] = e
		}
		
		Scene.add = function(Class_, args_){
			var e

			var className = ___frame.utils.getClassName(Class_)

			if(!className)throw new Error(Class_ + " 不能获取className")

			if(Scene.elements[className]){
				e = Scene.elements[className];
			}
			else {
				var e = new SceneElement(new Class_())
				Scene.elements[className] = e
			}
			e.args = args_

			if(!e.params)throw new Error("模块 " + className + " 不存在属性 params")

			if(e.params.layer == Scene.panel0Layer){
				e.params.layer.addChild(Scene.panel0Layer_mask);
			}
			if(e.params.layer == Scene.tips0Layer){
				e.params.layer.addChild(Scene.tips0Layer_mask);
			}
			e.params.layer.addChild(e.target);
			return e.target
		}
		
		return Scene
	})();
	//this.params = {
        //"layer":scene.bottomLayer, 
        //"offx":0,
        //"offy":0,
        //"centerx":false,
        //"centery":false,
        //"up":false,
        //"down":false,
        //"left":false,
        //"right":false
    //}
	function SceneElement(module){
		var that = this
		this.target = module
		this.params = module.params
		this.args   = null
		
		this.added = function(){
			//trace("我被添加了")
			that.updatePosition()
			that.target.added && that.target.added.apply(this.target, this.args)
		}
		
		this.removed = function(){
			// trace("我被移除了")
			that.target.removed && that.target.removed()
		}
		
		module.on(Laya.Event.ADDED, this, that.added)
		module.on(Laya.Event.REMOVED, this, that.removed)
		
		this.updatePosition = function() {
			that.target.x = 0
			that.target.y = 0
			var w = that.target.width * that.target.scaleX
			var h = that.target.height * that.target.scaleY
			that.params.centerx && (that.target.x = (___frame.width - w) / 2)
			that.params.centery && (that.target.y = (___frame.height - h) / 2)
			that.params.up && (that.target.y = 0)
			that.params.down && (that.target.y = ___frame.height - h)
			that.params.left && (that.target.x = 0)
			that.params.right && (that.target.x = ___frame.width - w)
			that.target.x += that.params.offx
			that.target.y += that.params.offy
		}
	}
	
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	
	___frame.utils = (function(){
		function Utils(){}
		/**
		 * 创建一个实例 DATA {}类型的信息 复制给new CLASS
		 */
		Utils.newA = function(_class_, _data_){
			if(!_class_)throw new Error("Error " + _class_ + " 不存在")
			var a = new _class_()
			Utils.injectProp(a, _data_)
			return a
		}
		Utils.injectProp = function(_instance_, _data_){
			for (var name in _data_){
				if(_instance_.hasOwnProperty(name)){
					var value = _data_[name]
					_instance_[name] = (value == "true" ? true : (value == "false" ? false : value))
				}
			}
			return _instance_
		}
		Utils.scale = function(target, scaleX, scaleY){
			if(scaleY == null || scaleY == undefined)scaleY = scaleX
			target.scaleX = scaleX
			target.scaleY = scaleY
			target.__w = target.width * scaleX
			target.__h = target.height * scaleY
		}
		Utils.cacheImage = function(url){
			laya.net.Loader.cacheRes(url, laya.net.Loader.getRes("res/" + url + config.verson_res))
		}
		var __cache_urls = [];
		Utils.cacheAtlas = function(JSONNAME){
			var url_j = "res/atlas/"+JSONNAME+".json"+config.verson_res
			var url_p = "res/atlas/"+JSONNAME+".png"+config.verson_res
			//如果已经解析 那么返回 如果图集太多 解析消耗也大
			var index = __cache_urls.indexOf(url_j)
			if(index != -1){
				trace("已经解析过该资源", url_j)
				trace("已经解析过该资源", url_p)
				return
			}
			
			var json = Laya.loader.getRes(url_j)
			if(!json)throw new Error("资源不存在 " + url_j)
			
			__cache_urls.push(url_j)
			
			var t = Laya.loader.getRes(url_p)
			if(!t)throw new Error("资源不存在 " + url_p)
				
			var prefix = json.meta.prefix
			for (var key in json.frames) {
				if (json.frames.hasOwnProperty(key)) {
					var element = json.frames[key];
					var nt = laya.resource.Texture.createFromTexture(t, element.frame.x, element.frame.y, element.frame.w, element.frame.h)
					laya.net.Loader.cacheRes(prefix+key, nt)
				}
			}
		}
		Utils.getURL = function(url_){
			return url_+"?v="+config.verson_res
		}
		Utils.removeAll = function(a){
			while(a.numChildren)a.removeChildAt(0)
		}
		Utils.remove = function(a){
			if(a&&a.parent)a.parent.removeChild(a)
		}
		Utils.getSprite = function(sp, textureURL){
			sp = sp || new Laya.Sprite()
			var t = Laya.loader.getRes(textureURL)
			if(!t)throw new Error("资源不存在 " + textureURL)
			
			sp.graphics.clear();
			sp.graphics.drawTexture(t, 0, 0);
			sp.size(t.width, t.height)
			return sp
		}
		Utils.setget = function(target, property, setfunction, getfunction){
			Object.defineProperty(target, property, {set:setfunction, get:getfunction})
		}
		Utils.deletePX = function(value){
			if(!value)return 0
			var str_ = ""
			var str = value.toString()
			var i = str.indexOf("px")
			if(i != -1)str_ = parseInt(str.slice(0,i))
			else str_ = str
			return str_
		}
		Utils.stage = function(value){
			var a = null
			if(value){
				if(value.parent){
					if(value.parent == ___frame.stage)a = true
					else {a = Utils.stage(value.parent)}
				}else {
					a = false
				}
			}else {
				a = false
			}
			return a
		}
		//function a(){} return a
		//this.a = function(){} 解析不能
		Utils.getClassName = function(value){
			if(typeof value === 'object')return value.constructor.name
			else if(typeof value === 'function')return value.name
		}
		Utils.randomArr = function(oArr) {
			var temp_x; //临时交换数
			var random_x;
			for(var i=oArr.length;i>0;i--) {
				random_x = Math.floor(Math.random()*i); //   取得一个随机数
				temp_x = oArr[random_x];
				oArr[random_x] = oArr[i-1];
				oArr[i-1] = temp_x;
			}
		}
		// Utils.polygon_g;
		// Utils.polygon_g1;
		/**
		 * [hitTestPolygon 多边形碰撞]
		 * @param  {[type]} polygon1_ [多边形1 数组 [0,0,100,100,100,200] 0 x坐标 1 y坐标 以此类推]
		 * @param  {[type]} polygon2_ [多边形2 数组 [0,0,100,100,100,200] 0 x坐标 1 y坐标 以此类推]
		 * @param  {[type]} offx1     [多边形1 x偏移坐标 全部x坐标 + 这个偏移值]
		 * @param  {[type]} offy1     [多边形1 y偏移坐标 全部x坐标 + 这个偏移值]
		 * @param  {[type]} offx2     [多边形2 x偏移坐标 全部x坐标 + 这个偏移值]
		 * @param  {[type]} offy2     [多边形2 y偏移坐标 全部x坐标 + 这个偏移值]
		 * @return {[type]}           [description]
		 */
		Utils.hitTestPolygon = function(polygon1_, polygon2_, offx1, offy1, offx2, offy2){
			var polygon1 = polygon1_.slice()
			var polygon2 = polygon2_.slice()
			offx1 = offx1?offx1:0
			offy1 = offy1?offy1:0
			offx2 = offx2?offx2:0
			offy2 = offy2?offy2:0
			if(polygon1.length < 4 || polygon2.length < 4){
				//___frame.error("___frameUtils.hitTestPolygon 数组长度必须大于等于4")
				return false
			}
			polygon1[polygon1.length] = polygon1[0];
			polygon1[polygon1.length] = polygon1[1];
			polygon2[polygon2.length] = polygon2[0];
			polygon2[polygon2.length] = polygon2[1];
			var isHit = false
			for (var i = 0; i <= polygon1.length-4; i+=2) {
				for (var j = 0; j <= polygon2.length-4; j+=2) {
					isHit = Utils.hitTestLine(polygon1[i]+offx1, polygon1[i+1]+offy1, polygon1[i+2]+offx1, polygon1[i+3]+offy1, polygon2[j]+offx2, polygon2[j+1]+offy2, polygon2[j+2]+offx2, polygon2[j+3]+offy2)
					// if(isHit){
					//     polygon_g = polygon_g || new PIXI.Graphics()
					//     ___frame.stage.addChild(polygon_g)

					//     polygon_g1 = polygon_g1 || new PIXI.Graphics()
					//     ___frame.stage.addChild(polygon_g1)
					//     polygon_g.clear()
					//     polygon_g.lineStyle(2, 0xff0000)
					//     polygon_g.moveTo(polygon1[i]+offx1, polygon1[i+1]+offy1)
					//     polygon_g.lineTo(polygon1[i+2]+offx1, polygon1[i+3]+offy1)
					//     polygon_g.endFill()
						
					//     polygon_g1.clear()
					//     polygon_g1.lineStyle(2, 0xff00ff)
					//     polygon_g.moveTo(polygon2[j]+offx2, polygon2[j+1]+offy2)
					//     polygon_g.lineTo(polygon2[j+2]+offx2, polygon2[j+3]+offy2)
					//     polygon_g1.endFill()
					// }
					if(isHit)break
				}
				if(isHit)break
			}
			return isHit
		}
		Utils.hitTestLine = function(x1,y1,x2,y2,x3,y3,x4,y4) {
			if(x1 == x2 && x2 == x3 && x3 == x4){
				if(Math.abs((y1 + (y2 - y1) / 2) - (y3 + (y4 - y3) / 2)) <= Math.abs((y2 - y1) / 2 + (y4 - y3) / 2))return true
				else return false
			}else if(y1 == y2 && y2 == y3 && y3 == y4){
				if(Math.abs((x1 + (x2 - x1) / 2) - (x3 + (x4 - x3) / 2)) <= Math.abs((x2 - x1) / 2 + (x4 - x3) / 2))return true
				else return false
			}

			var line1p1=(x2-x1)*(y3-y1)-(x3-x1)*(y2-y1);//第一条线段的向量和（第一条线段的开始点与第二条线段的开始点组成的向量）的向量积
			var line1p2=(x2-x1)*(y4-y1)-(x4-x1)*(y2-y1);//第一条线段的向量和（第一条线段的开始点与第二条线段的结束点组成的向量）的向量积
			var line2p1=(x4-x3)*(y1-y3)-(x1-x3)*(y4-y3);//第二条线段的向量和（第二条线段的开始点与第一条线段的开始点组成的向量）的向量积
			var line2p2=(x4-x3)*(y2-y3)-(x2-x3)*(y4-y3);//第二条线段的向量和（第二条线段的开始点与第一条线段的结束点组成的向量）的向量积
			if ((line1p1*line1p2<=0)&&(line2p1*line2p2<=0)) {//判断方法在先前讲过
				return true;//相交
			} else {
				return false;//否则不相交
			}
		}
		Utils.numberToTime = function(time, maxTime, insertHout, insertMinute) {
			maxTime = arguments[1] != null?arguments[1]:3;
			insertHout = arguments[2] != null?arguments[2]:"：";
			insertMinute = arguments[3] != null?arguments[3]:"：";

			var hour = Math.floor(time / 60 / 60) >> 0;
			var minute = Math.floor(time / 60) % 60;
			var second = time % 60;
			var timeTxt = "";
			if (maxTime == 3) {
				timeTxt += ((hour >= 100) ? hour.toString() : (100 + hour).toString().substr(1)) + insertHout;
				timeTxt += ((minute < 10) ? ("0" + minute.toString()) : minute.toString()) + insertMinute;
				timeTxt += (second < 10) ? ("0" + second.toString()) : second.toString();
			}else if (maxTime == 2) {
				timeTxt += ((minute < 10) ? ("0" + minute.toString()) : minute.toString()) + insertMinute;
				timeTxt += (second < 10) ? ("0" + second.toString()) : second.toString();
			}else if (maxTime == 1) {
				timeTxt += (second < 10) ? ("0" + second.toString()) : second.toString();
			}
			return timeTxt;
		}
		
		return Utils
	})()
	
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	
	/**
	 * 贴图轮播动画
	{
		"maxSprite":1,
		"width":1,
		"height":1,
		"action":{
			"fly":{
				"delay":100,
				"repeat":false,
				"length":1,
				"frame0":{"body":{"name":"res1/sdlr1.png","x":0,"y":0}}
			}
		}
	}
	 */
	___frame.Animation = function LAnimation() {
		Laya.Sprite.call(this)
		var __that = this
		var __json = null
		this.width = 0 ;
		this.height = 0;
		function set__Json(value) {
			if(!value){
				trace("Error json null")
			}
			__json = value;
			__that.width = __json.width;
			__that.height = __json.height;
		}
		Object.defineProperty(this, "json", {set:set__Json});
		
		var index = 0;
		var length = 0;
		var repeat = true;
		this.delay;
		this.completeHandler;
		this.actionName;
		this.running = false;
		
		this.play = function() {
			Laya.timer.loop(this.delay, this, update);
			__that.running = true;
		}
		
		this.stop = function() {
			Laya.timer.clear(this, update)
			__that.running = false;
		}
		function update() {
			//__that.cacheAsBitmap = false
			if(!__json)return;
			if(index>=length){
				if(repeat){
					index=0;
				}else {
					index=length-1
					__that.stop();
					__that.completeHandler && __that.completeHandler(__that)
				}
			}
			var ob1 = __json.action[__that.actionName]["frame"+index];
			__that.graphics.clear();
			for(var name1 in ob1){
				var t = Laya.loader.getRes(ob1[name1].name)
				if(!t){
					trace("Error 不存在资源：", ob1[name1].name)
				}
				__that.graphics.drawTexture(t, ob1[name1].x, ob1[name1].y);
			}
			index++;
			
			//__that.cacheAsBitmap = true
		}
		this.skip = function(value) {
			__that.actionName = value
			repeat = __json.action[__that.actionName].repeat;
			length = __json.action[__that.actionName].length;
			index = 0
			__that.delay = __json.action[__that.actionName].delay;
			update()
		}
	}
	___frame.Animation.prototype = Object.create(Laya.Sprite.prototype);
	___frame.Animation.prototype.constructor = ___frame.Animation;
	/**
	 * 数字文本 数字文本
		var a = [];
		for(var i=0;i<10;i++)a.push("begin/r"+i+".png")
		var txt_giftNum = new LText(a);
	 */
	___frame.NumText = function LText(urls__){
		Laya.Sprite.call(this)
		var that = this
		var _text = 0
		// var _use = []//使用的sprite数字 数组
		// var _pool = []//没使用的sprite数字 数组
		var _id = ___frame.cache.registe(Laya.Sprite)
		var _width$ = 0
		var _height$ = 0
		this.dis = 0;
		function get_text(){
			return _text
		}
		function set_text(value){
			_width$ = _height$ = 0
			
			_text = value
			var str = String(value)
			var l = str.length
			//全部删除
			___frame.cache.recoverAll(_id)
			// while(_use.length){
			// 	___frame.utils.remove(_use[0])
			// 	_pool.push(_use.shift())
			// }
			// ___frame.utils.removeAll(that)
			//根据str内容重新排序数字
			for(var i = 0; i < l; i++){
				var a = str.charAt(i)
				// var s = _pool.length ? _pool.shift() : new Laya.Sprite()
				var s = ___frame.cache.get(_id)
				if(!urls__[a])throw new Error("NumText 字符 " + a + " 没有对应URL")
				___frame.utils.getSprite(s, urls__[a])
				this.addChild(s)
				var d = i >= 1 ? that.dis : 0 
				s.x = _width$ + d
				_width$ = _width$ + s.width + d
				_height$ = Math.max(_height$, s.height)
			}
			this.width = _width$//s.x + s.width
			this.height = _height$//s.height
		}
		Object.defineProperty(this, "text", {get:get_text, set:set_text})
	}
	___frame.NumText.prototype = Object.create(Laya.Sprite.prototype);
	___frame.NumText.prototype.constructor = ___frame.NumText;

	___frame.List = function LList(itemRender, repeatx, repeaty, offx, offy, isEvent){
		isEvent = isEvent == undefined ? true : false
		offx = offx ? offx : 0
		offy = offy ? offy : 0
		Laya.Sprite.call(this)
		var that = this
		var _itemRender = itemRender
		var _repeatx = repeatx
		var _repeaty = repeaty
		var _offx = offx
		var _offy = offy
		var _array = [];
		var _startIndex = 0;
		var _items = [];

		//创建新单元格
		var numX = _repeatx;
		var numY = _repeaty + 1;

		var __width = 0
		var __height = 0

		for (var k = 0; k < numY; k++) {
			for (var l = 0; l < numX; l++) {
				var item = new _itemRender();
				item.x = l * (_offx + item.width);
				item.y = k * (_offy + item.height);
				this.addChild(item);
				// item.on("click", this, onItemMouse);
				// item.on(MouseEvent.DOUBLE_CLICK, onDoubleClick);
				// item.addEventListener(MouseEvent.ROLL_OVER, onCellMouse);
				// item.addEventListener(MouseEvent.ROLL_OUT, onCellMouse);
				// item.on("mousedown", this, function(e){e.stopPropagation()});
				// item.addEventListener(MouseEvent.MOUSE_UP, onCellMouse);
				_items.push(item);
				__width = Math.max(__width, item.x + item.width)
				__height = Math.max(__height, item.y + item.height)
			}
		}

		var _itemSize = item.height;

		this.scrollRect = new Laya.Rectangle(0, 0, __width, __height - (_offy + item.height));

		this.width = __width
		this.height = __height - (_offy + item.height)

		var __y__ = 0
		var __lasty__ = -1
		var _downy;
		var _time_;

		if(isEvent)
		this.on("mousedown", this, function(e){
			_downy = ___frame.stage.mouseY
			_time_ = Date.now()
			yy = 0
			Laya.timer.clear(this, frameupdateHandler)
			___frame.stage.on("mousemove", this, mousemovehandler)
			___frame.stage.on("mouseout", this, mouseuphandler)
			___frame.stage.on("mouseup", this, mouseuphandler)
		})

		var yy = 0

		function mousemovehandler(e){
			yy = ___frame.stage.mouseY - _downy
			_downy = ___frame.stage.mouseY
			// trace1(Laya.stage._canvasTransform.getScaleY())
			// __y__ = __y__ - yy*Laya.stage._canvasTransform.getScaleY()
			if(!___frame.isReverse)__y__ -= yy
			else __y__ += yy
			__y__ < 0 && (__y__ = 0)
			if(__y__ > Math.ceil((_array.length - _repeatx*_repeaty) / _repeatx) * _itemSize){
				__y__ = Math.ceil((_array.length - _repeatx*_repeaty) / _repeatx) * _itemSize
			}
			if(__lasty__ == __y__)return
			__lasty__ = __y__
			var index = Math.floor(__y__ / _itemSize) * (_repeatx);
			if(index != that.startIndex)that.startIndex = index
			var r = that.scrollRect
			r.y = __y__ % _itemSize
		}

		var _move_dis;

		function mouseuphandler(e){
			___frame.stage.off("mousemove", this, mousemovehandler)
			___frame.stage.off("mouseout", this, mouseuphandler)
			___frame.stage.off("mouseup", this, mouseuphandler)
			_move_dis = yy
			if(Date.now() - _time_ > 500 || _move_dis == 0)return;
			Laya.timer.frameLoop(1, this, frameupdateHandler)
		}

		function frameupdateHandler(e){
			_move_dis *= 0.77
			if(Math.abs(_move_dis) < 1)Laya.timer.clear(this, frameupdateHandler)
			if(!___frame.isReverse)__y__ -= yy
			else __y__ += yy
			if(__y__ < 0){
				__y__ = 0;
				Laya.timer.clear(this, frameupdateHandler)
			}else if(__y__ > Math.ceil((_array.length - _repeatx*_repeaty) / _repeatx) * _itemSize){
				__y__ = Math.ceil((_array.length - _repeatx*_repeaty) / _repeatx) * _itemSize
				Laya.timer.clear(this, frameupdateHandler)
			}
			if(__lasty__ == __y__)return
			__lasty__ = __y__;
			var index = Math.floor(__y__ / _itemSize) * (_repeatx);
			if(index != that.startIndex)that.startIndex = index
			var r = that.scrollRect
			r.y = __y__ % _itemSize
		}

		// function onItemMouse(e){
			// trace(123123213)
		// }

		function renderItems(){
			for (var i = 0, n = _items.length; i < n; i++) {
				___frame.utils.remove(_items[i])
				renderItem(_items[i], _startIndex + i);
			}
		}

		function renderItem(item, index){
			// if(index < _vos.length){
			var data = _array[index]
			if(data == undefined || data == null){}
			else {that.addChild(item);item.data = data}
			// }else item.vo = null;
		}

		function set_startIndex(value){
			_startIndex = value > 0 ? value : 0;
			renderItems()
		}
		function get_startIndex(){
			return _startIndex
		}
		___frame.utils.setget(this, "startIndex", set_startIndex, get_startIndex)
		
		function set_array(value){
			_array = value || [];
			that.startIndex = _startIndex;
		}
		function get_array(){
			return _array
		}
		___frame.utils.setget(this, "array", set_array, get_array)
	}
	___frame.List.prototype = Object.create(Laya.Sprite.prototype);
	___frame.List.prototype.constructor = ___frame.List;

	___frame.LogicScrollPanel = function(target, show_width, show_height){
		var that = this

		var r = new Laya.Rectangle()
		r.x = 0
		r.y = 0
		r.width = show_width
		r.height = show_height
		target.scrollRect = r

		var __y__ = 0
		var __lasty__ = -1
		var _downy;
		var _time_;

		target.on("mousedown", this, function(e){
			_downy = ___frame.stage.mouseY
			_time_ = Date.now()
			yy = 0
			Laya.timer.clear(that, frameupdateHandler)
			___frame.stage.on("mousemove", that, mousemovehandler)
			___frame.stage.on("mouseout", that, mouseuphandler)
			___frame.stage.on("mouseup", that, mouseuphandler)
		})

		var yy = 0

		function mousemovehandler(e){
			yy = ___frame.stage.mouseY - _downy
			_downy = ___frame.stage.mouseY
			__y__ -= yy

			if(target.height <= show_height){
				__y__ = 0
			}else if(__y__ < 0){
				__y__ = 0
			}else if(__y__ > target.height - show_height){
				__y__ = target.height - show_height
			}
			if(__lasty__ == __y__)return
			__lasty__ = __y__
			r.y = __y__
		}

		var _move_dis;

		function mouseuphandler(e){
			___frame.stage.off("mousemove", that, mousemovehandler)
			___frame.stage.off("mouseout", that, mouseuphandler)
			___frame.stage.off("mouseup", that, mouseuphandler)
			_move_dis = yy
			if(Date.now() - _time_ > 500 || _move_dis == 0)return;
			Laya.timer.frameLoop(1, that, frameupdateHandler)
		}

		function frameupdateHandler(e){
			_move_dis *= 0.95
			if(Math.abs(_move_dis) < 1)Laya.timer.clear(this, frameupdateHandler)
			__y__ -= _move_dis

			if(target.height <= show_height){
				__y__ = 0
				Laya.timer.clear(this, frameupdateHandler)
			}else if(__y__ < 0){
				__y__ = 0
				Laya.timer.clear(this, frameupdateHandler)
			}else if(__y__ > target.height - show_height){
				__y__ = target.height - show_height
				Laya.timer.clear(this, frameupdateHandler)
			}
			
			if(__lasty__ == __y__)return
			__lasty__ = __y__;
			// var index = Math.floor(__y__ / _itemSize) * (_repeatx);
			// if(index != that.startIndex)that.startIndex = index
			// var r = that.scrollRect
			r.y = __y__// % _itemSize
		}
	}
	/**
	 * 游戏规则面板
	 * @target__    	规则素材url 或者显示对象           外部set方法 skin:any || string
	 * @width__         可视区域宽度                      外部vw方法 width:int					默认显示宽度是游戏宽度
	 * @height__        可视区域高度                      外部vw方法 height:int					默认显示高度是游戏高度
	 * @scrollX__		x方向是否可以滑动
	 * @scrollY__       y方向是否可以滑动
	 */
	___frame.ScrollPanel = function(target__, width__, height__, scrollX__, scrollY__){
		Laya.Sprite.call(this)
		
		var that = this;
		var __target,__width,__height;
		var __power = 0;

		var __paramType = ""

		var __ruleBg

		var __scrollX = true
		var __scrollY = true;

		__width = ( width__ && parseInt(width__) > 0 ) ? width__ : ___frame.width
		__height = ( height__ && parseInt(height__) > 0 ) ? height__ : ___frame.height
		// __power = ( power__ && parseInt(power__) > 0 ) ? power__ : 5
		__target = target__;
		__scrollX = ( (!scrollX__ || scrollX__ == true) && scrollX__ != false) ? true : false;
		__scrollY = ( (!scrollY__ || scrollX__ == true) && scrollY__ != false) ? true : false;

		/**
		 * 规则的遮罩
		 */
		var __visual_rect = new Laya.Rectangle(0,0);
		function __updateVisual(){
			/**
			 * 设置遮罩的宽度
			 */
			if( parseInt(__width) > 0 ){
				__visual_rect.width = __width
			}else {
				__visual_rect.width = 0
			}
			/**
			 * 设置遮罩的高度
			 */
			if( parseInt(__height) > 0 ){
				__visual_rect.height = __height
			}else {
				__visual_rect.height = 0
			}
			/**
			 * 如果遮罩的宽高都大于0   本身现实对象设置为 遮罩的宽高
			 */
			// if( parseInt(__width) > 0 && parseInt(__height) > 0 ){ that.size(__width, __height); }
		}
		__updateVisual();

		function __initRule(){
			//拖拽的对象 为显示对象处理
			if( __target && typeof(__target) == "object"){
				__paramType = "object";
				__ruleBg = __target;
			}
			//拖拽的对象 为资源路径处理
			else if( __target != "" && typeof(__target) == "string" ){
				__paramType = "string";
				__ruleBg = __ruleBg || new Laya.Image();
				__ruleBg.graphics.clear();
				__ruleBg.skin = __target;
			}
			//设置显示对象的遮罩
			__ruleBg.scrollRect = __visual_rect;
			//将显示对象添加到显示列表
			that.addChild(__ruleBg);

			__ruleClearEvent();
			__ruleAddEvent();
		}
		__initRule();

		/**
		 * 外部设置规则的皮肤
		 */
		function setSkin(target__){ 
			if(__paramType == ""){
				__target = target__;
			}else if( __paramType == typeof(__target) && __paramType == "string"){
				__target.skin = target__;
			}else if( __paramType == typeof(__target) && __paramType == "object"){
				__target = target__;
			}else { throw new Error("两次传递的对象类型不同"); }
			__initRule();
		}
		___frame.utils.setget(this, "skin", setSkin);

		/**
		 * 外部设置遮罩的宽
		 */
		function setVw(value){ __width = value;__updateVisual() }
		___frame.utils.setget(this, "width", setVw);
		/**
		 * 外部设置遮罩的高
		 */
		function setVh(value){ __height = value;__updateVisual() }
		___frame.utils.setget(this, "height", setVh);

		/**
		 * 外部x方向是否可以拖动
		 */
		function setScrollX(value){ __scrollX = value; }
		___frame.utils.setget(this, "scrollX", setScrollX);

		/**
		 * 外部x方向是否可以拖动
		 */
		function setScrollY(value){ __scrollY = value; }
		___frame.utils.setget(this, "scrollY", setScrollY);

		/**
		 * 外部设置滑动的力度
		 */
		function setPower(value){ __power = value; }
		___frame.utils.setget(this, "power", setPower);


		var __rule_lastx = 0, __rule_lasty = 0
		var __fxx, __fxy;
		var __downx, __downy;
		var __time;
		var __lasty__ = -1;
		var __lastx__ = -1;
		/**
		 * 添加按下事件
		 */
		function __ruleAddEvent(){
			__ruleBg.on("mousedown", that, __ruleMousedownHandler);
		}

		function __ruleMousedownHandler(){
			__downx = ___frame.stage.mouseX;
			__downy = ___frame.stage.mouseY;
			__time = Date.now();
			__fxx = 0;
			__fxy = 0;
			Laya.timer.clear(that, __frameupdateHandler);
			___frame.stage.on("mousemove", that, __mousemovehandler);
			___frame.stage.on("mouseout", that, __mouseuphandler);
			___frame.stage.on("mouseup", that, __mouseuphandler);
		}

		function __mousemovehandler(e){
			__fxx = ___frame.stage.mouseX - __downx;
			__fxy = ___frame.stage.mouseY - __downy;
			__downx = ___frame.stage.mouseX;
			__downy = ___frame.stage.mouseY;
			__rule_lastx -= __fxx;
			__rule_lasty -= __fxy;
			__rule_lastx < 0 && (__rule_lastx = 0)
			__rule_lasty < 0 && (__rule_lasty = 0)

			if(__rule_lastx > (__ruleBg.width - __visual_rect.width) && __scrollX ){
				__rule_lastx = __ruleBg.width - __visual_rect.width
			}
			if(__lastx__ != __rule_lastx  && __scrollX){
				__lastx__ = __rule_lastx
				__visual_rect.x = __rule_lastx % (__visual_rect.x + __visual_rect.width);
			}
			
			if(__rule_lasty > (__ruleBg.height - __visual_rect.height) && __scrollY ){
				__rule_lasty = __ruleBg.height - __visual_rect.height
			}
			if(__lasty__ != __rule_lasty && __scrollY){
				__lasty__ = __rule_lasty
				__visual_rect.y = __rule_lasty % (__visual_rect.y + __visual_rect.height);
			}
		}
		var _move_dis_y, _move_dis_x;
		function __mouseuphandler(e){
			___frame.stage.off("mousemove", that, __mousemovehandler)
			___frame.stage.off("mouseout", that, __mouseuphandler)
			___frame.stage.off("mouseup", that, __mouseuphandler);
			_move_dis_x = __fxx
			_move_dis_y = __fxy
			if(Date.now() - __time > 500 || (_move_dis_y == 0 && _move_dis_x == 0) )return;
			Laya.timer.frameLoop(1, that, __frameupdateHandler)
		}

		function __frameupdateHandler(e){
			_move_dis_x *= 0.95//0.85 + (__power / 100);
			_move_dis_y *= 0.95//0.85 + (__power / 100);

			if(Math.abs(_move_dis_x) < 1 && Math.abs(_move_dis_y) < 1){ Laya.timer.clear(that, __frameupdateHandler) }
			__rule_lastx -= _move_dis_x;
			__rule_lasty -= _move_dis_y;

			if(__rule_lastx < 0  && __scrollX){
				__rule_lastx = 0;
			}else if(__rule_lastx > __ruleBg.width - __visual_rect.width  && __scrollX){
				__rule_lastx = __ruleBg.width - __visual_rect.width
			}
			if(__lastx__ != __rule_lastx  && __scrollX){
				__lastx__ = __rule_lastx;
				__visual_rect.x = __rule_lastx % (__visual_rect.x + __visual_rect.width);
			}

			if(__rule_lasty < 0 && __scrollY){
				__rule_lasty = 0;
			}else if(__rule_lasty > __ruleBg.height - __visual_rect.height && __scrollY){
				__rule_lasty = __ruleBg.height - __visual_rect.height
			}
			if(__lasty__ != __rule_lasty && __scrollY){
				__lasty__ = __rule_lasty;
				__visual_rect.y = __rule_lasty % (__visual_rect.y + __visual_rect.height);
			}
		}

		function __ruleClearEvent(){
			__ruleBg.off("mousedown", that, __ruleMousedownHandler);
			__ruleBg.off("mouseup", that, __mouseuphandler);
			__ruleBg.off("mouseout", that, __mouseuphandler);
			___frame.stage.off("mousemove", that, __frameupdateHandler);
		}
	}
	___frame.ScrollPanel.prototype = Object.create(Laya.Sprite.prototype);
	___frame.ScrollPanel.prototype.constructor = ___frame.ScrollPanel;


	/**
	 * [BtnSelect 2态选择按钮]
	 * @param {[type]} url_state_select   [选择图片路径]
	 * @param {[type]} url_state_noselect [非选图片路径]
	 * @param {[type]} view_image         [image视图]
	 * default_select 默认选择状态 true选择 false非选
	 * singleSelect true 选中后再点击 不变成非选状态 false 可以
	 * 例子 new game.BtnSelect("createRoom/a3.png", "createRoom/a1.png", this["btn_play"+i], true, true)
	 */
	___frame.BtnSelect = function(url_state_select, url_state_noselect, view_image, default_select, callback, singleSelect, singleSelectCallback){
		var that = this
		// view_image = view_image?view_image:new Laya.Image(url_state_select)
		singleSelect = singleSelect?true:false
		function updateState(){
			view_image.skin = _select?url_state_select:url_state_noselect
		}

		var _select = null
		function set_select(value){
			if(_select == value)return;
			_select = value?true:false
			updateState()
			// _select&&singleSelectCallback&&singleSelectCallback(view_image)
			// callback&&callback(view_image)
		}
		function get_select(){
			return _select
		}
		game.utils.setget(view_image, "select", set_select, get_select)

		view_image.on("click", view_image, clickHandler)
		view_image.on("added", view_image, function(e){
			view_image.on("click", view_image, clickHandler)
		})

		view_image.on("removed", view_image, function(e){
			view_image.off("click", view_image, clickHandler)
		})
		
		function clickHandler(e){
			if(singleSelect&&view_image.select)return
			view_image.select = !view_image.select
			callback&&callback(view_image, e)
			_select&&singleSelectCallback&&singleSelectCallback(view_image, e)
		}
		view_image.select = default_select?true:false
	}

	/**
	 * [BtnGroupSingleSelect description]
	 * @param {[type]} imageArr             [description]
	 * @param {[type]} url_select           [description]
	 * @param {[type]} url_no_select        [description]
	 * @param {[type]} select_callback      [description]
	 * @param {[type]} default_select_index [description]
	 * new game.BtnGroupSingleSelect([this.btn_xiandai, this.btn_chuantong, this.btn_daqing],
        ["createRoom/play3_1.png", "createRoom/play1_1.png", "createRoom/play2_1.png"],
        ["createRoom/play3_0.png", "createRoom/play1_0.png", "createRoom/play2_0.png"],function(e){

        },0)

        new game.BtnGroupSingleSelect([this.btn_roomModel_1, this.btn_roomModel_2], "createRoom/a2.png", "createRoom/a1.png", function(e){

        }, 0)
	 */
	___frame.BtnGroupSingleSelect = function(imageArr, url_select, url_no_select, select_callback, default_select_index){
		var that = this
		var index = default_select_index

		function clickHandler(target, e){
			for(var i = 0; i < imageArr.length; i++){
				if(imageArr[i]==target){}
				else imageArr[i].select=false;
			}
			select_callback && select_callback(target, e)
		}

		for(var i = 0; i < imageArr.length; i++){
			var select_url   = typeof url_select == "string" ? url_select : url_select[i];
			var noselect_url = typeof url_no_select == "string" ? url_no_select : url_no_select[i];
			new ___frame.BtnSelect(select_url, noselect_url, imageArr[i], false, null, true, clickHandler)

			function set_index(value){
				// index = value;
				for(var i = 0; i < imageArr.length; i++){
					if(i == value)imageArr[i].select = true;
					else imageArr[i].select = false;
				}
				select_callback && select_callback(imageArr[value])
			}
			function get_index(){return null}
			game.utils.setget(imageArr[i], "groupSelectIndex", set_index, get_index)
		}

		imageArr[0].groupSelectIndex = default_select_index
		// function set_index(value){
		// 	index = value;
		// 	for(var i = 0; i < imageArr.length; i++){
		// 		if(i == index)imageArr[i].select = true;
		// 		else imageArr[i].select = false;
		// 	}
		// 	trace("sjfklsdfjdklsfjkl")
		// 	select_callback && select_callback(imageArr[index])
		// }
		// function get_index(){return null}
		// game.utils.setget(this, "groupSelectIndex", set_index, get_index)
		
		// this.index = default_select_index;
	}


	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	
	/**
	 * 派发回调处理
	 */
	___frame.cb = (function(){
		function CB(){}
		
		CB._cbmArr = [];
		CB._pool = [];
		/**
		 * 添加事件
		 * @param   eventType 事件类型
		 * @param   callBack  事件回调
		 * @param   depth     事件深度 0<1 0先执行 1后执行
		 */
		CB.addEvent = function(eventType, callBack, depth) {
			if(!callBack)throw new Error("事件回调callback null")
			if(!eventType)throw new Error("给我把事件type天上")
			depth = arguments[2] != null?arguments[2]:100;

			if (!CB._cbmArr[eventType])CB._cbmArr[eventType] = [];

			var index = CB.getIndex(eventType, callBack)
			if (index != -1)CB._cbmArr[eventType][index].depth = depth?depth:index
			else {
				var handler = CB._pool.length?CB._pool.shift():new CBHandler()
				handler.func=callBack
				handler.depth=depth
				CB._cbmArr[eventType].push(handler)
			}
			CB._cbmArr[eventType].sort(CB.paixu)
		}

		CB.removeEvent = function(eventType, callBack) {
			if (!CB._cbmArr[eventType] || !CB._cbmArr[eventType].length) return
			var index = CB.getIndex(eventType, callBack)
			if (index != -1)CB._pool.push(CB._cbmArr[eventType].splice(index, 1))
		}

		/**
		 * 派发事件
		 * @param   eventType      事件类型
		 * @param   callBackParams 回调参数
		 */
		CB.dispatchEvent = function(eventType, callBackParams) {
			callBackParams = arguments[1] != null?arguments[1]:null;
			if (CB._cbmArr[eventType]) {
				for (var i = CB._cbmArr[eventType].length - 1; i >= 0; i--) 
				{
					CB._cbmArr[eventType][i]&&CB._cbmArr[eventType][i].func.apply(null, callBackParams)
				}
			}else { 
				// trace("[Warn] CBM没有对应的回调类型 - " + eventType) 
			}
		}
		
		CB.paixu = function(a,b){return b.depth - a.depth}
		
		/**
		 * 获取对应回调函数的下表
		 * @param   eventType 类型
		 * @param   func      回调函数
		 * @return  没有返回 -1
		 */
		CB.getIndex = function(eventType, func) {
			for (var i = 0, length = CB._cbmArr[eventType].length; i < length; i++) 
			{
				if (func == CB._cbmArr[eventType][i].func) {
					return i
				}
			}
			return -1
		}

		return CB
	})();

	function CBHandler(){
		var that = this
		/**回调方法*/
		this.func;
		/**深度*/
		this.depth;
	}
	
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
	

	___frame.cache = (function(){
		function Cache(){}

		Cache.id = 1
		Cache.poolArr = [];

		/**
		 * 注册 允许重复注册 因为一个类 可能有很多个缓存池
		 * @param  {[type]} class [description]
		 * @return {[type]}       [description]
		 */
		Cache.registe = function(class_, id_, recoverHandler){
			var id = id_?id_:Cache.id++;
			Cache.poolArr[id] = new CachePool();
			Cache.poolArr[id].id = id;
			Cache.poolArr[id].class = class_;
			Cache.poolArr[id].recoverHandler = recoverHandler;
			return id
		}
		
		/**
		 * 根据id获取一个实例
		 * @param  {[type]} id [description]
		 * @return {[type]}    [description]
		 */
		Cache.get = function(id){
			return Cache.poolArr[id].get()
		}

		Cache.recover = function(instance){
			if(!instance._$CachePoolID)throw new Error("_$CachePoolID 不存在" + ___frame.utils.getClassName(instance) + " " + instance)
			Cache.poolArr[instance._$CachePoolID].recover(instance)
		}

		Cache.recoverAll = function(id){
			Cache.poolArr[id].recoverAll()
		}

		return Cache
	})()

	var CachePool = (function(){
		function CachePool(){
			this.pool = [];
			this.use = [];
			this.id = null
			this.class = null
			this.recoverHandler = null
		}
		CachePool.prototype.get = function(){
			var instance = this.pool.length ? this.pool.shift() : new this.class()
			instance._$CachePoolID = this.id;
			this.use.push(instance)
			return instance
		}
		CachePool.prototype.recover = function(instance){
			var index = this.use.indexOf(instance)
			if(index != -1){
				this.use.splice(index, 1)
				this.pool.push(instance)
				//如果instance是显示对象 就移除掉
				___frame.utils.remove(instance)
				this.recoverHandler && this.recoverHandler.apply(instance, [instance])
			}
		}
		CachePool.prototype.recoverAll = function(){
			while(this.use.length){
				var instance = this.use.shift()
				this.pool.push(instance)
				//如果instance是显示对象 就移除掉
				___frame.utils.remove(instance)
				this.recoverHandler && this.recoverHandler.apply(instance, [instance])
			}
		}
		return CachePool
	})()

	window.game = ___frame
})();