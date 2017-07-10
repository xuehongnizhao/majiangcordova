/**
 * ...
 * @author 轻飘时刻
 */
function cacheAtlasAndImage(arr){
    for(var i = 0; i < arr.length; i++){
        var o = arr[i]
        var url = o.url
        var json = url.indexOf("json")
        if(json != -1)continue
        url = url.replace(config.urlHead, "")
        
        var atlas = url.indexOf("atlas")
        url = url.replace("res/", "")
        url = url.replace("atlas/", "")
        if(atlas == -1){
            var mp3 = url.indexOf(".mp3")
            var wav = url.indexOf(".wav")
            if(mp3 >= 0 || wav >= 0)continue;
            url = url.replace(config.verson_res, "")
            game.utils.cacheImage(url)
        }else {
            url = url.replace(".png"+config.verson_res, "")
            // url = url.replace(".json"+config.verson_res, "")
            game.utils.cacheAtlas(url)
        }
    }
}

function _game_init_(){
	trace("加载loading资源")
    Laya.loader.load(loadingResArr, Laya.Handler.create(this, load_loadingRes_com));
}
function load_loadingRes_com(){
    trace("加载loading资源com")
    cacheAtlasAndImage(loadingResArr)
    load_loadingSrc();
}
function load_loadingSrc(){
    trace("加载loading源码")
    loadScript(firstSrcArr, function(){
        load_loadingSrc_com();
    })
}
var __isconnect = false//服务器 是否链接 成功
var __isresloadcom = false//资源 是否加载 完毕
function load_loadingSrc_com(){
    trace("加载loading源码com")
    $("#waitdiv").remove();
    game.scene.add(Loading)
    load_gameAllRes()
}
function load_gameAllRes(){
    Laya.loader.load(gameResArr, Laya.Handler.create(this, load_gameAllRes_com), Laya.Handler.create(this, load_gameAllRes_pro, null, false));
}
function load_gameAllRes_com(){
    cacheAtlasAndImage(gameResArr)
    load_gameAllSrc()
}
function load_gameAllSrc(){
    loadScript(gameSrcArr,
        function(){
            __isresloadcom = true
            // __isconnect && __isresloadcom && load_gameAllSrc_com()
            // _start_game_()
            start_connect_server()
        },
        function(value){
            load_gameAllRes_pro(value)
            // game.scene.get(Loading).progress(value * 2)
        }
    )
}
function start_connect_server(){
    new GameSend();
    new GameRead();
    game.server.connect(config.ip, config.host)
    game.cb.addEvent("socketConnect", socketConnectHandler)
    game.cb.addEvent("socketClose", socketCloseHandler)
    game.cb.addEvent("socketError", socketErrorHandler)
    game.cb.addEvent("socketTimeOut", socketTimeOutHandler)
    game.cb.addEvent("socketFail", socketFailHandler)
}
var socketFailHandler = function(){
    var a = game.scene.get(TipsReConnect)
    if(a && a.parent)a.fail()
    else game.scene.add(TipsReConnect)
}
var socketTimeOutHandler = function(){
    alert("服务器未启动")
}
var socketConnectHandler = function(){
    trace("服务器连接成功。。。")
    game.scene.remove(TipsReConnect)
    // game.scene.remove(TipsReLogin)
    try{
        var l = game.scene.get(Login)
        var ld = game.scene.get(Loading)
        if(l && l.parent){
            l.addEvent()
        }else if(game.server.connectState == 1 || (ld && ld.parent)){
            __data.login.roomID = parseInt(getHttpParams("roomID"))
            if(__data.login.roomID && __data.login.roomID > 0){
                game.server.send(1001)
            }else {
                _start_game_()
            }
        }else if(game.server.connectState == 2){
            trace("重新连接成功...")
            game.server.send(1001, __data.login.id, __data.login.name, __data.login.url, __data.login.sex, 1)
            game.server.send(997)
        }
    }catch(e){
        trace(e)
    }
}
var socketCloseHandler = function(){
    game.scene.add(TipsReConnect).delayConnect()
}
var _time__ = Date.now()
var socketErrorHandler = function(){
    trace("》》》》》》》》》", Date.now() - _time__)
}
function _start_game_(){
    var ld = game.scene.get(Loading)
    if(ld&&ld.parent){
        __cache_bigModule.cacheBigModules()
        // game.scene.add(MainScene)
        // game.scene.add(MainSceneUp)
        // game.scene.add(MainSceneDown)
        // game.scene.add(Desk)//缓存桌面
        // game.scene.add(DeskResultSmall)//缓存桌面
        // game.scene.add(DeskResultBig)//缓存桌面
        // game.scene.add(PanelCreateRoom)//缓存桌面
        // game.scene.removeAll()
        // game.scene.add(Login)
    }else{
        game.scene.removeAll()
        game.scene.add(Login)
    }
    // var a = Date.now()
    // Laya.timer.frameLoop(1, this, function(){
    //     var b = Date.now()
    //     trace(b - a)
    //     a = b
    // })
    // var a = new DeskEffectCangying()
    // a.x = a.y = 400
    // a.play(8, 8)
    // game.stage.addChild(a)
    // try{
    //     game.cb.dispatchEvent("6035")
    // }catch(e){
    //     trace(e)
    // }
    
    // game.scene.add(DeskResultSmall)
    // 
    // c = [3,8,6,7]
    // var d = c.slice(1, c.length)
    // var bounceCard = [];
    // var cardGroup = {}
    // cardGroup.chi = [];
    // d[0]//吃的那个牌
    // for(var i = 0; i < d.length; i+=3){
    //     d[i+1];
    //     d[i+2];
    //     bounceCard.push(d[i+1], d[i+2])
    //     //提起的牌
    //     var a = [3, d[0], d[i+1],parseInt(d[i+1])+1,parseInt(d[i+1])+2]
    //     cardGroup.chi.push(a)
    // }
    // trace(cardGroup.chi)

    
    // var d = "1,8".split(",")
    // var a = []
    // for(var i = 0; i < d.length; i+=2){
    //     switch(parseInt(d[i])){
    //         case 0:
    //         a.push("three:"+d[i+1]+"-"+d[i+1]+"-"+d[i+1])
    //         break;
    //         case 1:
    //         a.push("three:"+d[i+1]+"-"+(parseInt(d[i+1])+1)+"-"+(parseInt(d[i+1])+2))
    //         break;
    //         case 2:
    //         a.push("two:"+d[i+1]+"-"+d[i+1])
    //         break;
    //         case 3:
    //         a.push("dark:"+d[i+1]+"-"+d[i+1]+"-"+d[i+1]+"-"+d[i+1])
    //         break;
    //         case 4:
    //         a.push("light:"+d[i+1]+"-"+d[i+1]+"-"+d[i+1]+"-"+d[i+1])
    //         break;
    //     }
    // }

    // function add_card_three(value){
    //     trace(value)
    //     var a = value.split("-")
    //     for(var i = 0; i < a.length; i++){
    //         var card = __factory.get(DownPlayerDoorCardLight, a[i])
    //         game.stage.addChild(card)
    //         card.x = 0 + card.width * i
    //         card.y = 0
    //     }
    // }
    // for(var i = 0; i < a.length; i++){
    //     var b = a[i].split(":")
    //     switch(b[0]){
    //         case "two":
    //         add_card_two(b[1])
    //         break;
    //         case "three":
    //         add_card_three(b[1])
    //         break;
    //         case "dark":
    //         add_card_dark(b[1])
    //         break;
    //         case "light":
    //         add_card_light(b[1])
    //         break;
    //     }
    // }

    // add_card_three("21-22-23")


    // var cardGroup = new DeskPlayingCardGroup()
    // cardGroup.x = 50
    // cardGroup.y = 500
    // cardGroup.addCardGroup([[2,2,1,2,3],[3,1,1,1,1]])
    // game.stage.addChild(cardGroup)
    // game.stage.on("click", this, function(e){
    //     trace(game.utils.getClassName(e.target))
    //     e.target.x++
    //     e.target.y++
    // })
    // var a = window.document.getElementById("music")
    // window.document.body.appendChild(a)
}

