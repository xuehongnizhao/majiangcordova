/* 
* @Author: 轻飘时刻
* @Date:   2017-04-27 14:18:58
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-06 11:05:16
*/
function DeskPlayingUpPlayerCard(){
    DeskPlayingUpPlayerCard.super(this)
    var that = this

    this.cacheAs = config.cacheModel

    this.vo = __data.desk.upPlayervo;
    var startx = 0;

    this.clear = function(){
        game.cache.recoverAll(id_door_card_light)
        game.cache.recoverAll(id_door_card_dark)
        game.cache.recoverAll(id_hand_card)

        game.cache.recoverAll(id_arrow_left)
        game.cache.recoverAll(id_arrow_down)
        game.cache.recoverAll(id_arrow_right)
        game.cache.recoverAll(id_red)

        __factory.recoverAll(UpPlayerDoorCardLight)
    }

    this.update = function(){
        startx = 0;
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
            card.x = startx + card.width*card.scaleX*i
            that.addChild(card)
        }
        startx = card.x + card.width*card.scaleX + 10

        if(this.vo.grabCard == -2){
            var card = game.cache.get(id_hand_card)
            card.flower = b[i];
            card.x = startx;
            that.addChild(card)
        }
    }

    var id_door_card_light = game.cache.registe(UpPlayerDoorCardLight)
    var id_door_card_dark  = game.cache.registe(UpPlayerDoorCardDark)
    var id_hand_card       = game.cache.registe(UpPlayerHandCard)
    var id_arrow_left       = game.cache.registe(UpPlayerDorrCard_LeftArrow)
    var id_arrow_right       = game.cache.registe(UpPlayerDorrCard_RightArrow)
    var id_arrow_down       = game.cache.registe(UpPlayerDorrCard_DownArrow)
    var id_red       = game.cache.registe(UpPlayerDorrCard_Red)
    var card_group_dis = 3//牌组距离
    //
    function add_card_two(value){
        var a = value.split("-")
        for(var i = 0; i < 2; i++){
            var card = __factory.get(UpPlayerDoorCardLight, a[0])
            that.addChild(card)
            card.x = startx + card.width*card.scaleX * i
        }
        startx = startx + card.width*card.scaleX * 2 + card_group_dis
    }

    function add_card_three(arr){
        var value = arr[1]
        var oid   = parseInt(arr[2])
        var ocard = arr[3] 
        var ac = null
        var a = value.split("-")
        for(var i = 0; i < a.length; i++){
            var card = __factory.get(UpPlayerDoorCardLight, a[i])
            that.addChild(card)
            card.x = startx + card.width*card.scaleX * i
            if(oid && i == 1)ac = card
            else if(!oid && ocard == a[i])ac = card
        }
        startx = startx + card.width*card.scaleX * 3 + card_group_dis

        if(__data.desk.idToPlayervo[oid]){
            var p1 = __data.desk.upPlayervo.position
            var p2 = __data.desk.idToPlayervo[oid].position
            var arrowid = ""
            if(p1 + 1 == p2 || (p1 == 4 && p2 == 1)){
                arrowid = id_arrow_left
            }else if(p1 - 1 == p2 || (p1 == 1 && p2 == 4)){
                arrowid = id_arrow_right
            }else if(p1 + 2 == p2 || p1-2 == p2){
                arrowid = id_arrow_down
            }

            var arrow = game.cache.get(arrowid)
            arrow.scale(0.5, 0.5)
            that.addChild(arrow)
            arrow.x = ac.x + (ac.width*ac.scaleX - arrow.width*arrow.scaleX) / 2
            arrow.y = ac.y + ac.height*ac.scaleY - 15 - arrow.height*arrow.scaleY
        }else {
            var red = game.cache.get(id_red)
            red.scale(0.8, 0.8)
            that.addChild(red)
            red.x = ac.x + (ac.width*ac.scaleX - red.width*red.scaleX) / 2
            red.y = ac.y + ac.height*ac.scaleY - 15 - red.height*red.scaleY
        }
    }

    function add_card_dark(value){
        var a = value.split("-")
        for(var i = 0; i < 3; i++){
            var card = game.cache.get(id_door_card_dark)
            card.flower = a[0]
            that.addChild(card)
            card.x = startx + card.width*card.scaleX * i
        }
        var card = __factory.get(UpPlayerDoorCardLight, a[0])//__factory.get(UpPlayerDoorCardLight, a[0])
        card.x = startx + card.width*card.scaleX * 1
        card.y = -13
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
            var card = __factory.get(UpPlayerDoorCardLight, a[0])
            that.addChild(card)
            card.x = startx + card.width*card.scaleX * i
        }
        var card = __factory.get(UpPlayerDoorCardLight, a[0])
        card.x = startx + card.width*card.scaleX * 1
        card.y = -13
        that.addChild(card)
        startx = startx + card.width*card.scaleX * 3 + card_group_dis

        ac = card
        if(__data.desk.idToPlayervo[oid]){
            var p1 = __data.desk.upPlayervo.position
            var p2 = __data.desk.idToPlayervo[oid].position

            var arrowid = ""
            if(p1 + 1 == p2 || (p1 == 4 && p2 == 1)){
                arrowid = id_arrow_left
            }else if(p1 - 1 == p2 || (p1 == 1 && p2 == 4)){
                arrowid = id_arrow_right
            }else if(p1 + 2 == p2 || p1-2 == p2){
                arrowid = id_arrow_down
            }

            var arrow = game.cache.get(arrowid)
            arrow.scale(0.5, 0.5)
            that.addChild(arrow)
            arrow.x = ac.x + (ac.width*ac.scaleX - arrow.width*arrow.scaleX) / 2
            arrow.y = ac.y + ac.height*ac.scaleY - 15 - arrow.height*arrow.scaleY
        }
    }

}Laya.class(DeskPlayingUpPlayerCard, "DeskPlayingUpPlayerCard", Laya.Sprite)

