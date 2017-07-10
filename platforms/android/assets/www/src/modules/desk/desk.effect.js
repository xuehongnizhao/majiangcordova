/* 
* @Author: 轻飘时刻
* @Date:   2017-04-15 11:00:51
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-15 20:36:42
*/

function DeskEffectHu(){
    DeskEffectHu.super(this)
    var that = this

    var card = new DeskEffectHuCard()
    this.addChild(card)
    var hu = game.utils.getSprite(null, "desk/effect_zi_hu.png")
    this.addChild(hu)

    card.pivot(card.width / 2, card.height / 2)
    hu.pivot(hu.width / 2, hu.height / 2)
    hu.y = 120
    // hu.x = (card.width - hu.width) / 2
    // hu.y = card.height + 5
    this.play = function(flower){
        card.flower = flower

        card.alpha = 0
        card.scaleX = 0.3
        card.scaleY = 0.3
        TweenMax.killTweensOf(card)
        TweenMax.to(card, 0.3, {alpha:1, scaleX:1, scaleY:1})

        hu.alpha = 0
        hu.scaleX = 0.3
        hu.scaleY = 0.3
        TweenMax.killTweensOf(hu)
        TweenMax.to(hu, 0.3, {alpha:1, scaleX:1, scaleY:1})

        setTimeout(ko, 1500)
    }

    function ko(){
        TweenMax.killTweensOf(card)
        TweenMax.killTweensOf(hu)
        game.utils.remove(that)
    }
}
Laya.class(DeskEffectHu, "DeskEffectHu", Laya.Sprite)
function DeskEffectHuCard(){
    DeskEffectHuCard.super(this)
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
}Laya.class(DeskEffectHuCard, "DeskEffectHuCard", Laya.Sprite)


function DeskEffectBuhua(){
    DeskEffectBuhua.super(this)   
    var that = this;

    var card = new DeskEffectBuhuaCard()
    var icon = game.utils.getSprite(null, "desk_effect/buhua.png")
    card.pivot(card.width / 2, card.height / 2)
    icon.pivot(icon.width / 2, icon.height / 2)

    this.addChild(icon)
    this.addChild(card)

    this.play = function(flower){
        this.alpha = 1
        icon.alpha = 0
        icon.scaleX = 0.3
        icon.scaleY = 0.3
        TweenMax.to(icon, 0.5, {alpha:1, scaleX:1, scaleY:1})

        card.flower = flower
        card.alpha = 0
        card.scaleX = 0.3
        card.scaleY = 0.3
        TweenMax.to(card, 0.3, {delay:0.2, alpha:1, scaleX:1, scaleY:1})

        setTimeout(out, 1000)

        TweenMax.killTweensOf(that)
    }
    this.on("removed", this, function(){

    })

    function out(){
        TweenMax.killTweensOf(that)
        TweenMax.to(that, 0.3, {alpha:0, onComplete:aabbcc})
    }

    function aabbcc(){
        game.utils.remove(that)
    }
}
Laya.class(DeskEffectBuhua, "DeskEffectBuhua", Laya.Sprite)

function DeskEffectBuhuaCard(){
    DeskEffectBuhuaCard.super(this)
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
}Laya.class(DeskEffectBuhuaCard, "DeskEffectBuhuaCard", Laya.Sprite)

