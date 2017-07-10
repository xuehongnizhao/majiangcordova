/* 
* @Author: 轻飘时刻
* @Date:   2017-05-08 10:57:50
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-26 10:44:50
*/
function DeskResultSmall(){
    DeskResultSmall.super(this)
    var that = this

    this.params = {
        "layer":game.scene.panel0Layer, 
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":true,
        "up":false,
        "down":false,
        "left":false,
        "right":false
    }

    this.cacheAs = config.cacheModel

    var g = new Laya.Sprite()
    g.graphics.drawRect(0,0,1500,1500, "#000000");
    g.size(1500,1500)
    g.alpha = 0.7
    this.addChildAt(g, 0)

    var itemArr = [this.item1, this.item2, this.item3, this.item4];
    new LogicSmallResultItem(this.item1)
    new LogicSmallResultItem(this.item2)
    new LogicSmallResultItem(this.item3)
    new LogicSmallResultItem(this.item4)

    this.added = function(arr, allPaixing){
        if(!arr&&!allPaixing)return;
        //allPaixing里面有胡牌玩家id集合
        __factory.recoverAll(DeskResultSmallCard)

        if(allPaixing.indexOf(__data.ivo.id.toString()) > -1){
            that.icon_result.skin = "result_small/win.png"
            __sound.playGameYx("win")
        }else {
            __sound.playGameYx("lose")
            that.icon_result.skin = "result_small/lose.png"
        }

        if(__data.desk.curMatch == __data.desk.totalMatch){
            this.btn_start.skin = "result_small/queding.png"
        }else{
            this.btn_start.skin = "result_small/start.png"
        }

        for(var i = 0; i < arr.length; i++){
            itemArr[i].update(arr[i])
        }
        this.btn_start.on("click", this, startHandler)
        this.btn_share.on("click", this, shareHandler)
    }

    this.removed = function(){
        this.btn_start.off("click", this, startHandler)
        this.btn_share.off("click", this, shareHandler)
    }

    function startHandler(e){
        __sound.button()
        trace("点击开始按钮")
        if(__data.desk.curMatch == __data.desk.totalMatch){
            game.scene.add(DeskResultBig)
        }else{
            game.cb.dispatchEvent(__event.NEXT_MATCH_CLEAR_DESK)
            game.server.send(6021)
            game.scene.remove(that)
        }
    }

    function shareHandler(e){
        __sound.button()
        trace("点击分享按钮")
        try{
            shareImageToPy()
        }catch(e){
            
        }
    }
}
Laya.class(DeskResultSmall, "DeskResultSmall", DeskResultSmallUI)

function SmallResultItemVO(){
    this.id
    this.name = "杜莫请吃饭"
    this.winPlayerID = 0;
    // this.grabCard = -1;
    this.handCard = [];
    this.doorCard = []
    this.outCard = [];
    this.buhua = 0
    this.shouhua = 0
    this.dihua = 1//默认就是1 不变
    this.cangying = 0
    this.fengding = 0
    this.gangfen = 0
    this.zongfen = 0
    this.curfen = 0//当前局分
    this.paixing = ""
    this.cangyingCardValue = -1
    this.winState = false
}

