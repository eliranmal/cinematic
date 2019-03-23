export const resolvedPathMap = (requireContext) => {
  return requireContext.keys()
    .reduce((accum, key) => {
      accum[key] = requireContext(key);
      return accum;
    }, {});
};

export default {};
