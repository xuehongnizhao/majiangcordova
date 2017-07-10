var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var BuyRoomCardPTPanelUI=(function(_super){
		function BuyRoomCardPTPanelUI(){
			
		    this.btn_close=null;
		    this.txt=null;

			BuyRoomCardPTPanelUI.__super.call(this);
		}

		CLASS$(BuyRoomCardPTPanelUI,'ui.BuyRoomCardPTPanelUI',_super);
		var __proto__=BuyRoomCardPTPanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(BuyRoomCardPTPanelUI.uiView);
		}

		STATICATTR$(BuyRoomCardPTPanelUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":606,"height":360},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp1/bg.png"}},{"type":"Image","props":{"y":8,"x":494,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Label","props":{"y":101.5,"x":39.5,"width":527,"var":"txt","valign":"middle","text":"购买房卡请加客服微信：123456789","height":185,"fontSize":30,"color":"#53440a","align":"center"}},{"type":"Image","props":{"y":17,"x":268.5,"skin":"comp1/ps.png"}}]};}
		]);
		return BuyRoomCardPTPanelUI;
	})(View);
var DeskUI=(function(_super){
		function DeskUI(){
			
		    this.btn_chat=null;
		    this.btn_set=null;
		    this.btn_voice=null;

			DeskUI.__super.call(this);
		}

		CLASS$(DeskUI,'ui.desk.DeskUI',_super);
		var __proto__=DeskUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskUI.uiView);
		}

		STATICATTR$(DeskUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":70,"x":1143,"var":"btn_chat","skin":"desk/desk_chat.png"}},{"type":"Image","props":{"y":0,"x":1143,"var":"btn_set","skin":"desk/desk_set.png"}},{"type":"Image","props":{"y":140,"x":1143,"var":"btn_voice","skin":"voice/talkcd19.png"}}]};}
		]);
		return DeskUI;
	})(View);
var DeskChatWordUI=(function(_super){
		function DeskChatWordUI(){
			
		    this.bg=null;
		    this.txt_content=null;

			DeskChatWordUI.__super.call(this);
		}

		CLASS$(DeskChatWordUI,'ui.desk.DeskChatWordUI',_super);
		var __proto__=DeskChatWordUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskChatWordUI.uiView);
		}

		STATICATTR$(DeskChatWordUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":300,"height":88},"child":[{"type":"Image","props":{"y":0,"x":0,"width":285,"var":"bg","skin":"desk/chat_word_bg.png","sizeGrid":"40,50,40,50","pivotX":35,"height":88}},{"type":"Label","props":{"y":25,"x":-9,"width":239,"var":"txt_content","text":"杜莫不是人","height":35,"fontSize":30,"color":"#ffffff","align":"left"}}]};}
		]);
		return DeskChatWordUI;
	})(View);
var DeskHeadInfoUI=(function(_super){
		function DeskHeadInfoUI(){
			
		    this.head=null;
		    this.headFrame=null;
		    this.txt_name=null;
		    this.txt_id=null;
		    this.txt_score=null;
		    this.txt_ip=null;

			DeskHeadInfoUI.__super.call(this);
		}

		CLASS$(DeskHeadInfoUI,'ui.desk.DeskHeadInfoUI',_super);
		var __proto__=DeskHeadInfoUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskHeadInfoUI.uiView);
		}

		STATICATTR$(DeskHeadInfoUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":440,"height":240},"child":[{"type":"Image","props":{"y":0,"x":0,"width":440,"skin":"desk/head_bg.png","sizeGrid":"100,100,100,100","height":240}},{"type":"Image","props":{"y":26,"x":32,"width":100,"var":"head","skin":"mainScene/mrtx.png","height":100}},{"type":"Image","props":{"y":11,"x":21,"var":"headFrame","skin":"mainScene/head_frame.png"}},{"type":"Label","props":{"y":26,"x":146,"width":83,"text":"昵称：","height":33,"fontSize":25,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":73,"x":146,"width":70,"text":"ID：","height":29,"fontSize":25,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":170,"x":146,"width":62,"text":"IP：","height":29,"fontSize":25,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":122,"x":146,"width":81,"text":"积分：","height":32,"fontSize":25,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":26,"x":214,"width":115,"var":"txt_name","text":"皮皮虾，我们走","height":33,"fontSize":25,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":73,"x":214,"width":115,"var":"txt_id","text":"0123456","height":33,"fontSize":25,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":122,"x":214,"width":115,"var":"txt_score","text":"123456789","height":33,"fontSize":25,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":170,"x":214,"width":193,"var":"txt_ip","text":"192.167.102.123","height":31,"fontSize":25,"color":"#ffffff","align":"left"}}]};}
		]);
		return DeskHeadInfoUI;
	})(View);
var DeskPlayingUI=(function(_super){
		function DeskPlayingUI(){
			
		    this.icon_x=null;
		    this.head_right=null;
		    this.direction=null;
		    this.arrow=null;
		    this.baida=null;
		    this.direction_light=null;
		    this.head_left=null;
		    this.head_down=null;
		    this.head_up=null;
		    this.txt_time=null;
		    this.txt_match=null;

			DeskPlayingUI.__super.call(this);
		}

		CLASS$(DeskPlayingUI,'ui.desk.DeskPlayingUI',_super);
		var __proto__=DeskPlayingUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ui.desk.DeskPlayingHeadUI",ui.desk.DeskPlayingHeadUI);
			View.regComponent("ui.desk.DeskPlayingBaidaUI",ui.desk.DeskPlayingBaidaUI);
			View.regComponent("ui.desk.DeskPlayingHead1UI",ui.desk.DeskPlayingHead1UI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskPlayingUI.uiView);
		}

		STATICATTR$(DeskPlayingUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"y":0,"x":0,"width":1280,"height":720},"child":[{"type":"Image","props":{"y":10,"x":23,"skin":"card/mj_surplus_card.png"}},{"type":"Image","props":{"y":25,"x":51,"var":"icon_x","skin":"desk/×.png"}},{"type":"DeskPlayingHead","props":{"y":200,"x":1173,"var":"head_right","scaleY":0.8,"scaleX":0.8,"runtime":"ui.desk.DeskPlayingHeadUI"}},{"type":"Image","props":{"y":360,"x":640,"var":"direction","skin":"desk/direction.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":74,"x":177,"var":"arrow","skin":"desk/arrow.png","anchorY":1,"anchorX":0.5}},{"type":"DeskPlayingBaida","props":{"y":85,"x":14,"var":"baida","runtime":"ui.desk.DeskPlayingBaidaUI"}},{"type":"Image","props":{"y":385,"x":607,"var":"direction_light","skin":"desk/dongnanxibeiguang.png","rotation":0}},{"type":"DeskPlayingHead1","props":{"y":200,"x":38,"var":"head_left","scaleY":0.8,"scaleX":0.8,"runtime":"ui.desk.DeskPlayingHead1UI"}},{"type":"DeskPlayingHead1","props":{"y":408,"x":38,"var":"head_down","scaleY":0.8,"scaleX":0.8,"runtime":"ui.desk.DeskPlayingHead1UI"}},{"type":"DeskPlayingHead","props":{"y":0,"x":342,"var":"head_up","scaleY":0.8,"scaleX":0.8,"runtime":"ui.desk.DeskPlayingHeadUI"}},{"type":"Label","props":{"y":347,"x":621,"width":39,"var":"txt_time","text":"15","height":26,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":52,"x":24,"width":120,"var":"txt_match","text":"局数 1/8","height":25,"fontSize":25,"color":"#ffffff"}}]};}
		]);
		return DeskPlayingUI;
	})(View);
var DeskPlayingBaidaUI=(function(_super){
		function DeskPlayingBaidaUI(){
			
		    this.card_baida=null;
		    this.card_yindao=null;

			DeskPlayingBaidaUI.__super.call(this);
		}

		CLASS$(DeskPlayingBaidaUI,'ui.desk.DeskPlayingBaidaUI',_super);
		var __proto__=DeskPlayingBaidaUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskPlayingBaidaUI.uiView);
		}

		STATICATTR$(DeskPlayingBaidaUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":151,"height":96},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"desk/baida_bg.png"}},{"type":"Image","props":{"y":16,"x":4,"skin":"desk/baida_baida.png"}},{"type":"Image","props":{"y":3,"x":102,"skin":"desk/baida_yindao.png"}},{"type":"Image","props":{"y":8,"x":41,"skin":"card/mj_card_bottom_0.png","scaleY":0.7,"scaleX":0.7}},{"type":"Image","props":{"y":31,"x":102,"skin":"card/mj_card_bottom_0.png","scaleY":0.5,"scaleX":0.5}},{"type":"Image","props":{"y":30,"x":44,"var":"card_baida","skin":"card/8.png","scaleY":0.5,"scaleX":0.5}},{"type":"Image","props":{"y":13,"x":41,"skin":"desk/baida_jiao.png"}},{"type":"Image","props":{"y":48,"x":104,"var":"card_yindao","skin":"card/8.png","scaleY":0.35,"scaleX":0.35}}]};}
		]);
		return DeskPlayingBaidaUI;
	})(View);
