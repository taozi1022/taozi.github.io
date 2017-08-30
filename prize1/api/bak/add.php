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
    * 助力当前用户
    */
    case "zhuli":
        $towxid = empty($_POST["towxid"])? "" : $_POST['towxid'] ;
        $isuser  = mysql_query("SELECT * FROM `choujiang_user` WHERE  wxid = '$wxid' ");
        $row = mysql_fetch_array($isuser);
        if(!empty( $row  ) ){
            $sql = "INSERT INTO `choujiang_zhuli`(`wxid`, `towxid` ) VALUES ('$wxid','$towxid')";
            if( mysql_query( $sql ) )
            {
                /*"成功".*/
                //echo mysql_insert_id();
                /* 增加choujiang_count数值 */
                mysql_query( "UPDATE `choujiang_user` SET `choujiang_count`=`choujiang_count`+1 WHERE wxid = '$towxid'  "  );
                echo $util->success(  "success"  );
                mysql_close($con);
                return ;
            }
        };
        echo  $util->fail("助力失败，可能是用户非法");
        break;
    /*
    * care
    * 分享
     */
    case "wxshare":
         $isuser  = mysql_query("SELECT * FROM `choujiang_user` WHERE  wxid = '$wxid' ");
        $row = mysql_fetch_array($isuser);
        if(!empty( $row  ) ){
            $share_date = date("y-m-d",time());
            $sql = "INSERT INTO choujiang_user(   wxid , create_date) SELECT '$wxid','$share_date' FROM DUAL WHERE NOT EXISTS(SELECT wxid FROM choujiang_user WHERE wxid = '$wxid' and  create_date!='$share_date' )  )";
            if( mysql_query( $sql ) )
            {
                /*"成功".*/
                //echo mysql_insert_id();
                /* 增加choujiang_count数值 */
                mysql_query( "UPDATE `choujiang_user` SET `choujiang_count`=`choujiang_count`+1 WHERE wxid = '$towxid'  "  );
                echo $util->success(mysql_insert_id());
                mysql_close($con);
                return ;


            }
        };
        echo  $util->fail("今天已经分享过了");
    break;
    /*
   * care
   * 抽奖，计算抽奖比例，并存储
    */
    case "choujiang":
        $isuser  = mysql_query("SELECT * FROM `choujiang_user` WHERE  wxid = '$wxid' and  choujiang_count >1 ");
        $row = mysql_fetch_array($isuser);
        if(!empty( $row  ) ){
            $jiangpin = 1 ;
            $sql = "INSERT INTO `choujiang_jiangpin`(`wxid`, `jiangpin` ) VALUES ('$wxid','$jiangpin')";
            if( mysql_query( $sql ) )
            {
                /*"成功".*/
                //echo mysql_insert_id();
                /* 增加choujiang_count数值 */
                mysql_query( "UPDATE `choujiang_user` SET `choujiang_count`=`choujiang_count`-1 WHERE wxid = '$towxid'  "  );
                echo $util->success(  "success"  );
                mysql_close($con);
                return ;
            }
        };

        echo  $util->fail("无效的抽奖");
     break;
    /*
 * care
 * 抽奖，计算抽奖比例，并存储
  */
    case "userinfo":
        if(mysql_query( "UPDATE `choujiang_user` SET `choujiang_count`=`choujiang_count`-1 WHERE wxid = '$towxid'  "  )){
            echo  $util->success(  "success"  );

        }else{
            echo  $util->fail(  "插入失败"  );
        }
     break;
    }
/* 关闭数据库链接*/
mysql_close($con);

?>