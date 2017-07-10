/* 
* @Author: 轻飘时刻
* @Date:   2017-02-13 17:07:34
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-15 11:26:44
*/
var __proxy = __proxy || {}
__proxy.showMainScene = function(){
    game.server.send(2001)
    game.scene.removeAll()
    game.scene.add(MainScene)
    game.scene.add(MainSceneUp)
    game.scene.add(MainSceneDown)
    __data.desk.clear()
    // game.scene.add(MajiangTest)
    // game.scene.add(MainSceneTestBG)
    // game.scene.add(MainSceneTest)
    // game.scene.add(MainScene)
    // game.scene.add(RightDownBtn)
    // game.scene.add(RightUpBtn)
    // game.scene.add(MainSceneHead)
}
    
//普通的文字提示
__proxy.tips = function(content){
    game.scene.add(XtsTips, [content]);
}
function tips___(content){
    game.scene.add(TipsWord).addTips(content)
}


// 类型万 1：1万2万3万4万5万6万7万8万9万--》11，12，13，14，15，16，17，18，19
// 类型条 2：1条2条3条4条5条6条7条8条9条--》21，22，23，24，25，26，27，28，29
// 类型饼 3：1饼2饼3饼4饼5饼6饼7饼8饼9饼--》31，32，33，34，35，36，37，38，39
// 类型字 4：中 --》41
// 
var myCardArr = [11, 11, 11, 12, 13, 13, 14];

__proxy.testLian = function(arr){
    if(arr.length < 2)throw new Error("__proxy.testLian 参数arr length不足")
    arr.sort(__proxy.sortMinToMax)
    var a = true
    var i = 1;
    while(i < arr.length){
        if(arr[i - 1] + 1 != arr[i]){
            a = false
            break;
        }
        i++
    }
    return a
}

__proxy.sortMinToMax = function(a, b){
    return a - b
}

//吃 123 456 789 3连是 吃 
__proxy.testEat = function(handCardArr, lastCard){
    if(handCardArr.length < 2)return [];
    //1 2 *
    var a = lastCard - 2
    var b = lastCard - 1
    var canEatCardArr = []
    if(handCardArr.indexOf(a) != 1 && handCardArr.indexOf(b) != 1){
        canEatCardArr.indexOf(a) != -1 && canEatCardArr.push(a)
        canEatCardArr.indexOf(b) != -1 && canEatCardArr.push(b)
    }
    //1 * 3
    var a = lastCard - 1
    var b = lastCard + 1
    if(handCardArr.indexOf(a) != 1 && handCardArr.indexOf(b) != 1){
        canEatCardArr.indexOf(a) != -1 && canEatCardArr.push(a)
        canEatCardArr.indexOf(b) != -1 && canEatCardArr.push(b)
    }
    // * 1 2
    var a = lastCard + 1
    var b = lastCard + 2
    if(handCardArr.indexOf(a) != 1 && handCardArr.indexOf(b) != 1){
        canEatCardArr.indexOf(a) != -1 && canEatCardArr.push(a)
        canEatCardArr.indexOf(b) != -1 && canEatCardArr.push(b)
    }

    return canEatCardArr
}

//碰 111 333 444 3个牌一样是 碰
__proxy.testPeng = function(handCardArr, card){
    if(handCardArr.length < 2)return [];
    var i = 1;
    var canPengCardArr = [];
    while(i < handCardArr.length){
        if(handCardArr[i - 1] == card && handCardArr[i] == card){
            canPengCardArr.push(card)
            canPengCardArr.push(card)
            break;
        }
        i++
    }
    return canPengCardArr
}

//明杠 1111 3333 4444 4个牌一样是 明杠 自己手里3张一样 + 别人的一张
__proxy.testMingGang = function(handCardArr, card){
    if(handCardArr.length < 3)return [];
    var i = 2;
    var canMingGangCardArr = [];
    while(i < handCardArr.length){
        if(handCardArr[i - 2] == card && handCardArr[i - 1] == card && handCardArr[i] == card){
            canMingGangCardArr.push(card)
            canMingGangCardArr.push(card)
            canMingGangCardArr.push(card)
            break;
        }
        i++
    }
    return canMingGangCardArr
}

