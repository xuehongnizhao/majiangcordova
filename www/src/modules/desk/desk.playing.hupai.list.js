/* 
* @Author: 轻飘时刻
* @Date:   2017-05-11 22:02:43
* @Last Modified by:   轻飘时刻
* @Last Modified time: 2017-05-16 16:29:00
*/
function DeskPlayingHupaiList(){
    DeskPlayingHupaiList.super(this)
    var that = this

    this.cacheAs = config.cacheModel;

    var bg = new Laya.Image("desk/card_group_select_bg.png")
    this.addChild(bg)
    bg.sizeGrid = "10,10,10,10"

    var cardid = game.cache.registe(DeskPlayingHupaiListCard)

    var zi = game.utils.getSprite(null, "desk/huTips.png")
    this.addChild(zi)

    var last_flowers = null
    //flowers = "1,5,6,2"
    this.addCard = function(flowers){
        // flowers = "1,2,3,4,5,6,2,3,2,5,6,3,2,1,2,5,3,6,5,4,1,2,3,2,5,6,3,2,1,2,5,3,6,5,4,1,2,3,2,5,6,3,2,1,2,5,3,6,5,4,1,2,3,2,5,6,3,2,1,2,5,3,6,5,4,1,2,3,2,5,6,3,2,1,2,5,3,6,5,4,1,2,3,2,5,6,3,2,1,2,5,3,6,5,4,1,2,3,2,5,6,3,2,1,2,5,3,6,5,4,1,2,3,2,5";
        if(last_flowers == flowers)return;
        last_flowers = flowers
        game.cache.recoverAll(cardid)

        var a = flowers.split(",")

        a.sort(function(a, b){
            return parseInt(a) - parseInt(b)
        })

        if(a.length >= 31){
            game.utils.getSprite(zi, "desk/paobaida.png")
            bg.width = 0
            bg.height = 0
        }else{
            var m = Math.floor(a.length / 16)
            var n = a.length % 16;

            for(var i = 0; i < a.length; i++){
                var c = game.cache.get(cardid)
                c.flower = a[i]
                this.addChild(c)
                c.x = i% 16*c.width*c.scaleX+10
                c.y = 20+Math.floor(i / 16)*c.height*c.scaleY
            }

            var j = m >= 1 ? 16 : n
            bg.width = j*c.width*c.scaleX + 20
            bg.height = (m+1)*c.height*c.scaleY+40
            this.addChild(zi)
        }

        this.y = 550-bg.height*this.scaleY

        zi.x = -zi.width/2
        zi.y = bg.height-zi.height/2
    }

    this.scale(0.7, 0.7)
}
Laya.class(DeskPlayingHupaiList, "DeskPlayingHupaiList", Laya.Sprite)

function DeskPlayingHupaiListCard(){
    DeskPlayingHupaiListCard.super(this)
    var that = this
    game.utils.getSprite(this, "card/mj_card_bottom_1.png")
    var flower = game.utils.getSprite(null, "card/0.png")
    flower.scale(0.7, 0.7)
    flower.x = (this.width - flower.width*flower.scaleX) / 2
    flower.y = 10
    this.addChild(flower)
    var _flower = null
    function set_flower(value){
        _flower = value
        game.utils.getSprite(flower, "card/"+value+".png")
    }
    function get_flower(){
        return _flower
    }
    game.utils.setget(this, "flower", set_flower, get_flower)
    // this.scale(0.5, 0.5)
}Laya.class(DeskPlayingHupaiListCard, "DeskPlayingHupaiListCard", Laya.Sprite)