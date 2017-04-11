<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <firstComp></firstComp>
        <secondComp></secondComp>
        <router-view class="view"></router-view>
        <ul>
            <li>
                <router-link to="/first">第一个</router-link>
            </li>
            <li>
                <router-link to="/second">第二个</router-link>
            </li>
        </ul>

    </div>
</template>

<script>
    import firstComp from './component/firstComp.vue'
    import secondComp from './component/secondComp.vue'
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Hello Vue'
            }
        },
        route:{
            data (){
                alert("router")
            }
        },
    components : {firstComp,secondComp}
    }
</script>
