/* 
* @Author: 轻飘时刻
* @Date:   2017-04-14 14:13:56
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-06 11:01:42
*/
/**
 * 麻将游戏中 操作的几个命令
 */
function DeskPlayingAct(container_){
    DeskPlayingAct.super(this)
    var that = this
    var contianer = container_

    this.cardGroup = null

    this.act_ting = game.utils.getSprite(null, "desk/act_ting.png")
    this.act_hu   = game.utils.getSprite(null, "desk/act_hu.png")
    this.act_peng  = game.utils.getSprite(null, "desk/act_hit.png")
    this.act_chi  = game.utils.getSprite(null, "desk/act_eat.png")
    this.act_gang = game.utils.getSprite(null, "desk/act_gang.png")
    this.act_pass = game.utils.getSprite(null, "desk/act_pass.png")
    this.act_chiting = game.utils.getSprite(null, "desk/act_chiting.png")
    this.act_pengting = game.utils.getSprite(null, "desk/act_pengting.png")
    
    this.act_ting.pivot(this.act_ting.width / 2, this.act_ting.height / 2)
    this.act_hu.pivot(this.act_hu.width / 2, this.act_hu.height / 2)
    this.act_peng.pivot(this.act_peng.width / 2, this.act_peng.height / 2)
    this.act_chi.pivot(this.act_chi.width / 2, this.act_chi.height / 2)
    this.act_gang.pivot(this.act_gang.width / 2, this.act_gang.height / 2)
    this.act_pass.pivot(this.act_pass.width / 2, this.act_pass.height / 2)
    this.act_chiting.pivot(this.act_chiting.width / 2, this.act_chiting.height / 2)
    this.act_pengting.pivot(this.act_pengting.width / 2, this.act_pengting.height / 2)

    this.on("added", this, function(e){
        this.act_ting.on("click", this, tingHandler)
        this.act_hu.on("click", this, huHandler)
        this.act_peng.on("click", this, pengHandler)
        this.act_chi.on("click", this, chiHandler)
        this.act_gang.on("click", this, gangHandler)
        this.act_pass.on("click", this, passHandler)
        this.act_chiting.on("click", this, chitingHandler)
        this.act_pengting.on("click", this, pengtingHandler)
    })

    this.on("removed", this, function(e){
        this.act_ting.off("click", this, tingHandler)
        this.act_hu.off("click", this, huHandler)
        this.act_peng.off("click", this, pengHandler)
        this.act_chi.off("click", this, chiHandler)
        this.act_gang.off("click", this, gangHandler)
        this.act_pass.off("click", this, passHandler)
        this.act_chiting.off("click", this, chitingHandler)
        this.act_pengting.off("click", this, pengtingHandler)
    })

    function chitingHandler(e){
        trace("点击 吃听")
        game.utils.remove(that)
        game.server.send(6003, 9, that.cardGroup.chiting[0][2])
    }

    function pengtingHandler(e){
        trace("点击 碰听")
        game.utils.remove(that)
        game.server.send(6003, 10, that.cardGroup.pengting[0][2])
    }

    function tingHandler(e){
        trace("点击 听")
        game.utils.remove(that)
        game.server.send(6003, 6)
    }

    function huHandler(e){
        trace("点击 胡")
        game.utils.remove(that)
    }

    function pengHandler(e){
        trace("点击 碰")
        game.utils.remove(that)

        if(that.cardGroup.peng.length == 1){
            game.server.send(6003, 2, that.cardGroup.peng[0][2])
        }else {
            trace("弹出 碰 牌组")
            game.cb.dispatchEvent(__event.DESK_ADD_CARD_GROUP, [that.cardGroup.peng])
        }
    }

    function chiHandler(e){
        trace("点击 吃")
        game.utils.remove(that)

        if(that.cardGroup.chi.length == 1){
            game.server.send(6003, 3, that.cardGroup.chi[0][2])
        }else {
            trace("弹出 吃 牌组")
            game.cb.dispatchEvent(__event.DESK_ADD_CARD_GROUP, [that.cardGroup.chi, "chi"])
        }
    }

    function gangHandler(e){
        trace("点击 杠")
        game.utils.remove(that)

        if(that.cardGroup.gang.length == 1){
            game.server.send(6003, 4, that.cardGroup.gang[0][2])
        }else {
            trace("弹出 吃 牌组")
            game.cb.dispatchEvent(__event.DESK_ADD_CARD_GROUP, [that.cardGroup.gang, "gang"])
        }
    }

    function passHandler(e){
        trace("点击 过")
        game.utils.remove(that)
        game.server.send(6003, 11)
        game.cb.dispatchEvent(__event.ACT_PASS)
    }

    var _act = ""
    function set_act(value){
        trace("设置命令：", value)
        _act = value
        game.utils.removeAll(that)
        var a = _act//.split(",")
        a.reverse();
        for(var i = 0; i < a.length; i++){
            var btn = that["act_"+a[i]]
            btn.x = -this.act_ting.width - this.act_ting.width * i
            that.addChild(btn)
        }
    }
    function get_act(){
        return _act
    }
    game.utils.setget(this, "act", set_act, get_act)
}
Laya.class(DeskPlayingAct, "DeskPlayingAct", Laya.Sprite)