<?php

header("Content-type: text/html; charset=utf-8");//设置编码
 date_default_timezone_set('Asia/Shanghai'); 
 
		 $url = "http://finance.api51.cn/chart?candle_period=".$_GET['candle_period']."&data_count=".$_GET['data_count']."&prod_code=".$_GET['prod_code'];//请求地址，暂不支持https,后期可能支持，请留意 
 
 
 
 
			$content = juhecurl($url);
// var_dump($content);
  
		echo $content;	
 
 
//echo json_encode($data);

 
/**
 * 请求接口返回内容
 * @param  string $url [请求的URL地址]
 * @param  string $params [请求的参数]
 * @param  int $ipost [是否采用POST形式]
 * @return  string
 */
function juhecurl($url,$params=false,$ispost=0){
    $httpInfo = array();
    $ch = curl_init();
 $appcode = "68bfe07adc3e45f389c6d79044821f1b";//购买后可获得 
$headers = array(); 
array_push($headers, "Authorization:APPCODE " . $appcode); 
    curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
    curl_setopt( $ch, CURLOPT_USERAGENT , 'JuheData' );
    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 60 );
    curl_setopt( $ch, CURLOPT_TIMEOUT , 60);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    if( $ispost )
    {
        curl_setopt( $ch , CURLOPT_POST , true );
        curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
        curl_setopt( $ch , CURLOPT_URL , $url );
    }
    else
    {
        if($params){
            curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
        }else{
            curl_setopt( $ch , CURLOPT_URL , $url);
        }
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    }
    $response = curl_exec( $ch );
    if ($response === FALSE) {
        //echo "cURL Error: " . curl_error($ch);
        return false;
    }
    $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
    $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
    curl_close( $ch );
    return $response;
}