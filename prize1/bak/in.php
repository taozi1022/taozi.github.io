<?php
    $fun = $_POST['fun'] ;

    $wxid = empty($_POST["wxid"])? "" : $_POST['wxid'] ;

    if( empty($_POST["wxid"])){die ;}

    include 'db.php';
    mysql_query("SET NAMES UTF8");

    switch($fun)
    {


        /*
        * 存储用户
        */

        case "user":
            $nickname = empty($_POST["nickname"])? "" : $_POST["nickname"];

            $headimage = empty($_POST["headimage"])? "" : $_POST['headimage'] ;
		    $name = empty($_POST["name"])? "" : $_POST['name'] ;
		    $tel= empty($_POST["tel"])? "" : $_POST['tel'] ;
            $source= empty($_POST["source"])? "" : $_POST['source'] ;

             //插入成功后返回true，失败返回false
            if( mysql_query("INSERT INTO `user`( `nickname`, `wxid`, `headimage`, `name`, `tel` , `source`) VALUES ('$nickname','$wxid','$headimage','$name','$tel','$source')") )
            {
                echo mysql_insert_id();
            }
            else
            {
                echo "error";
            }
        break;


         /*
        * care
        * 插入一条记录
         */
        case "care":
            $wxid = empty($_POST["wxid"])? "d" : $_POST['wxid'] ;

            mysql_query( "UPDATE `user` SET `iscare`=1  WHERE wxid = '$wxid'  "  );
               //插入成功后返回true，失败返回false
            if( mysql_query( $sql ) )
            {
                /*"成功".*/
                echo mysql_insert_id();

            }
            else
            {
                echo "error";
            }
        break;
		 /*
        * care
        * 插入一条记录
         */
        case "save":
            $wxid = empty($_POST["wxid"])? "d" : $_POST['wxid'] ;

            mysql_query( "UPDATE `user` SET `name`=99  WHERE wxid = '$wxid'  "  );
               //插入成功后返回true，失败返回false
            if( mysql_query( $sql ) )
            {
                /*"成功".*/
                echo mysql_insert_id();

            }
            else
            {
                echo "error";
            }
        break;
        /*
        * notes
        * 插入一条记录
         */
        case "notes":

             $nickname = empty($_POST["nickname"])? "" : $_POST["nickname"];

             $headimage = empty($_POST["headimage"])? "" : $_POST['headimage'] ;

             $wxid = empty($_POST["wxid"])? "d" : $_POST['wxid'] ;

             $source = empty($_POST["source"])? 0 : $_POST['source'] ;

             $towxid = empty($_POST["towxid"])? "dddd" : $_POST['towxid'] ;

            $sql = "INSERT INTO `notes`(`wxid`, `nickname`, `headimage`, `source`, `towxid`) VALUES ('$wxid','$nickname','$headimage',$source,'$towxid')";
               //插入成功后返回true，失败返回false
            if( mysql_query( $sql ) )
            {
                /*"成功".*/
                echo mysql_insert_id();
                /* 增加tousid数值 */
                mysql_query( "UPDATE `user` SET `source`=`source`+$source WHERE wxid = '$towxid'  "  );
            }
            else
            {
                echo "error";
            }
        break;
    }

   /* 关闭数据库链接*/
    mysql_close($con);

?>