var DeskPlayingHeadUI=(function(_super){
		function DeskPlayingHeadUI(){
			
		    this.head=null;
		    this.headFrame=null;
		    this.icon_ready=null;
		    this.txt_score=null;
		    this.txt_name=null;
		    this.icon_zhuang=null;
		    this.txt_buhua=null;
		    this.prop=null;
		    this.face=null;
		    this.offline=null;

			DeskPlayingHeadUI.__super.call(this);
		}

		CLASS$(DeskPlayingHeadUI,'ui.desk.DeskPlayingHeadUI',_super);
		var __proto__=DeskPlayingHeadUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskPlayingHeadUI.uiView);
		}

		STATICATTR$(DeskPlayingHeadUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":150,"height":220},"child":[{"type":"Image","props":{"y":12,"x":11,"width":100,"var":"head","skin":"mainScene/mrtx.png","height":100}},{"type":"Image","props":{"y":0,"x":0,"var":"headFrame","skin":"mainScene/head_frame.png"}},{"type":"Image","props":{"y":46,"x":-52,"var":"icon_ready","skin":"desk/icon_ready.png"}},{"type":"Image","props":{"y":119,"x":-13,"skin":"desk/desk_playing_head_info_bg.png"}},{"type":"Image","props":{"y":165,"x":4,"skin":"desk/icon_gold.png"}},{"type":"Label","props":{"y":171,"x":47,"width":102,"var":"txt_score","text":"999999","height":35,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":127,"x":-32,"width":184,"var":"txt_name","text":"杜莫不是人","height":35,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":4,"x":74,"var":"icon_zhuang","skin":"desk/icon_zhuang.png"}},{"type":"Label","props":{"y":15,"x":-30,"width":24,"text":"花","height":31,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":44,"x":-27,"width":19,"text":"×","height":27,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":70,"x":-40,"width":44,"var":"txt_buhua","text":"99","height":27,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":15,"x":13,"var":"prop","skin":"panel_bag/jxw11.png","scaleY":0.3,"scaleX":0.3}},{"type":"Image","props":{"y":26,"x":25,"var":"face","skin":"panel_chat/1.png"}},{"type":"Image","props":{"y":77,"x":13,"var":"offline","skin":"desk/lixian.png"}}]};}
		]);
		return DeskPlayingHeadUI;
	})(View);
var DeskPlayingHead1UI=(function(_super){
		function DeskPlayingHead1UI(){
			
		    this.head=null;
		    this.headFrame=null;
		    this.icon_ready=null;
		    this.txt_score=null;
		    this.txt_name=null;
		    this.icon_zhuang=null;
		    this.txt_buhua=null;
		    this.prop=null;
		    this.face=null;
		    this.offline=null;

			DeskPlayingHead1UI.__super.call(this);
		}

		CLASS$(DeskPlayingHead1UI,'ui.desk.DeskPlayingHead1UI',_super);
		var __proto__=DeskPlayingHead1UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskPlayingHead1UI.uiView);
		}

		STATICATTR$(DeskPlayingHead1UI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":150,"height":220},"child":[{"type":"Image","props":{"y":12,"x":11,"width":100,"var":"head","skin":"mainScene/mrtx.png","height":100}},{"type":"Image","props":{"y":0,"x":0,"var":"headFrame","skin":"mainScene/head_frame.png"}},{"type":"Image","props":{"y":46,"x":-52,"var":"icon_ready","skin":"desk/icon_ready.png"}},{"type":"Image","props":{"y":119,"x":-13,"skin":"desk/desk_playing_head_info_bg.png"}},{"type":"Image","props":{"y":165,"x":4,"skin":"desk/icon_gold.png"}},{"type":"Label","props":{"y":171,"x":47,"width":102,"var":"txt_score","text":"999999","height":35,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":127,"x":-32,"width":184,"var":"txt_name","text":"杜莫不是人","height":35,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":4,"x":74,"var":"icon_zhuang","skin":"desk/icon_zhuang.png"}},{"type":"Label","props":{"y":15,"x":130,"width":24,"text":"花","height":31,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":44,"x":133,"width":19,"text":"×","height":27,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":70,"x":121,"width":44,"var":"txt_buhua","text":"99","height":27,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":15,"x":14,"var":"prop","skin":"panel_bag/jxw11.png","scaleY":0.3,"scaleX":0.3}},{"type":"Image","props":{"y":24,"x":25,"var":"face","skin":"panel_chat/1.png"}},{"type":"Image","props":{"y":77,"x":12,"var":"offline","skin":"desk/lixian.png"}}]};}
		]);
		return DeskPlayingHead1UI;
	})(View);
var DeskReadyUI=(function(_super){
		function DeskReadyUI(){
			
		    this.btn_ready=null;
		    this.btn_invite=null;
		    this.btn_cancelReady=null;
		    this.txt_roomID=null;
		    this.play_des=null;
		    this.head_up=null;
		    this.head_down=null;
		    this.head_left=null;
		    this.head_right=null;

			DeskReadyUI.__super.call(this);
		}

		CLASS$(DeskReadyUI,'ui.desk.DeskReadyUI',_super);
		var __proto__=DeskReadyUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ui.desk.DeskReadyHead1UI",ui.desk.DeskReadyHead1UI);
			View.regComponent("ui.desk.DeskReadyHead2UI",ui.desk.DeskReadyHead2UI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskReadyUI.uiView);
		}

		STATICATTR$(DeskReadyUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":73.5,"x":337.5,"skin":"desk/ready_mj.png"}},{"type":"Image","props":{"y":465,"x":911,"var":"btn_ready","skin":"desk/ready_sure.png"}},{"type":"Image","props":{"y":592,"x":911,"var":"btn_invite","skin":"desk/invite_friend.png"}},{"type":"Image","props":{"y":465,"x":911,"var":"btn_cancelReady","skin":"desk/ready_cancel.png"}},{"type":"Label","props":{"y":5,"x":5,"width":238,"var":"txt_roomID","text":"房间号：180152","height":35,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":282,"x":578,"wordWrap":true,"width":226,"var":"play_des","valign":"middle","height":170,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"DeskReadyHead1","props":{"y":53,"x":493,"var":"head_up","runtime":"ui.desk.DeskReadyHead1UI"}},{"type":"DeskReadyHead1","props":{"y":556,"x":450,"var":"head_down","runtime":"ui.desk.DeskReadyHead1UI"}},{"type":"DeskReadyHead2","props":{"y":260,"x":164,"var":"head_left","runtime":"ui.desk.DeskReadyHead2UI"}},{"type":"DeskReadyHead2","props":{"y":260,"x":944,"var":"head_right","runtime":"ui.desk.DeskReadyHead2UI"}}]};}
		]);
		return DeskReadyUI;
	})(View);
var DeskReadyHead1UI=(function(_super){
		function DeskReadyHead1UI(){
			
		    this.head=null;
		    this.headFrame=null;
		    this.icon_ready=null;
		    this.txt_score=null;
		    this.txt_name=null;
		    this.prop=null;
		    this.face=null;
		    this.offline=null;

			DeskReadyHead1UI.__super.call(this);
		}

		CLASS$(DeskReadyHead1UI,'ui.desk.DeskReadyHead1UI',_super);
		var __proto__=DeskReadyHead1UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskReadyHead1UI.uiView);
		}

		STATICATTR$(DeskReadyHead1UI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":330,"height":120},"child":[{"type":"Image","props":{"y":12,"x":67,"width":100,"var":"head","skin":"mainScene/mrtx.png","height":100}},{"type":"Image","props":{"y":0,"x":56,"var":"headFrame","skin":"mainScene/head_frame.png"}},{"type":"Image","props":{"y":44,"x":0,"var":"icon_ready","skin":"desk/icon_ready.png"}},{"type":"Image","props":{"y":64,"x":184,"skin":"desk/icon_gold.png"}},{"type":"Label","props":{"y":69,"x":230,"width":120,"var":"txt_score","text":"0","height":35,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":24,"x":188,"width":184,"var":"txt_name","text":"杜莫不是人","height":35,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":14,"x":132,"var":"prop","skin":"panel_bag/jxw11.png","scaleY":0.3,"scaleX":0.3}},{"type":"Image","props":{"y":25,"x":81,"var":"face","skin":"panel_chat/1.png"}},{"type":"Image","props":{"y":77,"x":68,"var":"offline","skin":"desk/lixian.png"}}]};}
		]);
		return DeskReadyHead1UI;
	})(View);
var DeskReadyHead2UI=(function(_super){
		function DeskReadyHead2UI(){
			
		    this.head=null;
		    this.headFrame=null;
		    this.icon_ready=null;
		    this.txt_score=null;
		    this.txt_name=null;
		    this.prop=null;
		    this.face=null;
		    this.offline=null;

			DeskReadyHead2UI.__super.call(this);
		}

		CLASS$(DeskReadyHead2UI,'ui.desk.DeskReadyHead2UI',_super);
		var __proto__=DeskReadyHead2UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskReadyHead2UI.uiView);
		}

		STATICATTR$(DeskReadyHead2UI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":200,"height":210},"child":[{"type":"Image","props":{"y":12,"x":67,"width":100,"var":"head","skin":"mainScene/mrtx.png","height":100}},{"type":"Image","props":{"y":0,"x":56,"var":"headFrame","skin":"mainScene/head_frame.png"}},{"type":"Image","props":{"y":44,"x":0,"var":"icon_ready","skin":"desk/icon_ready.png"}},{"type":"Image","props":{"y":159,"x":64,"skin":"desk/icon_gold.png"}},{"type":"Label","props":{"y":164,"x":110,"width":120,"var":"txt_score","text":"0","height":35,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":123,"x":30,"width":184,"var":"txt_name","text":"杜莫不是人","height":35,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":14,"x":132,"var":"prop","skin":"panel_bag/jxw11.png","scaleY":0.3,"scaleX":0.3}},{"type":"Image","props":{"y":24,"x":81,"var":"face","skin":"panel_chat/1.png"}},{"type":"Image","props":{"y":77,"x":68,"var":"offline","skin":"desk/lixian.png"}}]};}
		]);
		return DeskReadyHead2UI;
	})(View);
var DeskResultBigUI=(function(_super){
		function DeskResultBigUI(){
			
		    this.btn_returnHall=null;
		    this.btn_share=null;
		    this.item1=null;
		    this.item2=null;
		    this.item3=null;
		    this.item4=null;

			DeskResultBigUI.__super.call(this);
		}

		CLASS$(DeskResultBigUI,'ui.desk.DeskResultBigUI',_super);
		var __proto__=DeskResultBigUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ui.desk.DeskResultBigItemUI",ui.desk.DeskResultBigItemUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskResultBigUI.uiView);
		}

		STATICATTR$(DeskResultBigUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":600,"x":685,"var":"btn_returnHall","skin":"result_big/fanhuidating.png"}},{"type":"Image","props":{"y":600,"x":284,"var":"btn_share","skin":"result_big/fenxiang.png"}},{"type":"Image","props":{"y":0,"x":511.5,"skin":"result_big/paijujieshu.png"}},{"type":"DeskResultBigItem","props":{"y":90,"x":11,"var":"item1","runtime":"ui.desk.DeskResultBigItemUI"}},{"type":"DeskResultBigItem","props":{"y":90,"x":328,"var":"item2","runtime":"ui.desk.DeskResultBigItemUI"}},{"type":"DeskResultBigItem","props":{"y":90,"x":646,"var":"item3","runtime":"ui.desk.DeskResultBigItemUI"}},{"type":"DeskResultBigItem","props":{"y":90,"x":963,"var":"item4","runtime":"ui.desk.DeskResultBigItemUI"}}]};}
		]);
		return DeskResultBigUI;
	})(View);