//暗杠 1111 3333 4444 4个牌一样是 暗杠
__proxy.testAnGang = function(handCardArr, grabCard){
    var allCardArr;
    if(grabCard)allCardArr = handCardArr.concat(grabCard)
    else allCardArr = handCardArr.concat()
    if(allCardArr.length < 4)return [];
    allCardArr.sort(__proxy.sortMinToMax)
    var i = 3;
    var canAnGangCardArr = [];
    while(i < allCardArr.length){
        if(allCardArr[i-3]==allCardArr[i-2] && allCardArr[i-2]==allCardArr[i-1] && allCardArr[i-1]==allCardArr[i]){
            canAnGangCardArr.push(allCardArr[i]);
            canAnGangCardArr.push(allCardArr[i]);
            canAnGangCardArr.push(allCardArr[i]);
            canAnGangCardArr.push(allCardArr[i]);
            break;
        }
        i++
    }
    return canAnGangCardArr
}

// 类型万 1：1万2万3万4万5万6万7万8万9万--》11，12，13，14，15，16，17，18，19
// 类型条 2：1条2条3条4条5条6条7条8条9条--》21，22，23，24，25，26，27，28，29
// 类型饼 3：1饼2饼3饼4饼5饼6饼7饼8饼9饼--》31，32，33，34，35，36，37，38，39
// 类型字 4：中 --》41
__proxy.liangXiCardTypeArr = []
__proxy.liangXiCardTypeArr[0]  = [41, 19, 29]
__proxy.liangXiCardTypeArr[1]  = [41, 19, 39]
__proxy.liangXiCardTypeArr[2]  = [41, 29, 39]

__proxy.liangXiCardTypeArr[3]  = [21, 19, 29]
__proxy.liangXiCardTypeArr[4]  = [21, 19, 39]
__proxy.liangXiCardTypeArr[5]  = [21, 29, 39]

__proxy.liangXiCardTypeArr[6]  = [19, 29, 39]
__proxy.liangXiCardTypeArr[7]  = [41, 21, 19]
__proxy.liangXiCardTypeArr[8]  = [41, 21, 39]

__proxy.liangXiCardTypeArr[9]  = [41, 21, 29]
__proxy.liangXiCardTypeArr[10] = [41, 11, 21]
__proxy.liangXiCardTypeArr[11] = [41, 11, 31]

__proxy.liangXiCardTypeArr[12] = [41, 21, 31]
__proxy.liangXiCardTypeArr[13] = [11, 21, 31]

__proxy.testLiangXi = function(handCardArr, grabCard){
    var allCardArr;
    if(grabCard)allCardArr = handCardArr.concat(grabCard)
    else allCardArr = handCardArr.concat()
    if(allCardArr.length < 3)return [];
    var canLiangXiCardArr = [];

    for(var i = 0; i < __proxy.liangXiCardTypeArr.length; i++){
        var cta = __proxy.liangXiCardTypeArr[i];

        if(allCardArr.indexOf(cta[0])!=-1 && allCardArr.indexOf(cta[1])!=-1 && allCardArr.indexOf(cta[2])!=-1){
            canLiangXiCardArr.indexOf(cta[0]) != -1 && canLiangXiCardArr.push(cta[0])
            canLiangXiCardArr.indexOf(cta[1]) != -1 && canLiangXiCardArr.push(cta[1])
            canLiangXiCardArr.indexOf(cta[2]) != -1 && canLiangXiCardArr.push(cta[2])
        }
    }
    return canLiangXiCardArr
}

__proxy.testCanHu = function(){

}

__proxy.card = [];
__proxy.clearCard = function(){
    for(var i = 0; i < 42; i++){
        __proxy.card[i] = 0
    }
}