var __cache_bigModule = __cache_bigModule || {}
__cache_bigModule.lastClass = null;
__cache_bigModule.run = true;
__cache_bigModule.cacheBigModules = function(){
    __cache_bigModule.run = false
    __cache_bigModule.needCacheBigModules = [MainScene, MainSceneUp, MainSceneDown, Desk, DeskResultSmall, DeskResultBig, PanelCreateRoom, PanelJoinRoom, Guide, PanelShare, PanelBag, PanelMall, PanelRecord1, PanelRecord2, PanelSet, PanelChat, PanelBagInfo, PanelRule, PanelRoomCardMall];
    __cache_bigModule.max = __cache_bigModule.needCacheBigModules.length;
    Laya.timer.frameLoop(2, __cache_bigModule, __cache_bigModule.next)
    // __cache_bigModule.id = setInterval(__cache_bigModule.next, 33)
}   
__cache_bigModule.next = function(){
    if(__cache_bigModule.needCacheBigModules.length){
        game.scene.remove(__cache_bigModule.lastClass)
        __cache_bigModule.lastClass = __cache_bigModule.needCacheBigModules.shift()
        game.scene.add(__cache_bigModule.lastClass)
        load_gameAllRes_pro(__cache_bigModule.max - __cache_bigModule.needCacheBigModules.length/__cache_bigModule.max)
    }else{
        game.scene.remove(__cache_bigModule.lastClass)
        game.scene.add(Login);
        initrong();
        // game.scene.removeAll()
        // game.scene.add(DeskBG)
        // game.scene.add(Desk).createDesk().addPlaying()


        Laya.timer.clear(__cache_bigModule, __cache_bigModule.next)
        // clearInterval(__cache_bigModule.id)
        clearInterval(__cache_bigModule.id)
    }
}

