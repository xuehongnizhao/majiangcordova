var ___frame = ___frame || {};
___frame.byte = (function(){
    function GameByte(){}
    /**
     * 读取int 返回 int值
     */
    GameByte.readInt = function(value) {
        var i = BytesToInt(value)
        value.splice(0, 4)
        return i
    }
    GameByte.readByte = function(value) {
        var i = BytesToByte(value)
        value.splice(0, 1)
        return i
    }
    GameByte.readLong = function(value) {
        var i = BytesToLong(value)
        value.splice(0, 8)
        return i
    }
    GameByte.readString = function(value) {
        var i = BytesToString(value)
        return i
    }
    /**
     *字符转为byte数组，并在数组前部加入长度 
    * @param {Object} str
    */
    GameByte.stringToBytes = function(str) {
        var ch, st, re = [];  
        for (var i = 0; i < str.length; i++ ) {  
            ch = str.charCodeAt(i);  // get char   
            if (ch <=0x7F){
                re.push (ch);
            }else if (ch <=0x7FF){
                re.push (0xC0 | (ch >> 6));
                re.push (0x80 | (ch & 63));
            }else if (ch <=0xFFFF){
                re.push(0xE0 | (ch >> 12));
                re.push(0x80 | ((ch >> 6)& 63));
                re.push(0x80 | (ch & 63));
            }else {
                re.push(0xF0 | (ch >> 18));
                re.push(0x80 | ((ch >> 12)& 63));
                re.push(0x80 | ((ch >> 6)& 63));
                re.push(0x80 | (ch & 63));
            }
        }
        //添加长度
        var rre=[];
        var lre=GameByte.intToBytes(re.length);
        for (var i = 0; i < lre.length; i++ ) {  
            rre.push(lre[i]);
        }
        for (var i = 0; i < re.length; i++ ) {  
            rre.push(re[i]);
        }
        return rre;  
    }
    /**
     *int转为byte数组 
    * @param {Object} value
    */
    GameByte.intToBytes = function(value)
    {
        var re = []; 
        re.push((value>>24) & 0xFF);
        re.push((value>>16) & 0xFF);
        re.push((value>>8) & 0xFF);
        re.push(value& 0xFF);
        return re;
    }
    /**
     *int转为byte数组 
    * @param {Object} value
    */
    GameByte.byteToBytes = function(value)
    {
        var re = [];
        re.push(value& 0xFF);
        return re;
    }
    /**
     *long转为byte数组 
    * @param {Object} value
    */
    GameByte.longToBytes = function(value)
    {
        var re = [];
        var pvalue=Math.floor(value/Math.pow(256,7));
        value-=pvalue*Math.pow(256,7);
        re.push(pvalue);
        pvalue=Math.floor(value/Math.pow(256,6));
        value-=pvalue*Math.pow(256,6);
        re.push(pvalue);
        pvalue=Math.floor(value/Math.pow(256,5));
        value-=pvalue*Math.pow(256,5);
        re.push(pvalue);
        pvalue=Math.floor(value/Math.pow(256,4));
        value-=pvalue*Math.pow(256,4);
        re.push(pvalue);
        pvalue=Math.floor(value/Math.pow(256,3));
        value-=pvalue*Math.pow(256,3);
        re.push(pvalue);
        pvalue=Math.floor(value/Math.pow(256,2));
        value-=pvalue*Math.pow(256,2);
        re.push(pvalue);
        pvalue=Math.floor(value/Math.pow(256,1));
        value-=pvalue*Math.pow(256,1);
        re.push(pvalue);
        pvalue=Math.floor(value/Math.pow(256,0));
        value-=pvalue*Math.pow(256,0);
        re.push(pvalue);
        return re;
    }

    /**
     *byte数组转为 Long
    * @param {Object} value
    */
    function BytesToLong(value)
    {
        var re=new Number(); 
        var length=value.length;
        // if(length!=12)
        // {
            length=8;
        // }
        for (var ix = length-1; ix >=0 ; ix--) {
            if(ix==length-1)
            {
                re+=value[ix] & 0xff;
            }
            if(value[ix]!=0&&ix<length-1)
            {
                re+=(value[ix] & 0xff)*Math.pow(256,length-1-ix);
            }
        }
        return re; 
    }
    /**
     *byte数组转为 byte
    * @param {Object} value
    */
    function BytesToByte(value)
    {
        var i=0;  
        i+=(value[0]&0xff);
        return i; 
    }
    /**
     *byte数组转为 int
    * @param {Object} value
    */
    function BytesToInt(value)
    {
        var i=0;  
        i+=((value[0]&0xff)<<24);  
        i+=((value[1]&0xff)<<16);  
        i+=((value[2]&0xff)<<8);  
        i+=((value[3]&0xff));
        return i; 
    }
    /**
     *byte数组转为 String
    * @param {Object} value
    */
    function BytesToString(value)
    {
        var length=0;  
        length+=((value[0]&0xff)<<24);  
        length+=((value[1]&0xff)<<16);  
        length+=((value[2]&0xff)<<8);  
        length+=((value[3]&0xff));
        var strs=new ArrayBuffer(length);
        var view = new DataView(strs);
        var str="";
        if(length > 300000){
            console.warn("解析错误 BytesToString 转换 字符串长度过长", length)
            length = 300000
            // alert("解析错误 BytesToString 转换 字符串长度过长")
        }
        for(var i=4;i<length+4;i++)
        {
            view.setUint8(i-4,value[i]);
        }
        
        value.splice(0, length+4)
        
        var c=0,c2=0,c3=0;
        var position=0;
        while (position < length){
            c=view.getUint8(position++);
            if (c < 0x80){
                if (c==0)break;
                str+=String.fromCharCode (c);
            }else if (c < 0xE0){
                str+=String.fromCharCode (((c & 0x3F)<< 6)| (view.getUint8 (position++)& 0x7F));
            }else if (c < 0xF0){
                c2=view.getUint8 (position++);
                str+=String.fromCharCode (((c & 0x1F)<< 12)| ((c2 & 0x7F)<< 6)| (view.getUint8 (position++)& 0x7F));
            }else {
                c2=view.getUint8 (position++);
                c3=view.getUint8 (position++);
                str+=String.fromCharCode (((c & 0x0F)<< 18)| ((c2 & 0x7F)<< 12)| ((c3 << 6)& 0x7F)| (view.getUint8 (position++)& 0x7F));
            }
        }
        return str;
    }
    return GameByte
})()
// ___frame.Socket = function LSocket(ip, port){
//     var socket = new WebSocket("ws://"+ip+":"+port);
// }
___frame.server = (function(){
    function GameServer(){}
    GameServer.ws = null;
    GameServer.aDataArray = [];
    GameServer.sendList = [];
    GameServer.readList = [];
    GameServer.noPrintIDArr = [998,999];
    // GameServer.noPrintIDArr = [999];
    // GameServer.noPrintIDArr = [];
    GameServer.timeout = null;
    GameServer.isConnect = false
    GameServer.lastServerID = -1
    GameServer.lastServerKey = ""
    GameServer.reConnectCount = 3
    //1 socket正常链接 2 socket断线链接 链接socket需要先设置
    GameServer.connectState = 1
    GameServer.connect = function(ip_, port_) {
        GameServer.close()

        trace("开始连接服务器...")
        trace("连接ip：" + ip_)
        trace("连接port：" + port_)
        
        GameServer.ws=new WebSocket("ws://"+ip_+":"+port_);
        GameServer.ws.binaryType = "arraybuffer";
        GameServer.ws.onopen = onopen
        GameServer.ws.onmessage = onmessage
        GameServer.ws.onerror = onerror
        GameServer.ws.onclose = onclose

        clearTimeout(GameServer.timeout)
        GameServer.timeout = setTimeout(onTimeOut, 6666)
    }
    GameServer.close = function(){
        console.warn("服务器关闭")
        GameServer.aDataArray = [];
        GameServer.isConnect = false
        if(GameServer.ws){
            serverID = length = 0
            GameServer.ws.onopen = null;
            GameServer.ws.onmessage = null;
            GameServer.ws.onerror = null;
            GameServer.ws.onclose = null;
            GameServer.ws.close()
            GameServer.ws = null;
        }
    }
    function onTimeOut(){//链接失败
        trace("socket connect time out")
        GameServer.close()
        GameServer.isConnect = false
        ___frame.cb.dispatchEvent("socketTimeOut")
    }
    function onerror(e){
        // GameServer.close()
        GameServer.isConnect = false
        ___frame.cb.dispatchEvent("socketError")
    };
    function onopen(e){
        GameServer.reConnectCount = 3
        GameServer.isConnect = true
        clearTimeout(GameServer.timeout)
        __heartbeat.start()
        ___frame.cb.dispatchEvent("socketConnect")
    };
    function onclose(e){
        trace("心跳停止")
        GameServer.isConnect = false
        // GameServer.close()
        __heartbeat.stop()
        GameServer.reConnectCount--
        if(GameServer.reConnectCount >= 0){
            ___frame.cb.dispatchEvent("socketClose")
        }else{
            ___frame.cb.dispatchEvent("socketFail")
        }
    };
    function onmessage(message){
        __heartbeat.reset();
        var barray=new Int8Array(message.data);
        for(var i=0;i<barray.length;i++)
        {
            GameServer.aDataArray.push(barray[i]);
        }
        GameServer.read()
    };
    
    var serverID = 0;
    var length = 0;
    GameServer.read = function(){
        if(serverID == 0 && GameServer.aDataArray.length >= 8)
        {
            serverID = ___frame.byte.readInt(GameServer.aDataArray)
            length = ___frame.byte.readInt(GameServer.aDataArray);
        }
        if(serverID != 0){
            GameServer.noPrintIDArr.indexOf(serverID) == -1 && trace("%c接受<<<-ID-"+serverID+"-length-"+ length, "color:#0000ff;font-weight:bold")
            if(length<=GameServer.aDataArray.length)
            {
                var info = GameServer.aDataArray.splice(0, length)
                // trace("info",info)
                GameServer.manageMessage(serverID,info);
                try{
                    if(info.length){
                        GameServer.lastServerID  = ___frame.byte.readInt(info)
                        GameServer.lastServerKey = ___frame.byte.readString(info)
                        if(!GameServer.lastServerKey){
                            console.warn("解析错误 服务ID "+serverID + ",无法获取断线key")
                            // alert("解析错误 服务ID "+serverID + ",无法获取断线key")
                        }
                        // trace("___重连消息___")
                        // trace("___ID", GameServer.lastServerID)
                        // trace("___Key", GameServer.lastServerKey)
                    }
                }catch(e){

                }

                serverID = length = 0;
                GameServer.read();
            }
        }
    }
    
    GameServer.send = function(params____________) {
        if(!arguments.length)throw new Error("参数最少传入一个消息ID")
        var id = arguments[0]
        if(!GameServer.sendList[id]){
            // throw new Error("send msg "+id+" 不存在")
            console.warn("send msg "+id+" 不存在")
            return
        }
        if(!GameServer.ws || GameServer.ws.readyState != 1)alert("网络连接断开 "+GameServer.ws.readyState)
        var params = [];
        //index 从1 开始 默认删除id 
        for (var i = 1; i < arguments.length; i++) {
            params.push(arguments[i])
        }
        GameServer.sendList[id].apply(GameServer.sendList[id].msg, params)
        GameServer.sendList[id].msg.send(arguments[0])
    }
    
    GameServer.postToServer = function(value){
        var sendByte = new Int8Array(value.length); 
        for ( var i = 0; i <value.length; i++)
        {
            sendByte[i] = value[i]; 
        }

        if(!GameServer.ws){
            console.warn("服务器未连接。。。")
        }
        else if(GameServer.ws.readyState != 1){
            
        }else {
            GameServer.ws && GameServer.ws.send(sendByte.buffer);
        }
    }
    
    GameServer.manageMessage = function(serverID,info)
    {
        if(GameServer.readList[serverID]){
            GameServer.readList[serverID].msg.body = info
            try{
                GameServer.readList[serverID].apply(GameServer.readList[serverID].msg)
            }catch(e){
                console.error(e)
            }
        }
        else {GameServer.noPrintIDArr.indexOf(serverID) == -1  && trace("msg read "+serverID+" 不存在")}
    }

    return GameServer
})()

