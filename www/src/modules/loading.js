/* 
* @Author: 轻飘时刻
* @Date:   2017-02-13 16:17:40
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-18 13:34:25
*/
function Loading(){
    Loading.super(this)
    var that = this
    
    this.params = {
        "layer":game.scene.panel1Layer, 
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":true,
        "up":false,
        "down":false,
        "left":false,
        "right":false
    }

    var light = new game.Animation()
    light.json = {
        "maxSprite":1,
        "width":182,
        "height":124,
        "action":{
            "fly":{
                "delay":100,
                "repeat":true,
                "length":4,
                "frame0":{"body":{"name":"loading/load4a.png","x":0,"y":0}}
                ,"frame1":{"body":{"name":"loading/load4b.png","x":0,"y":0}}
                ,"frame2":{"body":{"name":"loading/load4c.png","x":0,"y":0}}
                ,"frame3":{"body":{"name":"loading/load4d.png","x":0,"y":0}}
            }
        }
    }
    this.addChild(light)

    var b2x = this.b2.x
    var __r = new Laya.Rectangle()
    __r.width = this.b2.width
    __r.height = this.b2.height
    this.b2.scrollRect = __r
    
    this.added = function(){
        light.skip("fly")
        light.play()
        __r.x = -__r.width
        this.b2.x = b2x - this.b2.width
        light.x = this.b2.x + this.b2.width - 139
        light.y = this.b2.y - 40
    }
    
    this.removed = function(){
        light.stop()
    }
    
    var loading_obobobobobob = {a:0};
    var last_perent = 0
    
    this.progress = function(value){
        value = value % 1
        value == 0 && (value = 1)
        // loading_obobobobobob.a = last_perent;
        loading_obobobobobob.a = value;
        sdjlfkj();
        last_perent = value
        // TweenMax.killTweensOf(loading_obobobobobob)
        // TweenMax.to(loading_obobobobobob, 0.5, {a:value, onUpdate:sdjlfkj, ease:Linear.easeNone})
    }
    
    function sdjlfkj(){
        var value = loading_obobobobobob.a
        __r.x = -__r.width + value * __r.width
        that.b2.x = b2x - that.b2.width + value * __r.width
        light.x = that.b2.x + that.b2.width - 139
        light.y = that.b2.y - 40
    }
}
Laya.class(Loading, "Loading", LoadingUI)