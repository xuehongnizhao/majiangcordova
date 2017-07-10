/* 
* @Author: 轻飘时刻
* @Date:   2017-02-13 17:35:02
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-15 18:21:56
*/
function MainScene(){
    MainScene.super(this)
    var that = this
    this.params = {
        "layer":game.scene.bottomLayer, 
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":true,
        "up":false,
        "down":false,
        "left":false,
        "right":false
    }

    this.notice = new Notice()
    this.notice.x = 200 
    this.notice.y = 195

    this.added = function(){
        this.btn_joinRoom.on("click", this, joinHandler);
        this.btn_createRoom.on("click", this, createHandler);
        this.addChild(this.notice);
        this.notice.update()
    }

    this.removed = function(){
        this.btn_joinRoom.off("click", this, joinHandler);
        this.btn_createRoom.off("click", this, createHandler);
    }

    function joinHandler(e){
        __sound.button()
        trace("加入游戏")
        game.server.send(3001, 2)
        // game.scene.add(PanelJoinRoom);
    }

    function createHandler(e){
        __sound.button()
        trace("创建房间")
        game.server.send(3001, 1)
        // game.scene.removeAll()
        // game.scene.add(DeskBG)
        // game.scene.add(Desk).addPlaying()
    }
}
Laya.class(MainScene, "MainScene", MainSceneUI)

// function MainSceneBG(){
//     MainSceneBG.super(this)
//     var that = this

//     this.params = {
//         "layer":game.scene.bottomLayer, 
//         "offx":0,
//         "offy":0,
//         "centerx":true,
//         "centery":true,
//         "up":false,
//         "down":false,
//         "left":false,
//         "right":false
//     }

//     game.utils.getSprite(this, "mainScene/bg.png")
// }
// Laya.class(MainSceneBG, "MainSceneBG", Laya.Sprite)
// 

// function MainSceneTest(){
//     MainSceneTest.super(this)
//     var that = this

//     this.params = {
//         "layer":game.scene.bottomLayer, 
//         "offx":0,
//         "offy":0,
//         "centerx":false,
//         "centery":false,
//         "up":true,
//         "down":false,
//         "left":true,
//         "right":false
//     }

//     this.scale(game.scale, game.scale)

//     this.title.__adax = 0.5

//     this.btn_record.__adax = 1
//     this.btn_rule.__adax = 1
//     this.btn_set.__adax = 1

//     this.btn_msg.__adax = 1
//     this.btn_msg.__aday = 1
//     this.btn_share.__adax = 1
//     this.btn_share.__aday = 1

//     this.btn_joinGame.__adax = 0.5
//     this.btn_joinGame.__aday = 0.5
//     this.btn_createRoom.__adax = 0.5
//     this.btn_createRoom.__aday = 0.5
    
//     for(var i = 0; i < this.numChildren; i++){
//         var tc = this.getChildAt(i)
//         if(tc.parent){
//             tc.__adax = tc.__adax ? tc.__adax : 0
//             tc.__aday = tc.__aday ? tc.__aday : 0
//             tc.ratio_x = (tc.x + tc.__adax * tc.width) / this.width// + game.scale
//             tc.ratio_y = (tc.y + tc.__aday * tc.height) / this.height
//         }
//         // trace("tc.ratio_x", tc.ratio_x)
//         // trace("tc.ratio_y", tc.ratio_y)
//         // trace(game.width / game.scale)
//         // trace(game.height / game.scale)
//         tc.x = tc.ratio_x * (game.width / game.scale) - tc.width * tc.__adax
//         tc.y = tc.ratio_y * (game.height / game.scale) - tc.height * tc.__aday
//         // trace("tc.x", tc.x)
//         // trace("tc.y", tc.y)

//         this.btn_share.on("click", this, function(e){
//             trace("aaaaaaa")
//         })

        
//         // tc.y = tc.ratio_y * game.height
//         // trace("tc.y", tc.y)
//         // tc.x = tc.origin_x + (1-ratio_x) * tc.origin_x// + (1-game.ratio_w) * tc.origin_x
//         // tc.y = tc.origin_y + (1-ratio_y) * tc.origin_y +  + (1-game.ratio_w) * tc.origin_y
//         // trace("tc.y", tc.y)
//         // trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
//     }

