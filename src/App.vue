<template>
  <div id="app">
    <Header msg="cinematic"/>
    <Search @data="searchSuccess" @error="searchError"/>
    <Gallery/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Search from './components/Search.vue';
import Gallery from './components/Gallery.vue';

export default {
  name: 'app',
  components: {
    Header,
    Search,
    Gallery,
  },
  methods: {
    searchSuccess(data) {
      console.log('>>>>>>>>> searchSuccess', data);
      // todo - implement
    },
    searchError(error) {
      console.error('>>>>>>>>> searchError', error);
      // todo - implement
    },
  },
};
</script>

<style lang="scss">

  #app {
    padding: 1rem 3rem;
    width: 100%;
    height: 100%;
  }

</style>
