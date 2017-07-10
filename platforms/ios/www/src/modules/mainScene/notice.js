/* 
* @Author: 轻飘时刻
* @Date:   2017-02-13 17:46:25
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-04-07 18:30:39
*/
//公告
function Notice(){
    Notice.super(this);
    var that = this;

    game.utils.getSprite(this, "mainScene/noticebg.png")

    var txt = new Laya.Text()
    // txt.width = 1000
    // txt.overflow = "scroll"
    txt.fontSize = 30
    txt.color = "#fff"
    // txt.borderColor = "#fff"
    this.addChild(txt)
    // txt.text = "阿斯蒂芬接口了打123扫房间卢卡斯的房间卡拉123是打飞机撒了地方看见爱上234了对方会计123师大富科534技爱丽丝的咖啡机阿23斯兰的开发及访问"
    txt.text = ""
    txt.x = 110;
    txt.y = 12;

    var _r = new Laya.Rectangle()
    _r.width = 600
    _r.height = 50
    txt.scrollRect = _r

    function updateTxt(){
        _r.x+=2;
        if(_r.x >= txt.width){
            this.visible = 0
            Laya.timer.clear(this, updateTxt)
        }
    }

    game.cb.addEvent("notice", noticeHandler)

    function noticeHandler(){
        // if(!__data.ivo.hornContent){
        //     that.visible = 0
        //     return;
        // }
        // noticeContent = "阿斯蒂芬接口了打123扫房间卢卡斯的房间卡拉123是打飞机撒了地方看见爱上234了对方会计123师大富科534技爱丽丝的咖啡机阿23斯兰的开发及访问";
        that.visible = 1
        noticeContent = __data.ivo.hornContent
        txt.text = noticeContent;
        _r.x = -_r.width
        Laya.timer.frameLoop(1, that, updateTxt)
    }

    this.update = function(){
        noticeHandler()
    }

    game.cb.addEvent("hornEvent", this.update)

    this.width = 800
    this.height = 50
}
Laya.class(Notice, "Notice", Laya.Sprite)