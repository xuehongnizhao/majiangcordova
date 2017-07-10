/* 
* @Author: 轻飘时刻
* @Date:   2017-04-29 15:38:58
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-13 21:42:19
*/
function DeskPlayingTingSign(container_){
    DeskPlayingTingSign.super(this)
    var that = this
    var container = container_

    this.clear = function(){
        game.utils.remove(ting_up)
        game.utils.remove(ting_down)
        game.utils.remove(ting_left)
        game.utils.remove(ting_right)
        ting_up.stop()
        ting_down.stop()
        ting_left.stop()
        ting_right.stop()
    }

    this.update = function(){
        if(this.parent){

        }else {
            container.addChild(this)
        }

        this.clear()

        if(__data.desk.upPlayervo.tingState){
            this.addChild(ting_up)
            ting_up.skip("run")
            ting_up.play()
        }

        if(__data.desk.downPlayervo.tingState){
            this.addChild(ting_down)
            ting_down.skip("run")
            ting_down.play()
        }

        if(__data.desk.leftPlayervo.tingState){
            this.addChild(ting_left)
            ting_left.skip("run")
            ting_left.play()
        }

        if(__data.desk.rightPlayervo.tingState){
            this.addChild(ting_right)
            ting_right.skip("run")
            ting_right.play()
        }
    }

    var ting_down = new game.Animation()
    ting_down.x = 500
    ting_down.y = 570
    ting_down.json = {
        "maxSprite":1,
        "width":360,
        "height":404,
        "action":{
            "run":{
                "delay":100,
                "repeat":true,
                "length":4,
                "frame0":{"body":{"name":"desk/yta1.png","x":0,"y":0}},
                "frame1":{"body":{"name":"desk/yta1.png","x":0,"y":0}},
                "frame2":{"body":{"name":"desk/yta1.png","x":0,"y":0}},
                "frame3":{"body":{"name":"desk/yta2.png","x":0,"y":0}}
            }
        }
    }
    
    var ting_left = new game.Animation()
    ting_left.x = 210
    ting_left.y = 180
    ting_left.json = {
        "maxSprite":1,
        "width":360,
        "height":404,
        "action":{
            "run":{
                "delay":100,
                "repeat":true,
                "length":4,
                "frame0":{"body":{"name":"desk/ytb1.png","x":0,"y":0}},
                "frame1":{"body":{"name":"desk/ytb1.png","x":0,"y":0}},
                "frame2":{"body":{"name":"desk/ytb1.png","x":0,"y":0}},
                "frame3":{"body":{"name":"desk/ytb2.png","x":0,"y":0}}
            }
        }
    }

    var ting_right = new game.Animation()
    ting_right.x = 1040
    ting_right.y = 180
    ting_right.json = {
        "maxSprite":1,
        "width":360,
        "height":404,
        "action":{
            "run":{
                "delay":100,
                "repeat":true,
                "length":4,
                "frame0":{"body":{"name":"desk/ytb1.png","x":0,"y":0}},
                "frame1":{"body":{"name":"desk/ytb1.png","x":0,"y":0}},
                "frame2":{"body":{"name":"desk/ytb1.png","x":0,"y":0}},
                "frame3":{"body":{"name":"desk/ytb2.png","x":0,"y":0}}
            }
        }
    }
    
    var ting_up = new game.Animation()
    ting_up.x = 600
    ting_up.y = 75
    ting_up.json = {
        "maxSprite":1,
        "width":360,
        "height":404,
        "action":{
            "run":{
                "delay":100,
                "repeat":true,
                "length":4,
                "frame0":{"body":{"name":"desk/yta1.png","x":0,"y":0}},
                "frame1":{"body":{"name":"desk/yta1.png","x":0,"y":0}},
                "frame2":{"body":{"name":"desk/yta1.png","x":0,"y":0}},
                "frame3":{"body":{"name":"desk/yta2.png","x":0,"y":0}}
            }
        }
    }
    
}
Laya.class(DeskPlayingTingSign, "DeskPlayingTingSign", Laya.Sprite)