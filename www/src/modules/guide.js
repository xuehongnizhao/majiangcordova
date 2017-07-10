/* 
* @Author: 轻飘时刻
* @Date:   2017-05-17 15:49:18
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-18 17:42:00
*/
function Guide(){
    Guide.super(this)
    var that = this

    this.params = {
        "layer":game.scene.middleLayer, 
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":true,
        "up":false,
        "down":false,
        "left":false,
        "right":false
    }

    var icon_container = new Laya.Sprite()
    this.addChild(icon_container)
    
    var pArr = [new Laya.Image("guide/1.png"), new Laya.Image("guide/2.png")];
    icon_container.addChild(pArr[0])
    icon_container.addChild(pArr[1])
    var index = 0
    var urlArr = ["guide/1.png", "guide/2.png", "guide/3.png", "guide/4.png"]

    this.width = pArr[0].width
    this.height = pArr[0].height

    var r = new Laya.Rectangle()
    r.x = 0
    r.y = 0
    r.width = this.width
    r.height = this.height
    icon_container.scrollRect = r

    this.btn_close = game.utils.getSprite(null, "guide/x.png")
    this.addChild(this.btn_close)
    this.btn_close.x = 880
    this.btn_close.y = 0

    this.btn_left = game.utils.getSprite(null, "guide/zuo.png")
    this.addChild(this.btn_left)
    this.btn_left.y = (pArr[0].height - this.btn_left.height) / 2

    this.btn_right = game.utils.getSprite(null, "guide/you.png")
    this.addChild(this.btn_right)
    this.btn_right.x = pArr[0].width - this.btn_right.width
    this.btn_right.y = (pArr[0].height - this.btn_right.height) / 2
    // alert(1)
    this.added = function(){
        istweening = false
        index = 0
        pArr[0].skin = urlArr[0]
        pArr[1].skin = urlArr[1]
        pArr[0].x = 0
        pArr[1].x = pArr[0].width
        this.alpha = 1
        // this.btn_next.on("click", this, nextHandler)
        this.btn_close.on("click", this, closeHandler)
        this.btn_left.on("click", this, leftHandler)
        this.btn_right.on("click", this, rightHandler)
    }

    this.removed = function(){
        // this.btn_next.off("click", this, nextHandler)
        this.btn_close.off("click", this, closeHandler)
        this.btn_left.off("click", this, leftHandler)
        this.btn_right.off("click", this, rightHandler)
    }

    function leftHandler(e){
        if(istweening){

        }else if(index > 2){
            trace("播放完毕")
            closeHandler()
        }else{
            istweening = true
            pArr[0].skin = urlArr[index]
            pArr[0].x = 0
            pArr[1].skin = urlArr[index+1]
            pArr[1].x = pArr[1].width
            TweenMax.killTweensOf(pArr[0])
            TweenMax.killTweensOf(pArr[1])
            TweenMax.to(pArr[0], 0.3, {x:-pArr[0].width, ease:Linear.easeNone})
            TweenMax.to(pArr[1], 0.3, {x:-0, ease:Linear.easeNone, onComplete:tweenko})
            index++
        }

    }

    var istweening = false
    function tweenko(){
        istweening = false
    }

    function rightHandler(e){
        if(istweening){

        }else if(index == 0){

        }else {
            istweening = true
            pArr[0].skin = urlArr[index]
            pArr[0].x = 0
            pArr[1].skin = urlArr[index-1]
            pArr[1].x = -pArr[1].width
            TweenMax.killTweensOf(pArr[0])
            TweenMax.killTweensOf(pArr[1])
            TweenMax.to(pArr[0], 0.3, {x:pArr[0].width, ease:Linear.easeNone})
            TweenMax.to(pArr[1], 0.3, {x:-0, ease:Linear.easeNone, onComplete:tweenko})
            index--
        }
    }

    function nextHandler(e){

    }

    function closeHandler(e){
        TweenMax.to(that, 0.5, {x:-that.width, alpha:0, onComplete:removeHandler})
    }

    function removeHandler(e){
        game.scene.remove(that)
        game.server.send(2003)
    }

}
Laya.class(Guide, "Guide", Laya.Sprite)