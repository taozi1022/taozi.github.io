/**
 * Created by shaobochen on 17/8/27.
 */
/**
 * Created by shaobochen on 17/5/29.
 */
var host = "http://lingmaojia.cn/h5/shuxichoujiang"
var apiModule = {
    ///*帮助他*/
    user : function  (param,callback){
        param = param ||  {
            wxid :window.USER.wxid,
            towxid :window.USER.towxid,
        }
        $.ajax( {
            url :host+ "/api/?f=user" ,
            data :param ,
            type : "POST" ,
            dataType: "text",
            async:true ,
            success:function(result) {
                var _result = eval("("+result+")") || {} ;
                if(callback){ callback(_result.data)}
            },
            error:function(result){
                var _result = eval("("+result+")") || {} ;
                if(callback){ callback(_result)}
            }
        } )

    },
    ///*帮助他*/
    zhuli : function  (param,callback){
        param = param ||  {
            wxid :window.USER.wxid,
            towxid :window.USER.towxid,
        }
        $.ajax( {
            url :host+ "/api/?f=zhuli" ,
            data :param ,
            type : "POST" ,
            dataType: "text",
            async:true ,
            success:function(result) {
                var _result = eval("("+result+")") || {} ;
                if(callback){ callback(_result)}
            },
            error:function(result){
                var _result = eval("("+result+")") || {} ;
                if(callback){ callback(_result)}
            }
        } )

    },
    ///*抽奖*/
    choujiang: function  (param,callback){
        param = param ||  {
            wxid :window.USER.wxid,
            nickname:window.USER.nickname
        }

        $.ajax({
            url : host+"/api/?f=choujiang" ,
            data :param,
            type : "POST" ,
            dataType : "text" ,
            async:true ,
            success:function(result) {
                var _result = eval("("+result+")") || {} ;
                if(callback){ callback(_result.data)}
            },
            error:function(result){
                console.log("shibai")
            }
        } )


    },
    ///*分享*/
    fenxiang: function  (param,callback){
        param = param ||  {
            wxid :window.USER.wxid
        }
        $.ajax( {
            url : host+"/api/?f=wxshare" ,
            data :param,
            type : "POST" ,
            dataType : "text" ,
            async:true ,
            success:function(result) {
                var _result = eval("("+result+")") || {} ;
                if(callback){ callback(_result)}
            },
            error:function(result){
                console.log("shibai")
            }
        } )
    },
    ///*填写信息*/
    addinfo: function  (param,callback){
        param = param ||  {
            wxid :window.USER.wxid,
            mobile :window.USER.mobile,
            school :window.USER.school,
            name :window.USER.name
        }
        $.ajax( {
            url : host+"/api/?f=addinfo" ,
            data :param,
            type : "POST" ,
            dataType : "text" ,
            async:true ,
            success:function(result) {

                var _result = eval("("+result+")") || {} ;
                if(callback){ callback(_result)}
            },
            error:function(result){
                console.log("shibai")
            }
        } )
    },
    ///*总榜*/
    zongbang: function  (param,callback){
        param = param ||  {
            wxid :window.USER.wxid,
        }
        $.ajax( {
            url : host+"/api/?f=zongbang" ,
            data :param,
            type : "POST" ,
            dataType : "text" ,
            async:true ,
            success:function(result) {
                var _result = eval("("+result+")") || {} ;
                if(callback){ callback(_result)}

            },
            error:function(result){
                console.log("shibai")
            }
        } )
    },
    ///*个人中奖纪录*/
    jiangpinByWxid: function  (param,callback){
        param = param ||  {
            wxid :window.USER.wxid
        }
        $.ajax( {
            url : host+"/api/?f=jiangpinByWxid" ,
            data :param,
            type : "POST" ,
            dataType : "text" ,
            async:true ,
            success:function(result) {
                var _result = eval("("+result+")") || {} ;
                if(callback){ callback(_result)}
            },
            error:function(result){
                console.log("shibai")
            }
        } )
    },
}