var DeskResultBigItemUI=(function(_super){
		function DeskResultBigItemUI(){
			
		    this.head=null;
		    this.txt_name=null;
		    this.txt_id=null;
		    this.txt_exp=null;
		    this.txt_zimo=null;
		    this.txt_jiepao=null;
		    this.txt_dianpao=null;
		    this.txt_angang=null;
		    this.txt_minggang=null;
		    this.txt_score=null;
		    this.icon=null;
		    this.icon1=null;

			DeskResultBigItemUI.__super.call(this);
		}

		CLASS$(DeskResultBigItemUI,'ui.desk.DeskResultBigItemUI',_super);
		var __proto__=DeskResultBigItemUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskResultBigItemUI.uiView);
		}

		STATICATTR$(DeskResultBigItemUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":303,"height":506},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"result_big/kuang1.png"}},{"type":"Image","props":{"y":13,"x":30,"width":100,"var":"head","skin":"mainScene/mrtx.png","height":100}},{"type":"Label","props":{"y":13,"x":135,"width":156,"var":"txt_name","text":"杜莫不是人","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":51,"x":135,"width":156,"var":"txt_id","text":"123456","height":32,"fontSize":25,"color":"#ffffff"}},{"type":"Label","props":{"y":84,"x":137,"width":156,"var":"txt_exp","text":"Exp:+30","height":32,"fontSize":25,"color":"#ffffff"}},{"type":"Label","props":{"y":137,"x":23.5,"width":256,"var":"txt_zimo","text":"自摸次数：100","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":186,"x":23.5,"width":256,"var":"txt_jiepao","text":"接炮次数：100","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":236,"x":23.5,"width":256,"var":"txt_dianpao","text":"点炮次数：100","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":285,"x":23.5,"width":256,"var":"txt_angang","text":"暗杠次数：100","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":337,"x":23.5,"width":256,"var":"txt_minggang","text":"明杠次数：100","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":387,"x":23.5,"width":256,"text":"总成绩","height":37,"fontSize":30,"color":"#f4ba03","align":"center"}},{"type":"Label","props":{"y":433,"x":23.5,"width":256,"var":"txt_score","text":"+12","height":37,"fontSize":30,"color":"#f4ba03","align":"center"}},{"type":"Image","props":{"y":401,"x":146,"var":"icon","skin":"result_big/dyj.png"}},{"type":"Image","props":{"y":414,"x":-22,"var":"icon1","skin":"result_big/zjps.png"}}]};}
		]);
		return DeskResultBigItemUI;
	})(View);
var DeskResultSmallUI=(function(_super){
		function DeskResultSmallUI(){
			
		    this.btn_start=null;
		    this.icon_result=null;
		    this.item1=null;
		    this.item2=null;
		    this.item3=null;
		    this.item4=null;
		    this.btn_share=null;

			DeskResultSmallUI.__super.call(this);
		}

		CLASS$(DeskResultSmallUI,'ui.desk.DeskResultSmallUI',_super);
		var __proto__=DeskResultSmallUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ui.desk.DeskResultSmallItemUI",ui.desk.DeskResultSmallItemUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskResultSmallUI.uiView);
		}

		STATICATTR$(DeskResultSmallUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":600,"x":723,"var":"btn_start","skin":"result_small/start.png"}},{"type":"Image","props":{"y":0,"x":568.5,"var":"icon_result","skin":"result_small/lose.png"}},{"type":"DeskResultSmallItem","props":{"y":94,"x":29.5,"var":"item1","runtime":"ui.desk.DeskResultSmallItemUI"}},{"type":"DeskResultSmallItem","props":{"y":222,"x":29.5,"var":"item2","runtime":"ui.desk.DeskResultSmallItemUI"}},{"type":"DeskResultSmallItem","props":{"y":350,"x":29.5,"var":"item3","runtime":"ui.desk.DeskResultSmallItemUI"}},{"type":"DeskResultSmallItem","props":{"y":479,"x":29.5,"var":"item4","runtime":"ui.desk.DeskResultSmallItemUI"}},{"type":"Image","props":{"y":600,"x":254,"var":"btn_share","skin":"result_small/share.png"}},{"type":"Label","props":{"y":51,"x":897,"width":65,"text":"苍蝇","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":21,"x":969,"width":96,"text":"番×花\\n封顶","height":70,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":51,"x":1158,"width":65,"text":"总分","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":51,"x":1059,"width":87,"text":"本局分","height":37,"fontSize":30,"color":"#ffffff"}}]};}
		]);
		return DeskResultSmallUI;
	})(View);
var DeskResultSmallItemUI=(function(_super){
		function DeskResultSmallItemUI(){
			
		    this.txt_name=null;
		    this.txt_hua=null;
		    this.txt_cangying=null;
		    this.txt_fengding=null;
		    this.txt_zongfen=null;
		    this.txt_paixing=null;
		    this.icon_hu=null;
		    this.txt_curfen=null;

			DeskResultSmallItemUI.__super.call(this);
		}

		CLASS$(DeskResultSmallItemUI,'ui.desk.DeskResultSmallItemUI',_super);
		var __proto__=DeskResultSmallItemUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeskResultSmallItemUI.uiView);
		}

		STATICATTR$(DeskResultSmallItemUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1221,"height":121},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"result_small/kuang.png"}},{"type":"Label","props":{"y":0,"x":33,"width":196,"var":"txt_name","text":"杜莫不是人","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":0,"x":224,"width":293,"var":"txt_hua","text":"补花 手花 底花","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":42,"x":860,"width":67,"var":"txt_cangying","text":"-100","height":37,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":42,"x":948,"width":67,"var":"txt_fengding","text":"-100","height":37,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":42,"x":1123,"width":67,"var":"txt_zongfen","text":"-100","height":37,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":0,"x":559,"width":293,"var":"txt_paixing","text":"补花 手花 底花","height":37,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":37,"x":678,"var":"icon_hu","skin":"result_small/hu.png"}},{"type":"Label","props":{"y":42,"x":1035,"width":67,"var":"txt_curfen","text":"-100","height":37,"fontSize":30,"color":"#ffffff","align":"center"}}]};}
		]);
		return DeskResultSmallItemUI;
	})(View);
var LoadingUI=(function(_super){
		function LoadingUI(){
			
		    this.b1=null;
		    this.b2=null;

			LoadingUI.__super.call(this);
		}

		CLASS$(LoadingUI,'ui.LoadingUI',_super);
		var __proto__=LoadingUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoadingUI.uiView);
		}

		STATICATTR$(LoadingUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"loading/background.png"}},{"type":"Image","props":{"y":518,"x":243,"var":"b1","skin":"loading/load2.png"}},{"type":"Image","props":{"y":528,"x":259.5,"var":"b2","skin":"loading/load1.png"}},{"type":"Image","props":{"y":100,"x":233,"skin":"loading/logo.png"}}]};}
		]);
		return LoadingUI;
	})(View);
var LoginUI=(function(_super){
		function LoginUI(){
			
		    this.bg=null;
		    this.btn_login=null;
		    this.pt_1=null;
		    this.btn_agree=null;

			LoginUI.__super.call(this);
		}

		CLASS$(LoginUI,'ui.LoginUI',_super);
		var __proto__=LoginUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(LoginUI.uiView);
		}

		STATICATTR$(LoginUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"loading/background.png"}},{"type":"Image","props":{"y":427,"x":427,"var":"btn_login","skin":"login/login.png"}},{"type":"Image","props":{"y":668,"x":0,"var":"pt_1","skin":"login/dz.png"}},{"type":"Image","props":{"y":591,"x":484.5,"var":"btn_agree","skin":"login/agree.png"}},{"type":"Image","props":{"y":100,"x":233,"skin":"loading/logo.png"}}]};}
		]);
		return LoginUI;
	})(View);
var MainSceneUI=(function(_super){
		function MainSceneUI(){
			
		    this.btn_createRoom=null;
		    this.btn_joinRoom=null;

			MainSceneUI.__super.call(this);
		}

		CLASS$(MainSceneUI,'ui.mainScene.MainSceneUI',_super);
		var __proto__=MainSceneUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainSceneUI.uiView);
		}

		STATICATTR$(MainSceneUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"mainScene/bg.png"}},{"type":"Image","props":{"y":253,"x":782,"var":"btn_createRoom","skin":"mainScene/room_create.png"}},{"type":"Image","props":{"y":407,"x":724,"var":"btn_joinRoom","skin":"mainScene/room_join.png"}}]};}
		]);
		return MainSceneUI;
	})(View);
var MainSceneDownUI=(function(_super){
		function MainSceneDownUI(){
			
		    this.btn_bag=null;
		    this.btn_record=null;
		    this.btn_rule=null;
		    this.btn_set=null;
		    this.btn_share=null;

			MainSceneDownUI.__super.call(this);
		}

		CLASS$(MainSceneDownUI,'ui.mainScene.MainSceneDownUI',_super);
		var __proto__=MainSceneDownUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainSceneDownUI.uiView);
		}

		STATICATTR$(MainSceneDownUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":150},"child":[{"type":"Image","props":{"y":61,"x":0,"skin":"mainScene/down.png"}},{"type":"Image","props":{"y":0,"x":213,"var":"btn_bag","skin":"mainScene/icon_bag.png"}},{"type":"Image","props":{"y":0,"x":753,"var":"btn_record","skin":"mainScene/icon_record.png"}},{"type":"Image","props":{"y":0,"x":565.5,"var":"btn_rule","skin":"mainScene/icon_rule.png"}},{"type":"Image","props":{"y":0,"x":938,"var":"btn_set","skin":"mainScene/icon_set.png"}},{"type":"Image","props":{"y":0,"x":383,"var":"btn_share","skin":"mainScene/icon_share.png"}}]};}
		]);
		return MainSceneDownUI;
	})(View);
