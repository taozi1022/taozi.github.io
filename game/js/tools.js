/*------------获取id,class,tagName-----------------*/
function $(select,context){
	context = context || document;
	var firstChar = select.charAt(0);//将传过来的参数赋给firstChar
	//进行判断
	if( firstChar === "#" ){//如果第一位字符是#号,说明传进来的时id
		return document.getElementById(select.substring(1));//从传过来的第一个字符开始算起
	}else if( firstChar === "." ){
		return context.getElementsByClassName(select.substring(1));//获取class
	}else{
		return context.getElementsByTagName(select);//获取标签名
	}
}



//获取计算后的样式
function getStyle(obj,attr){     //获取样式
	if( obj.currentStyle ){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
};



function shake(obj,attr,speed,callBack){                          //抖动
	//if(obj.timer) return;   // 如果定时器还在运行则不执行函数
	var n = 0;				// 变量 n 用来控制数组的第 n 项
	var arr = [];
	console.log(speed);			// 生成空的数组用来储存 设置的抖动范围
	for( var i = speed; i>0 ; i -= 3){

		arr.push(-i,i)         
	}
	arr.push(0);            //循环生成数组内容 并在数组的最后一个值加入 0 时期在最后回到初始位置
	var num = parseFloat(getStyle(obj,attr));  //获取 obj[attr] 的值
	obj.timer = setInterval(function(){        //生成定时器
		obj.style[attr] = num + arr[n] + 'px'; //把数组的 第n个值 赋给 obj[attr]
		n++;									// 增加n 值 为下次获取 数组的下一个值
		if( n > arr.length-1 ){           
			clearInterval( obj.timer );         //如果循环到数组的最后一个值 则停止定时器 并清空 obj.timer 的值
			obj.timer = null;
			if( typeof callBack === 'function' ){
				callBack();
			};
		}
	},30)
};

/*20160810--DOM*/
/*判断某个元素身上是否有class*/
function hasClass(element,classNames){
	var classAll = element.className.split(" ");		//将用空格分割好的class存成数组;
	for(var i = 0; i < classNames.length; i++){			//循环数组中的每一项
		if(classNames[i] === classNames){				//判断classNames是否存在于数组中,
			return true;								//存在的话,返回true
		}
	}
	return false;										//不存在的话,返回false
}

//删除某个元素身上的class
function removeClass(element,classNames){
	var classAll = element.className;		//将用空格分割好的class存成数组;
	
	if( hasClass(element,classNames) ){		//如果元素身上有这个class,再进行删除
		var classAll = element.className.split(" ");		//将用空格分割好的class存成数组;
		
		for(var i = 0; i < classAll.length; i++){
			if(classAll[i]===classNames){
				classAll.splice(i,1);
				i--;
			}
		}
		
		if(classAll.length ===0){
			element.removeAttribute("class");
		}else{
			element.className = classAll.join(" ");
		}
		
	}
	
}

