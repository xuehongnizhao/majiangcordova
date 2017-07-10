/* 
* @Author: 轻飘时刻
* @Date:   2017-05-11 20:01:52
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-02 18:07:47
*/

var __replay = __replay || {};
__replay.replayIndex = 0
__replay.replayDelay = 1000
__replay.replayData = []
__replay.replaying = false
__replay.play = function(arr){
    var replay = game.scene.get(Replay)
    if(replay&&replay.parent){
        trace1("播放中")
        return
    }
    trace1(6024, arr.indexOf("6024"))
    // return 

    game.scene.removeAll()
    game.scene.add(DeskBG)
    game.scene.add(Desk).createDesk()
    game.cb.dispatchEvent(__event.GAME_START)
    game.scene.add(Replay);

    __replay.replaying = true
    __replay.replayData = arr
    __replay.replayIndex = 0
    __replay.replayDelay = 1000

    for(var i = 0; i < __replay.replayData.length; i += 2){
        var id = parseInt(__replay.replayData[i]);
        var body = __replay.replayData[i+1];
        if(id != 3015){
            __replay.replayIndex = i
            break;
        }else {
            body = body.split(",")
            game.server.manageMessage(id, body)
        }
    }

    Laya.timer.loop(1000, __replay, __replay.playNext)
    __replay.playNext()
}

__replay.playNext = function(){
    if(!__replay.replayData[__replay.replayIndex] || !__replay.replayData[__replay.replayIndex+1]){
        Laya.timer.clear(__replay, __replay.playNext)
        return
    }
    var id = parseInt(__replay.replayData[__replay.replayIndex])
    var body = __replay.replayData[__replay.replayIndex+1]
    body = body.split(",")
    game.server.manageMessage(id, body)
    __replay.replayIndex += 2
}

__replay.replay_pauseHandler = function(){
    __replay.replaying = false
    Laya.timer.clear(__replay, __replay.playNext)
}
__replay.replay_playHandler = function(){
    __replay.replaying = true
    Laya.timer.clear(__replay, __replay.playNext)
    Laya.timer.loop(__replay.replayDelay, __replay, __replay.playNext)
}
__replay.replay_addVHandler = function(){
    if(!__replay.replaying)return
    __replay.replayDelay+=100
    __replay.replay_playHandler()
    // Laya.timer.loop(__replay.replayDelay, __replay, __replay.playNext)
}
__replay.replay_reduceVHandler = function(){
    if(!__replay.replaying)return
    __replay.replayDelay-=100
    if(__replay.replayDelay < 200)__replay.replayDelay = 200
    __replay.replay_playHandler()
    // Laya.timer.loop(__replay.replayDelay, __replay, __replay.playNext)
}










function Replay(){
    Replay.super(this)
    var that = this
    this.params = {
        "layer":game.scene.panel1Layer,
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
        this.btn_play.skin = "replay/pause.png"
        this.on("click", this, aabbcc_handler)
        // this.on("mousedown", this, aabbcc_handler)
        // this.on("mouseup", this, aabbcc_handler)
        // this.on("mouseover", this, aabbcc_handler)

        this.btn_add.on("click", this, __replay.replay_reduceVHandler)
        this.btn_reduce.on("click", this, __replay.replay_addVHandler)
        this.btn_play.on("click", this, aabbccdd)
        this.btn_out.on("click", this, outHandler)
    }

    this.removed = function(){
        this.off("click", this, aabbcc_handler)

        this.btn_add.off("click", this, __replay.replay_reduceVHandler)
        this.btn_reduce.off("click", this, __replay.replay_addVHandler)
        this.btn_play.off("click", this, aabbccdd)
        this.btn_out.off("click", this, outHandler)
    }

    function aabbccdd(e){
        if(this.btn_play.skin == "replay/pause.png"){
            __replay.replay_pauseHandler()
        }else{
            __replay.replay_playHandler()
        }
        this.btn_play.skin = this.btn_play.skin == "replay/pause.png" ? "replay/go.png" : "replay/pause.png"

        
    }

    function outHandler(e){
        __replay.replay_pauseHandler()
        __proxy.showMainScene()
    }

    function aabbcc_handler(e){

    }
}
Laya.class(Replay, "Replay", ReplayUI)