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
	 $WXoppenid = "wxopidtest1212" ;
     */
	@require_once "./api/oauth/GetUserInfo.php";
     $nickname = $WXnickname ;
     $headimage = $WXheadimgurl ;
     $wxid= $WXoppenid ;
     $iscare = false  ;
     $iszhuli = false  ;
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
        userinfo:true,  //不需要显示提交信息部分
        choujiang_count : '<?php echo $choujiang_count ; ?>',
        isshare : '<?php echo $isshare ; ?>',
        iszhuli : '<?php echo $iszhuli ; ?>',
		iscare : '<?php echo $iscare ; ?>',
	};
</script>

<?php
    include_once('home.html');
?>
</html>