__proxy.card1 = [];
__proxy.clearCard1 = function(){
    for(var i = 0; i < 42; i++){
        __proxy.card1[i] = 0
    }
}

//玩法是否带洗牌
__proxy.isXi = false
__proxy.isJia = false
__proxy.is37jia = false

__proxy.testTing = function(handCard_, grabCard, doorCard){
    var time_ = Date.now()
    var allCard;
    if(grabCard)allCard = handCard_.concat(grabCard)
    else allCard = handCard_.concat()
    var card = [
                 0,0,0,0,0,0,0,0,0,0
                ,0,0,0,0,0,0,0,0,0,0//万
                ,0,0,0,0,0,0,0,0,0,0//条
                ,0,0,0,0,0,0,0,0,0,0//饼
                ,0,0                //字
                ]
    for(var i = 0; i < allCard.length; i++){
        card[allCard[i]]++
    }

    var obc;
    obc = analyDoorCard(doorCard)


    //粗略的听牌检测
    var isTestTing = false
    if(__proxy.isXi && obc.count_xi >= 2){
        isTestTing = true
    }else if(__proxy.isXi && obc.count_xi == 1){
        if(doorCard.length){
            isTestTing = true
        }
    }else if(obc.count_xi == 0){
        if(card[11]>0||card[19]>0||card[21]>0||card[29]>0||card[31]>0||card[39]>0||card[41]>0){
            for(var i = 0; i < card.length; i++){
                if(card[i] >= 2){
                    if(doorCard.length){
                        isTestTing = true
                    }
                    break;
                }
            }
        }
    }

    if(isTestTing){
        for(var i = 11; i < 42; i++){
            //先干掉一个牌 
            if(card[i]>0){
                trace("删除一个牌", i)
                var handCard = handCard_.concat()
                var index = handCard.indexOf(i)
                if(index != -1)handCard.splice(index, 1)
                card[i]--;
                __proxy.add_a_card_testHu(card, doorCard, handCard)
                card[i]++;
            }
        }
    }
    
    trace("听牌检测耗时 ", Date.now() - time_)
}

__proxy.add_a_card_testHu = function(cardArr_, doorCard_, handCard_){
    var cardArr = cardArr_.concat()
    // var handCard = handCard_.concat()
    var hasAddCard = [];
    for(var i = 0; i < cardArr.length; i++){
        if(i <= 10)continue

        if(i == 41 && !hasAddCard[41] && cardArr[i-1] < 4){
            cardArr[41]++
            hasAddCard[41] = true
            __proxy.testHu(handCard_,i,doorCard_,cardArr)
            cardArr[41]--
        }else {
            var yui = i % 10
            if(yui >= 1 && yui <= 9 && !hasAddCard[i] && cardArr[i-1] < 4){
                cardArr[i]++
                hasAddCard[i] = true
                __proxy.testHu(handCard_,i,doorCard_,cardArr)
                cardArr[i]--
            }
            if(yui >= 2 && yui <= 9 && !hasAddCard[i-1] && cardArr[i-1] < 4){
                cardArr[i-1]++
                hasAddCard[i-1] = true
                __proxy.testHu(handCard_,i-1,doorCard_,cardArr)
                cardArr[i-1]--
            }
            if(yui >= 1 && yui <= 8 && !hasAddCard[i+1] && cardArr[i-1] < 4){
                cardArr[i+1]++
                hasAddCard[i+1] = true
                __proxy.testHu(handCard_,i+1,doorCard_,cardArr)
                cardArr[i+1]--
            }
        }
    }
}

