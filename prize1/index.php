<?php
require_once "./api/jssdk.php";
$jssdk = new JSSDK("wx8c8af29e6074df3a", "2e0414462ed616a55f06344bd7a7914e");
$signPackage = $jssdk->GetSignPackage();
?>
<?php
    $WXnickname = $WXheadimgurl = $WXoppenid = "test" ;
    $towxid = "";
    $url =  'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'?';
    if(!empty( $_GET["towxid"] ) ){
        $towxid = $_GET["towxid"]  ;
        $url=$url."&";
    }
	/**
	 测试数据
	 $WXnickname = "WXtest" ;
	 $WXheadimgurl = "http://wx.qlogo.cn/mmopen/Q3auHgzwzM46TsQsB1a7aL2eGiaicexiavzR6VEQgvOiaEyqLefVlXZyrGtZ3t7psIEjLu9Nq2S0rn8aQbvkX1LyWws29nyeh6QvIq2dia17Zzaw/" ;
	 $WXoppenid = "ovM6Hv09hHPyIGn7owKhkEOxN5_A" ;
    */
	 @require_once "./api/oauth/GetUserInfo.php";
     $nickname = $WXnickname ;
     $headimage = $WXheadimgurl ;
     $wxid= $WXoppenid ;
     $iscare = false  ;
     $iszhuli = false  ;
     $userinfo = false ;
     $isshare = false  ;
     $choujiang_count = 0 ;
     $tonickname = $nickname;
     $toheadimage = $headimage ;


 	 $url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
     if( empty( $_GET["towxid"] )  ){
  		if(strpos($url,"?") > 0){
            $url =$url."&towxid=$wxid";
        }else{
            $url =$url."?towxid=$wxid";
        }
         echo "<script language='javascript' type='text/javascript'>";
         echo "window.location.href='$url'";
         echo "</script>";
         exit;
     }else{
        $towxid = $_GET["towxid"] ;
        @require_once "./api/init.php";
     }
?>
 <script>
	window.USER = {
        //当前用户的信息
		nickname:"<?php echo $nickname ; ?>",
		headimage:"<?php echo $headimage ; ?>",
		wxid: "<?php echo $wxid ; ?>" ,
        //目标用户的信息
		towxid:"<?php echo $towxid ; ?>",
		tonickname : "<?php echo $tonickname ; ?>",
		toheadimage : "<?php echo $toheadimage ; ?>",
        //抽奖次数 ，是否分享，是否助力，是否关注
        userinfo:"<?php echo $userinfo; ?>",  //不需要显示提交信息部分
        choujiang_count : '<?php echo $choujiang_count ; ?>',
        isshare : '<?php echo $isshare ; ?>',
        iszhuli :'<?php echo $iszhuli ; ?>',
		iscare : '<?php echo $iscare ; ?>',
	};
</script>

<?php
    include_once('home.html');
?>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
    $(function () {
        friendTitle = "书戏抽奖" ;
        wxShareDesc = "见证革命友谊的时刻到了，求助力抽奖" ;
        wxShareTitle = "书戏教育100%中奖" ;
        shareHost = "" ;
        link = "http://lingmaojia.cn/h5/shuxichoujiang/?towxid="+USER.towxid
        wxShareImg =USER.headimage ;
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
            var _wxShareImg = shareHost + wxShareImg ;
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
    })
</script>

</html>

