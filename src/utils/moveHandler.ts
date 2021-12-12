export const rotate90 = (positions: number[][]) => {
  const dimension = Math.max(...positions.map((position) => position[0]));
  return positions
    .map((position) => {
      const temp = [...position];
      return [temp[1], temp[0]];
    })
    .map((position) => {
      const temp = [...position];
      return [dimension - temp[0], temp[1]];
    });
};
