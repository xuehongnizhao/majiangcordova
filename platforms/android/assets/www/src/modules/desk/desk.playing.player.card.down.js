/* 
* @Author: 轻飘时刻
* @Date:   2017-04-27 14:18:23
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-28 17:43:29
*/

function DeskPlayingDownPlayerCard(){
    DeskPlayingDownPlayerCard.super(this)
    var that = this;

    this.cacheAs = config.cacheModel

    var grabCard = null
    var handCardArr = [];

    this.clear = function(){
        __factory.recoverAll(DownPlayerHandCard)
        __factory.recoverAll(DownPlayerDoorCardLight)

        game.cache.recoverAll(id_door_card_dark)

        game.cache.recoverAll(id_arrow_left)
        game.cache.recoverAll(id_arrow_right)
        game.cache.recoverAll(id_arrow_up)
        game.cache.recoverAll(id_red)
    }

    //添加出牌事件
    this.addEvent = function(){
        for(var i = 0; i < handCardArr.length; i++){
            handCardArr[i].on("mousedown", that, start_drag_handler)
        }
        grabCard && grabCard.on("mousedown", that, start_drag_handler)
    }

    //移除出牌事件
    this.removeEvent = function(){
        for(var i = 0; i < handCardArr.length; i++){
            var card = handCardArr[i]
            handCardArr[i].y = (1-card.scaleY)*card.height
            handCardArr[i].off("mousedown", that, start_drag_handler)
        }
        grabCard && grabCard.off("mousedown", that, start_drag_handler)
        grabCard && (grabCard.y = (1-grabCard.scaleY)*grabCard.height)
    }

    this.ptICanOutCard = function(arr, noBounceCard){
        this.removeEvent()
        trace("能出的牌：",arr)
        for(var i = 0; i < handCardArr.length; i++){
            var card = handCardArr[i]
            if(arr.indexOf(card.flower.toString())>-1){
                if(noBounceCard == 1)card.y = (1-card.scaleY)*card.height
                else card.y = (1-card.scaleY)*card.height-20
                card.on("mousedown", that, start_drag_handler)
            }
        }
        if(grabCard && arr.indexOf(grabCard.flower.toString())>-1){
            if(noBounceCard == 1)grabCard.y = (1-grabCard.scaleY)*grabCard.height
            else grabCard.y = (1-grabCard.scaleY)*grabCard.height-20
            grabCard.on("mousedown", that, start_drag_handler)
        }
    }

    this.bounceCard = function(arr){
        trace("弹牌：", arr)
        this.removeEvent()
        for(var i = 0; i < handCardArr.length; i++){
            var card = handCardArr[i]
            if(arr.indexOf(card.flower.toString())>-1){
                card.y = (1-card.scaleY)*card.height-20
            }
        }
        if(grabCard && arr.indexOf(grabCard.flower.toString())>-1){
            grabCard.y = (1-grabCard.scaleY)*grabCard.height-20
        }
    }

    var outCardTarget = null
    var lastBounceCardTarget = null
    var outCardArea = new Laya.Rectangle()
    var dragCardArea = new Laya.Rectangle()
    dragCardArea.x = 0
    dragCardArea.y = -500
    dragCardArea.width = 1150
    dragCardArea.height = 500

    function start_drag_handler(e){
        __sound.playGameYx("click_card")

        outCardTarget      = e.currentTarget;
        outCardArea.x      = outCardTarget.x;
        outCardArea.y      = outCardTarget.y;
        outCardArea.width  = outCardTarget.width;
        outCardArea.height = outCardTarget.height;
        outCardTarget.startDrag(dragCardArea);
        game.stage.on("mouseup", that, stop_drag_handler)
        game.stage.on("mouseout", that, stop_drag_handler)
    }

    function stop_drag_handler(e){
        outCardTarget.stopDrag()
        trace("停止拖牌")
        game.stage.off("mouseup", that, stop_drag_handler)
        game.stage.off("mouseout", that, stop_drag_handler)

        // trace("%c接受<<<-ID-"+1001+"-length-"+ 123, "color:#0000ff")
        // trace("%c发送>>>-ID-"+1001+"-length-"+123, "color:#8a2be2")
        // trace("%c发送>>>-ID-"+1001+"-length-"+123, "color:#8fbc8f;font-weight")
        // trace("%c发送>>>-ID-"+1001+"-length-"+123, "color:#483d8b;font-weight")
        // trace("%c发送>>>-ID-"+1001+"-length-"+123, "color:#9400d3;font-weight")
        // trace("%c发送>>>-ID-"+1001+"-length-"+123, "color:#00bfff;font-weight")
        // trace("%c发送>>>-ID-"+1001+"-length-"+123, "color:#20b2aa;font-weight")
        // trace("%c发送>>>-ID-"+1001+"-length-"+123, "color:#778899;font-weight")
        // trace("%c发送>>>-ID-"+1001+"-length-"+123, "color:#7b68ee;font-weight")
        // trace("%c发送>>>-ID-"+1001+"-length-"+123, "color:#0000cd;font-weight")
        // trace("%c前端开发 %ccss88.com %c愚人码头", "color:red","","color:orange;font-weight:bold;backgroundcolor:black")
        // console.log("%c 前端开发 %c css88.com %c 愚人码头", "color:red","","color:orange;font-weight:bold")
        // console.log("xx_yy.com");
        // console.log("你大爷啊%c我是红色！！！","color:red;font-weight:bold");
        // console.log("xx_yy.com");
        //计算拖动后的卡牌area和拖动前的卡牌area进行对比 然后进行相关操作
        //

        if(outCardTarget.y == (1-outCardTarget.scaleY)*outCardTarget.height){
            //弹起卡牌
            lastBounceCardTarget && (lastBounceCardTarget.y = (1-lastBounceCardTarget.scaleY)*lastBounceCardTarget.height)
            outCardTarget.y = (1-outCardTarget.scaleY)*outCardTarget.height-20;
            lastBounceCardTarget = outCardTarget
        }else if(outCardTarget.y <= (1-outCardTarget.scaleY)*outCardTarget.height-20){
            //出牌操作
            out(outCardTarget)
        }else if(outCardTarget.y > (1-outCardTarget.scaleY)*outCardTarget.height-20){
            //回收操作
            outCardTarget.x = outCardTarget.lx
            outCardTarget.y = (1-outCardTarget.scaleY)*outCardTarget.height
        }
    }

    function out(card){
        that.removeEvent()
        game.cache.recover(card)
        game.cb.dispatchEvent(__event.DESK_DOWN_PLAYER_READY_OUT_CARD, [card.flower])
        game.server.send(6003, 1, card.flower)
    }

    this.vo = __data.desk.downPlayervo;
    var startx = 0;

    this.update = function(){
        startx = 0;
        this.removeEvent()
        this.clear()

        if(!this.vo)return

        var a = this.vo.doorCard
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(":")
            switch(b[0]){
                case "two":
                add_card_two(b[1])
                break;
                case "three":
                add_card_three(b)
                break;
                case "dark":
                add_card_dark(b[1])
                break;
                case "light":
                add_card_light(b)
                break;
            }
        }

        handCardArr.splice(0, handCardArr.length)
        var b = this.vo.handCard
        for(var i = 0; i < b.length; i++){
            if(b[i]||b[i]==0){
                var card = __factory.get(DownPlayerHandCard, b[i])
                card.x = startx + card.width*card.scaleX*i
                card.lx = card.x
                card.y = (1-card.scaleY)*card.height
                card.addBaidaIcon()
                that.addChild(card)
                handCardArr.push(card)
            }
        }
        startx = card.x + card.width*card.scaleX + 10

        if(this.vo.grabCard >= 0){
            grabCard = __factory.get(DownPlayerHandCard, this.vo.grabCard)
            grabCard.x = startx//14.5 * grabCard.width
            grabCard.lx = grabCard.x
            grabCard.y = (1-grabCard.scaleY)*grabCard.height
            grabCard.addBaidaIcon()
            that.addChild(grabCard)
        }
    }

    var id_door_card_light = game.cache.registe(DownPlayerDoorCardLight)
    var id_door_card_dark  = game.cache.registe(DownPlayerDoorCardDark)
    var id_hand_card       = game.cache.registe(DownPlayerHandCard)
    var card_group_dis     = 10//牌组距离

    var id_arrow_left  = game.cache.registe(DownPlayerDorrCard_LeftArrow)
    var id_arrow_right = game.cache.registe(DownPlayerDorrCard_RightArrow)
    var id_arrow_up    = game.cache.registe(DownPlayerDorrCard_UpArrow)
    var id_red         = game.cache.registe(DownPlayerDorrCard_Red)

    var id_left_arrow      = 
    //
    function add_card_two(value){
        var a = value.split("-")
        for(var i = 0; i < 2; i++){
            var card = __factory.get(DownPlayerDoorCardLight, a[0])//game.cache.get(id_door_card_light)
            that.addChild(card)
            card.x = startx + card.width*card.scaleX * i
            card.y = (1-card.scaleY)*card.height
        }
        startx = startx + card.width*card.scaleX * 2 + card_group_dis
    }

    function add_card_three(arr){
        var value = arr[1]
        var oid   = parseInt(arr[2])
        var ocard = arr[3] 
        var a = value.split("-")
        var ac = null
        for(var i = 0; i < a.length; i++){
            var card = __factory.get(DownPlayerDoorCardLight, a[i])
            that.addChild(card)
            card.x = startx + card.width*card.scaleX * i
            card.y = (1-card.scaleY)*card.height
            if(oid && i == 1){ac = card}
            else if(!oid && ocard == a[i]){ac = card}
        }
        startx = startx + card.width*card.scaleX * 3 + card_group_dis

        // trace1(1, oid)
        if(__data.desk.idToPlayervo[oid]){
            var p1 = __data.desk.downPlayervo.position
            var p2 = __data.desk.idToPlayervo[oid].position

            var arrowid = ""
            if(p1 + 1 == p2 || (p1 == 4 && p2 == 1)){
                arrowid = id_arrow_right
            }else if(p1 - 1 == p2 || (p1 == 1 && p2 == 4)){
                arrowid = id_arrow_left
            }else if(p1 + 2 == p2 || p1-2 == p2){
                arrowid = id_arrow_up
            }

            var arrow = game.cache.get(arrowid)
            arrow.scale(ac.scaleX, ac.scaleY)
            that.addChild(arrow)
            arrow.x = ac.x + (ac.width*ac.scaleX - arrow.width*arrow.scaleX) / 2
            arrow.y = ac.y + 5 * ac.scaleY
        }else {
            var red = game.cache.get(id_red)
            red.scale(ac.scaleX, ac.scaleY)
            that.addChild(red)
            red.x = ac.x + (ac.width*ac.scaleX - red.width*red.scaleX) / 2
            red.y = ac.y + 5 * ac.scaleY
        }
    }

    function add_card_dark(value){
        var a = value.split("-")
        for(var i = 0; i < 3; i++){
            var card = game.cache.get(id_door_card_dark)
            card.flower = a[0]
            that.addChild(card)
            card.x = startx + card.width*card.scaleX * i
            card.y = (1-card.scaleY)*card.height
        }
        var card = __factory.get(DownPlayerDoorCardLight, a[0])
        card.x = startx + card.width*card.scaleX * 1
        card.y = -5*card.scaleY
        that.addChild(card)
        startx = startx + card.width*card.scaleX * 3 + card_group_dis
    }

    function add_card_light(arr){
        var value = arr[1]
        var oid   = parseInt(arr[2])
        var ocard = arr[3] 
        var ac = null
        var a = value.split("-")
        for(var i = 0; i < 3; i++){
            var card = __factory.get(DownPlayerDoorCardLight, a[0])
            that.addChild(card)
            card.x = startx + card.width*card.scaleX * i
            card.y = (1-card.scaleY)*card.height
        }
        var card = __factory.get(DownPlayerDoorCardLight, a[0])
        card.x = startx + card.width*card.scaleX * 1
        card.y = -5*card.scaleY
        that.addChild(card)
        startx = startx + card.width*card.scaleX * 3 + card_group_dis

        ac = card
        if(__data.desk.idToPlayervo[oid]){
            var p1 = __data.desk.downPlayervo.position
            var p2 = __data.desk.idToPlayervo[oid].position

            var arrowid = ""
            if(p1 + 1 == p2 || (p1 == 4 && p2 == 1)){
                arrowid = id_arrow_right
            }else if(p1 - 1 == p2 || (p1 == 1 && p2 == 4)){
                arrowid = id_arrow_left
            }else if(p1 + 2 == p2 || p1-2 == p2){
                arrowid = id_arrow_up
            }

            var arrow = game.cache.get(arrowid)
            arrow.scale(ac.scaleX, ac.scaleY)
            that.addChild(arrow)
            arrow.x = ac.x + (ac.width*ac.scaleX - arrow.width*arrow.scaleX) / 2
            arrow.y = ac.y + 5 * ac.scaleY
        }
    }
}
Laya.class(DeskPlayingDownPlayerCard, "DeskPlayingDownPlayerCard", Laya.Sprite)

