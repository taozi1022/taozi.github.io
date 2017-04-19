/**
 * Created by 146422 on 2017/4/11.
 */

export default ({
    data: function(){
        return {
            moviesData: [],
            isLoading:true
        }
    },
    mounted: function(){
        var _ = this;
        _.isLoading=true
        this.$http.jsonp('https://api.douban.com/v2/movie/top250?start='+2*9+'&count=9',{},{
            headers:{},
            emulateJSON: true
        }).then(function(response){
            //执行回调正确的函数
            _.moviesData = response.data.subjects;
            _.isLoading = false;
            // moviesList.innerHTML = _.render(response.data.subjects)
        },function(response){
            //执行回调错误的函数
            console.log("cuowu")
        })
    },
    methods:{
        render: function(data){
            console.log(data)
            var html = "";
            for(var i = 0; i < data.length; i++){
                console.log(data[i].images.medium)
                if(!html){
                    html = '<li>'+
                                '<a href="'+data[i].alt+'">'+
                                    '<img src="'+data[i].images.medium+'" alt="">'+
                                    '<p class="name">'+data[i].title+'</p>'+
                                '</a>'+
                            '</li>'
                }else{
                    html += '<li>'+
                        '<a href="'+data[i].alt+'">'+
                        '<img src="'+data[i].images.medium+'" alt="">'+
                        '<p class="name">'+data[i].title+'</p>'+
                        '</a>'+
                        '</li>'
                }
            }
            return html;
        }
    }

});
