/* 
* @Author: 轻飘时刻
* @Date:   2017-04-27 14:19:29
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-06 11:04:47
*/
function DeskPlayingLeftPlayerCard(){
    DeskPlayingLeftPlayerCard.super(this)
    var that = this;

    this.cacheAs = config.cacheModel

    this.vo = __data.desk.upPlayervo;
    var starty = 0;

    this.clear = function(){
        game.cache.recoverAll(id_door_card_light)
        game.cache.recoverAll(id_door_card_dark)
        game.cache.recoverAll(id_hand_card)

        game.cache.recoverAll(id_arrow_down)
        game.cache.recoverAll(id_arrow_up)
        game.cache.recoverAll(id_arrow_right)
        game.cache.recoverAll(id_red)

        __factory.recoverAll(LeftPlayerDoorCardLight)
    }

    this.update = function(){
        starty = 0;
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

        var b = this.vo.handCard
        for(var i = 0; i < b.length; i++){
            if(!b[i])continue;
            var card = game.cache.get(id_hand_card)
            card.flower = b[i]
            card.x = 0
            card.y = starty + card_y_dis * i
            that.addChild(card)
        }
        starty = card.y + card_y_dis + 10

        if(this.vo.grabCard == -2){
            var card = game.cache.get(id_hand_card)
            card.flower = b[i]
            card.x = 0
            card.y = starty
            that.addChild(card)
        }
    }

    var id_door_card_light = game.cache.registe(LeftPlayerDoorCardLight)
    var id_door_card_dark  = game.cache.registe(LeftPlayerDoorCardDark)
    var id_hand_card       = game.cache.registe(LeftPlayerHandCard)

    var id_arrow_down       = game.cache.registe(LeftPlayerDorrCard_DownArrow)
    var id_arrow_up       = game.cache.registe(LeftPlayerDorrCard_UpArrow)
    var id_arrow_right       = game.cache.registe(LeftPlayerDorrCard_RightArrow)
    var id_red       = game.cache.registe(LeftPlayerDorrCard_Red)
    var card_group_dis = 15//牌组距离
    var card_y_dis = 30//一个牌组内 2个牌y的距离
    //
    function add_card_two(value){
        var a = value.split("-")
        for(var i = 0; i < 2; i++){
            var card = __factory.get(LeftPlayerDoorCardLight, a[0])
            that.addChild(card)
            card.x = -11;
            card.y = starty + card_y_dis * i
        }
        starty = starty + card_y_dis * 2 + card_group_dis
    }

    function add_card_three(arr){
        var value = arr[1]
        var oid   = parseInt(arr[2])
        var ocard = arr[3] 
        var ac = null
        var a = value.split("-")
        for(var i = 0; i < 3; i++){
            var card = __factory.get(LeftPlayerDoorCardLight, a[i])
            that.addChild(card)
            card.x = -11;
            card.y = starty + card_y_dis * i
            if(oid && i == 1)ac = card
            else if(!oid && ocard == a[i])ac = card
        }
        starty = starty + card_y_dis * 3 + card_group_dis

        if(__data.desk.idToPlayervo[oid]){
            var p1 = __data.desk.leftPlayervo.position
            var p2 = __data.desk.idToPlayervo[oid].position

            var arrowid = ""
            if(p1 + 1 == p2 || (p1 == 4 && p2 == 1)){
                arrowid = id_arrow_down
            }else if(p1 - 1 == p2 || (p1 == 1 && p2 == 4)){
                arrowid = id_arrow_up
            }else if(p1 + 2 == p2 || p1-2 == p2){
                arrowid = id_arrow_right
            }

            var arrow = game.cache.get(arrowid)
            arrow.scale(0.5, 0.5)
            that.addChild(arrow)
            arrow.x = ac.x + ac.width*ac.scaleX - arrow.width*arrow.scaleX
            arrow.y = ac.y + (card_y_dis - arrow.height*arrow.scaleY) / 2
        }else {
            var red = game.cache.get(id_red)
            red.scale(0.8, 0.8)
            that.addChild(red)
            red.x = ac.x + ac.width*ac.scaleX - red.width*red.scaleX - 3
            red.y = ac.y + (card_y_dis - red.height*red.scaleY) / 2
        }
    }

    function add_card_dark(value){
        var a = value.split("-")
        for(var i = 0; i < 3; i++){
            var card = game.cache.get(id_door_card_dark)
            card.flower = a[0]
            that.addChild(card)
            card.x = -11;
            card.y = starty + card_y_dis * i
        }
        var card = __factory.get(LeftPlayerDoorCardLight, a[0])//__factory.get(LeftPlayerDoorCardLight, a[0])
        card.x = -11;
        card.y = starty + card_y_dis * 1 - 13
        that.addChild(card)

        starty = starty + card_y_dis * 3 + card_group_dis
    }

    function add_card_light(arr){
        var value = arr[1]
        var oid   = parseInt(arr[2])
        var ocard = arr[3] 
        var ac = null

        var a = value.split("-")
        for(var i = 0; i < 3; i++){
            var card = __factory.get(LeftPlayerDoorCardLight, a[0])
            that.addChild(card)
            card.x = -11;
            card.y = starty + card_y_dis * i
        }
        var card = __factory.get(LeftPlayerDoorCardLight, a[0])
        card.x = -11;
        card.y = starty + card_y_dis * 1 - 13
        that.addChild(card)

        starty = starty + card_y_dis * 3 + card_group_dis
        ac = card

        if(__data.desk.idToPlayervo[oid]){
            var p1 = __data.desk.leftPlayervo.position
            var p2 = __data.desk.idToPlayervo[oid].position

            var arrowid = ""
            if(p1 + 1 == p2 || (p1 == 4 && p2 == 1)){
                arrowid = id_arrow_down
            }else if(p1 - 1 == p2 || (p1 == 1 && p2 == 4)){
                arrowid = id_arrow_up
            }else if(p1 + 2 == p2 || p1-2 == p2){
                arrowid = id_arrow_right
            }

            var arrow = game.cache.get(arrowid)
            arrow.scale(0.5, 0.5)
            that.addChild(arrow)
            arrow.x = ac.x + ac.width*ac.scaleX - arrow.width*arrow.scaleX
            arrow.y = ac.y + (card_y_dis - arrow.height*arrow.scaleY) / 2
        }
    }
}Laya.class(DeskPlayingLeftPlayerCard, "DeskPlayingLeftPlayerCard", Laya.Sprite)

