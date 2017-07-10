/* 
* @Author: 轻飘时刻
* @Date:   2017-05-19 15:49:26
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-19 16:01:38
*/
function PanelRoomCardMall(){
    PanelRoomCardMall.super(this)
    var that = this
    this.params = {
        "layer":game.scene.panel0Layer,
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
        this.btn_close.on("click", this, closeHandler)
        this.bg.on("click", this, bgHandler)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        this.bg.off("click", this, bgHandler)
    }

    function bgHandler(e){
        e && __sound.button()
        game.scene.add(PanelPay)
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
    }
}
Laya.class(PanelRoomCardMall, "PanelRoomCardMall", PanelRoomCardMallUI)