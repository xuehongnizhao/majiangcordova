/* 
* @Author: 轻飘时刻
* @Date:   2017-03-31 16:55:40
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-03-31 16:57:06
*/
function BuyRoomCardPTPanel(){
    BuyRoomCardPTPanel.super(this)
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
        updateContent()
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
    }

    function updateContent(){
        that.txt.text = __data.ivo.payContent
    }

    game.cb.addEvent("payEvent", updateContent)

    function closeHandler(e){
        game.scene.remove(this)
    }
}
Laya.class(BuyRoomCardPTPanel, "BuyRoomCardPTPanel", BuyRoomCardPTPanelUI)