<html>
<meta charset="utf-8">
<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,  user-scalable=0,,minimal-ui" />
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta content="black" name="apple-mobile-web-app-status-bar-style" />
<meta content="email=no" name="format-detection" />
<title> 微信授权登录 </title>

<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx44c683f365bb98ac", "feab98c0721d7bd118d3838646e500ac" );
$signPackage = $jssdk->GetSignPackage();
?>

<?php
 	 @require_once "GetUserInfo.php";
	 if (isset($_COOKIE['WXoppenid']) )
	{
		$WXoppenid = $_COOKIE['WXoppenid'] ;
		$WXnickname = $_COOKIE['WXnickname']  ;
		$WXheadimgurl = $_COOKIE['WXheadimgurl']  ;
		$url =  'http://case.valuepr.net/threeVr1';
		header("Location: $url");
	}
 ?>

</body>
</html>