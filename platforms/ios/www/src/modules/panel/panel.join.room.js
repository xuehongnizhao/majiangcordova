/* 
* @Author: 轻飘时刻
* @Date:   2017-02-15 15:43:07
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-12 22:05:46
*/
function PanelJoinRoom(){
    PanelJoinRoom.super(this)
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

    var _data
    this.added = function(data){
        _data = data
        this.btn_close.on("click", this, closeHandler)
        this.btn_0.on("click", this, inputHandler)
        this.btn_1.on("click", this, inputHandler)
        this.btn_2.on("click", this, inputHandler)
        this.btn_3.on("click", this, inputHandler)
        this.btn_4.on("click", this, inputHandler)
        this.btn_5.on("click", this, inputHandler)
        this.btn_6.on("click", this, inputHandler)
        this.btn_7.on("click", this, inputHandler)
        this.btn_8.on("click", this, inputHandler)
        this.btn_9.on("click", this, inputHandler)
        this.btn_reInput.on("click", this, reInputHandler)
        this.btn_delete.on("click", this, deleteHandler)
        // this.btn_sure.on("click", this, sureHandler)
        reInputHandler()
    }

    this.removed = function(){
        this.btn_close.off("click", this, closeHandler)
        this.btn_0.off("click", this, inputHandler)
        this.btn_1.off("click", this, inputHandler)
        this.btn_2.off("click", this, inputHandler)
        this.btn_3.off("click", this, inputHandler)
        this.btn_4.off("click", this, inputHandler)
        this.btn_5.off("click", this, inputHandler)
        this.btn_6.off("click", this, inputHandler)
        this.btn_7.off("click", this, inputHandler)
        this.btn_8.off("click", this, inputHandler)
        this.btn_9.off("click", this, inputHandler)
        this.btn_reInput.off("click", this, reInputHandler)
        this.btn_delete.off("click", this, deleteHandler)
        // this.btn_sure.off("click", this, sureHandler)
    }

    var inputIndex = 0
    var password = ""

    function closeHandler(e){
        e && __sound.button()
        game.scene.remove(this)
    }

    function inputHandler(e){
        e && __sound.button()
        inputIndex > 5 && (inputIndex = 5)
        that["txt_" + inputIndex].text = e.currentTarget.name
        if(inputIndex == 5){
            sureHandler()
        }
        inputIndex++
    }

    function reInputHandler(e){
        e && __sound.button()
        inputIndex = 0
        that.txt_0.text = ""
        that.txt_1.text = ""
        that.txt_2.text = ""
        that.txt_3.text = ""
        that.txt_4.text = ""
        that.txt_5.text = ""
    }

    function deleteHandler(e){
        e && __sound.button()
        inputIndex--
        inputIndex < 0 && (inputIndex = 0)
        that["txt_" + inputIndex].text = ""

        // var canvas = document.getElementById("layaCanvas")
        // var lowQuality = canvas.toDataURL("image/jpeg", 0.5)
        // var a = document.createElement("a")
        // a.href = lowQuality
        // a.download = "sample"
        // a.click()
    }

    function sureHandler(e){
        e && __sound.button()
        if(that.txt_5.text){
            password = ""
            password += that.txt_0.text
            password += that.txt_1.text
            password += that.txt_2.text
            password += that.txt_3.text
            password += that.txt_4.text
            password += that.txt_5.text
            trace("password", password)

            game.server.send(3003, password)
        }else {
            __proxy.tips(__lang.PASSWORD_WRONG)
        }
    }
}
Laya.class(PanelJoinRoom, "PanelJoinRoom", PanelJoinRoomUI)