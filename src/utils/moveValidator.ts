import { TABLE } from './constants/TABLE';

export const isOutOfCanvas = ({ x, y }: { x: number; y: number }) => {
  if (x < 0) return false;
  if (x > TABLE.WIDTH) return false;
  if (y < 0) return false;
  if (y > TABLE.HEIGHT) return false;
  return true;
};

export const isCrash = (x: number, y: number, table: string[][]) =>
  table[y][x] !== '';
