
<?php
	/**
	 * 微信登陆
	 */
	// 读取cookie判断是否登陆
	if (isset($_COOKIE['WXoppenid']) )
	{
		$WXoppenid = $_COOKIE['WXoppenid'] ;
		$WXnickname = $_COOKIE['WXnickname']  ;
		$WXheadimgurl = $_COOKIE['WXheadimgurl']  ;
		return ;
	}else{
		//未登录
		@require_once "Oauth2.php";
		$wxapi = new Wxapi();
		//$code = $_GET['code'];
		//$get = $_GET['param'];
		//$jump = $_GET['jump'];
		//判断code是否存在
		if(!empty($_GET['param']) &&  $_GET['param'] =='access_token' && !empty( $_GET['code'] )){
			$code = $_GET['code'];
			$json = $wxapi->get_access_token($code);
			if(!empty($json)&& !$json['errcode'] ){
				$openid =  $json['openid'] ;
				$userinfo = $wxapi->get_user_info($json['access_token'],$json['openid']);
				$WXoppenid = $userinfo["openid"] ;
				$WXnickname = $userinfo["nickname"] ;
				$WXheadimgurl = substr($userinfo["headimgurl"],0,strlen($userinfo["headimgurl"])-1);
				//此时头像缺少后缀,用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
				setcookie("WXoppenid", $WXoppenid );
				setcookie("WXnickname",$WXnickname );
				setcookie("WXheadimgurl",$WXheadimgurl );
                return  ;
			}
		}
        $url =$url."param=access_token";
        $REDIRECT_URI = $url;
       /*静默登陆*/
        $scope='snsapi_base';
       /*授权登陆*/
        $scope_info='snsapi_userinfo';
        $wxapi->get_authorize_url($REDIRECT_URI,$scope_info,'STATE');
	}
?>