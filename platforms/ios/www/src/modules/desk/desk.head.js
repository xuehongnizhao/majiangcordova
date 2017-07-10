/* 
* @Author: 轻飘时刻
* @Date:   2017-04-14 22:07:31
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-06 14:53:46
*/
/**
 * 桌面头像逻辑
 */
function DeskHeadLogic(head_, vo_){
    var that = this
    head_.vo = null
    head_.cacheAs = config.cacheModel
    head_.head.on("click", that, function(e){
        game.cb.dispatchEvent(__event.ADD_DESK_HEAD_INFO, [head_])
        e.stopPropagation()
    })

    head_.updateInfo = function(){
        if(head_.vo){
            head_.txt_name.text = head_.vo.name
            head_.txt_score.text = head_.vo.score
            if(__mallConfig.idToPropVO[head_.vo.carryPropID]){
                head_.prop.skin = __mallConfig.idToPropVO[head_.vo.carryPropID].url
            }else{
                head_.prop.skin = ""
            }
            
            __loadImage.load(head_.vo.url, head_.vo.id, head_.head)
        }
    }

    head_.addFace = function(id){
        head_.face.skin = "panel_chat/"+id+".png";
        head_.addChild(head_.face);
        setTimeout(function(){
            game.utils.remove(head_.face)
        }, 2000)
    }

    head_.updateBuhua = function(vo){
        //更新补花数量
        // if(head_.vo && head_.vo.outCard){
        if(vo){
            //根据出牌算出补花
            var buhuaCount = 0
            var a = vo.outCard
            for(var i = 0; i < a.length; i++){
                if(parseInt(a[i]) >= 40)buhuaCount++
            }
            var b = vo.doorCard
            for(var i = 0; i < b.length; i++){
                var str = b[i]
                var c = str.split(":")
                var m = c[1].split("-")
                if(m[0] >= 30 && m[0] <= 33){
                    // buhuaCount++;

                    if(c[0] == "two"){

                    }else if(c[0] == "three"){
                        buhuaCount++;
                    }else if(c[0] == "dark"){
                        buhuaCount+=3
                    }else if(c[0] == "light"){
                        buhuaCount+=2
                    }
                }else{
                    if(c[0] == "two"){

                    }else if(c[0] == "three"){
                        
                    }else if(c[0] == "dark"){
                        buhuaCount+=2
                    }else if(c[0] == "light"){
                        buhuaCount+=1
                    }
                }
            }
            head_.txt_buhua.text = buhuaCount;
        }else {
            head_.txt_buhua.text = 0
        }
    }

    head_.updateReadyState = function(){
        if(head_.vo && head_.vo.readyState){
            head_.addChild(head_.icon_ready)
        }else {
            game.utils.remove(head_.icon_ready)
        }
    }

    head_.updateZhuangState = function(){
        if(head_.vo && head_.vo.zhuangState){
            head_.addChild(head_.icon_zhuang)
        }else{
            game.utils.remove(head_.icon_zhuang)
        }
    }

    head_.updateTrust = function(){

    }

    head_.updateOffLineState = function(){
        if(head_.vo && head_.vo.offLineState == false){
            head_.addChild(head_.offline)
            trace1("添加离线标志")
        }else game.utils.remove(head_.offline)
    }

    head_.clear = function(){
        head_.vo = null
        head_.head.skin = "mainScene/mrtx.png"
        game.utils.remove(head_.icon_ready)
        game.utils.remove(head_.face)
        game.utils.remove(head_.offline)
        head_.icon_zhuang && game.utils.remove(head_.icon_zhuang)
        head_.txt_name.text = ""
        head_.txt_score.text = -1
    }
}
/**
 * 点击桌面头像弹出的 头像具体信息
 * @param {[type]} container_ [description]
 */
function DeskHeadInfo(container_){
    DeskHeadInfo.super(this)
    var that = this
    var container = container_

    game.cb.addEvent(__event.ADD_DESK_HEAD_INFO, addDeskHeadInfo)
    function addDeskHeadInfo(head_){
        container.addChild(that)
        that.x = head_.x
        that.y = head_.y
        if(that.x < 0)that.x = 0
        else if(that.x + that.width > container.width)that.x = container.width - that.width
        if(that.y < 0)that.y = 0
        else if(that.y + that.height > container.height)that.y = container.height - that.height

        that.txt_name.text = head_.vo.name
        that.txt_id.text = head_.vo.id
        that.txt_score.text = head_.vo.score
        that.txt_ip.text = head_.vo.ip
        
        __loadImage.load(head_.vo.url, head_.vo.id, that.head)
        // if(head_ == container.head_up){
        //     that.x = 320
        //     that.y = 100
        // }else if(head_ == container.head_down){
        //     that.x = 160
        //     that.y = 400
        // }else if(head_ == container.head_left){
        //     that.x = 160
        //     that.y = 190
        // }else if(head_ == container.head_right){
        //     that.x = 740
        //     that.y = 200
        // }
    }

    this.on("added", this, function(e){
        that.on("click", this, clickThatHandler)
        game.stage.on("click", this, clickStageHandler)
    })

    this.on("removed", this, function(e){
        that.off("click", this, clickThatHandler)
        game.stage.off("click", this, clickStageHandler)
    })

    function clickThatHandler(e){
        e.stopPropagation()
    }

    function clickStageHandler(e){
        game.utils.remove(that)
    }
}
Laya.class(DeskHeadInfo, "DeskHeadInfo", DeskHeadInfoUI)
