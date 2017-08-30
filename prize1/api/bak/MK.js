/**
 * 
 */
var VERISON = 3.1290;

// 自己砍价页面
var page_0_Mgr = new PageMgr(".page_0", "page0.html?vesion=" + VERISON);
! function() {
	page_0_Mgr.extend({
 		onEnter: function() {
 			var self = this;
			self.element.fadeIn();
			$(".share_msg").html($(".share_msg").html().replace("{{nickname}}", USER.nickname));
			 //如果跳转到第二页则第一页的数据无需加载
			if (parseInt(USER.tosource) || !(USER.wxid == USER.towxid)) {
				loadingMgr.loadImages({
					loadArr: loading_all[2].concat(loading_all[0]),
					process: function(e) {
	 					self.element.find(".progress").html(parseInt(e) + "%");
					},
					complete: function() {
		 				return Page.gotoPage(2, {
							mode: "none"
						});
					}
				});
			}else if(USER.tosource  == USER.price ){
				
				return Page.gotoPage(3, {
					mode: "none"
				});
				
			}else{
				loadingMgr.loadImages({
					loadArr: loading_all[1].concat(loading_all[0]) ,
					process: function(e) {
	 					self.element.find(".progress").html(parseInt(e) + "%");
					},
					complete: function() {					
		 				Page.gotoPage(1, {mode: "none"});
		 				//静默加载下一页
						loadingMgr.loadImages({loadArr: loading_all[2]});
					}
				});
			}
	
		}
 	}, true);
}();




// 自己砍价页面
var page_self_Mgr = new PageMgr(".page_self", "page_self.html?vesion=" + VERISON);
! function() {
	page_self_Mgr.extend({
		onEnter: function() {
			var self = this;
			self.element.fadeIn();
			//格式化时间
			$(".lasttime").html("活动倒计时" + timeDifference());
			
			getIskan() ;
			var _btnzikanLock = false ;
 			 // 自己来一刀
			self.element.find(".btn-zikan").off().on("touchend", function() {
				USER.discount  = USER.discount < 1 ? 0 : USER.discount  ;
 				USER.newprice = (USER.price - USER.discount);
				self.element.find(".newprice").html(  (USER.newprice < 0 ? 0: USER.newprice ) + "<span>元</span>");
 				self.element.find(".zikansuccess-btngroup").fadeIn();
				self.element.find(".zikan-btngroup").fadeOut();
				self.element.find(".articletime").fadeOut();
				self.element.find(".p1free").slideUp();
				self.element.find(".oldprice").slideDown();
				self.element.find(".newprice").slideDown();
				self.element.find(".btn-kansuccess span").text(USER.discount);
				
				if(_btnzikanLock){return false} ;
				_btnzikanLock = true;
				/*数据提交到后台*/
				$.post("dbs/in.php", {
					fun: "notes",
					nickname: USER.nickname,
					headimage: USER.headimage,
					wxid: USER.wxid,
					source: USER.discount,
					towxid: USER.towxid
				}, function(result) {
					//alert("s")
					console.log(result)
				});

			});
			// 
			self.element.find(".btn-rule").off().on("touchend", function() {
				self.element.find(".pagerule").fadeIn();
			});
			// 规则
			self.element.find(".pagerule i").off().on("touchend", function() {
				self.element.find(".pagerule").fadeOut();
			});
			// 邀请 分享
			self.element.find(".btn-yaoqing img").off().on("touchend", function() {
				$(".pageshare").slideDown();
			});

		}
	}, true);
}();