function UpPlayerHandCard(){
    UpPlayerHandCard.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_3.png")
}Laya.class(UpPlayerHandCard, "UpPlayerHandCard", Laya.Sprite)

function UpPlayerDoorCardDark(){
    UpPlayerHandCard.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_2.png")
    this.scale(0.5, 0.5)
}Laya.class(UpPlayerDoorCardDark, "UpPlayerDoorCardDark", Laya.Sprite)

function UpPlayerDoorCardLight(){
    UpPlayerHandCard.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_1.png")
    var flower = game.utils.getSprite(null, "card/0.png")
    flower.scale(0.7, 0.7)
    flower.rotation = 180
    flower.x = 71   
    flower.y = 82
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

    this.scale(0.5, 0.5)
}Laya.class(UpPlayerDoorCardLight, "UpPlayerDoorCardLight", Laya.Sprite)

__factory.cache(UpPlayerDoorCardLight)

function UpPlayerDorrCard_LeftArrow(){
    UpPlayerDorrCard_LeftArrow.super(this)
    game.utils.getSprite(this, "desk/arrow_left.png")
}
Laya.class(UpPlayerDorrCard_LeftArrow, "UpPlayerDorrCard_LeftArrow", Laya.Sprite)

function UpPlayerDorrCard_RightArrow(){
    UpPlayerDorrCard_RightArrow.super(this)
    game.utils.getSprite(this, "desk/arrow_right.png")
}
Laya.class(UpPlayerDorrCard_RightArrow, "UpPlayerDorrCard_RightArrow", Laya.Sprite)

function UpPlayerDorrCard_DownArrow(){
    UpPlayerDorrCard_DownArrow.super(this)
    game.utils.getSprite(this, "desk/arrow_down.png")
}
Laya.class(UpPlayerDorrCard_DownArrow, "UpPlayerDorrCard_DownArrow", Laya.Sprite)

function UpPlayerDorrCard_Red(){
    UpPlayerDorrCard_Red.super(this)
    game.utils.getSprite(this, "desk/red.png")
}
Laya.class(UpPlayerDorrCard_Red, "UpPlayerDorrCard_Red", Laya.Sprite)