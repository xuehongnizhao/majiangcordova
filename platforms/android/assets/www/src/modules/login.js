/* 
* @Author: 轻飘时刻
* @Date:   2017-02-13 16:42:25
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-06 18:29:44
*/
function Login(){
    Login.super(this)
    var that = this
    this.params = {
        "layer":game.scene.panel1Layer, 
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":true,
        "up":false,
        "down":false,
        "left":false,
        "right":false
    }

    var isAgree = true

    // var a = game.utils.getSprite(null, this.btn_login.skin)
    // this.addChild(a)
    // a.scaleX = 0.5
    // a.skewY = 0.5
    // 
    this.pt_1.y = game.height - this.pt_1.height

    this.added = function(){
        this.addEvent();
    }

    function loginHandler(e){
        // game.server.ws.close()
        __sound.button()
        if(!isAgree){
            __proxy.tips("请同意《用户使用协议》！")
        }else{
            that.btn_login.off("click", this, loginHandler)
            that.btn_agree.off("click", this, agreeHandler)
            try{
                app_login();
            }catch(e){
                if(game.server.isConnect)game.server.send(1001)
                else __proxy.showMainScene()
            }
        }
    }

    function agreeHandler(e){
        __sound.button()
        isAgree = !isAgree;
        this.btn_agree.skin = isAgree ? "login/agree.png" : "login/disagree.png"
    }

    this.removed = function(){
        this.btn_login.off("click", this, loginHandler)
        this.btn_agree.off("click", this, agreeHandler)
    }

    this.addEvent = function(){
        lianggebushiren = 0
        this.btn_login.on("click", this, loginHandler)
        this.btn_agree.on("click", this, agreeHandler)
    }

}
Laya.class(Login, "Login", LoginUI)