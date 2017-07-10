/* 
* @Author: 轻飘时刻
* @Date:   2017-04-09 14:20:53
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-18 18:31:51
*/

var __mallConfig = __mallConfig || {};
__mallConfig.allPropConfig = [];
__mallConfig.idToPropVO = [];
__mallConfig.idToPropInfo = [];
__mallConfig.idToPropInfo[1] = {star:3, url:"panel_bag/jxw1.png", des:"无作用，装饰"}
__mallConfig.idToPropInfo[2] = {star:3, url:"panel_bag/jxw2.png", des:"提高1/10经验"}
__mallConfig.idToPropInfo[3] = {star:3, url:"panel_bag/jxw3.png", des:"提高2/10经验"}
__mallConfig.idToPropInfo[4] = {star:3, url:"panel_bag/jxw4.png", des:"提高3/10经验"}
__mallConfig.idToPropInfo[5] = {star:3, url:"panel_bag/jxw5.png", des:"提高4/10经验"}
__mallConfig.idToPropInfo[6] = {star:3, url:"panel_bag/jxw6.png", des:"提高5/10经验"}
__mallConfig.idToPropInfo[7] = {star:3, url:"panel_bag/jxw7.png", des:"提高6/10经验"}
__mallConfig.idToPropInfo[8] = {star:3, url:"panel_bag/jxw8.png", des:"提高7/10经验"}
__mallConfig.idToPropInfo[9] = {star:3, url:"panel_bag/jxw9.png", des:"提高8/10经验"}
__mallConfig.idToPropInfo[10] = {star:3, url:"panel_bag/jxw10.png", des:"提高9/10经验"}
__mallConfig.idToPropInfo[11] = {star:3, url:"panel_bag/jxw11.png", des:"提高10/10经验"}
__mallConfig.idToPropInfo[12] = {star:3, url:"panel_bag/jxw12.png", des:"提高11/10经验"}
__mallConfig.idToPropInfo[13] = {star:3, url:"panel_bag/jxw13.png", des:"提高12/10经验"}
__mallConfig.idToPropInfo[14] = {star:3, url:"panel_bag/jxw14.png", des:"提高13/10经验"}
__mallConfig.idToPropInfo[15] = {star:3, url:"panel_bag/jxw15.png", des:"提高14/10经验"}
__mallConfig.idToPropInfo[16] = {star:3, url:"panel_bag/jxw16.png", des:"提高15/10经验"}
__mallConfig.idToPropInfo[17] = {star:3, url:"panel_bag/jxw17.png", des:"提高16/10经验"}
__mallConfig.idToPropInfo[18] = {star:3, url:"panel_bag/jxw18.png", des:"提高17/10经验"}
__mallConfig.idToPropInfo[19] = {star:3, url:"panel_bag/jxw19.png", des:"提高18/10经验"}
__mallConfig.idToPropInfo[20] = {star:3, url:"panel_bag/jxw20.png", des:"提高19/10经验"}
__mallConfig.idToPropInfo[21] = {star:3, url:"panel_bag/jxw21.png", des:"提高20/10经验"}

function MallPropVO(){
    this.id
    this.name
    this.add
    this.roomCard
    this.star
    this.url
    this.des
}

function PanelMall(){
    PanelMall.super(this)
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

    this.scale(game.scale, game.scale)

    var list = new game.List(PanelMallItem, 4, 2, 10, 5, false)
    this.addChild(list)
    list.x = 105
    list.y = 152

    var showNum = 8
    var index = 0
    var array = []

    this.added = function(){
        array = __mallConfig.allPropConfig
        this.btn_close.on("click", this, closeHandler)
        this.btn_left.on("click", this, leftHandler)
        this.btn_right.on("click", this, rightHandler)
        this.btn_buy.on("click", this, buyHandler)
        updateList()
        game.cb.addEvent(__event.UPDATE_MALL_PROP, updateList)
        updateInfo()
        game.cb.addEvent(__event.IVO, updateInfo)
        updateAddTxt()
        game.cb.addEvent(__event.SELECT_MALL_ITEM, updateAddTxt)
    }

    this.removed= function(){
        this.btn_close.off("click", this, closeHandler)
        this.btn_left.off("click", this, leftHandler)
        this.btn_right.off("click", this, rightHandler)
        this.btn_buy.off("click", this, buyHandler)
        game.cb.removeEvent(__event.UPDATE_MALL_PROP, updateList)
        game.cb.removeEvent(__event.IVO, updateInfo)
        game.cb.removeEvent(__event.SELECT_MALL_ITEM, updateAddTxt)
    }

    function updateAddTxt(){
        if(PanelMallItem.select){
            that.txt_add.text = PanelMallItem.select.data.des;
            that.txt_price.text = PanelMallItem.select.data.roomCard
        }else {
            that.txt_add.text = ""
            that.txt_price.text = ""
        }

        if(__mallConfig.idToPropVO[__data.ivo.carryPropID]){
            that.prop.skin = __mallConfig.idToPropVO[__data.ivo.carryPropID].url
        }else {
            that.prop.skin = ""
        }
        __loadImage.load(__data.ivo.url, __data.ivo.id, that.head)
    }

    function updateInfo(){
        that.txt_roomCard.text = __data.ivo.roomCard
    }

    function buyHandler(e){
        e && __sound.button()
        trace("点击购买")
        if(!PanelMallItem.select)__proxy.tips("请选择购买项")
        else {
            game.server.send(2006, PanelMallItem.select.data.id)
            game.server.send(2005)
            game.server.send(2001)
        }
    }

    function leftHandler(e){
        e && __sound.button()
        index-=showNum
        if(index <= 0)index = 0
        updateList()
    }

    function rightHandler(e){
        e && __sound.button()
        if(index + showNum>= array.length){}
        else index+=showNum
        updateList()
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
    }

    function updateList(){
        PanelMallItem.select = null
        game.utils.remove(PanelMallItem.selectImage)
        that.btn_left.disabled = false
        that.btn_right.disabled = false
        if(index <= 0){that.btn_left.disabled = true}
        if(index + showNum>= array.length){that.btn_right.disabled = true}
        var a = array.slice(index, index+showNum)
        list.array = a
    }
}
Laya.class(PanelMall, "PanelMall", PanelMallUI)

function PanelMallItem(){
    var that = this
    PanelMallItem.super(this)

    PanelMallItem.selectImage = PanelMallItem.selectImage || game.utils.getSprite(null, "panel_bag/wupinbgxuan.png")

    this.on("click", this, function(e){
        e && __sound.button()
        PanelMallItem.select = that
        this.addChild(PanelMallItem.selectImage)
        game.cb.dispatchEvent(__event.SELECT_MALL_ITEM)
    })

    var _data
    function set_data(value){
        _data = value
        this.txt_name.text = value.name
        for(var i = 1; i <= 6; i++){
            this["star"+i].skin = "panel_bag/xing1.png"
        }
        for(var i = 1; i <= value.star; i++){
            this["star"+i].skin = "panel_bag/xing2.png"
        }
        this.prop.skin = value.url
    }
    function get_data(){return _data}
    game.utils.setget(this, "data", set_data, get_data)
}
Laya.class(PanelMallItem, "PanelMallItem", PanelBagItemUI)