//     this.height = game.height / game.scale
// }
// Laya.class(MainSceneTest, "MainSceneTest", MainSceneTestUI)


// function MajiangTest(){
//     MajiangTest.super(this)
//     var that = this

//     this.params = {
//         "layer":game.scene.bottomLayer, 
//         "offx":0,
//         "offy":0,
//         "centerx":false,
//         "centery":false,
//         "up":false,
//         "down":false,
//         "left":false,
//         "right":false
//     }

//     var vo = new PlayerVO()
//     vo.handCardArr = [14,14,15,15]
//     vo.doorCardArr = ["11-11-11","12-12-12", "13-13-13"]
//     vo.grabCard = 14

//     var arr = [11,12,13,14,15,16,17,18,19];
//     arr = arr.concat(21,22,23,24,25,26,27,28,29)
//     arr = arr.concat(31,32,33,34,35,36,37,38,39)
//     arr = arr.concat(41)
//     var list = new game.List(PaiItem, 9, 4, 0, -15)
//     this.addChild(list)
//     list.array = arr

//     var id = game.cache.registe(Laya.Sprite)
//     game.cb.addEvent("addHandCard", function(e){
//         vo.handCardArr.push(e)
//         game.cache.recoverAll(id)
//         for(var i = 0; i < vo.handCardArr.length; i++){
//             var a = game.cache.get(id)
//             game.utils.getSprite(a, "pai3/"+vo.handCardArr[i]+".png");
//             that.addChild(a);
//             a.x = 80+ i * (a.width - 10);
//             a.y = 390;
//         }
//     })

   
//     var door_id = game.cache.registe(Laya.Sprite)
    
//     var sp = new Laya.Sprite()
//     game.cb.addEvent("addGrabCard", function(e){
//         game.utils.getSprite(sp, "pai3/"+e+".png");
//         that.addChild(sp);
//         sp.x = 80
//         sp.y = 500;
//         vo.grabCard = e
//     })

//     _____type___ = "addHandCard"
//     this.btn_addHandCard.borderColor = "#000000"
//     this.btn_addGrabCard.borderColor = "#ffffff"
//     // this.btn_addDoorCard.borderColor = "#ffffff"
//     this.btn_addHandCard.on("click", this, function(e){
//         _____type___ = "addHandCard"
//         this.btn_addHandCard.borderColor = "#000000"
//         this.btn_addGrabCard.borderColor = "#ffffff"
//         // this.btn_addDoorCard.borderColor = "#ffffff"
//     })
//     this.btn_addGrabCard.on("click", this, function(e){
//         _____type___ = "addGrabCard"
//         this.btn_addHandCard.borderColor = "#ffffff"
//         // this.btn_addDoorCard.borderColor = "#ffffff"
//         this.btn_addGrabCard.borderColor = "#000000"
//     })

//     this.btn_clear.on("click", this, function(e){
//         game.utils.remove(sp)
//         vo.clear()
//         game.cache.recoverAll(id)
//         game.cache.recoverAll(door_id)
//     })

//     this.btn_hu.on("click", this, function(e){
//         if(vo.handCardArr.length && vo.grabCard != 0){
//             var time_ = Date.now()
//             __proxy.testHu(vo.handCardArr, vo.grabCard, vo.doorCardArr)
//             trace("胡牌检测 ", Date.now() - time_)
//         }
//     })

//     this.btn_ting.on("click", this, function(e){
//         if(vo.handCardArr.length){
//             __proxy.testTing(vo.handCardArr, vo.grabCard, vo.doorCardArr)
//         }
//     })
// }
// Laya.class(MajiangTest, "MajiangTest", MajiangTestUI)

// var _____type___

// function PaiItem(){
//     PaiItem.super(this)
//     var that = this

//     var _data;
//     function set_data(value){
//         _data = value
//         // trace(value)
//         game.utils.getSprite(this, "pai3/"+value+".png")
//         // trace(this.parent)
//     }
//     function get_data(){return _data}
//     game.utils.setget(this, "data", set_data, get_data)

//     this.on("click", this, function(e){
//         game.cb.dispatchEvent(_____type___, [_data])
//     })

//     this.width = 96
//     this.height = 112
// }
// Laya.class(PaiItem, "PaiItem", Laya.Sprite)



