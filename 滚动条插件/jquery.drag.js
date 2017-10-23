;(function($){
	
	//构造函数
	/*

		element  被拖动的元素
	*/
	function Drag(element,options){

		this.defaults = {
			limit:false
		}


		$.extend(true,this.defaults,options);	//克隆一份传过来的对象

		//自定义拖拽范围的话,将limit设置为false,传过来的xy限制范围要比limit的权限高

		if($.isPlainObject(this.defaults.x) || $.isPlainObject(this.defaults.y) ){
			this.defaults.limit = false;
		}


		this.element = element;

		this.X = this.Y = 0;	
		//目标元素
		this.target = this.defaults.moveObj && $(this.defaults.moveObj) || this.element;
		//自定义事件处理的状态
		this.status = 0;	//初始值
		this.init();
	}


	Drag.prototype = {
		constructor:Drag,	//构造函数指回Drag
		//初始化
		init:function(){
			//给目标元素绑定down事件处理,并且将this指向被拖拽元素
			this.element.on("mousedown",$.proxy(this.downFn,this));
		},
		downFn:function(ev){

			this.X = ev.pageX - this.target.offset().left;
			this.Y = ev.pageY - this.target.offset().top;
			this.status = 1;	//初始值

			this.dragStatusFn();
			$(document).on("mousemove",$.proxy(this.moveFn,this))
			$(document).on('mouseup',$.proxy(this.upFn,this));
			ev.preventDefault();
			
		},
		moveFn:function(ev){
			
			this.x = ev.pageX - this.X;
			this.y = ev.pageY - this.Y;
			this.status = 2;	//初始值

			this.limitFn();

			this.dragStatusFn();

			this.target.css({
				left:this.x,
				top:this.y
			})
		},
		upFn:function(){
			this.status = 3;	//初始值
			this.dragStatusFn();
			$(document).off("mousemove",this.moveFn)
			$(document).off('mouseup',this.upFn);
		},
		limitFn:function(){
			var minX = 0,maxX = 0,minY = 0,maxY = 0;

			if(this.defaults.limit){	//传过来的limit参数为true,限制范围
				//可视区的宽高
				var clientW = $(window).width();
				var clientH = $(window).height();

				minX = minY = 0;
				maxX = clientW - this.element.outerWidth();
				maxY = clientH - this.element.outerHeight();
			}

			if($.isPlainObject(this.defaults.x)){
				minX = this.defaults.x.min;
				maxX = this.defaults.x.max;
			}
			if($.isPlainObject(this.defaults.y)){
				minY = this.defaults.y.min;
				maxY = this.defaults.y.max;
			}

			//限制范围
			if(this.x < minX) this.x = minX;
			if(this.y < minY) this.y = minY;
			if(this.x > maxX) this.x = maxX;
			if(this.y > maxY) this.y = maxY;
		},
		dragStatusFn:function(){
			switch( this.status ){
				case 1: this.element.trigger("start");
				break;
				case 2: this.element.trigger("move");
				break;
				case 3: this.element.trigger("end");
				break;
			}
		}
	}

	$.fn.drag = function(options){
		new Drag(this,options);
	}

})(jQuery);