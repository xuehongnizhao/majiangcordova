/* 
* @Author: 轻飘时刻
* @Date:   2017-02-13 10:42:49
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-06-06 18:42:39
*/
function GameSend(){
    var that = this
    
    this.send_100 = function(){
        
    }

    this.send_1004 = function(str){
        this.writeString(str)
    }

    this.send_996 = function(){
        this.writeString("")
    }

    this.send_997 = function(){
        this.writeInt(game.server.lastServerID)
        this.writeString(game.server.lastServerKey)
    }

    this.send_998 = function(){
        this.writeLong(Date.now())
    }

    //登录
    this.send_1001 = function(id, nickName, url, sex, type){
        id = id == undefined ? getHttpParams("userid") : id
        nickName = nickName == undefined ? "杜莫"+id : nickName
        url = url == undefined ? "http://wx.qlogo.cn/mmopen/r3l8FaELB8cCBJLE67B1ibFichDEqxaJQzAGsfiaicLcYLcWicYs9LPXQibzFmx78icOz8hqEYOXAIxKfkeZ3icrJ0uicpNYRibcPbOvK7/0" : url
        sex = sex == undefined ? 1 : sex
        type = type == undefined ? 0 : type
        
        //测试专用账户
        // id = "oZYjZ1FWa3J847ftFvJpLPh8Xm2k"
        // nickName = "轻飘时刻"
        // headUrl = "http://wx.qlogo.cn/mmopen/CQvicbSmeMlVLnWrLRLyZKUuqAVtA0CgqLul4vvmEQEQnoNaHWnwZdtib60u2x9Lmr4k4sL9KuCbuL4BZ3eXiciaqM5eTYfSkib7n/0"
        // sex = 1
        
        __data.login.id = id
        __data.login.name = nickName
        __data.login.url = url
        __data.login.sex = sex

        this.writeString(id)
        this.writeString(nickName)
        this.writeString(url)
        this.writeInt(sex)
        this.writeInt(type)

        __data.ivo.name = nickName
        __data.ivo.sex  = sex == 0 ? 1 : sex
    }

    this.send_2001 = function(){
        
    }

    this.send_2002 = function(a, b){
        this.writeInt(a)
        this.writeInt(b)
    }

    this.send_2003 = function(){
        
    }

    //查询吉祥物列表 mall
    this.send_2004 = function(){

    }

    //查询吉祥物列表 bag
    this.send_2005 = function(){

    }

    //mall bug prop
    this.send_2006 = function(id){
        this.writeInt(id)
    }

    //佩戴吉祥物
    this.send_2007 = function(id){
        this.writeInt(id)
    }

    //卸下吉祥物
    this.send_2008 = function(){

    }

    //查看经验等级
    this.send_2009 = function(){

    }

    //查看可领取房卡
    this.send_2010 = function(){

    }

    this.send_2011 = function(){

    }

    this.send_3001 = function(value){
        value = value == undefined ? 0 : value
        this.writeInt(value)
    }

    this.send_3003 = function(password){
        this.writeInt(password)
    }

    this.send_3004 = function(){

    }

    //创建房间
    this.send_3005 = function(ob){
        // 入参：1 int 大玩法 1 敲麻 2 百搭
        //   2 int 总局数
        //   3 int 底花 20
        //   4 int 起胡 0 任意胡 1 1花 2 2花 3 3花
        //   5 int 辣子 20 30 50
        //   6 Sting 玩法 1 七对 2碰不吃 3垃圾胡 4飞苍蝇 用,分隔
        this.writeInt(ob.bigPlay)
        this.writeInt(ob.totalMatch)
        this.writeInt(ob.dihua)
        this.writeInt(ob.hupai)
        this.writeInt(ob.lazi)
        this.writeString(ob.play)
    }

    //退出房间 为准备状态 & 不是房主 
    this.send_3006 = function(){

    }

    //点击解散房间按钮
    this.send_3007 = function(){

    }

    this.send_3009 = function(result){
        this.writeInt(result)
    }

    this.send_5002 = function(id){
        this.writeString(id)
    }

    this.send_6003 = function(type, flower){
        this.writeInt(type)
        if(flower != undefined)this.writeInt(flower)
    }
    
    //准备    
    this.send_6021 = function(){

    }

    //记录1级数据
    this.send_7001 = function(){

    }

    //记录2级界面数据
    this.send_7002 = function(roomID){
        this.writeString(roomID)
    }

    this.send_7003 = function(roomid, a){
        this.writeString(roomid)
        this.writeInt(a)
    }

    game.MsgSend.call(this)
}