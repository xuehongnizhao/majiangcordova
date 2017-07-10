/* 
* @Author: 轻飘时刻
* @Date:   2017-04-09 14:20:53
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-13 15:50:09
*/
function PanelBagInfo(){
    PanelBagInfo.super(this)
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

    this.scale(game.scale, game.scale)

    this.added = function(){
        this.btn_close.on("click", this, closeHandler)
        // this.btn_mall.on("click", this, mallHandler)
        // update()
        // game.cb.addEvent(__event.IVO, update)
    }

    this.removed= function(){
        this.btn_close.off("click", this, closeHandler)
        // this.btn_mall.off("click", this, mallHandler)
        // game.cb.removeEvent(__event.IVO, update)
    }

    // function update(){
    //     that.txt_roomCard.text = __data.ivo.roomCard
    // }

    // function mallHandler(e){
    //     e && __sound.button()
    //     trace("打开商城了")
    //     game.scene.add(PanelMall)
    // }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
    }
}
Laya.class(PanelBagInfo, "PanelBagInfo", PanelBagInfoUI)