#css3动画#

## 背景 ##

- 设置多背景

    	background: 第一张背景, 第二张背景;
			
>多背景使用逗号分开，先写的会盖住后写的

- 设置背景大小

    	background-size:宽 高    (单位：px或%)

- 多背景定位

		background-position: x位置 y位置，x1位置 y1位置;

>多个图片定位使用逗号分开

- 设置背景尺寸

		background-size:宽 高    (单位：px或%)

- 设置背景显示区域

**background-origin**

>该属性指定了背景从哪个区域(边框、补白或内容)开始绘制,但也仅仅能控制背景开始绘制的位置，你可以用这个属性在边框上绘制背景.

		background-origin

			padding-box : 从padding区域开始显示背景。(默认值)
			border-box :  从border区域开始显示背景。
			content-box : 从content区域开始显示背景。

**background-clip**
	
>该属性指定了背景在哪些区域可以显示，但与背景开始绘制的位置无关，背景的绘制的位置可以出现在不显示背景的区域，这时就相当于背景图片被不显示背景的区域裁剪了一部分一样。
	
		background-clip

				border-box：  从border区域向外裁剪背景。 
				padding-box： 从padding区域向外裁剪背景。 
				content-box： 从content区域向外裁剪背景。 
				no-clip：     从border区域向外裁剪背景。