//card_ 听牌的胡牌检测才会用到 前三个参数 之负责胡牌检测
__proxy.testHu = function(handCard, grabCard, doorCard, card_){
    var allCard;
    if(grabCard)allCard = handCard.concat(grabCard)
    else allCard = handCard.concat();
    //只能胡对 和胡连 连只能胡单张
    __proxy.clearCard()
    if(card_)__proxy.card = card_.concat()
    else {
        for(var i = 0; i < allCard.length; i++){
            __proxy.card[allCard[i]]++
        }
    }
    
    var isHu = false
    var obc;
    if(doorCard)obc = analyDoorCard(doorCard)
    else obc = analyDoorCard(doorCard)

    var arrt;
    var count = {
        count_4:obc.count_4,
        count_3:obc.count_3,
        count_123:obc.count_123,
        count_2:0,
        count_2_zhong:0,
        count_xi:obc.count_xi,
    }
    var f;
    __proxy.jiang = false;
    // if(__proxy.card[grabCard] >= 2){
    //     __proxy.jiang = true;
    //     arrt = __proxy.card.concat();
    //     arrt[grabCard]-=2
    //     count.count_2+=1
    //     f = __proxy.huase(arrt, count, handCard.length, "胡对");
    //     if(f == 0){
    //         trace("胡对", grabCard)
    //     }
    // }
    
    var count = {
        count_4:obc.count_4,
        count_3:obc.count_3,
        count_123:obc.count_123,
        count_2:0,
        count_2_zhong:0,
        count_xi:obc.count_xi,
    }
    __proxy.jiang = false;
    // 检测抓牌 凑成3一样的胡 手里2个3 抓到一个3 糊了
    if(__proxy.card[grabCard] == 3){
        trace("检测 胡3同")
        arrt = __proxy.card.concat();
        arrt[grabCard]-=3
        count.count_3+=1
        f = __proxy.huase(arrt, count, handCard.length, "胡3同");
        if(f == 0){
            trace("胡3同", grabCard)
        }
    }
    var count = {
        count_4:obc.count_4,
        count_3:obc.count_3,
        count_123:obc.count_123,
        count_2:0,
        count_2_zhong:0,
        count_xi:obc.count_xi,
    }
    __proxy.jiang = false;
    //胡边 3
    // if(__proxy.card[grabCard-2]!=0&&__proxy.card[grabCard-1]!=0&&__proxy.card[grabCard]!=0){
    //     if(grabCard%10 == 3){
    //         arrt = __proxy.card.concat();
    //         arrt[grabCard-2]-=1
    //         arrt[grabCard-1]-=1
    //         arrt[grabCard]-=1
    //         count.count_123+=1
    //         f = __proxy.huase(arrt, count, handCard.length, "胡37边");
    //         if(f == 0){
    //             trace("胡37边", (grabCard-2) + "_" + (grabCard-1) + "_" + grabCard)
    //         }
    //     }
    // }
    var count = {
        count_4:obc.count_4,
        count_3:obc.count_3,
        count_123:obc.count_123,
        count_2:0,
        count_2_zhong:0,
        count_xi:obc.count_xi,
    }
    __proxy.jiang = false;
    //胡边 7
    // if(__proxy.card[grabCard]!=0&&__proxy.card[grabCard+1]!=0&&__proxy.card[grabCard+2]!=0){
    //     if(grabCard%10 == 7){
    //         arrt = __proxy.card.concat();
    //         arrt[grabCard]-=1
    //         arrt[grabCard+1]-=1
    //         arrt[grabCard+2]-=1
    //         count.count_123+=1
    //         f = __proxy.huase(arrt, count, handCard.length, "胡37边");
    //         if(f == 0){
    //             trace("胡37边", (grabCard) + "_" + (grabCard+1) + "_" + (grabCard+2))
    //         }
    //     }
    // }

    var count = {
        count_4:obc.count_4,
        count_3:obc.count_3,
        count_123:obc.count_123,
        count_2:0,
        count_2_zhong:0,
        count_xi:obc.count_xi,
    }
    __proxy.jiang = false;
    //胡 夹
    // if(__proxy.card[grabCard-1]!=0&&__proxy.card[grabCard]!=0&&__proxy.card[grabCard+1]!=0){
    //     arrt = __proxy.card.concat();
    //     arrt[grabCard-1]-=1
    //     arrt[grabCard]-=1
    //     arrt[grabCard+1]-=1
    //     count.count_123+=1
    //     f = __proxy.huase(arrt, count, handCard.length, "胡夹");
    //     if(f == 0){
    //         trace("胡夹", (grabCard-1) + "_" + (grabCard) + "_" + (grabCard+1))
    //     }
    // }
}