function DownPlayerHandCard(){
    DownPlayerHandCard.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_0.png")
    var flower = game.utils.getSprite(null, "card/0.png")
    flower.scale(0.7, 0.7)
    flower.x = (this.width - flower.width*flower.scaleX) / 2
    flower.y = 35
    this.addChild(flower)
    var baida_icon = game.utils.getSprite(null, "desk/baida_jiao.png")
    baida_icon.x = 0
    baida_icon.y = 5
    var _flower = null
    function set_flower(value){
        _flower = value
        game.utils.getSprite(flower, "card/"+value+".png")
    }
    function get_flower(){
        return _flower
    }
    this.addBaidaIcon = function(){
        if(_flower == __data.desk.baida_baida_card){
            that.addChild(baida_icon)
        }else {
            game.utils.remove(baida_icon)
        }
    }
    game.utils.setget(this, "flower", set_flower, get_flower)

    this.scale(1.1, 1.1)
}Laya.class(DownPlayerHandCard, "DownPlayerHandCard", Laya.Sprite)

function DownPlayerDoorCardLight(){
    DownPlayerDoorCardLight.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_1.png")
    var flower = game.utils.getSprite(null, "card/0.png")
    flower.scale(0.7, 0.7)
    flower.x = (this.width - flower.width*flower.scaleX) / 2
    flower.y = 10
    this.addChild(flower)
    var _flower = null
    function set_flower(value){
        _flower = value
        game.utils.getSprite(flower, "card/"+value+".png")
    }
    function get_flower(){
        return _flower
    }
    game.utils.setget(this, "flower", set_flower, get_flower)
    this.scale(0.8, 0.8)
}Laya.class(DownPlayerDoorCardLight, "DownPlayerDoorCardLight", Laya.Sprite)

