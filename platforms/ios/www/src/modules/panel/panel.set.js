/* 
* @Author: 轻飘时刻
* @Date:   2017-04-09 14:12:28
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-18 19:29:15
*/

function PanelSet(){
    PanelSet.super(this)
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
        this.btn_out.on("click", this, outHandler)
        this.btn_music.on("click", this, musicHandler)
        this.btn_sound.on("click", this, soundHandler)
        update()
        game.cb.addEvent(__event.UPDATE_VOLUME, update)
    }
    
    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        this.btn_out.off("click", this, outHandler)
        this.btn_music.off("click", this, musicHandler)
        this.btn_sound.off("click", this, soundHandler)
        game.cb.removeEvent(__event.UPDATE_VOLUME, update)
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
    }
    function outHandler(e){
        e && __sound.button()
        var mainScene = game.scene.get(MainScene)
        var desk = game.scene.get(Desk)
        if(mainScene && mainScene.parent){
            game.scene.add(PanelQuitSelect)
        }else if(desk && game.utils.stage(desk.readyPart)){

            if(__data.ivo.id == __data.desk.roomOwnerID || __data.desk.start){
                game.server.send(3007)
            }else {
                game.server.send(3006)
            }
        }else if(desk && game.utils.stage(desk.playingPart)){
            game.server.send(3007)
        }
        game.scene.remove(that)
    }
    function musicHandler(e){
        __sound.button()
        var a = __data.ivo.volumeMusic == 0 ? 1 : 0
        game.server.send(2002, __data.ivo.volumeSound, a) 
    }
    function soundHandler(e){
        __sound.button()
        var a = __data.ivo.volumeSound == 0 ? 1 : 0
        game.server.send(2002, a, __data.ivo.volumeMusic)
    }

    function update(){
        var mainScene = game.scene.get(MainScene)
        var desk = game.scene.get(Desk)
        if(mainScene && mainScene.parent){
            that.btn_out.skin = "panel_set/tcdl.png"
        }else if(desk && game.utils.stage(desk.readyPart)){
            if(__data.ivo.id == __data.desk.roomOwnerID || __data.desk.start){
                that.btn_out.skin = "panel_set/jiesan.png"
            }else{
                that.btn_out.skin = "panel_set/tcyx.png"
            }
        }else if(desk && game.utils.stage(desk.playingPart)){
            that.btn_out.skin = "panel_set/jiesan.png"
        }

        if(__data.ivo.volumeMusic)that.btn_music.skin = "panel_set/off.png"
        else that.btn_music.skin = "panel_set/on.png"

        if(__data.ivo.volumeSound)that.btn_sound.skin = "panel_set/off.png"
        else that.btn_sound.skin = "panel_set/on.png"
    }
}
Laya.class(PanelSet, "PanelSet", PanelSetUI)