__proxy.testHuRule = function(count, handCardCount, type){
    if(count.count_2 == 1){
        if(count.count_3 > 0 || count.count_4 > 0 || count.count_2_zhong > 0 || count.count_xi > 0){
            if(type == "胡夹"){
                return true
            }else if(__proxy.isJia){
                if(__proxy.is37jia){
                    if(type == "胡37边"){
                        return true
                    }else {
                        return false
                    }
                }else {
                    return false
                }
            }else if(type == "胡对"){
                //手把一
                if(handCardCount == 1){
                    if(count.count_123 + count.count_3 + count.count_4 == 4){
                        return true
                    }else {
                        return false
                    }
                }else {
                    return true
                }
            }
        }
    }else if(count.count_2 == 7){
        return true
    }
    return false
}

__proxy.jiang = false
//cardArr 包括 gradCard
__proxy.huase = function(cardArr, count, handdCardCount, type){
    for(var i = 0; i < cardArr.length; i++){
        // <=10 没有牌
        if(i <= 10)continue 
        // 牌数 0
        if(cardArr[i] == 0)continue
        // 41 中牌
        if(i == 41){
            if(!__proxy.jiang && cardArr[i] >= 2){
                __proxy.jiang = true;
                cardArr[i] -= 2;
                count.count_2 += 1
                count.count_2_zhong += 1
                var f = __proxy.huase(cardArr, count)
                if(f != 0 || !__proxy.testHuRule(count, handdCardCount, type)){
                    cardArr[i] += 2;
                    count.count_2 -= 1
                    count.count_2_zhong -= 1
                    __proxy.jiang = false;
                }
            }
            if(cardArr[i] == 3){
                var temp = cardArr[i];
                cardArr[i] = 0;
                count.count_3 += 1
                var f = __proxy.huase(cardArr, count)
                if(f != 0 || !__proxy.testHuRule(count, handdCardCount, type)){
                    cardArr[i] = temp;
                    count.count_3 -= 1
                }
            }
            if(__proxy.jiang && cardArr[i] >= 2){
                cardArr[i] -= 2;
                count.count_2+=1
                count.count_2_zhong+=1
                var f = __proxy.huase(cardArr, count)
                if(f != 0 || !__proxy.testHuRule(count, handdCardCount, type)){
                    cardArr[i] += 2;
                    count.count_2-=1
                    count.count_2_zhong-=1
                }
            }
        }else {
            if(!__proxy.jiang && cardArr[i] >= 2){
                __proxy.jiang = true;
                cardArr[i] -= 2;
                count.count_2+=1
                var f = __proxy.huase(cardArr, count)
                if(f != 0 || !__proxy.testHuRule(count, handdCardCount, type)){
                    cardArr[i] += 2;
                    count.count_2-=1
                    __proxy.jiang = false;
                }
            }
            if (cardArr[i]!=0&&cardArr[i+1]!=0&&cardArr[i+2]!=0)
            {
                cardArr[i]--;
                cardArr[i+1]--;
                cardArr[i+2]--;
                count.count_123+=1
                var f = __proxy.huase(cardArr, count)
                //如果递归回来依旧没有减完，减去的加回去
                if (f != 0 || !__proxy.testHuRule(count, handdCardCount, type)){
                    cardArr[i]++;
                    cardArr[i+1]++;
                    cardArr[i+2]++;
                    count.count_123-=1
                }
            }
            if(cardArr[i] == 3){
                var temp = cardArr[i];
                cardArr[i] = 0;
                count.count_3+=1
                var f = __proxy.huase(cardArr, count)
                if(f != 0 || !__proxy.testHuRule(count, handdCardCount, type)){
                    cardArr[i] = temp;
                    count.count_3-=1;
                }
            }
            if(__proxy.jiang && cardArr[i] >= 2){
                cardArr[i] -= 2;
                count.count_2+=1
                var f = __proxy.huase(cardArr, count)
                if(f != 0 || !__proxy.testHuRule(count, handdCardCount, type)){
                    cardArr[i] += 2;
                    count.count_2-=1
                }
            }
        }
    }

    var re = 0;
    for(var j = 0; j < cardArr.length; j++){
        re += cardArr[j];
    }
    return re
}