function LogicSmallResultItem(_view){
    var that = this

    var startx = 0
    var card_group_dis = 5
    var bounceCardOffy = -10
    _view.update = function(vo){
        startx = 30;

        _view.txt_name.text = vo.name
        if(vo.winState){
            _view.txt_hua.text = "补花×"+vo.buhua+" 手花×"+vo.shouhua+" 底花×" + vo.dihua
            _view.txt_paixing.text = vo.paixing

            //add 苍蝇牌
            if(parseInt(vo.cangyingCardValue) >= 0){
                var card = __factory.get(DeskResultSmallCard, vo.cangyingCardValue)
                card.x = 760
                card.y = _view.height - card.height*card.scaleY+bounceCardOffy
                _view.addChild(card)
            }
        }else{
            _view.txt_hua.text = ""
            _view.txt_paixing.text = ""
        }
        
        _view.txt_cangying.text = vo.cangying
        _view.txt_fengding.text = vo.fengding
        // _view.txt_gangfen.text = vo.gangfen
        _view.txt_zongfen.text = vo.zongfen
        _view.txt_curfen.text = vo.curfen

        var a = vo.doorCard
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(":")
            switch(b[0]){
                case "two":
                add_card_two(b[1])
                break;
                case "three":
                add_card_three(b[1])
                break;
                case "dark":
                add_card_light(b[1])
                break;
                case "light":
                add_card_light(b[1])
                break;
            }
        }

        var b = vo.handCard
        for(var i = 0; i < b.length; i++){
            if(parseInt(b[i])>=0){
                var card = __factory.get(DeskResultSmallCard, b[i])
                card.x = startx + card.width*card.scaleX * i
                card.y = _view.height - card.height*card.scaleY+bounceCardOffy
                _view.addChild(card)
            }
        }

        if(vo.winState && vo.hupai >= 0){
            //add 胡牌
            var card = __factory.get(DeskResultSmallCard, vo.hupai)
            card.x = startx + card.width*card.scaleX * i + 10
            card.y = _view.height - card.height*card.scaleY+bounceCardOffy
            _view.addChild(card)
            _view.addChild(_view.icon_hu)
            _view.icon_hu.x = card.x + 5 + card.width*card.scaleX;
        }else {
            game.utils.remove(_view.icon_hu)
        }
    }

    function add_card_two(value){
        var a = value.split("-")
        for(var i = 0; i < 2; i++){
            var card = __factory.get(DeskResultSmallCard, a[0])//game.cache.get(id_door_card_light)
            _view.addChild(card)
            card.x = startx + card.width*card.scaleX * i
            card.y = _view.height - card.height*card.scaleY+bounceCardOffy
        }
        startx = startx + card.width*card.scaleX * 2 + card_group_dis
    }

    function add_card_three(value){
        var a = value.split("-")
        for(var i = 0; i < a.length; i++){
            var card = __factory.get(DeskResultSmallCard, a[i])
            _view.addChild(card)
            card.x = startx + card.width*card.scaleX * i
            card.y = _view.height - card.height*card.scaleY+bounceCardOffy
        }
        startx = startx + card.width*card.scaleX * 3 + card_group_dis
    }

    // function add_card_dark(value){
    //     var a = value.split("-")
    //     for(var i = 0; i < 3; i++){
    //         var card = __factory.get(DeskResultSmallCard, a[0])
    //         _view.addChild(card)
    //         card.x = startx + card.width*card.scaleX * i
    //         card.y = _view.height - card.height*card.scaleY
    //     }
    //     var card = __factory.get(DeskResultSmallCard, a[0])
    //     card.x = startx + card.width*card.scaleX * 1
    //     card.y = _view.height - card.height*card.scaleY-27
    //     _view.addChild(card)
    //     startx = startx + card.width*card.scaleX * 3 + card_group_dis
    // }

    function add_card_light(value){
        var a = value.split("-")
        for(var i = 0; i < 3; i++){
            var card = __factory.get(DeskResultSmallCard, a[0])
            _view.addChild(card)
            card.x = startx + card.width*card.scaleX * i
            card.y = _view.height - card.height*card.scaleY+bounceCardOffy
        }
        var card = __factory.get(DeskResultSmallCard, a[0])
        card.x = startx + card.width*card.scaleX * 1
        card.y = _view.height - card.height*card.scaleY-27*card.scaleY+bounceCardOffy
        _view.addChild(card)
        startx = startx + card.width*card.scaleX * 3 + card_group_dis
    }

}

function DeskResultSmallCard(){
    DeskResultSmallCard.super(this)
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
    this.scale(0.55, 0.55)
}Laya.class(DeskResultSmallCard, "DeskResultSmallCard", Laya.Sprite)

__factory.cache(DeskResultSmallCard, 8)


