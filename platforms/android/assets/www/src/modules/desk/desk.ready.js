/* 
* @Author: 轻飘时刻
* @Date:   2017-04-11 15:13:52
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-22 10:38:08
*/
function DeskReady(){
    DeskReady.super(this)
    var that = this
    
    new DeskHeadLogic(this.head_up, __data.desk.upPlayervo)
    new DeskHeadLogic(this.head_down, __data.desk.downPlayervo)
    new DeskHeadLogic(this.head_left, __data.desk.leftPlayervo)
    new DeskHeadLogic(this.head_right, __data.desk.rightPlayervo)
    
    this.on("added", this, function(e){
        this.btn_ready.on("click", this, that.readyHandler)
        this.btn_cancelReady.on("click", this, that.cancelReadyHandler)
        this.btn_invite.on("click", this, inviteHandler)
        updateRoomID()
        game.cb.addEvent(__event.UPDATE_ROOM_ID, updateRoomID)
        game.cb.addEvent(__event.GOIN_PLAYER, goin_player)
        game.cb.addEvent(__event.UPDATE_READY_STATE, updateReadyState)
        game.cb.addEvent(__event.OTHER_PLAYER_LEAVE_ROOM, otherPlayerLeaveRoom)
        game.cb.addEvent(__event.UPDATE_PLAYER_SCORE, updatePlayerScore)
        game.cb.addEvent(__event.UPDATE_PLAYER_OFFLINE, updatePlayerOffLine)
    })

    this.on("removed", this, function(e){
        this.btn_ready.off("click", this, that.readyHandler)
        this.btn_cancelReady.off("click", this, that.cancelReadyHandler)
        this.btn_invite.off("click", this, inviteHandler)
        game.cb.removeEvent(__event.UPDATE_ROOM_ID, updateRoomID)
        game.cb.removeEvent(__event.GOIN_PLAYER, goin_player)
        game.cb.removeEvent(__event.UPDATE_READY_STATE, updateReadyState)
        game.cb.removeEvent(__event.OTHER_PLAYER_LEAVE_ROOM, otherPlayerLeaveRoom)
        game.cb.removeEvent(__event.UPDATE_PLAYER_SCORE, updatePlayerScore)
        game.cb.removeEvent(__event.UPDATE_PLAYER_OFFLINE, updatePlayerOffLine)
    })

    function updatePlayerOffLine(id){
        var dir = __data.desk.idToDir[id];
        that["head_"+dir].updateOffLineState()
    }

    function updatePlayerScore(){
        that.head_up.updateInfo()
        that.head_down.updateInfo()
        that.head_left.updateInfo()
        that.head_right.updateInfo()
    }

    function otherPlayerLeaveRoom(playerID){
        var dir = __data.desk.idToDir[playerID];
        __data.desk.idToPlayervo[playerID].readyState = false
        var pos = __data.desk.idToPlayervo[playerID].position
        delete __data.desk.idToPlayervo[playerID]
        delete __data.desk.posToPlayervo[pos]
        game.utils.remove(that["head_"+dir])
        that["head_"+dir].clear()
    }

    function updateReadyState(){
        that.head_up.updateReadyState();
        that.head_down.updateReadyState();
        that.head_left.updateReadyState();
        that.head_right.updateReadyState();

        if(that.head_down.vo){
            if(that.head_down.vo.readyState){
                that.addChild(that.btn_cancelReady)
                game.utils.remove(that.btn_ready)
            }else {
                that.addChild(that.btn_ready)
                game.utils.remove(that.btn_cancelReady)
            }
        }
    }

    function updateRoomID(){
        that.txt_roomID.text = "房间ID："+__data.desk.roomID
    }

    function goin_player(){
        if(__data.desk.upPlayervo){
            if(!that.head_up.vo){
                that.addChild(that.head_up);
                that.head_up.vo = __data.desk.upPlayervo
                that.head_up.updateInfo()
                that.head_up.updateReadyState()
            }
        }else game.utils.remove(that.head_up)

        if(__data.desk.downPlayervo){
            if(!that.head_down.vo){
                that.addChild(that.head_down);
                that.head_down.vo = __data.desk.downPlayervo
                that.head_down.updateInfo()
                that.head_down.updateReadyState()

                that.addChild(that.play_des)
                that.addChild(that.btn_invite)

                //更新按钮
                updateReadyState()
                // that.addChild(that.btn_cancelReady)
                // that.addChild(that.btn_ready)

                var a = __data.desk.play.split(",")
                var b = [null, "七对", "只碰不吃", "垃圾胡", "飞苍蝇"]
                var s = ""
                for(var i = 0; i < a.length; i++){
                    if(a[i])s += "\n" + b[a[i]]
                }
                s = s.replace("\n", "")
                that.play_des.text = s
            }
        }else game.utils.remove(that.head_down)

        if(__data.desk.leftPlayervo){
            if(!that.head_left.vo){
                that.addChild(that.head_left);
                that.head_left.vo = __data.desk.leftPlayervo
                that.head_left.updateInfo()
                that.head_left.updateReadyState()
            }
        }else game.utils.remove(that.head_left)

        if(__data.desk.rightPlayervo){
            if(!that.head_right.vo){
                that.addChild(that.head_right);
                that.head_right.vo = __data.desk.rightPlayervo
                that.head_right.updateInfo()
                that.head_right.updateReadyState()
            }
        }else game.utils.remove(that.head_right)
    }

    this.readyHandler = function(e){
        // game.scene.get(Desk).addPlaying()
        game.server.send(6021)
    }

    this.cancelReadyHandler = function(e){
        game.server.send(6021)
    }

    var a = 1
    function inviteHandler(e){
        trace("点击邀请")
        try{
            wx_share_pengyou(__data.desk.roomID, __data.desk.totalMatch)
        }catch(e){
            aabbcc()
            aabbcc()
            aabbcc()
        }
    }

    function aabbcc(){
        var u = window.location.href.split("?")[0]
        var id = parseInt(__data.login.id) + a
        u = u + "?userid=" + id + "&roomID="+__data.desk.roomID
        window.open(u)
        a++
    }

    this.clear = function(){
        this.head_up.clear()
        this.head_down.clear()
        this.head_left.clear()
        this.head_right.clear()

        game.utils.remove(this.head_up)
        game.utils.remove(this.head_down)
        game.utils.remove(this.head_left)
        game.utils.remove(this.head_right)
        game.utils.remove(this.play_des)
        game.utils.remove(this.btn_invite)
        game.utils.remove(this.btn_cancelReady)
        game.utils.remove(this.btn_ready)
    }
}
Laya.class(DeskReady, "DeskReady", DeskReadyUI)

