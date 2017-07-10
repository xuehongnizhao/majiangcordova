/* 
* @Author: 轻飘时刻
* @Date:   2017-02-25 14:51:09
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-12 22:14:58
*/

function MainSceneDown(){
    MainSceneDown.super(this)
    var that = this;
    this.params = {
        "layer":game.scene.middleLayer, 
        "offx":0,
        "offy":0,
        "centerx":true,
        "centery":false,
        "up":false,
        "down":true,
        "left":false,
        "right":false
    }

    this.added = function(){
        this.btn_bag.on("click", this, bagHandler)
        this.btn_rule.on("click", this, ruleHandler)
        this.btn_share.on("click", this, shareHandler)
        this.btn_set.on("click", this, setHandler)
        this.btn_record.on("click", this, recordHandler)
    }

    this.removed = function(){
        this.btn_bag.off("click", this, bagHandler)
        this.btn_rule.off("click", this, ruleHandler)
        this.btn_share.off("click", this, shareHandler)
        this.btn_set.off("click", this, setHandler)
        this.btn_record.off("click", this, recordHandler)
    }

    function bagHandler(e){
        __sound.button()
        trace("点击背包")
        // getMP3Data2("bomb.mp3")
        // playSound()
        game.scene.add(PanelBag)
        game.server.send(2005)
    }
    
    function ruleHandler(e){
        __sound.button()
        trace("点击规则")
        game.scene.add(PanelRule)
        // game.scene.add(PanelChat)
    }

    function shareHandler(e){
        __sound.button()
        trace("点击分享")
        game.server.send(2010)
        game.scene.add(PanelShare)
    }

    function setHandler(e){
        __sound.button()
        trace("点击设置")
        game.scene.add(PanelSet)
    }

    function recordHandler(e){
        __sound.button()
        trace("点击记录")
        game.server.send(7001)
        game.scene.add(PanelRecord1)
    }

}
Laya.class(MainSceneDown, "MainSceneDown", MainSceneDownUI)