function load_gameAllRes_pro(value){
    game.scene.get(Loading).progress(value * 2)
}

var loadingResArr = [
    {"url":config.urlHead+"res/atlas/comp.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/comp.json"+config.verson_res, "type":Laya.Loader.JSON}

    ,{"url":config.urlHead+"res/atlas/loading.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/loading.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/loading/load1.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/loading/load2.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/loading/background.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/loading/logo.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/tips.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/tips.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/tips/xts.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/comp1.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/comp1.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/comp1/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/sound/button.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
]
var firstSrcArr = [
    config.urlHead+"src/modules/msg.read.js" + config.verson_src
    ,config.urlHead+"src/modules/msg.send.js" + config.verson_src
    ,config.urlHead+"src/modules/data.js" + config.verson_src
    ,config.urlHead+"src/modules/loading.js" + config.verson_src
    ,config.urlHead+"src/modules/tips.js" + config.verson_src
    ,config.urlHead+"src/modules/event.name.js" + config.verson_src
    ,config.urlHead+"src/modules/language.js" + config.verson_src
    ,config.urlHead+"src/modules/sound.js" + config.verson_src
]
var gameResArr = [
    {"url":config.urlHead+"res/atlas/login.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/login.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/login/loginbg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/login/dz.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/mainScene.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/mainScene.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/mainScene/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/mainScene/noticebg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/mainScene/down.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/mainScene/up.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/mainScene/help.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/mainScene/fksc.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/panel_headInfo.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_headInfo.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_headInfo/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/pai3.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/pai3.json"+config.verson_res, "type":Laya.Loader.JSON}

     ,{"url":config.urlHead+"res/atlas/panel_record.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_record.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_record/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_record/itembg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_record/jlbg.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/panel_createRoom.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_createRoom.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_createRoom/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/panel_joinRoom.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_joinRoom.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_joinRoom/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/panel_set.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_set.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_set/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/panel_bag.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_bag.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_bag/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_bag/jxwbbbg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_bag/jxwbbxq.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_bag/jxwscbg.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/panel_share.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_share.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_share/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_share/receive_bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_share/share_bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/panel_rule.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_rule.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_rule/baidawanfa1.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/baidawanfa2.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/baidawanfa3.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/baidawanfa4.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/baidawanfa5.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/qiaomawanfa1.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/qiaomawanfa2.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/qiaomawanfa3.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/qiaomawanfa4.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/qiaomawanfa5.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/qiaomawanfa6.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_rule/wanfabg.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/desk.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/desk.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/desk/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/desk/ready_mj.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/desk_effect.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/desk_effect.json"+config.verson_res, "type":Laya.Loader.JSON}

    ,{"url":config.urlHead+"res/atlas/effect_fire.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/effect_fire.json"+config.verson_res, "type":Laya.Loader.JSON}

    ,{"url":config.urlHead+"res/atlas/card.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/card.json"+config.verson_res, "type":Laya.Loader.JSON}

    ,{"url":config.urlHead+"res/atlas/panel_chat.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_chat.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_chat/bg.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/result_small.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/result_small.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/result_small/kuang.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/result_small/tiao.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/result_big.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/result_big.json"+config.verson_res, "type":Laya.Loader.JSON}

    ,{"url":config.urlHead+"res/atlas/replay.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/replay.json"+config.verson_res, "type":Laya.Loader.JSON}

    ,{"url":config.urlHead+"res/atlas/voice.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/voice.json"+config.verson_res, "type":Laya.Loader.JSON}

    ,{"url":config.urlHead+"res/atlas/panel_dissolve.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/panel_dissolve.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/panel_dissolve/jiesanbg.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/panel_dissolve/tishi.png"+config.verson_res, "type":Laya.Loader.IMAGE}

    ,{"url":config.urlHead+"res/atlas/guide.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/atlas/guide.json"+config.verson_res, "type":Laya.Loader.JSON}
    ,{"url":config.urlHead+"res/guide/1.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/guide/2.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/guide/3.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    ,{"url":config.urlHead+"res/guide/4.png"+config.verson_res, "type":Laya.Loader.IMAGE}
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //声音资源
    ,{"url":config.urlHead+"res/sound/bgm.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/click_card.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/feicangying.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/lose.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/out_card.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/start.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/win.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}

    ,{"url":config.urlHead+"res/sound/1/buhua.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chi.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/gang.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/peng.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/hu.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/ting.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_0.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_1.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_2.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_3.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_4.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_5.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_6.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_7.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_8.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_10.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_11.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_12.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_13.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_14.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_15.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_16.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_17.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_18.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_20.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_21.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_22.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_23.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_24.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_25.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_26.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_27.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_28.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_30.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_31.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_32.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/pai_33.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chat_29.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chat_30.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chat_31.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chat_32.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chat_33.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chat_34.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chat_35.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chat_36.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/1/chat_37.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}

    ,{"url":config.urlHead+"res/sound/2/buhua.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chi.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/gang.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/peng.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/hu.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/ting.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_0.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_1.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_2.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_3.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_4.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_5.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_6.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_7.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_8.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_10.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_11.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_12.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_13.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_14.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_15.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_16.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_17.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_18.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_20.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_21.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_22.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_23.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_24.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_25.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_26.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_27.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_28.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_30.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_31.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_32.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/pai_33.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chat_29.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chat_30.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chat_31.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chat_32.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chat_33.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chat_34.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chat_35.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chat_36.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
    ,{"url":config.urlHead+"res/sound/2/chat_37.mp3?v="+config.verson_res, "type":Laya.Loader.SOUND}
]

var gameSrcArr = [
    config.urlHead+"src/modules/login.js" + config.verson_src
    
    ,config.urlHead+"src/modules/mainScene/main.scene.js" + config.verson_src
    ,config.urlHead+"src/modules/mainScene/notice.js" + config.verson_src
    ,config.urlHead+"src/modules/mainScene/main.scene.up.js" + config.verson_src
    ,config.urlHead+"src/modules/mainScene/main.scene.down.js" + config.verson_src
    ,config.urlHead+"src/modules/mainScene/buy.room.card.pt.panel.js" + config.verson_src
    
    ,config.urlHead+"src/modules/panel/panel.join.room.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.head.info.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.create.room.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.rule.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.record.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.set.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.bag.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.bag.info.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.mall.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.share.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.chat.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.dissolve.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.pay.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.help.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.select.js" + config.verson_src
    ,config.urlHead+"src/modules/panel/panel.room.card.mall.js" + config.verson_src

    ,config.urlHead+"src/modules/a.proxy.js" + config.verson_src
    ,config.urlHead+"src/modules/replay.js" + config.verson_src
    ,config.urlHead+"src/modules/voice.js" + config.verson_src
    ,config.urlHead+"src/modules/guide.js" + config.verson_src
    
    ,config.urlHead+"src/modules/desk/desk.bg.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.card.factory.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.ready.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.player.card.up.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.player.card.down.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.player.card.left.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.player.card.right.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.out.card.up.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.out.card.down.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.out.card.left.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.out.card.right.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.act.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.arrow.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.card.group.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.ting.sign.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.head.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.effect.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.chat.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.result.big.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.result.small.js" + config.verson_src
    ,config.urlHead+"src/modules/desk/desk.playing.hupai.list.js" + config.verson_src


    ,config.urlHead+"src/app.interface.js" + config.verson_src
]



