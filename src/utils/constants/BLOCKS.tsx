import {
  CatchuBlue,
  catchuBlueImage,
  CatchuGreen,
  catchuGreenImage,
  CatchuOrange,
  catchuOrangeImage,
  CatchuPurple,
  catchuPurpleImage,
  CatchuSkyblue,
  catchuSkyblueImage,
  CatchuYellow,
  CatchuYellowGreen,
  catchuYellowGreenImage,
  catchuYellowImage,
} from '../../components/common/Icons';

export const BLOCK_COUNT = 7;

export const BLOCKS: {
  [key: string]: Marker;
} = {
  I: {
    key: 'I',
    shape: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    catchu: { component: () => <CatchuBlue />, svg: catchuBlueImage },
  },
  L: {
    key: 'L',
    shape: [
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    catchu: { component: () => <CatchuGreen />, svg: catchuGreenImage },
  },
  J: {
    key: 'J',
    shape: [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    catchu: { component: () => <CatchuOrange />, svg: catchuOrangeImage },
  },
  Z: {
    key: 'Z',
    shape: [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    catchu: { component: () => <CatchuPurple />, svg: catchuPurpleImage },
  },
  S: {
    key: 'S',
    shape: [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
    ],
    catchu: { component: () => <CatchuSkyblue />, svg: catchuSkyblueImage },
  },
  O: {
    key: 'O',
    shape: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    catchu: { component: () => <CatchuYellow />, svg: catchuYellowImage },
  },
  T: {
    key: 'T',
    shape: [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    catchu: {
      component: () => <CatchuYellowGreen />,
      svg: catchuYellowGreenImage,
    },
  },
};
