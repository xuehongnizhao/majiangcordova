/* 
* @Author: 轻飘时刻
* @Date:   2017-04-15 16:37:09
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-20 15:24:29
*/
function DeskChatWordManager(container_){
    DeskChatWordManager.super(this)
    var that = this
    var container = container_
    var id = game.cache.registe(DeskChatWord)

    game.cb.addEvent(__event.DESK_ADD_A_WORD, function(head_, content_, chatid){
        if(!game.utils.stage(head_))return;
        var w = game.cache.get(id);
        w.updateContent(content_);
        w.x = head_.x + (head_.head.x + head_.head.width / 2) * head_.scaleX;
        w.y = head_.y + (head_.head.y + head_.head.height / 2) * head_.scaleY;
        container.addChild(w);
        if(w.x + w.width > container.width){
            w.turn();
        }
        
     	if(chatid != undefined)__sound.playGameYx(head_.vo.sex+"/chat_"+chatid)
    })

    this.clear = function(){
        game.cache.recoverAll(id)
    }
}
Laya.class(DeskChatWordManager, "DeskChatWordManager", Laya.Sprite)

function DeskChatWord(){
    DeskChatWord.super(this)
    var that = this

    this.updateContent = function(value){
        this.txt_content.text = value
        this.bg.width = this.txt_content.textField.textWidth + 50;
        this.width = this.txt_content.textField.textWidth + 50;
    }

    this.on("added", this, function(e){
        Laya.timer.once(2000, that, removeWordHandler)
    })

    this.on("removed", this, function(e){
        Laya.timer.clear(that, removeWordHandler)
    })

    function removeWordHandler(e){
        Laya.timer.clear(that, removeWordHandler)
        game.cache.recover(that)
        that.resume()
    }

    /**
     * 右侧玩家 添加 说话 显示不全的情况下 进行翻转处理
     * @return {[type]} [description]
     */
    this.turn = function(){
        this.bg.scaleX = -1
        this.txt_content.x = 0 - this.txt_content.textField.textWidth + 9//- 35// - 9
    }

    this.resume = function(){
        this.bg.scaleX = 1
        this.txt_content.x = -9
    }
}
Laya.class(DeskChatWord, "DeskChatWord", DeskChatWordUI)