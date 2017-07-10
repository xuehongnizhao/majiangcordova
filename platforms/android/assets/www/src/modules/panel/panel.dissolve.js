/* 
* @Author: 轻飘时刻
* @Date:   2017-05-10 11:30:43
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-13 22:39:53
*/
function PanelDissolveNoAgreePT(){
    PanelDissolveNoAgreePT.super(this)
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

    this.added = function(id){
        var name = __data.desk.idToPlayervo[id].name
        this.txt.text = name + "  拒绝解散房间"
        this.btn_close.on("click", this, closeHandler)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
    }
}
Laya.class(PanelDissolveNoAgreePT, "PanelDissolveNoAgreePT", PanelDissolveNoAgreePTUI)


function PanelDissolveSelect(){
    PanelDissolveSelect.super(this)
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
}
Laya.class(PanelDissolveSelect, "PanelDissolveSelect", PanelDissolveSelectUI)

function PanelDissolveResult(){
    PanelDissolveResult.super(this)
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

    this.added = function(id){//发起者id
        game.cb.addEvent(__event.DISSOLVE_ROOM_ADD_RESULT, addResult)
        this.btn_sure.on("click", this, sureHandler)
        this.btn_cancel.on("click", this, cancelHandler)
        this.btn_close.on("click", this, closeHandler)
    }

    this.removed = function(){
        game.cb.removeEvent(__event.DISSOLVE_ROOM_ADD_RESULT, addResult)
        this.btn_sure.off("click", this, sureHandler)
        this.btn_cancel.off("click", this, cancelHandler)
        this.btn_close.off("click", this, closeHandler)
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
        game.server.send(3009, 0)
    }

    function sureHandler(e){
        e && __sound.button()
        game.server.send(3009, 1)
    }

    function cancelHandler(e){
        e && __sound.button()
        game.server.send(3009, 0)
    }

    function addResult(list){
        that.txt_result1.text = "等待结果"
        that.txt_result2.text = "等待结果"
        that.txt_result3.text = "等待结果"
        that.txt_result4.text = "等待结果"
        trace(__data.desk.posToPlayervo)
        if(__data.desk.posToPlayervo[1]){
            that.txt_name1.text = __data.desk.posToPlayervo[1].name;
        }else that.txt_name1.text = ""

        if(__data.desk.posToPlayervo[2]){
            that.txt_name2.text = __data.desk.posToPlayervo[2].name;
        }else that.txt_name2.text = ""

        if(__data.desk.posToPlayervo[3]){
            that.txt_name3.text = __data.desk.posToPlayervo[3].name;
        }else that.txt_name3.text = ""

        if(__data.desk.posToPlayervo[4]){
            that.txt_name4.text = __data.desk.posToPlayervo[4].name;
        }else that.txt_name4.text = ""

        // list = 100001_true,100002_false
        that.btn_sure.disabled = false
        that.btn_cancel.disabled = false
        var a = list.split(",")
        for(var i = 0; i < a.length; i++){
            var b = a[i].split("_")
            var id = b[0]
            var result = b[1]
            try{
                var pos = __data.desk.idToPlayervo[id].position;
                that["txt_result"+pos].text = result == "true" ? " 同意" : "不同意"
                if(id == __data.ivo.id){
                    //如果列表 里面 有自己 那么说明 自己投票了 按钮不让点击 
                    that.btn_sure.disabled = true
                    that.btn_cancel.disabled = true
                }
            }catch(e){
                that.btn_sure.disabled = true
                that.btn_cancel.disabled = true
            }
        }
    }

}
Laya.class(PanelDissolveResult, "PanelDissolveResult", PanelDissolveResultUI)
