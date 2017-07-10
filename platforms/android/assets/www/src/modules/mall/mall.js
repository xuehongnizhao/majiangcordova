/* 
* @Author: 轻飘时刻
* @Date:   2017-02-14 14:56:34
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-02-17 15:35:47
*/
function Mall(){
    Mall.super(this)
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
        list.array = MallItem.config
        this.btn_close.on("click", this, closeHandler)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
    }

    function closeHandler(e){
        game.scene.remove(this)
    }

    var list = new game.List(MallItem, 3, 2, 10, 10)
    this.addChild(list);
    list.x = 55;
    list.y = 105;
    list.array = MallItem.config
}
Laya.class(Mall, "Mall", MallUI)

function MallItem(){
    MallItem.super(this)
    var that = this

    var _data

    function set_data(value){
        _data = value
        this.txt_roomCard.text = value.roomCard + " 房卡"
        this.txt_rmb.text = "￥" + value.rmb
    }

    function get_data(){
        return _data
    }

    game.utils.setget(this, "data", set_data, get_data)

    this.on("click", this, function(e){
        game.scene.add(MallPasswordPanel, [_data])
    })
}
Laya.class(MallItem, "MallItem", MallItemUI)

MallItem.config = [
    {roomCard:"6", rmb:"6"},
    {roomCard:"30", rmb:"30"},
    {roomCard:"68", rmb:"68"},
    {roomCard:"128", rmb:"128"},
    {roomCard:"328", rmb:"328"},
    {roomCard:"648", rmb:"648"}
]
