/* 
* @Author: 轻飘时刻
* @Date:   2017-04-29 13:42:31
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-16 16:49:40
*/
function DeskPlayingCardGroup(){
    DeskPlayingCardGroup.super(this)
    var that = this

    this.cacheAs = config.cacheModel;

    var cardGroupID = game.cache.registe(DeskPlayingCardGroupItem)

    var pt = game.utils.getSprite(null, "desk/card_group_select_pt.png")

    this.addCardGroup = function(value, type){
        trace("添加牌组：", value)

        //吃牌 牌组 有多个牌组的时候 进行排序
        if(type == "chi"){
            value.sort(function(a, b){
                return a[2] - b[2]
            })
        }

        for(var i = 0; i < value.length; i++){
            var c = game.cache.get(cardGroupID)
            c.flower = value[i]
            this.addChild(c)
            c.x = i % 3 * (c.___width*c.scaleX + 10)
            c.y = -Math.floor(i/3)*(c.height*c.scaleY + 10)
        }

        this.addChild(pt)
    }

    this.on("added", this, function(e){

    })

    this.on("removed", this, function(e){
        game.cache.recoverAll(cardGroupID)
    })
}
Laya.class(DeskPlayingCardGroup, "DeskPlayingCardGroup", Laya.Sprite)

function DeskPlayingCardGroupItem(){
    DeskPlayingCardGroupItem.super(this)
    var that = this

    this.on("click", this, function(e){
        trace("选择牌组")
        game.cb.dispatchEvent(__event.DESK_REMOVE_CARD_GROUP)
        game.server.send(6003, _value[0], _value[2])
    })

    var bg = new Laya.Image("desk/card_group_select_bg.png")
    this.addChild(bg)
    bg.sizeGrid = "10,10,10,10"

    var cardArr = [new DeskPlayingCardGroupItemCard(),new DeskPlayingCardGroupItemCard(),new DeskPlayingCardGroupItemCard(),new DeskPlayingCardGroupItemCard()]

    //计算宽度 按照最大宽度计算
    this.___width = cardArr[0].width*4 + 20
    this.height = bg.height

    var _flower = null
    var _value
    //value = [type, bounceCardValue, card1, cardn]
    function set_flower(value){
        _value = value
        for(var i = 0; i < cardArr.length; i++)game.utils.remove(cardArr[i])
        var a = value.slice(2, value.length)
        for(var i = 0; i < a.length; i++){
            var c = cardArr[i]
            c.flower = a[i];
            c.x = c.width*i + 10;
            c.y = 30;
            if(a[i]==value[1])c.y = 20
            that.addChild(c);
        }
        bg.width = c.x + c.width + 10
        this.width = bg.width
    }
    function get_flower(){
        return _flower
    }
    game.utils.setget(this, "flower", set_flower, get_flower)
    // game.utils.getSprite(this, "desk/card_group_select_bg.png")
}
Laya.class(DeskPlayingCardGroupItem, "DeskPlayingCardGroupItem", Laya.Sprite)

function DeskPlayingCardGroupItemCard(){
    DeskPlayingCardGroupItemCard.super(this)
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
    // this.scale(0.5, 0.5)
}Laya.class(DeskPlayingCardGroupItemCard, "DeskPlayingCardGroupItemCard", Laya.Sprite)

