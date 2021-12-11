import {
  CatchuBlue,
  CatchuGreen,
  CatchuOrange,
  CatchuPurple,
  CatchuSkyblue,
  CatchuYellow,
  CatchuYellowGreen,
} from '../../components/common/Icons';

export const BLOCKS: {
  [key: string]: Marker;
} = {
  I: { shape: [[1, 1, 1, 1]], catchu: CatchuBlue },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    catchu: CatchuGreen,
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    catchu: CatchuOrange,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    catchu: CatchuPurple,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    catchu: CatchuSkyblue,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    catchu: CatchuYellow,
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    catchu: CatchuYellowGreen,
  },
};
