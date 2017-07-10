/* 
* @Author: 轻飘时刻
* @Date:   2017-02-25 14:50:00
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-19 15:55:33
*/
function MainSceneUp(){
    MainSceneUp.super(this)
    var that = this
    this.params = {
        "layer":game.scene.middleLayer, 
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":false,
        "up":true,
        "down":false,
        "left":false,
        "right":false
    }

    this.added = function(){
        this.btn_pay.on("click", this, payHandler)
        this.btn_quit.on("click", this, quitHandler)
        this.headFrame.on("click", this, headInfoHandler)
        update()

        game.cb.addEvent(__event.IVO, update)
    }

    this.removed = function(){
        this.btn_pay.off("click", this, payHandler)
        this.btn_quit.off("click", this, quitHandler)
        this.headFrame.off("click", this, headInfoHandler)

        game.cb.removeEvent(__event.IVO, update)
    }

    function update(){
        that.txt_name.text = __data.ivo.name
        that.txt_id.text   = "ID "+__data.ivo.id
        that.txt_roomCard.text  = "房卡 "+__data.ivo.roomCard
        __loadImage.load(__data.ivo.url, __data.ivo.id, that.head)
    }

    function headInfoHandler(e){
        __sound.button()
        trace("点击头像")
        game.server.send(2009)
        game.scene.add(PanelHeadInfo)
    }

    function payHandler(e){
        __sound.button()
        trace("点击充值")
        game.scene.add(PanelRoomCardMall)
    }

    function quitHandler(e){
        __sound.button()
        trace("点击退出")
        game.scene.add(PanelQuitSelect)
    }
}
Laya.class(MainSceneUp, "MainSceneUp", MainSceneUpUI)
