/* 
* @Author: 轻飘时刻
* @Date:   2017-05-17 18:18:28
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-17 19:51:54
*/
function PanelHelp(){
    PanelHelp.super(this)
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
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
    }

    function closeHandler(e){
        game.scene.remove(that)
        __sound.button()
    }
}
Laya.class(PanelHelp, "PanelHelp", PanelHelpUI)