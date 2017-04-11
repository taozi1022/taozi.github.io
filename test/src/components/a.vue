<template>
    <div>
        <header-component/>
        <div>this is template a</div>
        <other-component/>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
  export default {
    name: 'a',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
