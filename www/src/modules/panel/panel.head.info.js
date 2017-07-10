/* 
* @Author: 轻飘时刻
* @Date:   2017-04-07 19:12:53
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-19 10:35:55
*/
function PanelHeadInfo(){
    PanelHeadInfo.super(this)
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

    this.added = function(){
        this.btn_close.on("click", this, closeHandler)
        this.btn_help.on("click", this, helpHandler)
        update()
        game.cb.addEvent(__event.UPDATE_LV_EXP, update)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        this.btn_help.off("click", this, helpHandler)
        game.cb.removeEvent(__event.UPDATE_LV_EXP, update)
    }

    function update(){
        that.txt_name.text = __data.ivo.name
        that.txt_id.text   = "ID "+__data.ivo.id
        that.txt_ip.text   = "IP "+__data.ivo.ip

        that.txt_lv.text = "等级 LV"+__data.ivo.lv
        setExp(__data.ivo.exp/__data.ivo.maxExp)

        __loadImage.load(__data.ivo.url, __data.ivo.id, that.head)
    }

    function helpHandler(e){
        trace("点击帮助")
        e && __sound.button()
        game.scene.add(PanelHelp)
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
    }

    var __r = new Laya.Rectangle();
    __r.width = this.bar.width;
    __r.height = this.bar.height;
    this.bar.scrollRect = __r;

    function setExp(value){
        __r.width = value * that.bar.width
    }
    setExp(0.7)
}
Laya.class(PanelHeadInfo, "PanelHeadInfo", PanelHeadInfoUI)