>详细的可以看这个介绍
	[http://www.cnblogs.com/2050/archive/2012/11/13/2768289.html](http://www.cnblogs.com/2050/archive/2012/11/13/2768289.html "css3属性中background-clip与background-origin的用法释疑")

## 渐变 ##

### 线性渐变 ###

- linear-gradient()

	**语法** 

		background:-浏览器前缀-linear-gradient([<起点> || <角度>,]? <点>, <点>…)

	**属性值**

			起点：	从什么方向开始渐变
				
			角度：	从什么角度开始渐变
				
			点：	 渐变点的颜色和位置

	**示例**

			background:linear-gradient(
							to left top,	//方向
							red,			//颜色1
							blue			//颜色2
						);

			background:linear-gradient(
							rgba(0,0,0,1) 10%,
							rgba(255,255,255,1) 10%,
							rgba(255,255,255,1) 20%,
							rgba(0,0,0,1) 20%,
							rgba(0,0,0,1) 30%
						);

>线性渐变的使用方法
[http://www.cnblogs.com/rainman/p/5113242.html](http://www.cnblogs.com/rainman/p/5113242.html "参考文档")


### 径向渐变 ###

- radial-gradient
	
	**语法** 

		background:-浏览器前缀-radial-gradient([参数1]? <color>, <color>…)

	**属性值**

		参数1：x轴的直径 Y轴的直径 at X轴坐标 Y轴坐标

	**示例**

		background:radial-gradient(
				100px 50px at top right,
				blue,
				green,
				red
			);



## 调整图片色度 ##
	
>详情[http://www.w3cplus.com/css3/ten-effects-with-css3-filter](http://www.w3cplus.com/css3/ten-effects-with-css3-filter)



## 倒影 ##

- -webkit-box-reflect

	**语法**

		-webkit-box-reflect：none | <direction> <offset>? <mask-box-image>?

	**属性值**

		none:	此值为box-reflect默认值，表示无倒影效果；

		<direction>:此值表示box-reflect生成倒影的方向，主要包括以下几个值：

		 above:	表示生成的倒影在对象（原图）的上方；
		 below:	表示生成的倒影在对象（原图）的下方；
		 left:	表示生成的倒影在对象(原图)的左侧；
		 right:	表示生成的倒影在对象(原图)的右侧；


		<offset>:	用来设置生成倒影与对象（原图）之间的间距，其取值可以是固定的像素值，也可以是百分比值，

		<mask-box-image>:	用来设置倒影的遮罩效果，可以是背景图片，也可以是渐变生成的背景图像。

		<linear-gradient>：使用线性渐变创建遮罩图像。
		<radial-gradient>：使用径向渐变创建遮罩图像

	**示例**

		-webkit-box-reflect:below 10px linear-gradient(
								rgba(0,0,0,0) 20%,
								rgba(0,0,0,1)
							);

	


## 过渡 `transition` ##

`transition`(复合属性)

		transition其属性包括
			transition-property			过渡属性(默认值为all)
			transition-duration			过渡持续时间(默认值为0s)
			transition-timing-function	过渡形式(默认值为ease函数)
			transition-delay				过渡延迟时间(默认值为0s)

>详细讲解
	[http://www.cnblogs.com/xiaohuochai/p/5347930.html](http://www.cnblogs.com/xiaohuochai/p/5347930.html)

>**贝塞尔曲线**
	[http://cubic-bezier.com](http://cubic-bezier.com)

## 动画 `animation` ##


**属性值**

		animation-name				指定要绑定到选择器的关键帧的名称
		animation-duration			动画指定需要多少秒或毫秒完成
		animation-timing-function	设置动画将如何完成一个周期
		animation-delay				设置动画在启动前的延迟间隔。
		animation-iteration-count	定义动画的播放次数。
		animation-direction			指定是否应该轮流反向播放动画。
		animation-fill-mode			规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
		animation-play-state		指定动画是否正在运行(running)或已暂停(paused)。
		initial						设置属性为其默认值。 
		inherit						从父元素继承属性。

>`animation-timing-function`详解
[http://www.w3school.com.cn/cssref/pr_animation-timing-function.asp](http://www.w3school.com.cn/cssref/pr_animation-timing-function.asp)

**示例**

	@keyframes miaov{
		0%{
			border-radius: 0;
		}
		100%{
			border-radius: 50%;	
		}
	}
	#box{
		width: 100px;
		height: 100px;
		background: red;
		animation: 2s miaov; 
		animation-name:miaov;
		animation-duration:2s;
		animation-delay:1s;
		animation-iteration-count:infinite;
		animation-direction:alternate;
	}

*`animation`结束后，会回到计算后的样式*
 


##transfrom##

`Transform`字面上就是**变形**意思。

在CSS3中`transform`主要包括以下几种：

	旋转		rotate
	移动		translate
	扭曲		skew
	缩放		scale
	矩阵变形	matrix


**旋转	rotate**

>通过指定的角度参数对原元素指定一个2D 旋转,
>
>需先有`transform-origin`定义**旋转的基点**.

	示例

		transform:rotate(30deg);

**移动	translate**

>移动`translate`我们分为三种情况：

	translate(x,y)	水平方向和垂直方向同时移动（也就是X轴和Y轴同时移动）；
	translateX(x)	仅水平方向移动（X轴移动）；
	translateY(Y)	仅垂直方向移动（Y轴移动），

>其**基点**默认为元素 中心点，也可以根据`transform-origin`进行改变基点。

示例

	transform:translate(100px,20px);
	transform:translateX(20px);
	transform:translateY(20px);
	transform:translateZ(20px);

**缩放scale**

>缩放`scale`分为三种情况：

	scale(x,y)	水平方向和垂直方向同时缩放（也就是X轴和Y轴同时缩放）；
	scaleX(x)	仅水平方向缩放（X轴缩放）；
	scaleY(Y)	仅垂直方向缩放（Y轴缩放），

示例

	transform:scale(100px,20px);
	transform:scaleX(20px);
	transform:scaleY(20px);
	transform:scaleZ(20px);

**扭曲skew**

>扭曲`skew`分为三种情况：

	skew(x,y)	水平方向和垂直方向同时扭曲（也就是X轴和Y轴同时扭曲）；
	skewX(x)	仅水平方向扭曲（X轴扭曲）；
	skewY(Y)	仅垂直方向扭曲（Y轴扭曲），
	skewZ(Y)	仅垂直方向扭曲（Y轴扭曲），

示例

	transform:skew(100px,20px);
	transform:skewX(20px);
	transform:skewY(20px);
	transform:skewZ(20PX);



>`transform`使用方法详见[http://www.w3cplus.com/content/css3-transform](http://www.w3cplus.com/content/css3-transform)



## perspective 景深 透视##

>`perspective`属性定义 3D 元素距视图的距离，以像素计。
>
>当为元素定义 `perspective` 属性时，其子元素会获得透视效果，而不是元素本身。



###实现3D效果,需要`perspective`配合`transform`使用,加动画需要配合`transition`