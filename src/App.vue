<template>
  <div id="app">
    <!--<img id="source-image" src="./assets/images/logo.png">-->
    <HelloWorld msg="cinematic"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss">

  #app {
    font-family: 'harting', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }

</style>
