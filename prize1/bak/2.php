<?php
require_once "./api/jssdk.php";
$jssdk = new JSSDK("wx44c683f365bb98ac", "feab98c0721d7bd118d3838646e500ac");
$signPackage = $jssdk->GetSignPackage();
?>
<?php
    $WXnickname = $WXheadimgurl = $WXoppenid = "test" ;
    $towxid = "";
    $url =  'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    if(!empty( $_GET["towxid"] ) ){
        $towxid = $_GET["towxid"]  ;
        $url=$url."&";
    }
	/**
	 测试数据
	 $WXnickname = "WXtest" ;
	 $WXheadimgurl = "http://wx.qlogo.cn/mmopen/Q3auHgzwzM46TsQsB1a7aL2eGiaicexiavzR6VEQgvOiaEyqLefVlXZyrGtZ3t7psIEjLu9Nq2S0rn8aQbvkX1LyWws29nyeh6QvIq2dia17Zzaw/" ;
	 $WXoppenid = "wxopidtest1212" ;*/

	 @require_once "./api/GetUserInfo.php";
   
     $nickname = $WXnickname ;
     $headimage = $WXheadimgurl ;
     $wxid= $WXoppenid ;
     $source= 0 ;
     $iscare = 0 ;
     $iszhuli = 0 ;
     $userCount = 0 ;
     $tonickname = $nickname;
     $toheadimage = $headimage ;

     $tosource = $source ;
	 $discount = "200" ;
     $toid = "" ;
     $tel = "" ;
 	 $url = "" ;
     if( empty( $_GET["towxid"] )  ){

  		if(strpos($url,"?") > 0){
        $url =$url."&towxid=$wxid";
        }else{
        $url =$url."?towxid=$wxid";
        }

        header("Location:$url");
        exit;
        }else{

        $towxid = $_GET["towxid"] ;
        @require_once "./api/dbs/show.php";

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
 <script>
	window.USER = {
		nickname:"<?php echo $nickname ; ?>",
		headimage:"<?php echo $headimage ; ?>",
		wxid: "<?php echo $wxid ; ?>" ,
		towxid:"<?php echo $towxid ; ?>",
		toid:"<?php echo $toid ; ?>",
		tonickname : "<?php echo $tonickname ; ?>",
		toheadimage : "<?php echo $toheadimage ; ?>",
		tosource : parseInt( "<?php echo $tosource ; ?>" ),
		source : "<?php echo $source ; ?>",
		iskan : '<?php echo $iszhuli ; ?>',
		iscare : '<?php echo $iscare ; ?>',
		price : 68000,
		discount:(parseFloat( '<?php echo $discount ; ?>') * Math.random() ).toFixed(0) ,
		getIskan:[],
		userCount:  '<?php echo $userCount ; ?>',
		ifstart:true
	};

	if(USER.towxid=="test" ){
		USER.towxid = USER.wxid
		USER.tonickname = USER.nickname
		USER.toheadimage = USER.toheadimage
		USER.tosource = USER.source
	}
	if(USER.tosource > USER.price ){
		USER.tosource = USER.price ;
	}
   
</script>

<script>
	var priceType = [
			18000,
			38000,
			68000
	]


    function yaoqing(){
        $(".pageshare").slideDown();
    }
    function quxiaoyaoqing(){
        $(".pageshare").slideUp();
    }

	window.onload=function(){
		//1496534399 = 2017年06月03日23:59
		ShowCountDown(2017,6,4,'times');
		setTouxinag();
		setJiage(0);
		setBtn();
		getIskan();
		$(".fidinfo").fadeOut();
		$(".my-paihangbang").hide();

	}
	function ShowCountDown(year,month,day,divname)
	{
		var now = new Date();
		var endDate = new Date(year, month-1, day);
		var leftTime=endDate.getTime()-now.getTime();
		var leftsecond = parseInt(leftTime/1000);
		var day1=Math.floor(leftsecond/(60*60*24));
		var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
		var cc = document.getElementById(divname);
		
		cc.innerHTML = "<span>活动剩余时间</span> <em>"+day1+"天"+hour+"小时"+minute+"分"+second+"秒</em>";
		var interval = 1000;
		window.setTimeout(function(){ShowCountDown(year,month,day,divname);}, interval);

	}
	function setTouxinag(){
		$(".inner .names").text(USER.tonickname);
		$(".inner .home_top img").attr("src",USER.toheadimage );
	}
	function paihang(n){
			$(".zong-paihangbang").hide();
			$(".my-paihangbang").hide();

		if(n==1){
			$(".zong-paihangbang").hide();
			$(".my-paihangbang").show();
		}else{
			$(".my-paihangbang").hide();
			$(".zong-paihangbang").show();
		}
	}

	function zhuli(n){
		switch (n){
			//帮助他
			case 1 :
                $(".tankuang .info .fen").text(USER.discount);
				$(".tankuang").show();
                $(".huodomll").removeClass("huodomll-2").removeClass("huodomll-1").addClass("huodomll-3");
                setJiage( USER.discount  );

				/*数据提交到后台*/
                $.post("api/dbs/in.php", {
                    fun: "notes",
                    nickname: USER.nickname,
                    headimage: USER.headimage,
                    wxid: USER.wxid,
                    source: USER.discount,
                    towxid: USER.towxid
                }, function(result) {

                     getIskan();
                });
				break;
			//我要参加
			case 2 :

                if (USER.wxid != USER.towxid){
                     location.href="http://lingmaojia.cn/h5/qiangqian/?towxid="+USER.wxid ;
                }
		}


	}

    function setBtn(){
        //自己进入并且未注册
        if (USER.wxid == USER.towxid && USER.toid == "") {
            ///*数据提交到后台 c存储当前用户*/
            $.post("api/dbs/in.php", {
                fun: "user",
                name: "",
                tel: "",
                nickname: USER.nickname,
                headimage: USER.headimage,
                wxid: USER.wxid,
                source:  0 ,
            }, function(result) {
                USER.toid == "已存在";
                setJiage(0);
		getIskan();
            });
        }
	if(!USER.ifstart){
		$(".huodomll").hide();
	}else
        if( USER.wxid == USER.towxid  &&USER.iskan==0  ){
             $(".huodomll").removeClass("huodomll-2").removeClass("huodomll-3").addClass("huodomll-1");
        }else if( USER.towxid == USER.wxid && USER.iskan>0 ){
			$(".huodomll").removeClass("huodomll-2").removeClass("huodomll-3").addClass("huodomll-1");
        }else if( USER.towxid != USER.wxid && USER.iskan>0 ){
            $(".huodomll").removeClass("huodomll-2").removeClass("huodomll-1").addClass("huodomll-3");
        }else if(USER.towxid != USER.wxid && USER.iskan==0){
            $(".huodomll").removeClass("huodomll-3").removeClass("huodomll-1").addClass("huodomll-2");
        }




    }
	function  setJiage(discount){
		$(".times_2").html( "<p>本活动已有"+USER.userCount+"人参加</p>"   );
		//USER.discount
		$(".mian_ulx2_1 .lx2 p").text(  ( (USER.tosource/priceType[2]*priceType[0]) + discount/priceType[2]*priceType[0]).toFixed(0)  );
		$(".mian_ulx2_1 .lx3 p").text(  ( priceType[0] +500+ (USER.tosource/priceType[2]*priceType[0]   ) - discount/priceType[2]*priceType[0] ).toFixed(0) );

		$(".mian_ulx2_2 .lx2 p").text( (  (USER.tosource/priceType[2]*priceType[1])  +discount/priceType[2]*priceType[1] ) .toFixed(0) );
		$(".mian_ulx2_2 .lx3 p").text( (  priceType[1] +4000+ (USER.tosource/priceType[2]*priceType[1]   )  -discount/priceType[2]*priceType[1]).toFixed(0)  );

		$(".mian_ulx2_3 .lx2 p").text( ( (USER.tosource/priceType[2]*priceType[2]) +discount/priceType[2]*priceType[2] ) .toFixed(0) );
		$(".mian_ulx2_3 .lx3 p").text( (  priceType[2] +10000+ (USER.tosource/priceType[2]*priceType[2])  - discount/priceType[2]*priceType[2] ).toFixed(0) );
	}
    function tankuangHide(){
        $(".tankuang").hide();
    }
	function getIskan() {
		/*查询 助力 数据*/
		$.post("api/dbs/select.php", {
			fun: "notes",
			towxid: USER.towxid
		}, function(result) {
			result = eval('(' + result + ')');
			console.log(result)
            var _html = ""
            for (var i in result) {
                _html += '<li  class="li_' + i + '"  ><a href="http://lingmaojia.cn/h5/qiangqian/?towxid='+result[i].wxid+'">';
                _html += '<div class="pic fl"><img src="' + result[i].headimage + '96" alt=""></div>';
                _html += '<div class="text fl"><p>' + (result[i].nickname).replace(/\?{4}/g, "⭐️")+ '</p></div>';
                _html += '<div class="text text_2 fr"><p>' + result[i].source + '<em>元</em></p>';
                _html += '</a></li>';
            }
            $(".my-paihangbang").html(_html);
            getBang();
		});
	}
	function getBang() {
    		/*查询 助力 数据*/
    		$.post("api/dbs/select.php", {
    			fun: "bangdan",
    			towxid: USER.towxid
    		}, function(result) {
    			result = eval('(' + result + ')');
                var _html = ""

                for (var i in result) {
                    _html += '<li  class="li_' + i + '"><a href="http://lingmaojia.cn/h5/qiangqian/?towxid='+result[i].wxid+'">';
                    _html += '<div class="pic fl"><img src="' + result[i].headimage + '96" alt=""></div>';
                    _html += '<div class="text fl"><p>' + (result[i].nickname).replace(/\?{4}/g, "⭐️")+ '</p></div>';
                    _html += '<div class="text text_2 fr"><p>' + result[i].source + '<em>元</em></p>';
                    _html += '</a></li>';
                }
                $(".zong-paihangbang").html(_html);
    		});
    	}
</script>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
friendTitle = "书戏教育530端午节送学费啦，最高可抢万元学费！" ;
wxShareDesc = "见证革命友谊的时刻到了，求亲友帮娃儿抢学费！从未见他如此喜爱英语！" ;
wxShareTitle = "书戏教育530端午节送学费啦，最高可抢万元学费！" ;
host = "" ;
link = "http://lingmaojia.cn/h5/qiangqian/?towxid="+USER.towxid
wxShareImg ="http://lingmaojia.cn/h5/qiangqian/shareicon.jpg" ;
wx.config({
	debug: false,
	appId: '<?php echo $signPackage["appId"];?>',
	timestamp: '<?php echo $signPackage["timestamp"];?>',
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
    		link: link, // 分享链接
    		imgUrl:_wxShareImg, // 分享图标
    		success: function () {

    		},
    		cancel: function () {
    		}
    	});
    	wx.onMenuShareAppMessage({
    		title:friendTitle , // 分享标题
    		desc: wxShareDesc, // 分享描述
    		link: link , // 分享链接
    		imgUrl:_wxShareImg, // 分享图标
    		success: function () {

    		},
    		cancel: function () {
    		}
    	});
}
</script>
</html>