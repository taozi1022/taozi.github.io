<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>皮阿诺8.8丈夫节来袭 砍价免费领4999元豪华烤箱</title>
<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx5b79a38207ecec97", "b8db57db18ababdc50243b18afde9f2a");
$signPackage = $jssdk->GetSignPackage();
?>
<?php

    $WXnickname = $WXheadimgurl = $WXoppenid = "test" ;
	/**
	 测试数据
	 $WXnickname = "WXtest" ;
	 $WXheadimgurl = "http://wx.qlogo.cn/mmopen/Q3auHgzwzM46TsQsB1a7aL2eGiaicexiavzR6VEQgvOiaEyqLefVlXZyrGtZ3t7psIEjLu9Nq2S0rn8aQbvkX1LyWws29nyeh6QvIq2dia17Zzaw/" ;
	 $WXoppenid = "wxopidtest1212" ;*/
	
	@require_once "GetUserInfo.php";
     
	
     $nickname = $WXnickname ;
     $headimage = $WXheadimgurl ;
     $wxid= $WXoppenid ;
     $source= 0 ;
     $iscare = 0 ;
     $iszhuli = 0 ;
     $tonickname = $nickname;
     $toheadimage = $headimage ;
     $towxid = $wxid;
     $tosource = $source ;
	 $discount = "200" ;
     $toid = "" ;
     $tel = "" ;
 	 $url = "" ;
     if( empty( $_GET["towxid"] )  ){
     	$url =  'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
  		if(strpos($url,"?") > 0){
     		$url =$url."&towxid=$wxid";
		}else{
			$url =$url."?towxid=$wxid";
		}	
         header("Location:$url");
		 exit;
     }else{
        $towxid = $_GET["towxid"] ;
		@require_once "dbs/show.php";
		 
     }
	 if($tel == 2){
	 	if($towxid == $wxid){
	 		echo '<img src="http://lingmaojia.oss-cn-beijing.aliyuncs.com/custum/feng.jpg" style="width:100%;">';
	 		exit;
	 	}else{
	  		if(strpos($url,"?") > 0){
	     		$url =$url."&towxid=$wxid";
			}else{
				$url =$url."?towxid=$wxid";
			}	
	         header("Location:$url");
			 exit;
	 	}
	 	
	 }
 		
?>

		<link type="text/css" rel="stylesheet" href="MK.css" />
		<script>
					
		//缩放比例
		if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
			var version = parseFloat(RegExp.$1);
			if (version > 2.3) {
				var phoneScale = parseInt(window.screen.width) / 640;
				document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
			} else {
				document.write('<meta name="viewport" content="width=640">');
			}
		} else {
			document.write('<meta name="viewport" content="width=640, user-scalable=no">');
		}
		</script>
	   
	</head>
	<body>	
		<script>
 			var USER = {
			    nickname:"<?php echo $nickname ; ?>",
			    headimage:"<?php echo $headimage ; ?>",
			    wxid: "<?php echo $wxid ; ?>",
			    towxid:"<?php echo $towxid ; ?>",
			    toid:"<?php echo $toid ; ?>",
				tonickname : "<?php echo $tonickname ; ?>",
				tosource : "<?php echo $tosource ; ?>",
				source : "<?php echo $source ; ?>",
				iskan : '<?php echo $iszhuli ; ?>',
				iscare : '<?php echo $iscare ; ?>',
				price : 4999,
				discount:(parseFloat( '<?php echo $discount ; ?>') * Math.random() ).toFixed(1) ,
				getIskan:[]
			};
			
			if(USER.tosource > USER.price ){
				USER.tosource = USER.price ;
			}
			
			console.log(USER)
			if( USER.towxid == USER.wxid ){
				 console.log("自己进入")
			}else {
				 console.log("别人的页面")
			}
			  
			//alert( "当前用户："+USER.nickname +";wxid:" +USER.wxid + ";tonickname:"+USER.tonickname + ";towxid:"+USER.towxid );
		</script>
		
		<div id="main">
			<section class="page_0" ></section>
			<section class="page_self" ></section>
			<section class="page_other"></section>
		   
		    
		    <div class="pageshare">
				<img src="img/share-line.png">
 				<div class="share_msg" >
					<p>求补刀小能手援助，我是{{nickname}}，我正在参加皮阿诺8·8丈夫节，超级顾客日全民来砍价活动，快来帮我补一刀吧！</p>
				</div>
			</div>
		</div>
		 <script src="js/jquery-1.11.3.min.js"></script>
	    <script src="js/base.js"></script>
	    <script src="js/data.js"></script>
	    <script>
  			 	  //用户无效
		  	if( !(USER.wxid==USER.towxid ) && ( USER.toid == "" ) ){
 				gotoMypage();
			}
			function gotoMypage(){
				_href =location.href ;
				_href = _href.substring(0,_href.indexOf("towxid=") )+"towxid="+USER.wxid ;
				location.href = _href ;
			}
	    </script>
	    <script src="MK.js"></script>
 	</body>
 	
 	
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
friendTitle = "皮阿诺8.8丈夫节来袭，砍价免费领4999元豪华烤箱" ;
wxShareDesc = "见证革命友谊的时刻到了，求亲友团为我砍刀，助我一臂之力赢皮阿诺4999元烤箱！" ;
wxShareTitle = "求补刀小能手，我是"+USER.nickname+"，我正在参加皮阿诺8.8丈夫节，超级顾客日全民来砍价活动，求亲友团为我砍一刀，助我一臂之力" ;
host = "" ;
wxShareImg ="http://lingmaojia.cn/h5/pianuo/img/shareicon.jpg" ;
wx.config({
	debug: false,
	appId: '<?php echo $signPackage["appId"];?>',
	timestamp:'<?php echo $signPackage["timestamp"];?>',
	nonceStr: '<?php echo $signPackage["nonceStr"];?>',
	signature: '<?php echo $signPackage["signature"];?>',
	jsApiList: [
	  'onMenuShareTimeline','onMenuShareAppMessage'
	]
});
wx.ready(function () {
	changeWXShare()
});
changeWXShare = function (){
	var _wxShareImg = host + wxShareImg ;
	// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	wx.onMenuShareTimeline({
    		title: wxShareTitle, // 分享标题
    		link: "", // 分享链接
    		imgUrl:_wxShareImg, // 分享图标
    		success: function () {

    		},
    		cancel: function () {
    		}
    	});
    	wx.onMenuShareAppMessage({
    		title:friendTitle , // 分享标题
    		desc: wxShareDesc, // 分享描述
    		link: "", // 分享链接
    		imgUrl:_wxShareImg, // 分享图标
    		success: function () {

    		},
    		cancel: function () {
    		}
    	});
}
</script>
</html>
