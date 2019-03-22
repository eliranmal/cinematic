<template>
  <div id="app">
    <Header :msg="i18n.appName"/>
    <Search @data="onSearchData" @error="onSearchError"/>
    <Controls @action-triggered="onActionTriggered"/>
    <Grid :items="items" :layout-type="layoutType" :sorter="sorter"/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Search from './components/Search.vue';
import Controls from './components/Controls.vue';
import Grid from './components/grid/Grid.vue';

export default {
  name: 'app',
  components: {
    Header,
    Search,
    Controls,
    Grid,
  },
  data() {
    return {
      i18n: {
        appName: 'cinematic',
      },
      searchResults: null,
      layoutType: 'tiles',
      sorter: null,
    };
  },
  methods: {
    onSearchData(data) {
      this.searchResults = data;
    },
    onSearchError(error) {
      this.searchResults = null;
    },
    onActionTriggered({ action = '', data = {} }) {
      switch (action) {
        case 'list':
        case 'tiles':
          this.layoutType = action;
          break;
        case 'sort':
          this.sorter = data;
          break;
        default:
          break;
      }
    },
  },
  computed: {
    items() {
      if (!this.searchResults || !this.searchResults.Response || !this.searchResults.Search) {
        return [];
      }
      return this.searchResults.Search.map(({ Poster, Title, Year, Type, imdbID }) => ({
        id: imdbID,
        text: `${Title} (${Year})`,
        imageUrl: Poster,
        imdbID,
        title: Title,
        type: Type,
        year: Year,
      }));
    },
  },
};
</script>

<style lang="scss">

  #app {
    padding: 1rem 3rem;
    width: 100%;
    height: 100%;

    .header,
    .search,
    .controls {
      margin-left: .25rem;
      margin-right: .25rem;
    }
  }

</style>
