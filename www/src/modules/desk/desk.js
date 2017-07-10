/* 
* @Author: 轻飘时刻
* @Date:   2017-04-11 14:45:25
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-26 13:46:34
*/
function Desk(){
    Desk.super(this)
    var that = this
    this.params = {
        "layer":game.scene.bottomLayer,
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":true,
        "up":false,
        "down":false,
        "left":false,
        "right":false
    }
    this.scale(game.scale, game.scale);

    var headInfo = new DeskHeadInfo(this)
    var deskChatWordManager = new DeskChatWordManager(this)

    this.readyPart = new DeskReady()
    this.playingPart = new DeskPlaying()

    this.createDesk = function(){
        game.utils.remove(that.readyPart);
        game.utils.remove(that.playingPart);
        game.utils.remove(headInfo);
        
        that.addChild(that.readyPart);
        that.readyPart.clear();

        that.addChild(that.btn_set)
        that.addChild(that.btn_chat)
        that.addChild(that.btn_voice)
        return this
    }
    
    this.addPlaying = function(){
        deskChatWordManager.clear()
        game.utils.remove(that.readyPart)
        game.utils.remove(headInfo)
        this.addChildAt(this.playingPart, 0)
    }

    this.added = function(){
        this.btn_set.on("click", this, setHandler)
        this.btn_chat.on("click", this, chatHandler)
        this.btn_voice.on("mousedown", this, clickSayHandler)

        game.cb.addEvent(__event.GAME_START, game_start)
        game.cb.addEvent(__event.DISSOLVE_ROOM, dissolveRoom)
        game.cb.addEvent(__event.REMOVE_DISSOLVE_ROOM, removeDissolveRoomResult)



        _index = 0
        game.cb.addEvent("show_yy_animation", showyyAnimation);
        game.cb.addEvent("show_yy_countAnimation", showyyCountAnimation);
        if(__yyTime > 0){ this.btn_voice.skin = "voice/talkcd" + __yyTime.toString() + ".png" }
        else{ this.btn_voice.skin = _yyArr[_yyArr.length - 1];this.btn_voice.on("mousedown", this, clickSayHandler); }
    }

    var _index = -1

    var _yyArr = ["voice/talkcd11.png", "voice/talkcd12.png", "voice/talkcd13.png", "voice/talkcd14.png", "voice/talkcd15.png", "voice/talkcd16.png", "voice/talkcd17.png", "voice/talkcd18.png", "voice/talkcd19.png"]
    var _index = 0
    function showyyAnimation(){
        _index = 0
        Laya.timer.clear(that, actionYyAnimation)
        Laya.timer.loop(60, that, actionYyAnimation)
    }

    function actionYyAnimation(){
        _index ++ 
        if(_index >= _yyArr.length){ 
            Laya.timer.clear(that, actionYyAnimation)
            that.btn_voice.on("mousedown", that, clickSayHandler);
        }else{ that.btn_voice.skin = _yyArr[_index] }
    }

    function showyyCountAnimation(value){ 
        that.btn_voice.skin = "voice/talkcd" + value.toString() + ".png" 
        that.btn_voice.off("mousedown", that, clickSayHandler);
    }


    this.removed = function(){
        this.btn_set.off("click", this, setHandler)
        this.btn_chat.off("click", this, chatHandler)
        this.btn_voice.off("mousedown", this, clickSayHandler)

        game.cb.removeEvent(__event.GAME_START, game_start)
        game.cb.removeEvent(__event.DISSOLVE_ROOM, dissolveRoom)
        game.cb.removeEvent(__event.REMOVE_DISSOLVE_ROOM, removeDissolveRoomResult)

        game.cb.removeEvent("show_yy_animation", showyyAnimation);
        game.cb.removeEvent("show_yy_countAnimation", showyyCountAnimation);
    }

    /**
     * 语音对话
     */
    function clickSayHandler(){
        __sound.button();
        __sound && __sound.stopGameMusic();
        game.stage.on("mouseup", this, sayToServer);
        game.stage.on("mouseout", this, sayToServer);
        that.btn_voice.off("mousedown", that, clickSayHandler);
        startRecord();
    }

    function sayToServer(){
        __sound && __sound.playGameMusic();
        game.stage.off("mouseup", this, sayToServer);
        game.stage.off("mouseout", this, sayToServer);
        stopRecord();
        startYYtime();
    }

    function removeDissolveRoomResult(){
        game.scene.remove(PanelDissolveResult)
    }

    function dissolveRoom(id, result){
        game.scene.add(PanelDissolveResult, [id, result])
    }

    function game_start(){
        __sound.playGameYx("start")
        if(!game.utils.stage(that.playingPart)){
            that.addPlaying()
        }else{
            
        }
        that.playingPart.clear()
        that.playingPart.addPlayer()
        that.playingPart.gameStart()
    }

    function setHandler(e){
        __sound.button()
        // game.server.send(3007)
        game.scene.add(PanelSet)
        // if(__data.desk.roomOwnerID == __data.ivo.id){
        //     game.server.send(3007)
        // }else if(game.scene.get(Desk).readyPart.parent){
            
        // }
    }

    function chatHandler(e){
        __sound.button()
        game.scene.add(PanelChat)
    }

    function voiceHandler(e){

    }
}
Laya.class(Desk, "Desk", DeskUI)