/* 
* @Author: 轻飘时刻
* @Date:   2017-04-27 16:34:48
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-07 12:26:00
*/
function DeskPlayingArrow(container_, arrow_){
    var that = this
    
    var tox;
    var toy;

    game.utils.remove(arrow_)
    
    function moveTo(x_, y_){

        TweenMax.killTweensOf(arrow_)
        arrow_.x = x_;
        arrow_.y = y_;
        container_.addChild(arrow_)

        TweenMax.to(arrow_, 0.5, {x:x_, y:y_-15, ease:Linear.easeNone, repeat:-1, yoyo:true})
    }

    arrow_.clear = function(){
        TweenMax.killTweensOf(arrow_)
        game.utils.remove(arrow_)
    }

    function removeArrow(){
        game.utils.remove(arrow_)
    }

    game.cb.addEvent(__event.DESK_ADD_ARROW, moveTo)
    game.cb.addEvent(__event.DESK_REMOVE_ARROW, removeArrow)
}