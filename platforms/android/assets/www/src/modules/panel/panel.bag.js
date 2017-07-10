/* 
* @Author: 轻飘时刻
* @Date:   2017-04-09 14:20:53
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-18 18:05:49
*/

function BagPropVO(){
    this.id
    this.name
    this.add
    this.roomCard
    this.star
    this.url
}

function PanelBag(){
    PanelBag.super(this)
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

    var list = new game.List(PanelBagItem, 4, 2, 10, 5, false)
    this.addChild(list)
    list.x = 105
    list.y = 152

    var showNum = 8
    var index = 0
    var array = []
    
    this.added = function(){
        PanelBagItem.select = null
        this.btn_close.on("click", this, closeHandler)
        this.btn_left.on("click", this, leftHandler)
        this.btn_right.on("click", this, rightHandler)
        this.btn_mall.on("click", this, mallHandler)
        this.btn_xiexia.on("click", this, xiexiaHandler)
        this.btn_peidai.on("click", this, peidaiHandler)
        this.btn_info.on("click", this, infoHandler)
        updateList()
        game.cb.addEvent(__event.UPDATE_BAG_PROP, updateBagProp)
        updateCarryProp()
        game.cb.addEvent(__event.IVO, updateCarryProp)
    }

    this.removed= function(){
        this.btn_close.off("click", this, closeHandler)
        this.btn_left.off("click", this, leftHandler)
        this.btn_right.off("click", this, rightHandler)
        this.btn_mall.off("click", this, mallHandler)
        this.btn_xiexia.off("click", this, xiexiaHandler)
        this.btn_peidai.off("click", this, peidaiHandler)
        this.btn_info.off("click", this, infoHandler)

        game.cb.removeEvent(__event.UPDATE_BAG_PROP, updateBagProp)
        game.cb.removeEvent(__event.IVO, updateCarryProp)
    }

    function updateBagProp(idArr){
        array.splice(0, array.length)
        for(var i = 0; i < idArr.length; i++){
            var id = idArr[i];
            var vo = new BagPropVO();
            vo.id = __mallConfig.idToPropVO[id].id
            vo.name = __mallConfig.idToPropVO[id].name
            vo.add = __mallConfig.idToPropVO[id].add
            vo.roomCard = __mallConfig.idToPropVO[id].roomCard
            vo.star = __mallConfig.idToPropVO[id].star
            vo.url = __mallConfig.idToPropVO[id].url
            array.push(vo)
        }
        array.sort(sortBag)
        updateList()
    }

    function updateCarryProp(){
        if(__mallConfig.idToPropVO[__data.ivo.carryPropID]){
            that.prop.skin = __mallConfig.idToPropVO[__data.ivo.carryPropID].url
            that.txt_add.text = __mallConfig.idToPropVO[__data.ivo.carryPropID].des
            // that.carryProp.skin = __mallConfig.idToPropVO[__data.ivo.carryPropID].url
        }else {
            that.prop.skin = ""
            that.txt_add.text = that.txt_add.text = ""
            // that.carryProp.skin = ""
        }
        that.txt_roomCard.text = __data.ivo.roomCard;
        __loadImage.load(__data.ivo.url, __data.ivo.id, that.head)
    }

    function sortBag(a, b){
        return a.id - b.id
    }

    function infoHandler(e){
        e && __sound.button()
        trace("点击详情")
        game.scene.add(PanelBagInfo)
    }

    function xiexiaHandler(e){
        e && __sound.button()
        trace("点击卸下")
        if(__mallConfig.idToPropVO[__data.ivo.carryPropID]){
            game.server.send(2008, __data.ivo.carryPropID)
            game.server.send(2001)
        }else{
            __proxy.tips("没有佩戴吉祥物")
        }
    }

    function peidaiHandler(e){
        e && __sound.button()
        trace("点击佩戴")
        if(PanelBagItem.select){
            game.server.send(2007, PanelBagItem.select.data.id)
            game.server.send(2001)
        }else{
            __proxy.tips("请选择佩戴的吉祥物")
        }
    }

    function mallHandler(e){
        e && __sound.button()
        trace("打开商城了")
        game.scene.add(PanelMall)
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
        game.utils.remove(PanelBagItem.selectImage)
        that.btn_left.disabled = false
        that.btn_right.disabled = false
        if(index <= 0){that.btn_left.disabled = true}
        if(index + showNum>= array.length){that.btn_right.disabled = true}
        var a = array.slice(index, index+showNum)
        list.array = a
    }
}
Laya.class(PanelBag, "PanelBag", PanelBagUI)

function PanelBagItem(){
    var that = this
    PanelBagItem.super(this)

    PanelBagItem.selectImage = PanelBagItem.selectImage || game.utils.getSprite(null, "panel_bag/wupinbgxuan.png")

    this.on("click", this, function(e){
        e && __sound.button()
        PanelBagItem.select = that
        this.addChild(PanelBagItem.selectImage)
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
Laya.class(PanelBagItem, "PanelBagItem", PanelBagItemUI)