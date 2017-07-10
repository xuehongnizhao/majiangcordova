/* 
* @Author: 轻飘时刻
* @Date:   2017-04-11 14:45:57
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-04-11 15:05:00
*/
function DeskBG(){
    DeskBG.super(this)
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
    game.utils.getSprite(this, "desk/bg.png")
}
Laya.class(DeskBG, "DeskBG", Laya.Sprite)