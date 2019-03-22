<template>
  <div class="search">
    <label>
      <input type="search"
             tabindex="0"
             v-model="searchValue"
             :placeholder="i18n.placeholder"
             @input="debouncedSearch"
             @keydown.enter="debouncedImmediateSearch"
             ref="searchInput">
      <span class="icon"
            tabindex="0"
            @keydown.enter="debouncedImmediateSearch"
            @keydown.space="debouncedImmediateSearch"
            @click="debouncedImmediateSearch"></span>
    </label>
  </div>
</template>

<script>
import { debounce } from 'debounce';
import fetch from '../mixins/fetch';

export default {
  name: 'Search',
  mixins: [
    fetch,
  ],
  data() {
    return {
      i18n: {
        placeholder: 'search flicks',
      },
      year: null,
      type: null,
      searchTerm: '',
      searchValue: '',
      debounceDelay: 666,
      fetchBaseUrl: `${window.location.protocol}//${process.env.VUE_APP_OMDB_API_DOMAIN}`,
    };
  },
  created() {
    this.debouncedSearch = debounce(this.search, this.debounceDelay);
    this.debouncedImmediateSearch = debounce(this.search, this.debounceDelay, true);
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
  methods: {
    search() {
      if (!this.searchTerm) {
        return;
      }
      if (!process.env.VUE_APP_OMDB_API_KEY) {
        return;
      }
      const query = {
        apiKey: process.env.VUE_APP_OMDB_API_KEY,
        s: this.searchTerm,
        y: this.year,
        type: this.type,
      };
      this.fetch({ query });
    },
  },
  watch: {
    searchValue(newVal, oldVal) {
      const trimmed = {
        newVal: newVal && newVal.trim(),
        oldVal: oldVal && oldVal.trim(),
      };
      if (trimmed.newVal === trimmed.oldVal) {
        return;
      }
      this.searchTerm = trimmed.newVal;
    },
  },
};
</script>

<style scoped lang="scss">

  $height: 2rem;

  .search {

    label,
    label > * {
      background-color: var(--color-bg);
    }

    label {
      position: relative;
      display: block;
      border-radius: $height / 2;
      box-shadow: 100px -10px 100px #e2e2e2;

      .icon {

        &:after {
          content: url("../assets/images/magnify.svg");
          position: absolute;
          top: $height * .125;
          right: $height * .125;
          width: $height * .75;
          height: $height * .75;
          border: .05rem solid transparent;
          border-radius: 50%;
          color: var(--color-bg);
          background-color: var(--color-main);
          cursor: pointer;
        }
      }

      input[type="search"] {
        width: calc(100% - #{$height * 1.2});
        display: block;
        border: 0 none;
        line-height: $height;
        font-size: $height / 2;
        padding-left: .25rem;
        padding-right: 0;

        &::placeholder {
          color: var(--color-text-complement);
        }

        &::-webkit-search-cancel-button {
          margin-left: .5em;
          cursor: pointer;
        }
      }
    }
  }

</style>
