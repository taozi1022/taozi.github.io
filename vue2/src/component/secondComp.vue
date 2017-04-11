<template>
    <div id="secondComp">
        <h1>{{dataList.title}}</h1>
        <ul>
            <li v-for="item in dataList.subjects">
                {{item.title}}
            </li>
        </ul>
    </div>
</template>
<style>
   
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue',
                dataList: []
            }
        },
        mounted: function(){
            //请求数据
            this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
                headers:{
                },
                emulateJSON:true
            }).then(function(response){
                //处理正确的回调
                this.dataList = response.data
            },function(response){
                //处理错误的回调
                console.log(response)
            })
        }
    }
</script>