// 他人砍价页面
var page_other_Mgr = new PageMgr(".page_other", "page_other.html?vesion=" + VERISON);
! function() {
	page_other_Mgr.extend({
		onEnter: function() {
			var self = this;
			self.element.fadeIn();
 			$('.newprice').html( USER.price - USER.tosource  + '<span>元</span>')
			
 			//获取数据
			getIskan();
 			if(USER.towxid == USER.wxid){
				$(".kan-list .title a").html("你");
				$(".page_other .btn-yaoqinggroup").fadeIn();
				$(".page_other .btn-zikangroup").fadeOut();
 				$(".page_other .help-btngroup").fadeOut();
 			}else{
				//当前进入别人的页面
				$(".kan-list .title a").html(USER.tonickname);
				$(".page_other .btn-yaoqinggroup").fadeOut();
				 //如果已经帮助过他了
				if (parseInt(USER.iskan) > 0) {
					$(".page_other .help-btngroup").fadeOut();
					$(".page_other .btn-zikangroup").fadeIn();
					//self.element.find('.btn-zikan').fadeIn();
				} else {
					$(".page_other .help-btngroup").fadeIn();
					$(".page_other .btn-zikangroup").fadeOut();
					//self.element.find('.btn-zikan').fadeOut();
				}
 			}
			if(parseInt(USER.iscare) > 0){
				$(".page_other .code-fuceng").fadeOut();
			}else{
				$(".page_other .code-fuceng").fadeIn();
			}
			
			var _btntakanLock =  false;
				
			// 帮他补刀
			self.element.find(".btn-help").off().on("touchend", function() {
				
				var _html = "" ;
					_html += '<li    >';
					_html += '<span class="headimg"><img  src="' + USER.headimage + '96"></span>';
					_html += '<span class="nickname">' + (USER.nickname).replace(/\?{4}/g, "⭐️") + '</span>';
					_html += '<span class="num">-' +USER.discount + '</span>';
					_html += '</li>';
 				$(".kan-list .item").prepend(_html);
				var currentlength = parseInt($(".kan-list .title span").html());
 				
 				
 				self.element.find(".middle").fadeIn();
				self.element.find(".middle1").fadeOut();
				self.element.find(".help-btngroup").fadeOut();
				self.element.find(".btn-zikangroup").fadeIn(); 	
  				
				self.element.find(".p1free").slideUp();
				self.element.find(".oldprice").slideDown();
				self.element.find(".newprice").slideDown();
				
				if(_btntakanLock){return false} ;
				
				_btntakanLock = true ;
				$(".kan-list .title span").html( currentlength +1 );
				var currentPrice = parseInt(self.element.find('.newprice').text());
				self.element.find('.newprice').html(currentPrice - USER.discount + '<span>元</span>')
				
				
				/*数据提交到后台*/
				$.post("dbs/in.php", {
					fun: "notes",
					nickname: USER.nickname,
					headimage: USER.headimage,
					wxid: USER.wxid,
					source: USER.discount,
					towxid: USER.towxid
				}, function(result) {
					//alert("s")
					console.log(result)
					 
				});

			});
			// 自己来一刀
			self.element.find(".btn-zikan ,.btn-zi").off().on("touchend", function() {
//				Page.gotoPage(1, {
//					mode: "none"
//				});
//				self.element.fadeOut();
				gotoMypage();
			});

			//、、 邀请 分享
			self.element.find(".btn-yao ").off().on("touchend", function() {
				$(".pageshare").slideDown();
			});
			
			// 
			self.element.find(".btn-rule").off().on("touchend", function() {
				self.element.find(".pagerule").fadeIn();
			});
			// 规则
			self.element.find(".pagerule i").off().on("touchend", function() {
				self.element.find(".pagerule").fadeOut();
			});
			
			// 二维码
			self.element.find(".code-fuceng i").off().on("touchend", function() {
				self.element.find(".code-fuceng").fadeOut();
				 $.post("dbs/in.php",{
	                fun:"care",
	                wxid:USER.wxid,
	                care:1
	            },function(result){
	            });
				
				
			});
			

		}
	}, true);
}();

/**
 * ====================================================================== 
 */


$(document).ready(function() {
	///阻止默认事件
//	$(document).on("touchstart touchmove mousedown mousemove", function(event) {
//		var tag = $(event.target).parents()[0].tagName;
//		var tagclass = $(event.target).parents(".page_18").size();
//		var thistag = event.target.tagName;
//		if (tag != "A" && tag != "INPUT" && tag != "TEXTAREA" && tag != "SELECT" && thistag != "A" && thistag != "INPUT" && thistag != "TEXTAREA" && thistag != "SELECT" && tagclass == 0) {
//			event.preventDefault();
//		}
//	});
	$(".pageshare ").off().on("touchend", function() {
		$(".pageshare").slideUp();
	});
	Page.work();
	initlasttime();
	userRegist();
	//数据初始化
	
	
});

