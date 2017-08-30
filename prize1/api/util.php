<?php
    class util {

        /**
         * 判断是否今天
         *
         */
        public function istoday ( $data =  '' ){
            // 截取日期部分，摒弃时分秒
            $b = substr($data,0,10);
            // 获取今天的日期，格式为 YYYY-MM-DD
            $c = date('Y-m-d');
            // 使用IF当作字符串判断是否相等
            if($b==$c){
               return true  ;
            }
            return false   ;
        }

        /**
         * 返回成功
         */
        public function success ( $data = ''  ){
            $result = array(
                "status" => 200,
                 "data"=> $data ,
                 "message" => 'success'
             );
             return json_encode( $result );
        }

        /**
         *
         * 返回失败
         */
        public function fail ( $massage = ''  ){
            $result = array(
                 "status" => 201,
                 "data"=> null ,
                 "message" => $massage
             );
             return json_encode( $result );

        }

        /**
         * Http方法
         *
         */
        public function http($url)
        {
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_HEADER, false);
            $output = curl_exec($ch);//输出内容
            curl_close($ch);
            return array($output);
        }
        /**
         * Http方法
         *
         */
        function https_request($url,$data,$type){
            if($type=='json'){//json $_POST=json_decode(file_get_contents('php://input'), TRUE);
                $headers = array("Content-type: application/json;charset=UTF-8","Accept: application/json","Cache-Control: no-cache", "Pragma: no-cache");
                $data=json_encode($data);
            }
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
            if (!empty($data)){
                curl_setopt($curl, CURLOPT_POST, 1);
                curl_setopt($curl, CURLOPT_POSTFIELDS,$data);
            }
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt( $curl , CURLOPT_HTTPHEADER, $headers );
            $output = curl_exec($curl);
            curl_close($curl);
            return $output;
        }
        /**
         * Curl版本
         * 使用方法：
         * $post_string = "app=request&version=beta";
         * request_by_curl('http://www.jb51.net/restServer.php', $post_string);
         */
        function http_post($remote_server, $post_string) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $remote_server);
            curl_setopt($ch, CURLOPT_POSTFIELDS, 'mypost=' . $post_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_USERAGENT, "jb51.net's CURL Example beta");
            $data = curl_exec($ch);
            curl_close($ch);

            return $data;
        }




    }
?>