___frame.MsgSend = function MsgSend(params) {
    var that = this
    this.body = [];
    this.content = "";
    this.send = function(id_) {
        var msg = [];
        msg = msg.concat(___frame.byte.intToBytes(id_))
        msg = msg.concat(___frame.byte.intToBytes(that.body.length))
        msg = msg.concat(that.body)
        ___frame.server.postToServer(msg)
        ___frame.server.noPrintIDArr.indexOf(id_) == -1  && trace("%c发送>>>-ID-"+ id_ + "-length-"+this.body.length, "color:#8a2be2;font-weight:bold")
        ___frame.server.noPrintIDArr.indexOf(id_) == -1  && trace("发送内容：" + this.content)
        clear()
    }
    
    function clear(params) {
        that.body.splice(0,that.body.length)
        that.content = ""
    }
    
    this.writeInt = function(value) {
        that.content += value + " "
        that.body = that.body.concat(___frame.byte.intToBytes(value))
    }
    
    this.writeLong = function(value) {
        that.content += value + " "
        that.body = that.body.concat(___frame.byte.longToBytes(value))
    }

    this.writeByte = function(value) {
        that.content += value + " "
        that.body = that.body.concat(___frame.byte.byteToBytes(value))
    }
    
    this.writeString = function(value) {
        value = value.toString()
        that.content += value + " "
        that.body = that.body.concat(___frame.byte.stringToBytes(value))
    }

    for(var name in this){
        if(name.indexOf("send_") != -1){
            var func = this[name];
            var id = name.replace("send_", "")
            if(___frame.server.sendList[id])throw new Error("send msg " + id + " 已存在");
            ___frame.server.sendList[id] = func;
            ___frame.server.sendList[id].msg = this;
        }
    }
}