function DownPlayerDoorCardDark(){
    DownPlayerDoorCardDark.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_2.png")
    this.scale(0.8, 0.8)
}Laya.class(DownPlayerDoorCardDark, "DownPlayerDoorCardDark", Laya.Sprite)

__factory.cache(DownPlayerHandCard)
__factory.cache(DownPlayerDoorCardLight)

function DownPlayerDorrCard_LeftArrow(){
    DownPlayerDorrCard_LeftArrow.super(this)
    game.utils.getSprite(this, "desk/arrow_left.png")
}
Laya.class(DownPlayerDorrCard_LeftArrow, "DownPlayerDorrCard_LeftArrow", Laya.Sprite)

function DownPlayerDorrCard_RightArrow(){
    DownPlayerDorrCard_RightArrow.super(this)
    game.utils.getSprite(this, "desk/arrow_right.png")
}
Laya.class(DownPlayerDorrCard_RightArrow, "DownPlayerDorrCard_RightArrow", Laya.Sprite)

function DownPlayerDorrCard_UpArrow(){
    DownPlayerDorrCard_UpArrow.super(this)
    game.utils.getSprite(this, "desk/arrow_up.png")
}
Laya.class(DownPlayerDorrCard_UpArrow, "DownPlayerDorrCard_UpArrow", Laya.Sprite)

function DownPlayerDorrCard_Red(){
    DownPlayerDorrCard_Red.super(this)
    game.utils.getSprite(this, "desk/red.png")
}
Laya.class(DownPlayerDorrCard_Red, "DownPlayerDorrCard_Red", Laya.Sprite)