export const sortByValue = obj => Object.entries(obj) // eslint-disable-line
  .sort(([, a], [, b]) => a - b)
  .reduce((accum, [key, val]) => {
    accum[key] = val;
    return accum;
  }, {});
