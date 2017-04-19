<template>
    <div>
        <div id="movies">
            <header>
                <p class="title">豆瓣</p>
                <nav>
                    <span style="color: #2384E8;">电影</span>
                    <span style="color: #9F7860;">图书</span>
                    <span style="color: #E4A813;">广播</span>
                    <span style="color: #2AB8CC;">小组</span>
                </nav>
            </header>
        </div>
        <div class="content">
            <p class="contentTitle">豆瓣电影排行榜</p>
            <ul class="moviesList clearFix" id="moviesList">
                <li v-for="item in moviesData">
                    <a :href="item.alt">
                        <img :src="item.images.medium" alt="">
                        <p class="name">{{item.title}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <img v-show="isLoading" id="loading" src="../assets/loading.gif" alt="">
    </div>
</template>

<script>
    import js from "../js/movies";
    export default js
</script>
<style>
    header{
        height: 46px;
        padding: 0 10px;
        border-bottom: 1px solid #f3f3f3;
    }
    header .title{
        float: left;
        line-height: 46px;
        font-size: 22px;
        color: #00b41d;
    }
    header nav{
        float: right;
        height: 46px;
        line-height: 46px;
    }
    header nav span{
        float: left;
        display: block;
        padding: 0 10px;
    }
    .clearFix:after{
        display: block;
        content: '';
        clear: both;
    }

    .content{
        width:100%;
    }
    .contentTitle{
        line-height:44px;
        padding-left:10px;
        font-size: 20px;
        color: #0bdcda;
    }
    .moviesList {
        width:350px;
        margin: 0 auto;
    }

    .moviesList li{
        float: left;
        width: 100px;
        padding:0 8px;
    }
    .moviesList li img{
        width:100px;
        height:145px;
        overflow: hidden;
    }
    li .name{
        width:100px;
        height:26px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        text-align: center;
        font-size:14px;
        line-height:26px;
    }
    #loading{
        width:50px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
</style>

