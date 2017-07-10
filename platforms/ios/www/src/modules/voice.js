/* 
* @Author: 轻飘时刻
* @Date:   2017-05-14 01:47:21
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-14 15:26:00
*/
function __TalkUtils(){
    __TalkUtils.super(this);
    var that = this

    var _index = 0;
    var _skinArr = ["voice/ly7.png", "voice/ly6.png", "voice/ly5.png", "voice/ly4.png", "voice/ly3.png", "voice/ly2.png", "voice/ly1.png"]

    var _mark = new Laya.Sprite();
    _mark.graphics.drawRect(0,0,game.width, game.height)
    this.addChild(_mark);
    _mark.size(game.width, game.height)

    var _talkImg = new Laya.Image(); 
    _talkImg.skin = _skinArr[_index];
    _talkImg.x = (game.width - _talkImg.width) / 2;
    _talkImg.y = (game.height - _talkImg.height) / 2;
    this.addChild(_talkImg);

    this.on("added", this, addedHandler)
    function addedHandler(){
        _index = 0;
        Laya.timer.loop(120, that, actionHandler);
    }

    function actionHandler(){
        _index ++;
        if(_index >= _skinArr.length){ _index = 0 }
        _talkImg.skin = _skinArr[_index];
    }

    this.on("removed", this, removeHandler);
    function removeHandler(){ Laya.timer.clear(that, actionHandler); }
}
Laya.class(__TalkUtils, "__TalkUtils", Laya.Sprite)

/**
 * 录音冷却时间
 */
var __yyTime = 0
function startYYtime(){
    __yyTime = 11
    countYYtimerHandler()
    Laya.timer.clear(this, countYYtimerHandler);
    Laya.timer.loop(1000, this, countYYtimerHandler);
}

function countYYtimerHandler(){
    __yyTime -= 1;
    if(__yyTime == 0){ 
        game.cb.dispatchEvent("show_yy_animation");
        Laya.timer.clear(this, countYYtimerHandler)
    }
    else{ game.cb.dispatchEvent("show_yy_countAnimation", [__yyTime]) }
}
