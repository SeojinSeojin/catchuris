import { TABLE } from './constants/TABLE';

export const isInCanvas = ({ x, y }: { x: number; y: number }) => {
  if (x < 0) return false;
  if (x >= TABLE.WIDTH) return false;
  if (y >= TABLE.HEIGHT) return false;
  return true;
};

export const isCrashWithTable = (x: number, y: number, table: string[][]) =>
  table[y] ? table[y][x] !== '' : false;

export const isNotMoveable = (positions: number[][], table: string[][]) =>
  positions.filter(
    (position) =>
      !isInCanvas({
        x: position[0],
        y: position[1],
      })
  ).length +
    positions
      .filter((position) =>
        isInCanvas({
          x: position[0],
          y: position[1],
        })
      )
      .filter((position) => isCrashWithTable(position[0], position[1], table))
      .length !==
  0;
