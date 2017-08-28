<?php
header("Access-Control-Allow-Origin: *");
//error_reporting(E_ALL ^ E_DEPRECATED);
//数据库用户名
$DBusername= "root" ;
//数据库密码
$DBpassword= "root" ;
//数据库名
$databaseName = "shuxi_choujiang" ;
//
//数据库用户名
$DBusername= "lingmao" ;
//数据库密码
$DBpassword= "lingmao2436" ;
//数据库名
$databaseName = "lingmao" ;

 
$con = mysql_connect("localhost",$DBusername,$DBpassword)  ;
 if (!$con)
{
 die('Could not connect: ' . mysql_error());
}
 //链接数据库
mysql_select_db($databaseName, $con);
mysql_query("SET NAMES UTF8");

?>

