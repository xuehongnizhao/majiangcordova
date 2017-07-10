/* 
* @Author: 轻飘时刻
* @Date:   2017-03-13 10:27:41
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-22 19:39:32
*/
var __tips = __tips || {};

function TipsReLogin(){
    TipsReLogin.super(this)
    var that = this
    this.params = {
        "layer":game.scene.tips0Layer,
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":true,
        "up":false,
        "down":false,
        "left":false,
        "right":false
    }

    this.added = function(e){
        // game.server.close()
        this.btn_sure.on("click", this, sureHandler)
    }

    this.removed = function(e){
        this.btn_sure.off("click", this, sureHandler)
    }

    function sureHandler(e){
        try{
            // game.server.close()
            // window.location.href = "http://www.snyngame.com/hebmahjong/main.jsp"

            if(game.onLine){
                game.server.connectState = 1
                game.server.connect(config.ip, config.host)
                game.scene.remove(that)
                game.scene.add(TipsReConnect).ptConnect()
            }else{
                __proxy.tips("请检查网络环境")
            }
            
            // game.scene.removeAll()
            // game.scene.add(LoginPanel)
        }catch(e){
            
        }
    }
}
Laya.class(TipsReLogin, "TipsReLogin", TipsReLoginUI)

function TipsReConnect(){
    TipsReConnect.super(this)
    var that = this;
    this.params = {
        "layer":game.scene.tips0Layer,
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":true,
        "up":false,
        "down":false,
        "left":false,
        "right":false
    }

    this.added = function(){
        this.txt.text = "网络连接中断"
        that.txt.y = 75
        this.addChild(this.btn_r)
        this.btn_r.on("click", this, connectHandler)
    }

    this.removed = function(){
        clearInterval(id_updateTxt)
        clearTimeout(id_reconnect)
        this.btn_r.off("click", this, connectHandler)
    }

    this.fail = function(){
        this.txt.text = "网络连接中断"
        that.txt.y = 75
        this.addChild(this.btn_r)
    }

    this.ptConnect = function(){
        that.txt.text = "重新连接..."
        that.txt.y =  110
        game.utils.remove(that.btn_r)
    }

    var id_updateTxt = null
    var id_reconnect = null
    var time1 = 0
    this.delayConnect = function(){
        time1 = 5000
        that.txt.text = "重新连接 " + time1/1000
        that.txt.y = 110
        game.utils.remove(that.btn_r)
        clearInterval(id_updateTxt)
        clearInterval(id_reconnect)
        id_updateTxt = setInterval(updateText, 1000)
        id_reconnect = setTimeout(connectHandler, time1)
    }

    function updateText(){
        time1-=1000;
        that.txt.text = "重新连接 " + time1/1000
    }

    function connectHandler(e){
        clearInterval(id_updateTxt)
        clearTimeout(id_reconnect)
        that.txt.text = "重新连接..."
        that.txt.y =  110
        game.utils.remove(that.btn_r)

        // game.server.close()
        game.server.connectState = 2
        // if(game.onLine){
        game.server.connect(config.ip, config.host)
        // }else{
        //     that.added();
        //     __proxy.tips("请检查网络环境")
        // }
    }  
}
Laya.class(TipsReConnect, "TipsReConnect", TipsReConnectUI)

function TipsWord(){
    TipsWord.super(this)
    var that = this;
    this.params = {
        "layer":game.scene.tipsLayer,
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":false,
        "up":true,
        "down":false,
        "left":false,
        "right":false
    }

    // var id = game.cache.registe(Laya.Text)
    // var pool = game.cache.getPool(id)
    
    var use = [];
    var pool = [];

    this.width = game.width
    this.height = game.height / 2

    // this.graphics.drawRect(0, 0, this.width, this.height, "#ffff00");

    var _r = new Laya.Rectangle()
    _r.width = this.width
    _r.height = this.height + 4
    this.scrollRect = _r

    this.addTips = function(content){
        var txt = createTxt()
        txt.text = content
        txt.alpha = 1
        txt.color = "#ffffff"

        txt.bgColor = "#000000"
        //设置描边属性
        // txt.stroke = 2;
        // txt.strokeColor = "#000000";

        // 设置下划线
        // txt.underline = true;
        // txt.underlineColor = "#0";
        //设置描边属性
        txt.x = 0//(that.width - txt.textWidth) / 2
        txt.y = this.height
        this.addChild(txt)

        TweenMax.killTweensOf(txt)
        TweenMax.to(txt, 3, {delay:20, alpha:0, ease:Linear.easeNone, onComplete:txtCompleteHandler, onCompleteParams:[txt]})
        for(var i = 0; i < use.length; i++){
            var target = use[i];
            target.y = target.y - target.textHeight
            // TweenMax.to(target, 0.1, {y:target.y - target.height, ease:Linear.easeNone})
        }
    }   

    function txtCompleteHandler(e){
        TweenMax.killTweensOf(e)
        game.utils.remove(e)
        var index = use.indexOf(e)
        use.splice(index, 1)
        pool.push(e)
    }

    function createTxt(){
        var txt = pool.length?pool.shift():new Laya.Text()//game.cache.get(id)//new Laya.Text()
        txt.fontSize = 30
        use.push(txt)
        return txt
    }
}
Laya.class(TipsWord, "TipsWord", Laya.Sprite)

function tips_(content){
    game.scene.add(TipsWord).addTips(content)
}

function XtsTips(){
    XtsTips.super(this)
    var that = this

    this.params = {
                    "layer":game.scene.tipsLayer, 
                    "offx":0,
                    "offy":0,
                    "centerx":true,
                    "centery":true,
                    "up":false,
                    "down":false,
                    "left":false,
                    "right":false
                  }
    
    this.added = function(value){
        this.alpha = 1;
        this.txt.text = value

        Laya.Tween.clearAll(this)
        Laya.timer.clear(this, startTween)
        Laya.timer.once(500, this, startTween)
    }

    this.removed = function(){
        
    }

    function startTween(){
        Laya.Tween.to(this, {alpha:0, y:this.y - 100}, 300, null, Laya.Handler.create(this, completeTween))
    }

    function completeTween(){ game.scene.remove(this) }
}
Laya.class(XtsTips, "XtsTips", XtsTipsUI)

function OffLineTips(){
    OffLineTips.super(this)
    var that = this;
    this.params = {
        "layer":game.scene.tips0Layer,
        "offx":0,
        "offy":0,
        "centerx":false,
        "centery":false,
        "up":false,
        "down":false,
        "left":false,
        "right":false
    }

    this.width = game.width
    this.height = game.height

    var __m = new Laya.Sprite()//有遮挡
    __m.graphics.drawRect(0,0,___frame.width,___frame.height, "#000000");
    __m.size(___frame.width,___frame.height)
    __m.alpha = 0.3;
    this.addChild(__m)

    __m.on("click", this, function(e){})
    __m.on("mousedown", this, function(e){})
    __m.on("mouseup", this, function(e){})

    var __l = new Laya.Label()
    __l.color = "#ffffff"
    __l.fontSize = 30
    __l.text = "检测当前网络连接断开，请稍后"
    this.addChild(__l)
    __l.x = (this.width - __l.textField.textWidth) / 2
    __l.y = (this.height - __l.textField.textHeight) / 2

    var txt = new Laya.Label()


    this.added = function(){

    }

    this.removed = function(){

    }

}
Laya.class(OffLineTips, "OffLineTips", Laya.Sprite)