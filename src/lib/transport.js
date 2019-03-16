class Transport {
  constructor({ baseUrl, responseType = 'json' } = {}) {
    this.baseUrl = baseUrl;
    this.responseType = responseType;
  }

  fetch({ path = '', query }) {
    const url = new URL(`${this.baseUrl}/${path}`);

    if (query && Object.keys(query).length) {
      url.search = new window.URLSearchParams(query);
    }

    return window.fetch(url)
      .then((response) => {
        if (response.ok) {
          return response[this.responseType]();
        }
        throw new Error('network error occurred');
      })
      .catch((error) => {
        console.log(`there has been a problem with the fetch operation: '${error.message}'`);
      });
  }
}


export default Transport;
