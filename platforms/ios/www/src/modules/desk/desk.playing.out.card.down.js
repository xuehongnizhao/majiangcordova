/* 
* @Author: 轻飘时刻
* @Date:   2017-04-27 14:23:29
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-01 11:28:15
*/
function DeskPlayingOutCardDown(){
    DeskPlayingOutCardDown.super(this)
    var that = this;

    this.cacheAs = config.cacheModel

    var cardid = game.cache.registe(DeskPlayingOutCardDownItem)
    this.vo = __data.desk.downPlayervo;
    var num = 10//一排多少个麻将

    var outCard = new DeskPlayingOutCardDownItem()

    this.on("added", this, function(e){
        game.cb.addEvent(__event.DESK_DOWN_PLAYER_READY_OUT_CARD, readyOut)
    })

    this.on("removed", this, function(e){
        game.cb.removeEvent(__event.DESK_DOWN_PLAYER_READY_OUT_CARD, readyOut)
    })

    this.clear = function(){
        __factory.recoverAll(DeskPlayingOutCardDownItem)
        __factory.recoverAll(DeskPlayingOutCardDownBuhua)
    }

    function readyOut(flower){
        outCard.x = 150
        outCard.y = -100
        outCard.scale(1, 1)
        that.addChild(outCard)
        outCard.flower = flower
    }

    this.out = function(flower_){
        if(parseInt(flower_)<=33)__sound.playGameYx(this.vo.sex+"/pai_"+flower_)
        else {__sound.playGameYx(this.vo.sex+"/"+"buhua");this.vo.outCard.push(flower_);that.update();return;}
        // this.update()//如果出牌快过无法触发tween com 那么需要强制更新上次的
        outCard.x = 150
        outCard.y = -100
        outCard.scale(1, 1)
        this.vo.outCard.push(flower_)
        this.addChild(outCard)
        outCard.flower = flower_

        var arr = this.vo.outCard;
        var oc = [];
        var bh = [];
        for(var i = 0; i < arr.length; i++){
            if(parseInt(arr[i]) >= 0){
                if(parseInt(arr[i])<=33){
                    oc.push(arr[i])
                }else{
                    bh.push(arr[i])
                }
            }
        }

        var i  = oc.length-1
        var c  = game.cache.get(cardid)
        var x_ = i%num * c.width * c.scaleX
        var y_ = -60-Math.floor(i/num) * 90 * c.scaleY

        TweenMax.killTweensOf(outCard)
        TweenMax.to(outCard, 0.3, {delay:1, x:x_, y:y_, scaleX:0.5, scaleY:0.5, ease:Linear.easeNone, onComplete:fall_down_card_complete, onCompleteParams:[x_ + c.width * c.scaleX / 2, y_ + c.height * c.scaleY / 2]})
    }

    function fall_down_card_complete(x_, y_){
        __sound.playGameYx("out_card")
        setTimeout(function(){
            game.utils.remove(outCard)
            TweenMax.killTweensOf(outCard)
            game.cb.dispatchEvent(__event.DESK_ADD_ARROW, [that.x + x_, that.y + y_])
            that.update()
        },1)
    }

    this.update = function(){
        game.utils.remove(outCard)
        this.clear()
        if(this.vo){
            var arr = this.vo.outCard;
            var oc = [];
            var bh = [];
            for(var i = 0; i < arr.length; i++){
                if(parseInt(arr[i]) >= 0){
                    if(parseInt(arr[i])<=33){
                        oc.push(arr[i])
                    }else{
                        bh.push(arr[i])
                    }
                }
            }

            for(var i = 0; i < oc.length; i++){
                var c = __factory.get(DeskPlayingOutCardDownItem, oc[i])
                this.addChildAt(c, 0)
                c.x = i%num * c.width * c.scaleX
                c.y = -60-Math.floor(i/num) * 90 * c.scaleY
            }

            // 补花列表
            for(var i = 0; i < bh.length; i++){
                var c = __factory.get(DeskPlayingOutCardDownBuhua, bh[i])
                this.addChild(c);
                c.x = -100+i * c.width * c.scaleX;
                c.y = 0
            }
        }
    }
}
Laya.class(DeskPlayingOutCardDown, "DeskPlayingOutCardDown", Laya.Sprite)

function DeskPlayingOutCardDownItem(){
    DeskPlayingOutCardDownItem.super(this)
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
    this.scale(0.5, 0.5)
}Laya.class(DeskPlayingOutCardDownItem, "DeskPlayingOutCardDownItem", Laya.Sprite)

__factory.cache(DeskPlayingOutCardDownItem)

function DeskPlayingOutCardDownBuhua(){
    DeskPlayingOutCardDownBuhua.super(this)
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
    this.scale(0.5 * 0.8, 0.5 * 0.8)
}Laya.class(DeskPlayingOutCardDownBuhua, "DeskPlayingOutCardDownBuhua", Laya.Sprite)

__factory.cache(DeskPlayingOutCardDownBuhua)