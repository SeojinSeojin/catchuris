import styled from 'styled-components';
import { TABLE } from '../../utils/constants/TABLE';

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
`;

export const Row = styled.div`
  display: grid;
  width: ${TABLE.WIDTH * TABLE.CELL.SIZE}px;
  grid-template-columns: repeat(${TABLE.WIDTH}, 1fr);
  &:first-child {
    border-top: 1px solid #cccccc;
  }
  & > div:first-child {
    border-left: 1px solid #cccccc;
  }
`;

export const Cell = styled.div`
  width: ${TABLE.CELL.SIZE}px;
  height: ${TABLE.CELL.SIZE}px;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
`;
