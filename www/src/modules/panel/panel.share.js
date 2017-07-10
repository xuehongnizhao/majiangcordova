/* 
* @Author: 轻飘时刻
* @Date:   2017-04-10 20:06:52
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-14 01:20:13
*/
PanelShare.data = {
    canReceiveNum:0,
    receiveArr:[//历史记录领取集合
        {
            num:100,//领取数量
            time:100//领取时间
        }
    ]
}
function PanelShare(){
    PanelShare.super(this)
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

    new game.BtnGroupSingleSelect([this.btn_share, this.btn_receive], ["panel_share/share_code1.png","panel_share/receive1.png"], ["panel_share/share_code2.png","panel_share/receive2.png"], function(target, e){
        e && __sound.button()
        game.utils.remove(that.panel_share)
        game.utils.remove(that.panel_receive)
        if(target == that.btn_share){
            that.addChild(that.panel_share)
        }else{
            that.addChild(that.panel_receive)
        }
    }, 0)

    this.added = function(){
        this.btn_close.on("click", this, closeHandler)
        this.panel_receive.btn_receive.on("click", this, receiveRoomCardHandler)
        this.panel_share.btn_share.on("click", this, shareHandler)
        updateReceiveRoomCardRecord()
        game.cb.addEvent(__event.UPDATE_RECEIVE_ROOM_CARD_RECORD, updateReceiveRoomCardRecord)
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        this.panel_receive.btn_receive.off("click", this, receiveRoomCardHandler)
        this.panel_share.btn_share.off("click", this, shareHandler)
        game.cb.removeEvent(__event.UPDATE_RECEIVE_ROOM_CARD_RECORD, updateReceiveRoomCardRecord)
    }

    var recordTxtArr = [this.panel_receive.txt_receiveRecord1,this.panel_receive.txt_receiveRecord2,this.panel_receive.txt_receiveRecord3]

    function updateReceiveRoomCardRecord(){
        if(PanelShare.data.canReceiveNum > 0){
            that.panel_receive.txt_receiveRoomCardCount.text = "您还可领取： "+PanelShare.data.canReceiveNum+"  张房卡"
            that.panel_receive.btn_receive.disabled = false
        }else{
            that.panel_receive.txt_receiveRoomCardCount.text = "您还可领取： 0  张房卡"
            that.panel_receive.btn_receive.disabled = true
        }
        recordTxtArr[0].text = ""
        recordTxtArr[1].text = ""
        recordTxtArr[2].text = ""
        for(var i = 0; i < PanelShare.data.receiveArr.length; i++){
            var d = new Date(PanelShare.data.receiveArr[i].time)
            recordTxtArr[i].text = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() + " 领取 "+PanelShare.data.receiveArr[i].num+"张房卡奖励"
        }
    }

    function shareHandler(e){
        e && __sound.button()
        trace("点击分享")
        try{
            wx_share_game()
        }catch(e){
            
        }
    }

    function receiveRoomCardHandler(e){
        e && __sound.button()
        trace("点击领取房卡")
        game.server.send(2011)
        game.server.send(2010)
        game.server.send(2001)
    }

    function closeHandler(e){
        e && __sound.button();
        game.scene.remove(that)
    }
}
Laya.class(PanelShare, "PanelShare", PanelShareUI)