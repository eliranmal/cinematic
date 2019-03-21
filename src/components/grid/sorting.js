export const compareBy = prop => ({
  asc: (a, b) => a[prop] - b[prop],
  desc: (a, b) => b[prop] - a[prop],
});

export default {};