function DeskEffectCangying(){
    DeskEffectCangying.super(this)
    var that = this

    var zi = game.utils.getSprite(null, "desk_effect/feicangying.png")
    var card = new DeskEffectCangyingCard()
    var light = game.utils.getSprite(null, "desk_effect/feicangyingtexiao.png")
    this.addChild(light)
    this.addChild(card)
    this.addChild(zi)
    light.pivot(light.width / 2, light.height / 2)
    card.pivot(card.width / 2, card.height / 2)
    zi.pivot(zi.width / 2, zi.height / 2)
    zi.y = -100


    var score = game.utils.getSprite(null, "desk/+1.png")
    this.addChild(score)
    score.y = 80
    score.pivot(score.width / 2, score.height / 2)

    this.play = function(flower, score_){
        this.alpha = 1

        light.rotation = 0
        light.scaleX = light.scaleY = 0.3
        light.alpha = 0
        TweenMax.killTweensOf(light)
        TweenMax.to(light, 0.5, {alpha:1, scaleX:1, scaleY:1})
        TweenMax.to(light, 10, {rotation:360, repeat:-1, ease:Linear.easeNone})

        card.flower = flower
        card.scaleX = card.scaleY = 0.5
        card.alpha = 0
        TweenMax.killTweensOf(card)
        TweenMax.to(card, 0.3, {alpha:1, scaleX:1, scaleY:1})

        zi.flower = flower
        zi.alpha = 0
        TweenMax.killTweensOf(zi)
        zi.y = -200
        TweenMax.to(zi, 0.3, {alpha:1, y:-100})

        game.utils.getSprite(score, "desk/+"+score_+".png")
        score.y = 200
        score.alpha = 0
        TweenMax.to(score, 0.3, {alpha:1, y:80})

        setTimeout(koHandler, 2000)
    }

    function koHandler(){
        TweenMax.to(that, 0.3, {alpha:0, onComplete:ko1})
    }

    function ko1(){
        game.utils.remove(that)
    }

    this.on("removed", this, function(){

    })
}
Laya.class(DeskEffectCangying, "DeskEffectCangying", Laya.Sprite)

function DeskEffectCangyingCard(){
    DeskEffectCangyingCard.super(this)
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
}Laya.class(DeskEffectCangyingCard, "DeskEffectCangyingCard", Laya.Sprite)


function DeskEffectAct(){
    DeskEffectAct.super(this)
    var that = this;

    var fire = new game.Animation()
    fire.json = {
        "maxSprite":1,
        "width":360,
        "height":404,
        "action":{
            "run":{
                "delay":100,
                "repeat":false,
                "length":9,
                "frame0":{"body":{"name":"effect_fire/IMG00000.png","x":0,"y":0}},
                "frame1":{"body":{"name":"effect_fire/IMG00001.png","x":0,"y":0}},
                "frame2":{"body":{"name":"effect_fire/IMG00002.png","x":0,"y":0}},
                "frame3":{"body":{"name":"effect_fire/IMG00003.png","x":0,"y":0}},
                "frame4":{"body":{"name":"effect_fire/IMG00004.png","x":0,"y":0}},
                "frame5":{"body":{"name":"effect_fire/IMG00005.png","x":0,"y":0}},
                "frame6":{"body":{"name":"effect_fire/IMG00006.png","x":0,"y":0}},
                "frame7":{"body":{"name":"effect_fire/IMG00007.png","x":0,"y":0}},
                "frame8":{"body":{"name":"effect_fire/IMG00007.png","x":0,"y":0}}
            }
        }
    }
    fire.pivot(fire.width/2,fire.height/2)
    this.addChild(fire)

    var zi = game.utils.getSprite(null, "desk/effect_zi_chi.png")
    this.addChild(zi)
    zi.pivot(zi.width/2,zi.height/2)
    
    fire.completeHandler = function(){
        fire.stop()
        game.utils.remove(that)
    }

    var typeToAct = []
    typeToAct[0] = null
    typeToAct[2] = "desk/effect_zi_peng.png"
    typeToAct[3] = "desk/effect_zi_chi.png"
    typeToAct[4] = "desk/effect_zi_gang.png"
    typeToAct[6] = "desk/effect_zi_ting.png"
    typeToAct[9] = "desk/effect_zi_ting.png"
    typeToAct[10] = "desk/effect_zi_ting.png"
    // 0没有 2碰 3吃 4杠 6听 9吃听 10碰听
    this.addEffect = function(type){
        game.utils.getSprite(zi, typeToAct[type])
        // that.x = game.width / 2 - fire.width / 2
        // that.y = game.height / 2 - fire.height / 2
        fire.skip("run")
        fire.play()
    }
}
Laya.class(DeskEffectAct, "DeskEffectAct", Laya.Sprite)