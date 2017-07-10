/* 
* @Author: 轻飘时刻
* @Date:   2017-04-09 13:48:13
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-17 22:01:10
*/
function PanelRecord1(){
    PanelRecord1.super(this)
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

    var list = new game.List(PanelRecordItem1, 1, 4, 0, 5)
    list.x = 74
    list.y = 200
    this.addChild(list)
    list.array = [];

    PanelRecord1.list = []

    this._mask = new Laya.Sprite()//有遮挡
    this._mask.graphics.drawRect(0,0,this.width,this.height, "#000000");
    this._mask.size(this.width,this.height)
    this._mask.alpha = 0;
    this._mask.on("click", this, function(){})

    this.added = function(){
        PanelRecord1.list = [];
        list.array = [];
        addReplayWait()
        this.btn_close.on("click", this, closeHandler)
        // updateList()
        game.cb.addEvent(__event.UPDATE_RECORD_1_LIST, updateList)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        game.cb.removeEvent(__event.UPDATE_RECORD_1_LIST, updateList)
    }

    function addReplayWait(){
        that.addChild(that._mask)
        that.addChild(that.loading)
        that.loading.rotation = 0
        TweenMax.to(that.loading, 2, {rotation:-360, ease:Linear.easeNone, repeat:-1})
    }

    function updateList(type){
        game.utils.remove(that.loading)
        game.utils.remove(that._mask)
        TweenMax.killTweensOf(that.loading)
        list.array = PanelRecord1.list
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(this)
    }
}
Laya.class(PanelRecord1, "PanelRecord1", PanelRecord1UI)

PanelRecord1.selectItem = null
PanelRecordItem1.roomID = null
function PanelRecordItem1(){
    PanelRecordItem1.super(this)
    var that = this

    this.on("added", this, function(e){
        this.on("click", this, clickHandler)
    })

    this.on("removed", this, function(e){
        this.off("click", this, clickHandler)
    })

    function clickHandler(e){
        e && __sound.button()
        trace("查询2级记录")
        PanelRecordItem1.roomID = _data.roomID
        game.server.send(7002, _data.roomID)
        game.scene.add(PanelRecord2)
        PanelRecord1.selectItem = that
        PanelRecord2.list = [];
    }
    var _data = null;
    function set_data(value){
        _data = value
        this.txt_roomID.text = value.roomID
        this.txt_1.text = value.name1 + " " + value.score1
        this.txt_2.text = value.name2 + " " + value.score2
        this.txt_3.text = value.name3 + " " + value.score3
        this.txt_4.text = value.name4 + " " + value.score4
        var d = new Date(value.time)
        this.txt_time.text = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "\n" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }
    function get_data(){return _data}
    game.utils.setget(this, "data", set_data, get_data)
}
Laya.class(PanelRecordItem1, "PanelRecordItem1", PanelRecordItem1UI)





function PanelRecord2(){
    PanelRecord2.super(this)
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

    var list = new game.List(PanelRecordItem2, 1, 4, 0, 5)
    list.x = 74
    list.y = 200
    this.addChild(list)
    list.array = [];

    PanelRecord2.list = []

    this._mask = new Laya.Sprite()//有遮挡
    this._mask.graphics.drawRect(0,0,this.width,this.height, "#000000");
    this._mask.size(this.width,this.height)
    this._mask.alpha = 0;
    this._mask.on("click", this, function(){})

    // this.addChild(this.loading)

    this.added = function(){
        addReplayWait()
        list.array = []
        this.btn_close.on("click", this, closeHandler)
        // updateList()
        game.cb.addEvent(__event.UPDATE_RECORD_2_LIST, updateList)
        game.cb.addEvent(__event.ADD_REPLAY_WAIT, addReplayWait)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        game.cb.removeEvent(__event.UPDATE_RECORD_2_LIST, updateList)
        game.cb.removeEvent(__event.ADD_REPLAY_WAIT, addReplayWait)
        TweenMax.killTweensOf(this.loading)
    }

    function addReplayWait(){
        that.addChild(that._mask)
        that.addChild(that.loading)
        that.loading.rotation = 0
        TweenMax.to(that.loading, 2, {rotation:-360, ease:Linear.easeNone, repeat:-1})
    }

    function updateList(){
        if(PanelRecord2.list[0]){
            that.txt_name1.text = PanelRecord2.list[0].name1
            that.txt_name2.text = PanelRecord2.list[0].name2
            that.txt_name3.text = PanelRecord2.list[0].name3
            that.txt_name4.text = PanelRecord2.list[0].name4
        }else{
            that.txt_name1.text = ""
            that.txt_name2.text = ""
            that.txt_name3.text = ""
            that.txt_name4.text = ""
        }
        
        list.array = PanelRecord2.list
        TweenMax.killTweensOf(that.loading)
        game.utils.remove(that.loading)
        game.utils.remove(that._mask)
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(this)
    }
}
Laya.class(PanelRecord2, "PanelRecord2", PanelRecord2UI)

function PanelRecordItem2(){
    PanelRecordItem2.super(this)
    var that = this

    this.on("added", this, function(e){
        this.btn_replay.on("click", this, clickHandler)
    })

    this.on("removed", this, function(e){
        this.btn_replay.off("click", this, clickHandler)
    })

    function clickHandler(e){
        e && __sound.button()
        trace("看直播")
        game.server.send(7003, _data.roomID, _data.id)
        game.cb.dispatchEvent(__event.ADD_REPLAY_WAIT)
        // game.server.send(7002, _data)
        // game.scene.add(PanelRecord2)
    }
    var _data = null;
    function set_data(value){
        _data = value

        this.txt_id.text = value.id
        this.txt_score1.text = value.score1
        this.txt_score2.text = value.score2
        this.txt_score3.text = value.score3
        this.txt_score4.text = value.score4

        var d = new Date(value.time)
        this.txt_time.text = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "\n" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        // this.txt_roomID.text = value.roomID
        // this.txt_1.text = value.name1 + " " + value.score1
        // this.txt_2.text = value.name2 + " " + value.score2
        // this.txt_3.text = value.name3 + " " + value.score3
        // this.txt_4.text = value.name4 + " " + value.score4
        // var d = new Date(value.time)
        // this.txt_time.text = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "\n" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }
    function get_data(){return _data}
    game.utils.setget(this, "data", set_data, get_data)
}
Laya.class(PanelRecordItem2, "PanelRecordItem2", PanelRecordItem2UI)