<?php
header("Access-Control-Allow-Origin: *");

    @require_once "util.php";
    $util = new util();

    $fun = $_GET['f'] ;
    $wxid = empty($_POST["wxid"])? "" : $_POST['wxid'] ;
    if( empty($_POST["wxid"])){die ;}

    include 'db.php';
    mysql_query("SET NAMES UTF8");
    switch($fun)
    {
        /*
        * 查询榜单
        */
        case "zongbang":
            $sql_bangdan = mysql_query("SELECT *  FROM `choujiang_jiangpin` ORDER BY create_date DESC LIMIT 100 ");
            $results = array();
            while ($rows = mysql_fetch_array($sql_bangdan)) {
                $results[] = $rows;
            }
            // 将数组转成json格式
            echo $util->success( $results ) ;
              // 释放结果
             mysql_free_result($sql_bangdan);
             return ;
        break;
        /*
        * notes
        * 查询助力详情
         */
        case "jiangpinByWxid":
            $sql_bangdan = mysql_query("SELECT *  FROM `choujiang_jiangpin` WHERE  wxid='$wxid'  ");
            $results = array();
            while ($rows = mysql_fetch_array($sql_bangdan)) {
                $results[] = $rows;
            }
            // 将数组转成json格式
            echo $util->success( $results ) ;
            // 释放结果
            mysql_free_result($sql_bangdan);
            return ;
        break;
    }
   /* 关闭数据库链接*/
    mysql_close($con);

?>