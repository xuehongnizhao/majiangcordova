/* 
* @Author: 轻飘时刻
* @Date:   2017-05-17 20:06:06
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-17 20:09:20
*/
function PanelQuitSelect(){
    PanelQuitSelect.super(this)
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
        this.btn_sure.on("click", this, sureHandler)
        this.btn_cancel.on("click", this, cancelHandler)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        this.btn_sure.off("click", this, sureHandler)
        this.btn_cancel.off("click", this, cancelHandler)
    }

    function closeHandler(e){
        game.scene.remove(that)
    }

    function sureHandler(e){
        game.server.connectState = 1
        game.server.connect(config.ip, config.host)
    }

    function cancelHandler(e){
        game.scene.remove(that)
    }

}
Laya.class(PanelQuitSelect, "PanelQuitSelect", PanelQuitSelectUI)