var MainSceneUpUI=(function(_super){
		function MainSceneUpUI(){
			
		    this.head=null;
		    this.headFrame=null;
		    this.txt_name=null;
		    this.txt_id=null;
		    this.txt_roomCard=null;
		    this.btn_pay=null;
		    this.btn_quit=null;

			MainSceneUpUI.__super.call(this);
		}

		CLASS$(MainSceneUpUI,'ui.mainScene.MainSceneUpUI',_super);
		var __proto__=MainSceneUpUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainSceneUpUI.uiView);
		}

		STATICATTR$(MainSceneUpUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":170},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"mainScene/up.png"}},{"type":"Image","props":{"y":39,"x":47,"width":100,"var":"head","skin":"mainScene/mrtx.png","height":100}},{"type":"Image","props":{"y":28,"x":36,"var":"headFrame","skin":"mainScene/head_frame.png"}},{"type":"Image","props":{"y":40,"x":170,"skin":"mainScene/head_info_frame.png"}},{"type":"Label","props":{"y":44,"x":178,"width":173,"var":"txt_name","text":"狗屎","height":36,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":91,"x":178,"width":174,"var":"txt_id","text":"ID 123456","height":36,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":138,"x":178,"width":174,"var":"txt_roomCard","text":"房卡 123456","height":36,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":122,"x":366,"var":"btn_pay","skin":"mainScene/pay.png"}},{"type":"Image","props":{"y":30,"x":1153,"var":"btn_quit","skin":"mainScene/quit.png"}}]};}
		]);
		return MainSceneUpUI;
	})(View);
var MajiangTestUI=(function(_super){
		function MajiangTestUI(){
			
		    this.btn_hu=null;
		    this.btn_addHandCard=null;
		    this.btn_addGrabCard=null;
		    this.btn_clear=null;
		    this.btn_ting=null;
		    this.txt_door=null;

			MajiangTestUI.__super.call(this);
		}

		CLASS$(MajiangTestUI,'ui.MajiangTestUI',_super);
		var __proto__=MajiangTestUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MajiangTestUI.uiView);
		}

		STATICATTR$(MajiangTestUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Label","props":{"y":31,"x":1021,"width":61,"var":"btn_hu","text":"胡牌","height":35,"fontSize":30,"color":"#000000"}},{"type":"Label","props":{"y":82,"x":939,"width":128,"var":"btn_addHandCard","text":"添加手牌","height":35,"fontSize":30,"color":"#000000"}},{"type":"Label","props":{"y":133,"x":947,"width":128,"var":"btn_addGrabCard","underlineColor":"#000000","text":"添加抓牌","height":35,"fontSize":30,"color":"#000000","borderColor":"#000000"}},{"type":"Label","props":{"y":414,"x":6,"width":64,"text":"手牌","height":35,"fontSize":30,"color":"#000000"}},{"type":"Label","props":{"y":506,"x":4,"width":64,"text":"抓牌","height":35,"fontSize":30,"color":"#000000"}},{"type":"Label","props":{"y":24,"x":1186,"width":61,"var":"btn_clear","text":"清理","height":35,"fontSize":30,"color":"#000000"}},{"type":"Label","props":{"y":592,"x":828,"wordWrap":true,"width":446,"height":127,"fontSize":30,"color":"#000000"}},{"type":"Label","props":{"y":596,"x":3,"width":63,"text":"门牌","height":35,"fontSize":30,"color":"#000000"}},{"type":"Label","props":{"y":81,"x":1172,"width":61,"var":"btn_ting","text":"听牌","height":35,"fontSize":30,"color":"#000000"}},{"type":"TextInput","props":{"y":595,"x":92,"width":1050,"var":"txt_door","skin":"comp/textinput.png","sizeGrid":"2,2,2,2","height":36,"fontSize":25}}]};}
		]);
		return MajiangTestUI;
	})(View);
var MallUI=(function(_super){
		function MallUI(){
			
		    this.bg=null;
		    this.btn_close=null;

			MallUI.__super.call(this);
		}

		CLASS$(MallUI,'ui.mall.MallUI',_super);
		var __proto__=MallUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MallUI.uiView);
		}

		STATICATTR$(MallUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":899,"height":575},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"mall/bg.png"}},{"type":"Image","props":{"y":26,"x":763,"var":"btn_close","skin":"mall/close.png"}}]};}
		]);
		return MallUI;
	})(View);
var MallItemUI=(function(_super){
		function MallItemUI(){
			
		    this.bg=null;
		    this.txt_roomCard=null;
		    this.txt_rmb=null;

			MallItemUI.__super.call(this);
		}

		CLASS$(MallItemUI,'ui.mall.MallItemUI',_super);
		var __proto__=MallItemUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MallItemUI.uiView);
		}

		STATICATTR$(MallItemUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":257,"height":204},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"mall/itembg.png"}},{"type":"Image","props":{"y":9,"x":10,"skin":"mall/fk.png"}},{"type":"Label","props":{"y":27,"x":46.5,"width":164,"var":"txt_roomCard","text":"128 房卡","height":30,"fontSize":30,"align":"center"}},{"type":"Label","props":{"y":163,"x":46.5,"width":164,"var":"txt_rmb","text":"￥128","height":30,"fontSize":30,"align":"center"}}]};}
		]);
		return MallItemUI;
	})(View);
var MallPayPasswordPanelUI=(function(_super){
		function MallPayPasswordPanelUI(){
			
		    this.bg=null;
		    this.btn_close=null;
		    this.btn_0=null;
		    this.btn_1=null;
		    this.btn_2=null;
		    this.btn_3=null;
		    this.btn_4=null;
		    this.btn_5=null;
		    this.btn_6=null;
		    this.btn_7=null;
		    this.btn_9=null;
		    this.btn_delete=null;
		    this.btn_reInput=null;
		    this.btn_sure=null;
		    this.txt_0=null;
		    this.txt_1=null;
		    this.txt_2=null;
		    this.txt_3=null;
		    this.txt_4=null;
		    this.txt_5=null;
		    this.btn_8=null;

			MallPayPasswordPanelUI.__super.call(this);
		}

		CLASS$(MallPayPasswordPanelUI,'ui.mall.MallPayPasswordPanelUI',_super);
		var __proto__=MallPayPasswordPanelUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MallPayPasswordPanelUI.uiView);
		}

		STATICATTR$(MallPayPasswordPanelUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":557,"height":575},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"mall/czbj2.png"}},{"type":"Image","props":{"y":29,"x":450,"var":"btn_close","skin":"mall/close.png"}},{"type":"Image","props":{"y":384,"x":225,"var":"btn_0","skin":"mall/0.png","name":"0"}},{"type":"Image","props":{"y":164,"x":92,"var":"btn_1","skin":"mall/1.png","name":"1"}},{"type":"Image","props":{"y":164,"x":225,"var":"btn_2","skin":"mall/2.png","name":"2"}},{"type":"Image","props":{"y":164,"x":359,"var":"btn_3","skin":"mall/3.png","name":"3"}},{"type":"Image","props":{"y":237,"x":92,"var":"btn_4","skin":"mall/4.png","name":"4"}},{"type":"Image","props":{"y":237,"x":225,"var":"btn_5","skin":"mall/5.png","name":"5"}},{"type":"Image","props":{"y":237,"x":359,"var":"btn_6","skin":"mall/6.png","name":"6"}},{"type":"Image","props":{"y":311,"x":92,"var":"btn_7","skin":"mall/7.png","name":"7"}},{"type":"Image","props":{"y":311,"x":359,"var":"btn_9","skin":"mall/9.png","name":"9"}},{"type":"Image","props":{"y":384,"x":359,"var":"btn_delete","skin":"mall/del.png"}},{"type":"Image","props":{"y":384,"x":92,"var":"btn_reInput","skin":"mall/cs.png"}},{"type":"Image","props":{"y":462,"x":138,"var":"btn_sure","skin":"mall/qd.png"}},{"type":"Label","props":{"y":108,"x":93,"width":58,"var":"txt_0","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":108,"x":156,"width":58,"var":"txt_1","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":107,"x":215,"width":58,"var":"txt_2","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":108,"x":277,"width":58,"var":"txt_3","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":110,"x":341,"width":58,"var":"txt_4","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":107,"x":406,"width":58,"var":"txt_5","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":311,"x":225,"var":"btn_8","skin":"mall/8.png","name":"8"}}]};}
		]);
		return MallPayPasswordPanelUI;
	})(View);
var PanelBagUI=(function(_super){
		function PanelBagUI(){
			
		    this.btn_close=null;
		    this.btn_left=null;
		    this.btn_right=null;
		    this.btn_mall=null;
		    this.btn_xiexia=null;
		    this.btn_peidai=null;
		    this.head=null;
		    this.headFrame=null;
		    this.btn_info=null;
		    this.txt_roomCard=null;
		    this.txt_add=null;
		    this.prop=null;

			PanelBagUI.__super.call(this);
		}

		CLASS$(PanelBagUI,'ui.panel.PanelBagUI',_super);
		var __proto__=PanelBagUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelBagUI.uiView);
		}

		STATICATTR$(PanelBagUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1197,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_bag/jxwbbbg.png"}},{"type":"Image","props":{"y":68,"x":1046,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":560,"x":324,"var":"btn_left","skin":"panel_rule/shangyiye.png"}},{"type":"Image","props":{"y":560,"x":459,"var":"btn_right","skin":"panel_rule/xiayiye.png"}},{"type":"Image","props":{"y":67,"x":101,"var":"btn_mall","skin":"panel_bag/mall.png"}},{"type":"Image","props":{"y":528,"x":814,"var":"btn_xiexia","skin":"panel_bag/xiexia.png"}},{"type":"Image","props":{"y":529,"x":955,"var":"btn_peidai","skin":"panel_bag/peidai.png"}},{"type":"Image","props":{"y":188,"x":860,"width":100,"var":"head","skin":"mainScene/mrtx.png","scaleY":0.7,"scaleX":0.7,"height":100}},{"type":"Image","props":{"y":180,"x":852,"var":"headFrame","skin":"mainScene/head_frame.png","scaleY":0.7,"scaleX":0.7}},{"type":"Image","props":{"y":234,"x":948,"skin":"panel_bag/money.png"}},{"type":"Image","props":{"y":67,"x":885,"var":"btn_info","skin":"panel_bag/xiangqing.png"}},{"type":"Label","props":{"y":236,"x":978,"width":172,"var":"txt_roomCard","text":"9999","height":37,"fontSize":25,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":374,"x":829,"width":265,"var":"txt_add","text":"经验加成 0%","height":37,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":190,"x":950,"var":"prop","skin":"panel_bag/jxw11.png","scaleY":0.3,"scaleX":0.3}}]};}
		]);
		return PanelBagUI;
	})(View);
