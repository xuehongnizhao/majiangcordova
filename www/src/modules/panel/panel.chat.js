/* 
* @Author: 轻飘时刻
* @Date:   2017-03-07 15:13:26
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-22 10:55:43
*/
PanelChat.wordConfig = [
         {id:29, content:"你太牛啦！"}
        ,{id:30, content:"哈哈！手气真好！"}
        ,{id:31, content:"快点出牌呦！"}
        ,{id:32, content:"今天真高兴！"}
        ,{id:33, content:"怎么又断线了，网络怎么这么差呀！"}
        ,{id:34, content:"你家里是开银行的吧？"}
        ,{id:35, content:"不好意思，我有事要先走一步了"}
        ,{id:36, content:"你的牌打的太好啦！"}
        ,{id:37, content:"大家好，很高兴见到各位！"}
    ]
function PanelChat(){
    PanelChat.super(this)
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

    var faceList = new game.List(FaceItem, 7, 4, 4, 8, false);
    faceList.x = 40;
    faceList.y = 90;
    this.addChild(faceList);
    faceList.array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

    var wordList = new game.List(WordItem, 1, 5, 0, 0)
    // var wordList = new Laya.List()
    // wordList.itemRender = WordItem
    // wordList.repeatX = 1
    // wordList.repeatY = 5
    wordList.x = 39;
    wordList.y = 75;
    wordList.array = PanelChat.wordConfig
    // wordList.startIndex = 8

    this.added = function(){
        this.btn_close.on("click", this, closeHandler);
        this.btn_face.on("click", this, faceHandler);
        this.btn_word.on("click", this, wordHandler);

        this.btn_send.on("click", this, sendHandler)
        this.txt.on("click", this, txtHandler)

        game.cb.addEvent("update_input_handler", updateSaytxtHandler)

    }  

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler);
        this.btn_face.off("click", this, faceHandler);
        this.btn_word.off("click", this, wordHandler)

        this.btn_send.on("click", this, sendHandler)
        this.txt.on("click", this, txtHandler)

        game.cb.removeEvent("update_input_handler", updateSaytxtHandler)

    }

    function updateSaytxtHandler(value){
        if(value != ""){
            that.txt.text = value
            that.txt.textField.scrollX = that.txt.textField.maxScrollX
        }else{
            that.txt.text = ""
            that.txt.textField.scrollX = that.txt.textField.maxScrollX
        }
    }

    function sendHandler(e){
        if(that.txt.text && that.txt.text.length <= 20){
            game.server.send(5002, that.txt.text)
        }else{
            __proxy.tips("请输入内容，或文本过长")
        }
        that.txt.text = ""
        game.scene.remove(that)
        // if(that.txt.text && that.txt.text != '请输入聊天内容'){
        //     game.server.send(5002, that.txt.text)
        // }else{

        // }
    }

    function txtHandler(e){
        // if(that.txt.text == '请输入聊天内容'){

        // }
        try{
            takeKeyboardHandler(that.txt.text);
        }catch(e){
            trace(e)
        }
    }

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(that)
    }

    function faceHandler(e){
        e && __sound.button()
        this.btn_image.skin = "panel_chat/face.png"
    //     trace("faceHandler")
    //     this.btn_face.skin = "chat/chat_bq_n.png"
    //     this.btn_word.skin = "chat/chat_cy_p.png"
        that.addChild(that.facebg)
        that.addChild(faceList)

        game.utils.remove(wordList)
    }

    function wordHandler(e){
        e && __sound.button()
        this.btn_image.skin = "panel_chat/word.png"
    //     trace("wordHandler")
    //     this.btn_face.skin = "chat/chat_bq_p.png"
    //     this.btn_word.skin = "chat/chat_cy_n.png"
        that.addChild(wordList)
        game.utils.remove(that.facebg)
        game.utils.remove(faceList)
    }
}
Laya.class(PanelChat, "PanelChat", PanelChatUI)

function FaceItem(){
    FaceItem.super(this)
    var that = this
    game.utils.getSprite(this, "panel_chat/1.png")
    this.on("click", this, clickHandler)
    function clickHandler(e){
        e && __sound.button()
        trace("发送表情")
        game.server.send(5002, "umrumr"+_data)

        game.scene.remove(PanelChat)
    }
    var _data = null;
    function set_data(value){_data = value; game.utils.getSprite(this, "panel_chat/"+value+".png")}
    function get_data(){}
    game.utils.setget(this, "data", set_data, get_data)
}
Laya.class(FaceItem, "FaceItem", Laya.Sprite)

function WordItem(){
    WordItem.super(this)
    var that = this
    this.on("click", this, clickHandler)
    function clickHandler(e){
        e && __sound.button()
        trace("发送语言")
        var desk = game.scene.get(Desk)
        
        game.server.send(5002, "umrumr"+_data.id)
        
        game.scene.remove(PanelChat)
    }
    var _data = null;
    function set_data(value){_data = value;this.txt.text = value.content}
    function get_data(){}
    game.utils.setget(this, "data", set_data, get_data)
}
Laya.class(WordItem, "WordItem", PanelChatWordItemUI)