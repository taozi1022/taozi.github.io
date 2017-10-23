;(function($){


	function ScrollBar(element,options){
		this.defaults = options;

		this.element = element;

		this.Y = 0;	
		//目标元素
		this.target = this.defaults.moveObj && $(this.defaults.moveObj) || this.element;
		//自定义事件处理的状态
		this.init();
	}

	ScrollBar.prototype = {
		constructor:ScrollBar,
		init:function(){
			//给目标元素绑定down事件处理,并且将this指向被拖拽元素
			this.element.on("mousedown",$.proxy(this.downFn,this));
		},
		downFn:function(ev){
			this.Y = ev.pageY - this.target.offset().top;
			
			$(document).on("mousemove",$.proxy(this.moveFn,this))
			$(document).on("mouseup",$.proxy(this.upFn,this))

		},
		moveFn:function(ev){
			this.y = ev.pageY - this.Y;

			this.limitFn();

			//滚动条的高度
			this.element.css({
				top:this.y
			})
			//内容的高度
			this.target.css({
				top:-this.y/this.defaults.scrollbar.max * this.defaults.content.max
			})
		},
		upFn:function(){
			$(document).off("mousemove",this.moveFn)
			$(document).off("mouseup",this.upFn)
		},
		limitFn:function(){
			if(this.y < 0) this.y = this.defaults.scrollbar.min;
			if(this.y > this.defaults.scrollbar.max) this.y = this.defaults.scrollbar.max;	
		}
	}


	$.fn.scrollBar = function(options){
		new ScrollBar(this,options);
	}



})(jQuery);