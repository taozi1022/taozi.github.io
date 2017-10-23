;(function($){


	function ScrollBar(element,options){
		this.defaults = options;

		this.element = element;

		this.Y = 0;	
		this.y = 0;
		//目标元素
		this.target = this.defaults.moveObj && $(this.defaults.moveObj) || this.element;
		this.scale = 0;
		//自定义事件处理的状态
		this.init();
	}

	ScrollBar.prototype = {
		constructor:ScrollBar,
		init:function(){
			this.mouseWheel();
			$("#scrollBar").css("height",$("#main").height()/$("#content").outerHeight()*$("#scrollBox").height());

			//滚动条能滚动的最大距离
			this.maxJL = $("#scrollBox").height() - this.element.height();
			//content能走的最大的距离
			this.mainMaxJL = $("#content").height() - $("#main").height();

			//给目标元素绑定down事件处理,并且将this指向被拖拽元素
			this.element.on("mousedown",$.proxy(this.downFn,this));

			if( $("#main").height() >= $("#content").height() ){
				$("#scrollBox").css("display","none");
			}

		},
		downFn:function(ev){
			ev.preventDefault();
			this.Y = ev.pageY - this.element.position().top;
			
			$(document).on("mousemove",$.proxy(this.moveFn,this))
			$(document).on("mouseup",$.proxy(this.upFn,this))

		},
		moveFn:function(ev){
			
			this.y = ev.pageY - this.Y;

			this.limitFn();
			this.scale = this.y / this.maxJL;
			console.log(this.y)

			this.element.css("top",this.y);
			//内容的高度
			this.target.css({
				top:-this.scale * this.mainMaxJL
			})
		},
		upFn:function(){
			$(document).off("mousemove",this.moveFn)
			$(document).off("mouseup",this.upFn)
		},
		limitFn:function(){
			if(this.y < 0) this.y = 0;
			if(this.y > this.maxJL) this.y = this.maxJL;	
		},
		mouseWheel:function(){
			$("#main").on("mousewheel DOM",$.proxy(this.wheelFunc,this))
		},
		wheelFunc:function (ev){
			this.wheelFn(ev);
		},
		wheelFn:function(ev){
			var direction = true;

			if(ev.originalEvent.wheelDelta){  //ie和chrome
				direction = ev.originalEvent.wheelDelta > 0 ? true : false;
			}else if(ev.originalEvent.detail){ //FF
				direction = ev.detail < 0 ? true : false;
			}

			if( direction ){  //向上
				this.wheelUpFn();
			}else{  //向下
				this.wheelDownFn();
			}
		},
		wheelUpFn:function(){
			this.y = $("#scrollBar").position().top - 10;
			if(this.y < 0) this.y = 0;

			this.scale = this.y / this.maxJL;

			$("#scrollBar").css("top",this.y);

			//内容的高度
			$("#content").css({
				top:-this.scale * this.mainMaxJL
			})
		},
		wheelDownFn:function(){
			this.y = $("#scrollBar").position().top + 10;
			if(this.y > this.maxJL) this.y = this.maxJL;

			this.scale = this.y / this.maxJL;

			$("#scrollBar").css("top",this.y);

			//内容的高度
			$("#content").css({
				top:-this.scale * this.mainMaxJL
			})
		}
	}


	$.fn.scrollBar = function(options){
		new ScrollBar(this,options);
	}

})(jQuery);