var PanelBagInfoUI=(function(_super){
		function PanelBagInfoUI(){
			
		    this.btn_close=null;

			PanelBagInfoUI.__super.call(this);
		}

		CLASS$(PanelBagInfoUI,'ui.panel.PanelBagInfoUI',_super);
		var __proto__=PanelBagInfoUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelBagInfoUI.uiView);
		}

		STATICATTR$(PanelBagInfoUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1197,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_bag/jxwbbxq.png"}},{"type":"Image","props":{"y":68,"x":1024,"var":"btn_close","skin":"comp1/close.png"}}]};}
		]);
		return PanelBagInfoUI;
	})(View);
var PanelBagItemUI=(function(_super){
		function PanelBagItemUI(){
			
		    this.star1=null;
		    this.star2=null;
		    this.star3=null;
		    this.star4=null;
		    this.star5=null;
		    this.star6=null;
		    this.txt_name=null;
		    this.prop=null;

			PanelBagItemUI.__super.call(this);
		}

		CLASS$(PanelBagItemUI,'ui.panel.PanelBagItemUI',_super);
		var __proto__=PanelBagItemUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelBagItemUI.uiView);
		}

		STATICATTR$(PanelBagItemUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":157,"height":201},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_bag/itembg.png"}},{"type":"Image","props":{"y":175,"x":25,"var":"star1","skin":"panel_bag/xing1.png"}},{"type":"Image","props":{"y":176,"x":43,"var":"star2","skin":"panel_bag/xing1.png"}},{"type":"Image","props":{"y":175,"x":62,"var":"star3","skin":"panel_bag/xing1.png"}},{"type":"Image","props":{"y":176,"x":81,"var":"star4","skin":"panel_bag/xing1.png"}},{"type":"Image","props":{"y":177,"x":97,"var":"star5","skin":"panel_bag/xing1.png"}},{"type":"Image","props":{"y":177,"x":115,"var":"star6","skin":"panel_bag/xing1.png"}},{"type":"Label","props":{"y":145,"x":16,"width":126,"var":"txt_name","text":"筑基丹","strokeColor":"#000000","height":32,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":15,"x":19,"var":"prop","skin":"panel_bag/prop.png","name":"prop"}}]};}
		]);
		return PanelBagItemUI;
	})(View);
var PanelChatUI=(function(_super){
		function PanelChatUI(){
			
		    this.facebg=null;
		    this.btn_image=null;
		    this.btn_word=null;
		    this.btn_face=null;
		    this.btn_close=null;
		    this.btn_send=null;
		    this.txt=null;

			PanelChatUI.__super.call(this);
		}

		CLASS$(PanelChatUI,'ui.panel.PanelChatUI',_super);
		var __proto__=PanelChatUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelChatUI.uiView);
		}

		STATICATTR$(PanelChatUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":630,"height":544},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_chat/bg.png"}},{"type":"Image","props":{"y":77,"x":38,"var":"facebg","skin":"panel_chat/k2.png"}},{"type":"Image","props":{"y":27,"x":86,"var":"btn_image","skin":"panel_chat/face.png"}},{"type":"Image","props":{"y":28,"x":99,"width":175,"var":"btn_word","skin":"panel_chat/xq.png","height":38,"alpha":0}},{"type":"Image","props":{"y":27,"x":280,"width":188,"var":"btn_face","skin":"panel_chat/xq.png","height":38,"alpha":0}},{"type":"Image","props":{"y":25,"x":516,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":433,"x":477,"var":"btn_send","skin":"panel_chat/fasong.png"}},{"type":"Label","props":{"y":450,"x":46,"width":429,"var":"txt","valign":"middle","text":"请输入聊天内容","height":45,"fontSize":30,"color":"#ffffff"}}]};}
		]);
		return PanelChatUI;
	})(View);
var PanelChatWordItemUI=(function(_super){
		function PanelChatWordItemUI(){
			
		    this.txt=null;

			PanelChatWordItemUI.__super.call(this);
		}

		CLASS$(PanelChatWordItemUI,'ui.panel.PanelChatWordItemUI',_super);
		var __proto__=PanelChatWordItemUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelChatWordItemUI.uiView);
		}

		STATICATTR$(PanelChatWordItemUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":553,"height":72},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_chat/k1.png"}},{"type":"Label","props":{"y":17,"x":12,"width":536,"var":"txt","text":"label","height":39,"fontSize":30}}]};}
		]);
		return PanelChatWordItemUI;
	})(View);
var PanelCreateRoomUI=(function(_super){
		function PanelCreateRoomUI(){
			
		    this.btn_close=null;
		    this.btn_baida=null;
		    this.btn_qiaoma=null;
		    this.btn_createRoom=null;
		    this.panel_baida=null;
		    this.panel_qiaoma=null;

			PanelCreateRoomUI.__super.call(this);
		}

		CLASS$(PanelCreateRoomUI,'ui.panel.PanelCreateRoomUI',_super);
		var __proto__=PanelCreateRoomUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ui.panel.PanelCreateRoom_baidaUI",ui.panel.PanelCreateRoom_baidaUI);
			View.regComponent("ui.panel.PanelCreateRoom_qiaomaUI",ui.panel.PanelCreateRoom_qiaomaUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelCreateRoomUI.uiView);
		}

		STATICATTR$(PanelCreateRoomUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1050,"height":610},"child":[{"type":"Image","props":{"y":-41,"x":-147,"skin":"panel_createRoom/bg.png"}},{"type":"Image","props":{"y":10,"x":913,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":197,"x":42,"var":"btn_baida","skin":"panel_createRoom/play_baida1.png"}},{"type":"Image","props":{"y":109,"x":44,"var":"btn_qiaoma","skin":"panel_createRoom/play_qiaoma1.png"}},{"type":"Image","props":{"y":506,"x":527,"var":"btn_createRoom","skin":"panel_createRoom/createRoom.png"}},{"type":"PanelCreateRoom_baida","props":{"y":80,"x":290,"var":"panel_baida","runtime":"ui.panel.PanelCreateRoom_baidaUI"}},{"type":"PanelCreateRoom_qiaoma","props":{"y":80,"x":290,"var":"panel_qiaoma","runtime":"ui.panel.PanelCreateRoom_qiaomaUI"}}]};}
		]);
		return PanelCreateRoomUI;
	})(View);
var PanelCreateRoom_baidaUI=(function(_super){
		function PanelCreateRoom_baidaUI(){
			
		    this.btn_roomModel1=null;
		    this.btn_roomModel2=null;
		    this.btn_qihu1=null;
		    this.btn_lazi1=null;
		    this.btn_dihua1=null;
		    this.btn_lazi2=null;
		    this.btn_play1=null;
		    this.btn_play2=null;
		    this.btn_play3=null;
		    this.btn_qihu2=null;
		    this.btn_qihu3=null;
		    this.btn_play4=null;

			PanelCreateRoom_baidaUI.__super.call(this);
		}

		CLASS$(PanelCreateRoom_baidaUI,'ui.panel.PanelCreateRoom_baidaUI',_super);
		var __proto__=PanelCreateRoom_baidaUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelCreateRoom_baidaUI.uiView);
		}

		STATICATTR$(PanelCreateRoom_baidaUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":600,"height":430},"child":[{"type":"Label","props":{"y":9,"x":2,"width":174,"text":"房间模式：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":114,"x":2,"width":90,"text":"起胡：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":239,"x":2,"width":83,"text":"辣子：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":2,"width":93,"text":"底花：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":293,"x":2,"width":105,"text":"玩法：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":9,"x":200,"width":198,"text":"8局（房卡×1）","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":9,"x":484,"width":213,"text":"16局（房卡×2）","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":114,"x":158,"width":415,"text":"没百搭，1花以上可以抓跑","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":239,"x":158,"width":95,"text":"30分","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":158,"width":249,"text":"20花（加中发白）","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":239,"x":342,"width":95,"text":"50分","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":293,"x":158,"width":95,"text":"七对","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":293,"x":340,"width":132,"text":"只碰不吃","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":343,"x":158,"width":299,"text":"垃圾胡（不带清混碰）","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":5,"x":148,"var":"btn_roomModel1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":5,"x":440,"var":"btn_roomModel2","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":110,"x":95,"var":"btn_qihu1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":235,"x":95,"var":"btn_lazi1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":56,"x":95,"var":"btn_dihua1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":235,"x":286,"var":"btn_lazi2","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":289,"x":95,"var":"btn_play1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":289,"x":286,"var":"btn_play2","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":339,"x":95,"var":"btn_play3","skin":"panel_createRoom/q1.png"}},{"type":"Label","props":{"y":154,"x":158,"width":415,"text":"没百搭，2花以上可以抓跑","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":150,"x":95,"var":"btn_qihu2","skin":"panel_createRoom/q1.png"}},{"type":"Label","props":{"y":194,"x":158,"width":415,"text":"没百搭，3花以上可以抓跑","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":190,"x":95,"var":"btn_qihu3","skin":"panel_createRoom/q1.png"}},{"type":"Label","props":{"y":390,"x":158,"width":299,"text":"飞苍蝇","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":386,"x":95,"var":"btn_play4","skin":"panel_createRoom/q1.png"}}]};}
		]);
		return PanelCreateRoom_baidaUI;
	})(View);
