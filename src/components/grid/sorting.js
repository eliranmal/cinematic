const comparator = (prop) => (a, b) => {
  if (typeof a[prop] === 'string') {
    return a[prop].localeCompare(b[prop]);
  }
  return a[prop] - b[prop];
};

export const compareBy = (prop, c = comparator(prop)) => ({
  asc: c,
  desc: (a, b) => c(b, a),
});

export default {};
