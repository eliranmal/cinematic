<template>
  <div class="search">
    <label>
      <input type="search"
             :placeholder="i18n.placeholder"
             @input="debouncedSearch"
             @keydown.enter="debouncedImmediateSearch"
             ref="searchInput">
      <span class="icon" @click="debouncedImmediateSearch"></span>
    </label>
  </div>
</template>

<script>
import { debounce } from 'debounce';

export default {
  name: 'Search',
  data() {
    return {
      i18n: {
        placeholder: 'search flicks',
      },
      searching: false,
      delay: 666,
      debounce,
    };
  },
  created() {
    this.debouncedSearch = debounce(this.search, this.delay);
    this.debouncedImmediateSearch = debounce(this.search, this.delay, true);
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
  methods: {
    search() {
      console.log('> > > starting search');
      this.searching = true;
      setTimeout(() => {
        console.log('> > > done searching');
        this.searching = false;
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">

  $height: 2rem;

  label,
  label > * {
    background-color: var(--color-bg);
  }

  label {
    position: relative;
    display: block;
    box-shadow: 100px -10px 120px #e2e2e2;

    .icon {

      &:after {
        content: '\21b5';
        position: absolute;
        top: $height * .25;
        right: $height * .25;
        width: $height * .5;
        height: $height * .5;
        cursor: pointer;
        border-radius: 50%;
        text-align: center;
        font-size: $height * .375;
        font-weight: bold;
        line-height: 1.75;
        color: var(--color-bg);
        background-color: var(--color-text-complement);
      }

      &:focus:after {
        border: 1px solid var(--color-text);
      }
    }

    input[type="search"] {
      width: calc(100% - #{$height});
      display: block;
      border: 0 none;
      line-height: $height;
      font-size: $height / 2;
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

</style>
