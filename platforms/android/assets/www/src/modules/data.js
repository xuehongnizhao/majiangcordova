/* 
* @Author: 轻飘时刻
* @Date:   2017-02-13 10:55:23
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-26 17:42:55
*/
var __data = __data || {};

__data.login = {
    name:"",
    id:"",
    url:"",
    sex:"",
    roomID:0
}

__data.ivo = {
    lv:99,
    exp:999,
    maxExp:9999,

    name:"",
    sex:0,
    id:0,
    url:"",
    roomCard:99,
    volumeMusic:0,
    volumeSound:0,
    agreement:"",
    
    hornContent:"下午13:30，杜莫要去嗨，大家快阻止他",
    ruleQiaoma:"",
    ruleBaida:"",
    mj1count:0,
    mj1roomCard:0,
    mj2count:0,
    mj2roomCard:0,

    goods1Num:0,
    goods1Price:0,
    goods2Num:0,
    goods2Price:0,
    goods3Num:0,
    goods3Price:0,

    guide:0,
    ip:"192.168.1.1",

    carryPropID:-1
}

__data.desk = {
    roomID:0,
    roomOwnerID:0,
    bigPlay:"",
    totalMatch:0,
    curMatch:0,
    dihua:0,
    hupai:0,
    lazi:0,
    play:0,
    upPlayervo:null,
    downPlayervo:null,
    leftPlayervo:null,
    rightPlayervo:null,
    posToPlayervo:[],
    idToPlayervo:[],
    posToDir:[],
    idToDir:[],
    firstZhuangID:0,
    curZhuangID:0,
    baida_baida_card:-1,
    baida_yingdao_card:-1,
    start:0,//0没开始 1开始

    clear:function(){
        this.roomID = 0
        this.roomOwnerID = 0
        this.bigPlay = ""
        this.totalMatch = 0
        this.curMatch = 0
        this.dihua = 0
        this.hupai = 0
        this.lazi = 0
        this.play = 0
        this.upPlayervo = null
        this.downPlayervo = null
        this.leftPlayervo = null
        this.rightPlayervo = null
        this.posToPlayervo = []
        this.idToPlayervo = []
        this.posToDir = []
        this.idToDir = []
        this.firstZhuangID = 0
        this.curZhuangID = 0
        this.baida_baida_card = -1
        this.baida_yingdao_card = -1
        this.start = 0
    }
};
// __data.desk.upPlayervo = new DeskPlayerVO();
// __data.desk.downPlayervo = new DeskPlayerVO();
// __data.desk.leftPlayervo = new DeskPlayerVO();
// __data.desk.rightPlayervo = new DeskPlayerVO();

function DeskPlayerVO(){
    this.id = 0
    this.sex = 0
    this.name = ""
    this.position = 0
    this.url = ""
    this.score = 0;
    this.ip = "";
    this.carryPropID = -1
    this.roomCard = 0
    
    this.readyState = false;
    this.trustState = false;
    this.offLineState = true;
    this.zhuangState = false;
    //该玩家听牌状态 true听牌 false没有听牌
    this.tingState = false;

    this.grabCard = 11;
    this.handCard = [2,16];
    this.doorCard = ["two:1-2","three:1-2-3","dark:4-4-4-4","light:6-6-6-6"]
    this.outCard = [1,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,2,3,4,5,6,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40]
    this.hupai = "1,2,3,4"
    
    this.clear = function(){
        this.id = 0
        this.sex = 0
        this.name = ""
        this.position = 0
        this.url = ""
        this.score = 0;
        this.ip = "";
        this.roomCard = 0
        this.carryPropID = -1
        this.grabCard = -1
        this.handCard = []
        this.doorCard = ""
        this.outCard = []
        this.hupai = -1
        this.readyState = false;
        this.trustState = false;
        this.offLineState = true;
        this.zhuangState = false;
        //该玩家听牌状态 true听牌 false没有听牌
        this.tingState = false;
    }

    this.nextMatchClear = function(){
        this.grabCard = -1
        this.handCard = []
        this.doorCard = ""
        this.hupai = -1
        this.outCard = []
        // this.readyState = false;
        // this.trustState = false;
        // this.offLineState = true;
        // this.zhuangState = false;
        // //该玩家听牌状态 true听牌 false没有听牌
        this.tingState = false;
    }
}