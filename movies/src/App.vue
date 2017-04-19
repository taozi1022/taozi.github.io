<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
    body,p{
      margin: 0;
    }
    ul,li{
        padding:0;
        margin: 0;
        list-style: none;
    }
    img{
        vertical-align: top;
    }
    a{
        text-decoration: none;
        color: #000;
    }

</style>
