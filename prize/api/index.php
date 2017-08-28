<?php
header("Access-Control-Allow-Origin: *");
@require_once "util.php";
$util = new util();

$fun = $_GET['f'] ;
$wxid = empty($_POST["wxid"])? "" : $_POST['wxid'] ;
if( empty($_POST["wxid"])){die ;}
include './dbs/db.php';
mysql_query("SET NAMES UTF8");
$current_date = date("y-m-d H:i:s",time());

switch($fun)
{

    /*
   * 获取用户基本信息
   */
    case "user":
        $towxid = empty($_POST["towxid"])? "" : $_POST['towxid'] ;
        $towxuserinfo = mysql_query("SELECT * FROM `choujiang_user` WHERE  wxid = '$towxid' ");
        $row = mysql_fetch_array($towxuserinfo);
        $results = array();
        if( !empty( $row  ) ){
            $results["id"]  = $row["id"] ;
            $results["nickname"]  = $row["nickname"] ;
            $results["headimage"] = $row["headimage"] ;
            $results["choujiang_count"] = $row["choujiang_count"] ;
            if( $towxid == $wxid){
                $results["isshare"]  = $util->istoday( $row["share_date"] )   ;
                $results["mobile"]  = $row["mobile"]    ;
                $results["school"]  =  $row["school"]   ;
                $results["name"]  =  $row["name"]   ;
            }
        }else{
            echo  $util->fail( "用户无效"  );
            return ;

        }
        /*是否帮助他*/
        $sql_iszhuli = mysql_query("SELECT * FROM `choujiang_zhuli` WHERE towxid = '$towxid' AND  wxid = '$wxid'  ");
        $row = mysql_fetch_row($sql_iszhuli);
        if( !empty( $row  ) ){
            $iszhuli = $row[0] ;
        }


        echo  $util->success( $results  );
        break;
    /*
    * 助力当前用户
    */
    case "zhuli":
        $towxid = empty($_POST["towxid"])? "" : $_POST['towxid'] ;
        $isuser  = mysql_query("SELECT * FROM `choujiang_user` WHERE  wxid = '$wxid' ");
        $row = mysql_fetch_array($isuser);
        if(!empty( $row  ) ){
            $sql =mysql_query("SELECT * FROM `choujiang_zhuli` WHERE  wxid = '$wxid' and towxid = '$towxid' " );
            $rows  = mysql_fetch_array($sql);
            if( empty( $rows  ) )
            {
                mysql_query("INSERT INTO `choujiang_zhuli`(`wxid`, `towxid` ,`create_date`  ) VALUES ('$wxid','$towxid' , 'current_date' )") ;
                /*"成功".*/
                //echo mysql_insert_id();
                /* 增加choujiang_count数值 */
                mysql_query( "UPDATE `choujiang_user` SET `choujiang_count`=`choujiang_count`+1 WHERE wxid = '$towxid'  "  );
                echo $util->success(  "助力成功"  );
                mysql_close($con);
                return ;
            }else {
                echo  $util->fail("您已经助力过了");
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
        $share_date = date("Y-m-d 00:00:00",time());
        echo $share_date;

        $isuser  = mysql_query("SELECT * FROM `choujiang_user` WHERE  wxid = '$wxid' and  share_date='$share_date'  ");
        $row = mysql_fetch_array($isuser);
        if(empty( $row  ) ){
            mysql_query( "UPDATE `choujiang_user` SET `choujiang_count`=`choujiang_count`+1 , `share_date`  = $share_date   WHERE wxid = '$wxid'  "  );
            echo $util->success("分享成功");
            mysql_close($con);
            return ;
        };
        echo  $util->fail("今天已经分享过啦");
    break;
    /*
   * care
   * 抽奖，计算抽奖比例，并存储
    */
    case "choujiang":
        $isuser  = mysql_query("SELECT * FROM `choujiang_user` WHERE  wxid = '$wxid' and  choujiang_count >0 ");
        $row = mysql_fetch_array($isuser);
        $nickname = empty($_POST["nickname"])? "" : $_POST['nickname'] ;

        if(!empty( $row  ) ){
            $jiangpin = rand(1,8) ;
            $create_date = date("Y-m-d 00:00:00",time());
            $sql = "INSERT INTO `choujiang_jiangpin`(`wxid`,`nickname`, `jiangpin` , `create_date` ) VALUES ('$wxid','$nickname','$jiangpin','$create_date')";
            if( mysql_query( $sql ) )
            {
                /*"成功".*/
                //echo mysql_insert_id();
                /* 增加choujiang_count数值 */
                mysql_query( "UPDATE `choujiang_user` SET `choujiang_count`=`choujiang_count`-1 WHERE wxid = '$wxid'  "  );
                echo $util->success(  $jiangpin );
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
    case "addinfo":
        $mobile = empty($_POST["mobile"])? "" : $_POST['mobile'] ;
        $school = empty($_POST["school"])? "" : $_POST['school'] ;
        $name = empty($_POST["name"])? "" : $_POST['name'] ;
        if(mysql_query( "UPDATE `choujiang_user` SET `mobile`= '$mobile' ,  `name`= '$name' , `school`= '$school'    WHERE wxid = '$wxid'  "  )){
            echo  $util->success(  "提交个人信息成功"  );

        }else{
            echo  $util->fail(  "提交个人信息失败"  );
        }
     break;

    /*
           * 查询榜单
           */
    case "zongbang":
        $sql_bangdan = mysql_query("SELECT *  FROM `choujiang_jiangpin` ORDER BY create_date DESC LIMIT 5 ");
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