var PanelCreateRoom_qiaomaUI=(function(_super){
		function PanelCreateRoom_qiaomaUI(){
			
		    this.btn_roomModel1=null;
		    this.btn_roomModel2=null;
		    this.btn_dihua1=null;
		    this.btn_hupai1=null;
		    this.btn_lazi1=null;
		    this.btn_lazi2=null;
		    this.btn_lazi3=null;
		    this.btn_play1=null;
		    this.btn_play2=null;
		    this.btn_play3=null;
		    this.btn_play4=null;

			PanelCreateRoom_qiaomaUI.__super.call(this);
		}

		CLASS$(PanelCreateRoom_qiaomaUI,'ui.panel.PanelCreateRoom_qiaomaUI',_super);
		var __proto__=PanelCreateRoom_qiaomaUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelCreateRoom_qiaomaUI.uiView);
		}

		STATICATTR$(PanelCreateRoom_qiaomaUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":600,"height":370},"child":[{"type":"Label","props":{"y":9,"x":2,"width":174,"text":"房间模式：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":2,"width":93,"text":"底花：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":114,"x":2,"width":90,"text":"胡牌：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":168,"x":2,"width":83,"text":"辣子：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":222,"x":2,"width":105,"text":"玩法：","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":9,"x":200,"width":198,"text":"8局（房卡×1）","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":9,"x":484,"width":213,"text":"16局（房卡×2）","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":60,"x":158,"width":249,"text":"20花（加中发白）","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":114,"x":158,"width":95,"text":"任意胡","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":168,"x":158,"width":95,"text":"20分","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":168,"x":332,"width":95,"text":"30分","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":168,"x":502,"width":95,"text":"50分","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":222,"x":158,"width":95,"text":"七对","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":222,"x":332,"width":132,"text":"只碰不吃","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":276,"x":158,"width":299,"text":"垃圾胡（不带清混碰）","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":5,"x":148,"var":"btn_roomModel1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":5,"x":440,"var":"btn_roomModel2","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":56,"x":95,"var":"btn_dihua1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":110,"x":95,"var":"btn_hupai1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":164,"x":95,"var":"btn_lazi1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":164,"x":285,"var":"btn_lazi2","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":164,"x":456,"var":"btn_lazi3","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":218,"x":95,"var":"btn_play1","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":218,"x":285,"var":"btn_play2","skin":"panel_createRoom/q1.png"}},{"type":"Image","props":{"y":272,"x":95,"var":"btn_play3","skin":"panel_createRoom/q1.png"}},{"type":"Label","props":{"y":327,"x":158,"width":299,"text":"飞苍蝇","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":323,"x":95,"var":"btn_play4","skin":"panel_createRoom/q1.png"}}]};}
		]);
		return PanelCreateRoom_qiaomaUI;
	})(View);
var PanelDissolveNoAgreePTUI=(function(_super){
		function PanelDissolveNoAgreePTUI(){
			
		    this.btn_close=null;
		    this.txt=null;

			PanelDissolveNoAgreePTUI.__super.call(this);
		}

		CLASS$(PanelDissolveNoAgreePTUI,'ui.panel.PanelDissolveNoAgreePTUI',_super);
		var __proto__=PanelDissolveNoAgreePTUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelDissolveNoAgreePTUI.uiView);
		}

		STATICATTR$(PanelDissolveNoAgreePTUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":702,"height":429},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_dissolve/tishi.png"}},{"type":"Image","props":{"y":48,"x":548,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Label","props":{"y":186,"x":185,"width":332,"var":"txt","text":"充钱才会变得更加强大","height":60,"fontSize":30,"color":"#ffffff","align":"center"}}]};}
		]);
		return PanelDissolveNoAgreePTUI;
	})(View);
var PanelDissolveResultUI=(function(_super){
		function PanelDissolveResultUI(){
			
		    this.btn_close=null;
		    this.btn_sure=null;
		    this.btn_cancel=null;
		    this.txt_name1=null;
		    this.txt_name2=null;
		    this.txt_name3=null;
		    this.txt_name4=null;
		    this.txt_result1=null;
		    this.txt_result2=null;
		    this.txt_result3=null;
		    this.txt_result4=null;

			PanelDissolveResultUI.__super.call(this);
		}

		CLASS$(PanelDissolveResultUI,'ui.panel.PanelDissolveResultUI',_super);
		var __proto__=PanelDissolveResultUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelDissolveResultUI.uiView);
		}

		STATICATTR$(PanelDissolveResultUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":793,"height":594},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_dissolve/jiesanbg.png"}},{"type":"Image","props":{"y":46,"x":636,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":412,"x":192,"var":"btn_sure","skin":"panel_dissolve/queren.png"}},{"type":"Image","props":{"y":412,"x":416,"var":"btn_cancel","skin":"panel_dissolve/quxiao.png"}},{"type":"Label","props":{"y":126,"x":74,"width":309,"var":"txt_name1","text":"杜莫你是人","height":35,"fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":172,"x":74,"width":309,"var":"txt_name2","text":"杜莫你是人","height":35,"fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":219,"x":74,"width":309,"var":"txt_name3","text":"杜莫你是人","height":35,"fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":266,"x":74,"width":309,"var":"txt_name4","text":"杜莫你是人","height":35,"fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":126,"x":415,"width":309,"var":"txt_result1","text":"不是","height":35,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":172,"x":415,"width":309,"var":"txt_result2","text":"不是","height":35,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":219,"x":415,"width":309,"var":"txt_result3","text":"不是","height":35,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":266,"x":415,"width":309,"var":"txt_result4","text":"不是","height":35,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":352,"x":103,"width":587,"text":"（超过60秒未做选择，则默认同意解散）","height":36,"fontSize":30,"color":"#ffffff","align":"center"}}]};}
		]);
		return PanelDissolveResultUI;
	})(View);
var PanelDissolveSelectUI=(function(_super){
		function PanelDissolveSelectUI(){
			
		    this.btn_close=null;

			PanelDissolveSelectUI.__super.call(this);
		}

		CLASS$(PanelDissolveSelectUI,'ui.panel.PanelDissolveSelectUI',_super);
		var __proto__=PanelDissolveSelectUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelDissolveSelectUI.uiView);
		}

		STATICATTR$(PanelDissolveSelectUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":702,"height":429},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_dissolve/tishi.png"}},{"type":"Image","props":{"y":227,"x":133,"skin":"panel_dissolve/quxiao.png"}},{"type":"Image","props":{"y":227,"x":367,"skin":"panel_dissolve/queren.png"}},{"type":"Image","props":{"y":48,"x":548,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Label","props":{"y":162,"x":185,"width":332,"text":"你确定要解散房间么？","height":60,"fontSize":30,"color":"#ffffff","align":"center"}}]};}
		]);
		return PanelDissolveSelectUI;
	})(View);
var PanelHeadInfoUI=(function(_super){
		function PanelHeadInfoUI(){
			
		    this.btn_close=null;
		    this.btn_help=null;
		    this.txt_name=null;
		    this.txt_lv=null;
		    this.txt_id=null;
		    this.txt_ip=null;
		    this.head=null;
		    this.headFrame=null;
		    this.bar=null;

			PanelHeadInfoUI.__super.call(this);
		}

		CLASS$(PanelHeadInfoUI,'ui.panel.PanelHeadInfoUI',_super);
		var __proto__=PanelHeadInfoUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelHeadInfoUI.uiView);
		}

		STATICATTR$(PanelHeadInfoUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":996,"height":556},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_headInfo/bg.png"}},{"type":"Image","props":{"y":45,"x":804,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":280,"x":98,"var":"btn_help","skin":"panel_headInfo/help.png"}},{"type":"Label","props":{"y":160,"x":243,"width":226,"var":"txt_name","text":"杜莫山炮56","height":38,"fontSize":35,"color":"#ffffff"}},{"type":"Label","props":{"y":216,"x":245,"width":226,"var":"txt_lv","text":"等级 LV99","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":260,"x":288,"width":585,"text":"等级经验可以通过对局数和使用房卡增加","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":306,"x":247,"width":226,"var":"txt_id","text":"ID 123456","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":356,"x":247,"width":226,"var":"txt_ip","text":"IP 123.456.789","height":38,"fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":161,"x":117,"width":100,"var":"head","skin":"mainScene/mrtx.png","height":100}},{"type":"Image","props":{"y":149,"x":106,"var":"headFrame","skin":"mainScene/head_frame.png"}},{"type":"Image","props":{"y":225,"x":428,"skin":"panel_headInfo/tiaobg.png"}},{"type":"Image","props":{"y":225,"x":429,"var":"bar","skin":"panel_headInfo/tiao.png"}}]};}
		]);
		return PanelHeadInfoUI;
	})(View);
var PanelHelpUI=(function(_super){
		function PanelHelpUI(){
			
		    this.btn_close=null;

			PanelHelpUI.__super.call(this);
		}

		CLASS$(PanelHelpUI,'ui.panel.PanelHelpUI',_super);
		var __proto__=PanelHelpUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelHelpUI.uiView);
		}

		STATICATTR$(PanelHelpUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1197,"height":608},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"mainScene/help.png"}},{"type":"Image","props":{"y":69,"x":1010,"var":"btn_close","skin":"comp1/close.png"}}]};}
		]);
		return PanelHelpUI;
	})(View);
