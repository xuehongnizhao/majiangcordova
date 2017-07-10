/* 
* @Author: 轻飘时刻
* @Date:   2017-05-10 22:42:47
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-12 22:06:10
*/
function PanelPay(){
    PanelPay.super(this)
    var that = this;
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
    }

    this.removed = function(){ 
        this.btn_close.off("click", this, closeHandler)
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
    }
}
Laya.class(PanelPay, "PanelPay", PanelPayPTUI)