function LeftPlayerHandCard(){
    LeftPlayerHandCard.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_4.png")
}Laya.class(LeftPlayerHandCard, "LeftPlayerHandCard", Laya.Sprite)

function LeftPlayerDoorCardDark(){
    LeftPlayerDoorCardDark.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_5.png")
}Laya.class(LeftPlayerDoorCardDark, "LeftPlayerDoorCardDark", Laya.Sprite)

function LeftPlayerDoorCardLight(){
    LeftPlayerDoorCardLight.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_6.png")
    var flower = game.utils.getSprite(null, "card/0.png")
    flower.rotation = 90
    flower.scale(0.3, 0.3)
    flower.x = 42
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
}Laya.class(LeftPlayerDoorCardLight, "LeftPlayerDoorCardLight", Laya.Sprite)

__factory.cache(LeftPlayerDoorCardLight)

function LeftPlayerDorrCard_UpArrow(){
    LeftPlayerDorrCard_UpArrow.super(this)
    game.utils.getSprite(this, "desk/arrow_up.png")
}
Laya.class(LeftPlayerDorrCard_UpArrow, "LeftPlayerDorrCard_UpArrow", Laya.Sprite)

function LeftPlayerDorrCard_DownArrow(){
    LeftPlayerDorrCard_DownArrow.super(this)
    game.utils.getSprite(this, "desk/arrow_down.png")
}
Laya.class(LeftPlayerDorrCard_DownArrow, "LeftPlayerDorrCard_DownArrow", Laya.Sprite)

function LeftPlayerDorrCard_RightArrow(){
    LeftPlayerDorrCard_RightArrow.super(this)
    game.utils.getSprite(this, "desk/arrow_right.png")
}
Laya.class(LeftPlayerDorrCard_RightArrow, "LeftPlayerDorrCard_RightArrow", Laya.Sprite)

function LeftPlayerDorrCard_Red(){
    LeftPlayerDorrCard_Red.super(this)
    game.utils.getSprite(this, "desk/red.png")
}
Laya.class(LeftPlayerDorrCard_Red, "LeftPlayerDorrCard_Red", Laya.Sprite)