function userRegist() {
	//自己进入并且未注册
	if (USER.wxid == USER.towxid && USER.toid == "") {
		///*数据提交到后台 c存储当前用户*/
		$.post("dbs/in.php", {
			fun: "user",
			name: "",
			tel: "",
			nickname: USER.nickname,
			headimage: USER.headimage,
			wxid: USER.wxid,
			source: 0,
		}, function(result) {
			console.log(result)
		});

	}

}

// 砍价成功
var page_succes_Mgr = new PageMgr(".page_self", "page_success.html?vesion=" + VERISON);
! function() {
	page_succes_Mgr.extend({
		onEnter: function() {
			var self = this;
			self.element.fadeIn();
			$(".saveBtn").on("click",function(){
				$(".savesuccess").fadeIn();
				
				 $.post("dbs/in.php",{
	                fun:"save",
	                wxid:USER.wxid,
	                care:9
	            },function(result){
	            });
	            
			})
		}
	}, true);
}();

//打折啊啊

function getIskan() {
 	/*查询 助力 数据*/
	$.post("dbs/select.php", {
		fun: "notes",
		towxid: USER.towxid
	}, function(result) {
		result = eval('(' + result + ')');
		$(".kan-list ul").fadeIn();
		_html = ""
		for (var i in result) {
			_html += '<li  class="li_' + i + '"  >';
			_html += '<span class="headimg"><img  src="' + result[i].headimage + '96"></span>';
			_html += '<span class="nickname">' + (result[i].nickname).replace(/\?{4}/g, "⭐️")+ '</span>';
			_html += '<span class="num">-' + result[i].source + '</span>';
			_html += '</li>';
		}
		$(".kan-list .item").html(_html);
 		if( USER.wxid !== USER.towxid){
 			var _tonickname = (USER.tonickname).replace(/\?{4}/g, "⭐️")
 			$(".kan-list .title").html("当前共有<span>"+result.length+"</span>位好友为<a>"+ (_tonickname==""?"他" :_tonickname)+"</a>插刀砍价");
		}else{
 			$(".kan-list .title").html("当前共有<span>"+result.length+"</span>位好友为<a>你</a>插刀砍价");
		}
		
 		if (result.length == 0 ) {
 			 //别人
			$('.other').addClass('kan-none');
			$('.page_other .middle1').slideDown();
			$('.page_other .middle').slideUp();
   		} else {
			$('.page_other .other').removeClass('kan-none');
			$('.page_other .middle1').slideUp();
			$('.page_other .middle').fadeIn();
   		}
 	});
}


//计算时间差

function initlasttime() {
		//$(".lasttime").html("活动倒计时" + timeDifference());
 	setInterval(function() {
		$(".lasttime").html("活动倒计时" + timeDifference());
	},1000);
}

function timeDifference() {

	var date1 = new Date(); //开始时间

	//var date2=new Date();    //结束时间
	// 获取某个时间格式的时间戳
	var stringTime = "2016-08-10 24:00:00";
	var timestamp2 = Date.parse(new Date(stringTime)) || 1470844800000;
	
	var date3 = timestamp2 - date1.getTime() //时间差的毫秒数

	//计算出相差天数
	var days = Math.floor(date3 / (24 * 3600 * 1000))+1

	//计算出小时数

	var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000))
		//计算相差分钟数
	var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000))

	//计算相差秒数
	var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3 / 1000)

	return "<span>" + days + "</span>天<span>" + hours + "</span>小时<span>" + minutes + "</span>  分";
	//return "<span>"+days+"</span>天<span>"+hours+"</span>小时 <span>"+minutes+"</span> 分钟<span>"+seconds+"</span> 秒" ;
}