var PanelJoinRoomUI=(function(_super){
		function PanelJoinRoomUI(){
			
		    this.bg=null;
		    this.btn_close=null;
		    this.btn_0=null;
		    this.btn_1=null;
		    this.btn_2=null;
		    this.btn_3=null;
		    this.btn_4=null;
		    this.btn_5=null;
		    this.btn_6=null;
		    this.btn_7=null;
		    this.btn_8=null;
		    this.btn_9=null;
		    this.btn_delete=null;
		    this.btn_reInput=null;
		    this.txt_0=null;
		    this.txt_1=null;
		    this.txt_2=null;
		    this.txt_3=null;
		    this.txt_4=null;
		    this.txt_5=null;

			PanelJoinRoomUI.__super.call(this);
		}

		CLASS$(PanelJoinRoomUI,'ui.panel.PanelJoinRoomUI',_super);
		var __proto__=PanelJoinRoomUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelJoinRoomUI.uiView);
		}

		STATICATTR$(PanelJoinRoomUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":651,"height":677},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"panel_joinRoom/bg.png"}},{"type":"Image","props":{"y":35,"x":501,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":538,"x":271.5,"var":"btn_0","skin":"panel_joinRoom/0.png","name":"0"}},{"type":"Image","props":{"y":253,"x":121,"var":"btn_1","skin":"panel_joinRoom/1.png","name":"1"}},{"type":"Image","props":{"y":253,"x":271.5,"var":"btn_2","skin":"panel_joinRoom/2.png","name":"2"}},{"type":"Image","props":{"y":253,"x":419,"var":"btn_3","skin":"panel_joinRoom/3.png","name":"3"}},{"type":"Image","props":{"y":349,"x":121,"var":"btn_4","skin":"panel_joinRoom/4.png","name":"4"}},{"type":"Image","props":{"y":349,"x":271.5,"var":"btn_5","skin":"panel_joinRoom/5.png","name":"5"}},{"type":"Image","props":{"y":349,"x":419,"var":"btn_6","skin":"panel_joinRoom/6.png","name":"6"}},{"type":"Image","props":{"y":444,"x":121,"var":"btn_7","skin":"panel_joinRoom/7.png","name":"7"}},{"type":"Image","props":{"y":444,"x":271.5,"var":"btn_8","skin":"panel_joinRoom/8.png","name":"8"}},{"type":"Image","props":{"y":444,"x":419,"var":"btn_9","skin":"panel_joinRoom/9.png","name":"9"}},{"type":"Image","props":{"y":538,"x":121,"var":"btn_delete","skin":"panel_joinRoom/del.png"}},{"type":"Image","props":{"y":538,"x":419,"var":"btn_reInput","skin":"panel_joinRoom/reinput.png"}},{"type":"Label","props":{"y":192,"x":137,"width":58,"var":"txt_0","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":191,"x":203,"width":58,"var":"txt_1","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":191,"x":265,"width":58,"var":"txt_2","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":192,"x":328,"width":58,"var":"txt_3","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":190,"x":393,"width":58,"var":"txt_4","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":190,"x":454,"width":58,"var":"txt_5","text":"1","height":41,"fontSize":35,"color":"#ffffff","align":"center"}}]};}
		]);
		return PanelJoinRoomUI;
	})(View);
var PanelMallUI=(function(_super){
		function PanelMallUI(){
			
		    this.btn_close=null;
		    this.btn_left=null;
		    this.btn_right=null;
		    this.head=null;
		    this.headFrame=null;
		    this.btn_buy=null;
		    this.txt_add=null;
		    this.txt_roomCard=null;
		    this.txt_price=null;
		    this.prop=null;

			PanelMallUI.__super.call(this);
		}

		CLASS$(PanelMallUI,'ui.panel.PanelMallUI',_super);
		var __proto__=PanelMallUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelMallUI.uiView);
		}

		STATICATTR$(PanelMallUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1197,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_bag/jxwscbg.png"}},{"type":"Image","props":{"y":68,"x":1046,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":560,"x":324,"var":"btn_left","skin":"panel_rule/shangyiye.png"}},{"type":"Image","props":{"y":560,"x":459,"var":"btn_right","skin":"panel_rule/xiayiye.png"}},{"type":"Image","props":{"y":188,"x":860,"width":100,"var":"head","skin":"mainScene/mrtx.png","scaleY":0.7,"scaleX":0.7,"height":100}},{"type":"Image","props":{"y":180,"x":852,"var":"headFrame","skin":"mainScene/head_frame.png","scaleY":0.7,"scaleX":0.7}},{"type":"Image","props":{"y":234,"x":948,"skin":"panel_bag/money.png"}},{"type":"Image","props":{"y":529,"x":836,"var":"btn_buy","skin":"panel_bag/goumai.png"}},{"type":"Label","props":{"y":374,"x":829,"width":265,"var":"txt_add","text":"经验加成 0%","height":37,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":236,"x":978,"width":172,"var":"txt_roomCard","text":"9999","height":37,"fontSize":25,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":558,"x":872,"width":122,"var":"txt_price","text":"999","height":37,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":190,"x":950,"var":"prop","skin":"panel_bag/jxw11.png","scaleY":0.3,"scaleX":0.3}}]};}
		]);
		return PanelMallUI;
	})(View);
var PanelPayPTUI=(function(_super){
		function PanelPayPTUI(){
			
		    this.btn_close=null;

			PanelPayPTUI.__super.call(this);
		}

		CLASS$(PanelPayPTUI,'ui.panel.PanelPayPTUI',_super);
		var __proto__=PanelPayPTUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelPayPTUI.uiView);
		}

		STATICATTR$(PanelPayPTUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":702,"height":429},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_dissolve/tishi.png"}},{"type":"Image","props":{"y":48,"x":548,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Label","props":{"y":186,"x":185,"width":332,"text":"充钱才会变得更加强大","height":60,"fontSize":30,"color":"#ffffff","align":"center"}}]};}
		]);
		return PanelPayPTUI;
	})(View);
var PanelQuitSelectUI=(function(_super){
		function PanelQuitSelectUI(){
			
		    this.btn_close=null;
		    this.btn_sure=null;
		    this.btn_cancel=null;

			PanelQuitSelectUI.__super.call(this);
		}

		CLASS$(PanelQuitSelectUI,'ui.panel.PanelQuitSelectUI',_super);
		var __proto__=PanelQuitSelectUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelQuitSelectUI.uiView);
		}

		STATICATTR$(PanelQuitSelectUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":702,"height":429},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_dissolve/tishi.png"}},{"type":"Image","props":{"y":48,"x":548,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":242,"x":129,"var":"btn_sure","skin":"panel_dissolve/queren.png"}},{"type":"Image","props":{"y":242,"x":370,"var":"btn_cancel","skin":"panel_dissolve/quxiao.png"}},{"type":"Label","props":{"y":166,"x":143,"width":411,"text":"是否确定退出登录？","height":42,"fontSize":30,"color":"#ffffff","align":"center"}}]};}
		]);
		return PanelQuitSelectUI;
	})(View);
var PanelRecord1UI=(function(_super){
		function PanelRecord1UI(){
			
		    this.btn_close=null;
		    this.loading=null;

			PanelRecord1UI.__super.call(this);
		}

		CLASS$(PanelRecord1UI,'ui.panel.PanelRecord1UI',_super);
		var __proto__=PanelRecord1UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelRecord1UI.uiView);
		}

		STATICATTR$(PanelRecord1UI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1204,"height":730},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_record/bg.png"}},{"type":"Image","props":{"y":79,"x":1038,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Label","props":{"y":148,"x":89,"width":201,"text":"房间编号","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":148,"x":916,"width":172,"text":"时间","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":148,"x":529,"width":172,"text":"分数","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":365,"x":602,"var":"loading","skin":"panel_record/loading.png","anchorY":0.5,"anchorX":0.5}}]};}
		]);
		return PanelRecord1UI;
	})(View);
var PanelRecord2UI=(function(_super){
		function PanelRecord2UI(){
			
		    this.btn_close=null;
		    this.txt_name1=null;
		    this.txt_name2=null;
		    this.txt_name3=null;
		    this.txt_name4=null;
		    this.loading=null;

			PanelRecord2UI.__super.call(this);
		}

		CLASS$(PanelRecord2UI,'ui.panel.PanelRecord2UI',_super);
		var __proto__=PanelRecord2UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelRecord2UI.uiView);
		}

		STATICATTR$(PanelRecord2UI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1204,"height":730},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_record/jlbg.png"}},{"type":"Image","props":{"y":79,"x":1038,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Label","props":{"y":148,"x":83,"width":130,"text":"序号","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":148,"x":200,"width":160,"text":"开始时间","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":148,"x":357,"width":172,"var":"txt_name1","text":"玩家名字1","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":148,"x":521,"width":172,"var":"txt_name2","text":"玩家名字2","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":148,"x":687,"width":172,"var":"txt_name3","text":"玩家名字3","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":148,"x":848,"width":172,"var":"txt_name4","text":"玩家名字4","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":365,"x":602,"var":"loading","skin":"panel_record/loading.png","anchorY":0.5,"anchorX":0.5}}]};}
		]);
		return PanelRecord2UI;
	})(View);
var PanelRecordItem1UI=(function(_super){
		function PanelRecordItem1UI(){
			
		    this.txt_3=null;
		    this.txt_time=null;
		    this.txt_roomID=null;
		    this.txt_1=null;
		    this.txt_2=null;
		    this.txt_4=null;

			PanelRecordItem1UI.__super.call(this);
		}

		CLASS$(PanelRecordItem1UI,'ui.panel.PanelRecordItem1UI',_super);
		var __proto__=PanelRecordItem1UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelRecordItem1UI.uiView);
		}

		STATICATTR$(PanelRecordItem1UI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1052,"height":99},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_record/itembg.png"}},{"type":"Label","props":{"y":55,"x":257,"width":283,"var":"txt_3","text":"杜莫不是人 -100","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":16,"x":822,"wordWrap":true,"width":213,"var":"txt_time","valign":"middle","text":"2017-01-01\\n18:65:00","height":73,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":36,"x":12,"width":209,"var":"txt_roomID","text":"3838438","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":13,"x":258,"width":283,"var":"txt_1","text":"杜莫不是人 -100","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":13,"x":541,"width":283,"var":"txt_2","text":"杜莫不是人 -100","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":55,"x":541,"width":283,"var":"txt_4","text":"杜莫不是人 -100","height":38,"fontSize":30,"color":"#ffffff","align":"center"}}]};}
		]);
		return PanelRecordItem1UI;
	})(View);
var PanelRecordItem2UI=(function(_super){
		function PanelRecordItem2UI(){
			
		    this.txt_score1=null;
		    this.txt_score2=null;
		    this.txt_score3=null;
		    this.txt_score4=null;
		    this.txt_time=null;
		    this.txt_id=null;
		    this.btn_replay=null;

			PanelRecordItem2UI.__super.call(this);
		}

		CLASS$(PanelRecordItem2UI,'ui.panel.PanelRecordItem2UI',_super);
		var __proto__=PanelRecordItem2UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelRecordItem2UI.uiView);
		}

		STATICATTR$(PanelRecordItem2UI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1052,"height":99},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_record/itembg.png"}},{"type":"Label","props":{"y":36,"x":305,"width":130,"var":"txt_score1","text":"123456","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":36,"x":465,"width":130,"var":"txt_score2","text":"123456","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":36,"x":630,"width":130,"var":"txt_score3","text":"123456","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":36,"x":791,"width":130,"var":"txt_score4","text":"123456","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":19,"x":109,"wordWrap":true,"width":213,"var":"txt_time","valign":"middle","text":"2017-01-01\\n18:65:00","height":73,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":36,"x":12,"width":130,"var":"txt_id","text":"99","height":38,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":25,"x":929,"var":"btn_replay","skin":"panel_record/replay.png"}}]};}
		]);
		return PanelRecordItem2UI;
	})(View);
