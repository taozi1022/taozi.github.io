<?php
    header("Access-Control-Allow-Origin: *");
    include 'dbs/db.php';
    @require_once "util.php";
    $util = new util();
      //插入成功后返回true，失败返回false
      $create_date = date("y-m-d H:i:s",time());
      mysql_query("INSERT INTO choujiang_user( nickname, wxid, headimage,create_date) SELECT '$nickname','$wxid','$headimage','$create_date' FROM DUAL WHERE NOT EXISTS(SELECT wxid FROM choujiang_user WHERE wxid = '$wxid' )") ;

      $towxuserinfo = mysql_query("SELECT * FROM `choujiang_user` WHERE  wxid = '$towxid' ");
      $row = mysql_fetch_array($towxuserinfo);
      if( !empty( $row  ) ){
          $toid = $row["id"] ;
          $tonickname = $row["nickname"] ;
          $toheadimage = $row["headimage"] ;
          $mobile = $row["mobile"] ;
          $choujiang_count = $row["choujiang_count"] ;
          $isshare = $util->istoday( $row["share_date"] )   ;
       }

      /*是否帮助他*/
      $sql_iszhuli = mysql_query("SELECT * FROM `choujiang_zhuli` WHERE towxid = '$towxid' AND  wxid = '$wxid'  ");
      $row = mysql_fetch_row($sql_iszhuli);
      if( !empty( $row  ) ){
          $iszhuli = $row[0] ;
      }
        // 释放结果
        mysql_free_result($sql_iszhuli);
        /* 关闭数据库链接*/
        mysql_close($con);

?>
