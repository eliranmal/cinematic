import Transport from '../lib/transport';

export default {
  data() {
    return {
      fetching: false,
      fetchPath: null,
      fetchQuery: null,
    };
  },
  created() {
    if (!this.fetchBaseUrl) {
      throw new Error('fetchBaseUrl must be available on the instance');
    }
    this.transport = new Transport({
      baseUrl: this.fetchBaseUrl,
    });
  },
  methods: {
    fetch({ path, query }) {
      this.fetchPath = path;
      this.fetchQuery = query;
    },
    dispatchFetch(opts) {
      if (!this.transport) {
        return;
      }
      this.fetching = true;
      this.transport.fetch(opts)
        .then((data) => {
          this.fetching = false;
          this.$emit('data', data);
        })
        .catch((error) => {
          this.$emit('error', error);
        });
    },
  },
  watch: {
    fetchPath(newVal, oldVal) {
      if (newVal === oldVal || !newVal) {
        return;
      }
      this.dispatchFetch({
        path: newVal,
        query: this.fetchQuery,
      });
    },
    fetchQuery(newVal, oldVal) {
      if (newVal === oldVal || !newVal) {
        return;
      }
      this.dispatchFetch({
        path: this.fetchPath,
        query: newVal,
      });
    },
  },
};