var PanelRoomCardMallUI=(function(_super){
		function PanelRoomCardMallUI(){
			
		    this.bg=null;
		    this.btn_close=null;

			PanelRoomCardMallUI.__super.call(this);
		}

		CLASS$(PanelRoomCardMallUI,'ui.panel.PanelRoomCardMallUI',_super);
		var __proto__=PanelRoomCardMallUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelRoomCardMallUI.uiView);
		}

		STATICATTR$(PanelRoomCardMallUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1197,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"mainScene/fksc.png"}},{"type":"Image","props":{"y":67,"x":1026,"var":"btn_close","skin":"comp1/close.png"}}]};}
		]);
		return PanelRoomCardMallUI;
	})(View);
var PanelRuleUI=(function(_super){
		function PanelRuleUI(){
			
		    this.btn_close=null;
		    this.btn_baida=null;
		    this.btn_qiaoma=null;
		    this.image_rule=null;
		    this.btn_left=null;
		    this.btn_right=null;

			PanelRuleUI.__super.call(this);
		}

		CLASS$(PanelRuleUI,'ui.panel.PanelRuleUI',_super);
		var __proto__=PanelRuleUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelRuleUI.uiView);
		}

		STATICATTR$(PanelRuleUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1092,"height":590},"child":[{"type":"Image","props":{"y":-33,"x":-53,"skin":"panel_rule/wanfabg.png"}},{"type":"Image","props":{"y":5,"x":937,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":192,"x":28,"var":"btn_baida","skin":"panel_createRoom/play_baida1.png"}},{"type":"Image","props":{"y":104,"x":30,"var":"btn_qiaoma","skin":"panel_createRoom/play_qiaoma1.png"}},{"type":"Image","props":{"y":82,"x":278,"var":"image_rule","skin":"panel_rule/baidawanfa1.png"}},{"type":"Image","props":{"y":510,"x":550,"var":"btn_left","skin":"panel_rule/shangyiye.png"}},{"type":"Image","props":{"y":509,"x":690,"var":"btn_right","skin":"panel_rule/xiayiye.png"}}]};}
		]);
		return PanelRuleUI;
	})(View);
var PanelSetUI=(function(_super){
		function PanelSetUI(){
			
		    this.bg=null;
		    this.btn_close=null;
		    this.btn_out=null;
		    this.btn_sound=null;
		    this.btn_music=null;

			PanelSetUI.__super.call(this);
		}

		CLASS$(PanelSetUI,'ui.panel.PanelSetUI',_super);
		var __proto__=PanelSetUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelSetUI.uiView);
		}

		STATICATTR$(PanelSetUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":757,"height":482},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"panel_set/bg.png"}},{"type":"Image","props":{"y":35,"x":625,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":322,"x":252,"var":"btn_out","skin":"panel_set/tcdl.png"}},{"type":"Image","props":{"y":144,"x":353,"var":"btn_sound","skin":"panel_set/on.png"}},{"type":"Image","props":{"y":223,"x":355,"var":"btn_music","skin":"panel_set/on.png"}}]};}
		]);
		return PanelSetUI;
	})(View);
var PanelShareUI=(function(_super){
		function PanelShareUI(){
			
		    this.btn_close=null;
		    this.btn_receive=null;
		    this.btn_share=null;
		    this.panel_receive=null;
		    this.panel_share=null;

			PanelShareUI.__super.call(this);
		}

		CLASS$(PanelShareUI,'ui.panel.PanelShareUI',_super);
		var __proto__=PanelShareUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("ui.panel.PanelShare_receiveUI",ui.panel.PanelShare_receiveUI);
			View.regComponent("ui.panel.PanelShare_shareUI",ui.panel.PanelShare_shareUI);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelShareUI.uiView);
		}

		STATICATTR$(PanelShareUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1126,"height":656},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_share/bg.png"}},{"type":"Image","props":{"y":31,"x":980,"var":"btn_close","skin":"comp1/close.png"}},{"type":"Image","props":{"y":198,"x":85,"var":"btn_receive","skin":"panel_share/receive1.png"}},{"type":"Image","props":{"y":117,"x":85,"var":"btn_share","skin":"panel_share/share_code1.png"}},{"type":"PanelShare_receive","props":{"y":85,"x":306,"var":"panel_receive","runtime":"ui.panel.PanelShare_receiveUI"}},{"type":"PanelShare_share","props":{"y":85,"x":306,"var":"panel_share","runtime":"ui.panel.PanelShare_shareUI"}}]};}
		]);
		return PanelShareUI;
	})(View);
var PanelShare_receiveUI=(function(_super){
		function PanelShare_receiveUI(){
			
		    this.txt_receiveRecord1=null;
		    this.txt_receiveRoomCardCount=null;
		    this.btn_receive=null;
		    this.txt_receiveRecord2=null;
		    this.txt_receiveRecord3=null;

			PanelShare_receiveUI.__super.call(this);
		}

		CLASS$(PanelShare_receiveUI,'ui.panel.PanelShare_receiveUI',_super);
		var __proto__=PanelShare_receiveUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelShare_receiveUI.uiView);
		}

		STATICATTR$(PanelShare_receiveUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":758,"height":522},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_share/receive_bg.png"}},{"type":"Label","props":{"y":66,"x":103,"width":552,"var":"txt_receiveRecord1","text":"2017-01-01 领取 2张房卡奖励","height":32,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":245,"x":103,"width":552,"var":"txt_receiveRoomCardCount","text":"您还可领取： 2  张房卡","height":32,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":279,"x":262,"var":"btn_receive","skin":"panel_share/lijilingqu.png"}},{"type":"Label","props":{"y":110,"x":103,"width":552,"var":"txt_receiveRecord2","text":"2017-01-01 领取 2张房卡奖励","height":32,"fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":152,"x":103,"width":552,"var":"txt_receiveRecord3","text":"2017-01-01 领取 2张房卡奖励","height":32,"fontSize":25,"color":"#ffffff","align":"center"}}]};}
		]);
		return PanelShare_receiveUI;
	})(View);
var PanelShare_shareUI=(function(_super){
		function PanelShare_shareUI(){
			
		    this.btn_share=null;

			PanelShare_shareUI.__super.call(this);
		}

		CLASS$(PanelShare_shareUI,'ui.panel.PanelShare_shareUI',_super);
		var __proto__=PanelShare_shareUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PanelShare_shareUI.uiView);
		}

		STATICATTR$(PanelShare_shareUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":758,"height":522},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"panel_share/share_bg.png"}},{"type":"Image","props":{"y":435,"x":252.5,"var":"btn_share","skin":"panel_share/haoyouqun.png"}}]};}
		]);
		return PanelShare_shareUI;
	})(View);
var ReplayUI=(function(_super){
		function ReplayUI(){
			
		    this.btn_out=null;
		    this.btn_add=null;
		    this.btn_reduce=null;
		    this.btn_play=null;

			ReplayUI.__super.call(this);
		}

		CLASS$(ReplayUI,'ui.ReplayUI',_super);
		var __proto__=ReplayUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(ReplayUI.uiView);
		}

		STATICATTR$(ReplayUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":315,"x":728,"var":"btn_out","skin":"replay/again.png"}},{"type":"Image","props":{"y":315,"x":633,"var":"btn_add","skin":"replay/ahead.png"}},{"type":"Image","props":{"y":315,"x":443,"var":"btn_reduce","skin":"replay/back.png"}},{"type":"Image","props":{"y":315,"x":538.5,"var":"btn_play","skin":"replay/pause.png"}}]};}
		]);
		return ReplayUI;
	})(View);
var TipsReConnectUI=(function(_super){
		function TipsReConnectUI(){
			
		    this.btn_r=null;
		    this.txt=null;

			TipsReConnectUI.__super.call(this);
		}

		CLASS$(TipsReConnectUI,'ui.TipsReConnectUI',_super);
		var __proto__=TipsReConnectUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TipsReConnectUI.uiView);
		}

		STATICATTR$(TipsReConnectUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":554,"height":261},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"tips/dxcl.png"}},{"type":"Image","props":{"y":130,"x":200.5,"var":"btn_r","skin":"tips/cxlj.png"}},{"type":"Label","props":{"y":74.5,"x":120,"width":315,"var":"txt","text":"网络中断...","height":40,"fontSize":35,"color":"#ffffff","align":"center"}}]};}
		]);
		return TipsReConnectUI;
	})(View);
var TipsReLoginUI=(function(_super){
		function TipsReLoginUI(){
			
		    this.txt=null;
		    this.btn_sure=null;

			TipsReLoginUI.__super.call(this);
		}

		CLASS$(TipsReLoginUI,'ui.TipsReLoginUI',_super);
		var __proto__=TipsReLoginUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TipsReLoginUI.uiView);
		}

		STATICATTR$(TipsReLoginUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":554,"height":261},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"tips/dxcl.png"}},{"type":"Label","props":{"y":66,"x":119.5,"width":315,"var":"txt","text":"请重新登录游戏","height":47,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":136,"x":153,"var":"btn_sure","skin":"tips/sure.png"}}]};}
		]);
		return TipsReLoginUI;
	})(View);
var XtsTipsUI=(function(_super){
		function XtsTipsUI(){
			
		    this.txt=null;

			XtsTipsUI.__super.call(this);
		}

		CLASS$(XtsTipsUI,'ui.XtsTipsUI',_super);
		var __proto__=XtsTipsUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(XtsTipsUI.uiView);
		}

		STATICATTR$(XtsTipsUI,
		['uiView',function(){return this.uiView={"type":"View","props":{"width":676,"height":127},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"tips/xts.png"}},{"type":"Label","props":{"y":19,"x":38,"wordWrap":true,"width":600,"var":"txt","valign":"middle","text":"哈喽啊","overflow":"scroll","height":89,"fontSize":38,"color":"#ffffff","align":"center"}}]};}
		]);
		return XtsTipsUI;
	})(View);