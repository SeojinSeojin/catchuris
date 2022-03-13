import styled from 'styled-components';
import { TABLE } from '../../utils/constants/TABLE';

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
`;

export const Row = styled.div<{ isBigScreen: boolean }>`
  display: grid;
  width: ${({ isBigScreen }) => TABLE.WIDTH * TABLE.CELL.SIZE(isBigScreen)}px;
  grid-template-columns: repeat(${TABLE.WIDTH}, 1fr);
  &:first-child {
    border-top: 1px solid #cccccc;
  }
  & > div:first-child {
    border-left: 1px solid #cccccc;
  }
`;

export const Cell = styled.div<{ isBigScreen: boolean }>`
  width: ${({ isBigScreen }) => TABLE.CELL.SIZE(isBigScreen)}px;
  height: ${({ isBigScreen }) => TABLE.CELL.SIZE(isBigScreen)}px;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
`;

export const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  max-width: 600px;
  z-index: 10;
  box-sizing: border-box;
  background-color: #2f2f2f;
  & svg {
    align-self: center;
    justify-self: center;
    width: 50%;
    padding: 10px;
  }
`;

export const CanvasWrapper = styled.div`
  border-left: 1.3px solid white;
  border-right: 1.3px solid white;
`;
