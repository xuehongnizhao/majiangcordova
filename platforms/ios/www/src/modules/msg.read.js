/* 
* @Author: 轻飘时刻
* @Date:   2017-02-13 09:41:14
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-06 18:44:16
*/
function GameRead(){
    var that = this

    this.read_100 = function(){
        trace(this.readByte())
        trace(this.readByte())
        trace(this.readByte())
        trace(this.readByte())
    }

    this.read_996 = function(){
       var str = this.readString()
       if(!str)alert("996 token null")
       console.log(str);
       try{
            rongconnect(str);
       }catch(e){

       }
    }

    this.read_997 = function(){
        var a = this.readInt()
        if(a == 0){
            trace("重连成功 获取消息")
        }else{
            game.scene.add(TipsReLogin)
            console.warn("卧了个槽 重连失败了")
        }
    }

    this.read_998 = function(){
        this.readLong()
        __heartbeat.read()
    }

    this.read_999 = function(){
        this.readInt()
    }

    this.read_1004 = function(){
        var id = this.readString()
        var name = this.readString()
        var sex = this.readString()
        var url = this.readString()

        game.server.send(1001, id, name, url, sex)
    }

    this.read_1001 = function(){
        var id = this.readInt()
        if(id > 0){
            var type = this.readInt()
            //登录后 获取吉祥物 商城列表
            game.server.send(2004)
            if(type == 0){
                __data.ivo.id = id
                __proxy.showMainScene()
                try{
                    game.server.send(996)
                }catch(e){
                    
                }
                
            }else {

            }
        }else if(id == -1){
            __proxy.tips("玩家被封号")
        }
    }

    this.read_3020 = function(){
        var id = this.readInt()
        var state = this.readInt()
        //0 在线 1离线
        if(__data.desk.idToPlayervo[id]){
            __data.desk.idToPlayervo[id].offLineState = state == 0 ? true : false
            var dir = __data.desk.idToDir[id];
            game.cb.dispatchEvent(__event.UPDATE_PLAYER_OFFLINE, [id])
        }
    }

    this.read_2001 = function(){
        // 1 String 头像路径
        //   2 int 房卡
        //   3  int 音乐
        //   4  int 音效
        //   5  String 用户协议
        //   6  String 广播信息
        //   7  String 敲麻玩法规则
        //   8  String 百搭玩法规则
        //  9  int 麻将次数
        //   10  int 麻将房卡
        //   11  int 麻将次数
        //   12  int 麻将房卡
        //   13  int 商品房卡数量
        //   14  int 商品价钱
        //   15  int 商品房卡数量
        //   16  int 商品价钱
        //   17  int 商品房卡数量
        //   18  int 商品价钱
        //   19  int 新手指导 0 未播放 1已播放
        //   20  String ip
        __data.ivo.url = this.readString()
        __data.ivo.roomCard = this.readInt()

        __data.ivo.volumeSound = this.readInt()
        __data.ivo.volumeMusic = this.readInt()

        __sound.yyVolume = __data.ivo.volumeMusic == 1?0:1
        __sound.yxVolume = __data.ivo.volumeSound == 1?0:1

        __data.ivo.agreement = this.readString()
        
        __data.ivo.hornContent = this.readString()

        __data.ivo.ruleQiaoma = this.readString()
        __data.ivo.ruleBaida  = this.readString()
        
        __data.ivo.mj1count = this.readInt()
        __data.ivo.mj1roomCard = this.readInt()
        __data.ivo.mj2count = this.readInt()
        __data.ivo.mj2roomCard = this.readInt()

        __data.ivo.goods1Num = this.readInt()
        __data.ivo.goods1Price = this.readInt()
        __data.ivo.goods2Num = this.readInt()
        __data.ivo.goods2Price = this.readInt()
        __data.ivo.goods3Num = this.readInt()
        __data.ivo.goods3Price = this.readInt()

        __data.ivo.guide = this.readInt()

        __data.ivo.ip = this.readString()

        __data.ivo.carryPropID = this.readInt()

        trace("基本信息：")
        trace(__data.ivo)

        if(__data.ivo.guide == 0){
            game.scene.add(Guide)
        }

        game.cb.dispatchEvent(__event.IVO)

        if(umr_____ && __data.login.roomID){
            umr_____ = 0
            game.server.send(3003, __data.login.roomID)
            game.server.send(6021)
        }

        __sound.playGameMusic()
    }
    var umr_____ = 1

    this.read_2002 = function(){
        __data.ivo.volumeSound = this.readInt()
        __data.ivo.volumeMusic = this.readInt()
        __sound.yyVolume = __data.ivo.volumeMusic == 1?0:1
        __sound.yxVolume = __data.ivo.volumeSound == 1?0:1
        __sound.playGameMusic()
        game.cb.dispatchEvent(__event.UPDATE_VOLUME)
    }

    this.read_2003 = function(){

    }

    //查询吉祥物列表 mall
    this.read_2004 = function(){
        // 1 int 记录数量
        //   2 int ID
        //   3 int 房卡
        //   4 String 名称
        //   5 int 加成     
        __mallConfig.allPropConfig.splice(0, __mallConfig.allPropConfig.length)
        __mallConfig.idToProp = []
        var count = this.readInt()   
        trace("道具数量：", count)
        for(var i = 0; i < count; i++){
            // var id = this.readInt()
            // var roomCard = this.readInt()
            // var name = this.readString()
            // var add = this.readInt()
            var vo = new MallPropVO()
            vo.id = this.readInt()
            vo.roomCard = this.readInt()
            vo.name = this.readString()
            vo.add = this.readInt()

            // trace("道具ID：", vo.id)
            // trace("道具房卡：", vo.roomCard)
            // trace("道具名字：", vo.name)
            // trace("道具加成：", vo.add)
            
            vo.star = __mallConfig.idToPropInfo[vo.id].star;
            vo.url = __mallConfig.idToPropInfo[vo.id].url;
            // vo.des = __mallConfig.idToPropInfo[vo.id].des;
            if(vo.add == 0){
                vo.des = "无加成"
            }else{
                vo.des = "提高"+vo.add+"%经验"
            }
            // trace("道具星星：", vo.star)
            // trace("道具路径：", vo.url)
            // trace("————————————————————————————————————")
            __mallConfig.allPropConfig.push(vo)
            __mallConfig.idToPropVO[vo.id] = vo;
        }
        game.cb.dispatchEvent(__event.UPDATE_MALL_PROP)
        trace("所有商城道具信息：", __mallConfig.allPropConfig)
    }

    //查询吉祥物列表 bag
    this.read_2005 = function(){
        var count = this.readInt()
        var arr = []
        for(var i = 0; i < count; i++){
            var id = this.readInt()
            arr.push(id)
        }
        trace("背包道具id集合：", arr)
        game.cb.dispatchEvent(__event.UPDATE_BAG_PROP, [arr])
    }

    //mall bug prop
    this.read_2006 = function(){
        // 0 成功 -1 没有该吉祥物 -2 已有该吉祥物 -3 房卡不足
        var a = this.readInt()
        if(a == 0){
            __proxy.tips("购买成功")
        }else if(a == -1){
            __proxy.tips("没有该吉祥物")
        }else if(a == -2){
            __proxy.tips("已有该吉祥物")
        }else if(a == -3){
            __proxy.tips("房卡不足")
        }
    }

    //佩戴吉祥物
    this.read_2007 = function(){
        var a = this.readInt()
        if(a == 0){
            __proxy.tips("佩戴吉祥物成功")
        }else if(a == -1){
            __proxy.tips("佩戴吉祥物失败，没有这个吉祥物")
        }
    }

    //卸下吉祥物
    this.read_2008 = function(){
        var a = this.readInt()
        if(a == 0){
            __proxy.tips("卸下吉祥物成功")
        }
    }

    //查看经验等级
    this.read_2009 = function(){
        __data.ivo.exp = this.readInt()
        __data.ivo.lv = this.readInt()
        __data.ivo.maxExp = (__data.ivo.lv+1)*100
        trace("经验：", __data.ivo.exp)
        trace("等级：", __data.ivo.lv)
        game.cb.dispatchEvent(__event.UPDATE_LV_EXP)
    }

    //查看可领取房卡
    this.read_2010 = function(){
        // 1 int 可领取数量
        //   2 int 历史记录数量
        //   3 int 历史记录领取房卡数量
        //   4 long 历史记录领取时间
        PanelShare.data.canReceiveNum = this.readInt()
        var num = this.readInt()
        PanelShare.data.receiveArr.splice(0, PanelShare.data.receiveArr.length)
        for(var i = 0; i < num; i++){
            PanelShare.data.receiveArr.push({
                num:this.readInt(),//领取数量
                time:this.readLong()//领取时间
            })
        }
        trace("领取房卡信息：", PanelShare.data)
        game.cb.dispatchEvent(__event.UPDATE_RECEIVE_ROOM_CARD_RECORD)
    }

    this.read_2011 = function(){
        var roomCardCount = this.readInt()
    }

    this.read_3001 = function(){
        var a = this.readInt()
        var b = this.readInt()
        trace("3001 a b ", a, b)
        if(a){
            game.server.send(3004)
        }else {
            if(b == 1){//显示创建房间面板
                game.scene.add(PanelCreateRoom)
            }else if(b == 2){//显示加入房间面板
                game.scene.add(PanelJoinRoom)
            }else if(b == 0){

            }
        }
    }

    this.read_3003 = function(){
        var a = this.readInt()
        trace("3003 state：" + a)
        if(a == 1){
            
        }else if(a == 2){
            game.scene.removeAll()
            game.scene.add(DeskBG)
            game.scene.add(Desk).createDesk()
        }else if(a == -1){
            __proxy.tips(__lang.PASSWORD_WRONG)
        }else if(a == -2){
            __proxy.tips(__lang.HAVE_ROOM)
        }else if(a == -3){
            __proxy.tips(__lang.ROOM_FULL)
        }
    }

    this.read_3004 = function(){
        var a = this.readInt()
        if(a == 0){
            // trace("重进房间 先不管")
            // trace("重进房间 先不管")
            // trace("重进房间 先不管")
            // __proxy.tips("重进房间 先不管")
            // __proxy.tips("重进房间 先不管")
            // __proxy.tips("重进房间 先不管")
            // 在6040处理
        }else if(a == -1){
            __proxy.tips(__lang.NO_ROOM)
        }
    }

    //创建房间
    this.read_3005 = function(){
        __6035_to_3010_no_out_room = false
        var a = this.readInt()
        trace("3005 state：" + a)
        if(a > 0){
            __data.desk.roomID = a
            game.server.send(3003, a)
        }else if(a == -1){
            __proxy.tips(__lang.HAVE_ROOM)
        }else if(a == -2){
            __proxy.tips(__lang.NO_ROOM_CARD)
        }
    }

    this.read_3006 = function(){
        var a = this.readInt()
        if(a == 0){
            __proxy.showMainScene()
        }else {
            __proxy.tips("退出房间失败")
        }
    }

    this.read_3007 = function(){
        var a = this.readInt()
        if(a == 0){

        }else if(a == -1){

        }else if(a == -2){

        }
    }

    this.read_3008 = function(){
        this.readInt()//不知道干啥的 读了再说
        var id = this.readInt()
        var r = this.readInt()
        if(r == 1){
            //同意
            r = true
        }else if(r == 0){
            //不同意
            r = false
        }
        game.cb.dispatchEvent(__event.DISSOLVE_ROOM, [id, r])

        r = r==1?"true":"false"
        var list = id + "_" + r
        trace("3008 list", list)
        game.cb.dispatchEvent(__event.DISSOLVE_ROOM_ADD_RESULT, [list])
    }

    this.read_3009 = function(){
        // 1 int 玩家ID
        //   2 int 1同意 0不同意
        //   3 int 场内人数
        //   4 String 同意拒绝列表 例 100001_true,100002_false
        var playerID = this.readInt()
        var result = this.readInt()
        var playerNum = this.readInt()
        var list = this.readString()
        trace("playerID", playerID)
        trace("result", result)
        trace("playerNum", playerNum)
        trace("list", list)

        var desk = game.scene.get(Desk)
        if(result == 0 && desk && desk.parent){
            game.scene.add(PanelDissolveNoAgreePT, [playerID])
        }

        game.cb.dispatchEvent(__event.DISSOLVE_ROOM_ADD_RESULT, [list])
        //一个不同意 全都不同意
        result == 0 && game.cb.dispatchEvent(__event.REMOVE_DISSOLVE_ROOM)
    }

    this.read_3010 = function(){
        var id = this.readInt()

        if(id == __data.ivo.id){
            if(__6035_to_3010_no_out_room){

            }else{
                __proxy.showMainScene()   
            }
        }else {
            game.cb.dispatchEvent(__event.OTHER_PLAYER_LEAVE_ROOM, [id])
        }
    }

    this.read_5002 = function(){
        var uid = this.readInt()
        var id = this.readString()



        var desk = game.scene.get(Desk)
        if(!desk)return;



        var dir = __data.desk.idToDir[uid];
        if("updownleftright".indexOf(dir) > -1){

        }else {
            return
        }

        if(id.indexOf("umrumr")>-1){//表情or文字
            id = id.replace("umrumr","")
            if(id <= 28){

                if(game.utils.stage(desk.readyPart["head_"+dir])){
                    desk.readyPart["head_"+dir].addFace(id)
                }

                if(game.utils.stage(desk.playingPart["head_"+dir])){
                    desk.playingPart["head_"+dir].addFace(id)
                }

            }else {

                var content = ""
                var chatid = ''
                for(var i = 0; i < PanelChat.wordConfig.length; i++){
                    if(PanelChat.wordConfig[i].id == id){
                        chatid = id
                        content = PanelChat.wordConfig[i].content
                        break;
                    }
                }

                game.cb.dispatchEvent(__event.DESK_ADD_A_WORD, [desk.readyPart["head_"+dir], content, chatid])
                game.cb.dispatchEvent(__event.DESK_ADD_A_WORD, [desk.playingPart["head_"+dir], content, chatid])
            }
        }else{
            // 输入文字
            game.cb.dispatchEvent(__event.DESK_ADD_A_WORD, [desk.readyPart["head_"+dir], id])
            game.cb.dispatchEvent(__event.DESK_ADD_A_WORD, [desk.playingPart["head_"+dir], id])
        }

        
    }

    this.read_3015 = function(){
        // 1 int 玩家ID
        //   2 int 性别
        //   3 String 昵称
        //   4 int 玩家位置
        //   5 string 玩家头像URL
        //   6 int 如果是朋友场 为房间密码 不是 没有值
        //   7 int 如果是朋友场 为房主ID
        //   8 int 比赛积分
        //  9 int 总局数
        //  10 int 大玩法
        //  11 int 底花
        //  12 int 起胡
        //  13 int 辣子
        //  14 String 特殊玩法
        //  15 int 当前第几局
        //  16 String ip
        //  17 int 房卡
        var vo = new DeskPlayerVO()
        vo.clear()
        vo.id = this.readInt()
        vo.sex = this.readInt()
        vo.sex = vo.sex == 0 ? 1 : vo.sex
        vo.name = this.readString()
        vo.position = this.readInt()
        vo.url = this.readString()
        __data.desk.roomID = this.readInt()
        __data.desk.roomOwnerID = this.readInt()
        vo.score = this.readInt()
        __data.desk.totalMatch = this.readInt()
        // __data.desk.totalMatch = 1;
        __data.desk.bigPlay = this.readInt()
        __data.desk.dihua = this.readInt()
        __data.desk.hupai = this.readInt()
        __data.desk.lazi = this.readInt()
        __data.desk.play = this.readString()
        __data.desk.curMatch = this.readInt()
        vo.ip = this.readString()
        vo.roomCard = this.readInt()
        vo.carryPropID = this.readInt()
        vo.readyState = this.readInt() == 1 ? true : false

        // int 解散玩家数量
        // int 玩家ID
        // int  1 同意 0 不同意
        var d_r = ""
        var dissolve_player_num = this.readInt()
        for(var i = 0; i < dissolve_player_num; i++){
            var id = this.readInt();
            var agree = this.readInt() == 1?"true":"false";
            d_r += ","+id+"_"+agree
        }

        //房间是否开始
        __data.desk.start = this.readInt()
        vo.offLineState = this.readInt() == 0 ? true : false

        __data.desk.idToPlayervo[vo.id] = vo;
        __data.desk.posToPlayervo[vo.position] = vo;


        trace("3015 进入了一个玩家：")
        trace(vo)
        trace("桌面信息：")
        trace(__data.desk)

        var a = __data.desk.posToPlayervo
        for(var i = 0; i < a.length; i++){
            if(a[i] && a[i].id == __data.ivo.id){
                p1_3015 = 1
                b1_3015 = 4
                __data.desk.upPlayervo = null
                __data.desk.downPlayervo = null
                __data.desk.leftPlayervo = null
                __data.desk.rightPlayervo = null
                __data.desk.idToDir = []
                __data.desk.posToDir = []
                bingPosition(a[i].position)
                break;
            }
        }

        game.cb.dispatchEvent(__event.GOIN_PLAYER)
        game.cb.dispatchEvent(__event.UPDATE_ROOM_ID)

        d_r = d_r.replace(",","")
        trace("3008 list", d_r)
        d_r && game.cb.dispatchEvent(__event.DISSOLVE_ROOM)
        d_r && game.cb.dispatchEvent(__event.DISSOLVE_ROOM_ADD_RESULT, [d_r])
    }

    var a1_3015 = [null, "down", "right", "up", "left"];
    var p1_3015 = 1
    var b1_3015 = 4
    function bingPosition(value){
        if(__data.desk.posToPlayervo[value]){
            __data.desk[a1_3015[p1_3015]+"Playervo"] = __data.desk.posToPlayervo[value];
            __data.desk.idToDir[__data.desk.posToPlayervo[value].id] = a1_3015[p1_3015];
            __data.desk.posToDir[__data.desk.posToPlayervo[value].position] = a1_3015[p1_3015];
        }else {

        }

        value++
        p1_3015++
        value>4&&(value=1)
        p1_3015>4&&(p1_3015=1)
        b1_3015--
        if(b1_3015==0){

        }else{
            bingPosition(value)
        }
    }

    //轮到我操作
    this.read_6003 = function(){
        var a = this.readString()
        trace("6003:",a)
        var arr001 = a.split("__")
        a = arr001[0]
        var operateid = parseInt(arr001[1])
        game.cb.dispatchEvent(__event.UPDATE_DIRECTION_LIGHT, [operateid])
        if(operateid != __data.ivo.id)return;
        var b = a.split(";");
        var act = [];
        var bounceCard = [];
        var cardGroup = {};
        
        trace("牌型数组：", b)
        if(!__data.desk.upPlayervo||!__data.desk.downPlayervo||!__data.desk.leftPlayervo||!__data.desk.rightPlayervo){
            trace1("没有用户数据203")
            return
        }
        for(var i = 0; i < b.length; i++){
            var c = b[i].split(",");
            switch(parseInt(c[0])){
                case 1://可以打牌
                    if(c[1] == "n"){//可以打所有牌
                        var m = __data.desk.downPlayervo.handCard.slice()
                        if(__data.desk.downPlayervo.grabCard >= 0){
                            m.push(__data.desk.downPlayervo.grabCard.toString())
                        }
                        game.cb.dispatchEvent(__event.PT_I_OUT_CARD, [m, 1])
                    }else{//c[1]-c[c.length-1]可以打某些牌
                        var m = c.slice(1, c.length)
                        game.cb.dispatchEvent(__event.PT_I_OUT_CARD, [m])
                    }   
                break;
                case 2://有碰操作
                    c[1]//自己的牌 能碰别人的牌的那个牌
                    cardGroup.peng = [[2, c[1],c[1],c[1],c[1]]];//0位置弹起牌，后面3个牌组内容 根绝0 吧 牌组内容的牌弹起来
                    bounceCard.push(c[1])
                    act.indexOf("peng") == -1 && act.push("peng")
                    // game.cb.dispatchEvent(__event.DESK_ADD_ACT, ["peng","pass"]);
                    // game.cb.dispatchEvent(__event.I_BOUNCE_CARD, [[c[1]]]);
                break;
                case 3://吃
                    act.indexOf("chi") == -1 && act.push("chi")

                    cardGroup.chi = cardGroup.chi || []

                    var d = c.slice(1, c.length)
                    d[0]//吃的那个牌
                    for(var i = 0; i < d.length; i+=3){
                        d[i+1];
                        d[i+2];
                        bounceCard.push(d[i+1], d[i+2])

                        var m= Math.min(parseInt(d[i]), parseInt(d[i+1]), parseInt(d[i+2]))
                        trace("吃牌最小数值：", m)
                        //提起的牌
                        var a = [3, d[0], m,m+1,m+2]
                        cardGroup.chi.push(a)
                    }

                break;
                case 4://杠
                    act.indexOf("gang") == -1 && act.push("gang")
                    var d = c.slice(0, c.length)

                    cardGroup.gang = cardGroup.gang || []
                    for(var i = 0; i < d.length; i+=2){
                        bounceCard.push(d[i])
                        var a = [4, d[i+1],d[i+1],d[i+1],d[i+1],d[i+1]];
                        cardGroup.gang.push(a)
                    }
                    trace("gang", cardGroup)
                break;
                // case 5:
                // break;
                case 6://听
                    act.indexOf("ting") == -1 && act.push("ting")
                break;
                // case 7:

                // break;
                // case 8:

                // break;
                case 9:
                    //吃听
                    act.indexOf("chiting") == -1 && act.push("chiting")

                    cardGroup.chiting = []

                    var d = c.slice(1, c.length)
                    d[0]//吃的那个牌
                    for(var i = 0; i < d.length; i+=3){
                        d[i+1]
                        d[i+2]
                        bounceCard.push(d[i+1], d[i+2])
                        //提起的牌
                        
                        var m= Math.min(parseInt(d[i]), parseInt(d[i+1]), parseInt(d[i+2]))
                        //提起的牌
                        var a = [3, d[0], m,m+1,m+2]
                        cardGroup.chiting.push(a)
                    }
                break;
                case 10:
                    //碰听
                    cardGroup.pengting = [[10, c[1],c[1],c[1],c[1]]];//0位置弹起牌，后面3个牌组内容 根绝0 吧 牌组内容的牌弹起来
                    bounceCard.push(c[1])
                    act.indexOf("pengting") == -1 && act.push("pengting")
                break;
            }
        }
        if(act.length){
            act.indexOf("pass") == -1 && act.push("pass")
            game.cb.dispatchEvent(__event.DESK_ADD_ACT, [act, cardGroup])
        }
        if(bounceCard.length){
            game.cb.dispatchEvent(__event.I_BOUNCE_CARD, [bounceCard]);
        }
        var replay = game.scene.get(Replay)
        if(replay&&replay.parent){
            game.cb.dispatchEvent(__event.DESK_REMOVE_ACT)
        }
    }

    this.read_6021 = function(){
        var id = this.readInt()
        var state = this.readInt()//0 不准备 1 准备
        if(__data.desk.idToPlayervo[id]){
            __data.desk.idToPlayervo[id].readyState = state == 1 ? true : false
        }
        game.cb.dispatchEvent(__event.UPDATE_READY_STATE, [id, state])

        __6035_to_3010_no_out_room = false
        __is_small_result = false
    }

    //抓牌和打牌
    this.read_6023 = function(){
        var userid = this.readInt()
        var handCard = this.readString()//"1,2,3"
        var outCard = this.readString()//"1,2,3,5,6".
        //三个一样的 0
        //连 1
        //对子 2
        //4个一样的 扣着的 3
        //4个一样的 亮着的 4
        var doorCard = this.readString()//"type,1" 
        var surplus_card_count = this.readInt();

        var grabCard = this.readInt();

        var lastOutCardUserID = this.readInt()
        var outCardValue = this.readInt()

        var ting = this.readInt()
        var hupai = this.readString()
 
        var act_type = this.readInt()//0没有 2碰 3吃 4杠 6听 9吃听 10碰听
        var baida_yindao_card = this.readInt()//没有-1
        var baida_baida_card  = this.readInt()//没有-1

        __data.desk.baida_yingdao_card = baida_yindao_card
        __data.desk.baida_baida_card   = baida_baida_card
        trace("玩家ID:",userid)
        trace("手牌列表:",handCard)
        trace("门牌列表:",doorCard)
        trace("出牌列表:",outCard)
        trace("抓牌:",grabCard)
        trace("出牌玩家ID:",lastOutCardUserID)
        trace("出牌牌值:",outCardValue)
        trace("听牌状态:",ting)
        trace("胡牌牌值:",hupai)
        trace("操作类型:",act_type)
        trace("百搭玩法 引导牌牌值:",baida_yindao_card)
        trace("百搭玩法 百搭牌牌值:",baida_baida_card)  


        game.cb.dispatchEvent(__event.UPDATE_SURPLUS_CARD_NUM, [surplus_card_count])
        game.cb.dispatchEvent(__event.ADD_DESK_ACT_EFFECT, [userid, act_type])
        game.cb.dispatchEvent(__event.ADD_BAIDA, [baida_baida_card, baida_yindao_card])


        var vo = __data.desk.idToPlayervo[userid];
        if(!vo){
            trace1("获取不到对应的用户数据")
            return
        }
        vo.tingState = ting == 0 ? false : true
        vo.handCard = handCard.split(",")
        vo.outCard = outCard.split(",")
        vo.hupai = hupai

        //手牌处理
        if(grabCard == -2){//别人抓牌
            vo.handCard.splice(0, 1)
            vo.grabCard = -2
        }else if(grabCard == -1){//没抓牌
            vo.grabCard = -1
        }else{//我自己抓牌
            var i = vo.handCard.indexOf(grabCard.toString())
            vo.handCard.splice(i, 1)
            vo.grabCard = grabCard
        }
                
        if(userid == lastOutCardUserID && outCardValue > -1){
            var i = vo.outCard.lastIndexOf(outCardValue.toString())
            vo.outCard.splice(i, 1)
            game.cb.dispatchEvent(__event.UPDATE_OUT_CARD, [userid])
            game.cb.dispatchEvent(__event.PLAYER_OUT_CARD, [userid, outCardValue])
        }else{
            game.cb.dispatchEvent(__event.UPDATE_OUT_CARD, [userid])
        }

        if(lastOutCardUserID == -1 && outCardValue == -1){
            game.cb.dispatchEvent(__event.DESK_REMOVE_ARROW)
        }

        // type card otherid othercard
        var d = doorCard.split(",")
        vo.doorCard = []
        for(var i = 0; i < d.length; i+=4){
            switch(parseInt(d[i])){
                case 0:
                vo.doorCard.push("three:"+d[i+1]+"-"+d[i+1]+"-"+d[i+1]+":"+d[i+2]+":"+d[i+3])//
                break;
                case 1:
                vo.doorCard.push("three:"+d[i+1]+"-"+(parseInt(d[i+1])+1)+"-"+(parseInt(d[i+1])+2)+":"+d[i+2]+":"+d[i+3])//
                break;
                case 2:
                vo.doorCard.push("two:"+d[i+1]+"-"+d[i+1]+":"+d[i+2]+":"+d[i+3])
                break;
                case 3:
                vo.doorCard.push("dark:"+d[i+1]+"-"+d[i+1]+"-"+d[i+1]+"-"+d[i+1]+":"+d[i+2]+":"+d[i+3])
                break;
                case 4:
                vo.doorCard.push("light:"+d[i+1]+"-"+d[i+1]+"-"+d[i+1]+"-"+d[i+1]+":"+d[i+2]+":"+d[i+3])//
                break;
            }
        }

        game.cb.dispatchEvent(__event.UPDATE_PLAYER_CARD, [userid])

        //更新补花数量 
        game.cb.dispatchEvent(__event.UPDATE_HEAD_BUHUA_NUM, [userid, vo])

        if(userid == __data.ivo.id && hupai != -1){
            game.cb.dispatchEvent(__event.ADD_HUPAI)
        }
    }

    //游戏开始
    this.read_6024 = function(){
        __data.desk.firstZhuangID = this.readInt()//最开始庄家id
        __data.desk.curZhuangID = this.readInt()//当前庄家id
        __data.desk.curMatch = this.readInt()//当前圈
        __data.desk.start = 1;
        trace("东家id：", __data.desk.firstZhuangID)
        trace("庄家id：", __data.desk.curZhuangID)
        trace("当前比赛次数：", __data.desk.curMatch)
        game.cb.dispatchEvent(__event.GAME_START)
        
        __6035_to_3010_no_out_room = false
        __is_small_result = false
    }

    //小结算
    this.read_6035 = function(){
      //   1 int 胜者玩家ID
      //     2 String 手牌 userid，牌值，牌值，牌值, userid，牌值，牌值，牌值
      //     3 String 门前牌 
      //     4 String 胡牌牌型 ，分隔 id,paixing,id,paixing
      //     5 int 苍蝇分 userid,score,userid,score
      //     6 int 封顶  userid,score,userid,score
      //     7 int 总得分 userid,score,userid,score
      //     8 int 点炮玩家ID -1 没有点炮
      //    9 int 飞苍蝇牌值 -1 没有飞苍蝇
      //   10 int 飞苍蝇分
      // 先出 飞苍蝇 动画 后出结算
        var winPlayerID = this.readInt()
        var allHandCard = this.readString()
        var allDoorCard = this.readString()
        var allPaixing = this.readString()
        var allCangying = this.readString()
        var allFengding = this.readString()
        var allCurMatchfen = this.readString()
        var dianpaoPlayerID = this.readInt()

        //下面这2个是出动画用的
        var cangyingCardValue = this.readInt()
        var cangyingScore = this.readInt()

        var allBuhua = this.readString()
        var allShouhua = this.readString()
        var hupai = this.readInt()
        var allZongfen = this.readString()
        // 
        // var winPlayerID = 100354
        // var allHandCard = "100354,1,1,1,2,2,2,3,3,3,4,4,4,6,5;100357,11,11,11,12,12,12,13,13,13,14;100356,17,20,20,20,21,21,21,22,22,22,23,23,23;100355,15,15,15,25,25,25,26,26,26,27,27,27,28"
        // var allDoorCard = "100354;100357,4,5;100356;100355"
        // var allPaixing = "100354,门清,无花果,门清,无花果,地胡,地胡;100357,门清,无花果,地胡,门清,无花果,地胡;100356,门清,地胡,门清,地胡"
        // var allCangying = "100354,1;100357,-1;100356,0;100355,0"
        // var allFengding = "100354,20;100357,-20;100356,0;100355,0"
        // var allZongfen = "100354,21;100357,-21;100356,0;100355,0"
        // var dianpaoPlayerID = 100357
        // var cangyingCardValue = 10
        // var cangyingScore = 1
        // var allBuhua = ""
        // var allShouhua = ""
        // var hupai = -1

        trace("赢玩家ID", winPlayerID)
        trace("所有玩家手牌", allHandCard)
        trace("所有玩家门牌", allDoorCard)
        trace("所有玩家赢牌牌型", allPaixing)
        trace("所有玩家苍蝇", allCangying)
        trace("所有玩家封顶", allFengding)
        trace("所有玩家当前局分", allCurMatchfen)
        trace("点炮玩家ID", dianpaoPlayerID)
        trace("苍蝇玩法 苍蝇牌 数值", cangyingCardValue)
        trace("苍蝇玩法 苍蝇牌 分", cangyingScore)
        trace("所有玩家补花", allBuhua)
        trace("所有玩家手花", allShouhua)
        trace("胡牌牌值", hupai)
        trace("所有玩家总分", allZongfen)
        // winPlayerID 100182
        // allHandCard 100182,10,14,10,14,10,14,11,14,11,14,11,14,12,14,12,14,12,14,13,14,13,14,13,14,14,14;100184,0,5,14,15,15,21,22,23,24,25,25,30,33;100183,0,2,3,5,13,16,17,17,22,23,24,26,28;100119,0,3,6,6,10,18,20,20,27,27,31,31,32
        // allDoorCard 100182;100184;100183;100119
        // allHuPai 门清,清一色
        // allFengding 100182,16;100184,-16;100183,0;100119,0
        // allZongfen 100182,16;100184,-16;100183,0;100119,0
        // dianpaoPlayerID 100184
        // cangyingCardValue -1
        // cangyingScore 0
        // 
        //弹出小结算 所有玩家 准备state 变成false

        var voArr = []
        var m = [];
        var a = allHandCard.split(";")
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(",")
            var id = b[0];
            voArr[id] = voArr[id] || new SmallResultItemVO()
            voArr[id].id = id
            voArr[id].handCard = b.slice(1, b.length);
            try{
                voArr[id].name = __data.desk.idToPlayervo[id].name
            }catch(e){
                voArr[id].name = "测试专用"
            }
            voArr[id].winState = allPaixing.indexOf(id) > -1 ? true : false
            voArr[id].hupai = hupai
            voArr[id].cangyingCardValue = cangyingCardValue

            if(voArr[id].winState){
                var index = voArr[id].handCard.indexOf(hupai.toString())
                voArr[id].handCard.splice(index, 1)
            }

            m.push(voArr[id])
        }

        var a = allShouhua.split(";")
        for(var i = 0; i < a.length; i++){
            if(a[i]){
                var b = a[i].split(",")
                var id = b[0];
                voArr[id].shouhua = b[1]?b[1]:0
            } 
        }

        var a = allBuhua.split(";")
        for(var i = 0; i < a.length; i++){
            if(a[i]){
                var b = a[i].split(",")
                var id = b[0];
                voArr[id].buhua = b[1]
            }
        }

        var a = allPaixing.split(";")
        for(var i = 0; i < a.length; i++){
            if(a[i]){
                var b = a[i].split(",")
                var id = b[0];
                var paixing = a[i].replace(id+",", "")
                voArr[id].paixing = paixing
            }
        }

        var a = allCangying.split(";")
        for(var i = 0; i < a.length; i++){
            if(a[i]){
                var b = a[i].split(",")
                var id = b[0];
                voArr[id].cangying = b[1]
            }
        }

        var a = allFengding.split(";")
        for(var i = 0; i < a.length; i++){
            if(a[i]){
                var b = a[i].split(",")
                var id = b[0];
                voArr[id].fengding = b[1]
            }
        }

        var a = allCurMatchfen.split(";")
        for(var i = 0; i < a.length; i++){
            if(a[i]){
                var b = a[i].split(",")
                var id = b[0];
                voArr[id].curfen = b[1];
            }
        }

        var a = allZongfen.split(";")
        for(var i = 0; i < a.length; i++){
            if(a[i]){
                var b = a[i].split(",")
                var id = b[0];
                voArr[id].zongfen = b[1];
                __data.desk.idToPlayervo[id].score = b[1];
            }
        }
        game.cb.dispatchEvent(__event.UPDATE_PLAYER_SCORE)

        //玩家总分 处理 和玩家信息 进行绑定 更改 然后修改 界面 玩家头像处的 分数
        

        var a = allDoorCard.split(";")
        for(var j = 0; j < a.length; j++){
            var b = a[j].split(",")
            var vo = voArr[b[0]]
            var d = b.slice(1, b.length)
            vo.doorCard = []
            for(var i = 0; i < d.length; i+=2){
                switch(parseInt(d[i])){
                    case 0:
                    vo.doorCard.push("three:"+d[i+1]+"-"+d[i+1]+"-"+d[i+1])
                    break;
                    case 1:
                    vo.doorCard.push("three:"+d[i+1]+"-"+(parseInt(d[i+1])+1)+"-"+(parseInt(d[i+1])+2))
                    break;
                    case 2:
                    vo.doorCard.push("two:"+d[i+1]+"-"+d[i+1])
                    break;
                    case 3:
                    vo.doorCard.push("dark:"+d[i+1]+"-"+d[i+1]+"-"+d[i+1]+"-"+d[i+1])
                    break;
                    case 4:
                    vo.doorCard.push("light:"+d[i+1]+"-"+d[i+1]+"-"+d[i+1]+"-"+d[i+1])
                    break;
                }
            }
        }
        
        var desk = game.scene.get(Desk)
        if(desk && desk.parent){
            __is_small_result = true
            __6035_to_3010_no_out_room = true

            for(var i = 0; i < m.length; i++){
                if(!m[i].winState)continue;
                __sound.playGameYx(__data.desk.idToPlayervo[m[i].id].sex+"/hu")
                game.cb.dispatchEvent(__event.ADD_HU_EFFECT, [m[i].id, hupai])
            }

            setTimeout(function(){
                if(parseInt(cangyingCardValue)>=0){
                    __sound.playGameYx("feicangying")
                    game.cb.dispatchEvent(__event.ADD_CANGYING_EFFECT, [cangyingCardValue, cangyingScore])
                    setTimeout(function(){
                        game.scene.add(DeskResultSmall, [m, allPaixing])
                    }, 2000)
                }else{
                    game.scene.add(DeskResultSmall, [m, allPaixing])
                }
            }, 3000)
        }
    }

    var __is_small_result = false
    //收到6035 在收到 3010 不退出房间
    var __6035_to_3010_no_out_room = false

    // game.cb.addEvent("6035", this.read_6035)

    //大结算
    this.read_6036 = function(){
        __6035_to_3010_no_out_room = true
        // 1 String 自摸次数 ID，值；ID，值；ID，值；ID，值；
        //   2 String 接炮
        //   3 String 点炮
        //   4 String 明杠
        //   5 String 暗杠
        //   6 String 总分
        var zimo = this.readString()
        var jiepao = this.readString()
        var dianpao = this.readString()
        var minggang = this.readString()
        var angang = this.readString()
        var score = this.readString()
        var exp = this.readString()
        trace("zimo", zimo)
        trace("jiepao", jiepao)
        trace("dianpao", dianpao)
        trace("minggang", minggang)
        trace("angang", angang)
        trace("score", score)
        trace("exp", exp)

        var m = []
        var voArr = []
        //自摸次数处理
        var a = zimo.split(";")
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(",")
            var id = b[0]
            var value = b[1]
            voArr[id] = voArr[i] || new BigResultItemVO()
            m.push(voArr[id])
            voArr[id].zimo = parseInt(value)
            voArr[id].name = __data.desk.idToPlayervo[id].name
            voArr[id].url  = __data.desk.idToPlayervo[id].url
            voArr[id].id   = id
        }

        //接炮次数处理
        var a = jiepao.split(";")
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(",")
            var id = b[0]
            var value = b[1]
            voArr[id].jiepao = parseInt(value)
        }

        //点炮次数处理
        var a = dianpao.split(";")
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(",")
            var id = b[0]
            var value = b[1]
            voArr[id].dianpao = parseInt(value)
        }

        //明杠次数处理
        var a = minggang.split(";")
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(",")
            var id = b[0]
            var value = b[1]
            voArr[id].minggang = parseInt(value)
        }

        //暗杠次数处理
        var a = angang.split(";")
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(",")
            var id = b[0]
            var value = b[1]
            voArr[id].angang = parseInt(value)
        }

        //分数次数处理
        var a = score.split(";")
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(",")
            var id = b[0]
            var value = b[1]
            voArr[id].score = parseInt(value)
        }

        //分数次数处理
        var a = exp.split(";")
        for(var i = 0; i < a.length; i++){
            var b = a[i].split(",")
            var id = b[0]
            var value = b[1]
            voArr[id].exp = parseInt(value)
        }
        //最大赢家计算
        var n = m.slice(0, m.length)
        n.sort(function(a, b){
            return b.score - a.score
        })
        n[0].score != 0 && (n[0].winState = true)
        for(var i = 1; i < n; i++){
            if(n[0]&&n[0].score!=0&&n[i]&&n[0].score==n[i].score){
                n[i].winState = true
            }
        }

        //最佳炮手计算
        var n = m.slice(0, m.length)
        n.sort(function(a, b){
            return b.dianpao-a.dianpao
        })
        n[0].dianpao != 0 && (n[0].paoState = true)
        for(var i = 1; i < n; i++){
            if(n[0]&&n[0].dianpao!=0&&n[i]&&n[0].dianpao==n[i].dianpao){
                n[i].paoState = true
            }
        }

        DeskResultBig.m = m
        game.cb.dispatchEvent(__event.UPDATE_BIG_RESULT)

        //如果add小结算 就不弹出 大结算 & 当前场次==总场次 如果 当前场次！=总场次 那么说明是解散出发的 需要弹出
        if(__is_small_result && (__data.desk.curMatch == __data.desk.totalMatch)){
            
        }else{
            game.scene.add(DeskResultBig, [m])
        }
    }

    this.read_6040 = function(){
        var a = this.readInt()
        a == 0//没开始 or 已经结束
        trace("中途进房间标志 type : ", a)
        if(a > 0){
            game.scene.removeAll()
            game.scene.add(DeskBG)
            game.scene.add(Desk).createDesk()
            game.cb.dispatchEvent(__event.GAME_START)
        }else if(a == 0){
            game.scene.removeAll()
            game.scene.add(DeskBG)
            game.scene.add(Desk).createDesk()
        }
    }

    this.read_7001 = function(){
//         1 int 记录数量
//             2 String 房间密码
//             3 int 位置1玩家ID
//             4 int 位置1玩家积分
//             5 String 位置1玩家姓名
//             6 int 位置2玩家ID
//             7 int 位置2玩家积分
//             8 String 位置2玩家姓名
//             9 int 位置3玩家ID
//             10 int 位置3玩家积分
//             11 String 位置3玩家姓名
//             12 int 位置4玩家ID
//             13 int 位置4玩家积分
//             14 String 位置4玩家姓名
//             15 long 比赛时间
// 。。。。。。
        var count = this.readInt()
        trace("记录数量：", count)
        var a = []
        for(var i = 0; i < count; i++){
            var vo = {
                roomID:this.readString(),
                id1:this.readInt(),
                score1:this.readInt(),
                name1:this.readString(),

                id2:this.readInt(),
                score2:this.readInt(),
                name2:this.readString(),

                id3:this.readInt(),
                score3:this.readInt(),
                name3:this.readString(),

                id4:this.readInt(),
                score4:this.readInt(),
                name4:this.readString(),

                time:this.readLong()
            }
            a.push(vo)
        }
        trace("记录数据：",  a)

        PanelRecord1.list = a
        game.cb.dispatchEvent(__event.UPDATE_RECORD_1_LIST)
    }

    this.read_7002 = function(){
        // 1 int 记录数量
        //     2 int 局数

        //     3 int 位置1玩家ID
        //     4 int 位置1玩家积分
        //     5 String 位置1玩家姓名
        //     6 int 位置2玩家ID
        //     7 int 位置2玩家积分
        //     8 String 位置2玩家姓名
        //     9 int 位置3玩家ID
        //     10 int 位置3玩家积分
        //     11 String 位置3玩家姓名
        //     12 int 位置4玩家ID
        //     13 int 位置4玩家积分
        //     14 String 位置4玩家姓名

        //     15 long 比赛时间
        //     16 String 比赛信息
        var count = this.readInt()
        var a = [];
        for(var i = 0; i < count; i++){
            var vo = {
                roomID:PanelRecordItem1.roomID,
                id:this.readInt(),
                match:this.readInt(),
                
                id1:this.readInt(),
                score1:this.readInt(),
                name1:this.readString(),

                id2:this.readInt(),
                score2:this.readInt(),
                name2:this.readString(),

                id3:this.readInt(),
                score3:this.readInt(),
                name3:this.readString(),

                id4:this.readInt(),
                score4:this.readInt(),
                name4:this.readString(),

                time:this.readLong(),
                // info:this.readString()
            }
            a.push(vo)
        }   
        trace("记录数据：",  a)
        PanelRecord2.list = a
        game.cb.dispatchEvent(__event.UPDATE_RECORD_2_LIST)
    }

    this.read_7003 = function(){
        var a = this.readString()
        var b = a.split("__")
        var c = game.scene.get(PanelRecord1)
        if(c && c.parent)__replay.play(b)
    }

    game.MsgRead.call(this)
}