/* 
* @Author: 轻飘时刻
* @Date:   2017-04-08 14:43:32
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-13 22:22:59
*/
function PanelRule(){
    PanelRule.super(this)
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
    this.btn_qiaoma.imageArr = ["panel_rule/qiaomawanfa1.png", "panel_rule/qiaomawanfa2.png", "panel_rule/qiaomawanfa3.png", "panel_rule/qiaomawanfa4.png", "panel_rule/qiaomawanfa5.png", "panel_rule/qiaomawanfa6.png"];
    this.btn_baida.imageArr = ["panel_rule/baidawanfa1.png","panel_rule/baidawanfa2.png","panel_rule/baidawanfa3.png","panel_rule/baidawanfa4.png","panel_rule/baidawanfa5.png"];
    var default_rule_imageArr = null;
    var index = 0;
    new game.BtnGroupSingleSelect([this.btn_qiaoma, this.btn_baida], ["panel_createRoom/play_qiaoma1.png","panel_createRoom/play_baida1.png"], ["panel_createRoom/play_qiaoma2.png","panel_createRoom/play_baida2.png"], function(target, e){
        e && __sound.button()
        default_rule_imageArr = target.imageArr
        update()
    }, 0)

    this.added = function(){
        this.btn_close.on("click", this, closeHandler)
        this.btn_left.on("click", this, leftHandler)
        this.btn_right.on("click", this, rightHandler)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        this.btn_left.off("click", this, leftHandler)
        this.btn_right.off("click", this, rightHandler)
    }

    function leftHandler(e){
        e && __sound.button()
        index--
        index = index <= 0 ? 0 : index
        that.image_rule.skin = default_rule_imageArr[index];
    }

    function rightHandler(e){
        e && __sound.button()
        index++
        index = index >= default_rule_imageArr.length ? default_rule_imageArr.length - 1 : index;
        that.image_rule.skin = default_rule_imageArr[index];
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
    }

    function update(){
        index = 0
        leftHandler()
    }
}
Laya.class(PanelRule, "PanelRule", PanelRuleUI)