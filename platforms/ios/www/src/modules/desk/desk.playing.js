/* 
* @Author: 轻飘时刻
* @Date:   2017-04-11 17:24:44
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-06 14:05:19
*/
function DeskPlaying(){
    DeskPlaying.super(this)
    var that = this
    
    var url_a = [];
    for(var i=0;i<10;i++)url_a.push("desk/"+i+".png")
    var txt_surplusCard = new game.NumText(url_a)
    this.addChild(txt_surplusCard)
    txt_surplusCard.text = "108"
    txt_surplusCard.x = that.icon_x.x + that.icon_x.width
    txt_surplusCard.y = that.icon_x.y - 11

    new DeskHeadLogic(this.head_up, __data.desk.upPlayervo)
    new DeskHeadLogic(this.head_down, __data.desk.downPlayervo)
    new DeskHeadLogic(this.head_left, __data.desk.leftPlayervo)
    new DeskHeadLogic(this.head_right, __data.desk.rightPlayervo)

    this.rightOutCard = new DeskPlayingOutCardRight()
    this.addChildAt(this.rightOutCard, 0)
    this.rightOutCard.x = 1007
    this.rightOutCard.y = 180
    this.rightOutCard.update()

    this.leftOutCard = new DeskPlayingOutCardLeft()
    this.addChildAt(this.leftOutCard, 0)
    this.leftOutCard.x = 230
    this.leftOutCard.y = 180
    this.leftOutCard.update()

    this.downOutCard = new DeskPlayingOutCardDown()
    this.addChildAt(this.downOutCard, 0)
    this.downOutCard.x = 450
    this.downOutCard.y = 520
    this.downOutCard.update()

    this.upOutCard = new DeskPlayingOutCardUp()
    this.addChildAt(this.upOutCard, 0)
    this.upOutCard.x = 450
    this.upOutCard.y = 88
    this.upOutCard.update()

    this.upPlayerCard = new DeskPlayingUpPlayerCard()
    this.addChild(this.upPlayerCard)
    this.upPlayerCard.x = 450
    this.upPlayerCard.y = 20
    this.upPlayerCard.update()

    this.leftPlayerCard = new DeskPlayingLeftPlayerCard()
    this.addChild(this.leftPlayerCard)
    this.leftPlayerCard.x = 180
    this.leftPlayerCard.y = 20
    this.leftPlayerCard.update()

    this.rightPlayerCard = new DeskPlayingRightPlayerCard()
    this.addChild(this.rightPlayerCard)
    this.rightPlayerCard.x = 1070
    this.rightPlayerCard.y = 20
    this.rightPlayerCard.update()

    this.downPlayerCard = new DeskPlayingDownPlayerCard()
    this.addChild(this.downPlayerCard)
    this.downPlayerCard.x = 40
    this.downPlayerCard.y = 600
    this.downPlayerCard.update()

    //操作命令
    var act = new DeskPlayingAct(this)
    act.x = 1350
    act.y = 470
    // act.act = "ting,eat,hit,gang,hu,pass"
    
    //转盘转动
    // TweenMax.to(this.direction, 2, {rotation:720, repeat:-1, ease:Linear.easeNone})
    
    //操作命令特效
    // var actEffect = new DeskEffectAct()
    this.up_actEffect = new DeskEffectAct()
    this.down_actEffect = new DeskEffectAct()
    this.left_actEffect = new DeskEffectAct()
    this.right_actEffect = new DeskEffectAct()
    this.up_actEffect.x = 640
    this.up_actEffect.y = 127
    this.down_actEffect.x = 640
    this.down_actEffect.y = 560
    this.left_actEffect.x = 278
    this.left_actEffect.y = 300
    this.right_actEffect.x = 1010
    this.right_actEffect.y = 300
    
    //箭头
    new DeskPlayingArrow(this, this.arrow)
    // game.cb.dispatchEvent(__event.DESK_ADD_ARROW, [100, 200])
    // 
    // 
    //出牌牌组
    var cardGroup = new DeskPlayingCardGroup(this)
    cardGroup.x = 50
    cardGroup.y = 500

    var ting = new DeskPlayingTingSign(this)
    // ting.update()
    
    var hupai = new DeskPlayingHupaiList()
    hupai.x = 210
    hupai.y = 470

    this.cangying = new DeskEffectCangying()
    this.cangying.x = this.width/2
    this.cangying.y = this.height/2

    this.huEffect_up = new DeskEffectHu()
    this.huEffect_up.x = 640;this.huEffect_up.y = 184
    this.huEffect_down = new DeskEffectHu()
    this.huEffect_down.x = 640;this.huEffect_down.y = 530
    this.huEffect_left = new DeskEffectHu()
    this.huEffect_left.x = 350;this.huEffect_left.y = 273
    this.huEffect_right = new DeskEffectHu()
    this.huEffect_right.x = 977;this.huEffect_right.y = 272

    this.buhua_up = new DeskEffectBuhua()
    this.buhua_up.x = 640;this.buhua_up.y = 184
    this.buhua_down = new DeskEffectBuhua()
    this.buhua_down.x = 640;this.buhua_down.y = 450
    this.buhua_left = new DeskEffectBuhua()
    this.buhua_left.x = 350;this.buhua_left.y = 273
    this.buhua_right = new DeskEffectBuhua()
    this.buhua_right.x = 977;this.buhua_right.y = 272

    this.on("added", this, function(e){
        that.arrow.clear()
        // clearInterval(xxxOutCard)
        // aabbcc = setInterval(xxxOutCard, 500)
        // downPlayerCard.addEvent()
        TweenMax.to(this.direction_light, 0.5, {alpha:0, repeat:-1, yoyo:true, ease:Linear.easeNone})
        
        game.cb.addEvent(__event.DESK_ADD_CARD_GROUP, deskAddCardGroup)
        game.cb.addEvent(__event.DESK_REMOVE_CARD_GROUP, deskRemoveCardGroup)
        game.cb.addEvent(__event.DESK_ADD_ACT, deskAddAct)
        game.cb.addEvent(__event.DESK_REMOVE_ACT, deskRemoveAct)

        game.cb.addEvent(__event.UPDATE_PLAYER_CARD, updatePlayerCard)
        game.cb.addEvent(__event.UPDATE_OUT_CARD, updateOutCard)
        game.cb.addEvent(__event.PLAYER_OUT_CARD, playerOutCard)

        game.cb.addEvent(__event.PT_I_OUT_CARD, ptICanOutCard)
        game.cb.addEvent(__event.I_BOUNCE_CARD, iBounceCard)
        game.cb.addEvent(__event.ACT_PASS, iPass)

        game.cb.addEvent(__event.ADD_DESK_ACT_EFFECT, addActEffect)

        game.cb.addEvent(__event.ADD_BAIDA, addBaida)
        game.cb.addEvent(__event.NEXT_MATCH_CLEAR_DESK, nextMatchClearDesk)

        game.cb.addEvent(__event.UPDATE_READY_STATE, updatePlayerReadState)

        game.cb.addEvent(__event.GOIN_PLAYER, goin_player)
        game.cb.addEvent(__event.ADD_HUPAI, addHupaiList)
        game.cb.addEvent(__event.ADD_CANGYING_EFFECT, addCangyingEffect)

        game.cb.addEvent(__event.UPDATE_SURPLUS_CARD_NUM, updateSurplusCardNum)
        game.cb.addEvent(__event.UPDATE_DIRECTION_LIGHT, updateDirectionLight)
        game.cb.addEvent(__event.ADD_HU_EFFECT, addHuEffect)
        game.cb.addEvent(__event.UPDATE_HEAD_BUHUA_NUM, addHeadBuhuaNum)
        game.cb.addEvent(__event.UPDATE_PLAYER_SCORE, updatePlayerScore)
        game.cb.addEvent(__event.UPDATE_PLAYER_OFFLINE, updatePlayerOffLine)
    })

    this.on("removed", this, function(e){
        TweenMax.killTweensOf(this.direction_light)

        game.cb.removeEvent(__event.DESK_ADD_CARD_GROUP, deskAddCardGroup)
        game.cb.removeEvent(__event.DESK_REMOVE_CARD_GROUP, deskRemoveCardGroup)
        game.cb.removeEvent(__event.DESK_ADD_ACT, deskAddAct)
        game.cb.removeEvent(__event.DESK_REMOVE_ACT, deskRemoveAct)

        game.cb.removeEvent(__event.UPDATE_PLAYER_CARD, updatePlayerCard)
        game.cb.removeEvent(__event.UPDATE_OUT_CARD, updateOutCard)
        game.cb.removeEvent(__event.PLAYER_OUT_CARD, playerOutCard)

        game.cb.removeEvent(__event.PT_I_OUT_CARD, ptICanOutCard)
        game.cb.removeEvent(__event.I_BOUNCE_CARD, iBounceCard)
        game.cb.removeEvent(__event.ACT_PASS, iPass)

        game.cb.removeEvent(__event.ADD_DESK_ACT_EFFECT, addActEffect)

        game.cb.removeEvent(__event.ADD_BAIDA, addBaida)
        game.cb.removeEvent(__event.NEXT_MATCH_CLEAR_DESK, nextMatchClearDesk)

        game.cb.removeEvent(__event.UPDATE_READY_STATE, updatePlayerReadState)

        game.cb.removeEvent(__event.GOIN_PLAYER, goin_player)
        game.cb.removeEvent(__event.ADD_HUPAI, addHupaiList)
        game.cb.removeEvent(__event.ADD_CANGYING_EFFECT, addCangyingEffect)

        game.cb.removeEvent(__event.UPDATE_SURPLUS_CARD_NUM, updateSurplusCardNum)
        game.cb.removeEvent(__event.UPDATE_DIRECTION_LIGHT, updateDirectionLight)
        game.cb.removeEvent(__event.ADD_HU_EFFECT, addHuEffect)
        game.cb.removeEvent(__event.UPDATE_HEAD_BUHUA_NUM, addHeadBuhuaNum)
        game.cb.removeEvent(__event.UPDATE_PLAYER_SCORE, updatePlayerScore)
        game.cb.removeEvent(__event.UPDATE_PLAYER_OFFLINE, updatePlayerOffLine)
    })

    this.gameStart = function(){
        //移除所有人准备标志
        if(!__data.desk.upPlayervo)return;
        __data.desk.upPlayervo.readyState = false
        __data.desk.downPlayervo.readyState = false
        __data.desk.leftPlayervo.readyState = false
        __data.desk.rightPlayervo.readyState = false
        that.head_up.updateReadyState()
        that.head_down.updateReadyState()
        that.head_left.updateReadyState()
        that.head_right.updateReadyState()
        //更新庄家图标
        __data.desk.upPlayervo.zhuangState = false
        __data.desk.downPlayervo.zhuangState = false
        __data.desk.leftPlayervo.zhuangState = false
        __data.desk.rightPlayervo.zhuangState = false
        __data.desk.idToPlayervo[__data.desk.curZhuangID].zhuangState = true
        that.head_up.updateZhuangState()
        that.head_down.updateZhuangState()
        that.head_left.updateZhuangState()
        that.head_right.updateZhuangState()

        that.head_up.updateOffLineState()
        that.head_down.updateOffLineState()
        that.head_left.updateOffLineState()
        that.head_right.updateOffLineState()
        //更改 转盘 只向东家
        
        var dir = __data.desk.idToDir[__data.desk.firstZhuangID]
        if(dir == "up"){
            this.direction.rotation = 180
        }else if(dir == "down"){
            this.direction.rotation = 0
        }else if(dir == "left"){
            this.direction.rotation = 90
        }else if(dir == "right"){
            this.direction.rotation = 270
        }

        that.txt_match.text = "局数 " + __data.desk.curMatch + "/" + __data.desk.totalMatch
        // this.direction.rotation = 90
        // TweenMax.to(this.direction, 2, {rotation:720, repeat:-1, ease:Linear.easeNone})
    }

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

    function addHeadBuhuaNum(id, vo){
        var dir = __data.desk.idToDir[id];
        //更新补花
        that["head_"+dir].updateBuhua(vo)
    }

    function addHuEffect(id, cardValue){
        var dir = __data.desk.idToDir[id]
        var hu = that["huEffect_"+dir]
        that.addChild(hu)
        hu.play(cardValue)
    }

    function updateDirectionLight(operateid){
        var dir = __data.desk.idToDir[operateid]
        //down  606 385 0
        //left  616 326 90
        //up    675 336 180 
        //right 665 395 270 
        trace("出牌方向:", dir)
        if(dir == "up"){
            that.direction_light.x = 675
            that.direction_light.y = 336
            that.direction_light.rotation = 180
        }else if(dir == "down"){
            that.direction_light.x = 606
            that.direction_light.y = 385
            that.direction_light.rotation = 0
        }else if(dir == "left"){
            that.direction_light.x = 616
            that.direction_light.y = 326
            that.direction_light.rotation = 90
        }else if(dir == "right"){
            that.direction_light.x = 665
            that.direction_light.y = 395
            that.direction_light.rotation = 270
        }

        that.txt_time.text = 15
        clearInterval(update_time_id)
        update_time_id = setInterval(update_direction_time, 1000)
    }
    var update_time_id = -1
    function update_direction_time(){
        that.txt_time.text -= 1
        if(that.txt_time.text == "0")clearInterval(update_time_id)
    }

    function updateSurplusCardNum(value){
        txt_surplusCard.text = value
    }

    function addBuhua(id,flower){
        var dir = __data.desk.idToDir[id]
        var buhua = that["buhua_"+dir]
        that.addChild(buhua)
        buhua.play(flower)
    }

    function addCangyingEffect(flower, score){
        that.addChild(that.cangying)
        that.cangying.play(flower, score)
    }

    function addHupaiList(){
        if(__data.desk.downPlayervo && __data.desk.downPlayervo.hupai != -1 && __data.desk.downPlayervo.hupai != ""){
            trace("11111", __data.desk.downPlayervo.hupai)
            that.addChild(hupai)
            hupai.addCard(__data.desk.downPlayervo.hupai)
        }else{
            game.utils.remove(hupai)
        }
    }

    function updatePlayerReadState(id){
        var dir = __data.desk.idToDir[id]
        that["head_"+dir].updateReadyState()
    }

    function addBaida(baida_value, yindao_value){
        if(baida_value < 0 && yindao_value < 0)return;
        that.addChild(that.baida)
        that.baida.card_baida.skin = "card/"+baida_value+".png"
        that.baida.card_yindao.skin = "card/"+yindao_value+".png"
    }

    function addActEffect(userid, type){
        if(type == 2){
            var sex = __data.desk.idToPlayervo[userid].sex
            __sound.playGameYx(sex+"/peng")
        }else if(type == 3){
            var sex = __data.desk.idToPlayervo[userid].sex
            __sound.playGameYx(sex+"/chi")
        }else if(type == 4){
            var sex = __data.desk.idToPlayervo[userid].sex
            __sound.playGameYx(sex+"/gang")
        }else if(type == 6 || type == 9 || type == 10){
            trace1("听牌音效")
            var sex = __data.desk.idToPlayervo[userid].sex
            __sound.playGameYx(sex+"/ting")
        }
        if(type == 0 || type == 1 || type == 11)return

        var dir = __data.desk.idToDir[userid]
        that[dir+"_actEffect"].addEffect(type)
        that.addChild(that[dir+"_actEffect"])
        // actEffect.addEffect(type)
        // that.addChild(actEffect)
    }

    function iPass(){
        that.downPlayerCard.update()
    }

    function iBounceCard(arr){
        that.downPlayerCard.bounceCard(arr)
    }

    //noBounceCard 能出的牌 是否 弹起 1 不弹起
    function ptICanOutCard(arr, noBounceCard){
        that.downPlayerCard.ptICanOutCard(arr, noBounceCard)
    }

    function deskAddCardGroup(value, type){
        cardGroup.addCardGroup(value, type)
        that.addChild(cardGroup)
    }

    function deskRemoveCardGroup(){
        game.utils.remove(cardGroup)
    }

    function deskAddAct(value, cardGroup){
        act.act = value//["ting","eat","hit","gang","hu","pass"]
        act.cardGroup = cardGroup
        that.addChild(act)
    }

    function deskRemoveAct(){
        game.utils.remove(act)
    }

    function updatePlayerCard(id){
        var dir = __data.desk.idToDir[id]
        that[dir+"PlayerCard"].update()
        ting.update()
    }

    function updateOutCard(id){
        var dir = __data.desk.idToDir[id]
        that[dir+"OutCard"].update()
    }

    function playerOutCard(id, flower){
        var dir = __data.desk.idToDir[id]
        that[dir+"OutCard"].out(flower)
        if(flower >= 40){
            addBuhua(id, flower)
        }
    }

    function goin_player(){
        that.addPlayer()
    }

    this.addPlayer = function(){
        this.head_up.vo = __data.desk.upPlayervo
        this.head_down.vo = __data.desk.downPlayervo
        this.head_left.vo = __data.desk.leftPlayervo
        this.head_right.vo = __data.desk.rightPlayervo
        this.head_up.updateInfo()
        this.head_down.updateInfo()
        this.head_left.updateInfo()
        this.head_right.updateInfo()
        this.upPlayerCard.vo = __data.desk.upPlayervo
        this.downPlayerCard.vo = __data.desk.downPlayervo
        this.leftPlayerCard.vo = __data.desk.leftPlayervo
        this.rightPlayerCard.vo = __data.desk.rightPlayervo
        this.upOutCard.vo = __data.desk.upPlayervo
        this.downOutCard.vo = __data.desk.downPlayervo
        this.leftOutCard.vo = __data.desk.leftPlayervo
        this.rightOutCard.vo = __data.desk.rightPlayervo
    }

    function nextMatchClearDesk(){
        txt_surplusCard.text = 0;
        ting.clear()
        game.utils.remove(that.baida)

        that.upOutCard.clear()
        that.downOutCard.clear()
        that.leftOutCard.clear()
        that.rightOutCard.clear()

        that.upPlayerCard.clear()
        that.downPlayerCard.clear()
        that.leftPlayerCard.clear()
        that.rightPlayerCard.clear()

        that.arrow.clear()

        __data.desk.upPlayervo&&__data.desk.upPlayervo.nextMatchClear()
        __data.desk.downPlayervo&&__data.desk.downPlayervo.nextMatchClear()
        __data.desk.leftPlayervo&&__data.desk.leftPlayervo.nextMatchClear()
        __data.desk.rightPlayervo&&__data.desk.rightPlayervo.nextMatchClear()

        game.utils.remove(act)
        game.utils.remove(hupai)
        game.utils.remove(this.cangying)

        game.utils.remove(this.buhua_up)
        game.utils.remove(this.buhua_down)
        game.utils.remove(this.buhua_left)
        game.utils.remove(this.buhua_right)

        game.utils.remove(this.huEffect_up)
        game.utils.remove(this.huEffect_down)
        game.utils.remove(this.huEffect_left)
        game.utils.remove(this.huEffect_right)

        game.utils.remove(this.up_actEffect)
        game.utils.remove(this.down_actEffect)
        game.utils.remove(this.left_actEffect)
        game.utils.remove(this.right_actEffect)

        that.txt_match.text = ""
    }

    this.clear = function(){
        txt_surplusCard.text = 0;
        that.head_up.clear();
        that.head_down.clear();
        that.head_left.clear();
        that.head_right.clear();
        ting.clear()
        game.utils.remove(that.baida)

        that.upOutCard.clear()
        that.downOutCard.clear()
        that.leftOutCard.clear()
        that.rightOutCard.clear()

        that.upPlayerCard.clear()
        that.downPlayerCard.clear()
        that.leftPlayerCard.clear()
        that.rightPlayerCard.clear()
        
        that.arrow.clear()

        __data.desk.upPlayervo&&__data.desk.upPlayervo.nextMatchClear()
        __data.desk.downPlayervo&&__data.desk.downPlayervo.nextMatchClear()
        __data.desk.leftPlayervo&&__data.desk.leftPlayervo.nextMatchClear()
        __data.desk.rightPlayervo&&__data.desk.rightPlayervo.nextMatchClear()

        game.utils.remove(act)
        game.utils.remove(hupai)
        game.utils.remove(this.cangying)

        game.utils.remove(this.buhua_up)
        game.utils.remove(this.buhua_down)
        game.utils.remove(this.buhua_left)
        game.utils.remove(this.buhua_right)

        game.utils.remove(this.huEffect_up)
        game.utils.remove(this.huEffect_down)
        game.utils.remove(this.huEffect_left)
        game.utils.remove(this.huEffect_right)

        game.utils.remove(this.up_actEffect)
        game.utils.remove(this.down_actEffect)
        game.utils.remove(this.left_actEffect)
        game.utils.remove(this.right_actEffect)

        that.txt_match.text = ""
    }
    // var aabbcc=-1
    // var a = 0
    // var b = 0
    // function xxxOutCard(){
    //     a > 3 && (a = 0)

    //     if(a == 0){
    //         upOutCard.out(1)
    //     }
    //     else if(a == 1){
    //         downOutCard.out(1)
    //     }
    //     else if(a == 2){
    //         leftOutCard.out(1)
    //     }else if(a == 3){
    //         rightOutCard.out(1)
    //     }
    //     a++
    //     b++
    //     if(b >= 100){
    //         clearInterval(aabbcc)
    //     }
    // }

    
    // DeskPlaying.arrow = game.utils.getSprite(null, "desk/arrow.png")
    // this.addChild(DeskPlaying.arrow)

    // DeskPlaying.arrow.on("added", this, function(){
    //     TweenMax.to(DeskPlaying.arrow)
    // })
    // DeskPlaying.arrow.on("removed", this, function({

    // }))
}
Laya.class(DeskPlaying, "DeskPlaying", DeskPlayingUI)