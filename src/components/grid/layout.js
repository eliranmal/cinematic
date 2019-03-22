const resolvers = {
  tiles(itemIndex, colNum) {
    const h = colNum;
    const y = ((itemIndex - (itemIndex % colNum)) / colNum);
    return {
      x: itemIndex % colNum,
      y: y * h,
      w: 1,
      h,
      i: itemIndex.toString(),
    };
  },
  list(itemIndex, colNum) {
    const h = 2;
    return {
      x: 0,
      y: itemIndex * h,
      w: colNum,
      h,
      i: itemIndex.toString(),
    };
  },
};

// const y = Math.ceil(Math.random() * 4) + 1;
// const layout = {
//   x: Math.floor(Math.random() * 6) * 2 % 12,
//   y: Math.floor(i / 6) * y,
//   w: 2,
//   h: y,
//   i: i.toString(),
//   static: Math.random() < 0.05,
// };

// const h = 2;
// const layout = {
//   x: i % colNum,
//   y: ((i - (i % colNum)) / colNum) * h,
//   w: 1,
//   h,
//   i: i.toString(),
// };

// const y = ((i - (i % colNum)) / colNum);
// const layout = {
//   x: i % colNum,
//   y: y * 5 + ((i % colNum) % 2),
//   w: 1,
//   h: 1 * 5,
//   i: i.toString(),
// };

export const itemResolverFactory = type => resolvers[type];

export default resolvers;
