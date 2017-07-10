/* 
* @Author: 轻飘时刻
* @Date:   2017-04-07 20:58:00
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-27 17:48:46
*/
function PanelCreateRoom(){
    PanelCreateRoom.super(this)
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

    var default_panel = null
    var default_data = {}
    var data_qiaoma = {
        "bigPlay":1,
        "jushu":1,
        "totalMatch":8,
        "dihua":20,
        "hupai":0,
        "lazi":20,
        "play":""
    }
    var data_baida = {
        "bigPlay":2,
        "jushu":1,
        "totalMatch":8,
        "dihua":20,
        "hupai":1,
        "lazi":30,
        "play":""
    }
    default_data = data_qiaoma

    game.utils.remove(this.panel_qiaoma)
    game.utils.remove(this.panel_baida)

    //百搭 敲麻 玩法选择
    new game.BtnGroupSingleSelect([this.btn_qiaoma, this.btn_baida], ["panel_createRoom/play_qiaoma1.png","panel_createRoom/play_baida1.png"], ["panel_createRoom/play_qiaoma2.png","panel_createRoom/play_baida2.png"], function(target, e){
        e && __sound.button()
        game.utils.remove(default_panel)
        if(that.btn_qiaoma == target){default_panel = that.panel_qiaoma;default_data = data_qiaoma}
        else {default_panel = that.panel_baida; default_data = data_baida}
        that.addChild(default_panel)
    }, 0)

    //房间模式选择
    this.panel_qiaoma.btn_roomModel1.__value = 1
    this.panel_qiaoma.btn_roomModel2.__value = 2
    new game.BtnGroupSingleSelect([this.panel_qiaoma.btn_roomModel1, this.panel_qiaoma.btn_roomModel2], "panel_createRoom/q1.png", "panel_createRoom/q2.png", function(target, e){
        e && __sound.button()
        data_qiaoma.jushu = target.__value//__data.ivo["mj"+target.__value+"count"];
    }, 0)

    this.panel_baida.btn_roomModel1.__value = 1
    this.panel_baida.btn_roomModel2.__value = 2
    new game.BtnGroupSingleSelect([this.panel_baida.btn_roomModel1, this.panel_baida.btn_roomModel2], "panel_createRoom/q1.png", "panel_createRoom/q2.png", function(target, e){
        e && __sound.button()
        data_baida.jushu = target.__value//__data.ivo["mj"+target.__value+"count"];
    }, 0)

    //底花 选择
    // new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_qiaoma.btn_dihua1, true, function(e){
    //     if(e.select)data_qiaoma.dihua = 20
    //     else data_qiaoma.dihua = 0
    // }, 0)

    // new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_baida.btn_dihua1, true, function(e){
    //     if(e.select)data_baida.dihua = 20
    //     else data_baida.dihua = 0
    // }, 0)

    //胡牌选择
    // new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_qiaoma.btn_hupai1, true, function(e){
    //     if(e.select)data_qiaoma.hupai = 0
    //     else data_qiaoma.hupai = -1
    // }, 0)

    //起胡选择
    this.panel_baida.btn_qihu1.__value = 1
    this.panel_baida.btn_qihu2.__value = 2
    this.panel_baida.btn_qihu3.__value = 3
    new game.BtnGroupSingleSelect([this.panel_baida.btn_qihu1, this.panel_baida.btn_qihu2, this.panel_baida.btn_qihu3], "panel_createRoom/q1.png", "panel_createRoom/q2.png", function(target, e){
        e && __sound.button()
        data_baida.hupai = target.__value
    }, 0)

    //辣子选择
    this.panel_qiaoma.btn_lazi1.__value = 20
    this.panel_qiaoma.btn_lazi2.__value = 30
    this.panel_qiaoma.btn_lazi3.__value = 50
    new game.BtnGroupSingleSelect([this.panel_qiaoma.btn_lazi1, this.panel_qiaoma.btn_lazi2, this.panel_qiaoma.btn_lazi3], "panel_createRoom/q1.png", "panel_createRoom/q2.png", function(target, e){
        e && __sound.button()
        data_qiaoma.lazi = target.__value
    }, 0)

    this.panel_baida.btn_lazi1.__value = 30
    this.panel_baida.btn_lazi2.__value = 50
    new game.BtnGroupSingleSelect([this.panel_baida.btn_lazi1, this.panel_baida.btn_lazi2], "panel_createRoom/q1.png", "panel_createRoom/q2.png", function(target, e){
        e && __sound.button()
        data_baida.lazi = target.__value
    }, 0)

    //玩法选择
    function playSelectHandler(e){
        e && __sound.button()
        data_qiaoma.play = ""
        for(var i = 1; i <=4; i++){
            var a = that.panel_qiaoma["btn_play"+i]
            if(a.select)data_qiaoma.play+=","+i
        }
        data_qiaoma.play = data_qiaoma.play.replace(",","")
    }
    new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_qiaoma.btn_play1, false, playSelectHandler)
    new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_qiaoma.btn_play2, false, playSelectHandler)
    new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_qiaoma.btn_play3, false, playSelectHandler)
    new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_qiaoma.btn_play4, false, playSelectHandler)

    function playSelectHandler1(e){
        e && __sound.button()
        data_baida.play = ""
        for(var i = 1; i <=4; i++){
            var a = that.panel_baida["btn_play"+i]
            if(a.select)data_baida.play+=","+i
        }
        data_baida.play = data_baida.play.replace(",","")
    }
    new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_baida.btn_play1, false, playSelectHandler1)
    new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_baida.btn_play2, false, playSelectHandler1)
    new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_baida.btn_play3, false, playSelectHandler1)
    new game.BtnSelect("panel_createRoom/q1.png", "panel_createRoom/q2.png", this.panel_baida.btn_play4, false, playSelectHandler1)


    this.added = function(){
        this.btn_close.on("click", this, closeHandler)
        this.btn_createRoom.on("click", this, createRoomHandler)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        this.btn_createRoom.on("click", this, createRoomHandler)
    }

    function createRoomHandler(e){
        e && __sound.button()
        trace("创建房间信息：")
        default_data.totalMatch = __data.ivo["mj"+default_data.jushu+"count"]
        game.server.send(3005, default_data)
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(this)
    }
}
Laya.class(PanelCreateRoom, "PanelCreateRoom", PanelCreateRoomUI)