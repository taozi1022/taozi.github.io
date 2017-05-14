/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-19 22:19:29
 * @version $Id$
 */

 ;(function(){


 	/*菜单项的构造函数*/
 	var Menubar = function(element){
 		this.element = element;
 		this.eles = $("ul > li");		//找到所有的li
 		this.len = this.eles.length;	//所有的li的长度
 		this.init();					//初始化函数
 	}
 	Menubar.prototype = {
 		constructor:Menubar,
 		init:function(){
 			this.eles.each(function(){
 				$(this).on("click",function(ev){
		 			console.log(1)
					var a = document.getElementById(ev.currentTarget.id + '-content');
					var val = $(this).find("p").html();
					$(".nav-content").hide();
					$(a).show("normal").find("h3").text(val);
				})
 			})
 			$(".nav-close").on("click",this.closeBoxFn);
 			
 		},
 		closeBoxFn:function(){
 			$(this).parent().hide("normal");	//将他的父级隐藏掉
		}
 	}

	/*构造函数*/
 	var Sidebar = function(element,menuEle){
 		this.status = true;						//状态
 		this.element = element;
 		this.menubar = new Menubar(menuEle);	//菜单项

 		this.init();	//初始化函数
 	};

 	Sidebar.prototype = {
 		constructor:Sidebar,
 		init:function(){
 			this.element.on("click",this.clickFn,$.proxy(this.clickFn,this));	//并且改变this指向
 		},
 		closeFn:function(){
 			/*隐藏侧边栏*/
 			$("ul").hide("slow");		//隐藏ul
 			$("#sidebar").css("background","none");		//背景变没
 			this.element.animate({		//给当前点击的按钮加动画
				left: "50px",
			}, "slow" );

 			$(".nav-content").hide();		//隐藏所有的显示框
 			this.status = !this.status;		//改变状态
 		},
 		openFn:function(){
 			/*显示侧边栏*/
 			$("ul").show("slow");		//隐藏ul
 			$("#sidebar").css("background","#ccc");		//背景变没
 			this.element.animate({		//给当前点击的按钮加动画
				left: 0,
			}, "slow" );

 			this.status = !this.status;		//改变状态
 		},
 		clickFn:function(ev){
 			//点击的不是自身
 			if( ev.target !== this.element ){
 				//根据状态判断是展开还是关闭
 				this.triggerSwich();
 			}
 		},
 		triggerSwich:function(){
 			//状态为true,标识展开的状态,就要把它关闭
 			if( this.status ){
 				this.closeFn();
 			}else{
 				this.openFn();
 			}
 		}
 	}
	/*将方法扩展到jq原型上*/
 	$.fn.sidebar = function(menuBar){
 		new Sidebar(this,menuBar);
 	}

 })(jQuery);