___frame.MsgRead = function MsgRead(params) {
    var that = this
    
    this.body;

    this.readInt = function(){
        return ___frame.byte.readInt(this.body)
    }

    this.readString = function(){
        return ___frame.byte.readString(this.body)
    }

    this.readLong = function(){
        return ___frame.byte.readLong(this.body)
    }

    this.readByte = function(){
        return ___frame.byte.readByte(this.body)
    }

    for(var name in this){
        if(name.indexOf("read_") != -1){
            var func = this[name]
            var id = name.replace("read_", "")
            if(___frame.server.readList[id])throw new Error("read msg " + id + " 已存在")
            ___frame.server.readList[id] = func
            ___frame.server.readList[id].msg = this
        }
    }
}

var __heartbeat = {
    timeout: 5000,
    timeoutObj: null,
    delay50:null,
    delay500:null,
    delay1000:null,
    delay2000:null,
    tipsDelay: 10000,
    tipsObj: null,
    wifi_time:0,
    reset: function(){
        clearTimeout(this.timeoutObj);
　　　　this.start();
    },
    start: function(){
        clearTimeout(this.timeoutObj);
        this.timeoutObj = setTimeout(this.send, this.timeout);
    },
    stop: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.tipsObj);
    },
    send: function(){
        ___frame.server.send(998);
        
        clearTimeout(__heartbeat.tipsObj);
        __heartbeat.tipsObj = setTimeout(__heartbeat.tips, __heartbeat.tipsDelay);

        wifi_time = Date.now()
        __heartbeat.delay50 = setTimeout(__heartbeat.d50f, 50);
        __heartbeat.delay500 = setTimeout(__heartbeat.d500f, 500);
        __heartbeat.delay1000 = setTimeout(__heartbeat.d1000f, 1000);
        __heartbeat.delay2000 = setTimeout(__heartbeat.d2000f, 2000);
    },
    d50f:function(){game.cb.dispatchEvent("update_wifi_strength", [4])},
    d500f:function(){game.cb.dispatchEvent("update_wifi_strength", [3])},
    d1000f:function(){game.cb.dispatchEvent("update_wifi_strength", [2])},
    d2000f:function(){game.cb.dispatchEvent("update_wifi_strength", [1])},
    tips: function(){
        // game.scene.add(TipsReLogin)
        // try{
        //     game.scene.add(Tips2, ["网络不稳定，正在努力加载中..."])
        // }catch(e){
            
        // }
    },
    read: function(){
        clearTimeout(this.tipsObj);

        if(Date.now() - wifi_time < 50){
            game.cb.dispatchEvent("update_wifi_strength", [4])
        }else if(Date.now() - wifi_time < 500){
            game.cb.dispatchEvent("update_wifi_strength", [3])
        }else if(Date.now() - wifi_time < 1000){
            game.cb.dispatchEvent("update_wifi_strength", [2])
        }else {
            game.cb.dispatchEvent("update_wifi_strength", [1])
        }

        clearTimeout(this.delay50);
        clearTimeout(this.delay500);
        clearTimeout(this.delay1000);
        clearTimeout(this.delay2000);
    }
}