import Transport from '../lib/transport';

export default {
  data() {
    return {
      fetching: false,
      fetchBaseUrl: null,
      fetchPath: null,
      fetchQuery: null,
      fetchResponseData: {},
    };
  },
  created() {
    if (!this.fetchBaseUrl) {
      throw new Error('fetchBaseUrl must be available on the instance data');
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
        throw new Error('no transport found');
      }
      this.fetching = true;
      this.transport.fetch(opts)
        .then((data) => {
          this.fetchResponseData = data;
          this.fetching = false;
          // todo - send events upwards
          // this.$emit('fetch');
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