// var jiang = false
// function huase(hua, gradCard, a = 0){
//     trace("检牌 "+ a + " " + hua)
//     if (hua.length==1)
//     {
//         //判断字，自比较特殊，没有顺
//         for (var i=0;i<hua.length ;i++ )
//         {
//             if (hua[i]==3||hua[i]==4)
//             {   
//                 var temp = hua[i]
//                 hua[i]=0;
//                 var fanhui = huase(hua, gradCard, a + 1);
//                 if(fanhui!=0){
//                     hua[i] = temp
//                 }
//             }
//             //如果字有两个，肯定是将
//             if (hua[i]==2&&!jiang)
//             {
//                 hua[i]=0;
//                 jiang=true;
//                 var fanhui=huase(hua, gradCard, a + 1);
//                 //如果递归回来依旧没有减完，减去的加回去
//                 if (fanhui!=0)
//                 {
//                     jiang = false;
//                     hua[i]=2
//                 }
//             }
//         }
//     }
//     else
//     {
//         for (var i=0;i<hua.length ;i++ )
//         {
//             //如果没有将，先把将减出去
//             if (!jiang&&hua[i]>=2)
//             {

//                 hua[i]=hua[i]-2;
//                 jiang=true;
//                 var fanhui=huase(hua, gradCard, a + 1);
//                 //如果递归回来依旧没有减完，则把将加回去
//                 if (fanhui!=0)
//                 {
//                     hua[i]=hua[i]+2;
//                     jiang=false;
//                 }
//             }
//             if(jiang&&hua[i]>=2){
//                 hua[i] = hua[i]-2
//                 var fanhui = huase(hua, gradCard, a + 1);
//                 if (fanhui!=0)
//                 {
//                     hua[i]=hua[i]+2;
//                 }
//             }
//             if (hua[i]!=0&&i<7&&hua[i+1]!=0&&hua[i+2]!=0)
//             {
//                 hua[i]--;
//                 hua[i+1]--;
//                 hua[i+2]--;
//                 // huase(hua);
//                 var fanhui=huase(hua, gradCard, a + 1);
//                 //如果递归回来依旧没有减完，减去的加回去
//                 if (fanhui!=0)
//                 {
//                     hua[i]++;
//                     hua[i+1]++;
//                     hua[i+2]++;
//                 }
//             }
//             if (hua[i]==3||hua[i]==4)
//             {
//                 var temp=hua[i];
//                 hua[i]=0;
//                 // huase(hua, gradCard, a + 1);
//                 var fanhui=huase(hua, gradCard, a + 1);
//                 //如果递归回来依旧没有减完，减去的加回去
//                 if (fanhui!=0)
//                 {
//                     // hua[i]++;
//                     hua[i]=temp;
//                 }
//             }
//         }
//     }
//     var re=0;
//     //最后判断减没减完
//     for (var i=0;i<hua.length ;i++ )
//     {
//         re=re+hua[i];
//     }
//     return re
// }
// 111 222 333 44 55
// __proxy.testHu([11,11,11,12,12,12,13,13,13,14,14,15,15],14)
// __proxy.testHu([11,11,12,12,12,12,13,13,14,14,14,16,16],13)
// __proxy.testHu([11,12,12,13,13,14,14,15,16,17,18,19,19],31)





