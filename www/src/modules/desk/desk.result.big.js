/* 
* @Author: 轻飘时刻
* @Date:   2017-05-08 18:45:27
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-18 18:58:55
*/
function DeskResultBig(){
    DeskResultBig.super(this)
    var that = this;
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

    var itemArr = [this.item1, this.item2, this.item3, this.item4]
    new LogicBigResultItem(this.item1)
    new LogicBigResultItem(this.item2)
    new LogicBigResultItem(this.item3)
    new LogicBigResultItem(this.item4)

    this.added = function(arr){
        this.btn_share.on("click", this, shareHandler)
        this.btn_returnHall.on("click", this, returnHallHandler)
        update()
        game.cb.addEvent(__event.UPDATE_BIG_RESULT, update)
    }

    this.removed = function(){
        this.btn_share.off("click", this, shareHandler)
        this.btn_returnHall.off("click", this, returnHallHandler)
        game.cb.removeEvent(__event.UPDATE_BIG_RESULT, update)
    }

    function update(){
        if(DeskResultBig.m)
        for(var i = 0; i < DeskResultBig.m.length; i++){
            itemArr[i].update(DeskResultBig.m[i])
        }
    }

    function shareHandler(e){
        __sound.button()
        trace("点击分享")
        try{
            shareImageToPy()
        }catch(e){
            
        }
    }

    function returnHallHandler(e){
        __sound.button()
        trace("点击返回大厅")
        __proxy.showMainScene();
    }
}
Laya.class(DeskResultBig, "DeskResultBig", DeskResultBigUI)

function LogicBigResultItem(_view){
    var that = this;
    _view.update = function(vo){
        _view.txt_name.text = vo.name
        _view.txt_id.text = vo.id
        _view.txt_exp.text = "Exp:"+vo.exp
        _view.txt_zimo.text = "自摸次数："+vo.zimo
        _view.txt_jiepao.text = "接炮次数："+vo.jiepao
        _view.txt_dianpao.text = "点炮次数："+vo.dianpao
        _view.txt_angang.text = "暗杠次数："+vo.angang
        _view.txt_minggang.text = "明杠次数："+vo.minggang
        _view.txt_score.text = vo.score
        
        if(vo.winState&&vo.paoState){
            _view.icon.skin = "result_big/dyj.png"
            _view.icon1.skin = "result_big/zjps.png"
        }else if(vo.winState){
            _view.icon.skin = "result_big/dyj.png"
            _view.icon1.skin = ""
        }else if(vo.paoState){
            _view.icon.skin = "result_big/zjps.png"
            _view.icon1.skin = ""
        }else {
            _view.icon.skin = ""
            _view.icon1.skin = ""
        }

        __loadImage.load(vo.url, vo.id, _view.head)
    }
}

function BigResultItemVO(){
    this.id
    this.name
    this.exp
    this.zimo
    this.jiepao
    this.dianpao
    this.angang
    this.minggang
    this.score
    this.paoState = false//最佳炮手 状态
    this.winState = false//最大赢家 状态
}